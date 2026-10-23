import React from 'react';
import { AttendanceRecord, Employee } from '../../types';
import { HrmsMetricCard } from '../common/HrmsMetricCard';
import { CheckCircle2, UserX, Calendar, Clock, TrendingUp } from 'lucide-react';

interface AttendanceReportsViewProps {
  attendanceRecords: AttendanceRecord[];
  employees: Employee[];
}

export const AttendanceReportsView: React.FC<AttendanceReportsViewProps> = ({
  attendanceRecords,
  employees,
}) => {
  const totalEmployees = employees.length;
  const presentCount = attendanceRecords.filter((a) => a.status === 'PRESENT').length;
  const leaveCount = attendanceRecords.filter((a) => a.status === 'ON_LEAVE').length;
  const absentCount = attendanceRecords.filter((a) => a.status === 'ABSENT').length;
  const halfDayCount = attendanceRecords.filter((a) => a.status === 'HALF_DAY').length;

  const attendanceRate = totalEmployees > 0 ? Math.round(((presentCount + halfDayCount * 0.5) / totalEmployees) * 100) : 0;
  const totalHours = attendanceRecords.reduce((sum, a) => sum + a.workingHours, 0);
  const avgHours = presentCount > 0 ? (totalHours / presentCount).toFixed(1) : '0';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>
          Attendance Analytics & Daily Compliance Reports
        </h3>
        <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
          Real-time workforce presence ratios, logged operational hours, and unscheduled absence logs.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <HrmsMetricCard
          title="Attendance Rate"
          value={`${attendanceRate}%`}
          subtitle="Of total active headcount"
          icon={<TrendingUp size={20} />}
          accentColor="#10b981"
          trend={{ value: '98.5% benchmark', isPositive: true }}
        />
        <HrmsMetricCard
          title="Present Today"
          value={presentCount}
          subtitle={`Across 5 departments`}
          icon={<CheckCircle2 size={20} />}
          accentColor="#6366f1"
        />
        <HrmsMetricCard
          title="On Planned Leave"
          value={leaveCount}
          subtitle="Approved PTO & sick days"
          icon={<Calendar size={20} />}
          accentColor="#f59e0b"
        />
        <HrmsMetricCard
          title="Unscheduled Absences"
          value={absentCount}
          subtitle="Pending follow-up"
          icon={<UserX size={20} />}
          accentColor="#ef4444"
        />
        <HrmsMetricCard
          title="Avg Daily Hours"
          value={`${avgHours}h`}
          subtitle="Target: 8.0h / day"
          icon={<Clock size={20} />}
          accentColor="#38bdf8"
        />
      </div>
    </div>
  );
};
