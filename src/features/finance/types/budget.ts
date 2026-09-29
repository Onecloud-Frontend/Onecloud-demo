/**
 * Canonical Budget & Allocation Types
 * Ownership: Team Finance
 */

export interface Budget {
  id: string;
  budgetCode: string;
  name: string;
  fiscalYear: string;
  departmentId: string | null;
  totalBudgetedAmount: number;
  totalAllocatedAmount: number;
  status: 'DRAFT' | 'APPROVED' | 'ACTIVE' | 'CLOSED';
  createdAt: string;
  updatedAt: string;
}

export interface BudgetAllocation {
  id: string;
  budgetId: string;
  accountId: string;
  period: string;
  allocatedAmount: number;
  utilizedAmount: number;
  remainingAmount: number;
}

export interface BudgetVariance {
  budgetId: string;
  accountId: string;
  accountName: string;
  budgetedAmount: number;
  actualExpense: number;
  varianceAmount: number;
  variancePercentage: number;
}
