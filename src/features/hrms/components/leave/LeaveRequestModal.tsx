import React, { useState } from 'react';
import { LeaveType, LeaveRequest, Employee } from '../../types';
import { HrmsModal } from '../common/HrmsModal';
import { SelectField, TextInput, TextareaField, FormRow } from '../common/HrmsFormFields';

interface LeaveRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  leaveTypes: LeaveType[];
  employees: Employee[];
  onSubmit: (req: Omit<LeaveRequest, 'id' | 'status' | 'approvedBy' | 'approvalDate' | 'createdAt' | 'updatedAt'>) => void;
}

export const LeaveRequestModal: React.FC<LeaveRequestModalProps> = ({
  isOpen,
  onClose,
  leaveTypes,
  employees,
  onSubmit,
}) => {
  const [employeeId, setEmployeeId] = useState('emp-1');
  const [leaveTypeId, setLeaveTypeId] = useState(leaveTypes[0]?.id || 'lt-annual');
  const [startDate, setStartDate] = useState('2026-10-15');
  const [endDate, setEndDate] = useState('2026-10-16');
  const [reason, setReason] = useState('');

  // Calculate day difference
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.max(0, end.getTime() - start.getTime());
  const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) {
      alert('Please state a reason for your leave request.');
      return;
    }

    onSubmit({
      employeeId,
      leaveTypeId,
      startDate,
      endDate,
      totalDays: diffDays,
      reason,
    });
    setReason('');
    onClose();
  };

  return (
    <HrmsModal
      isOpen={isOpen}
      onClose={onClose}
      title="Apply for Time Off"
      subtitle="Submit planned leave or medical notification for manager authorization"
      maxWidth="600px"
      footer={
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              backgroundColor: 'var(--bg-elevated)',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            form="leave-form"
            style={{
              padding: '8px 20px',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              backgroundColor: 'var(--brand-primary)',
              color: '#ffffff',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Submit Application ({diffDays} {diffDays === 1 ? 'Day' : 'Days'})
          </button>
        </div>
      }
    >
      <form id="leave-form" onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <FormRow>
            <SelectField
              label="Applying Employee"
              required
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              options={employees.map((emp) => ({
                label: `${emp.firstName} ${emp.lastName} (${emp.employeeCode})`,
                value: emp.id,
              }))}
            />
            <SelectField
              label="Leave Type Category"
              required
              value={leaveTypeId}
              onChange={(e) => setLeaveTypeId(e.target.value)}
              options={leaveTypes.map((t) => ({ label: `${t.name} (${t.code})`, value: t.id }))}
            />
          </FormRow>

          <FormRow>
            <TextInput
              label="Start Date"
              type="date"
              required
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <TextInput
              label="End Date"
              type="date"
              required
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </FormRow>

          <div
            style={{
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.25)',
              fontSize: '13px',
              color: 'var(--text-primary)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>Total Leave Duration:</span>
            <strong style={{ color: 'var(--brand-primary)', fontSize: '15px' }}>
              {diffDays} working {diffDays === 1 ? 'day' : 'days'}
            </strong>
          </div>

          <TextareaField
            label="Reason for Absence"
            required
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g. Taking family time off during school vacation; backup contact is Devon Arora."
          />
        </div>
      </form>
    </HrmsModal>
  );
};
