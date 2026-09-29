/**
 * Canonical Banking & Bank Reconciliation Types
 * Ownership: Team Finance
 */

import type { CurrencyCode } from '@shared/types';

export interface BankAccount {
  id: string;
  accountName: string;
  accountNumber: string;
  bankName: string;
  branchName: string;
  ifscCode: string;
  accountType: 'CURRENT' | 'SAVINGS' | 'OVERDRAFT';
  currency: CurrencyCode;
  openingBalance: number;
  currentBalance: number;
  status: 'ACTIVE' | 'INACTIVE';
  glAccountId: string;
  createdAt: string;
}

export interface BankTransaction {
  id: string;
  bankAccountId: string;
  transactionDate: string;
  valueDate: string;
  transactionType: 'DEPOSIT' | 'WITHDRAWAL' | 'TRANSFER' | 'INTEREST' | 'FEE';
  referenceNumber?: string;
  description: string;
  debit: number;
  credit: number;
  balanceAfter: number;
  isReconciled: boolean;
}

export interface BankReconciliation {
  id: string;
  bankAccountId: string;
  statementStartDate: string;
  statementEndDate: string;
  statementEndingBalance: number;
  glEndingBalance: number;
  difference: number;
  status: 'IN_PROGRESS' | 'RECONCILED' | 'VARIANCE_FLAGGED';
  reconciledBy: string;
  completedAt: string | null;
}

export interface BankReconciliationItem {
  id: string;
  reconciliationId: string;
  bankTransactionId: string;
  matchedJournalLineId: string | null;
  isMatched: boolean;
  matchedAmount: number;
}
