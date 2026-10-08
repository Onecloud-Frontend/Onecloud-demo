import React, { useState } from 'react';
import { LeaveRequest, Employee, LeaveType } from '../../types';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

interface LeaveCalendarViewProps {
  leaveRequests: LeaveRequest[];
  employees: Employee[];
  leaveTypes: LeaveType[];
}

export const LeaveCalendarView: React.FC<LeaveCalendarViewProps> = ({
  leaveRequests,
  employees,
  leaveTypes,
}) => {
  const [currentMonth, setCurrentMonth] = useState(9); // 0-indexed: 9 = October
  const [currentYear, setCurrentYear] = useState(2026);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  // Find approved leaves falling on a particular day
  const getLeavesForDay = (day: number) => {
    const dayStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return leaveRequests.filter((lr) => {
      if (lr.status !== 'APPROVED') return false;
      return dayStr >= lr.startDate && dayStr <= lr.endDate;
    });
  };

  const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      {/* Header Month Switcher */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              padding: '10px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(99, 102, 241, 0.15)',
              color: 'var(--brand-primary)',
            }}
          >
            <CalendarIcon size={20} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)' }}>
              {monthNames[currentMonth]} {currentYear}
            </h3>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Team Out-of-Office & Vacation Schedule
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={handlePrevMonth}
            style={{
              padding: '6px 12px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-elevated)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-subtle)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={handleNextMonth}
            style={{
              padding: '6px 12px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-elevated)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-subtle)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
        {dayHeaders.map((d) => (
          <div
            key={d}
            style={{
              padding: '8px',
              textAlign: 'center',
              fontSize: '12px',
              fontWeight: 700,
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
            }}
          >
            {d}
          </div>
        ))}

        {/* Blank cells for start offset */}
        {Array.from({ length: firstDayIndex }).map((_, idx) => (
          <div
            key={`blank-${idx}`}
            style={{
              minHeight: '80px',
              backgroundColor: 'rgba(15, 23, 42, 0.2)',
              borderRadius: 'var(--radius-md)',
              opacity: 0.3,
            }}
          />
        ))}

        {/* Days of month */}
        {Array.from({ length: daysInMonth }).map((_, idx) => {
          const day = idx + 1;
          const leaves = getLeavesForDay(day);
          const isToday = currentYear === 2026 && currentMonth === 9 && day === 8;

          return (
            <div
              key={`day-${day}`}
              style={{
                minHeight: '84px',
                backgroundColor: isToday ? 'rgba(99, 102, 241, 0.08)' : 'var(--bg-surface)',
                border: isToday ? '1px solid var(--brand-primary)' : '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: isToday ? 800 : 500,
                    color: isToday ? 'var(--brand-primary)' : 'var(--text-secondary)',
                  }}
                >
                  {day}
                </span>
                {isToday && (
                  <span style={{ fontSize: '9px', fontWeight: 700, color: '#10b981', textTransform: 'uppercase' }}>
                    Today
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginTop: '4px' }}>
                {leaves.map((leave) => {
                  const emp = employees.find((e) => e.id === leave.employeeId);
                  const lType = leaveTypes.find((lt) => lt.id === leave.leaveTypeId);
                  return (
                    <div
                      key={leave.id}
                      style={{
                        padding: '2px 6px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'rgba(245, 158, 11, 0.15)',
                        border: '1px solid rgba(245, 158, 11, 0.3)',
                        color: '#f59e0b',
                        fontSize: '10px',
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                      title={`${emp?.firstName} ${emp?.lastName} - ${lType?.name || 'Leave'}: ${leave.reason}`}
                    >
                      {emp?.firstName} ({lType?.code || 'LV'})
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
