import React from 'react';
import { DeveloperStarterPage } from '@shared/components';

export const ERPDashboardPage: React.FC = () => {
  return (
    <DeveloperStarterPage
      developerId="ERP-DEV-01"
      domain="ERP"
      domainCategory="ERP / Supply Chain"
      teamBadgeVariant="team-a"
      capability="ERP Dashboard & Overview"
      route="/erp/dashboard"
      description="High-level operational overview, supply chain KPI aggregations, and domain activity status."
      scopeItems={[
        "ERP Executive Overview",
        "Operational KPI Aggregation",
        "Cross-module Activity Status",
        "Alerts & Exception Summary"
]}
      typeLocation="src/features/erp/types/index.ts"
      serviceLocation="src/features/erp/services/erpService.ts"
      mockLocation="src/mock/erp/"
    />
  );
};
