import React from 'react';
import { DeveloperStarterPage } from '@shared/components';

export const CRMReportsPage: React.FC = () => {
  return (
    <DeveloperStarterPage
      developerId="CRM-DEV-07"
      domain="CRM"
      domainCategory="CRM"
      teamBadgeVariant="team-b"
      capability="CRM Reporting / Analytics"
      route="/crm/reports"
      description="Sales funnel conversions, sales rep benchmarks, customer retention, and cohort reports."
      scopeItems={[
        "Sales Funnel Conversion Analytics",
        "Rep Performance & Quota Attainment",
        "Customer Retention & Churn Trends",
        "Lead Source ROI Reports"
]}
      typeLocation="src/features/crm/types/reports.ts"
      serviceLocation="src/features/crm/services/reportService.ts"
      mockLocation="src/mock/crm/"
    />
  );
};
