import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  badge?: React.ReactNode;
  action?: React.ReactNode;
  footer?: React.ReactNode;
  accent?: 'none' | 'team-a' | 'team-b' | 'team-c' | 'brand';
  style?: React.CSSProperties;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  badge,
  action,
  footer,
  accent = 'none',
  style,
  className = '',
}) => {
  const accentBorderColors: Record<string, string> = {
    none: 'var(--border-subtle)',
    brand: 'rgba(99, 102, 241, 0.4)',
    'team-a': 'var(--team-a-border)',
    'team-b': 'var(--team-b-border)',
    'team-c': 'var(--team-c-border)',
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: 'var(--bg-card)',
    border: `1px solid ${accentBorderColors[accent]}`,
    borderRadius: 'var(--radius-lg)',
    padding: '22px',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
    ...style,
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: title || subtitle ? '16px' : 0,
    gap: '12px',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '17px',
    fontWeight: 600,
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-display)',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: '13px',
    color: 'var(--text-secondary)',
    marginTop: '4px',
  };

  const footerStyle: React.CSSProperties = {
    marginTop: '20px',
    paddingTop: '14px',
    borderTop: '1px solid var(--border-subtle)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  return (
    <div style={cardStyle} className={className}>
      {(title || subtitle || action || badge) && (
        <div style={headerStyle}>
          <div>
            {title && (
              <div style={titleStyle}>
                {title}
                {badge}
              </div>
            )}
            {subtitle && <div style={subtitleStyle}>{subtitle}</div>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div style={{ flex: 1 }}>{children}</div>
      {footer && <div style={footerStyle}>{footer}</div>}
    </div>
  );
};
