import React, { useState, useMemo } from 'react';
import {
  AttendanceCorrection,
  OvertimeRecord,
  Employee,
  AttendanceRecord,
} from '../../types';
import { HrmsStatusBadge } from '../common/HrmsStatusBadge';
import {
  ShieldAlert,
  Clock,
  RotateCcw,
  CheckCircle2,
  Plus,
  Filter,
  Search,
  Check,
  X,
} from 'lucide-react';

interface OvertimeRegularizationLogViewProps {
  corrections: AttendanceCorrection[];
  overtimeRecords: OvertimeRecord[];
  employees: Employee[];
  attendanceRecords?: AttendanceRecord[];
  onReviewCorrection: (id: string, status: 'APPROVED' | 'REJECTED', reviewerId?: string) => void;
  onReviewOvertime: (id: string, status: 'APPROVED' | 'REJECTED', approverId?: string) => void;
  onSubmitCorrection?: (correction: Omit<AttendanceCorrection, 'id' | 'status' | 'reviewedBy' | 'reviewedAt' | 'createdAt'>) => void;
  onSubmitOvertime?: (claim: Omit<OvertimeRecord, 'id' | 'status' | 'approvedBy' | 'createdAt'>) => void;
}

export const OvertimeRegularizationLogView: React.FC<OvertimeRegularizationLogViewProps> = ({
  corrections,
  overtimeRecords,
  employees,
  attendanceRecords: _attendanceRecords,
  onReviewCorrection,
  onReviewOvertime,
  onSubmitCorrection,
  onSubmitOvertime,
}) => {
  const [activeQueueTab, setActiveQueueTab] = useState<'all' | 'corrections' | 'overtime'>('all');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [successBanner, setSuccessBanner] = useState<string | null>(null);

  // Modal triggers
  const [isCorrectionModalOpen, setIsCorrectionModalOpen] = useState(false);
  const [isOvertimeModalOpen, setIsOvertimeModalOpen] = useState(false);

  // Form states for new submission modals
  const [targetEmployeeId, setTargetEmployeeId] = useState(employees[0]?.id || 'emp-1');
  const [reqDate, setReqDate] = useState('2026-10-07');
  const [reqCheckIn, setReqCheckIn] = useState('09:00');
  const [reqCheckOut, setReqCheckOut] = useState('18:00');
  const [reqReason, setReqReason] = useState('');

  const [otDate, setOtDate] = useState('2026-10-07');
  const [otHours, setOtHours] = useState(2.5);
  const [otMultiplier, setOtMultiplier] = useState(1.5);
  const [otReason, setOtReason] = useState('');

  const getEmployee = (id: string) => employees.find((e) => e.id === id);

  // Summary Metrics
  const pendingCorrectionsCount = corrections.filter((c) => c.status === 'PENDING').length;
  const pendingOvertimeCount = overtimeRecords.filter((o) => o.status === 'PENDING').length;
  const approvedCorrectionsCount = corrections.filter((c) => c.status === 'APPROVED').length;
  const approvedOtHours = overtimeRecords
    .filter((o) => o.status === 'APPROVED')
    .reduce((sum, o) => sum + o.hours, 0);

  // Filtered Corrections
  const filteredCorrections = useMemo(() => {
    return corrections.filter((c) => {
      if (statusFilter !== 'ALL' && c.status !== statusFilter) return false;
      if (searchQuery) {
        const emp = getEmployee(c.employeeId);
        const q = searchQuery.toLowerCase();
        const matchesName = emp ? `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(q) : false;
        const matchesReason = c.reason.toLowerCase().includes(q);
        if (!matchesName && !matchesReason) return false;
      }
      return true;
    });
  }, [corrections, statusFilter, searchQuery, employees]);

  // Filtered Overtime
  const filteredOvertime = useMemo(() => {
    return overtimeRecords.filter((o) => {
      if (statusFilter !== 'ALL' && o.status !== statusFilter) return false;
      if (searchQuery) {
        const emp = getEmployee(o.employeeId);
        const q = searchQuery.toLowerCase();
        const matchesName = emp ? `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(q) : false;
        const matchesReason = o.reason.toLowerCase().includes(q);
        if (!matchesName && !matchesReason) return false;
      }
      return true;
    });
  }, [overtimeRecords, statusFilter, searchQuery, employees]);

  // Submission Handlers
  const handleSubmitCorrection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reqReason || !onSubmitCorrection) return;

    onSubmitCorrection({
      employeeId: targetEmployeeId,
      attendanceRecordId: `att-${Date.now()}`,
      requestedCheckIn: reqCheckIn,
      requestedCheckOut: reqCheckOut,
      reason: reqReason,
    });

    setSuccessBanner('Attendance regularization request submitted and placed in review queue.');
    setIsCorrectionModalOpen(false);
    setReqReason('');
    setTimeout(() => setSuccessBanner(null), 4000);
  };

  const handleSubmitOvertime = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otReason || !onSubmitOvertime) return;

    onSubmitOvertime({
      employeeId: targetEmployeeId,
      date: otDate,
      hours: Number(otHours),
      rateMultiplier: Number(otMultiplier),
      reason: otReason,
    });

    setSuccessBanner('Overtime claim submitted and added to manager approval queue.');
    setIsOvertimeModalOpen(false);
    setOtReason('');
    setTimeout(() => setSuccessBanner(null), 4000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Success Notification Banner */}
      {successBanner && (
        <div
          style={{
            padding: '12px 18px',
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: 'var(--radius-md)',
            color: '#10b981',
            fontSize: '13px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <CheckCircle2 size={18} />
          <span>{successBanner}</span>
        </div>
      )}

      {/* 1. Managerial Queue Header Metric Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '14px',
        }}
      >
        <div
          style={{
            padding: '16px',
            backgroundColor: 'var(--bg-card)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
          }}
        >
          <div
            style={{
              padding: '12px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: pendingCorrectionsCount > 0 ? 'rgba(239, 68, 68, 0.15)' : 'rgba(99, 102, 241, 0.1)',
              color: pendingCorrectionsCount > 0 ? '#ef4444' : 'var(--brand-primary)',
            }}
          >
            <RotateCcw size={22} />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Pending Regularizations
            </div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: pendingCorrectionsCount > 0 ? '#ef4444' : 'var(--text-primary)', marginTop: '2px' }}>
              {pendingCorrectionsCount}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
              Missed Biometric Punches
            </div>
          </div>
        </div>

        <div
          style={{
            padding: '16px',
            backgroundColor: 'var(--bg-card)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
          }}
        >
          <div
            style={{
              padding: '12px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: pendingOvertimeCount > 0 ? 'rgba(245, 158, 11, 0.15)' : 'rgba(99, 102, 241, 0.1)',
              color: pendingOvertimeCount > 0 ? '#f59e0b' : 'var(--brand-primary)',
            }}
          >
            <Clock size={22} />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Pending Overtime Claims
            </div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: pendingOvertimeCount > 0 ? '#f59e0b' : 'var(--text-primary)', marginTop: '2px' }}>
              {pendingOvertimeCount}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
              Manager Authorization Needed
            </div>
          </div>
        </div>

        <div
          style={{
            padding: '16px',
            backgroundColor: 'var(--bg-card)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
          }}
        >
          <div
            style={{
              padding: '12px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(16, 185, 129, 0.12)',
              color: '#10b981',
            }}
          >
            <CheckCircle2 size={22} />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Approved Regularizations
            </div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
              {approvedCorrectionsCount}
            </div>
            <div style={{ fontSize: '11px', color: '#10b981', marginTop: '2px' }}>
              Corrected in Punch Log
            </div>
          </div>
        </div>

        <div
          style={{
            padding: '16px',
            backgroundColor: 'var(--bg-card)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
          }}
        >
          <div
            style={{
              padding: '12px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(56, 189, 248, 0.12)',
              color: '#38bdf8',
            }}
          >
            <ShieldAlert size={22} />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Approved Overtime
            </div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
              {approvedOtHours.toFixed(1)} hrs
            </div>
            <div style={{ fontSize: '11px', color: '#10b981', marginTop: '2px' }}>
              Ready for Payroll Payout
            </div>
          </div>
        </div>
      </div>

      {/* 2. Review Queue Control Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '14px',
          backgroundColor: 'var(--bg-elevated)',
          padding: '14px 18px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px' }}>
          {/* Sub-Tabs: All, Regularizations, Overtime */}
          <button
            onClick={() => setActiveQueueTab('all')}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: activeQueueTab === 'all' ? 'var(--brand-primary)' : 'var(--bg-card)',
              color: activeQueueTab === 'all' ? '#ffffff' : 'var(--text-secondary)',
              border: '1px solid var(--border-subtle)',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            All Requests ({corrections.length + overtimeRecords.length})
          </button>
          <button
            onClick={() => setActiveQueueTab('corrections')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: activeQueueTab === 'corrections' ? 'var(--brand-primary)' : 'var(--bg-card)',
              color: activeQueueTab === 'corrections' ? '#ffffff' : 'var(--text-secondary)',
              border: '1px solid var(--border-subtle)',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <RotateCcw size={13} /> Missed Punch Regularization ({corrections.length})
            {pendingCorrectionsCount > 0 && (
              <span
                style={{
                  fontSize: '10px',
                  padding: '1px 5px',
                  borderRadius: '999px',
                  backgroundColor: '#ef4444',
                  color: '#ffffff',
                }}
              >
                {pendingCorrectionsCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveQueueTab('overtime')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: activeQueueTab === 'overtime' ? 'var(--brand-primary)' : 'var(--bg-card)',
              color: activeQueueTab === 'overtime' ? '#ffffff' : 'var(--text-secondary)',
              border: '1px solid var(--border-subtle)',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <Clock size={13} /> Overtime Claims ({overtimeRecords.length})
            {pendingOvertimeCount > 0 && (
              <span
                style={{
                  fontSize: '10px',
                  padding: '1px 5px',
                  borderRadius: '999px',
                  backgroundColor: '#f59e0b',
                  color: '#ffffff',
                }}
              >
                {pendingOvertimeCount}
              </span>
            )}
          </button>

          {/* Status Filter Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: '6px' }}>
            <Filter size={13} style={{ color: 'var(--text-muted)' }} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
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
              <option value="ALL">All Statuses</option>
              <option value="PENDING">Pending Review</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>

          {/* Search Input */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              padding: '4px 10px',
              marginLeft: '6px',
            }}
          >
            <Search size={13} style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search request or reason..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-primary)',
                fontSize: '12px',
                outline: 'none',
                width: '160px',
              }}
            />
          </div>
        </div>

        {/* Action Buttons: Request Regularization / Claim Overtime */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setIsCorrectionModalOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 12px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-subtle)',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <Plus size={14} /> Regularization Request
          </button>
          <button
            onClick={() => setIsOvertimeModalOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 12px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--brand-primary)',
              color: '#ffffff',
              border: 'none',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <Plus size={14} /> Claim Overtime
          </button>
        </div>
      </div>

      {/* 3. SUB-QUEUE A: Missed Punch Regularization Log */}
      {(activeQueueTab === 'all' || activeQueueTab === 'corrections') && (
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-subtle)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <RotateCcw size={18} style={{ color: 'var(--brand-primary)' }} />
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Missed Biometric Punch Regularization Log
              </h3>
            </div>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              {filteredCorrections.length} request(s) found
            </span>
          </div>

          {filteredCorrections.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
              No attendance regularization requests matching criteria.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {filteredCorrections.map((corr) => {
                const emp = getEmployee(corr.employeeId);
                const isPending = corr.status === 'PENDING';

                return (
                  <div
                    key={corr.id}
                    style={{
                      padding: '16px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-elevated)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '16px',
                    }}
                  >
                    {/* Left: Employee Identity & Correction Times */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: '240px' }}>
                      <div
                        style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: 'rgba(99, 102, 241, 0.12)',
                          color: 'var(--brand-primary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '13px',
                          border: '1px solid rgba(99, 102, 241, 0.25)',
                          flexShrink: 0,
                        }}
                      >
                        {emp ? `${emp.firstName?.[0] || ''}${emp.lastName?.[0] || ''}` : 'EM'}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '14px' }}>
                          {emp ? `${emp.firstName} ${emp.lastName}` : 'Employee'}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                          {emp?.employeeCode} • {emp?.designation}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                          Submitted: {new Date(corr.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    {/* Middle: Requested Punches & Reason */}
                    <div style={{ flex: 1, minWidth: '280px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                          Requested Adjustment:
                        </span>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '12px',
                            fontWeight: 700,
                            color: '#10b981',
                            backgroundColor: 'rgba(16, 185, 129, 0.1)',
                            padding: '2px 6px',
                            borderRadius: '4px',
                          }}
                        >
                          In: {corr.requestedCheckIn || '—'}
                        </span>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '12px',
                            fontWeight: 700,
                            color: '#f59e0b',
                            backgroundColor: 'rgba(245, 158, 11, 0.1)',
                            padding: '2px 6px',
                            borderRadius: '4px',
                          }}
                        >
                          Out: {corr.requestedCheckOut || '—'}
                        </span>
                      </div>
                      <div
                        style={{
                          fontSize: '12px',
                          color: 'var(--text-primary)',
                          fontStyle: 'italic',
                          backgroundColor: 'var(--bg-card)',
                          padding: '6px 10px',
                          borderRadius: '4px',
                          border: '1px solid var(--border-subtle)',
                        }}
                      >
                        "{corr.reason}"
                      </div>
                    </div>

                    {/* Right: Status & Managerial Review Buttons */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <HrmsStatusBadge status={corr.status} size="sm" />

                      {isPending ? (
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={() => onReviewCorrection(corr.id, 'APPROVED')}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '6px 12px',
                              borderRadius: 'var(--radius-sm)',
                              backgroundColor: '#10b981',
                              color: '#ffffff',
                              border: 'none',
                              fontSize: '12px',
                              fontWeight: 600,
                              cursor: 'pointer',
                            }}
                          >
                            <Check size={14} /> Approve
                          </button>
                          <button
                            onClick={() => onReviewCorrection(corr.id, 'REJECTED')}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '6px 12px',
                              borderRadius: 'var(--radius-sm)',
                              backgroundColor: 'transparent',
                              color: '#ef4444',
                              border: '1px solid #ef4444',
                              fontSize: '12px',
                              fontWeight: 600,
                              cursor: 'pointer',
                            }}
                          >
                            <X size={14} /> Reject
                          </button>
                        </div>
                      ) : (
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                          Audit: {corr.reviewedBy || 'Manager'}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 4. SUB-QUEUE B: Overtime Claims Log */}
      {(activeQueueTab === 'all' || activeQueueTab === 'overtime') && (
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-subtle)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={18} style={{ color: '#f59e0b' }} />
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Overtime Hours Claim & Authorization Log
              </h3>
            </div>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              {filteredOvertime.length} claim(s) found
            </span>
          </div>

          {filteredOvertime.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
              No overtime claims matching criteria.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {filteredOvertime.map((ot) => {
                const emp = getEmployee(ot.employeeId);
                const isPending = ot.status === 'PENDING';

                return (
                  <div
                    key={ot.id}
                    style={{
                      padding: '16px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-elevated)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '16px',
                    }}
                  >
                    {/* Left: Employee Info */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: '240px' }}>
                      <div
                        style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: 'rgba(99, 102, 241, 0.12)',
                          color: 'var(--brand-primary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '13px',
                          border: '1px solid rgba(99, 102, 241, 0.25)',
                          flexShrink: 0,
                        }}
                      >
                        {emp ? `${emp.firstName?.[0] || ''}${emp.lastName?.[0] || ''}` : 'EM'}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '14px' }}>
                          {emp ? `${emp.firstName} ${emp.lastName}` : 'Employee'}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                          {emp?.employeeCode} • {emp?.designation}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                          Claim Date: {ot.date}
                        </div>
                      </div>
                    </div>

                    {/* Middle: OT Hours, Multiplier & Reason */}
                    <div style={{ flex: 1, minWidth: '280px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span
                          style={{
                            fontSize: '13px',
                            fontWeight: 800,
                            color: '#6366f1',
                            fontFamily: 'var(--font-mono)',
                          }}
                        >
                          {ot.hours} Hours Logged
                        </span>
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            padding: '2px 6px',
                            borderRadius: '4px',
                            backgroundColor: 'rgba(99, 102, 241, 0.12)',
                            color: 'var(--brand-primary)',
                          }}
                        >
                          {ot.rateMultiplier}x Pay Multiplier
                        </span>
                      </div>
                      <div
                        style={{
                          fontSize: '12px',
                          color: 'var(--text-primary)',
                          fontStyle: 'italic',
                          backgroundColor: 'var(--bg-card)',
                          padding: '6px 10px',
                          borderRadius: '4px',
                          border: '1px solid var(--border-subtle)',
                        }}
                      >
                        "{ot.reason}"
                      </div>
                    </div>

                    {/* Right: Status & Actions */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <HrmsStatusBadge status={ot.status} size="sm" />

                      {isPending ? (
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={() => onReviewOvertime(ot.id, 'APPROVED')}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '6px 12px',
                              borderRadius: 'var(--radius-sm)',
                              backgroundColor: '#10b981',
                              color: '#ffffff',
                              border: 'none',
                              fontSize: '12px',
                              fontWeight: 600,
                              cursor: 'pointer',
                            }}
                          >
                            <Check size={14} /> Approve Claim
                          </button>
                          <button
                            onClick={() => onReviewOvertime(ot.id, 'REJECTED')}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '6px 12px',
                              borderRadius: 'var(--radius-sm)',
                              backgroundColor: 'transparent',
                              color: '#ef4444',
                              border: '1px solid #ef4444',
                              fontSize: '12px',
                              fontWeight: 600,
                              cursor: 'pointer',
                            }}
                          >
                            <X size={14} /> Reject
                          </button>
                        </div>
                      ) : (
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                          Approver: {ot.approvedBy || 'Manager'}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* MODAL: Submit Attendance Regularization Request */}
      {isCorrectionModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1100,
            padding: '20px',
          }}
          onClick={() => setIsCorrectionModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: 'var(--bg-card)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-subtle)',
              width: '100%',
              maxWidth: '480px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <RotateCcw size={20} style={{ color: 'var(--brand-primary)' }} />
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Request Attendance Regularization
                </h3>
              </div>
              <button
                onClick={() => setIsCorrectionModalOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmitCorrection} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Employee</label>
                <select
                  value={targetEmployeeId}
                  onChange={(e) => setTargetEmployeeId(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
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
                      {emp.firstName} {emp.lastName} ({emp.employeeCode})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Punch Date</label>
                <input
                  type="date"
                  required
                  value={reqDate}
                  onChange={(e) => setReqDate(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Requested Check-In</label>
                  <input
                    type="time"
                    required
                    value={reqCheckIn}
                    onChange={(e) => setReqCheckIn(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
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

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Requested Check-Out</label>
                  <input
                    type="time"
                    required
                    value={reqCheckOut}
                    onChange={(e) => setReqCheckOut(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
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
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  Reason for Missed Punch / Discrepancy
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="e.g. Biometric terminal scanner failure at Building B entrance..."
                  value={reqReason}
                  onChange={(e) => setReqReason(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
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

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={() => setIsCorrectionModalOpen(false)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'transparent',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-secondary)',
                    fontSize: '13px',
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
                    border: 'none',
                    color: '#ffffff',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Submit Overtime Claim */}
      {isOvertimeModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1100,
            padding: '20px',
          }}
          onClick={() => setIsOvertimeModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: 'var(--bg-card)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-subtle)',
              width: '100%',
              maxWidth: '480px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Clock size={20} style={{ color: '#f59e0b' }} />
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Submit Overtime Claim
                </h3>
              </div>
              <button
                onClick={() => setIsOvertimeModalOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmitOvertime} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Employee</label>
                <select
                  value={targetEmployeeId}
                  onChange={(e) => setTargetEmployeeId(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
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
                      {emp.firstName} {emp.lastName} ({emp.employeeCode})
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Overtime Date</label>
                  <input
                    type="date"
                    required
                    value={otDate}
                    onChange={(e) => setOtDate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
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

                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Hours Claimed</label>
                  <input
                    type="number"
                    step="0.5"
                    min="0.5"
                    max="12"
                    required
                    value={otHours}
                    onChange={(e) => setOtHours(Number(e.target.value))}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
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
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Pay Rate Multiplier</label>
                <select
                  value={otMultiplier}
                  onChange={(e) => setOtMultiplier(Number(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--bg-elevated)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-primary)',
                    fontSize: '13px',
                    marginTop: '4px',
                    outline: 'none',
                  }}
                >
                  <option value={1.5}>1.5x Standard Overtime (Weekdays / Evenings)</option>
                  <option value={2.0}>2.0x Double-Time (Weekends & Public Holidays)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  Work Description & Justification
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="e.g. Critical database failover drill and production release support..."
                  value={otReason}
                  onChange={(e) => setOtReason(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
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

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={() => setIsOvertimeModalOpen(false)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'transparent',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-secondary)',
                    fontSize: '13px',
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
                    border: 'none',
                    color: '#ffffff',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Submit Overtime Claim
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
