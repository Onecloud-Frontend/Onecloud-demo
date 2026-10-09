import { ApiResponseEnvelope } from '@core/api/types';
import { AttendanceRecord, Shift, OvertimeRecord, AttendanceCorrection } from '../types';
import { attendanceStore } from './attendanceStore';

const delay = (ms: number = 80) => new Promise((resolve) => setTimeout(resolve, ms));

function envelope<T>(data: T, message: string = 'Success'): ApiResponseEnvelope<T> {
  return {
    success: true,
    data,
    message,
    timestamp: new Date().toISOString(),
  };
}

export const attendanceService = {
  async getAttendanceRecords(date?: string): Promise<ApiResponseEnvelope<AttendanceRecord[]>> {
    await delay();
    const records = date
      ? attendanceStore.getState().attendance.filter((a) => a.date === date)
      : attendanceStore.getState().attendance;
    return envelope(records, 'Attendance records retrieved');
  },

  async clockIn(employeeId?: string): Promise<ApiResponseEnvelope<AttendanceRecord>> {
    await delay();
    const record = attendanceStore.clockIn(employeeId);
    return envelope(record, 'Clocked in successfully');
  },

  async clockOut(employeeId?: string): Promise<ApiResponseEnvelope<AttendanceRecord | null>> {
    await delay();
    const record = attendanceStore.clockOut(employeeId);
    return envelope(record, 'Clocked out successfully');
  },

  async getShifts(): Promise<ApiResponseEnvelope<Shift[]>> {
    await delay();
    return envelope(attendanceStore.getState().shifts, 'Shifts retrieved');
  },

  async addShift(shift: Omit<Shift, 'id'>): Promise<ApiResponseEnvelope<Shift>> {
    await delay();
    const created = attendanceStore.addShift(shift);
    return envelope(created, 'Shift added successfully');
  },

  async assignShift(employeeId: string, shiftId: string): Promise<ApiResponseEnvelope<void>> {
    await delay();
    attendanceStore.assignShift(employeeId, shiftId);
    return envelope(undefined, 'Shift assigned successfully');
  },

  async getOvertimeRecords(): Promise<ApiResponseEnvelope<OvertimeRecord[]>> {
    await delay();
    return envelope(attendanceStore.getState().overtime, 'Overtime records retrieved');
  },

  async submitOvertime(
    claim: Omit<OvertimeRecord, 'id' | 'status' | 'approvedBy' | 'createdAt'>
  ): Promise<ApiResponseEnvelope<OvertimeRecord>> {
    await delay();
    const created = attendanceStore.submitOvertime(claim);
    return envelope(created, 'Overtime claim submitted');
  },

  async reviewOvertime(
    id: string,
    status: 'APPROVED' | 'REJECTED',
    approverId?: string
  ): Promise<ApiResponseEnvelope<void>> {
    await delay();
    attendanceStore.reviewOvertime(id, status, approverId);
    return envelope(undefined, `Overtime ${status.toLowerCase()}`);
  },

  async getCorrections(): Promise<ApiResponseEnvelope<AttendanceCorrection[]>> {
    await delay();
    return envelope(attendanceStore.getState().corrections, 'Corrections retrieved');
  },

  async requestCorrection(
    correction: Omit<AttendanceCorrection, 'id' | 'status' | 'reviewedBy' | 'reviewedAt' | 'createdAt'>
  ): Promise<ApiResponseEnvelope<AttendanceCorrection>> {
    await delay();
    const created = attendanceStore.submitAttendanceCorrection(correction);
    return envelope(created, 'Correction request submitted');
  },

  async reviewCorrection(
    id: string,
    status: 'APPROVED' | 'REJECTED',
    reviewerId?: string
  ): Promise<ApiResponseEnvelope<void>> {
    await delay();
    attendanceStore.reviewCorrection(id, status, reviewerId);
    return envelope(undefined, `Correction ${status.toLowerCase()}`);
  },
};
