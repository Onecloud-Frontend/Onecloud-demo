import { ApiResponseEnvelope } from '@core/api/types';
import { LeaveType, LeaveBalance, LeaveRequest } from '@features/hrms/types';
import { leaveService } from '@features/hrms/services/leaveService';
import { delay } from '../data/commonMockData';

export const leaveMockHandlers = {
  async getLeaveTypes(): Promise<ApiResponseEnvelope<LeaveType[]>> {
    await delay(200);
    return leaveService.getLeaveTypes();
  },

  async getLeaveBalances(employeeId?: string): Promise<ApiResponseEnvelope<LeaveBalance[]>> {
    await delay(200);
    return leaveService.getLeaveBalances(employeeId);
  },

  async getLeaveRequests(employeeId?: string): Promise<ApiResponseEnvelope<LeaveRequest[]>> {
    await delay(200);
    return leaveService.getLeaveRequests(employeeId);
  },

  async applyLeave(
    request: Omit<LeaveRequest, 'id' | 'status' | 'approvedBy' | 'approvalDate' | 'createdAt' | 'updatedAt'>
  ): Promise<ApiResponseEnvelope<LeaveRequest>> {
    await delay(250);
    return leaveService.applyLeave(request);
  },

  async reviewLeave(
    id: string,
    status: 'APPROVED' | 'REJECTED',
    approverId?: string,
    reason?: string
  ): Promise<ApiResponseEnvelope<void>> {
    await delay(250);
    return leaveService.reviewLeave(id, status, approverId, reason);
  },
};
