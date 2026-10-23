import React from 'react';
import { Interview, CandidateEvaluation, Candidate, Employee } from '../../types';
import { HrmsStatusBadge } from '../common/HrmsStatusBadge';
import { Calendar, User, Award, CheckCircle2, Clock, CalendarPlus } from 'lucide-react';

interface InterviewScorecardsViewProps {
  interviews: Interview[];
  evaluations: CandidateEvaluation[];
  candidates: Candidate[];
  employees: Employee[];
  onScheduleInterviewClick: () => void;
  onEvaluateCandidateClick: (candidate: Candidate) => void;
}

export const InterviewScorecardsView: React.FC<InterviewScorecardsViewProps> = ({
  interviews,
  evaluations,
  candidates,
  employees,
  onScheduleInterviewClick,
  onEvaluateCandidateClick,
}) => {
  const getCandidate = (id: string) => candidates.find((c) => c.id === id);
  const getInterviewer = (id: string) => employees.find((e) => e.id === id);

  const completedCount = interviews.filter((i) => i.status === 'COMPLETED').length;
  const strongHireCount = evaluations.filter((e) => e.overallRecommendation === 'STRONG_HIRE' || e.overallRecommendation === 'HIRE').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header and Quick Action */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>
            Interview Scheduling & Structured Scorecards (Rubrics)
          </h3>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
            Panel interview rounds, evaluation rubrics (Technical, Communication, Cultural Fit), and hiring recommendations.
          </p>
        </div>

        <button
          onClick={onScheduleInterviewClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--brand-primary)',
            color: '#ffffff',
            border: 'none',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          <CalendarPlus size={15} /> Schedule Interview
        </button>
      </div>

      {/* Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div style={{ padding: '10px', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
            <Calendar size={20} />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Interviews Total</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>{interviews.length}</div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div style={{ padding: '10px', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
            <CheckCircle2 size={20} />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Evaluated & Scored</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>{completedCount}</div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div style={{ padding: '10px', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(192, 132, 252, 0.15)', color: '#c084fc' }}>
            <Award size={20} />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Hire Recommendations</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>{strongHireCount}</div>
          </div>
        </div>
      </div>

      {/* Interview & Scorecard Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {interviews.map((intItem) => {
          const cand = getCandidate(intItem.candidateId);
          const evaluation = evaluations.find((e) => e.interviewId === intItem.id);
          const interviewer = getInterviewer(intItem.interviewerIds[0]);

          return (
            <div
              key={intItem.id}
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(99, 102, 241, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--brand-primary)',
                      fontWeight: 700,
                    }}
                  >
                    {cand ? `${cand.firstName[0]}${cand.lastName[0]}` : 'C'}
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '15px', color: 'var(--text-primary)', fontWeight: 600 }}>
                      {cand ? `${cand.firstName} ${cand.lastName}` : 'Candidate'} — {intItem.interviewRound}
                    </h4>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {cand?.currentCompany} • {cand?.email}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <HrmsStatusBadge status={intItem.status} size="sm" />
                  {evaluation && (
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '3px 8px',
                        borderRadius: '999px',
                        backgroundColor:
                          evaluation.overallRecommendation === 'STRONG_HIRE' || evaluation.overallRecommendation === 'HIRE'
                            ? 'rgba(16, 185, 129, 0.15)'
                            : 'rgba(239, 68, 68, 0.15)',
                        color:
                          evaluation.overallRecommendation === 'STRONG_HIRE' || evaluation.overallRecommendation === 'HIRE'
                            ? '#10b981'
                            : '#ef4444',
                      }}
                    >
                      {evaluation.overallRecommendation.replace('_', ' ')}
                    </span>
                  )}
                </div>
              </div>

              {/* Time & Panel Details */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '12px',
                  backgroundColor: 'var(--bg-surface)',
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                  <Clock size={14} color="var(--text-muted)" />
                  <span>
                    Schedule: <strong>{new Date(intItem.scheduledStartTime).toLocaleString()}</strong>
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                  <User size={14} color="var(--text-muted)" />
                  <span>
                    Lead Interviewer: <strong>{interviewer ? `${interviewer.firstName} ${interviewer.lastName}` : 'Panel Lead'}</strong>
                  </span>
                </div>
              </div>

              {/* Evaluation Rubric / Scorecard if completed */}
              {evaluation ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Structured Rating Rubric Breakdown:
                  </span>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                    <div style={{ backgroundColor: 'var(--bg-elevated)', padding: '10px', borderRadius: 'var(--radius-sm)' }}>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Technical Acumen</div>
                      <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--brand-primary)', marginTop: '2px' }}>
                        ★ {evaluation.technicalRating} / 5.0
                      </div>
                    </div>
                    <div style={{ backgroundColor: 'var(--bg-elevated)', padding: '10px', borderRadius: 'var(--radius-sm)' }}>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Communication & Articulation</div>
                      <div style={{ fontSize: '16px', fontWeight: 700, color: '#38bdf8', marginTop: '2px' }}>
                        ★ {evaluation.communicationRating} / 5.0
                      </div>
                    </div>
                    <div style={{ backgroundColor: 'var(--bg-elevated)', padding: '10px', borderRadius: 'var(--radius-sm)' }}>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Cultural Fit & Values</div>
                      <div style={{ fontSize: '16px', fontWeight: 700, color: '#c084fc', marginTop: '2px' }}>
                        ★ {evaluation.culturalFitRating} / 5.0
                      </div>
                    </div>
                  </div>

                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: 1.5 }}>
                    <strong>Interviewer Notes:</strong> {evaluation.notes}
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    Interview pending completion and scorecard submission.
                  </span>
                  {cand && (
                    <button
                      onClick={() => onEvaluateCandidateClick(cand)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 14px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'var(--brand-primary)',
                        color: '#ffffff',
                        border: 'none',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      <Award size={13} /> Submit Scorecard & Rubric
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
