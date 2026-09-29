import React from 'react';
import { DeveloperStarterPage } from '@shared/components';

export const ERPReportsPage: React.FC = () => {
  return (
    <DeveloperStarterPage
      developerId="ERP-DEV-07"
      domain="ERP"
      domainCategory="ERP / Supply Chain"
      teamBadgeVariant="team-a"
      capability="ERP Reporting / Cross-domain UI"
      route="/erp/reports"
      description="Operational analytics, inventory valuation, procurement spend, and cross-domain exports."
      scopeItems={[
        "Procurement Spend Analysis",
        "Inventory Valuation & Aging Reports",
        "Fulfillment SLA & Lead Time Analytics",
        "Cross-domain Data Export Engine"
]}
      typeLocation="src/features/erp/types/reports.ts"
      serviceLocation="src/features/erp/services/reportService.ts"
      mockLocation="src/mock/erp/"
    />
  );
};
