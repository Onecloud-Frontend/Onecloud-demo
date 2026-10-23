import React from 'react';
import { Candidate, CandidateStatus } from '../../types';
import { UserCheck, CalendarPlus, Award, UserPlus } from 'lucide-react';

interface CandidatePipelineViewProps {
  candidates: Candidate[];
  onUpdateStatus: (id: string, status: CandidateStatus) => void;
  onScheduleInterview: (candidate: Candidate) => void;
  onEvaluateCandidate: (candidate: Candidate) => void;
  onAddApplicantClick?: () => void;
}

const PIPELINE_COLUMNS: { status: CandidateStatus; label: string; color: string }[] = [
  { status: 'NEW', label: 'New Applicants', color: '#818cf8' },
  { status: 'SCREENING', label: 'Screening', color: '#f59e0b' },
  { status: 'INTERVIEWING', label: 'Interviews', color: '#38bdf8' },
  { status: 'OFFERED', label: 'Offer Stage', color: '#c084fc' },
  { status: 'HIRED', label: 'Hired', color: '#10b981' },
];

export const CandidatePipelineView: React.FC<CandidatePipelineViewProps> = ({
  candidates,
  onUpdateStatus,
  onScheduleInterview,
  onEvaluateCandidate,
  onAddApplicantClick,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>
            Talent Acquisition Pipeline (ATS Kanban)
          </h3>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
            Advance candidates through recruitment lifecycle stages. Marking a candidate as Hired automatically creates an active Employee record.
          </p>
        </div>
        {onAddApplicantClick && (
          <button
            onClick={onAddApplicantClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--brand-primary)',
              color: '#ffffff',
              border: 'none',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <UserPlus size={14} /> Add New Applicant
          </button>
        )}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, minmax(240px, 1fr))',
          gap: '14px',
          overflowX: 'auto',
          paddingBottom: '12px',
        }}
      >
        {PIPELINE_COLUMNS.map((col) => {
          const columnCandidates = candidates.filter((c) => c.status === col.status);

          return (
            <div
              key={col.status}
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                minHeight: '480px',
              }}
            >
              {/* Column Header */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingBottom: '8px',
                  borderBottom: `2px solid ${col.color}`,
                }}
              >
                <span style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)' }}>
                  {col.label}
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '999px',
                    backgroundColor: `${col.color}22`,
                    color: col.color,
                  }}
                >
                  {columnCandidates.length}
                </span>
              </div>

              {/* Cards List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {columnCandidates.map((cand) => (
                  <div
                    key={cand.id}
                    style={{
                      backgroundColor: 'var(--bg-surface)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      padding: '12px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--text-primary)' }}>
                        {cand.firstName} {cand.lastName}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        {cand.currentCompany || 'Independent'} • {cand.totalExperienceYears} yrs exp
                      </div>
                    </div>

                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                      Source: <strong>{cand.source}</strong>
                    </div>

                    {/* Quick Stage Actions */}
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '6px',
                        marginTop: '4px',
                        paddingTop: '6px',
                        borderTop: '1px solid var(--border-subtle)',
                      }}
                    >
                      {cand.status === 'NEW' && (
                        <button
                          onClick={() => onUpdateStatus(cand.id, 'SCREENING')}
                          style={{
                            padding: '3px 8px',
                            borderRadius: 'var(--radius-sm)',
                            backgroundColor: 'var(--bg-elevated)',
                            color: 'var(--brand-primary)',
                            border: '1px solid var(--border-subtle)',
                            fontSize: '11px',
                            fontWeight: 600,
                            cursor: 'pointer',
                          }}
                        >
                          Pass Screening →
                        </button>
                      )}

                      {cand.status === 'SCREENING' && (
                        <button
                          onClick={() => onScheduleInterview(cand)}
                          style={{
                            padding: '3px 8px',
                            borderRadius: 'var(--radius-sm)',
                            backgroundColor: 'rgba(56, 189, 248, 0.15)',
                            color: '#38bdf8',
                            border: '1px solid rgba(56, 189, 248, 0.3)',
                            fontSize: '11px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          <CalendarPlus size={12} /> Interview
                        </button>
                      )}

                      {cand.status === 'INTERVIEWING' && (
                        <>
                          <button
                            onClick={() => onEvaluateCandidate(cand)}
                            style={{
                              padding: '3px 8px',
                              borderRadius: 'var(--radius-sm)',
                              backgroundColor: 'rgba(192, 132, 252, 0.15)',
                              color: '#c084fc',
                              border: '1px solid rgba(192, 132, 252, 0.3)',
                              fontSize: '11px',
                              fontWeight: 600,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                            }}
                          >
                            <Award size={12} /> Evaluate
                          </button>
                          <button
                            onClick={() => onUpdateStatus(cand.id, 'OFFERED')}
                            style={{
                              padding: '3px 8px',
                              borderRadius: 'var(--radius-sm)',
                              backgroundColor: 'var(--bg-elevated)',
                              color: 'var(--brand-primary)',
                              border: '1px solid var(--border-subtle)',
                              fontSize: '11px',
                              fontWeight: 600,
                              cursor: 'pointer',
                            }}
                          >
                            Offer →
                          </button>
                        </>
                      )}

                      {cand.status === 'OFFERED' && (
                        <button
                          onClick={() => onUpdateStatus(cand.id, 'HIRED')}
                          style={{
                            padding: '3px 8px',
                            borderRadius: 'var(--radius-sm)',
                            backgroundColor: 'rgba(16, 185, 129, 0.15)',
                            color: '#10b981',
                            border: '1px solid rgba(16, 185, 129, 0.3)',
                            fontSize: '11px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          <UserCheck size={12} /> Mark Hired
                        </button>
                      )}

                      {cand.status === 'HIRED' && (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            color: '#10b981',
                            fontSize: '11px',
                            fontWeight: 600,
                            padding: '2px 6px',
                            backgroundColor: 'rgba(16, 185, 129, 0.1)',
                            borderRadius: 'var(--radius-sm)',
                          }}
                        >
                          <UserCheck size={12} /> Converted to Active Employee
                        </div>
                      )}

                      {cand.status !== 'HIRED' && cand.status !== 'REJECTED' && (
                        <button
                          onClick={() => onUpdateStatus(cand.id, 'REJECTED')}
                          style={{
                            padding: '3px 6px',
                            borderRadius: 'var(--radius-sm)',
                            backgroundColor: 'transparent',
                            color: 'var(--text-muted)',
                            border: 'none',
                            fontSize: '10px',
                            cursor: 'pointer',
                          }}
                        >
                          Reject
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
