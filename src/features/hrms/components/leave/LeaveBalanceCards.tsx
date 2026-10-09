import React from 'react';
import { LeaveBalance, LeaveType } from '../../types';
import { Palmtree, Thermometer, Coffee, Baby } from 'lucide-react';

interface LeaveBalanceCardsProps {
  leaveBalances: LeaveBalance[];
  leaveTypes: LeaveType[];
  onApplyClick?: (leaveTypeId?: string) => void;
}

export const LeaveBalanceCards: React.FC<LeaveBalanceCardsProps> = ({
  leaveBalances,
  leaveTypes,
  onApplyClick,
}) => {
  const getIcon = (code: string) => {
    switch (code) {
      case 'AL':
        return <Palmtree size={20} color="#10b981" />;
      case 'SL':
        return <Thermometer size={20} color="#f59e0b" />;
      case 'CL':
        return <Coffee size={20} color="#38bdf8" />;
      case 'PL':
        return <Baby size={20} color="#c084fc" />;
      default:
        return <Palmtree size={20} color="#6366f1" />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>
            Annual Leave Balances & Entitlements (FY 2026)
          </h3>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
            Available quotas, carry-forward days, and pending approval allocations.
          </p>
        </div>

        {onApplyClick && (
          <button
            onClick={() => onApplyClick()}
            style={{
              padding: '8px 18px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--brand-primary)',
              color: '#ffffff',
              border: 'none',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Apply for Leave
          </button>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {leaveTypes.map((type) => {
          const balance = leaveBalances.find((b) => b.leaveTypeId === type.id) || {
            allocatedDays: type.defaultDaysPerYear,
            usedDays: 0,
            pendingDays: 0,
            availableDays: type.defaultDaysPerYear,
          };

          const usagePercent = Math.min(
            100,
            Math.round(((balance.usedDays + balance.pendingDays) / (balance.allocatedDays || 1)) * 100)
          );

          return (
            <div
              key={type.id}
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '14px',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        padding: '10px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--bg-elevated)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {getIcon(type.code)}
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '15px', color: 'var(--text-primary)', fontWeight: 600 }}>
                        {type.name}
                      </h4>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Policy Code: {type.code}</span>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '24px', fontWeight: 700, color: '#10b981', fontFamily: 'var(--font-display)' }}>
                      {balance.availableDays}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}> left</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div style={{ marginTop: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Usage:</span>
                    <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>
                      {balance.usedDays} used / {balance.allocatedDays} total
                    </span>
                  </div>
                  <div
                    style={{
                      height: '6px',
                      backgroundColor: 'var(--bg-elevated)',
                      borderRadius: '999px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${usagePercent}%`,
                        backgroundColor: usagePercent > 80 ? '#ef4444' : 'var(--brand-primary)',
                        borderRadius: '999px',
                        transition: 'width 250ms ease',
                      }}
                    />
                  </div>
                </div>
              </div>

              <div
                style={{
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                }}
              >
                <span>Pending Approvals: <strong>{balance.pendingDays} days</strong></span>
                <span>{type.carryForwardAllowed ? `Carry fwd: ${type.maxCarryForwardDays}d` : 'No carry fwd'}</span>
              </div>

              {onApplyClick && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onApplyClick(type.id);
                  }}
                  style={{
                    padding: '7px 12px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'rgba(99, 102, 241, 0.12)',
                    color: 'var(--brand-primary)',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    width: '100%',
                    transition: 'all var(--transition-fast)',
                  }}
                >
                  Apply for {type.name} →
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
