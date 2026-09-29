import React from 'react';
import { DeveloperStarterPage } from '@shared/components';

export const ExpensesBudgetsTaxPage: React.FC = () => {
  return (
    <DeveloperStarterPage
      developerId="FIN-DEV-03"
      domain="Finance"
      domainCategory="Finance"
      teamBadgeVariant="team-d"
      capability="Expenses + Budgets + Taxation"
      route="/finance/expenses-budgets-tax"
      description="Employee expense claims, departmental budget allocations, and tax code rule management."
      scopeItems={[
        "Employee Expense Claim Approvals",
        "Departmental Budget Allocation & Monitoring",
        "Tax Code Configuration (VAT/GST/Sales Tax)",
        "Tax Filing & Liability Reports"
]}
      typeLocation="src/features/finance/types/expensesBudgetsTax.ts"
      serviceLocation="src/features/finance/services/expensesBudgetsTaxService.ts"
      mockLocation="src/mock/finance/"
    />
  );
};
