import React from 'react';
import { DeveloperStarterPage } from '@shared/components';

export const AttendancePage: React.FC = () => {
  return (
    <DeveloperStarterPage
      developerId="HRMS-DEV-02"
      domain="HRMS"
      domainCategory="HRMS"
      teamBadgeVariant="team-c"
      capability="Attendance"
      route="/hrms/attendance"
      description="Daily clock-in/out records, shift schedules, overtime tracking, and attendance regularization."
      scopeItems={[
        "Daily Clock-in / Out Tracking",
        "Shift Scheduling & Rotations",
        "Overtime & Late Arrival Logs",
        "Attendance Regularization Approvals"
]}
      typeLocation="src/features/hrms/types/attendance.ts"
      serviceLocation="src/features/hrms/services/attendanceService.ts"
      mockLocation="src/mock/hrms/"
    />
  );
};
