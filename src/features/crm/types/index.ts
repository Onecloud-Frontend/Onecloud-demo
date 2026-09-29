/**
 * CRM Feature Domain Types
 * Ownership: Team B
 *
 * IMPORTANT:
 * Do NOT invent business entity fields or assume CRM modules (Leads, Contacts, Pipelines, etc.).
 * All business schemas are marked as TBD until approved requirements and API contracts are provided.
 */

export interface CrmWorkspaceStatus {
  domainCode: 'CRM';
  domainName: 'Customer Relationship Management';
  status: 'READY_FOR_DEVELOPMENT';
  pendingRequirementsNote: 'TBD — Requirement/Backend Contract Required';
  lastUpdated: string;
}

/**
 * Generic CRM entity envelope template for future confirmed modules.
 */
export interface CrmBaseRecord {
  id: string;
  createdAt: string;
  updatedAt: string;
}
