/**
 * Canonical Quotation & Pricing Types
 * Ownership: Team CRM
 */

import type { CurrencyCode } from '@shared/types';
import type { CustomerType } from './customer';

export type QuoteStatus =
  | 'DRAFT'
  | 'PENDING_APPROVAL'
  | 'APPROVED'
  | 'SENT'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'EXPIRED'
  | 'CONVERTED';

export interface QuotationItem {
  id: string;
  quoteId?: string;
  productId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  discountPercentage: number;
  discountAmount: number;
  taxRate: number;
  taxAmount: number;
  total: number;
}

export interface Quotation {
  id: string;
  quoteNumber: string;
  customerId: string;
  contactId: string | null;
  opportunityId: string | null;
  quoteDate: string;
  expiryDate: string;
  status: QuoteStatus;
  currency: CurrencyCode;
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  totalAmount: number;
  termsAndConditions?: string;
  items: QuotationItem[];
  createdBy: string;
  approvedBy: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PricingRule {
  id: string;
  name: string;
  customerType?: CustomerType;
  minOrderValue?: number;
  discountPercentage: number;
  validFrom: string;
  validTo: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface DiscountRule {
  id: string;
  code: string;
  description: string;
  maxDiscountPercentage: number;
  requiresApprovalAbove: number;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface QuoteApproval {
  id: string;
  quoteId: string;
  approverId: string;
  status: 'APPROVED' | 'REJECTED';
  comments?: string;
  reviewedAt: string;
}
