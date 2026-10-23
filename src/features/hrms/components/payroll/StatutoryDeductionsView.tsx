import React from 'react';
import { ShieldCheck, Download } from 'lucide-react';

export const StatutoryDeductionsView: React.FC = () => {
  const complianceItems = [
    {
      code: 'EPF / EPS',
      name: 'Employees Provident Fund Scheme, 1952',
      contribution: '12% Employee + 12% Employer (3.67% EPF + 8.33% EPS)',
      dueDate: '15th of following month',
      status: 'Compliant · ECR Generated',
      lastChallan: 'TRRN-2849102847192',
      statusColor: 'var(--status-success)',
      statusBg: 'rgba(16, 185, 129, 0.12)',
      statusBorder: 'rgba(16, 185, 129, 0.3)',
    },
    {
      code: 'ESI',
      name: 'Employee State Insurance Act, 1948',
      contribution: '0.75% Employee + 3.25% Employer (for Gross <= ₹21,000)',
      dueDate: '15th of following month',
      status: 'Compliant · Zero Default',
      lastChallan: 'ESI-CH-9182049182',
      statusColor: 'var(--status-success)',
      statusBg: 'rgba(16, 185, 129, 0.12)',
      statusBorder: 'rgba(16, 185, 129, 0.3)',
    },
    {
      code: 'PROFESSIONAL TAX',
      name: 'State Professional Tax (PT)',
      contribution: '₹200 / month (slab-based state schedule)',
      dueDate: '10th of following month',
      status: 'Compliant · Filed',
      lastChallan: 'PT-TEL-102938472',
      statusColor: 'var(--status-success)',
      statusBg: 'rgba(16, 185, 129, 0.12)',
      statusBorder: 'rgba(16, 185, 129, 0.3)',
    },
    {
      code: 'TDS (SEC 192)',
      name: 'Income Tax Act 1961 - Salary Withholding',
      contribution: 'Calculated as per progressive tax brackets (New/Old Regime)',
      dueDate: '7th of following month (Form 24Q Quarterly)',
      status: 'Audited · 24Q Q2 Submitted',
      lastChallan: 'IT-CH-8271038291',
      statusColor: 'var(--status-success)',
      statusBg: 'rgba(16, 185, 129, 0.12)',
      statusBorder: 'rgba(16, 185, 129, 0.3)',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Overview Card */}
      <div className="statutory-banner">
        <div style={{ maxWidth: '650px' }}>
          <div className="statutory-badge">
            <ShieldCheck size={14} />
            <span>100% Statutory Compliant</span>
          </div>
          <h2 className="salary-struct-title">
            Statutory Deductions &amp; Tax Withholding Ledger
          </h2>
          <p className="salary-struct-desc">
            Automated compliance engine managing Provident Fund (EPF/EPS), ESI, Professional Tax, and Section 192 TDS withholdings.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            alert('Downloading Statutory Compliance Audit Pack (Form 24Q, ECR & Challans)...')
          }
          className="statutory-btn-download"
        >
          <Download size={14} />
          <span>Download Compliance Pack</span>
        </button>
      </div>

      {/* Compliance Table */}
      <div className="statutory-table-card">
        <div className="statutory-table-header">
          <h3 className="salary-card-title">
            Statutory Acts &amp; Challan Ledger
          </h3>
        </div>

        <div className="payroll-table-responsive">
          <table className="payroll-table">
            <thead className="payroll-table-head">
              <tr>
                <th className="payroll-table-th" style={{ paddingLeft: '24px' }}>ACT / STATUTORY CODE</th>
                <th className="payroll-table-th">CONTRIBUTION / RATE</th>
                <th className="payroll-table-th">DUE DATE</th>
                <th className="payroll-table-th">LAST CHALLAN REF</th>
                <th className="payroll-table-th action-col" style={{ paddingRight: '24px' }}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {complianceItems.map((item) => (
                <tr key={item.code} className="payroll-table-row">
                  <td className="payroll-table-td" style={{ paddingLeft: '24px' }}>
                    <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{item.code}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      {item.name}
                    </div>
                  </td>
                  <td className="payroll-table-td" style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
                    {item.contribution}
                  </td>
                  <td className="payroll-table-td" style={{ color: 'var(--text-muted)' }}>
                    {item.dueDate}
                  </td>
                  <td className="payroll-table-td" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--brand-primary)', fontWeight: 600 }}>
                    {item.lastChallan}
                  </td>
                  <td className="payroll-table-td action-col" style={{ paddingRight: '24px' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '11px',
                        fontWeight: 600,
                        backgroundColor: item.statusBg,
                        color: item.statusColor,
                        border: `1px solid ${item.statusBorder}`,
                      }}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
