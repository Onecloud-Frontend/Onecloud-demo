import { useAttendanceData } from './useAttendanceData';
import { useLeaveData } from './useLeaveData';

export function useHrmsData() {
  const attendance = useAttendanceData();
  const leave = useLeaveData();

  return {
    ...attendance,
    ...leave,
  };
}

export { useAttendanceData } from './useAttendanceData';
export { useLeaveData } from './useLeaveData';
