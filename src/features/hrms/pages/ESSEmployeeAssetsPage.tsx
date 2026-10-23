import React, { useState, useEffect, useCallback } from 'react';
import { PageHeader, LoadingState, ErrorState, Badge } from '@shared/components';
import { User, Laptop } from 'lucide-react';
import type {
  Employee,
  Department,
  Asset,
  AssetAssignment,
  AssetMaintenance,
  EmployeeDocument,
  EmployeeRequest,
  LeaveBalance,
  AttendanceRecord,
  AssignAssetPayload,
  ReturnAssetPayload,
  ScheduleMaintenancePayload,
  CreateEmployeeRequestPayload,
  UploadDocumentPayload,
} from '../types';
import { essAssetsService } from '../services/essAssetsService';
import {
  EmployeeSwitcher,
  EssProfileSection,
  CompanyAssetsSection,
  AssetAssignModal,
  AssetReturnModal,
  ScheduleMaintenanceModal,
  RaiseRequestModal,
  UploadDocumentModal,
  DocumentPreviewModal,
} from '../components/ess-assets';
import '../components/ess-assets/essAssets.css';

export const ESSEmployeeAssetsPage: React.FC = () => {
  // Global domain master records
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [assignments, setAssignments] = useState<AssetAssignment[]>([]);
  const [maintenanceRecords, setMaintenanceRecords] = useState<AssetMaintenance[]>([]);

  // Active session employee
  const [activeEmployee, setActiveEmployee] = useState<Employee | null>(null);

  // Active employee specific domain records (zero cross-domain leakage)
  const [documents, setDocuments] = useState<EmployeeDocument[]>([]);
  const [requests, setRequests] = useState<EmployeeRequest[]>([]);
  const [leaveBalances, setLeaveBalances] = useState<LeaveBalance[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);

  // Page lifecycle
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Top-level Navigation (ESS vs Assets)
  const [activeMainTab, setActiveMainTab] = useState<'ess' | 'assets'>('ess');

  // Modals state
  const [assetToAssign, setAssetToAssign] = useState<Asset | null>(null);
  const [assetToReturn, setAssetToReturn] = useState<Asset | null>(null);
  const [maintenanceAssetId, setMaintenanceAssetId] = useState<string | undefined>(undefined);
  const [isMaintenanceModalOpen, setIsMaintenanceModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestInitialType, setRequestInitialType] = useState<CreateEmployeeRequestPayload['requestType']>('LETTER_REQUEST');
  const [isUploadDocModalOpen, setIsUploadDocModalOpen] = useState(false);
  const [previewDocument, setPreviewDocument] = useState<EmployeeDocument | null>(null);

  // Load active employee specific data
  const loadEmployeeData = useCallback(async (employeeId: string) => {
    try {
      const [docsRes, reqsRes, leavesRes, attRes] = await Promise.all([
        essAssetsService.getEmployeeDocuments(employeeId),
        essAssetsService.getEmployeeRequests(employeeId),
        essAssetsService.getLeaveBalances(employeeId),
        essAssetsService.getAttendanceRecords(employeeId),
      ]);

      setDocuments(docsRes.data);
      setRequests(reqsRes.data);
      setLeaveBalances(leavesRes.data);
      setAttendanceRecords(attRes.data);
    } catch {
      // In pre-backend mock, handle silently or state
    }
  }, []);

  // Initial master data load
  const loadInitialData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [empRes, deptRes, assetRes, asgRes, mntRes] = await Promise.all([
        essAssetsService.getEmployees(),
        essAssetsService.getDepartments(),
        essAssetsService.getAssets(),
        essAssetsService.getAssetAssignments(),
        essAssetsService.getAssetMaintenance(),
      ]);

      setEmployees(empRes.data);
      setDepartments(deptRes.data);
      setAssets(assetRes.data);
      setAssignments(asgRes.data);
      setMaintenanceRecords(mntRes.data);

      if (empRes.data.length > 0) {
        const initialEmp = empRes.data[0];
        setActiveEmployee(initialEmp);
        await loadEmployeeData(initialEmp.id);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initialize ESS & Assets workspace.');
    } finally {
      setLoading(false);
    }
  }, [loadEmployeeData]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  // Handle employee switch with strict domain synchronization
  const handleSelectEmployee = async (emp: Employee) => {
    setActiveEmployee(emp);
    await loadEmployeeData(emp.id);
  };

  // Resolve department dynamically from departmentId (DEV-01 relationship)
  const activeDepartment = activeEmployee
    ? departments.find((d) => d.id === activeEmployee.departmentId) || null
    : null;

  // Active employee assigned assets count
  const activeAssignedCount = activeEmployee
    ? assignments.filter((a) => a.employeeId === activeEmployee.id && !a.returnDate).length
    : 0;

  // Mutation Handlers
  const handleAssignAsset = async (payload: AssignAssetPayload) => {
    await essAssetsService.assignAsset(payload);
    const [assetRes, asgRes] = await Promise.all([
      essAssetsService.getAssets(),
      essAssetsService.getAssetAssignments(),
    ]);
    setAssets(assetRes.data);
    setAssignments(asgRes.data);
  };

  const handleReturnAsset = async (payload: ReturnAssetPayload) => {
    await essAssetsService.returnAsset(payload);
    const [assetRes, asgRes] = await Promise.all([
      essAssetsService.getAssets(),
      essAssetsService.getAssetAssignments(),
    ]);
    setAssets(assetRes.data);
    setAssignments(asgRes.data);
  };

  const handleScheduleMaintenance = async (payload: ScheduleMaintenancePayload) => {
    await essAssetsService.scheduleAssetMaintenance(payload);
    const [assetRes, mntRes] = await Promise.all([
      essAssetsService.getAssets(),
      essAssetsService.getAssetMaintenance(),
    ]);
    setAssets(assetRes.data);
    setMaintenanceRecords(mntRes.data);
  };

  const handleCreateRequest = async (payload: CreateEmployeeRequestPayload) => {
    await essAssetsService.createEmployeeRequest(payload);
    if (activeEmployee) {
      const reqsRes = await essAssetsService.getEmployeeRequests(activeEmployee.id);
      setRequests(reqsRes.data);
    }
  };

  const handleUploadDocument = async (payload: UploadDocumentPayload) => {
    await essAssetsService.uploadEmployeeDocument(payload);
    if (activeEmployee) {
      const docsRes = await essAssetsService.getEmployeeDocuments(activeEmployee.id);
      setDocuments(docsRes.data);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '32px' }}>
        <LoadingState message="Loading HRMS Employee Self-Service & Assets..." />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '32px' }}>
        <ErrorState
          title="HRMS Service Unavailable"
          message={error}
          onRetry={loadInitialData}
        />
      </div>
    );
  }

  const openRequestsCount = requests.filter((r) => r.status === 'OPEN' || r.status === 'IN_REVIEW').length;

  return (
    <div className="ess-container">
      {/* Page Header */}
      <PageHeader
        title="Employee Self-Service & Assets"
        description="Personal profile records, document verification vault, leave balance consumption, company hardware allocation, and asset lifecycle returns."
        breadcrumb="HRMS / ESS & ASSETS"
        badge={<Badge variant="team-c">HRMS-DEV-07</Badge>}
      />

      {/* Cross-Domain Employee Switcher */}
      <EmployeeSwitcher
        employees={employees}
        departments={departments}
        selectedEmployee={activeEmployee}
        onSelectEmployee={handleSelectEmployee}
      />

      {/* Main Feature Tabs */}
      <div className="ess-main-nav" role="tablist">
        <button
          type="button"
          className={`ess-main-tab-btn ${activeMainTab === 'ess' ? 'active' : ''}`}
          onClick={() => setActiveMainTab('ess')}
          role="tab"
          aria-selected={activeMainTab === 'ess'}
        >
          <User size={16} />
          <span>Employee Self-Service</span>
          {openRequestsCount > 0 && (
            <span
              style={{
                backgroundColor: 'rgba(99, 102, 241, 0.2)',
                color: '#818cf8',
                borderRadius: '999px',
                padding: '2px 7px',
                fontSize: '11px',
                fontWeight: 700,
              }}
            >
              {openRequestsCount}
            </span>
          )}
        </button>

        <button
          type="button"
          className={`ess-main-tab-btn ${activeMainTab === 'assets' ? 'active' : ''}`}
          onClick={() => setActiveMainTab('assets')}
          role="tab"
          aria-selected={activeMainTab === 'assets'}
        >
          <Laptop size={16} />
          <span>Company Assets & Hardware Fleet</span>
          <span
            style={{
              backgroundColor: 'rgba(56, 189, 248, 0.15)',
              color: '#38bdf8',
              borderRadius: '999px',
              padding: '2px 7px',
              fontSize: '11px',
              fontWeight: 700,
            }}
          >
            {assets.length}
          </span>
        </button>
      </div>

      {/* Tab 1: Employee Self-Service */}
      {activeMainTab === 'ess' && activeEmployee && (
        <EssProfileSection
          employee={activeEmployee}
          department={activeDepartment}
          documents={documents}
          requests={requests}
          leaveBalances={leaveBalances}
          attendanceRecords={attendanceRecords}
          assignedAssetsCount={activeAssignedCount}
          onRequestClick={(type) => {
            setRequestInitialType(type || 'LETTER_REQUEST');
            setIsRequestModalOpen(true);
          }}
          onUploadDocumentClick={() => setIsUploadDocModalOpen(true)}
          onViewDocumentClick={(doc) => setPreviewDocument(doc)}
        />
      )}

      {/* Tab 2: Company Assets */}
      {activeMainTab === 'assets' && activeEmployee && (
        <CompanyAssetsSection
          activeEmployee={activeEmployee}
          assets={assets}
          assignments={assignments}
          employees={employees}
          requests={requests}
          maintenanceRecords={maintenanceRecords}
          onAssignAssetClick={(asset) => setAssetToAssign(asset)}
          onReturnAssetClick={(asset) => setAssetToReturn(asset)}
          onScheduleMaintenanceClick={(assetId) => {
            setMaintenanceAssetId(assetId);
            setIsMaintenanceModalOpen(true);
          }}
          onRequestHardwareClick={() => {
            setRequestInitialType('DEVICE_ACCESS');
            setIsRequestModalOpen(true);
          }}
        />
      )}

      {/* Modals */}
      <AssetAssignModal
        isOpen={!!assetToAssign}
        onClose={() => setAssetToAssign(null)}
        asset={assetToAssign}
        employees={employees}
        onAssign={handleAssignAsset}
      />

      <AssetReturnModal
        isOpen={!!assetToReturn}
        onClose={() => setAssetToReturn(null)}
        asset={assetToReturn}
        assignments={assignments}
        onReturn={handleReturnAsset}
      />

      <ScheduleMaintenanceModal
        isOpen={isMaintenanceModalOpen}
        onClose={() => {
          setIsMaintenanceModalOpen(false);
          setMaintenanceAssetId(undefined);
        }}
        assets={assets}
        initialAssetId={maintenanceAssetId}
        onSchedule={handleScheduleMaintenance}
      />

      {activeEmployee && (
        <>
          <RaiseRequestModal
            isOpen={isRequestModalOpen}
            onClose={() => setIsRequestModalOpen(false)}
            employee={activeEmployee}
            initialRequestType={requestInitialType}
            onSubmit={handleCreateRequest}
          />

          <UploadDocumentModal
            isOpen={isUploadDocModalOpen}
            onClose={() => setIsUploadDocModalOpen(false)}
            employee={activeEmployee}
            onUpload={handleUploadDocument}
          />
        </>
      )}

      <DocumentPreviewModal
        isOpen={!!previewDocument}
        onClose={() => setPreviewDocument(null)}
        document={previewDocument}
      />
    </div>
  );
};
