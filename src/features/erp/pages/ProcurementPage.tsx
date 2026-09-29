import React from 'react';
import { DeveloperStarterPage } from '@shared/components';

export const ProcurementPage: React.FC = () => {
  return (
    <DeveloperStarterPage
      developerId="ERP-DEV-02"
      domain="ERP"
      domainCategory="ERP / Supply Chain"
      teamBadgeVariant="team-a"
      capability="Procurement"
      route="/erp/procurement"
      description="Management of purchase requisitions, approval workflows, and supplier purchase orders."
      scopeItems={[
        "Purchase Requisitions",
        "Purchase Approvals",
        "Purchase Orders (PO)",
        "Procurement Lifecycle Tracking"
]}
      typeLocation="src/features/erp/types/procurement.ts"
      serviceLocation="src/features/erp/services/procurementService.ts"
      mockLocation="src/mock/erp/"
    />
  );
};
