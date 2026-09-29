/**
 * Canonical Attendance & Shift Types
 * Ownership: Team HRMS
 */

export type AttendanceStatus =
  | 'PRESENT'
  | 'ABSENT'
  | 'HALF_DAY'
  | 'ON_LEAVE'
  | 'HOLIDAY'
  | 'WEEK_OFF';

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string;
  checkInTime: string | null;
  checkOutTime: string | null;
  status: AttendanceStatus;
  workingHours: number;
  shiftId: string | null;
  remarks: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AttendanceSummary {
  employeeId: string;
  month: string;
  totalWorkingDays: number;
  daysPresent: number;
  daysAbsent: number;
  halfDays: number;
  paidLeaves: number;
  unpaidLeaves: number;
  overtimeHours: number;
}

export interface Shift {
  id: string;
  shiftCode: string;
  name: string;
  startTime: string;
  endTime: string;
  gracePeriodMinutes: number;
  isNightShift: boolean;
  status: 'ACTIVE' | 'INACTIVE';
}

export type OvertimeStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface OvertimeRecord {
  id: string;
  employeeId: string;
  date: string;
  hours: number;
  rateMultiplier: number;
  reason: string;
  approvedBy: string | null;
  status: OvertimeStatus;
  createdAt: string;
}

export type CorrectionStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface AttendanceCorrection {
  id: string;
  employeeId: string;
  attendanceRecordId: string;
  requestedCheckIn: string | null;
  requestedCheckOut: string | null;
  reason: string;
  status: CorrectionStatus;
  reviewedBy: string | null;
  reviewedAt: string | null;
  createdAt: string;
}
