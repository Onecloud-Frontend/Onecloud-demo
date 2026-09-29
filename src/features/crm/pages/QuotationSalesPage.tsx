import React from 'react';
import { DeveloperStarterPage } from '@shared/components';

export const QuotationSalesPage: React.FC = () => {
  return (
    <DeveloperStarterPage
      developerId="CRM-DEV-05"
      domain="CRM"
      domainCategory="CRM"
      teamBadgeVariant="team-b"
      capability="Quotation / Sales"
      route="/crm/quotations"
      description="Sales quotation generation, price book selection, discount approvals, and order handoff."
      scopeItems={[
        "Price Book & Catalog Selection",
        "Quote Creation & Line Items",
        "Discount Approval Workflow",
        "Order Conversion Handoff"
]}
      typeLocation="src/features/crm/types/quotation.ts"
      serviceLocation="src/features/crm/services/quotationService.ts"
      mockLocation="src/mock/crm/"
    />
  );
};
