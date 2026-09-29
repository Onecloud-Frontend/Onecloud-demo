/**
 * Canonical ERP Domain Types Entry Point
 * Ownership: Team ERP (Team 1)
 */

// Baseline workspace contract - preserved for foundation compatibility
export interface ErpWorkspaceStatus {
  domainCode: 'ERP';
  domainName: 'Enterprise Resource Planning';
  status: 'READY_FOR_DEVELOPMENT';
  pendingRequirementsNote: string;
  lastUpdated: string;
}

export interface ErpBaseRecord {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// Canonical Business Entity Exports
export * from './product';
export * from './vendor';
export * from './procurement';
export * from './purchase-order';
export * from './inventory';
export * from './warehouse';
export * from './fulfillment';
