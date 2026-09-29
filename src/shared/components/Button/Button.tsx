import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'team-a' | 'team-b' | 'team-c';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  style,
  ...props
}) => {
  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontWeight: 500,
    borderRadius: 'var(--radius-md)',
    transition: 'all var(--transition-fast)',
    cursor: props.disabled ? 'not-allowed' : 'pointer',
    opacity: props.disabled ? 0.6 : 1,
    border: '1px solid transparent',
  };

  const sizeStyles: Record<'sm' | 'md' | 'lg', React.CSSProperties> = {
    sm: { padding: '6px 12px', fontSize: '13px' },
    md: { padding: '9px 18px', fontSize: '14px' },
    lg: { padding: '12px 24px', fontSize: '15px' },
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: 'var(--brand-primary)',
      color: '#ffffff',
      boxShadow: '0 2px 8px rgba(99, 102, 241, 0.3)',
    },
    secondary: {
      backgroundColor: 'var(--bg-elevated)',
      color: 'var(--text-primary)',
      borderColor: 'var(--border-subtle)',
    },
    outline: {
      backgroundColor: 'transparent',
      color: 'var(--text-primary)',
      borderColor: 'var(--border-hover)',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--text-secondary)',
    },
    'team-a': {
      backgroundColor: 'var(--team-a-bg)',
      color: 'var(--team-a-accent)',
      borderColor: 'var(--team-a-border)',
    },
    'team-b': {
      backgroundColor: 'var(--team-b-bg)',
      color: 'var(--team-b-accent)',
      borderColor: 'var(--team-b-border)',
    },
    'team-c': {
      backgroundColor: 'var(--team-c-bg)',
      color: 'var(--team-c-accent)',
      borderColor: 'var(--team-c-border)',
    },
  };

  return (
    <button
      style={{
        ...baseStyles,
        ...sizeStyles[size],
        ...variantStyles[variant],
        ...style
      }}
      className={className}
      {...props}
    >
      {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      {children}
    </button>
  );
};
