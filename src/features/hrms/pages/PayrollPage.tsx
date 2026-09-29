import React from 'react';
import { DeveloperStarterPage } from '@shared/components';

export const PayrollPage: React.FC = () => {
  return (
    <DeveloperStarterPage
      developerId="HRMS-DEV-04"
      domain="HRMS"
      domainCategory="HRMS"
      teamBadgeVariant="team-c"
      capability="Payroll"
      route="/hrms/payroll"
      description="Salary structures, earnings and deductions, monthly payroll processing, and pay slip distribution."
      scopeItems={[
        "Salary Structure & CTC Breakdown",
        "Monthly Payroll Run & Processing",
        "Statutory Deductions & Taxes",
        "Pay Slip Generation & Distribution"
]}
      typeLocation="src/features/hrms/types/payroll.ts"
      serviceLocation="src/features/hrms/services/payrollService.ts"
      mockLocation="src/mock/hrms/"
    />
  );
};
