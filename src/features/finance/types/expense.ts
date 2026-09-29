/**
 * Canonical Employee Expenses & Reimbursement Types
 * Ownership: Team Finance
 */

import type { PaymentMethod } from './payment';

export type ExpenseClaimStatus =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'APPROVED'
  | 'REJECTED'
  | 'REIMBURSED';

export interface ExpenseItem {
  id: string;
  category:
    | 'TRAVEL'
    | 'MEALS'
    | 'LODGING'
    | 'SUPPLIES'
    | 'COMMUNICATION'
    | 'ENTERTAINMENT'
    | 'OTHER';
  expenseDate: string;
  description: string;
  amount: number;
  receiptUrl?: string;
  isTaxDeductible: boolean;
}

export interface ExpenseClaim {
  id: string;
  claimNumber: string;
  employeeId: string;
  title: string;
  submissionDate: string;
  status: ExpenseClaimStatus;
  totalAmount: number;
  approvedAmount: number | null;
  approvedBy: string | null;
  items: ExpenseItem[];
  createdAt: string;
  updatedAt: string;
}

export interface Reimbursement {
  id: string;
  claimId: string;
  paymentMethod: PaymentMethod;
  paymentDate: string;
  referenceNumber?: string;
  amountPaid: number;
  processedBy: string;
}
