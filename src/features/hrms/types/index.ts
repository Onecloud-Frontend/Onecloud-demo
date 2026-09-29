/**
 * HRMS Feature Domain Types
 * Ownership: Team C
 *
 * IMPORTANT:
 * Do NOT invent business entity fields or assume HRMS modules (Payroll, Employees, Leaves, etc.).
 * All business schemas are marked as TBD until approved requirements and API contracts are provided.
 */

export interface HrmsWorkspaceStatus {
  domainCode: 'HRMS';
  domainName: 'Human Resource Management System';
  status: 'READY_FOR_DEVELOPMENT';
  pendingRequirementsNote: 'TBD — Requirement/Backend Contract Required';
  lastUpdated: string;
}

/**
 * Generic HRMS entity envelope template for future confirmed modules.
 */
export interface HrmsBaseRecord {
  id: string;
  createdAt: string;
  updatedAt: string;
}
