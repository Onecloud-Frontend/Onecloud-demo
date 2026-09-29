/**
 * HRMS Feature Domain Types
 * Domain-specific models and interfaces will be declared here by Team C.
 */
export interface HrmsDomainInfo {
  domainName: string;
  assignedTeam: string;
  status: 'base-established' | 'in-development' | 'stable';
}
