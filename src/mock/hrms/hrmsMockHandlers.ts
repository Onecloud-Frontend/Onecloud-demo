import { ApiResponseEnvelope } from '@core/api/types';
import {
  Employee,
  Department,
  EmployeeDocument,
  EmployeeRequest,
  Asset,
  AssetAssignment,
  AssetMaintenance,
  LeaveBalance,
  AttendanceRecord,
  HrmsWorkspaceStatus,
  CreateEmployeeRequestPayload,
  UploadDocumentPayload,
  AssignAssetPayload,
  ReturnAssetPayload,
  ScheduleMaintenancePayload,
} from '@features/hrms/types';
import {
  mockHrmsWorkspaceStatus,
  mockDepartments,
  mockEmployees,
  mockEmployeeDocuments,
  mockEmployeeRequests,
  mockLeaveBalances,
  mockAttendanceRecords,
  mockAssets,
  mockAssetAssignments,
  mockAssetMaintenance,
} from './hrmsMockData';
import { delay, createMockEnvelope } from '../data/commonMockData';
import { attendanceMockHandlers } from './attendanceMockHandlers';
import { leaveMockHandlers } from './leaveMockHandlers';


// Mutable in-memory state initialized from mock data
const state = {
  departments: [...mockDepartments],
  employees: [...mockEmployees],
  documents: [...mockEmployeeDocuments],
  requests: [...mockEmployeeRequests],
  leaveBalances: [...mockLeaveBalances],
  attendance: [...mockAttendanceRecords],
  assets: [...mockAssets],
  assignments: [...mockAssetAssignments],
  maintenance: [...mockAssetMaintenance],
};

const { getAttendanceRecords: _unusedAttendance, ...otherAttendanceHandlers } = attendanceMockHandlers;

export const hrmsMockHandlers = {
  async getWorkspaceStatus(): Promise<ApiResponseEnvelope<HrmsWorkspaceStatus>> {
    await delay(100);
    return createMockEnvelope(mockHrmsWorkspaceStatus, 'HRMS workspace baseline loaded from mock adapter');
  },

  ...leaveMockHandlers,

  async getEmployees(): Promise<ApiResponseEnvelope<Employee[]>> {
    await delay(80);
    return createMockEnvelope([...state.employees], 'Employees loaded successfully');
  },

  async getEmployeeById(id: string): Promise<ApiResponseEnvelope<Employee | null>> {
    await delay(60);
    const found = state.employees.find((e) => e.id === id || e.employeeCode.toLowerCase() === id.toLowerCase()) || null;
    return createMockEnvelope(found, found ? 'Employee found' : 'Employee not found');
  },

  async getDepartments(): Promise<ApiResponseEnvelope<Department[]>> {
    await delay(60);
    return createMockEnvelope([...state.departments], 'Departments loaded successfully');
  },

  async getEmployeeDocuments(employeeId?: string): Promise<ApiResponseEnvelope<EmployeeDocument[]>> {
    await delay(80);
    const filtered = employeeId
      ? state.documents.filter((d) => d.employeeId === employeeId)
      : [...state.documents];
    return createMockEnvelope(filtered, 'Employee documents loaded successfully');
  },

  async uploadEmployeeDocument(payload: UploadDocumentPayload): Promise<ApiResponseEnvelope<EmployeeDocument>> {
    await delay(120);
    const newDoc: EmployeeDocument = {
      id: `doc-${Date.now()}`,
      employeeId: payload.employeeId,
      documentType: payload.documentType,
      documentNumber: payload.documentNumber || `DOC-${Math.floor(1000 + Math.random() * 9000)}`,
      fileUrl: payload.fileUrl || `/documents/${payload.employeeId}-upload.pdf`,
      status: 'PENDING_VERIFICATION',
      uploadedAt: new Date().toISOString(),
      verifiedAt: null,
    };
    state.documents.unshift(newDoc);
    return createMockEnvelope(newDoc, 'Document uploaded for verification');
  },

  async getEmployeeRequests(employeeId?: string): Promise<ApiResponseEnvelope<EmployeeRequest[]>> {
    await delay(80);
    const filtered = employeeId
      ? state.requests.filter((r) => r.employeeId === employeeId)
      : [...state.requests];
    return createMockEnvelope(filtered, 'Employee requests loaded successfully');
  },

  async createEmployeeRequest(payload: CreateEmployeeRequestPayload): Promise<ApiResponseEnvelope<EmployeeRequest>> {
    await delay(120);
    const newReq: EmployeeRequest = {
      id: `req-${Date.now()}`,
      employeeId: payload.employeeId,
      requestType: payload.requestType,
      title: payload.title,
      description: payload.description,
      status: 'OPEN',
      assignedTo: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    state.requests.unshift(newReq);
    return createMockEnvelope(newReq, 'Request submitted successfully');
  },

  async getLeaveBalances(employeeId?: string): Promise<ApiResponseEnvelope<LeaveBalance[]>> {
    await delay(80);
    const filtered = employeeId
      ? state.leaveBalances.filter((b) => b.employeeId === employeeId)
      : [...state.leaveBalances];
    return createMockEnvelope(filtered, 'Leave balances loaded successfully');
  },

  async getAttendanceRecords(filter?: string): Promise<ApiResponseEnvelope<AttendanceRecord[]>> {
    await delay(80);
    const filtered = filter
      ? state.attendance.filter((a) => a.employeeId === filter || a.date === filter)
      : [...state.attendance];
    return createMockEnvelope(filtered, 'Attendance records loaded successfully');
  },

  async getAssets(): Promise<ApiResponseEnvelope<Asset[]>> {
    await delay(80);
    return createMockEnvelope([...state.assets], 'Assets catalog loaded successfully');
  },

  async getAssetAssignments(employeeId?: string): Promise<ApiResponseEnvelope<AssetAssignment[]>> {
    await delay(80);
    const filtered = employeeId
      ? state.assignments.filter((a) => a.employeeId === employeeId)
      : [...state.assignments];
    return createMockEnvelope(filtered, 'Asset assignments loaded successfully');
  },

  async assignAsset(payload: AssignAssetPayload): Promise<ApiResponseEnvelope<AssetAssignment>> {
    await delay(120);
    const assetIndex = state.assets.findIndex((a) => a.id === payload.assetId);
    if (assetIndex !== -1) {
      state.assets[assetIndex] = {
        ...state.assets[assetIndex],
        status: 'ASSIGNED',
        updatedAt: new Date().toISOString(),
      };
    }

    const newAssignment: AssetAssignment = {
      id: `asg-${Date.now()}`,
      assetId: payload.assetId,
      employeeId: payload.employeeId,
      assignedDate: new Date().toISOString().split('T')[0],
      returnDate: null,
      conditionOnAssign: payload.conditionOnAssign,
      notes: payload.notes,
    };
    state.assignments.unshift(newAssignment);
    return createMockEnvelope(newAssignment, 'Asset assigned successfully');
  },

  async returnAsset(payload: ReturnAssetPayload): Promise<ApiResponseEnvelope<AssetAssignment>> {
    await delay(120);
    const assignmentIndex = state.assignments.findIndex((a) => a.id === payload.assignmentId);
    if (assignmentIndex === -1) {
      throw new Error(`Assignment with ID ${payload.assignmentId} not found.`);
    }

    const assignment = state.assignments[assignmentIndex];
    const updatedAssignment: AssetAssignment = {
      ...assignment,
      returnDate: new Date().toISOString().split('T')[0],
      conditionOnReturn: payload.conditionOnReturn,
      notes: payload.notes ? `${assignment.notes || ''} | Return: ${payload.notes}` : assignment.notes,
    };
    state.assignments[assignmentIndex] = updatedAssignment;

    // Update asset status to AVAILABLE
    const assetIndex = state.assets.findIndex((a) => a.id === assignment.assetId);
    if (assetIndex !== -1) {
      state.assets[assetIndex] = {
        ...state.assets[assetIndex],
        status: 'AVAILABLE',
        updatedAt: new Date().toISOString(),
      };
    }

    return createMockEnvelope(updatedAssignment, 'Asset return recorded successfully');
  },

  async getAssetMaintenance(assetId?: string): Promise<ApiResponseEnvelope<AssetMaintenance[]>> {
    await delay(80);
    const filtered = assetId
      ? state.maintenance.filter((m) => m.assetId === assetId)
      : [...state.maintenance];
    return createMockEnvelope(filtered, 'Asset maintenance records loaded successfully');
  },

  async scheduleAssetMaintenance(payload: ScheduleMaintenancePayload): Promise<ApiResponseEnvelope<AssetMaintenance>> {
    await delay(120);
    const newMaintenance: AssetMaintenance = {
      id: `mnt-${Date.now()}`,
      assetId: payload.assetId,
      maintenanceType: payload.maintenanceType,
      description: payload.description,
      scheduledDate: payload.scheduledDate,
      cost: payload.cost,
      completedDate: null,
      status: 'SCHEDULED',
    };
    state.maintenance.unshift(newMaintenance);

    // Update asset status to UNDER_MAINTENANCE
    const assetIndex = state.assets.findIndex((a) => a.id === payload.assetId);
    if (assetIndex !== -1) {
      state.assets[assetIndex] = {
        ...state.assets[assetIndex],
        status: 'UNDER_MAINTENANCE',
        updatedAt: new Date().toISOString(),
      };
    }
    return createMockEnvelope(newMaintenance, 'Asset maintenance scheduled successfully');
  },
  ...otherAttendanceHandlers,
};
