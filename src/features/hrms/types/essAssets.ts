/**
 * Canonical Types for ESS & Assets Capability Slice (HRMS-DEV-07)
 * Ownership: Team HRMS (Team 3)
 */
import type {
  Employee,
  Department,
  EmployeeDocument,
  EmployeeRequest,
  Asset,
  AssetAssignment,
  LeaveBalance,
  AttendanceRecord,
} from './index';

export interface EssProfileData {
  employee: Employee;
  department: Department | null;
  documents: EmployeeDocument[];
  requests: EmployeeRequest[];
  leaveBalances: LeaveBalance[];
  attendanceRecords: AttendanceRecord[];
  assignedAssets: {
    assignment: AssetAssignment;
    asset: Asset;
  }[];
}

export interface CreateEmployeeRequestPayload {
  employeeId: string;
  requestType: 'LETTER_REQUEST' | 'INFO_UPDATE' | 'DEVICE_ACCESS' | 'GENERAL_INQUIRY';
  title: string;
  description: string;
}

export interface UploadDocumentPayload {
  employeeId: string;
  documentType: string;
  documentNumber?: string;
  fileUrl: string;
}

export interface AssignAssetPayload {
  assetId: string;
  employeeId: string;
  conditionOnAssign: string;
  notes?: string;
}

export interface ReturnAssetPayload {
  assignmentId: string;
  conditionOnReturn: string;
  notes?: string;
}

export interface ScheduleMaintenancePayload {
  assetId: string;
  maintenanceType: 'PREVENTIVE' | 'REPAIR' | 'UPGRADE';
  description: string;
  scheduledDate: string;
  cost?: number;
}

export interface AssetOverviewMetrics {
  totalAssets: number;
  assignedAssets: number;
  availableAssets: number;
  maintenanceAssets: number;
  totalFleetValue: number;
}
