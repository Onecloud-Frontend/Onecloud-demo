/**
 * Canonical Address & Contact Shared Types
 * Domain-agnostic value objects for geographic location and direct contact metadata.
 */

export type AddressType =
  | 'BILLING'
  | 'SHIPPING'
  | 'WORK'
  | 'HOME'
  | 'REGISTERED'
  | 'WAREHOUSE'
  | 'BRANCH'
  | 'OTHER';

export interface Address {
  id?: string;
  addressType?: AddressType;
  street: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

export interface ContactInfo {
  email?: string;
  phone?: string;
  alternatePhone?: string;
  website?: string;
}
