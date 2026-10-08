import React from 'react';
import { Button } from '@shared/components';
import { Eye, FileText, CheckCircle, Sparkles } from 'lucide-react';
import type { MockRecruitmentCandidate } from '@mock/hrms/commonHrmsMockApi';

export interface CandidatePipelineCardProps {
  candidate: MockRecruitmentCandidate;
  onReview: () => void;
  onNextStage: () => void;
  nextStageLabel: string;
  onReject: () => void;
  onProcessApplication?: () => void;
}

export const CandidatePipelineCard: React.FC<CandidatePipelineCardProps> = ({
  candidate,
  onReview,
  onNextStage,
  nextStageLabel,
  onReject,
  onProcessApplication,
}) => {
  const isNew = candidate.status === 'NEW';
  const isApplied = candidate.status === 'APPLIED';

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-card)',
        border: isNew ? '1.5px solid var(--team-c-accent)' : '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        padding: '14px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        transition: 'all var(--transition-fast)',
        boxShadow: isNew ? '0 4px 14px rgba(168, 85, 247, 0.2)' : '0 2px 8px rgba(0, 0, 0, 0.15)',
        position: 'relative',
      }}
    >
      {/* Top Tag for New Applicants */}
      {isNew && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '3px 8px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'rgba(168, 85, 247, 0.15)',
            color: 'var(--team-c-accent)',
            fontSize: '11px',
            fontWeight: 700,
            marginBottom: '2px',
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Sparkles size={12} /> NEW APPLICATION
          </span>
          <span style={{ fontSize: '10.5px', fontWeight: 500, color: 'var(--text-muted)' }}>
            Requires Processing
          </span>
        </div>
      )}

      {isApplied && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '2px 8px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'rgba(59, 130, 246, 0.12)',
            color: 'var(--brand-primary)',
            fontSize: '10.5px',
            fontWeight: 600,
          }}
        >
          <span>✓ APPLIED & VERIFIED</span>
          <span style={{ color: 'var(--text-muted)' }}>Ready for Screening</span>
        </div>
      )}

      {/* Candidate Name & Experience Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-primary)' }}>
            {candidate.firstName} {candidate.lastName}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--team-c-accent)', marginTop: '2px' }}>
            {candidate.appliedRole}
          </div>
        </div>
        <span
          style={{
            fontSize: '11px',
            padding: '2px 6px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--bg-elevated)',
            color: 'var(--text-muted)',
          }}
        >
          {candidate.totalExperienceYears}y exp
        </span>
      </div>

      <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
        🏢 {candidate.currentCompany || 'Independent'}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: 'var(--text-muted)' }}>
        <span>🏷️ {candidate.source}</span>
        <span>{candidate.appliedDate}</span>
      </div>

      {/* Resume badge snippet if available */}
      {candidate.resumeSummary?.fileName && (
        <div
          style={{
            fontSize: '11.5px',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            padding: '4px 8px',
            backgroundColor: 'var(--bg-elevated)',
            borderRadius: 'var(--radius-sm)',
          }}
        >
          <FileText size={12} style={{ color: 'var(--team-c-accent)' }} />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '200px' }}>
            {candidate.resumeSummary.fileName}
          </span>
        </div>
      )}

      {/* Action Row */}
      <div
        style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '8px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '6px',
          flexWrap: 'wrap',
        }}
      >
        {/* VIEW Button: Prominently displayed */}
        <button
          onClick={onReview}
          style={{
            fontSize: '12px',
            color: 'var(--team-c-accent)',
            backgroundColor: 'rgba(168, 85, 247, 0.1)',
            border: '1px solid rgba(168, 85, 247, 0.25)',
            borderRadius: 'var(--radius-sm)',
            padding: '4px 10px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            cursor: 'pointer',
          }}
        >
          <Eye size={13} />
          View
        </button>

        <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          <button
            onClick={onReject}
            style={{
              padding: '4px 6px',
              fontSize: '11px',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--status-danger)',
              backgroundColor: 'rgba(239, 68, 68, 0.08)',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Reject
          </button>

          {/* If NEW: Process Application button */}
          {isNew && onProcessApplication ? (
            <Button
              variant="primary"
              size="sm"
              icon={<CheckCircle size={12} />}
              onClick={onProcessApplication}
              style={{ padding: '4px 10px', fontSize: '11px' }}
            >
              Process
            </Button>
          ) : (
            <Button
              variant="team-c"
              size="sm"
              onClick={onNextStage}
              style={{ padding: '4px 8px', fontSize: '11px' }}
            >
              {nextStageLabel} →
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
