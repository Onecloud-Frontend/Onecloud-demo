/**
 * Canonical CRM Lead Types
 * Ownership: Team CRM
 */

export type LeadSource =
  | 'WEBSITE'
  | 'REFERRAL'
  | 'COLD_CALL'
  | 'CAMPAIGN'
  | 'EVENT'
  | 'LINKEDIN'
  | 'PARTNER'
  | 'OTHER';

export type LeadStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'QUALIFIED'
  | 'UNQUALIFIED'
  | 'CONVERTED';

export interface Lead {
  id: string;
  leadNumber: string;
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  phone: string;
  source: LeadSource;
  status: LeadStatus;
  ownerId: string;
  assignedTo: string | null;
  industry: string;
  estimatedValue: number;
  notes?: string;
  convertedCustomerId: string | null;
  convertedOpportunityId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LeadActivity {
  id: string;
  leadId: string;
  activityType: 'CALL' | 'EMAIL' | 'MEETING' | 'NOTE';
  description: string;
  performedBy: string;
  performedAt: string;
}
