import React from 'react';
import { DeveloperStarterPage } from '@shared/components';

export const APARBankingPage: React.FC = () => {
  return (
    <DeveloperStarterPage
      developerId="FIN-DEV-02"
      domain="Finance"
      domainCategory="Finance"
      teamBadgeVariant="team-d"
      capability="Accounts Payable + Accounts Receivable + Banking"
      route="/finance/ap-ar-banking"
      description="Supplier invoices (AP), customer billing (AR), payment vouchers, and bank reconciliations."
      scopeItems={[
        "Accounts Payable (AP) Bills & Aging",
        "Accounts Receivable (AR) Invoices & Collections",
        "Bank Accounts Directory",
        "Bank Statement Reconciliation"
]}
      typeLocation="src/features/finance/types/aparBanking.ts"
      serviceLocation="src/features/finance/services/aparBankingService.ts"
      mockLocation="src/mock/finance/"
    />
  );
};
