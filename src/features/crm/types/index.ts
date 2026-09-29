/**
 * CRM Feature Domain Types
 * Domain-specific models and interfaces will be declared here by Team B.
 */
export interface CrmDomainInfo {
  domainName: string;
  assignedTeam: string;
  status: 'base-established' | 'in-development' | 'stable';
}
