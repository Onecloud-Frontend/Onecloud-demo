import React from 'react';
import { DeveloperStarterPage } from '@shared/components';

export const CRMDashboardPage: React.FC = () => {
  return (
    <DeveloperStarterPage
      developerId="CRM-DEV-01"
      domain="CRM"
      domainCategory="CRM"
      teamBadgeVariant="team-b"
      capability="CRM Dashboard & Overview"
      route="/crm/dashboard"
      description="Executive sales overview, pipeline distribution, key account activity, and team metrics."
      scopeItems={[
        "Sales Pipeline Summary",
        "Deal Velocity & Conversion Metrics",
        "Recent Customer Interactions",
        "Sales Rep Target vs Actual"
]}
      typeLocation="src/features/crm/types/index.ts"
      serviceLocation="src/features/crm/services/crmService.ts"
      mockLocation="src/mock/crm/"
    />
  );
};
