/**
 * Canonical Payment & Settlement Types
 * Ownership: Team Finance
 */

import type { CurrencyCode } from '@shared/types';

export type PaymentMethod =
  | 'BANK_TRANSFER'
  | 'CHEQUE'
  | 'NEFT_RTGS'
  | 'UPI'
  | 'CREDIT_CARD'
  | 'CASH';

export type PaymentStatus =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'CLEARED'
  | 'REJECTED'
  | 'CANCELLED';

export interface PaymentAllocation {
  invoiceOrBillId: string;
  allocationAmount: number;
}

export interface Payment {
  id: string;
  paymentNumber: string;
  paymentType: 'VENDOR_PAYMENT' | 'CUSTOMER_REFUND';
  payeeId: string;
  paymentDate: string;
  paymentMethod: PaymentMethod;
  bankAccountId: string;
  currency: CurrencyCode;
  amount: number;
  referenceNumber?: string;
  status: PaymentStatus;
  allocations: PaymentAllocation[];
  notes?: string;
  createdAt: string;
}
