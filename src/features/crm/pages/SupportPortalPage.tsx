import React from 'react';
import { DeveloperStarterPage } from '@shared/components';

export const SupportPortalPage: React.FC = () => {
  return (
    <DeveloperStarterPage
      developerId="CRM-DEV-06"
      domain="CRM"
      domainCategory="CRM"
      teamBadgeVariant="team-b"
      capability="Support / Customer Portal"
      route="/crm/support"
      description="Customer service tickets, SLA resolution monitoring, knowledge base, and client portal."
      scopeItems={[
        "Support Ticket Management",
        "SLA Response & Resolution Tracking",
        "Customer Self-Service Interface",
        "Knowledge Base & Ticket Deflection"
]}
      typeLocation="src/features/crm/types/support.ts"
      serviceLocation="src/features/crm/services/supportService.ts"
      mockLocation="src/mock/crm/"
    />
  );
};
