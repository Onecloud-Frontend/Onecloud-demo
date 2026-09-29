import React from 'react';
import { DeveloperStarterPage } from '@shared/components';

export const LeaveManagementPage: React.FC = () => {
  return (
    <DeveloperStarterPage
      developerId="HRMS-DEV-03"
      domain="HRMS"
      domainCategory="HRMS"
      teamBadgeVariant="team-c"
      capability="Leave Management"
      route="/hrms/leave"
      description="Leave entitlement balances, leave applications, manager approvals, and holiday calendar."
      scopeItems={[
        "Leave Policy & Entitlement Balances",
        "Leave Applications & Workflow",
        "Manager Approval Matrix",
        "Company Holiday Calendar"
]}
      typeLocation="src/features/hrms/types/leave.ts"
      serviceLocation="src/features/hrms/services/leaveService.ts"
      mockLocation="src/mock/hrms/"
    />
  );
};
