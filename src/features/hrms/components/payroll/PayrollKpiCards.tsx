import React from 'react';
import { DollarSign, CheckCircle2, AlertTriangle, Ban } from 'lucide-react';
import type { PayrollMetrics } from '../../types/payroll';

interface PayrollKpiCardsProps {
  metrics: PayrollMetrics;
}

export const PayrollKpiCards: React.FC<PayrollKpiCardsProps> = ({ metrics }) => {
  const cards = [
    {
      title: 'Total Payroll',
      value: `₹${metrics.totalMonthlyPayroll.toLocaleString()}`,
      subtext: `↑ ${metrics.payrollGrowthPercentage}% vs last month`,
      subtextColor: 'var(--status-success)',
      icon: <DollarSign size={18} />,
      iconVariant: 'brand',
      borderColorHover: 'rgba(99, 102, 241, 0.35)',
    },
    {
      title: 'Active on Payroll',
      value: metrics.activeEmployeesCount.toLocaleString(),
      subtext: `${metrics.disbursementRatePercentage}% disbursement rate`,
      subtextColor: 'var(--text-secondary)',
      icon: <CheckCircle2 size={18} />,
      iconVariant: 'success',
      borderColorHover: 'rgba(16, 185, 129, 0.35)',
    },
    {
      title: 'Pending Reviews',
      value: metrics.pendingReviewsCount.toString(),
      subtext: `Within next ${metrics.pendingDaysNotice} business days`,
      subtextColor: 'var(--text-secondary)',
      icon: <AlertTriangle size={18} />,
      iconVariant: 'warning',
      borderColorHover: 'rgba(245, 158, 11, 0.35)',
    },
    {
      title: 'Statutory Holds',
      value: metrics.statutoryHoldsCount.toString(),
      subtext: metrics.statutoryNoticeText,
      subtextColor: 'var(--text-secondary)',
      icon: <Ban size={18} />,
      iconVariant: 'danger',
      borderColorHover: 'rgba(239, 68, 68, 0.35)',
    },
  ];

  return (
    <div className="payroll-kpi-grid">
      {cards.map((c) => (
        <div
          key={c.title}
          className="payroll-kpi-card"
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = c.borderColorHover;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-subtle)';
          }}
        >
          <div className="payroll-kpi-header">
            <span className="payroll-kpi-title">{c.title}</span>
            <div className={`payroll-kpi-icon-wrapper ${c.iconVariant}`}>
              {c.icon}
            </div>
          </div>

          <div>
            <div className="payroll-kpi-value">{c.value}</div>
            <div className="payroll-kpi-subtext" style={{ color: c.subtextColor }}>
              {c.subtext}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
