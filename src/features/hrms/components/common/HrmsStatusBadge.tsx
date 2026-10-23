import React from 'react';

export type HrmsStatusType =
  | 'ACTIVE'
  | 'INACTIVE'
  | 'PROBATION'
  | 'NOTICE_PERIOD'
  | 'TERMINATED'
  | 'ON_LEAVE'
  | 'PRESENT'
  | 'ABSENT'
  | 'HALF_DAY'
  | 'PENDING'
  | 'APPROVED'
  | 'REJECTED'
  | 'CANCELLED'
  | 'DRAFT'
  | 'PROCESSING'
  | 'COMPLETED'
  | 'LOCKED'
  | 'OPEN'
  | 'FILLED'
  | 'PUBLISHED'
  | 'NEW'
  | 'SCREENING'
  | 'INTERVIEWING'
  | 'OFFERED'
  | 'HIRED'
  | 'AVAILABLE'
  | 'ASSIGNED'
  | 'UNDER_MAINTENANCE'
  | 'IN_PROGRESS'
  | 'RESOLVED'
  | 'VERIFIED'
  | 'PENDING_VERIFICATION'
  | string;

interface StatusConfig {
  label: string;
  color: string;
  bg: string;
  border: string;
}

const STATUS_MAP: Record<string, StatusConfig> = {
  ACTIVE: { label: 'Active', color: '#10b981', bg: 'rgba(16, 185, 129, 0.12)', border: 'rgba(16, 185, 129, 0.3)' },
  APPROVED: { label: 'Approved', color: '#10b981', bg: 'rgba(16, 185, 129, 0.12)', border: 'rgba(16, 185, 129, 0.3)' },
  PRESENT: { label: 'Present', color: '#10b981', bg: 'rgba(16, 185, 129, 0.12)', border: 'rgba(16, 185, 129, 0.3)' },
  COMPLETED: { label: 'Completed', color: '#10b981', bg: 'rgba(16, 185, 129, 0.12)', border: 'rgba(16, 185, 129, 0.3)' },
  HIRED: { label: 'Hired', color: '#10b981', bg: 'rgba(16, 185, 129, 0.12)', border: 'rgba(16, 185, 129, 0.3)' },
  VERIFIED: { label: 'Verified', color: '#10b981', bg: 'rgba(16, 185, 129, 0.12)', border: 'rgba(16, 185, 129, 0.3)' },
  RESOLVED: { label: 'Resolved', color: '#10b981', bg: 'rgba(16, 185, 129, 0.12)', border: 'rgba(16, 185, 129, 0.3)' },
  AVAILABLE: { label: 'Available', color: '#10b981', bg: 'rgba(16, 185, 129, 0.12)', border: 'rgba(16, 185, 129, 0.3)' },
  PUBLISHED: { label: 'Published', color: '#10b981', bg: 'rgba(16, 185, 129, 0.12)', border: 'rgba(16, 185, 129, 0.3)' },

  PENDING: { label: 'Pending Review', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.12)', border: 'rgba(245, 158, 11, 0.3)' },
  PENDING_VERIFICATION: { label: 'Pending Verification', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.12)', border: 'rgba(245, 158, 11, 0.3)' },
  IN_PROGRESS: { label: 'In Progress', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.12)', border: 'rgba(56, 189, 248, 0.3)' },
  IN_REVIEW: { label: 'In Review', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.12)', border: 'rgba(56, 189, 248, 0.3)' },
  PROCESSING: { label: 'Processing', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.12)', border: 'rgba(56, 189, 248, 0.3)' },
  INTERVIEWING: { label: 'Interviewing', color: '#818cf8', bg: 'rgba(129, 140, 248, 0.12)', border: 'rgba(129, 140, 248, 0.3)' },
  OFFERED: { label: 'Offer Extended', color: '#c084fc', bg: 'rgba(192, 132, 252, 0.12)', border: 'rgba(192, 132, 252, 0.3)' },
  PROBATION: { label: 'Probation', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.12)', border: 'rgba(245, 158, 11, 0.3)' },
  HALF_DAY: { label: 'Half Day', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.12)', border: 'rgba(245, 158, 11, 0.3)' },
  ON_LEAVE: { label: 'On Leave', color: '#fb923c', bg: 'rgba(251, 146, 60, 0.12)', border: 'rgba(251, 146, 60, 0.3)' },
  ASSIGNED: { label: 'Assigned', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.12)', border: 'rgba(56, 189, 248, 0.3)' },
  UNDER_MAINTENANCE: { label: 'Maintenance', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.12)', border: 'rgba(245, 158, 11, 0.3)' },

  REJECTED: { label: 'Rejected', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.12)', border: 'rgba(239, 68, 68, 0.3)' },
  ABSENT: { label: 'Absent', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.12)', border: 'rgba(239, 68, 68, 0.3)' },
  TERMINATED: { label: 'Terminated', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.12)', border: 'rgba(239, 68, 68, 0.3)' },
  CANCELLED: { label: 'Cancelled', color: '#94a3b8', bg: 'rgba(148, 163, 184, 0.12)', border: 'rgba(148, 163, 184, 0.25)' },
  DRAFT: { label: 'Draft', color: '#94a3b8', bg: 'rgba(148, 163, 184, 0.12)', border: 'rgba(148, 163, 184, 0.25)' },
  OPEN: { label: 'Open', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.12)', border: 'rgba(56, 189, 248, 0.3)' },
  FILLED: { label: 'Filled', color: '#10b981', bg: 'rgba(16, 185, 129, 0.12)', border: 'rgba(16, 185, 129, 0.3)' },
  LOCKED: { label: 'Locked / Closed', color: '#64748b', bg: 'rgba(100, 116, 139, 0.12)', border: 'rgba(100, 116, 139, 0.25)' },
  SCREENING: { label: 'Screening', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.12)', border: 'rgba(245, 158, 11, 0.3)' },
  NEW: { label: 'New Applicant', color: '#818cf8', bg: 'rgba(129, 140, 248, 0.12)', border: 'rgba(129, 140, 248, 0.3)' },
};

export const HrmsStatusBadge: React.FC<{ status: HrmsStatusType; customLabel?: string; size?: 'sm' | 'md' }> = ({
  status,
  customLabel,
  size = 'md',
}) => {
  const normalized = (status || '').toUpperCase();
  const config = STATUS_MAP[normalized] || {
    label: customLabel || status,
    color: '#94a3b8',
    bg: 'rgba(148, 163, 184, 0.12)',
    border: 'rgba(148, 163, 184, 0.25)',
  };

  const isSmall = size === 'sm';

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: isSmall ? '2px 8px' : '3px 10px',
        fontSize: isSmall ? '11px' : '12px',
        fontWeight: 600,
        borderRadius: '9999px',
        color: config.color,
        backgroundColor: config.bg,
        border: `1px solid ${config.border}`,
        whiteSpace: 'nowrap',
        letterSpacing: '0.01em',
      }}
    >
      <span
        style={{
          width: isSmall ? '5px' : '6px',
          height: isSmall ? '5px' : '6px',
          borderRadius: '50%',
          backgroundColor: config.color,
          boxShadow: `0 0 6px ${config.color}`,
        }}
      />
      {customLabel || config.label}
    </span>
  );
};
