import React, { useState, useMemo, useEffect } from 'react';
import { LeaveType, LeaveBalance, Employee, LeaveRequest } from '../../types';
import { X, Calendar, Clock, AlertTriangle, CheckCircle2, Send, Info } from 'lucide-react';

interface LeaveApplicationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  leaveTypes: LeaveType[];
  leaveBalances: LeaveBalance[];
  employees: Employee[];
  defaultLeaveTypeId?: string;
  onSubmit: (request: Omit<LeaveRequest, 'id' | 'status' | 'approvedBy' | 'approvalDate' | 'createdAt' | 'updatedAt'>) => void;
  onSuccess?: () => void;
}

export const LeaveApplicationDrawer: React.FC<LeaveApplicationDrawerProps> = ({
  isOpen,
  onClose,
  leaveTypes,
  leaveBalances,
  employees,
  defaultLeaveTypeId,
  onSubmit,
  onSuccess,
}) => {
  const [employeeId, setEmployeeId] = useState<string>(employees[0]?.id || 'emp-1');
  const [leaveTypeId, setLeaveTypeId] = useState<string>(defaultLeaveTypeId || leaveTypes[0]?.id || '');

  useEffect(() => {
    if (defaultLeaveTypeId) {
      setLeaveTypeId(defaultLeaveTypeId);
    }
  }, [defaultLeaveTypeId]);

  const [startDate, setStartDate] = useState<string>('2026-10-12');
  const [endDate, setEndDate] = useState<string>('2026-10-14');
  const [isHalfDay, setIsHalfDay] = useState<boolean>(false);
  const [halfDaySession, setHalfDaySession] = useState<'FIRST_HALF' | 'SECOND_HALF'>('FIRST_HALF');
  const [reason, setReason] = useState<string>('');
  const [contactDuringLeave, setContactDuringLeave] = useState<string>('');
  const [submittedFeedback, setSubmittedFeedback] = useState<string | null>(null);

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const selectedEmployee = useMemo(
    () => employees.find((e) => e.id === employeeId) || employees[0],
    [employees, employeeId]
  );

  const selectedLeaveType = useMemo(
    () => leaveTypes.find((lt) => lt.id === leaveTypeId) || leaveTypes[0],
    [leaveTypes, leaveTypeId]
  );

  // Active employee balance for selected type
  const activeBalance = useMemo(() => {
    return (
      leaveBalances.find((b) => b.employeeId === employeeId && b.leaveTypeId === leaveTypeId) || {
        allocatedDays: selectedLeaveType?.defaultDaysPerYear || 20,
        usedDays: 0,
        pendingDays: 0,
        availableDays: selectedLeaveType?.defaultDaysPerYear || 20,
      }
    );
  }, [leaveBalances, employeeId, leaveTypeId, selectedLeaveType]);

  // Duration Calculator (excluding weekends)
  const computedDays = useMemo(() => {
    if (isHalfDay) return 0.5;
    if (!startDate || !endDate) return 1;

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end < start) return 0;

    let count = 0;
    const cur = new Date(start);
    while (cur <= end) {
      const day = cur.getDay();
      if (day !== 0 && day !== 6) {
        count++;
      }
      cur.setDate(cur.getDate() + 1);
    }
    return Math.max(1, count);
  }, [startDate, endDate, isHalfDay]);

  const hasSufficientBalance = activeBalance.availableDays >= computedDays;
  const remainingAfterRequest = activeBalance.availableDays - computedDays;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim() || !hasSufficientBalance || computedDays <= 0) return;

    onSubmit({
      employeeId,
      leaveTypeId,
      startDate,
      endDate: isHalfDay ? startDate : endDate,
      totalDays: computedDays,
      reason: `${reason}${isHalfDay ? ` (${halfDaySession === 'FIRST_HALF' ? 'Morning Session' : 'Afternoon Session'})` : ''}${contactDuringLeave ? ` | Contact: ${contactDuringLeave}` : ''}`,
    });

    setSubmittedFeedback(`Application for ${computedDays} day(s) submitted successfully!`);
    setTimeout(() => {
      setSubmittedFeedback(null);
      setReason('');
      setContactDuringLeave('');
      onClose();
      if (onSuccess) onSuccess();
    }, 900);
  };

  if (!isOpen) return null;

  return (
    <div className="drawer-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="drawer-panel" role="dialog" aria-modal="true" aria-labelledby="drawer-title">
        {/* Drawer Header */}
        <div className="drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={18} style={{ color: 'var(--brand-primary)' }} />
            <h2 id="drawer-title" className="drawer-title">
              Apply for Leave
            </h2>
          </div>
          <button className="drawer-close" onClick={onClose} aria-label="Close Drawer">
            <X size={16} />
          </button>
        </div>

        {/* Applicant Banner */}
        <div className="applicant-banner">
          <img
            src={selectedEmployee?.profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
            alt=""
            style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }}
          />
          <div style={{ flex: 1 }}>
            <div className="applicant-name">
              {selectedEmployee?.firstName} {selectedEmployee?.lastName}
            </div>
            <div className="applicant-meta">
              {selectedEmployee?.employeeCode} • {selectedEmployee?.designation}
            </div>
          </div>
        </div>

        {/* Feedback Message */}
        {submittedFeedback && (
          <div
            style={{
              margin: '16px 24px 0',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              color: '#10b981',
              fontSize: '13px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <CheckCircle2 size={16} />
            <span>{submittedFeedback}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="drawer-form">
          {/* Employee Selector */}
          <label className="form-label">
            <span>Applying Employee</span>
            <select
              className="form-input"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
            >
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.firstName} {emp.lastName} ({emp.employeeCode})
                </option>
              ))}
            </select>
          </label>

          {/* Leave Entitlement Category */}
          <label className="form-label">
            <span>Leave Entitlement Category</span>
            <select
              className="form-input"
              value={leaveTypeId}
              onChange={(e) => setLeaveTypeId(e.target.value)}
            >
              {leaveTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name} ({type.code}) — {type.defaultDaysPerYear} Days/Year
                </option>
              ))}
            </select>
          </label>

          {/* Half-Day Toggle */}
          <div
            style={{
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-elevated)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <label className="form-checkbox-label">
              <input
                type="checkbox"
                checked={isHalfDay}
                onChange={(e) => setIsHalfDay(e.target.checked)}
              />
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                Apply for Half-Day (0.5 Day)
              </span>
            </label>

            {isHalfDay && (
              <div style={{ display: 'flex', gap: '16px', marginLeft: '22px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="drawerHalfDaySession"
                    checked={halfDaySession === 'FIRST_HALF'}
                    onChange={() => setHalfDaySession('FIRST_HALF')}
                  />
                  <span>First Half (Morning)</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="drawerHalfDaySession"
                    checked={halfDaySession === 'SECOND_HALF'}
                    onChange={() => setHalfDaySession('SECOND_HALF')}
                  />
                  <span>Second Half (Afternoon)</span>
                </label>
              </div>
            )}
          </div>

          {/* Date Pickers with Duration Calculator */}
          <div className="form-row">
            <label className="form-label">
              <span>{isHalfDay ? 'Leave Date' : 'Start Date'}</span>
              <input
                type="date"
                required
                className="form-input"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  if (isHalfDay || endDate < e.target.value) {
                    setEndDate(e.target.value);
                  }
                }}
              />
            </label>

            {!isHalfDay && (
              <label className="form-label">
                <span>End Date</span>
                <input
                  type="date"
                  required
                  min={startDate}
                  className="form-input"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </label>
            )}
          </div>

          {/* Duration Calculator Display */}
          <div
            style={{
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-secondary)' }}>
              <Clock size={15} style={{ color: 'var(--brand-primary)' }} />
              <span>Calculated Working Days:</span>
            </div>
            <strong style={{ fontSize: '14px', color: 'var(--brand-primary)' }}>
              {computedDays} {computedDays === 1 ? 'Working Day' : 'Working Days'}
            </strong>
          </div>

          {/* Balance Indicator & Real-Time Validation */}
          <div className={`balance-indicator ${hasSufficientBalance ? '' : 'balance-indicator--exhausted'}`}>
            <span className="balance-indicator-label">Available {selectedLeaveType?.name} Balance:</span>
            <span className="balance-indicator-value">{activeBalance.availableDays} Days Available</span>
          </div>

          {!hasSufficientBalance ? (
            <div className="alert-box alert-box--error">
              <AlertTriangle size={16} />
              <span>Insufficient balance! Requested {computedDays}d exceeds {activeBalance.availableDays}d available.</span>
            </div>
          ) : (
            <div
              style={{
                fontSize: '11px',
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '0 4px',
              }}
            >
              <Info size={13} style={{ color: '#10b981' }} />
              <span>Remaining balance after approval: {remainingAfterRequest.toFixed(1)} days</span>
            </div>
          )}

          {/* Reason Input */}
          <label className="form-label">
            <span>Reason for Absence & Handover Note</span>
            <textarea
              required
              rows={3}
              className="form-input"
              placeholder="e.g. Vacation with family. Tickets assigned to Priya..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </label>

          {/* Emergency Contact */}
          <label className="form-label">
            <span>Emergency Mobile / Contact During Leave</span>
            <input
              type="text"
              className="form-input"
              placeholder="+1 (555) 234-5678"
              value={contactDuringLeave}
              onChange={(e) => setContactDuringLeave(e.target.value)}
            />
          </label>

          {/* Drawer Actions */}
          <div className="drawer-actions">
            <button type="button" className="btn-secondary-action" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn-apply-leave"
              disabled={!hasSufficientBalance || !reason.trim() || computedDays <= 0}
              style={{
                opacity: hasSufficientBalance && reason.trim() && computedDays > 0 ? 1 : 0.5,
                cursor: hasSufficientBalance && reason.trim() && computedDays > 0 ? 'pointer' : 'not-allowed',
              }}
            >
              <Send size={15} />
              Submit ({computedDays}d)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
