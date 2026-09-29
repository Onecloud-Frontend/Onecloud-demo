/**
 * ERP Feature Domain Types
 * Domain-specific models and interfaces will be declared here by Team A.
 */
export interface ErpDomainInfo {
  domainName: string;
  assignedTeam: string;
  status: 'base-established' | 'in-development' | 'stable';
}
