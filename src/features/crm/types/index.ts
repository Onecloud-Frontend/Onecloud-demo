/**
 * Canonical CRM Domain Types Entry Point
 * Ownership: Team CRM (Team 2)
 */

// Baseline workspace contract - preserved for foundation compatibility
export interface CrmWorkspaceStatus {
  domainCode: 'CRM';
  domainName: 'Customer Relationship Management';
  status: 'READY_FOR_DEVELOPMENT';
  pendingRequirementsNote: string;
  lastUpdated: string;
}

export interface CrmBaseRecord {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// Canonical Business Entity Exports
export * from './lead';
export * from './customer';
export * from './contact';
export * from './opportunity';
export * from './activity';
export * from './pipeline';
export * from './quotation';
export * from './support';
export * from './dashboard';
