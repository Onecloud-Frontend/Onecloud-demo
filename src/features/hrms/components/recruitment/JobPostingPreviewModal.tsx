import React from 'react';
import { Badge, Button } from '@shared/components';
import { X } from 'lucide-react';
import { ModalBackdrop } from './RecruitmentBadges';
import type { JobPosting } from '@features/hrms/types';

export interface JobPostingPreviewModalProps {
  posting: JobPosting | null;
  onClose: () => void;
}

export const JobPostingPreviewModal: React.FC<JobPostingPreviewModalProps> = ({ posting, onClose }) => {
  if (!posting) return null;

  return (
    <ModalBackdrop onClose={onClose}>
      <div
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          width: '680px',
          maxWidth: '94vw',
          padding: '24px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <Badge variant="team-c" size="sm">
              Public Careers Portal Preview
            </Badge>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '6px' }}>
              {posting.postingTitle}
            </h3>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              📍 {posting.location} • Posted by {posting.postedBy}
            </div>
          </div>
          <button onClick={onClose} style={{ color: 'var(--text-muted)' }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
            Role Description
          </h4>
          <p>{posting.jobDescription}</p>
        </div>

        <div>
          <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
            Candidate Requirements
          </h4>
          <ul style={{ paddingLeft: '20px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {posting.requirements.map((req, i) => (
              <li key={i}>{req}</li>
            ))}
          </ul>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
          <Button variant="outline" size="sm" onClick={onClose}>
            Close Preview
          </Button>
        </div>
      </div>
    </ModalBackdrop>
  );
};
