/**
 * Canonical Customer Support & Ticket Types
 * Ownership: Team CRM
 */

import type { DocumentReference } from '@shared/types';

export type SupportCategory =
  | 'TECHNICAL'
  | 'BILLING'
  | 'PRODUCT_INQUIRY'
  | 'FEEDBACK'
  | 'SERVICE_REQUEST'
  | 'OTHER';

export type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export type TicketStatus =
  | 'OPEN'
  | 'ASSIGNED'
  | 'IN_PROGRESS'
  | 'WAITING_ON_CUSTOMER'
  | 'RESOLVED'
  | 'CLOSED';

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  customerId: string;
  contactId: string | null;
  subject: string;
  description: string;
  category: SupportCategory;
  priority: TicketPriority;
  status: TicketStatus;
  assignedTo: string | null;
  slaDueAt?: string;
  resolvedAt: string | null;
  closedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SupportComment {
  id: string;
  ticketId: string;
  authorId: string;
  isInternal: boolean;
  content: string;
  attachments?: DocumentReference[];
  createdAt: string;
}

export interface SupportAttachment {
  id: string;
  ticketId: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  uploadedAt: string;
}
