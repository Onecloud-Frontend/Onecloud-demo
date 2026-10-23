import React from 'react';
import { Badge, Button } from '@shared/components';
import { X } from 'lucide-react';
import { CandidateStatusBadge, ModalBackdrop } from './RecruitmentBadges';
import type { MockRecruitmentCandidate } from '@mock/hrms/recruitmentMockApi';
import type { CandidateStatus } from '@features/hrms/types';

export interface ResumeReviewModalProps {
  candidate: MockRecruitmentCandidate | null;
  onClose: () => void;
  onMoveCandidateStage: (candidateId: string, nextStage: CandidateStatus) => void;
  onScheduleInterview: (candidate: MockRecruitmentCandidate) => void;
  onGenerateOffer: (candidate: MockRecruitmentCandidate) => void;
}

export const ResumeReviewModal: React.FC<ResumeReviewModalProps> = ({
  candidate,
  onClose,
  onMoveCandidateStage,
  onScheduleInterview,
  onGenerateOffer,
}) => {
  if (!candidate) return null;

  return (
    <ModalBackdrop onClose={onClose}>
      <div
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--team-c-border)',
          borderRadius: 'var(--radius-lg)',
          width: '740px',
          maxWidth: '94vw',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '24px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>
                {candidate.firstName} {candidate.lastName}
              </h3>
              <CandidateStatusBadge status={candidate.status} />
            </div>
            <div style={{ fontSize: '13.5px', color: 'var(--team-c-accent)', marginTop: '2px' }}>
              Applying for: {candidate.appliedRole} ({candidate.departmentName})
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Uploaded Resume File Banner */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            backgroundColor: 'rgba(168, 85, 247, 0.08)',
            border: '1px solid var(--team-c-border)',
            borderRadius: 'var(--radius-md)',
            marginBottom: '20px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '20px' }}>📄</span>
            <div>
              <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-primary)' }}>
                {candidate.resumeSummary?.fileName || `${candidate.firstName.toLowerCase()}_${candidate.lastName.toLowerCase()}_resume.pdf`}
              </div>
              <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                Verified Resume Document • Extracted with HRMS ATS Parser
              </div>
            </div>
          </div>
          <Badge variant="team-c" size="sm">
            Resume Parsed
          </Badge>
        </div>

        {/* Quick Contact & Source Bar */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            padding: '12px 16px',
            backgroundColor: 'var(--bg-elevated)',
            borderRadius: 'var(--radius-md)',
            fontSize: '13px',
            color: 'var(--text-secondary)',
            marginBottom: '20px',
          }}
        >
          <span>📧 {candidate.email}</span>
          <span>📞 {candidate.phone}</span>
          <span>🏢 Current: {candidate.currentCompany || 'Not disclosed'}</span>
          <span>⏳ {candidate.totalExperienceYears} Years Experience</span>
          <span>🏷️ Source: {candidate.source}</span>
        </div>

        {/* Resume Summary */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
            Professional Overview (From Resume)
          </h4>
          <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {candidate.resumeSummary.bio}
          </p>
        </div>

        {/* Education */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
            Education & Qualifications
          </h4>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            🎓 {candidate.resumeSummary.education}
          </div>
        </div>

        {/* Skills */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
            Core Competencies & Technical Skills (Extracted)
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {candidate.resumeSummary.skills.map((skill, i) => (
              <Badge key={i} variant="team-c" size="sm">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Highlights */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
            Key Career Accomplishments & Experience Highlights
          </h4>
          <ul style={{ paddingLeft: '20px', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {candidate.resumeSummary.highlights.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>

        {/* Stage Progression Actions */}
        <div
          style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '18px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Move candidate to next ATS pipeline stage:
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {candidate.status !== 'REJECTED' && (
              <Button
                variant="outline"
                size="sm"
                style={{ borderColor: 'var(--status-danger)', color: 'var(--status-danger)' }}
                onClick={() => {
                  onMoveCandidateStage(candidate.id, 'REJECTED');
                  onClose();
                }}
              >
                Reject Candidate
              </Button>
            )}

            {candidate.status === 'NEW' && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  onMoveCandidateStage(candidate.id, 'APPLIED');
                  onClose();
                }}
              >
                Process to Applied
              </Button>
            )}

            {candidate.status === 'APPLIED' && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  onMoveCandidateStage(candidate.id, 'SCREENING');
                  onClose();
                }}
              >
                Move to Screening
              </Button>
            )}

            {candidate.status === 'SCREENING' && (
              <Button
                variant="team-c"
                size="sm"
                onClick={() => {
                  onScheduleInterview(candidate);
                  onClose();
                }}
              >
                Schedule Interview Round
              </Button>
            )}

            {candidate.status === 'INTERVIEWING' && (
              <Button
                variant="team-c"
                size="sm"
                onClick={() => {
                  onGenerateOffer(candidate);
                  onClose();
                }}
              >
                Generate Offer Letter
              </Button>
            )}

            {candidate.status === 'OFFERED' && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  onMoveCandidateStage(candidate.id, 'HIRED');
                  onClose();
                }}
              >
                Mark Candidate as Hired
              </Button>
            )}
          </div>
        </div>
      </div>
    </ModalBackdrop>
  );
};
