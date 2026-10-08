import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageHeader, Card, Button, LoadingState, EmptyState, ErrorState } from '@shared/components';
import {
  Employee,
  Department,
} from '../types';
import { employeeService } from '../services/employeeService';
import { universalHrmsStore } from '@mock/hrms';
import {
  EmployeeTable,
  EmployeeFilters,
  EmployeeProfileDrawer,
  EmployeeFormModal,
} from '../components/employee';
import { HrmsSubNav } from '../components/common/HrmsSubNav';
import {
  Users,
  UserCheck,
  Clock,
  Building,
  UserPlus,
  RefreshCw,
  CheckCircle,
} from 'lucide-react';

export const EmployeeManagementPage: React.FC = () => {
  // Master data states
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Search & Filter states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');

  // Drawer & Modal interaction states
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  // Toast / feedback notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Fetch initial data
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [deptRes, empRes] = await Promise.all([
        employeeService.getDepartments(),
        employeeService.getEmployees(),
      ]);

      if (deptRes.success) {
        setDepartments(deptRes.data);
      }
      if (empRes.success) {
        setEmployees(empRes.data);
      }
    } catch (err) {
      console.error('Error fetching employee management data:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to connect to the HRMS service layer. Please check network connectivity.'
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const [searchParams] = useSearchParams();
  const highlightedEmpId = searchParams.get('empId');

  useEffect(() => {
    fetchData();
    const unsubscribe = universalHrmsStore.subscribe(() => {
      fetchData();
    });
    return () => {
      unsubscribe();
    };
  }, [fetchData]);

  // Deep link auto-focus for newly onboarded hire
  useEffect(() => {
    if (highlightedEmpId && employees.length > 0) {
      const targetEmp = employees.find(
        (e) => e.id === highlightedEmpId || e.employeeCode === highlightedEmpId
      );
      if (targetEmp) {
        setSelectedEmployee(targetEmp);
        setIsProfileOpen(true);
        showToast(`🎉 Onboarded employee ${targetEmp.firstName} ${targetEmp.lastName} (${targetEmp.employeeCode}) is active!`);
      }
    }
  }, [highlightedEmpId, employees]);

  // Dynamic search and filter evaluation
  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      // 1. Search filter: Name, Code, Department name
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const fullName = `${emp.firstName} ${emp.lastName}`.toLowerCase();
        const code = emp.employeeCode.toLowerCase();
        const designation = (emp.designation || '').toLowerCase();
        const email = (emp.email || '').toLowerCase();
        const deptName =
          departments.find((d) => d.id === emp.departmentId)?.name.toLowerCase() || (emp.department || '').toLowerCase();

        const matchesSearch =
          fullName.includes(query) ||
          code.includes(query) ||
          designation.includes(query) ||
          email.includes(query) ||
          deptName.includes(query);
        if (!matchesSearch) return false;
      }

      // 2. Department filter
      if (selectedDepartment && emp.departmentId !== selectedDepartment) {
        return false;
      }

      // 3. Status filter
      if (selectedStatus && emp.employmentStatus !== selectedStatus) {
        return false;
      }

      // 4. Type filter
      if (selectedType && emp.employmentType !== selectedType) {
        return false;
      }

      return true;
    });
  }, [employees, departments, searchQuery, selectedDepartment, selectedStatus, selectedType]);

  // Metric computations for KPI summary cards
  const metrics = useMemo(() => {
    const total = employees.length;
    const active = employees.filter((e) => e.employmentStatus === 'ACTIVE').length;
    const probation = employees.filter((e) => e.employmentStatus === 'PROBATION').length;
    const onLeave = employees.filter((e) => e.employmentStatus === 'ON_LEAVE').length;
    const totalDepts = departments.length;

    return { total, active, probation, onLeave, totalDepts };
  }, [employees, departments]);

  // Handler: Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedDepartment('');
    setSelectedStatus('');
    setSelectedType('');
  };

  // Handler: Open Profile Drawer
  const handleOpenProfile = (emp: Employee) => {
    setSelectedEmployee(emp);
    setIsProfileOpen(true);
  };

  // Handler: Close Profile Drawer
  const handleCloseProfile = () => {
    setIsProfileOpen(false);
    setSelectedEmployee(null);
  };

  // Handler: Open Add Modal
  const handleOpenAddModal = () => {
    setEditingEmployee(null);
    setIsFormModalOpen(true);
  };

  // Handler: Open Edit Modal
  const handleOpenEditModal = (emp: Employee) => {
    setEditingEmployee(emp);
    setIsFormModalOpen(true);
  };

  // Handler: Close Form Modal
  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setEditingEmployee(null);
  };

  // Handler: Save Employee (Create or Update)
  const handleSaveEmployee = async (payload: Partial<Employee>) => {
    if (editingEmployee) {
      // Update existing
      const res = await employeeService.updateEmployee(editingEmployee.id, payload);
      if (res.success) {
        setEmployees((prev) =>
          prev.map((e) => (e.id === editingEmployee.id ? res.data : e))
        );
        // Also update open profile if viewing the same employee
        if (selectedEmployee?.id === editingEmployee.id) {
          setSelectedEmployee(res.data);
        }
        showToast(`Employee "${res.data.firstName} ${res.data.lastName}" updated successfully.`);
      }
    } else {
      // Create new
      const res = await employeeService.createEmployee(payload);
      if (res.success) {
        setEmployees((prev) => [res.data, ...prev]);
        showToast(`New employee "${res.data.firstName} ${res.data.lastName}" added to directory.`);
      }
    }
  };

  return (
    <div style={{ padding: '24px 32px' }}>
      {/* Global HRMS Module Sub-Navigation */}
      <HrmsSubNav />
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            top: '24px',
            right: '24px',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 18px',
            backgroundColor: 'var(--bg-elevated)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.45)',
            color: '#34d399',
            fontSize: '13.5px',
            fontWeight: 500,
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <CheckCircle size={18} />
          <span style={{ color: 'var(--text-primary)' }}>{toastMessage}</span>
        </div>
      )}

      {/* 1. PAGE HEADER */}
      <PageHeader
        breadcrumb="HRMS / People Operations"
        title="Employee Management"
        description="Comprehensive master employee directory, organizational hierarchy, department mapping, verification compliance, and emergency contact registry."
        actions={
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Button
              variant="outline"
              size="md"
              icon={<RefreshCw size={15} />}
              onClick={fetchData}
              title="Refresh directory"
            >
              Refresh
            </Button>

            <Button
              variant="primary"
              size="md"
              icon={<UserPlus size={16} />}
              onClick={handleOpenAddModal}
            >
              + Add Employee
            </Button>
          </div>
        }
      />

      {/* KPI METRIC CARDS */}
      <div
        className="grid-cols-4"
        style={{
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        {/* Card 1: Total Employees */}
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                Total Workforce
              </span>
              <div
                style={{
                  fontSize: '28px',
                  fontWeight: 700,
                  fontFamily: 'var(--font-display)',
                  color: 'var(--text-primary)',
                  marginTop: '4px',
                }}
              >
                {metrics.total}
              </div>
            </div>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: 'rgba(99, 102, 241, 0.12)',
                color: 'var(--brand-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Users size={22} />
            </div>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '10px' }}>
            Enterprise employee records
          </div>
        </Card>

        {/* Card 2: Active Workforce */}
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                Active Employees
              </span>
              <div
                style={{
                  fontSize: '28px',
                  fontWeight: 700,
                  fontFamily: 'var(--font-display)',
                  color: '#34d399',
                  marginTop: '4px',
                }}
              >
                {metrics.active}
              </div>
            </div>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: 'rgba(16, 185, 129, 0.12)',
                color: '#34d399',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <UserCheck size={22} />
            </div>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '10px' }}>
            {metrics.total > 0
              ? `${Math.round((metrics.active / metrics.total) * 100)}% of total directory`
              : 'Active workforce'}
          </div>
        </Card>

        {/* Card 3: Probation & Leave */}
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                Probation / On Leave
              </span>
              <div
                style={{
                  fontSize: '28px',
                  fontWeight: 700,
                  fontFamily: 'var(--font-display)',
                  color: '#fbbf24',
                  marginTop: '4px',
                }}
              >
                {metrics.probation + metrics.onLeave}
              </div>
            </div>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: 'rgba(245, 158, 11, 0.12)',
                color: '#fbbf24',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Clock size={22} />
            </div>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '10px' }}>
            {metrics.probation} Probation • {metrics.onLeave} On Leave
          </div>
        </Card>

        {/* Card 4: Departments */}
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                Departments
              </span>
              <div
                style={{
                  fontSize: '28px',
                  fontWeight: 700,
                  fontFamily: 'var(--font-display)',
                  color: 'var(--team-c-accent)',
                  marginTop: '4px',
                }}
              >
                {metrics.totalDepts}
              </div>
            </div>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: 'rgba(168, 85, 247, 0.12)',
                color: 'var(--team-c-accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Building size={22} />
            </div>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '10px' }}>
            Active organizational business units
          </div>
        </Card>
      </div>

      {/* SEARCH AND FILTERS */}
      <EmployeeFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedDepartment={selectedDepartment}
        onDepartmentChange={setSelectedDepartment}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        departments={departments}
        totalCount={employees.length}
        filteredCount={filteredEmployees.length}
        onResetFilters={handleResetFilters}
      />

      {/* MAIN CONTENT AREA WITH MULTI-STATE HANDLING */}
      {isLoading ? (
        <LoadingState message="Loading workforce directory and departments..." />
      ) : error ? (
        <ErrorState
          title="Failed to Load Employee Directory"
          message={error}
          onRetry={fetchData}
          retryLabel="Retry Loading Directory"
        />
      ) : employees.length === 0 ? (
        <EmptyState
          title="No Employees Found"
          description="The master employee directory has no records registered yet. Start by onboarding the first team member."
          icon={<Users size={40} />}
          actionLabel="+ Add First Employee"
          onAction={handleOpenAddModal}
        />
      ) : filteredEmployees.length === 0 ? (
        <EmptyState
          title="No Matching Employees Found"
          description={`No employees matched your search query "${searchQuery || 'active filters'}". Try adjusting your search keywords or clearing filters.`}
          actionLabel="Clear Filters"
          onAction={handleResetFilters}
        />
      ) : (
        <EmployeeTable
          employees={filteredEmployees}
          departments={departments}
          allEmployees={employees}
          onSelectEmployee={handleOpenProfile}
          onEditEmployee={handleOpenEditModal}
          pageSize={5}
        />
      )}

      {/* EMPLOYEE PROFILE SLIDE-OVER DRAWER */}
      <EmployeeProfileDrawer
        employee={selectedEmployee}
        departments={departments}
        allEmployees={employees}
        isOpen={isProfileOpen}
        onClose={handleCloseProfile}
        onEdit={(emp) => {
          handleOpenEditModal(emp);
        }}
      />

      {/* ADD / EDIT EMPLOYEE MODAL */}
      <EmployeeFormModal
        isOpen={isFormModalOpen}
        onClose={handleCloseFormModal}
        onSave={handleSaveEmployee}
        initialData={editingEmployee}
        departments={departments}
        allEmployees={employees}
      />
    </div>
  );
};
