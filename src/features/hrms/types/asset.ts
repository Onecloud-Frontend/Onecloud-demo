/**
 * Canonical Employee Services & Asset Types
 * Ownership: Team HRMS
 */

export type AssetCategory =
  | 'LAPTOP'
  | 'MONITOR'
  | 'PHONE'
  | 'PERIPHERAL'
  | 'FURNITURE'
  | 'OTHER';

export type AssetStatus =
  | 'AVAILABLE'
  | 'ASSIGNED'
  | 'UNDER_MAINTENANCE'
  | 'DECOMMISSIONED';

export interface Asset {
  id: string;
  assetTag: string;
  name: string;
  category: AssetCategory;
  serialNumber?: string;
  brand?: string;
  model?: string;
  purchaseDate?: string;
  cost?: number;
  status: AssetStatus;
  createdAt: string;
  updatedAt: string;
}

export interface AssetAssignment {
  id: string;
  assetId: string;
  employeeId: string;
  assignedDate: string;
  returnDate: string | null;
  conditionOnAssign: string;
  conditionOnReturn?: string;
  notes?: string;
}

export interface AssetMaintenance {
  id: string;
  assetId: string;
  maintenanceType: 'PREVENTIVE' | 'REPAIR' | 'UPGRADE';
  description: string;
  cost?: number;
  scheduledDate: string;
  completedDate: string | null;
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
}

export type RequestStatus = 'OPEN' | 'IN_REVIEW' | 'RESOLVED' | 'REJECTED';

export interface EmployeeRequest {
  id: string;
  employeeId: string;
  requestType: 'LETTER_REQUEST' | 'INFO_UPDATE' | 'DEVICE_ACCESS' | 'GENERAL_INQUIRY';
  title: string;
  description: string;
  status: RequestStatus;
  assignedTo: string | null;
  resolutionNotes?: string;
  createdAt: string;
  updatedAt: string;
}
