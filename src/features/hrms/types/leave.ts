/**
 * Canonical Leave Management Types
 * Ownership: Team HRMS
 */

export type LeaveTypeStatus = 'ACTIVE' | 'INACTIVE';

export interface LeaveType {
  id: string;
  code: string;
  name: string;
  description?: string;
  defaultDaysPerYear: number;
  carryForwardAllowed: boolean;
  maxCarryForwardDays?: number;
  isUnpaid: boolean;
  status: LeaveTypeStatus;
}

export interface LeaveBalance {
  id: string;
  employeeId: string;
  leaveTypeId: string;
  leaveTypeName: string;
  year: number;
  allocatedDays: number;
  usedDays: number;
  pendingDays: number;
  availableDays: number;
}

export type LeaveRequestStatus =
  | 'PENDING'
  | 'APPROVED'
  | 'REJECTED'
  | 'CANCELLED';

export interface LeaveRequest {
  id: string;
  employeeId: string;
  leaveTypeId: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  reason: string;
  status: LeaveRequestStatus;
  approvedBy: string | null;
  approvalDate: string | null;
  rejectionReason?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LeaveApproval {
  id: string;
  leaveRequestId: string;
  approverId: string;
  action: 'APPROVED' | 'REJECTED';
  comments?: string;
  actionDate: string;
}
