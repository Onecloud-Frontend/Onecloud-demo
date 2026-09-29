/**
 * ERP Feature Domain Types
 * Ownership: Team A
 *
 * IMPORTANT:
 * Do NOT invent business entity fields or assume ERP modules (Procurement, Inventory, etc.).
 * All business schemas are marked as TBD until approved requirements and API contracts are provided.
 */

export interface ErpWorkspaceStatus {
  domainCode: 'ERP';
  domainName: 'Enterprise Resource Planning';
  status: 'READY_FOR_DEVELOPMENT';
  pendingRequirementsNote: 'TBD — Requirement/Backend Contract Required';
  lastUpdated: string;
}

/**
 * Generic ERP entity envelope template for future confirmed modules.
 */
export interface ErpBaseRecord {
  id: string;
  createdAt: string;
  updatedAt: string;
}
