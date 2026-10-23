import React from 'react';
import { Shift } from '../../types';
import { HrmsStatusBadge } from '../common/HrmsStatusBadge';
import { Moon, Sun } from 'lucide-react';

interface ShiftScheduleViewProps {
  shifts: Shift[];
}

export const ShiftScheduleView: React.FC<ShiftScheduleViewProps> = ({ shifts }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>
          Work Shift Rosters & Grace Policies
        </h3>
        <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
          Assigned shifts across corporate facilities, regional tech hubs, and 24/7 cloud operations.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
        {shifts.map((shift) => (
          <div
            key={shift.id}
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      padding: '10px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: shift.isNightShift ? 'rgba(168, 85, 247, 0.15)' : 'rgba(99, 102, 241, 0.15)',
                      color: shift.isNightShift ? '#c084fc' : 'var(--brand-primary)',
                    }}
                  >
                    {shift.isNightShift ? <Moon size={20} /> : <Sun size={20} />}
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '16px', color: 'var(--text-primary)', fontWeight: 600 }}>
                      {shift.name}
                    </h4>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Code: {shift.shiftCode}</span>
                  </div>
                </div>
                <HrmsStatusBadge status={shift.status} size="sm" />
              </div>

              <div
                style={{
                  marginTop: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '18px',
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-primary)',
                }}
              >
                <span>{shift.startTime}</span>
                <span style={{ color: 'var(--text-muted)' }}>→</span>
                <span>{shift.endTime}</span>
              </div>
            </div>

            <div
              style={{
                borderTop: '1px solid var(--border-subtle)',
                paddingTop: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '12px',
              }}
            >
              <div style={{ color: 'var(--text-muted)' }}>
                Grace Period: <strong style={{ color: 'var(--text-primary)' }}>{shift.gracePeriodMinutes} mins</strong>
              </div>
              {shift.isNightShift && (
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#c084fc',
                    backgroundColor: 'rgba(168, 85, 247, 0.1)',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)',
                  }}
                >
                  Night Allowance Eligible
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
