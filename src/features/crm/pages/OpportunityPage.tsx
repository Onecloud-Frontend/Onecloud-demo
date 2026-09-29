import React from 'react';
import { DeveloperStarterPage } from '@shared/components';

export const OpportunityPage: React.FC = () => {
  return (
    <DeveloperStarterPage
      developerId="CRM-DEV-03"
      domain="CRM"
      domainCategory="CRM"
      teamBadgeVariant="team-b"
      capability="Opportunity"
      route="/crm/opportunities"
      description="Deal tracking across sales stages, revenue forecasting, and win/loss reason analysis."
      scopeItems={[
        "Opportunity Pipeline & Stages",
        "Weighted Revenue Forecasting",
        "Competitor & Win/Loss Tracking",
        "Deal Closing & Contract Milestones"
]}
      typeLocation="src/features/crm/types/opportunity.ts"
      serviceLocation="src/features/crm/services/opportunityService.ts"
      mockLocation="src/mock/crm/"
    />
  );
};
