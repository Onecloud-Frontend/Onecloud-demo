import React, { useState, useMemo } from 'react';
import { LeaveType, LeaveBalance, Employee, LeaveRequest } from '../../types';
import {
  Calendar,
  CheckCircle2,
  AlertCircle,
  Send,
  Info,
} from 'lucide-react';

interface LeaveApplicationFormViewProps {
  leaveTypes: LeaveType[];
  leaveBalances: LeaveBalance[];
  employees: Employee[];
  defaultLeaveTypeId?: string;
  onSubmit: (request: Omit<LeaveRequest, 'id' | 'status' | 'approvedBy' | 'approvalDate' | 'createdAt' | 'updatedAt'>) => void;
  onSuccess?: () => void;
}

export const LeaveApplicationFormView: React.FC<LeaveApplicationFormViewProps> = ({
  leaveTypes,
  leaveBalances,
  employees,
  defaultLeaveTypeId,
  onSubmit,
  onSuccess,
}) => {
  const [employeeId, setEmployeeId] = useState<string>(employees[0]?.id || 'emp-1');
  const [leaveTypeId, setLeaveTypeId] = useState<string>(defaultLeaveTypeId || leaveTypes[0]?.id || '');

  React.useEffect(() => {
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
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Active leave type
  const selectedLeaveType = useMemo(
    () => leaveTypes.find((lt) => lt.id === leaveTypeId) || leaveTypes[0],
    [leaveTypes, leaveTypeId]
  );

  // Active employee balance
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

  // Compute requested days (excluding weekends)
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
    if (!reason || !hasSufficientBalance || computedDays <= 0) return;

    onSubmit({
      employeeId,
      leaveTypeId,
      startDate,
      endDate: isHalfDay ? startDate : endDate,
      totalDays: computedDays,
      reason: `${reason}${isHalfDay ? ` (${halfDaySession === 'FIRST_HALF' ? 'Morning Session' : 'Afternoon Session'})` : ''}${contactDuringLeave ? ` | Contact: ${contactDuringLeave}` : ''}`,
    });

    setSuccessMsg(
      `Leave application for ${computedDays} day(s) submitted successfully! Request is pending manager approval.`
    );
    setReason('');
    setContactDuringLeave('');
    if (onSuccess) onSuccess();
    setTimeout(() => setSuccessMsg(null), 5000);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 340px', gap: '24px', alignItems: 'start' }}>
      {/* Left Column: Interactive Application Form */}
      <div
        style={{
          backgroundColor: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <div>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
            Submit Leave Application
          </h3>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
            Schedule paid vacation, personal time off, medical recovery, or emergency leave.
          </p>
        </div>

        {successMsg && (
          <div
            style={{
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              color: '#10b981',
              fontSize: '13px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <CheckCircle2 size={18} />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Employee Selection */}
          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Applying Employee
            </label>
            <select
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-elevated)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                fontSize: '13px',
                marginTop: '4px',
                outline: 'none',
              }}
            >
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.firstName} {emp.lastName} ({emp.employeeCode}) • {emp.designation}
                </option>
              ))}
            </select>
          </div>

          {/* Leave Type Selector */}
          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Leave Entitlement Category
            </label>
            <select
              value={leaveTypeId}
              onChange={(e) => setLeaveTypeId(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-elevated)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                fontSize: '13px',
                marginTop: '4px',
                outline: 'none',
              }}
            >
              {leaveTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name} ({type.code}) — {type.defaultDaysPerYear} Days/Year
                </option>
              ))}
            </select>
          </div>

          {/* Half-Day Toggle */}
          <div
            style={{
              padding: '12px 14px',
              backgroundColor: 'var(--bg-elevated)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: 'var(--text-primary)', fontWeight: 600 }}>
              <input
                type="checkbox"
                checked={isHalfDay}
                onChange={(e) => setIsHalfDay(e.target.checked)}
                style={{ cursor: 'pointer' }}
              />
              <span>Apply for Half-Day Leave (0.5 Day)</span>
            </label>

            {isHalfDay && (
              <div style={{ display: 'flex', gap: '16px', marginLeft: '22px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="halfDaySession"
                    checked={halfDaySession === 'FIRST_HALF'}
                    onChange={() => setHalfDaySession('FIRST_HALF')}
                  />
                  <span>First Half (Morning)</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="halfDaySession"
                    checked={halfDaySession === 'SECOND_HALF'}
                    onChange={() => setHalfDaySession('SECOND_HALF')}
                  />
                  <span>Second Half (Afternoon)</span>
                </label>
              </div>
            )}
          </div>

          {/* Date Range Picker */}
          <div style={{ display: 'grid', gridTemplateColumns: isHalfDay ? '1fr' : '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                {isHalfDay ? 'Leave Date' : 'Start Date'}
              </label>
              <input
                type="date"
                required
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  if (isHalfDay || endDate < e.target.value) {
                    setEndDate(e.target.value);
                  }
                }}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-elevated)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  fontSize: '13px',
                  marginTop: '4px',
                  outline: 'none',
                }}
              />
            </div>

            {!isHalfDay && (
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  End Date
                </label>
                <input
                  type="date"
                  required
                  min={startDate}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--bg-elevated)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-primary)',
                    fontSize: '13px',
                    marginTop: '4px',
                    outline: 'none',
                  }}
                />
              </div>
            )}
          </div>

          {/* Real-time Balance Check Warning / Confirmation */}
          <div
            style={{
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: hasSufficientBalance ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.12)',
              border: hasSufficientBalance ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            {hasSufficientBalance ? (
              <CheckCircle2 size={20} color="#10b981" />
            ) : (
              <AlertCircle size={20} color="#ef4444" />
            )}
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: hasSufficientBalance ? '#10b981' : '#ef4444' }}>
                {hasSufficientBalance
                  ? `Balance Check Passed: ${computedDays} day(s) requested`
                  : `Insufficient Leave Balance!`}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                {hasSufficientBalance
                  ? `Available balance will be ${remainingAfterRequest.toFixed(1)} day(s) upon approval.`
                  : `You requested ${computedDays} days, but only ${activeBalance.availableDays} days are available.`}
              </div>
            </div>
          </div>

          {/* Reason Input */}
          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Reason for Absence & Work Handover Note
            </label>
            <textarea
              required
              rows={3}
              placeholder="e.g. Attending family function in hometown. Project tickets have been handed over to Priya..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-elevated)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                fontSize: '13px',
                marginTop: '4px',
                outline: 'none',
                resize: 'vertical',
              }}
            />
          </div>

          {/* Emergency Contact Info */}
          <div>
            <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Emergency Contact / Mobile During Leave (Optional)
            </label>
            <input
              type="text"
              placeholder="+91 98765 43210"
              value={contactDuringLeave}
              onChange={(e) => setContactDuringLeave(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-elevated)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                fontSize: '13px',
                marginTop: '4px',
                outline: 'none',
              }}
            />
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={!hasSufficientBalance || !reason}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: hasSufficientBalance && reason ? 'var(--brand-primary)' : 'var(--bg-elevated)',
              color: '#ffffff',
              border: 'none',
              fontSize: '14px',
              fontWeight: 700,
              cursor: hasSufficientBalance && reason ? 'pointer' : 'not-allowed',
              opacity: hasSufficientBalance && reason ? 1 : 0.6,
            }}
          >
            <Send size={16} /> Submit Leave Request for Manager Review
          </button>
        </form>
      </div>

      {/* Right Column: Entitlement & Quota Breakdown */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-subtle)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={18} style={{ color: 'var(--brand-primary)' }} />
            <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
              {selectedLeaveType?.name}
            </h4>
          </div>

          <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>
            {selectedLeaveType?.description}
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px',
              marginTop: '4px',
            }}
          >
            <div style={{ padding: '10px', backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>ANNUAL ALLOCATION</div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                {activeBalance.allocatedDays} days
              </div>
            </div>

            <div style={{ padding: '10px', backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>USED DAYS</div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#f59e0b', marginTop: '2px' }}>
                {activeBalance.usedDays} days
              </div>
            </div>

            <div style={{ padding: '10px', backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>PENDING APPROVAL</div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#c084fc', marginTop: '2px' }}>
                {activeBalance.pendingDays} days
              </div>
            </div>

            <div style={{ padding: '10px', backgroundColor: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>REMAINING DAYS</div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#10b981', marginTop: '2px' }}>
                {activeBalance.availableDays} days
              </div>
            </div>
          </div>
        </div>

        {/* Policy Guidelines Box */}
        <div
          style={{
            padding: '16px',
            backgroundColor: 'rgba(99, 102, 241, 0.08)',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            fontSize: '12px',
            color: 'var(--text-secondary)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: 'var(--brand-primary)' }}>
            <Info size={16} />
            <span>Leave Submission Policies</span>
          </div>
          <div>• Requests exceeding 3 consecutive days require 48-hour prior manager notification.</div>
          <div>• Half-day leaves apply to either morning (9 AM - 1:30 PM) or afternoon (2 PM - 6:30 PM).</div>
          <div>• Unapproved requests cannot be claimed as retroactive leave without regularization.</div>
        </div>
      </div>
    </div>
  );
};
