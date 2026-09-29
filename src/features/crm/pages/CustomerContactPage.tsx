import React from 'react';
import { DeveloperStarterPage } from '@shared/components';

export const CustomerContactPage: React.FC = () => {
  return (
    <DeveloperStarterPage
      developerId="CRM-DEV-04"
      domain="CRM"
      domainCategory="CRM"
      teamBadgeVariant="team-b"
      capability="Customer / Contact"
      route="/crm/customers"
      description="Customer account directory, stakeholder contact details, engagement logs, and Customer 360."
      scopeItems={[
        "Customer Account Directory",
        "Contact Profiles & Hierarchy",
        "Engagement Timeline & Activity Logs",
        "Customer 360 View"
]}
      typeLocation="src/features/crm/types/customer.ts"
      serviceLocation="src/features/crm/services/customerService.ts"
      mockLocation="src/mock/crm/"
    />
  );
};
