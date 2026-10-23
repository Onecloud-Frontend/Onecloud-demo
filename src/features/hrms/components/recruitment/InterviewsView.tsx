import React from 'react';
import { Badge, Button, Card } from '@shared/components';
import { Award, ExternalLink, Eye, Plus, Star } from 'lucide-react';
import { formatDate } from '@shared/utils/formatters';
import type { MockRecruitmentInterview } from '@mock/hrms/recruitmentMockApi';
import type { CandidateEvaluation } from '@features/hrms/types';

export interface InterviewsViewProps {
  interviews: MockRecruitmentInterview[];
  evaluations: CandidateEvaluation[];
  onScheduleInterviewClick: () => void;
  onOpenScorecard: (interview: MockRecruitmentInterview, evaluation?: CandidateEvaluation) => void;
}

export const InterviewsView: React.FC<InterviewsViewProps> = ({
  interviews,
  evaluations,
  onScheduleInterviewClick,
  onOpenScorecard,
}) => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>
            Interview Rounds & Scorecard Evaluations
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Track scheduled panel interviews, capture structured scorecard feedback, and view candidate recommendations.
          </p>
        </div>
        <Button
          variant="team-c"
          size="sm"
          icon={<Plus size={15} />}
          onClick={onScheduleInterviewClick}
        >
          Schedule Interview Round
        </Button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {interviews.map(int => {
          const isCompleted = int.status === 'COMPLETED';
          const evaluation = evaluations.find(e => e.interviewId === int.id);

          return (
            <Card
              key={int.id}
              accent={isCompleted ? 'none' : 'team-c'}
              footer={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '12.5px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>
                      Time: <strong style={{ color: 'var(--text-secondary)' }}>{formatDate(int.scheduledStartTime)}</strong>
                    </span>
                    {int.meetingLink && (
                      <a
                        href={int.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: 'var(--brand-primary)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <ExternalLink size={13} />
                        Launch Video Room
                      </a>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    {isCompleted ? (
                      <Button
                        variant="secondary"
                        size="sm"
                        icon={<Eye size={14} />}
                        onClick={() => onOpenScorecard(int, evaluation)}
                      >
                        View Scorecard
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        size="sm"
                        icon={<Award size={14} />}
                        onClick={() => onOpenScorecard(int)}
                      >
                        Evaluate Scorecard
                      </Button>
                    )}
                  </div>
                </div>
              }
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {int.candidateName}
                    </h4>
                    <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                      • {int.candidateRole} ({int.departmentName})
                    </span>
                    <Badge variant={isCompleted ? 'success' : 'warning'} size="sm">
                      {int.status}
                    </Badge>
                  </div>

                  <div style={{ marginTop: '6px', fontSize: '13.5px', color: 'var(--team-c-accent)', fontWeight: 500 }}>
                    {int.interviewRound}
                  </div>

                  <div style={{ marginTop: '6px', fontSize: '12.5px', color: 'var(--text-muted)' }}>
                    Interviewers: {int.interviewerIds.join(', ')}
                  </div>
                </div>

                {isCompleted && int.rating && (
                  <div
                    style={{
                      textAlign: 'right',
                      padding: '8px 12px',
                      backgroundColor: 'var(--bg-elevated)',
                      borderRadius: 'var(--radius-md)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--status-warning)' }}>
                      <Star size={16} fill="var(--status-warning)" />
                      <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {int.rating} / 5.0
                      </span>
                    </div>
                    {evaluation && (
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 600,
                          color:
                            evaluation.overallRecommendation === 'STRONG_HIRE' ||
                            evaluation.overallRecommendation === 'HIRE'
                              ? 'var(--status-success)'
                              : 'var(--status-danger)',
                        }}
                      >
                        {evaluation.overallRecommendation.replace('_', ' ')}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {int.feedbackSummary && (
                <div
                  style={{
                    marginTop: '12px',
                    padding: '10px 14px',
                    backgroundColor: 'var(--bg-input)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '13px',
                    color: 'var(--text-secondary)',
                    fontStyle: 'italic',
                  }}
                >
                  "{int.feedbackSummary}"
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};
