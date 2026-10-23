import React, { useState } from 'react';
import { X, Play, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { PAY_PERIODS } from '@mock/hrms/payrollMockData';

interface RunPayrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (period: string) => Promise<void>;
}

export const RunPayrollModal: React.FC<RunPayrollModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState(PAY_PERIODS[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleRun = async () => {
    setIsLoading(true);
    await onConfirm(selectedPeriod);
    setIsLoading(false);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div
      className="run-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isLoading) onClose();
      }}
    >
      <div className="run-modal-dialog">
        <div className="run-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Play size={16} fill="currentColor" color="var(--brand-primary)" />
            <h3 style={{ fontSize: '15px', fontWeight: 700, fontFamily: 'var(--font-display)' }}>
              Execute Monthly Payroll Run
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            style={{
              padding: '4px',
              color: 'var(--text-muted)',
              borderRadius: 'var(--radius-sm)',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              background: 'transparent',
              border: 'none',
            }}
          >
            <X size={16} />
          </button>
        </div>

        <div className="run-modal-body">
          {isSuccess ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '24px 0',
                textAlign: 'center',
              }}
            >
              <CheckCircle2 size={48} className="run-success-icon" />
              <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Payroll Executed Successfully!
              </h4>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Disbursement batch queued for {selectedPeriod}.
              </p>
            </div>
          ) : (
            <>
              <p
                style={{
                  fontSize: '13px',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.5,
                }}
              >
                You are about to initiate automated salary disbursements for all eligible employees under the selected payroll cycle.
              </p>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: 'var(--text-muted)',
                    marginBottom: '6px',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.06em',
                  }}
                >
                  Select Pay Period
                </label>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="payroll-select"
                  style={{ width: '100%', padding: '9px 12px' }}
                >
                  {PAY_PERIODS.map((period) => (
                    <option key={period} value={period}>
                      {period}
                    </option>
                  ))}
                </select>
              </div>

              <div className="run-alert-box">
                <AlertCircle
                  size={16}
                  style={{ color: 'var(--brand-primary)', flexShrink: 0, marginTop: '2px' }}
                />
                <span>
                  Employees flagged <strong style={{ color: 'var(--text-primary)' }}>On Hold</strong> will be automatically excluded until statutory verification is cleared.
                </span>
              </div>

              <div className="run-modal-footer">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isLoading}
                  className="payroll-btn-batch"
                  style={{ padding: '8px 16px' }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleRun}
                  disabled={isLoading}
                  className="payroll-btn-run"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={14} style={{ animation: 'payroll-spin 1s linear infinite' }} />
                      <span>Processing Batch...</span>
                    </>
                  ) : (
                    <>
                      <Play size={14} fill="currentColor" />
                      <span>Confirm &amp; Disburse</span>
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
