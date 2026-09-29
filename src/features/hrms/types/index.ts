/**
 * Canonical HRMS Domain Types Entry Point
 * Ownership: Team HRMS (Team 3)
 */

// Baseline workspace contract - preserved for foundation compatibility
export interface HrmsWorkspaceStatus {
  domainCode: 'HRMS';
  domainName: 'Human Resource Management System';
  status: 'READY_FOR_DEVELOPMENT';
  pendingRequirementsNote: string;
  lastUpdated: string;
}

export interface HrmsBaseRecord {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// Canonical Business Entity Exports
export * from './department';
export * from './employee';
export * from './attendance';
export * from './leave';
export * from './payroll';
export * from './recruitment';
export * from './performance';
export * from './learning';
export * from './asset';
