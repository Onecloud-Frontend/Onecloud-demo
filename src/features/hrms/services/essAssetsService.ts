import { apiClient } from '@core/api/client';
import { ApiResponseEnvelope } from '@core/api/types';
import type {
  Employee,
  Department,
  EmployeeDocument,
  EmployeeRequest,
  Asset,
  AssetAssignment,
  AssetMaintenance,
  LeaveBalance,
  AttendanceRecord,
  CreateEmployeeRequestPayload,
  UploadDocumentPayload,
  AssignAssetPayload,
  ReturnAssetPayload,
  ScheduleMaintenancePayload,
} from '../types';

/**
 * Service for HRMS-DEV-07: Employee Self-Service & Employee Assets
 * Communicates through the Core API Client proxy.
 */
export const essAssetsService = {
  /**
   * Fetch all employees from HRMS master
   */
  async getEmployees(): Promise<ApiResponseEnvelope<Employee[]>> {
    return apiClient.get<Employee[]>('/hrms/employees');
  },

  /**
   * Fetch single employee by ID
   */
  async getEmployeeById(id: string): Promise<ApiResponseEnvelope<Employee | null>> {
    return apiClient.get<Employee | null>(`/hrms/employees/${id}`);
  },

  /**
   * Fetch all departments from HRMS master
   */
  async getDepartments(): Promise<ApiResponseEnvelope<Department[]>> {
    return apiClient.get<Department[]>('/hrms/departments');
  },

  /**
   * Fetch employee documents for active employee
   */
  async getEmployeeDocuments(employeeId?: string): Promise<ApiResponseEnvelope<EmployeeDocument[]>> {
    return apiClient.get<EmployeeDocument[]>('/hrms/documents', employeeId ? { employeeId } : undefined);
  },

  /**
   * Upload a new employee document
   */
  async uploadEmployeeDocument(payload: UploadDocumentPayload): Promise<ApiResponseEnvelope<EmployeeDocument>> {
    return apiClient.post<EmployeeDocument>('/hrms/documents', payload);
  },

  /**
   * Fetch employee self-service requests
   */
  async getEmployeeRequests(employeeId?: string): Promise<ApiResponseEnvelope<EmployeeRequest[]>> {
    return apiClient.get<EmployeeRequest[]>('/hrms/requests', employeeId ? { employeeId } : undefined);
  },

  /**
   * Submit a new employee self-service request
   */
  async createEmployeeRequest(payload: CreateEmployeeRequestPayload): Promise<ApiResponseEnvelope<EmployeeRequest>> {
    return apiClient.post<EmployeeRequest>('/hrms/requests', payload);
  },

  /**
   * Fetch leave balances for active employee
   */
  async getLeaveBalances(employeeId?: string): Promise<ApiResponseEnvelope<LeaveBalance[]>> {
    return apiClient.get<LeaveBalance[]>('/hrms/leave/balances', employeeId ? { employeeId } : undefined);
  },

  /**
   * Fetch attendance punch history for active employee
   */
  async getAttendanceRecords(employeeId?: string): Promise<ApiResponseEnvelope<AttendanceRecord[]>> {
    return apiClient.get<AttendanceRecord[]>('/hrms/attendance', employeeId ? { employeeId } : undefined);
  },

  /**
   * Fetch company-wide assets catalog
   */
  async getAssets(): Promise<ApiResponseEnvelope<Asset[]>> {
    return apiClient.get<Asset[]>('/hrms/assets');
  },

  /**
   * Fetch asset assignments (optionally filtered by employee)
   */
  async getAssetAssignments(employeeId?: string): Promise<ApiResponseEnvelope<AssetAssignment[]>> {
    return apiClient.get<AssetAssignment[]>('/hrms/assets/assignments', employeeId ? { employeeId } : undefined);
  },

  /**
   * Assign an available asset to an employee
   */
  async assignAsset(payload: AssignAssetPayload): Promise<ApiResponseEnvelope<AssetAssignment>> {
    return apiClient.post<AssetAssignment>('/hrms/assets/assignments', payload);
  },

  /**
   * Record asset return
   */
  async returnAsset(payload: ReturnAssetPayload): Promise<ApiResponseEnvelope<AssetAssignment>> {
    return apiClient.post<AssetAssignment>('/hrms/assets/returns', payload);
  },

  /**
   * Fetch asset maintenance records
   */
  async getAssetMaintenance(assetId?: string): Promise<ApiResponseEnvelope<AssetMaintenance[]>> {
    return apiClient.get<AssetMaintenance[]>('/hrms/assets/maintenance', assetId ? { assetId } : undefined);
  },

  /**
   * Schedule asset maintenance
   */
  async scheduleAssetMaintenance(payload: ScheduleMaintenancePayload): Promise<ApiResponseEnvelope<AssetMaintenance>> {
    return apiClient.post<AssetMaintenance>('/hrms/assets/maintenance', payload);
  },
};
