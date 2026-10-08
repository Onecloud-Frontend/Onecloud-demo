import React from 'react';
import { EmploymentStatus, EmploymentType } from '../../types';
import { CheckCircle2, Clock, Hourglass, PauseCircle, XCircle, AlertCircle } from 'lucide-react';

interface EmployeeStatusBadgeProps {
  status: EmploymentStatus;
  size?: 'sm' | 'md';
}

export const EmployeeStatusBadge: React.FC<EmployeeStatusBadgeProps> = ({ status, size = 'sm' }) => {
  const statusConfig: Record<
    EmploymentStatus,
    { label: string; bg: string; text: string; border: string; icon: React.ReactNode }
  > = {
    ACTIVE: {
      label: 'Active',
      bg: 'rgba(16, 185, 129, 0.12)',
      text: '#34d399',
      border: 'rgba(16, 185, 129, 0.3)',
      icon: <CheckCircle2 size={12} />,
    },
    PROBATION: {
      label: 'Probation',
      bg: 'rgba(245, 158, 11, 0.12)',
      text: '#fbbf24',
      border: 'rgba(245, 158, 11, 0.3)',
      icon: <Clock size={12} />,
    },
    NOTICE_PERIOD: {
      label: 'Notice Period',
      bg: 'rgba(249, 115, 22, 0.12)',
      text: '#fb923c',
      border: 'rgba(249, 115, 22, 0.3)',
      icon: <Hourglass size={12} />,
    },
    ON_LEAVE: {
      label: 'On Leave',
      bg: 'rgba(56, 189, 248, 0.12)',
      text: '#38bdf8',
      border: 'rgba(56, 189, 248, 0.3)',
      icon: <PauseCircle size={12} />,
    },
    INACTIVE: {
      label: 'Inactive',
      bg: 'rgba(148, 163, 184, 0.12)',
      text: '#94a3b8',
      border: 'rgba(148, 163, 184, 0.25)',
      icon: <AlertCircle size={12} />,
    },
    TERMINATED: {
      label: 'Terminated',
      bg: 'rgba(239, 68, 68, 0.12)',
      text: '#f87171',
      border: 'rgba(239, 68, 68, 0.3)',
      icon: <XCircle size={12} />,
    },
  };

  const config = statusConfig[status] || statusConfig.INACTIVE;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        padding: size === 'sm' ? '3px 8px' : '4px 10px',
        fontSize: size === 'sm' ? '11px' : '12px',
        fontWeight: 600,
        borderRadius: 'var(--radius-full)',
        backgroundColor: config.bg,
        color: config.text,
        border: `1px solid ${config.border}`,
        letterSpacing: '0.02em',
        whiteSpace: 'nowrap',
      }}
    >
      {config.icon}
      {config.label}
    </span>
  );
};

interface EmploymentTypeBadgeProps {
  type: EmploymentType;
  size?: 'sm' | 'md';
}

export const EmploymentTypeBadge: React.FC<EmploymentTypeBadgeProps> = ({ type, size = 'sm' }) => {
  const typeConfig: Record<EmploymentType, { label: string; bg: string; text: string; border: string }> = {
    FULL_TIME: {
      label: 'Full-Time',
      bg: 'rgba(99, 102, 241, 0.12)',
      text: '#a5b4fc',
      border: 'rgba(99, 102, 241, 0.25)',
    },
    PART_TIME: {
      label: 'Part-Time',
      bg: 'rgba(168, 85, 247, 0.12)',
      text: '#c084fc',
      border: 'rgba(168, 85, 247, 0.25)',
    },
    CONTRACT: {
      label: 'Contract',
      bg: 'rgba(234, 179, 8, 0.12)',
      text: '#facc15',
      border: 'rgba(234, 179, 8, 0.25)',
    },
    INTERN: {
      label: 'Intern',
      bg: 'rgba(20, 184, 166, 0.12)',
      text: '#2dd4bf',
      border: 'rgba(20, 184, 166, 0.25)',
    },
  };

  const config = typeConfig[type] || typeConfig.FULL_TIME;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: size === 'sm' ? '2px 7px' : '3px 9px',
        fontSize: size === 'sm' ? '11px' : '12px',
        fontWeight: 500,
        borderRadius: 'var(--radius-sm)',
        backgroundColor: config.bg,
        color: config.text,
        border: `1px solid ${config.border}`,
        whiteSpace: 'nowrap',
      }}
    >
      {config.label}
    </span>
  );
};
