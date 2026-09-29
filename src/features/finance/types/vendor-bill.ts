/**
 * Canonical Vendor Bill & Payables Types
 * Ownership: Team Finance
 */

import type { CurrencyCode } from '@shared/types';

export type VendorBillStatus =
  | 'DRAFT'
  | 'AWAITING_APPROVAL'
  | 'APPROVED'
  | 'PARTIALLY_PAID'
  | 'PAID'
  | 'VOID'
  | 'OVERDUE';

export interface VendorBillLine {
  id: string;
  accountId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  hsnSacCode?: string;
}

export interface VendorBill {
  id: string;
  billNumber: string;
  vendorBillRef?: string;
  vendorId: string;
  purchaseOrderId: string | null;
  billDate: string;
  dueDate: string;
  currency: CurrencyCode;
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  paidAmount: number;
  balanceDue: number;
  status: VendorBillStatus;
  lines: VendorBillLine[];
  termsAndConditions?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PayableAging {
  vendorId: string;
  vendorName: string;
  current: number;
  days1To30: number;
  days31To60: number;
  days61To90: number;
  daysOver90: number;
  totalOutstanding: number;
}
