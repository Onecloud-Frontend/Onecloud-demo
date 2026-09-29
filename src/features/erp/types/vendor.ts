/**
 * Canonical ERP Vendor & Supplier Types
 * Ownership: Team ERP
 */

import type { Address, CurrencyCode } from '@shared/types';

export type VendorCategory =
  | 'RAW_MATERIALS'
  | 'LOGISTICS'
  | 'SERVICES'
  | 'EQUIPMENT'
  | 'GENERAL';

export type VendorStatus =
  | 'ACTIVE'
  | 'INACTIVE'
  | 'BLACKLISTED'
  | 'UNDER_REVIEW';

export interface VendorContact {
  name: string;
  email: string;
  phone: string;
  designation?: string;
}

export type VendorAddress = Address;

export interface Vendor {
  id: string;
  vendorCode: string;
  name: string;
  category: VendorCategory;
  email: string;
  phone: string;
  website?: string;
  gstin?: string;
  pan?: string;
  paymentTermsDays: number;
  currency: CurrencyCode;
  status: VendorStatus;
  rating?: number;
  billingAddress: Address;
  shippingAddress: Address;
  primaryContact: VendorContact;
  createdAt: string;
  updatedAt: string;
}

export interface VendorEvaluation {
  id: string;
  vendorId: string;
  evaluationDate: string;
  evaluatorId: string;
  qualityRating: number;
  deliveryRating: number;
  pricingRating: number;
  overallScore: number;
  remarks?: string;
}

export interface VendorContract {
  id: string;
  vendorId: string;
  contractNumber: string;
  title: string;
  startDate: string;
  endDate: string;
  contractValue: number;
  terms?: string;
  status: 'DRAFT' | 'ACTIVE' | 'EXPIRED' | 'TERMINATED';
}

export interface VendorReference {
  id: string;
  vendorCode: string;
  name: string;
}
