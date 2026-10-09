import { useSyncExternalStore } from 'react';
import { attendanceStore } from '../services/attendanceStore';

export function useAttendanceData() {
  const state = useSyncExternalStore(
    (onStoreChange) => attendanceStore.subscribe(onStoreChange),
    () => attendanceStore.getState()
  );

  return {
    ...state,
    clockIn: attendanceStore.clockIn.bind(attendanceStore),
    clockOut: attendanceStore.clockOut.bind(attendanceStore),
    submitAttendanceCorrection: attendanceStore.submitAttendanceCorrection.bind(attendanceStore),
    reviewCorrection: attendanceStore.reviewCorrection.bind(attendanceStore),
    reviewOvertime: attendanceStore.reviewOvertime.bind(attendanceStore),
    submitOvertime: attendanceStore.submitOvertime.bind(attendanceStore),
    addShift: attendanceStore.addShift.bind(attendanceStore),
    assignShift: attendanceStore.assignShift.bind(attendanceStore),
  };
}

// Alias for compatibility with AttendancePage
export const useHrmsData = useAttendanceData;
