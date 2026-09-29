/**
 * Canonical General Ledger & Accounting Types
 * Ownership: Team Finance
 */

import type { CurrencyCode } from '@shared/types';

export type AccountCategory = 'ASSET' | 'LIABILITY' | 'EQUITY' | 'REVENUE' | 'EXPENSE';

export interface ChartOfAccount {
  id: string;
  accountCode: string;
  accountName: string;
  category: AccountCategory;
  subCategory: string;
  parentAccountId: string | null;
  currency: CurrencyCode;
  currentBalance: number;
  isReconciliationEnabled: boolean;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
}

export interface FinancialPeriod {
  id: string;
  periodCode: string;
  name: string;
  startDate: string;
  endDate: string;
  fiscalYear: string;
  status: 'OPEN' | 'CLOSED' | 'LOCKED';
}

export type JournalReferenceType =
  | 'MANUAL'
  | 'CUSTOMER_INVOICE'
  | 'VENDOR_BILL'
  | 'PAYMENT'
  | 'PAYROLL'
  | 'BANK_FEED'
  | 'DEPRECIATION'
  | 'TAX_SETTLEMENT';

export type JournalEntryStatus = 'DRAFT' | 'POSTED' | 'CANCELLED' | 'REVERSED';

export interface JournalEntryLine {
  id: string;
  accountId: string;
  accountCode?: string;
  accountName?: string;
  description: string;
  debit: number;
  credit: number;
  costCenterId: string | null;
}

export interface JournalEntry {
  id: string;
  journalNumber: string;
  entryDate: string;
  referenceType: JournalReferenceType;
  referenceId: string | null;
  description: string;
  status: JournalEntryStatus;
  totalDebit: number;
  totalCredit: number;
  lines: JournalEntryLine[];
  createdBy: string;
  postedBy: string | null;
  postedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LedgerEntry {
  id: string;
  entryDate: string;
  journalEntryId: string;
  accountId: string;
  debit: number;
  credit: number;
  runningBalance: number;
  description: string;
}
