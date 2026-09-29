/**
 * Canonical CRM Dashboard & Metric Types
 * Ownership: Team CRM
 */

export interface CrmDashboardMetrics {
  totalLeads: number;
  qualifiedLeads: number;
  openOpportunities: number;
  totalPipelineValue: number;
  winRatePercentage: number;
  activeCustomers: number;
  openTickets: number;
}

export interface PipelineStageMetric {
  stageName: string;
  dealCount: number;
  totalValue: number;
}
