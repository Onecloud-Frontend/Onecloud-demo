import React from 'react';
import { Badge } from '@shared/components';
import type { BadgeProps } from '@shared/components/Badge/Badge';
import type { RequisitionStatus, CandidateStatus, OfferStatus } from '@features/hrms/types';

export const RequisitionStatusBadge: React.FC<{ status: RequisitionStatus }> = ({ status }) => {
  const map: Record<RequisitionStatus, { variant: BadgeProps['variant']; label: string }> = {
    DRAFT: { variant: 'neutral', label: 'Draft' },
    PENDING_APPROVAL: { variant: 'warning', label: 'Pending Approval' },
    APPROVED: { variant: 'team-a', label: 'Approved' },
    OPEN: { variant: 'success', label: 'Open' },
    ON_HOLD: { variant: 'warning', label: 'On Hold' },
    FILLED: { variant: 'team-b', label: 'Filled' },
    CANCELLED: { variant: 'neutral', label: 'Cancelled' },
    REJECTED: { variant: 'neutral', label: 'Rejected' },
  };
  const current = map[status] || { variant: 'neutral', label: status };
  return (
    <Badge variant={current.variant} size="sm">
      {current.label}
    </Badge>
  );
};

export const CandidateStatusBadge: React.FC<{ status: CandidateStatus }> = ({ status }) => {
  const map: Record<CandidateStatus, { variant: BadgeProps['variant']; label: string }> = {
    NEW: { variant: 'neutral', label: 'New' },
    APPLIED: { variant: 'team-c', label: 'Applied' },
    SCREENING: { variant: 'warning', label: 'Screening' },
    INTERVIEWING: { variant: 'team-c', label: 'Interviewing' },
    OFFERED: { variant: 'team-b', label: 'Offered' },
    HIRED: { variant: 'success', label: 'Hired' },
    REJECTED: { variant: 'neutral', label: 'Rejected' },
  };
  const current = map[status] || { variant: 'neutral', label: status };
  return (
    <Badge variant={current.variant} size="sm">
      {current.label}
    </Badge>
  );
};

export const OfferStatusBadge: React.FC<{ status: OfferStatus }> = ({ status }) => {
  const map: Record<OfferStatus, { variant: BadgeProps['variant']; label: string }> = {
    DRAFT: { variant: 'neutral', label: 'Draft' },
    ISSUED: { variant: 'team-c', label: 'Issued' },
    ACCEPTED: { variant: 'success', label: 'Accepted' },
    DECLINED: { variant: 'neutral', label: 'Declined' },
    EXPIRED: { variant: 'warning', label: 'Expired' },
  };
  const current = map[status] || { variant: 'neutral', label: status };
  return (
    <Badge variant={current.variant} size="sm">
      {current.label}
    </Badge>
  );
};

export const ApprovalStep: React.FC<{
  number: string;
  label: string;
  sublabel: string;
  isCompleted: boolean;
  isActive: boolean;
}> = ({ number, label, sublabel, isCompleted, isActive }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div
        style={{
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          backgroundColor: isCompleted
            ? 'var(--status-success)'
            : isActive
            ? 'var(--team-c-accent)'
            : 'var(--bg-input)',
          color: isCompleted || isActive ? '#fff' : 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '11px',
          fontWeight: 700,
        }}
      >
        {isCompleted ? '✓' : number}
      </div>
      <div>
        <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>{label}</div>
        <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>{sublabel}</div>
      </div>
    </div>
  );
};

export const ModalBackdrop: React.FC<{ children: React.ReactNode; onClose: () => void }> = ({ children, onClose }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {children}
    </div>
  );
};
