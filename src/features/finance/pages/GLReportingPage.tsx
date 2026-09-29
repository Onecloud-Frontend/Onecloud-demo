import React from 'react';
import { DeveloperStarterPage } from '@shared/components';

export const GLReportingPage: React.FC = () => {
  return (
    <DeveloperStarterPage
      developerId="FIN-DEV-01"
      domain="Finance"
      domainCategory="Finance"
      teamBadgeVariant="team-d"
      capability="General Ledger + Financial Reporting"
      route="/finance/general-ledger"
      description="Chart of accounts, journal voucher entries, trial balance, and financial balance sheets."
      scopeItems={[
        "Chart of Accounts (COA)",
        "General Journal Voucher Entries",
        "Trial Balance & General Ledger",
        "Balance Sheet & P&L Statements"
]}
      typeLocation="src/features/finance/types/gl.ts"
      serviceLocation="src/features/finance/services/glService.ts"
      mockLocation="src/mock/finance/"
    />
  );
};
