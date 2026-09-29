import React from 'react';
import { DeveloperStarterPage } from '@shared/components';

export const VendorManagementPage: React.FC = () => {
  return (
    <DeveloperStarterPage
      developerId="ERP-DEV-03"
      domain="ERP"
      domainCategory="ERP / Supply Chain"
      teamBadgeVariant="team-a"
      capability="Vendor Management"
      route="/erp/vendors"
      description="Supplier directory, vendor onboarding, contract terms, and supplier performance evaluation."
      scopeItems={[
        "Vendor Directory & Profiles",
        "Vendor Onboarding & Compliance",
        "Contract Terms & Pricing Agreements",
        "Vendor Performance Ratings"
]}
      typeLocation="src/features/erp/types/vendor.ts"
      serviceLocation="src/features/erp/services/vendorService.ts"
      mockLocation="src/mock/erp/"
    />
  );
};
