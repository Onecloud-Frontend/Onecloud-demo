/**
 * Canonical Finance Domain Types Entry Point
 * Ownership: Team Finance (Team 4 / FIN-DEV-01 to FIN-DEV-03)
 */

// Baseline workspace contract - preserved for foundation compatibility
export interface FinanceWorkspaceStatus {
  domain: 'finance';
  team: 'Team 4 (FIN-DEV-01, FIN-DEV-02, FIN-DEV-03)';
  foundationReady: boolean;
  activeDevelopers: number;
  pendingRequirementsNote: string;
}

export interface FinanceBaseRecord {
  id: string;
  code?: string;
  description?: string;
  createdAt: string;
  updatedAt?: string;
}

// Canonical Business Entity Exports
export * from './accounting';
export * from './invoice';
export * from './vendor-bill';
export * from './payment';
export * from './banking';
export * from './expense';
export * from './budget';
export * from './tax';
