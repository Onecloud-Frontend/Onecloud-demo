/**
 * Canonical Activity & Communications Types
 * Ownership: Team CRM
 */

export type ActivityStatus = 'PLANNED' | 'HELD' | 'CANCELLED' | 'COMPLETED';

export interface Activity {
  id: string;
  entityType: 'LEAD' | 'CUSTOMER' | 'OPPORTUNITY' | 'TICKET';
  entityId: string;
  type: 'TASK' | 'MEETING' | 'CALL' | 'EMAIL';
  subject: string;
  description?: string;
  status: ActivityStatus;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  dueDate?: string;
  scheduledAt?: string;
  completedAt: string | null;
  assignedTo: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Communication {
  id: string;
  customerId?: string;
  contactId?: string;
  channel: 'EMAIL' | 'SMS' | 'WHATSAPP' | 'PHONE';
  direction: 'INBOUND' | 'OUTBOUND';
  subject?: string;
  content: string;
  sender: string;
  recipient: string;
  sentAt: string;
  status: 'SENT' | 'DELIVERED' | 'FAILED' | 'RECEIVED';
}

export interface Meeting {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  location?: string;
  meetingLink?: string;
  organizerId: string;
  participantEmails: string[];
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
  relatedEntityType?: string;
  relatedEntityId?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'DEFERRED';
  assignedTo: string;
  relatedEntityType?: string;
  relatedEntityId?: string;
  completedAt: string | null;
}
