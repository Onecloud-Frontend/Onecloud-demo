import React, { useState, useMemo } from 'react';
import { AttendanceRecord, Employee, Shift } from '../../types';
import { HrmsDataTable, Column } from '../common/HrmsDataTable';
import { HrmsStatusBadge } from '../common/HrmsStatusBadge';
import {
  Clock,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Building2,
  Users,
  ShieldCheck,
} from 'lucide-react';

interface AttendanceDailyTableProps {
  attendanceRecords: AttendanceRecord[];
  employees: Employee[];
  shifts: Shift[];
  onAddCorrectionClick?: () => void;
}

export const AttendanceDailyTable: React.FC<AttendanceDailyTableProps> = ({
  attendanceRecords,
  employees,
  shifts,
  onAddCorrectionClick,
}) => {
  const [selectedDate, setSelectedDate] = useState<string>('2026-10-07');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('ALL');
  const [selectedShiftId, setSelectedShiftId] = useState<string>('ALL');
  const [lateFilterOnly, setLateFilterOnly] = useState<boolean>(false);

  const getEmployee = (id: string) => employees.find((e) => e.id === id);
  const getShift = (id: string | null) => shifts.find((s) => s.id === id) || shifts[0];

  // Helper to parse "HH:MM" into total minutes
  const parseTimeToMinutes = (timeStr: string | null): number | null => {
    if (!timeStr) return null;
    const parts = timeStr.split(':');
    if (parts.length < 2) return null;
    const hours = parseInt(parts[0], 10);
    const mins = parseInt(parts[1], 10);
    if (isNaN(hours) || isNaN(mins)) return null;
    return hours * 60 + mins;
  };

  // Evaluate late arrival based on shift start and grace period
  const getPunctualityEvaluation = (rec: AttendanceRecord) => {
    if (!rec.checkInTime) {
      return { status: 'NO_PUNCH', text: '—', minutes: 0 };
    }
    const shift = getShift(rec.shiftId);
    if (!shift) return { status: 'ON_TIME', text: 'On-Time', minutes: 0 };

    const checkInMins = parseTimeToMinutes(rec.checkInTime);
    const shiftStartMins = parseTimeToMinutes(shift.startTime);

    if (checkInMins === null || shiftStartMins === null) {
      return { status: 'ON_TIME', text: 'On-Time', minutes: 0 };
    }

    const diff = checkInMins - shiftStartMins;
    const grace = shift.gracePeriodMinutes || 0;

    if (diff > grace) {
      return {
        status: 'LATE',
        text: `Late Arrival (+${diff}m)`,
        delayMinutes: diff,
        graceAllowed: grace,
      };
    } else if (diff > 0) {
      return {
        status: 'GRACE',
        text: `Grace Period (+${diff}m)`,
        delayMinutes: diff,
        graceAllowed: grace,
      };
    } else {
      return {
        status: 'ON_TIME',
        text: 'On-Time',
        delayMinutes: 0,
      };
    }
  };

  // Extract distinct departments for filter dropdown
  const departments = useMemo(() => {
    const set = new Set<string>();
    employees.forEach((e) => {
      if (e.departmentId) set.add(e.departmentId);
    });
    return Array.from(set);
  }, [employees]);

  // Filter records
  const filteredRecords = useMemo(() => {
    return attendanceRecords.filter((rec) => {
      // Date filter (match or allow today's records)
      if (selectedDate && rec.date !== selectedDate) {
        return false;
      }

      const emp = getEmployee(rec.employeeId);
      if (!emp) return false;

      // Department filter
      if (selectedDepartment !== 'ALL' && emp.departmentId !== selectedDepartment) {
        return false;
      }

      // Shift filter
      if (selectedShiftId !== 'ALL' && rec.shiftId !== selectedShiftId) {
        return false;
      }

      // Late filter
      if (lateFilterOnly) {
        const evalRes = getPunctualityEvaluation(rec);
        if (evalRes.status !== 'LATE') return false;
      }

      return true;
    });
  }, [attendanceRecords, selectedDate, selectedDepartment, selectedShiftId, lateFilterOnly, employees]);

  // Calculate day metrics
  const dayMetrics = useMemo(() => {
    const dayRecords = attendanceRecords.filter((r) => r.date === selectedDate);
    const totalPunched = dayRecords.filter((r) => r.status === 'PRESENT' || r.status === 'HALF_DAY').length;
    const lateArrivals = dayRecords.filter((r) => getPunctualityEvaluation(r).status === 'LATE').length;
    const onLeave = dayRecords.filter((r) => r.status === 'ON_LEAVE').length;
    const absent = dayRecords.filter((r) => r.status === 'ABSENT').length;
    const totalHeadcount = employees.length;
    const punchRate = totalHeadcount > 0 ? Math.round((totalPunched / totalHeadcount) * 100) : 0;

    return {
      totalPunched,
      lateArrivals,
      onLeave,
      absent,
      totalHeadcount,
      punchRate,
    };
  }, [attendanceRecords, selectedDate, employees]);

  const columns: Column<AttendanceRecord>[] = [
    {
      key: 'employee',
      header: 'EMPLOYEE',
      render: (rec) => {
        const emp = getEmployee(rec.employeeId);
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(99, 102, 241, 0.12)',
                color: 'var(--brand-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '12px',
                border: '1px solid rgba(99, 102, 241, 0.25)',
                flexShrink: 0,
              }}
            >
              {emp ? `${emp.firstName?.[0] || ''}${emp.lastName?.[0] || ''}` : 'EM'}
            </div>
            <div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '13px' }}>
                {emp ? `${emp.firstName} ${emp.lastName}` : 'Employee'}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                {emp?.employeeCode} • {emp?.designation || 'Staff'}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      key: 'shiftMatching',
      header: 'MATCHED SHIFT',
      render: (rec) => {
        const shift = getShift(rec.shiftId);
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '2px 6px',
                  borderRadius: '4px',
                  backgroundColor: 'rgba(99, 102, 241, 0.12)',
                  color: 'var(--brand-primary)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {shift.shiftCode}
              </span>
              <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-primary)' }}>
                {shift.name}
              </span>
            </div>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              {shift.startTime} – {shift.endTime} (Grace: {shift.gracePeriodMinutes}m)
            </span>
          </div>
        );
      },
    },
    {
      key: 'checkInTime',
      header: 'CLOCK IN',
      render: (rec) => (
        <span
          style={{
            fontWeight: 700,
            color: rec.checkInTime ? '#10b981' : 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
          }}
        >
          {rec.checkInTime || '—'}
        </span>
      ),
    },
    {
      key: 'lateArrivalFlag',
      header: 'PUNCTUALITY / LATE ARRIVAL FLAG',
      render: (rec) => {
        const evaluation = getPunctualityEvaluation(rec);
        if (evaluation.status === 'LATE') {
          return (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '3px 8px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'rgba(239, 68, 68, 0.12)',
                color: '#ef4444',
                fontSize: '11px',
                fontWeight: 700,
                border: '1px solid rgba(239, 68, 68, 0.25)',
              }}
            >
              <AlertCircle size={13} />
              {evaluation.text}
            </span>
          );
        }
        if (evaluation.status === 'GRACE') {
          return (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '3px 8px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'rgba(245, 158, 11, 0.12)',
                color: '#f59e0b',
                fontSize: '11px',
                fontWeight: 600,
                border: '1px solid rgba(245, 158, 11, 0.25)',
              }}
            >
              <Clock size={13} />
              {evaluation.text}
            </span>
          );
        }
        if (evaluation.status === 'ON_TIME') {
          return (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '3px 8px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'rgba(16, 185, 129, 0.12)',
                color: '#10b981',
                fontSize: '11px',
                fontWeight: 600,
                border: '1px solid rgba(16, 185, 129, 0.25)',
              }}
            >
              <CheckCircle2 size={13} />
              On-Time
            </span>
          );
        }
        return <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>—</span>;
      },
    },
    {
      key: 'checkOutTime',
      header: 'CLOCK OUT',
      render: (rec) => (
        <span
          style={{
            fontWeight: 700,
            color: rec.checkOutTime ? '#f59e0b' : 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
          }}
        >
          {rec.checkOutTime || '—'}
        </span>
      ),
    },
    {
      key: 'workingHours',
      header: 'LOGGED HOURS',
      render: (rec) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '13px' }}>
            {rec.workingHours > 0 ? `${rec.workingHours.toFixed(1)} hrs` : '0.0 hrs'}
          </span>
          <div
            style={{
              width: '60px',
              height: '4px',
              backgroundColor: 'var(--bg-elevated)',
              borderRadius: '2px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${Math.min(100, (rec.workingHours / 8.0) * 100)}%`,
                backgroundColor: rec.workingHours >= 8.0 ? '#10b981' : '#f59e0b',
              }}
            />
          </div>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'PUNCH STATUS',
      render: (rec) => <HrmsStatusBadge status={rec.status} size="sm" />,
    },
    {
      key: 'remarks',
      header: 'TERMINAL / REMARKS',
      render: (rec) => (
        <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
          {rec.remarks || 'Biometric Web Terminal'}
        </span>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      {/* 1. Daily Punch Live Overview Metrics */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
          gap: '12px',
          padding: '16px',
          backgroundColor: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        {/* 1. Present Punches Card */}
        <div
          onClick={() => {
            setLateFilterOnly(false);
            setSelectedDepartment('ALL');
          }}
          title="Click to reset filters and view all active punches"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: !lateFilterOnly ? 'rgba(99, 102, 241, 0.08)' : 'transparent',
            transition: 'background-color 150ms ease',
          }}
        >
          <div
            style={{
              padding: '10px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(99, 102, 241, 0.12)',
              color: 'var(--brand-primary)',
            }}
          >
            <Users size={18} />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Present Punches
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>
              {dayMetrics.totalPunched} / {dayMetrics.totalHeadcount}
            </div>
          </div>
        </div>

        {/* 2. Late Arrival Flags Card */}
        <div
          onClick={() => setLateFilterOnly(!lateFilterOnly)}
          title="Click to toggle filter for Late Arrival Flags only"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: lateFilterOnly ? 'rgba(239, 68, 68, 0.15)' : 'transparent',
            border: lateFilterOnly ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid transparent',
            transition: 'all 150ms ease',
          }}
        >
          <div
            style={{
              padding: '10px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(239, 68, 68, 0.12)',
              color: '#ef4444',
            }}
          >
            <AlertCircle size={18} />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Late Arrival Flags {lateFilterOnly && '●'}
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#ef4444' }}>
              {dayMetrics.lateArrivals}
            </div>
          </div>
        </div>

        {/* 3. On Approved Leave Card */}
        <div
          onClick={() => {
            setLateFilterOnly(false);
          }}
          title="Employees currently on approved leave"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: 'var(--radius-md)',
          }}
        >
          <div
            style={{
              padding: '10px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(245, 158, 11, 0.12)',
              color: '#f59e0b',
            }}
          >
            <Calendar size={18} />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              On Approved Leave
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>
              {dayMetrics.onLeave}
            </div>
          </div>
        </div>

        {/* 4. Compliance Rate Card */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '8px',
          }}
        >
          <div
            style={{
              padding: '10px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(16, 185, 129, 0.12)',
              color: '#10b981',
            }}
          >
            <ShieldCheck size={18} />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Compliance Rate
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#10b981' }}>
              {dayMetrics.punchRate}%
            </div>
          </div>
        </div>
      </div>

      {/* 2. Control Toolbar: Date Picker, Department Filter, Shift Filter & Late Toggles */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'var(--bg-elevated)',
          padding: '12px 16px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}>
          {/* Date Picker */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Calendar size={14} style={{ color: 'var(--text-muted)' }} />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{
                backgroundColor: 'var(--bg-card)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '6px 10px',
                fontSize: '12px',
                fontWeight: 600,
                outline: 'none',
              }}
            />
            <button
              onClick={() => setSelectedDate('2026-10-07')}
              style={{
                padding: '6px 10px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: selectedDate === '2026-10-07' ? 'var(--brand-primary)' : 'var(--bg-card)',
                color: selectedDate === '2026-10-07' ? '#fff' : 'var(--text-secondary)',
                border: '1px solid var(--border-subtle)',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Today
            </button>
          </div>

          {/* Department Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Building2 size={14} style={{ color: 'var(--text-muted)' }} />
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              style={{
                backgroundColor: 'var(--bg-card)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '6px 10px',
                fontSize: '12px',
                outline: 'none',
              }}
            >
              <option value="ALL">All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {/* Shift Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Clock size={14} style={{ color: 'var(--text-muted)' }} />
            <select
              value={selectedShiftId}
              onChange={(e) => setSelectedShiftId(e.target.value)}
              style={{
                backgroundColor: 'var(--bg-card)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '6px 10px',
                fontSize: '12px',
                outline: 'none',
              }}
            >
              <option value="ALL">All Shifts</option>
              {shifts.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.shiftCode})
                </option>
              ))}
            </select>
          </div>

          {/* Late Arrival Flag Filter Pill */}
          <button
            onClick={() => setLateFilterOnly(!lateFilterOnly)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '999px',
              backgroundColor: lateFilterOnly ? 'rgba(239, 68, 68, 0.18)' : 'var(--bg-card)',
              color: lateFilterOnly ? '#ef4444' : 'var(--text-secondary)',
              border: lateFilterOnly ? '1px solid #ef4444' : '1px solid var(--border-subtle)',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <AlertCircle size={13} />
            Show Late Arrivals Only
            {dayMetrics.lateArrivals > 0 && (
              <span
                style={{
                  fontSize: '10px',
                  padding: '1px 5px',
                  borderRadius: '999px',
                  backgroundColor: '#ef4444',
                  color: '#ffffff',
                }}
              >
                {dayMetrics.lateArrivals}
              </span>
            )}
          </button>
        </div>

        {/* Action: Time Regularization */}
        {onAddCorrectionClick && (
          <button
            onClick={onAddCorrectionClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--brand-primary)',
              color: '#ffffff',
              border: 'none',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <Clock size={14} /> Request Regularization
          </button>
        )}
      </div>

      {/* 3. Daily Attendance Punch Table */}
      <HrmsDataTable
        data={filteredRecords}
        columns={columns}
        keyExtractor={(r) => r.id}
        searchPlaceholder="Search by employee name or code..."
        searchFilter={(rec, q) => {
          const emp = getEmployee(rec.employeeId);
          if (!emp) return false;
          return (
            emp.firstName.toLowerCase().includes(q) ||
            emp.lastName.toLowerCase().includes(q) ||
            emp.employeeCode.toLowerCase().includes(q)
          );
        }}
        filterOptions={[
          { label: 'Present', value: 'PRESENT' },
          { label: 'Half Day', value: 'HALF_DAY' },
          { label: 'On Leave', value: 'ON_LEAVE' },
          { label: 'Absent', value: 'ABSENT' },
        ]}
        filterKey="status"
      />
    </div>
  );
};
