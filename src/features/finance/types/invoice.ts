/**
 * Canonical Customer Invoicing & Receivables Types
 * Ownership: Team Finance
 */

import type { Address, CurrencyCode } from '@shared/types';
import type { PaymentAllocation, PaymentMethod } from './payment';

export type InvoiceStatus =
  | 'DRAFT'
  | 'ISSUED'
  | 'PARTIALLY_PAID'
  | 'PAID'
  | 'VOID'
  | 'OVERDUE';

export interface CustomerInvoiceLine {
  id: string;
  description: string;
  hsnSacCode?: string;
  quantity: number;
  unitPrice: number;
  discountAmount: number;
  taxableAmount: number;
  cgstRate: number;
  cgstAmount: number;
  sgstRate: number;
  sgstAmount: number;
  igstRate: number;
  igstAmount: number;
  totalAmount: number;
}

export interface CustomerInvoice {
  id: string;
  invoiceNumber: string;
  customerId: string;
  salesOrderId: string | null;
  invoiceDate: string;
  dueDate: string;
  currency: CurrencyCode;
  subtotal: number;
  discountAmount: number;
  cgstAmount: number;
  sgstAmount: number;
  igstAmount: number;
  totalTaxAmount: number;
  totalAmount: number;
  paidAmount: number;
  balanceDue: number;
  status: InvoiceStatus;
  billingAddress: Address;
  shippingAddress: Address;
  gstin?: string;
  pan?: string;
  lines: CustomerInvoiceLine[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export type ReceiptStatus = 'DRAFT' | 'CLEARED' | 'BOUNCED' | 'CANCELLED';

export interface Receipt {
  id: string;
  receiptNumber: string;
  customerId: string;
  receiptDate: string;
  paymentMethod: PaymentMethod;
  bankAccountId: string;
  currency: CurrencyCode;
  amount: number;
  referenceNumber?: string;
  status: ReceiptStatus;
  allocations: PaymentAllocation[];
  createdAt: string;
}

export interface Collection {
  id: string;
  customerId: string;
  collectorId: string;
  contactDate: string;
  promiseToPayDate: string | null;
  promiseAmount: number | null;
  status: 'SCHEDULED' | 'PROMISED' | 'COLLECTED' | 'DEFAULTED';
  notes: string;
}

export interface ReceivableAging {
  customerId: string;
  customerName: string;
  current: number;
  days1To30: number;
  days31To60: number;
  days61To90: number;
  daysOver90: number;
  totalOutstanding: number;
}
