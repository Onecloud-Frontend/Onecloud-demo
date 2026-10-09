import React, { useState } from 'react';
import { Candidate, CandidateEvaluation, Employee } from '../../types';
import { HrmsModal } from '../common/HrmsModal';
import { SelectField, TextareaField, FormRow } from '../common/HrmsFormFields';

interface CandidateEvaluationModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: Candidate | null;
  employees: Employee[];
  onSubmitEvaluation: (evalItem: Omit<CandidateEvaluation, 'id' | 'submittedAt'>) => void;
}

export const CandidateEvaluationModal: React.FC<CandidateEvaluationModalProps> = ({
  isOpen,
  onClose,
  candidate,
  employees,
  onSubmitEvaluation,
}) => {
  if (!candidate) return null;

  const [evaluatorId, setEvaluatorId] = useState(employees[0]?.id || 'emp-1');
  const [technicalRating, setTechnicalRating] = useState('5');
  const [communicationRating, setCommunicationRating] = useState('5');
  const [culturalFitRating, setCulturalFitRating] = useState('5');
  const [recommendation, setRecommendation] = useState<'STRONG_HIRE' | 'HIRE' | 'NEUTRAL' | 'NO_HIRE'>('STRONG_HIRE');
  const [notes, setNotes] = useState('Excellent performance, strong systems design knowledge, culture positive.');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitEvaluation({
      interviewId: 'int-1',
      candidateId: candidate.id,
      evaluatorId,
      technicalRating: Number(technicalRating),
      communicationRating: Number(communicationRating),
      culturalFitRating: Number(culturalFitRating),
      overallRecommendation: recommendation,
      notes,
    });
    onClose();
  };

  return (
    <HrmsModal
      isOpen={isOpen}
      onClose={onClose}
      title={`Candidate Scorecard & Evaluation: ${candidate.firstName} ${candidate.lastName}`}
      subtitle="Score applicant competence rubric and submit hiring decision"
      maxWidth="620px"
      footer={
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              backgroundColor: 'var(--bg-elevated)',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            form="eval-form"
            style={{
              padding: '8px 20px',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              backgroundColor: 'var(--brand-primary)',
              color: '#ffffff',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Submit Scorecard
          </button>
        </div>
      }
    >
      <form id="eval-form" onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <SelectField
            label="Evaluator / Panel Lead"
            required
            value={evaluatorId}
            onChange={(e) => setEvaluatorId(e.target.value)}
            options={employees.map((e) => ({
              label: `${e.firstName} ${e.lastName} (${e.designation})`,
              value: e.id,
            }))}
          />

          <div
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <h4 style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Competency Scoring Rubric (1 - 5 Stars)
            </h4>

            <FormRow>
              <SelectField
                label="Technical Architecture"
                value={technicalRating}
                onChange={(e) => setTechnicalRating(e.target.value)}
                options={[
                  { label: '5 - Exceptional / Mastery', value: '5' },
                  { label: '4 - Strong / Exceeds Bar', value: '4' },
                  { label: '3 - Competent / Meets Bar', value: '3' },
                  { label: '2 - Needs Development', value: '2' },
                  { label: '1 - Below Minimum Bar', value: '1' },
                ]}
              />
              <SelectField
                label="Communication & Clarity"
                value={communicationRating}
                onChange={(e) => setCommunicationRating(e.target.value)}
                options={[
                  { label: '5 - Exemplary', value: '5' },
                  { label: '4 - Clear & Articulate', value: '4' },
                  { label: '3 - Satisfactory', value: '3' },
                  { label: '2 - Limited', value: '2' },
                ]}
              />
            </FormRow>

            <FormRow>
              <SelectField
                label="Culture & Values Alignment"
                value={culturalFitRating}
                onChange={(e) => setCulturalFitRating(e.target.value)}
                options={[
                  { label: '5 - High Empathy & Growth Mindset', value: '5' },
                  { label: '4 - Strong Alignment', value: '4' },
                  { label: '3 - Acceptable', value: '3' },
                  { label: '2 - Questionable', value: '2' },
                ]}
              />

              <SelectField
                label="Final Hiring Recommendation"
                required
                value={recommendation}
                onChange={(e) => setRecommendation(e.target.value as 'STRONG_HIRE' | 'HIRE' | 'NEUTRAL' | 'NO_HIRE')}
                options={[
                  { label: '★ STRONG HIRE (Priority Offer)', value: 'STRONG_HIRE' },
                  { label: '✓ HIRE (Meets bar)', value: 'HIRE' },
                  { label: '— NEUTRAL (Needs secondary round)', value: 'NEUTRAL' },
                  { label: '✕ NO HIRE (Do not proceed)', value: 'NO_HIRE' },
                ]}
              />
            </FormRow>
          </div>

          <TextareaField
            label="Evaluator Assessment & Summary Notes"
            required
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Detailed notes on candidate strengths, weaknesses, and rationale for hire decision."
          />
        </div>
      </form>
    </HrmsModal>
  );
};
