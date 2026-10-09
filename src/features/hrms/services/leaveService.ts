import { ApiResponseEnvelope } from '@core/api/types';
import { LeaveType, LeaveBalance, LeaveRequest, Employee } from '../types';
import {
  mockLeaveTypes,
  mockLeaveBalances,
  mockLeaveRequests,
  mockEmployees,
} from '../../../mock/hrms/leaveMockData';

interface LeaveStoreState {
  leaveTypes: LeaveType[];
  leaveBalances: LeaveBalance[];
  leaveRequests: LeaveRequest[];
  employees: Employee[];
}

const STORAGE_KEY = 'onecloud_hrms_leave_store_v1';
const delay = (ms: number = 80) => new Promise((resolve) => setTimeout(resolve, ms));

function envelope<T>(data: T, message: string = 'Success'): ApiResponseEnvelope<T> {
  return {
    success: true,
    data,
    message,
    timestamp: new Date().toISOString(),
  };
}

class LeaveStateStore {
  private state: LeaveStoreState;
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.state = this.loadInitialState();
  }

  private loadInitialState(): LeaveStoreState {
    try {
      const persisted = localStorage.getItem(STORAGE_KEY);
      if (persisted) {
        return JSON.parse(persisted);
      }
    } catch {
      // LocalStorage unavailable, use in-memory state
    }

    return {
      leaveTypes: [...mockLeaveTypes],
      leaveBalances: [...mockLeaveBalances],
      leaveRequests: [...mockLeaveRequests],
      employees: [...mockEmployees],
    };
  }

  private notify() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch {
      // silent
    }
    this.listeners.forEach((listener) => listener());
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  public getState(): LeaveStoreState {
    return this.state;
  }

  public resetToDefault(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // silent
    }
    this.state = {
      leaveTypes: [...mockLeaveTypes],
      leaveBalances: [...mockLeaveBalances],
      leaveRequests: [...mockLeaveRequests],
      employees: [...mockEmployees],
    };
    this.notify();
  }

  public applyLeave(
    request: Omit<LeaveRequest, 'id' | 'status' | 'approvedBy' | 'approvalDate' | 'createdAt' | 'updatedAt'>
  ): LeaveRequest {
    const newReq: LeaveRequest = {
      ...request,
      id: `lr-${Date.now()}`,
      status: 'PENDING',
      approvedBy: null,
      approvalDate: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.state.leaveRequests = [newReq, ...this.state.leaveRequests];

    // Update pending balance
    let bal = this.state.leaveBalances.find(
      (b) => b.employeeId === request.employeeId && b.leaveTypeId === request.leaveTypeId
    );

    if (bal) {
      bal.pendingDays += request.totalDays;
      bal.availableDays = Math.max(0, bal.allocatedDays - bal.usedDays - bal.pendingDays);
    } else {
      const leaveType = this.state.leaveTypes.find((lt) => lt.id === request.leaveTypeId);
      const allocatedDays = leaveType?.defaultDaysPerYear || 20;
      const newBal: LeaveBalance = {
        id: `bal-${Date.now()}`,
        employeeId: request.employeeId,
        leaveTypeId: request.leaveTypeId,
        leaveTypeName: leaveType?.name || 'Leave',
        year: 2026,
        allocatedDays,
        usedDays: 0,
        pendingDays: request.totalDays,
        availableDays: Math.max(0, allocatedDays - request.totalDays),
      };
      this.state.leaveBalances = [...this.state.leaveBalances, newBal];
    }

    this.notify();
    return newReq;
  }

  public reviewLeaveRequest(
    id: string,
    status: 'APPROVED' | 'REJECTED',
    approverId: string = 'emp-1',
    reason?: string
  ): void {
    const req = this.state.leaveRequests.find((r) => r.id === id);
    if (req && req.status === 'PENDING') {
      req.status = status;
      req.approvedBy = approverId;
      req.approvalDate = new Date().toISOString();
      req.rejectionReason = reason || null;
      req.updatedAt = new Date().toISOString();

      const bal = this.state.leaveBalances.find(
        (b) => b.employeeId === req.employeeId && b.leaveTypeId === req.leaveTypeId
      );

      if (bal) {
        bal.pendingDays = Math.max(0, bal.pendingDays - req.totalDays);
        if (status === 'APPROVED') {
          bal.usedDays += req.totalDays;
        }
        bal.availableDays = Math.max(0, bal.allocatedDays - bal.usedDays - bal.pendingDays);
      }

      this.notify();
    }
  }
}

export const leaveStore = new LeaveStateStore();

export const leaveService = {
  async getLeaveTypes(): Promise<ApiResponseEnvelope<LeaveType[]>> {
    await delay();
    return envelope(leaveStore.getState().leaveTypes, 'Leave types retrieved');
  },

  async getLeaveBalances(employeeId?: string): Promise<ApiResponseEnvelope<LeaveBalance[]>> {
    await delay();
    const balances = employeeId
      ? leaveStore.getState().leaveBalances.filter((b) => b.employeeId === employeeId)
      : leaveStore.getState().leaveBalances;
    return envelope(balances, 'Leave balances retrieved');
  },

  async getLeaveRequests(employeeId?: string): Promise<ApiResponseEnvelope<LeaveRequest[]>> {
    await delay();
    const requests = employeeId
      ? leaveStore.getState().leaveRequests.filter((r) => r.employeeId === employeeId)
      : leaveStore.getState().leaveRequests;
    return envelope(requests, 'Leave requests retrieved');
  },

  async applyLeave(
    request: Omit<LeaveRequest, 'id' | 'status' | 'approvedBy' | 'approvalDate' | 'createdAt' | 'updatedAt'>
  ): Promise<ApiResponseEnvelope<LeaveRequest>> {
    await delay();
    const created = leaveStore.applyLeave(request);
    return envelope(created, 'Leave request submitted successfully');
  },

  async reviewLeave(
    id: string,
    status: 'APPROVED' | 'REJECTED',
    approverId?: string,
    reason?: string
  ): Promise<ApiResponseEnvelope<void>> {
    await delay();
    leaveStore.reviewLeaveRequest(id, status, approverId, reason);
    return envelope(undefined, `Leave request ${status.toLowerCase()}`);
  },

  async resetDemoData(): Promise<ApiResponseEnvelope<void>> {
    leaveStore.resetToDefault();
    return envelope(undefined, 'Leave demo data reset to default');
  },
};
