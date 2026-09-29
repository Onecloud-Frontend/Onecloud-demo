import React from 'react';
import { DeveloperStarterPage } from '@shared/components';

export const ESSEmployeeAssetsPage: React.FC = () => {
  return (
    <DeveloperStarterPage
      developerId="HRMS-DEV-07"
      domain="HRMS"
      domainCategory="HRMS"
      teamBadgeVariant="team-c"
      capability="ESS + Assets"
      route="/hrms/ess-assets"
      description="Employee Self-Service (ESS) profile updates, hardware asset requests, and returns."
      scopeItems={[
        "Employee Self-Service (ESS) Profile",
        "Personal Information Updates",
        "Company Asset Inventory & Allocation",
        "Asset Request & Return Workflow"
]}
      typeLocation="src/features/hrms/types/essAssets.ts"
      serviceLocation="src/features/hrms/services/essAssetsService.ts"
      mockLocation="src/mock/hrms/"
    />
  );
};
