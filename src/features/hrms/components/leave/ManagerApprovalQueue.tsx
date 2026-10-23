import React, { useState } from 'react';
import { LeaveRequest, LeaveType, Employee } from '../../types';
import { HrmsStatusBadge } from '../common/HrmsStatusBadge';
import { CheckCircle2, Clock, History, Check, X } from 'lucide-react';

interface ManagerApprovalQueueProps {
  pendingRequests: LeaveRequest[];
  allRequests?: LeaveRequest[];
  leaveTypes: LeaveType[];
  employees: Employee[];
  onReview: (id: string, status: 'APPROVED' | 'REJECTED', reason?: string) => void;
}

export const ManagerApprovalQueue: React.FC<ManagerApprovalQueueProps> = ({
  pendingRequests,
  allRequests = [],
  leaveTypes,
  employees,
  onReview,
}) => {
  const [activeTab, setActiveTab] = useState<'pending' | 'history'>('pending');

  const getEmployee = (id: string) => employees.find((e) => e.id === id);
  const getLeaveType = (id: string) => leaveTypes.find((t) => t.id === id);

  const historyRequests = allRequests.filter(
    (r) => r.status === 'APPROVED' || r.status === 'REJECTED'
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      {/* Queue Header & Sub-Tab Navigation */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
          backgroundColor: 'var(--bg-elevated)',
          padding: '12px 18px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setActiveTab('pending')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: activeTab === 'pending' ? 'var(--brand-primary)' : 'var(--bg-card)',
              color: activeTab === 'pending' ? '#ffffff' : 'var(--text-secondary)',
              border: '1px solid var(--border-subtle)',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <Clock size={13} />
            Pending Action Queue ({pendingRequests.length})
            {pendingRequests.length > 0 && (
              <span
                style={{
                  fontSize: '10px',
                  padding: '1px 5px',
                  borderRadius: '999px',
                  backgroundColor: '#ef4444',
                  color: '#ffffff',
                }}
              >
                {pendingRequests.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('history')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: activeTab === 'history' ? 'var(--brand-primary)' : 'var(--bg-card)',
              color: activeTab === 'history' ? '#ffffff' : 'var(--text-secondary)',
              border: '1px solid var(--border-subtle)',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <History size={13} />
            Decision History Archive ({historyRequests.length})
          </button>
        </div>

        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          Managerial Review & Audit Trail
        </span>
      </div>

      {/* PENDING QUEUE */}
      {activeTab === 'pending' && (
        <>
          {pendingRequests.length === 0 ? (
            <div
              style={{
                padding: '48px 20px',
                textAlign: 'center',
                backgroundColor: 'var(--bg-card)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <CheckCircle2 size={40} color="#10b981" style={{ margin: '0 auto 12px' }} />
              <h4 style={{ margin: 0, fontSize: '16px', color: 'var(--text-primary)' }}>
                All Leave Applications Are Reviewed!
              </h4>
              <p style={{ margin: '6px 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
                No pending team leave approval requests requiring manager action.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {pendingRequests.map((req) => {
                const emp = getEmployee(req.employeeId);
                const type = getLeaveType(req.leaveTypeId);

                return (
                  <div
                    key={req.id}
                    style={{
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-lg)',
                      padding: '20px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '16px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <img
                        src={emp?.profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
                        alt=""
                        style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
                      />

                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <h4 style={{ margin: 0, fontSize: '15px', color: 'var(--text-primary)', fontWeight: 600 }}>
                            {emp ? `${emp.firstName} ${emp.lastName}` : 'Employee'}
                          </h4>
                          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>({emp?.employeeCode})</span>
                          <HrmsStatusBadge status={req.status} size="sm" />
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px', fontSize: '12px' }}>
                          <span style={{ color: 'var(--brand-primary)', fontWeight: 600 }}>
                            {type?.name || 'Leave'}
                          </span>
                          <span style={{ color: 'var(--text-muted)' }}>•</span>
                          <span style={{ color: 'var(--text-secondary)' }}>
                            {req.startDate} to {req.endDate} (<strong>{req.totalDays} Days</strong>)
                          </span>
                        </div>

                        <p style={{ margin: '8px 0 0', fontSize: '13px', color: 'var(--text-primary)', fontStyle: 'italic' }}>
                          "{req.reason}"
                        </p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <button
                        onClick={() => onReview(req.id, 'APPROVED')}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '8px 18px',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: '#10b981',
                          color: '#ffffff',
                          border: 'none',
                          fontWeight: 600,
                          fontSize: '13px',
                          cursor: 'pointer',
                        }}
                      >
                        <Check size={15} /> Approve
                      </button>
                      <button
                        onClick={() => {
                          const comment = prompt('Optional rejection reason / comments:');
                          onReview(req.id, 'REJECTED', comment || undefined);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '8px 18px',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: 'rgba(239, 68, 68, 0.15)',
                          color: '#ef4444',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                          fontWeight: 600,
                          fontSize: '13px',
                          cursor: 'pointer',
                        }}
                      >
                        <X size={15} /> Reject
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* DECISION HISTORY ARCHIVE */}
      {activeTab === 'history' && (
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-subtle)',
            overflow: 'hidden',
          }}
        >
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-elevated)', borderBottom: '1px solid var(--border-subtle)' }}>
                  <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--text-primary)' }}>EMPLOYEE</th>
                  <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--text-primary)' }}>LEAVE TYPE</th>
                  <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--text-primary)' }}>DATES</th>
                  <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--text-primary)' }}>DAYS</th>
                  <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--text-primary)' }}>STATUS</th>
                  <th style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--text-primary)' }}>DECISION DATE</th>
                </tr>
              </thead>
              <tbody>
                {historyRequests.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>
                      No decision history records available yet.
                    </td>
                  </tr>
                ) : (
                  historyRequests.map((req) => {
                    const emp = getEmployee(req.employeeId);
                    const type = getLeaveType(req.leaveTypeId);

                    return (
                      <tr key={req.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                        <td style={{ padding: '12px 16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <img
                              src={emp?.profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
                              alt=""
                              style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                            />
                            <div>
                              <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                                {emp ? `${emp.firstName} ${emp.lastName}` : 'Employee'}
                              </div>
                              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                                {emp?.employeeCode}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--brand-primary)' }}>
                          {type?.name || 'Leave'}
                        </td>
                        <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>
                          {req.startDate} → {req.endDate}
                        </td>
                        <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--text-primary)' }}>
                          {req.totalDays}
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <HrmsStatusBadge status={req.status} size="sm" />
                        </td>
                        <td style={{ padding: '12px 16px', color: 'var(--text-muted)' }}>
                          {req.approvalDate ? new Date(req.approvalDate).toLocaleDateString() : '—'}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
