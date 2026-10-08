import React from 'react';

interface HrmsMetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive?: boolean;
    neutral?: boolean;
  };
  accentColor?: string;
  onClick?: () => void;
}

export const HrmsMetricCard: React.FC<HrmsMetricCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  accentColor = '#6366f1',
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease',
        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.2)',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.borderColor = accentColor;
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = 'none';
          e.currentTarget.style.borderColor = 'var(--border-subtle)';
        }
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <span
            style={{
              fontSize: '12px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--text-muted)',
            }}
          >
            {title}
          </span>
          <div
            style={{
              fontSize: '28px',
              fontWeight: 700,
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-display)',
              marginTop: '6px',
            }}
          >
            {value}
          </div>
        </div>

        <div
          style={{
            padding: '10px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: `${accentColor}18`,
            color: accentColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </div>
      </div>

      {(subtitle || trend) && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '14px',
            paddingTop: '10px',
            borderTop: '1px solid var(--border-subtle)',
            fontSize: '12px',
          }}
        >
          {trend && (
            <span
              style={{
                fontWeight: 600,
                color: trend.neutral ? 'var(--text-secondary)' : trend.isPositive ? '#10b981' : '#ef4444',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '2px',
              }}
            >
              {trend.isPositive ? '↑' : trend.neutral ? '•' : '↓'} {trend.value}
            </span>
          )}
          {subtitle && <span style={{ color: 'var(--text-secondary)' }}>{subtitle}</span>}
        </div>
      )}
    </div>
  );
};
