import React, { useState, useEffect } from 'react';
import { AttendanceRecord, Shift } from '../../types';
import { Clock, LogIn, LogOut, CheckCircle } from 'lucide-react';

interface ClockInOutWidgetProps {
  todayRecord?: AttendanceRecord;
  shifts: Shift[];
  onClockIn: () => void;
  onClockOut: () => void;
}

export const ClockInOutWidget: React.FC<ClockInOutWidgetProps> = ({
  todayRecord,
  shifts,
  onClockIn,
  onClockOut,
}) => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const isCheckedIn = !!todayRecord?.checkInTime && !todayRecord?.checkOutTime;
  const isCheckedOut = !!todayRecord?.checkOutTime;
  const activeShift = shifts[0];

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px',
        background: 'linear-gradient(135deg, rgba(19, 29, 49, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
      }}
    >
      {/* Current Digital Time & Shift */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div
          style={{
            padding: '16px',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: isCheckedIn ? 'rgba(16, 185, 129, 0.15)' : 'rgba(99, 102, 241, 0.15)',
            color: isCheckedIn ? '#10b981' : 'var(--brand-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Clock size={32} />
        </div>

        <div>
          <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Live Attendance Punch Terminal
          </div>
          <div
            style={{
              fontSize: '32px',
              fontWeight: 800,
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-primary)',
              letterSpacing: '0.05em',
              margin: '2px 0',
            }}
          >
            {currentTime}
          </div>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Scheduled Shift: <strong>{activeShift?.name || 'General Shift'}</strong> ({activeShift?.startTime} - {activeShift?.endTime})
          </div>
        </div>
      </div>

      {/* Attendance Stats for Today */}
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        <div style={{ borderLeft: '1px solid var(--border-subtle)', paddingLeft: '20px' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Check In</div>
          <div style={{ fontSize: '16px', fontWeight: 700, color: todayRecord?.checkInTime ? '#10b981' : 'var(--text-muted)', marginTop: '2px' }}>
            {todayRecord?.checkInTime || '—'}
          </div>
        </div>

        <div style={{ borderLeft: '1px solid var(--border-subtle)', paddingLeft: '20px' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Check Out</div>
          <div style={{ fontSize: '16px', fontWeight: 700, color: todayRecord?.checkOutTime ? '#f59e0b' : 'var(--text-muted)', marginTop: '2px' }}>
            {todayRecord?.checkOutTime || '—'}
          </div>
        </div>

        <div style={{ borderLeft: '1px solid var(--border-subtle)', paddingLeft: '20px' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Working Hours</div>
          <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
            {todayRecord ? `${todayRecord.workingHours} hrs` : '0.0 hrs'}
          </div>
        </div>

        {/* Action Button */}
        <div>
          {isCheckedOut ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                color: '#10b981',
                fontWeight: 600,
                fontSize: '13px',
              }}
            >
              <CheckCircle size={18} /> Shift Completed
            </div>
          ) : isCheckedIn ? (
            <button
              onClick={onClockOut}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: '#ef4444',
                color: '#ffffff',
                border: 'none',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(239, 68, 68, 0.35)',
              }}
            >
              <LogOut size={18} /> Clock Out Now
            </button>
          ) : (
            <button
              onClick={onClockIn}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: '#10b981',
                color: '#ffffff',
                border: 'none',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(16, 185, 129, 0.35)',
              }}
            >
              <LogIn size={18} /> Clock In Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
