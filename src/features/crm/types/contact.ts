/**
 * Canonical Contact Stakeholder Types
 * Ownership: Team CRM
 */

export interface Contact {
  id: string;
  customerId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  mobile?: string;
  designation?: string;
  department?: string;
  isPrimary: boolean;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
}
