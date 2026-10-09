import React, { useState } from 'react';
import { AttendanceCorrection, Employee } from '../../types';
import { HrmsModal } from '../common/HrmsModal';
import { TextInput, TextareaField, FormRow, SelectField } from '../common/HrmsFormFields';
import { HrmsStatusBadge } from '../common/HrmsStatusBadge';
import { CheckCircle, XCircle } from 'lucide-react';

interface AttendanceCorrectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  corrections: AttendanceCorrection[];
  employees: Employee[];
  onSubmitCorrection: (corr: Omit<AttendanceCorrection, 'id' | 'status' | 'reviewedBy' | 'reviewedAt' | 'createdAt'>) => void;
  onReviewCorrection: (id: string, status: 'APPROVED' | 'REJECTED') => void;
}

export const AttendanceCorrectionModal: React.FC<AttendanceCorrectionModalProps> = ({
  isOpen,
  onClose,
  corrections,
  employees,
  onSubmitCorrection,
  onReviewCorrection,
}) => {
  const [activeTab, setActiveTab] = useState<'REQUEST' | 'QUEUE'>('REQUEST');
  const [employeeId, setEmployeeId] = useState('emp-7');
  const [checkIn, setCheckIn] = useState('09:00');
  const [checkOut, setCheckOut] = useState('18:00');
  const [reason, setReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason) {
      alert('Please specify the reason for attendance regularization.');
      return;
    }

    onSubmitCorrection({
      employeeId,
      attendanceRecordId: 'att-1',
      requestedCheckIn: checkIn,
      requestedCheckOut: checkOut,
      reason,
    });
    setReason('');
    setActiveTab('QUEUE');
  };

  const getEmployee = (id: string) => employees.find((e) => e.id === id);

  return (
    <HrmsModal
      isOpen={isOpen}
      onClose={onClose}
      title="Attendance Regularization & Corrections"
      subtitle="Correct biometric discrepancies, forgotten punches, or network dropouts"
      maxWidth="700px"
    >
      <div style={{ display: 'flex', gap: '8px', marginBottom: '18px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '10px' }}>
        <button
          onClick={() => setActiveTab('REQUEST')}
          style={{
            padding: '6px 14px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: activeTab === 'REQUEST' ? 'var(--brand-primary)' : 'transparent',
            color: activeTab === 'REQUEST' ? '#ffffff' : 'var(--text-secondary)',
            border: 'none',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Submit Correction Request
        </button>
        <button
          onClick={() => setActiveTab('QUEUE')}
          style={{
            padding: '6px 14px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: activeTab === 'QUEUE' ? 'var(--brand-primary)' : 'transparent',
            color: activeTab === 'QUEUE' ? '#ffffff' : 'var(--text-secondary)',
            border: 'none',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Correction Review Queue ({corrections.filter((c) => c.status === 'PENDING').length})
        </button>
      </div>

      {activeTab === 'REQUEST' ? (
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <SelectField
              label="Select Employee"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              options={employees.map((emp) => ({
                value: emp.id,
                label: `${emp.firstName} ${emp.lastName} (${emp.employeeCode})`,
              }))}
            />
            <FormRow>
              <TextInput
                label="Requested Check-In"
                type="time"
                required
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
              <TextInput
                label="Requested Check-Out"
                type="time"
                required
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </FormRow>

            <TextareaField
              label="Reason for Regularization"
              required
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Biometric scanner offline at Campus Gate 2, had meeting with Director Alexander Wright."
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-elevated)',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  padding: '8px 20px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--brand-primary)',
                  color: '#ffffff',
                  border: 'none',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Submit for Approval
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {corrections.map((corr) => {
            const emp = getEmployee(corr.employeeId);

            return (
              <div
                key={corr.id}
                style={{
                  padding: '14px 16px',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                      {emp ? `${emp.firstName} ${emp.lastName}` : 'Employee'}
                    </span>
                    <HrmsStatusBadge status={corr.status} size="sm" />
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--brand-primary)', marginTop: '4px' }}>
                    Requested Time: {corr.requestedCheckIn} – {corr.requestedCheckOut}
                  </div>
                  <p style={{ margin: '4px 0 0', fontSize: '12px', color: 'var(--text-secondary)' }}>
                    {corr.reason}
                  </p>
                </div>

                {corr.status === 'PENDING' && (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => onReviewCorrection(corr.id, 'APPROVED')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '6px 10px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'rgba(16, 185, 129, 0.15)',
                        color: '#10b981',
                        border: '1px solid rgba(16, 185, 129, 0.3)',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      <CheckCircle size={14} /> Approve
                    </button>
                    <button
                      onClick={() => onReviewCorrection(corr.id, 'REJECTED')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '6px 10px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'rgba(239, 68, 68, 0.15)',
                        color: '#ef4444',
                        border: '1px solid rgba(239, 68, 68, 0.3)',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      <XCircle size={14} /> Reject
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </HrmsModal>
  );
};
