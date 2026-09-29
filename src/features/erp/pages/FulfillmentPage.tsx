import React from 'react';
import { DeveloperStarterPage } from '@shared/components';

export const FulfillmentPage: React.FC = () => {
  return (
    <DeveloperStarterPage
      developerId="ERP-DEV-06"
      domain="ERP"
      domainCategory="ERP / Supply Chain"
      teamBadgeVariant="team-a"
      capability="Sales Fulfillment / Returns"
      route="/erp/fulfillment"
      description="Order fulfillment lifecycle including picking, packing, shipping, and customer returns."
      scopeItems={[
        "Pick, Pack & Dispatch Operations",
        "Outbound Shipment Tracking",
        "Return Merchandise Authorization (RMA)",
        "Restocking & Return Inspection"
]}
      typeLocation="src/features/erp/types/fulfillment.ts"
      serviceLocation="src/features/erp/services/fulfillmentService.ts"
      mockLocation="src/mock/erp/"
    />
  );
};
