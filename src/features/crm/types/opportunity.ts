/**
 * Canonical Opportunity Deal Types
 * Ownership: Team CRM
 */

export type OpportunityStage =
  | 'PROSPECTING'
  | 'QUALIFICATION'
  | 'NEEDS_ANALYSIS'
  | 'VALUE_PROPOSITION'
  | 'PROPOSAL_QUOTATION'
  | 'NEGOTIATION'
  | 'CLOSED_WON'
  | 'CLOSED_LOST';

export type OpportunityStatus = 'OPEN' | 'WON' | 'LOST' | 'ABANDONED';

export interface Opportunity {
  id: string;
  opportunityNumber: string;
  customerId: string;
  contactId: string | null;
  title: string;
  description?: string;
  expectedValue: number;
  probability: number;
  stage: OpportunityStage;
  expectedCloseDate: string;
  actualCloseDate: string | null;
  lossReason: string | null;
  ownerId: string;
  status: OpportunityStatus;
  pipelineId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OpportunityActivity {
  id: string;
  opportunityId: string;
  activityType: 'CALL' | 'EMAIL' | 'MEETING' | 'STAGE_CHANGE' | 'NOTE';
  notes: string;
  loggedBy: string;
  loggedAt: string;
}
