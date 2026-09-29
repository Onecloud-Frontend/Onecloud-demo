import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'team-a' | 'team-b' | 'team-c' | 'core' | 'shared' | 'app' | 'success' | 'warning' | 'neutral';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
}) => {
  const stylesByVariant: Record<string, { bg: string; text: string; border: string }> = {
    'team-a': { bg: 'var(--team-a-bg)', text: 'var(--team-a-accent)', border: 'var(--team-a-border)' },
    'team-b': { bg: 'var(--team-b-bg)', text: 'var(--team-b-accent)', border: 'var(--team-b-border)' },
    'team-c': { bg: 'var(--team-c-bg)', text: 'var(--team-c-accent)', border: 'var(--team-c-border)' },
    core: { bg: 'rgba(99, 102, 241, 0.14)', text: '#818cf8', border: 'rgba(99, 102, 241, 0.35)' },
    shared: { bg: 'rgba(234, 179, 8, 0.14)', text: '#facc15', border: 'rgba(234, 179, 8, 0.35)' },
    app: { bg: 'rgba(244, 63, 94, 0.14)', text: '#fb7185', border: 'rgba(244, 63, 94, 0.35)' },
    success: { bg: 'rgba(16, 185, 129, 0.14)', text: '#34d399', border: 'rgba(16, 185, 129, 0.3)' },
    warning: { bg: 'rgba(245, 158, 11, 0.14)', text: '#fbbf24', border: 'rgba(245, 158, 11, 0.3)' },
    neutral: { bg: 'var(--bg-elevated)', text: 'var(--text-secondary)', border: 'var(--border-subtle)' },
  };

  const current = stylesByVariant[variant] || stylesByVariant.neutral;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        padding: size === 'sm' ? '2px 8px' : '4px 11px',
        fontSize: size === 'sm' ? '11px' : '12px',
        fontWeight: 600,
        borderRadius: 'var(--radius-full)',
        backgroundColor: current.bg,
        color: current.text,
        border: `1px solid ${current.border}`,
        letterSpacing: '0.02em',
      }}
    >
      {children}
    </span>
  );
};
