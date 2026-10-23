import React from 'react';
import { OvertimeRecord, Employee } from '../../types';
import { HrmsStatusBadge } from '../common/HrmsStatusBadge';
import { CheckCircle, XCircle } from 'lucide-react';

interface OvertimeTrackerViewProps {
  overtimeRecords: OvertimeRecord[];
  employees: Employee[];
  onReview: (id: string, status: 'APPROVED' | 'REJECTED') => void;
}

export const OvertimeTrackerView: React.FC<OvertimeTrackerViewProps> = ({
  overtimeRecords,
  employees,
  onReview,
}) => {
  const getEmployee = (id: string) => employees.find((e) => e.id === id);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>
          Overtime Log & Manager Approvals
        </h3>
        <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
          Logged after-hours project support, weekend maintenance windows, and rate multipliers.
        </p>
      </div>

      <div
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: 'rgba(30, 41, 59, 0.4)', borderBottom: '1px solid var(--border-subtle)' }}>
              <th style={{ padding: '12px 18px', color: 'var(--text-secondary)', fontWeight: 600 }}>EMPLOYEE</th>
              <th style={{ padding: '12px 18px', color: 'var(--text-secondary)', fontWeight: 600 }}>DATE</th>
              <th style={{ padding: '12px 18px', color: 'var(--text-secondary)', fontWeight: 600 }}>HOURS</th>
              <th style={{ padding: '12px 18px', color: 'var(--text-secondary)', fontWeight: 600 }}>RATE MULTIPLIER</th>
              <th style={{ padding: '12px 18px', color: 'var(--text-secondary)', fontWeight: 600 }}>REASON</th>
              <th style={{ padding: '12px 18px', color: 'var(--text-secondary)', fontWeight: 600 }}>STATUS</th>
              <th style={{ padding: '12px 18px', color: 'var(--text-secondary)', fontWeight: 600, textAlign: 'right' }}>
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {overtimeRecords.map((ot) => {
              const emp = getEmployee(ot.employeeId);
              return (
                <tr key={ot.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '14px 18px', color: 'var(--text-primary)' }}>
                    <div style={{ fontWeight: 600 }}>{emp ? `${emp.firstName} ${emp.lastName}` : 'Employee'}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{emp?.employeeCode}</div>
                  </td>
                  <td style={{ padding: '14px 18px', color: 'var(--text-secondary)' }}>{ot.date}</td>
                  <td style={{ padding: '14px 18px', fontWeight: 700, color: '#38bdf8' }}>{ot.hours} hrs</td>
                  <td style={{ padding: '14px 18px', color: 'var(--text-primary)' }}>{ot.rateMultiplier}x Standard</td>
                  <td style={{ padding: '14px 18px', color: 'var(--text-secondary)', maxWidth: '280px' }}>{ot.reason}</td>
                  <td style={{ padding: '14px 18px' }}>
                    <HrmsStatusBadge status={ot.status} size="sm" />
                  </td>
                  <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                    {ot.status === 'PENDING' ? (
                      <div style={{ display: 'inline-flex', gap: '8px' }}>
                        <button
                          onClick={() => onReview(ot.id, 'APPROVED')}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '4px 10px',
                            borderRadius: 'var(--radius-sm)',
                            backgroundColor: 'rgba(16, 185, 129, 0.15)',
                            color: '#10b981',
                            border: '1px solid rgba(16, 185, 129, 0.3)',
                            fontSize: '12px',
                            fontWeight: 600,
                            cursor: 'pointer',
                          }}
                        >
                          <CheckCircle size={13} /> Approve
                        </button>
                        <button
                          onClick={() => onReview(ot.id, 'REJECTED')}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '4px 10px',
                            borderRadius: 'var(--radius-sm)',
                            backgroundColor: 'rgba(239, 68, 68, 0.15)',
                            color: '#ef4444',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            fontSize: '12px',
                            fontWeight: 600,
                            cursor: 'pointer',
                          }}
                        >
                          <XCircle size={13} /> Reject
                        </button>
                      </div>
                    ) : (
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Processed</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
