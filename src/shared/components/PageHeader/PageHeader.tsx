import React from 'react';

export interface PageHeaderProps {
  title: string;
  description?: string;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
  breadcrumb?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  badge,
  actions,
  breadcrumb,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: '16px',
        paddingBottom: '24px',
        marginBottom: '28px',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <div>
        {breadcrumb && (
          <div
            style={{
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--text-muted)',
              marginBottom: '6px',
              fontWeight: 600,
            }}
          >
            {breadcrumb}
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h1
            style={{
              fontSize: '26px',
              fontWeight: 700,
              fontFamily: 'var(--font-display)',
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
            }}
          >
            {title}
          </h1>
          {badge}
        </div>
        {description && (
          <p
            style={{
              fontSize: '14px',
              color: 'var(--text-secondary)',
              marginTop: '6px',
              maxWidth: '750px',
            }}
          >
            {description}
          </p>
        )}
      </div>

      {actions && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {actions}
        </div>
      )}
    </div>
  );
};
