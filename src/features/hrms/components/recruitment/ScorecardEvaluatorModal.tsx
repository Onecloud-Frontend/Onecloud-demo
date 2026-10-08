import React, { useState, useEffect } from 'react';
import { Button } from '@shared/components';
import { X } from 'lucide-react';
import { ModalBackdrop } from './RecruitmentBadges';
import type { MockRecruitmentInterview } from '@mock/hrms/recruitmentMockApi';
import type { CandidateEvaluation } from '@features/hrms/types';

export interface ScorecardEvaluatorModalProps {
  interview: MockRecruitmentInterview | null;
  existingEvaluation?: CandidateEvaluation;
  onClose: () => void;
  onSubmitScorecard: (
    interviewId: string,
    candidateId: string,
    evaluation: CandidateEvaluation,
    avgRating: number,
    notes: string
  ) => void;
}

export const ScorecardEvaluatorModal: React.FC<ScorecardEvaluatorModalProps> = ({
  interview,
  existingEvaluation,
  onClose,
  onSubmitScorecard,
}) => {
  const [scorecardTech, setScorecardTech] = useState<number>(5);
  const [scorecardComm, setScorecardComm] = useState<number>(4);
  const [scorecardCulture, setScorecardCulture] = useState<number>(5);
  const [scorecardRec, setScorecardRec] = useState<'STRONG_HIRE' | 'HIRE' | 'NEUTRAL' | 'NO_HIRE'>('STRONG_HIRE');
  const [scorecardNotes, setScorecardNotes] = useState('');
  const [scorecardError, setScorecardError] = useState('');

  useEffect(() => {
    if (existingEvaluation) {
      setScorecardTech(existingEvaluation.technicalRating);
      setScorecardComm(existingEvaluation.communicationRating);
      setScorecardCulture(existingEvaluation.culturalFitRating);
      setScorecardRec(existingEvaluation.overallRecommendation);
      setScorecardNotes(existingEvaluation.notes);
    } else {
      setScorecardTech(5);
      setScorecardComm(4);
      setScorecardCulture(5);
      setScorecardRec('STRONG_HIRE');
      setScorecardNotes('');
    }
    setScorecardError('');
  }, [existingEvaluation, interview]);

  if (!interview) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scorecardNotes.trim()) {
      setScorecardError('Please provide detailed feedback comments.');
      return;
    }

    const avgRating = Number(((scorecardTech + scorecardComm + scorecardCulture) / 3).toFixed(1));

    const evalRecord: CandidateEvaluation = {
      id: `eval-${Date.now().toString().slice(-4)}`,
      interviewId: interview.id,
      candidateId: interview.candidateId,
      evaluatorId: 'Current Evaluator (Interviewer)',
      technicalRating: scorecardTech,
      communicationRating: scorecardComm,
      culturalFitRating: scorecardCulture,
      overallRecommendation: scorecardRec,
      notes: scorecardNotes.trim(),
      submittedAt: new Date().toISOString(),
    };

    onSubmitScorecard(interview.id, interview.candidateId, evalRecord, avgRating, scorecardNotes.trim());
    setScorecardNotes('');
    setScorecardError('');
    onClose();
  };

  return (
    <ModalBackdrop onClose={onClose}>
      <div
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--team-c-border)',
          borderRadius: 'var(--radius-lg)',
          width: '640px',
          maxWidth: '94vw',
          padding: '24px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)' }}>
              Structured Interview Scorecard Evaluator
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Candidate: <strong>{interview.candidateName}</strong> • {interview.interviewRound}
            </p>
          </div>
          <button onClick={onClose} style={{ color: 'var(--text-muted)' }}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {scorecardError && (
            <div
              style={{
                color: 'var(--status-danger)',
                fontSize: '13px',
                padding: '8px',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              ⚠️ {scorecardError}
            </div>
          )}

          {/* Rating 1: Technical */}
          <div
            style={{
              padding: '12px 16px',
              backgroundColor: 'var(--bg-elevated)',
              borderRadius: 'var(--radius-md)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-primary)' }}>
                Technical Competency & Problem Solving
              </span>
              <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--team-c-accent)' }}>
                {scorecardTech} / 5
              </span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[1, 2, 3, 4, 5].map(val => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setScorecardTech(val)}
                  style={{
                    flex: 1,
                    padding: '6px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: scorecardTech >= val ? 'var(--brand-primary)' : 'var(--bg-input)',
                    color: scorecardTech >= val ? '#fff' : 'var(--text-muted)',
                    fontWeight: 600,
                    fontSize: '13px',
                  }}
                >
                  ★ {val}
                </button>
              ))}
            </div>
          </div>

          {/* Rating 2: Communication */}
          <div
            style={{
              padding: '12px 16px',
              backgroundColor: 'var(--bg-elevated)',
              borderRadius: 'var(--radius-md)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-primary)' }}>
                Communication & Clarity of Thought
              </span>
              <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--team-c-accent)' }}>
                {scorecardComm} / 5
              </span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[1, 2, 3, 4, 5].map(val => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setScorecardComm(val)}
                  style={{
                    flex: 1,
                    padding: '6px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: scorecardComm >= val ? 'var(--brand-primary)' : 'var(--bg-input)',
                    color: scorecardComm >= val ? '#fff' : 'var(--text-muted)',
                    fontWeight: 600,
                    fontSize: '13px',
                  }}
                >
                  ★ {val}
                </button>
              ))}
            </div>
          </div>

          {/* Rating 3: Cultural Fit */}
          <div
            style={{
              padding: '12px 16px',
              backgroundColor: 'var(--bg-elevated)',
              borderRadius: 'var(--radius-md)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-primary)' }}>
                Cultural Fit & Core Value Alignment
              </span>
              <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--team-c-accent)' }}>
                {scorecardCulture} / 5
              </span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[1, 2, 3, 4, 5].map(val => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setScorecardCulture(val)}
                  style={{
                    flex: 1,
                    padding: '6px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: scorecardCulture >= val ? 'var(--brand-primary)' : 'var(--bg-input)',
                    color: scorecardCulture >= val ? '#fff' : 'var(--text-muted)',
                    fontWeight: 600,
                    fontSize: '13px',
                  }}
                >
                  ★ {val}
                </button>
              ))}
            </div>
          </div>

          {/* Overall Recommendation */}
          <div>
            <label
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                display: 'block',
                marginBottom: '8px',
              }}
            >
              Hiring Decision Recommendation *
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setScorecardRec('STRONG_HIRE')}
                style={{
                  padding: '10px 4px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor:
                    scorecardRec === 'STRONG_HIRE' ? 'rgba(16, 185, 129, 0.2)' : 'var(--bg-input)',
                  border:
                    scorecardRec === 'STRONG_HIRE' ? '1px solid var(--status-success)' : '1px solid var(--border-subtle)',
                  color: scorecardRec === 'STRONG_HIRE' ? 'var(--status-success)' : 'var(--text-secondary)',
                  fontWeight: 600,
                  fontSize: '12px',
                }}
              >
                ★ Strong Hire
              </button>

              <button
                type="button"
                onClick={() => setScorecardRec('HIRE')}
                style={{
                  padding: '10px 4px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor:
                    scorecardRec === 'HIRE' ? 'rgba(56, 189, 248, 0.2)' : 'var(--bg-input)',
                  border:
                    scorecardRec === 'HIRE' ? '1px solid var(--team-b-accent)' : '1px solid var(--border-subtle)',
                  color: scorecardRec === 'HIRE' ? 'var(--team-b-accent)' : 'var(--text-secondary)',
                  fontWeight: 600,
                  fontSize: '12px',
                }}
              >
                ✓ Hire
              </button>

              <button
                type="button"
                onClick={() => setScorecardRec('NEUTRAL')}
                style={{
                  padding: '10px 4px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor:
                    scorecardRec === 'NEUTRAL' ? 'rgba(245, 158, 11, 0.2)' : 'var(--bg-input)',
                  border:
                    scorecardRec === 'NEUTRAL' ? '1px solid var(--status-warning)' : '1px solid var(--border-subtle)',
                  color: scorecardRec === 'NEUTRAL' ? 'var(--status-warning)' : 'var(--text-secondary)',
                  fontWeight: 600,
                  fontSize: '12px',
                }}
              >
                ~ Neutral
              </button>

              <button
                type="button"
                onClick={() => setScorecardRec('NO_HIRE')}
                style={{
                  padding: '10px 4px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor:
                    scorecardRec === 'NO_HIRE' ? 'rgba(239, 68, 68, 0.2)' : 'var(--bg-input)',
                  border:
                    scorecardRec === 'NO_HIRE' ? '1px solid var(--status-danger)' : '1px solid var(--border-subtle)',
                  color: scorecardRec === 'NO_HIRE' ? 'var(--status-danger)' : 'var(--text-secondary)',
                  fontWeight: 600,
                  fontSize: '12px',
                }}
              >
                ✕ No Hire
              </button>
            </div>
          </div>

          {/* Written Notes */}
          <div>
            <label
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                display: 'block',
                marginBottom: '6px',
              }}
            >
              Detailed Evaluator Notes & Evidence *
            </label>
            <textarea
              rows={4}
              placeholder="Record strengths, growth areas, specific code snippets, and justification for hiring decision..."
              value={scorecardNotes}
              onChange={e => setScorecardNotes(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: 'var(--bg-input)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '10px 14px',
                fontSize: '13.5px',
                fontFamily: 'inherit',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <Button variant="outline" size="sm" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Submit Scorecard Evaluation
            </Button>
          </div>
        </form>
      </div>
    </ModalBackdrop>
  );
};
