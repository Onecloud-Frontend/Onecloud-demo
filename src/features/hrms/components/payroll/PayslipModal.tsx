import React from 'react';
import { X, Printer, Download, Send } from 'lucide-react';
import type { PaySlip } from '../../types/payroll';

interface PaySlipModalProps {
  slip: PaySlip | null;
  onClose: () => void;
  onDistribute?: (slipId: string) => void;
}

export const PaySlipModal: React.FC<PaySlipModalProps> = ({
  slip,
  onClose,
  onDistribute,
}) => {
  if (!slip) return null;

  return (
    <div
      className="payslip-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Modal Dialog with max-h-[92vh] to strictly prevent screen overflow */}
      <div className="payslip-modal-dialog">
        {/* Pinned Modal Header Bar */}
        <div className="payslip-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="payslip-badge-id">
              {slip.slipId}
            </span>
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
              Official Employee Pay Slip
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              onClick={() => window.print()}
              style={{
                padding: '6px',
                color: 'var(--text-secondary)',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                background: 'transparent',
                border: 'none',
              }}
              title="Print Pay Slip"
            >
              <Printer size={16} />
            </button>
            <button
              type="button"
              onClick={() =>
                alert(`Downloading PDF for ${slip.employeeName} (${slip.slipId})...`)
              }
              style={{
                padding: '6px',
                color: 'var(--text-secondary)',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                background: 'transparent',
                border: 'none',
              }}
              title="Download PDF"
            >
              <Download size={16} />
            </button>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '6px',
                color: 'var(--text-muted)',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                background: 'transparent',
                border: 'none',
                marginLeft: '4px',
              }}
              title="Close Modal"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content (strictly inside viewport) */}
        <div className="payslip-modal-body">
          {/* Company Branding & Title */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              paddingBottom: '16px',
              borderBottom: '1px solid var(--border-subtle)',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--brand-gradient)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '13px',
                    color: '#ffffff',
                  }}
                >
                  O
                </div>
                <span
                  style={{
                    fontSize: '16px',
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  ONEENTERPRISE <span style={{ color: 'var(--brand-primary)', fontWeight: 600 }}>CLOUD</span>
                </span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                OneEnterprise Cloud Technologies Pvt Ltd<br />
                Financial District, Gachibowli, Hyderabad, Telangana 500032
              </p>
            </div>

            <div style={{ textAlign: 'right' }}>
              <h2
                style={{
                  fontSize: '18px',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  letterSpacing: '0.04em',
                  fontFamily: 'var(--font-display)',
                }}
              >
                PAY SLIP
              </h2>
              <p
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--brand-primary)',
                  marginTop: '2px',
                }}
              >
                {slip.payPeriod}
              </p>
              <p
                style={{
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                  marginTop: '2px',
                }}
              >
                Disbursed: {slip.paymentDate}
              </p>
            </div>
          </div>

          {/* Employee Metadata Grid */}
          <div className="payslip-meta-grid">
            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>Employee Name</span>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                {slip.employeeName}
              </div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>Employee ID</span>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginTop: '2px',
                }}
              >
                {slip.employeeId}
              </div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>Designation</span>
              <div style={{ color: 'var(--text-secondary)', marginTop: '2px', fontWeight: 500 }}>
                {slip.designation}
              </div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>Department</span>
              <div style={{ color: 'var(--text-secondary)', marginTop: '2px', fontWeight: 500 }}>
                {slip.department}
              </div>
            </div>

            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>PAN Number</span>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  marginTop: '2px',
                }}
              >
                {slip.panNumber}
              </div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>PF UAN Number</span>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  marginTop: '2px',
                }}
              >
                {slip.pfUan}
              </div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>Bank Account</span>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  marginTop: '2px',
                }}
              >
                {slip.bankAccount}
              </div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>Working Days</span>
              <div style={{ fontWeight: 600, color: 'var(--text-secondary)', marginTop: '2px' }}>
                {slip.daysWorked} Days
              </div>
            </div>
          </div>

          {/* Earnings vs Deductions Table */}
          <div className="payslip-calc-grid">
            {/* EARNINGS */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="payslip-calc-header">
                <span>EARNINGS</span>
                <span>AMOUNT (INR)</span>
              </div>
              <div className="payslip-calc-body">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Basic Salary</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                    ₹{slip.earnings.basicSalary.toLocaleString()}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>House Rent Allowance (HRA)</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                    ₹{slip.earnings.houseRentAllowance.toLocaleString()}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Special Allowance</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                    ₹{slip.earnings.specialAllowance.toLocaleString()}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Conveyance Allowance</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                    ₹{slip.earnings.conveyanceAllowance.toLocaleString()}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Medical Allowance</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                    ₹{slip.earnings.medicalAllowance.toLocaleString()}
                  </span>
                </div>
                {slip.earnings.performanceBonus > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Performance Incentive</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                      ₹{slip.earnings.performanceBonus.toLocaleString()}
                    </span>
                  </div>
                )}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingTop: '10px',
                    marginTop: '4px',
                    borderTop: '1px solid var(--border-subtle)',
                    fontWeight: 700,
                  }}
                >
                  <span style={{ color: 'var(--text-primary)' }}>Total Gross Earnings</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--status-success)' }}>
                    ₹{slip.earnings.grossSalary.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* DEDUCTIONS */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="payslip-calc-header">
                <span>DEDUCTIONS</span>
                <span>AMOUNT (INR)</span>
              </div>
              <div className="payslip-calc-body">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Employee Provident Fund (EPF)</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--status-danger)', fontWeight: 600 }}>
                    -₹{slip.deductions.providentFund.toLocaleString()}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Professional Tax (PT)</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--status-danger)', fontWeight: 600 }}>
                    -₹{slip.deductions.professionalTax.toLocaleString()}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Tax Deducted at Source (TDS)</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--status-danger)', fontWeight: 600 }}>
                    -₹{slip.deductions.taxDeductedAtSource.toLocaleString()}
                  </span>
                </div>
                {slip.deductions.healthAndEducationCess > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Health &amp; Education Cess</span>
                    <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--status-danger)', fontWeight: 600 }}>
                      -₹{slip.deductions.healthAndEducationCess.toLocaleString()}
                    </span>
                  </div>
                )}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingTop: '10px',
                    marginTop: '4px',
                    borderTop: '1px solid var(--border-subtle)',
                    fontWeight: 700,
                  }}
                >
                  <span style={{ color: 'var(--text-primary)' }}>Total Deductions</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--status-danger)' }}>
                    -₹{slip.deductions.totalDeductions.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* NET PAYABLE BOX */}
          <div className="payslip-net-box">
            <div>
              <span
                style={{
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--team-b-accent)',
                  fontWeight: 700,
                }}
              >
                NET PAYABLE IN-HAND (ROUNDED)
              </span>
              <p
                style={{
                  fontSize: '12px',
                  fontStyle: 'italic',
                  color: 'var(--text-secondary)',
                  marginTop: '3px',
                }}
              >
                &ldquo;{slip.netPayInWords}&rdquo;
              </p>
            </div>
            <div
              style={{
                fontSize: '24px',
                fontWeight: 700,
                color: 'var(--team-b-accent)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              ₹{slip.netPay.toLocaleString()}
            </div>
          </div>

          <p
            style={{
              textAlign: 'center',
              fontSize: '11px',
              color: 'var(--text-muted)',
              marginTop: '4px',
            }}
          >
            This is a system generated pay slip authorized by OneEnterprise HRMS and does not require physical signature.
          </p>
        </div>

        {/* Pinned Modal Actions Footer */}
        <div className="payslip-modal-footer">
          <button
            type="button"
            onClick={() => {
              onDistribute?.(slip.slipId);
              alert(`Pay Slip dispatched to ${slip.employeeName}'s official work email!`);
            }}
            className="payroll-btn-run"
          >
            <Send size={13} />
            <span>Email Pay Slip to Employee</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="payroll-btn-batch"
            style={{ padding: '8px 18px', fontWeight: 600 }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
