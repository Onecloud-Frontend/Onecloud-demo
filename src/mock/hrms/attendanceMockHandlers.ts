import { ApiResponseEnvelope } from '@core/api/types';
import {
  AttendanceRecord,
  Shift,
  OvertimeRecord,
  AttendanceCorrection,
} from '@features/hrms/types';
import { attendanceService } from '@features/hrms/services/attendanceService';

export const attendanceMockHandlers = {
  async getAttendanceRecords(date?: string): Promise<ApiResponseEnvelope<AttendanceRecord[]>> {
    return attendanceService.getAttendanceRecords(date);
  },

  async clockIn(employeeId?: string): Promise<ApiResponseEnvelope<AttendanceRecord>> {
    return attendanceService.clockIn(employeeId);
  },

  async clockOut(employeeId?: string): Promise<ApiResponseEnvelope<AttendanceRecord | null>> {
    return attendanceService.clockOut(employeeId);
  },

  async getShifts(): Promise<ApiResponseEnvelope<Shift[]>> {
    return attendanceService.getShifts();
  },

  async addShift(shift: Omit<Shift, 'id'>): Promise<ApiResponseEnvelope<Shift>> {
    return attendanceService.addShift(shift);
  },

  async assignShift(employeeId: string, shiftId: string): Promise<ApiResponseEnvelope<void>> {
    return attendanceService.assignShift(employeeId, shiftId);
  },

  async getOvertimeRecords(): Promise<ApiResponseEnvelope<OvertimeRecord[]>> {
    return attendanceService.getOvertimeRecords();
  },

  async submitOvertime(
    claim: Omit<OvertimeRecord, 'id' | 'status' | 'approvedBy' | 'createdAt'>
  ): Promise<ApiResponseEnvelope<OvertimeRecord>> {
    return attendanceService.submitOvertime(claim);
  },

  async reviewOvertime(
    id: string,
    status: 'APPROVED' | 'REJECTED',
    approverId?: string
  ): Promise<ApiResponseEnvelope<void>> {
    return attendanceService.reviewOvertime(id, status, approverId);
  },

  async getCorrections(): Promise<ApiResponseEnvelope<AttendanceCorrection[]>> {
    return attendanceService.getCorrections();
  },

  async requestCorrection(
    correction: Omit<AttendanceCorrection, 'id' | 'status' | 'reviewedBy' | 'reviewedAt' | 'createdAt'>
  ): Promise<ApiResponseEnvelope<AttendanceCorrection>> {
    return attendanceService.requestCorrection(correction);
  },

  async reviewCorrection(
    id: string,
    status: 'APPROVED' | 'REJECTED',
    reviewerId?: string
  ): Promise<ApiResponseEnvelope<void>> {
    return attendanceService.reviewCorrection(id, status, reviewerId);
  },
};
