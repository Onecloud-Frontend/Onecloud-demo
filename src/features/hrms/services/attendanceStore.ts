import {
  AttendanceRecord,
  Shift,
  OvertimeRecord,
  AttendanceCorrection,
  Employee,
} from '../types';
import {
  INITIAL_ATTENDANCE,
  INITIAL_SHIFTS,
  INITIAL_OVERTIME,
  INITIAL_CORRECTIONS,
  INITIAL_EMPLOYEES,
} from '../constants/attendanceConstants';

export interface AttendanceState {
  attendance: AttendanceRecord[];
  employees: Employee[];
  shifts: Shift[];
  overtime: OvertimeRecord[];
  corrections: AttendanceCorrection[];
}

class AttendanceStore {
  private state: AttendanceState = {
    attendance: [...INITIAL_ATTENDANCE],
    employees: [...INITIAL_EMPLOYEES],
    shifts: [...INITIAL_SHIFTS],
    overtime: [...INITIAL_OVERTIME],
    corrections: [...INITIAL_CORRECTIONS],
  };

  private listeners: Set<() => void> = new Set();

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  public getState(): AttendanceState {
    return this.state;
  }

  private notify(): void {
    // Return a fresh state reference so useSyncExternalStore detects updates
    this.state = { ...this.state };
    this.listeners.forEach((listener) => listener());
  }

  // --- Clock In & Out Actions ---
  public clockIn(employeeId: string = 'emp-1'): AttendanceRecord {
    const today = new Date().toISOString().split('T')[0];
    const nowTime = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

    let record = this.state.attendance.find((a) => a.employeeId === employeeId && a.date === today);
    if (record) {
      const updated = {
        ...record,
        checkInTime: nowTime,
        status: 'PRESENT' as const,
        updatedAt: new Date().toISOString(),
      };
      this.state.attendance = this.state.attendance.map((a) => (a.id === record!.id ? updated : a));
      record = updated;
    } else {
      record = {
        id: `att-${Date.now()}`,
        employeeId,
        date: today,
        checkInTime: nowTime,
        checkOutTime: null,
        status: 'PRESENT',
        workingHours: 0,
        shiftId: this.state.shifts[0]?.id || 'shift-1',
        remarks: 'Live terminal clock-in',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      this.state.attendance = [record, ...this.state.attendance];
    }
    this.notify();
    return record;
  }

  public clockOut(employeeId: string = 'emp-1'): AttendanceRecord | null {
    const today = new Date().toISOString().split('T')[0];
    const nowTime = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

    const record = this.state.attendance.find((a) => a.employeeId === employeeId && a.date === today);
    if (!record) return null;

    const updated = {
      ...record,
      checkOutTime: nowTime,
      workingHours: 8.0,
      updatedAt: new Date().toISOString(),
    };
    this.state.attendance = this.state.attendance.map((a) => (a.id === record.id ? updated : a));
    this.notify();
    return updated;
  }

  // --- Attendance Regularization / Correction Actions ---
  public submitAttendanceCorrection(
    correction: Omit<AttendanceCorrection, 'id' | 'status' | 'reviewedBy' | 'reviewedAt' | 'createdAt'>
  ): AttendanceCorrection {
    const newCorr: AttendanceCorrection = {
      ...correction,
      id: `corr-${Date.now()}`,
      status: 'PENDING',
      reviewedBy: null,
      reviewedAt: null,
      createdAt: new Date().toISOString(),
    };
    this.state.corrections = [newCorr, ...this.state.corrections];
    this.notify();
    return newCorr;
  }

  public reviewCorrection(id: string, status: 'APPROVED' | 'REJECTED', reviewerId: string = 'emp-2'): void {
    const corr = this.state.corrections.find((c) => c.id === id);
    if (corr) {
      corr.status = status;
      corr.reviewedBy = reviewerId;
      corr.reviewedAt = new Date().toISOString();

      if (status === 'APPROVED' && corr.attendanceRecordId) {
        const att = this.state.attendance.find((a) => a.id === corr.attendanceRecordId);
        if (att) {
          if (corr.requestedCheckIn) att.checkInTime = corr.requestedCheckIn;
          if (corr.requestedCheckOut) att.checkOutTime = corr.requestedCheckOut;
        }
      }
      this.notify();
    }
  }

  // --- Overtime Actions ---
  public submitOvertime(
    claim: Omit<OvertimeRecord, 'id' | 'status' | 'approvedBy' | 'createdAt'>
  ): OvertimeRecord {
    const newOt: OvertimeRecord = {
      ...claim,
      id: `ot-${Date.now()}`,
      status: 'PENDING',
      approvedBy: null,
      createdAt: new Date().toISOString(),
    };
    this.state.overtime = [newOt, ...this.state.overtime];
    this.notify();
    return newOt;
  }

  public reviewOvertime(id: string, status: 'APPROVED' | 'REJECTED', approverId: string = 'emp-1'): void {
    const ot = this.state.overtime.find((o) => o.id === id);
    if (ot) {
      ot.status = status;
      ot.approvedBy = approverId;
      this.notify();
    }
  }

  // --- Shift Actions ---
  public addShift(shift: Omit<Shift, 'id'>): Shift {
    const newShift: Shift = {
      ...shift,
      id: `shift-${Date.now()}`,
    };
    this.state.shifts = [...this.state.shifts, newShift];
    this.notify();
    return newShift;
  }

  public assignShift(employeeId: string, shiftId: string): void {
    const today = new Date().toISOString().split('T')[0];
    const rec = this.state.attendance.find((a) => a.employeeId === employeeId && a.date === today);
    if (rec) {
      rec.shiftId = shiftId;
    }
    this.notify();
  }
}

export const attendanceStore = new AttendanceStore();
