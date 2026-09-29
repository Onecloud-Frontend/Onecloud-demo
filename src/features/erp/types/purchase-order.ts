/**
 * Canonical ERP Purchase Order Types
 * Ownership: Team ERP
 */

import type { Address, CurrencyCode } from '@shared/types';

export type PurchaseOrderStatus =
  | 'DRAFT'
  | 'PENDING_APPROVAL'
  | 'APPROVED'
  | 'REJECTED'
  | 'SENT'
  | 'PARTIALLY_RECEIVED'
  | 'RECEIVED'
  | 'CANCELLED';

export interface PurchaseOrderItem {
  id: string;
  productId: string;
  description: string;
  quantity: number;
  receivedQuantity: number;
  unitPrice: number;
  taxRate: number;
  taxAmount: number;
  totalAmount: number;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  vendorId: string;
  requestId: string | null;
  orderDate: string;
  expectedDeliveryDate: string;
  status: PurchaseOrderStatus;
  currency: CurrencyCode;
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;
  shippingAddress: Address;
  notes?: string;
  termsAndConditions?: string;
  items: PurchaseOrderItem[];
  createdBy: string;
  approvedBy: string | null;
  createdAt: string;
  updatedAt: string;
}
