/**
 * Canonical ERP Procurement & Sourcing Types
 * Ownership: Team ERP
 */

export type PurchaseRequestStatus =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'APPROVED'
  | 'REJECTED'
  | 'ORDERED'
  | 'CANCELLED';

export interface PurchaseRequestItem {
  id: string;
  productId: string;
  description: string;
  quantity: number;
  estimatedUnitPrice: number;
  estimatedTotal: number;
}

export interface PurchaseRequest {
  id: string;
  requestNumber: string;
  requestedBy: string;
  departmentId: string;
  date: string;
  requiredDate: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  status: PurchaseRequestStatus;
  justification: string;
  items: PurchaseRequestItem[];
  createdAt: string;
  updatedAt: string;
}

export type RFQStatus =
  | 'DRAFT'
  | 'ISSUED'
  | 'EVALUATING'
  | 'AWARDED'
  | 'CANCELLED';

export interface RFQItem {
  id: string;
  productId: string;
  description: string;
  quantity: number;
  targetUnitPrice?: number;
}

export interface RFQ {
  id: string;
  rfqNumber: string;
  title: string;
  issueDate: string;
  submissionDeadline: string;
  status: RFQStatus;
  invitedVendorIds: string[];
  items: RFQItem[];
  createdAt: string;
  updatedAt: string;
}

export interface VendorQuoteItem {
  id: string;
  rfqItemId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  deliveryLeadDays: number;
  total: number;
}

export interface VendorQuote {
  id: string;
  rfqId: string;
  vendorId: string;
  quoteReference: string;
  quoteDate: string;
  validUntil: string;
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  status: 'RECEIVED' | 'ACCEPTED' | 'REJECTED';
  items: VendorQuoteItem[];
}
