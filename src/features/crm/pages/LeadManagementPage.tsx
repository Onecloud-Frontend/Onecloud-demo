import React from 'react';
import { DeveloperStarterPage } from '@shared/components';

export const LeadManagementPage: React.FC = () => {
  return (
    <DeveloperStarterPage
      developerId="CRM-DEV-02"
      domain="CRM"
      domainCategory="CRM"
      teamBadgeVariant="team-b"
      capability="Lead Management"
      route="/crm/leads"
      description="Lead ingestion, qualification, scoring, and automated conversion workflows."
      scopeItems={[
        "Lead Ingestion & Sources",
        "Lead Qualification & Scoring",
        "Lead Assignment Rules",
        "Lead Conversion to Opportunity / Account"
]}
      typeLocation="src/features/crm/types/lead.ts"
      serviceLocation="src/features/crm/services/leadService.ts"
      mockLocation="src/mock/crm/"
    />
  );
};
