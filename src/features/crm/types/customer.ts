/**
 * Canonical Customer Master Types
 * Ownership: Team CRM (Master Profile Authority)
 */

import type { Address } from '@shared/types';

export type CustomerType = 'INDIVIDUAL' | 'BUSINESS' | 'ENTERPRISE';

export type CustomerStatus = 'ACTIVE' | 'INACTIVE' | 'PROSPECT' | 'CHURNED';

export interface Customer {
  id: string;
  customerCode: string;
  name: string;
  type: CustomerType;
  email: string;
  phone: string;
  website?: string;
  industry: string;
  ownerId: string;
  status: CustomerStatus;
  billingAddress: Address;
  shippingAddress: Address;
  gstin?: string;
  pan?: string;
  creditLimit?: number;
  paymentTermsDays?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerAddress {
  id: string;
  customerId: string;
  type: 'BILLING' | 'SHIPPING' | 'OTHER';
  address: Address;
  isDefault: boolean;
}

export interface CustomerReference {
  id: string;
  customerCode: string;
  name: string;
  email?: string;
}
