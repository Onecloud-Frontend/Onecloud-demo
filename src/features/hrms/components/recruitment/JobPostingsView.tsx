import React from 'react';
import { JobPosting, Candidate } from '../../types';
import { HrmsStatusBadge } from '../common/HrmsStatusBadge';
import { MapPin, Users } from 'lucide-react';

interface JobPostingsViewProps {
  postings: JobPosting[];
  candidates: Candidate[];
  onApplyClick?: (posting: JobPosting) => void;
}

export const JobPostingsView: React.FC<JobPostingsViewProps> = ({ postings, candidates, onApplyClick }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>
          Active Career Listings & Public Postings
        </h3>
        <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
          Live external openings syndicated to LinkedIn, Indeed, and the OneCloud talent portal.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '16px' }}>
        {postings.map((post) => {
          return (
            <div
              key={post.id}
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '14px',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '16px', color: 'var(--text-primary)', fontWeight: 600 }}>
                      {post.postingTitle}
                    </h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px', fontSize: '12px', color: 'var(--text-muted)' }}>
                      <MapPin size={13} /> {post.location}
                    </div>
                  </div>
                  <HrmsStatusBadge status={post.status} size="sm" />
                </div>

                <p style={{ margin: '12px 0 0', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {post.jobDescription}
                </p>

                <div style={{ marginTop: '12px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Key Requirements:</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                    {post.requirements.map((req, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '11px',
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: 'var(--bg-elevated)',
                          color: 'var(--text-primary)',
                          border: '1px solid var(--border-subtle)',
                        }}
                      >
                        {req}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div
                style={{
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '12px',
                }}
              >
                <div style={{ color: 'var(--text-muted)' }}>
                  Published: <strong>{post.publishedDate}</strong> • Expires: {post.expiryDate}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#10b981', fontWeight: 600 }}>
                    <Users size={14} />
                    <span>{candidates.length} Applicants</span>
                  </div>

                  {onApplyClick && (
                    <button
                      onClick={() => onApplyClick(post)}
                      style={{
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'var(--brand-primary)',
                        color: '#ffffff',
                        border: 'none',
                        fontSize: '11px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      Apply Applicant
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
