import {
  AttendanceRecord,
  Shift,
  OvertimeRecord,
  AttendanceCorrection,
  Employee,
  Department,
} from '@features/hrms/types';
import {
  INITIAL_ATTENDANCE,
  INITIAL_SHIFTS,
  INITIAL_OVERTIME,
  INITIAL_CORRECTIONS,
  INITIAL_EMPLOYEES,
  INITIAL_DEPARTMENTS,
} from '@features/hrms/constants/attendanceConstants';

export const mockAttendanceRecords: AttendanceRecord[] = [...INITIAL_ATTENDANCE];
export const mockShifts: Shift[] = [...INITIAL_SHIFTS];
export const mockOvertimeRecords: OvertimeRecord[] = [...INITIAL_OVERTIME];
export const mockAttendanceCorrections: AttendanceCorrection[] = [...INITIAL_CORRECTIONS];
export const mockAttendanceEmployees: Employee[] = [...INITIAL_EMPLOYEES];
export const mockAttendanceDepartments: Department[] = [...INITIAL_DEPARTMENTS];
