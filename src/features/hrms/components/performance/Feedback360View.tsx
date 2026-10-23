import React, { useState } from 'react';
import { PerformanceFeedback, Employee } from '../../types';
import { Plus } from 'lucide-react';
import { HrmsModal } from '../common/HrmsModal';
import { SelectField, TextareaField } from '../common/HrmsFormFields';

interface Feedback360ViewProps {
  feedbacks: PerformanceFeedback[];
  employees: Employee[];
  onSubmitFeedback: (feedback: Omit<PerformanceFeedback, 'id' | 'submittedAt'>) => void;
}

export const Feedback360View: React.FC<Feedback360ViewProps> = ({
  feedbacks,
  employees,
  onSubmitFeedback,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeId, setEmployeeId] = useState(employees[0]?.id || 'emp-7');
  const [type, setType] = useState<'PEER' | 'MANAGER' | 'UPWARD'>('PEER');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [comments, setComments] = useState('');

  const getEmployee = (id: string) => employees.find((e) => e.id === id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comments.trim()) return;

    onSubmitFeedback({
      employeeId,
      providedBy: isAnonymous ? 'Anonymous Colleague' : 'Marcus Vance (CTO)',
      feedbackType: type,
      comments,
      isAnonymous,
    });
    setComments('');
    setIsModalOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>
            360-Degree Peer & Upward Feedback
          </h3>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
            Cross-functional peer reviews, upward feedback for managers, and team collaboration appraisals.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
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
          <Plus size={15} /> Give 360 Feedback
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
        {feedbacks.map((fb) => {
          const recipient = getEmployee(fb.employeeId);

          return (
            <div
              key={fb.id}
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
                    <span style={{ fontSize: '11px', color: 'var(--brand-primary)', fontWeight: 600 }}>
                      {fb.feedbackType} FEEDBACK
                    </span>
                    <h4 style={{ margin: '4px 0 0', fontSize: '15px', color: 'var(--text-primary)', fontWeight: 600 }}>
                      For {recipient ? `${recipient.firstName} ${recipient.lastName}` : 'Colleague'}
                    </h4>
                  </div>

                  {fb.isAnonymous && (
                    <span
                      style={{
                        fontSize: '11px',
                        padding: '2px 8px',
                        borderRadius: '999px',
                        backgroundColor: 'var(--bg-elevated)',
                        color: 'var(--text-muted)',
                      }}
                    >
                      Anonymous
                    </span>
                  )}
                </div>

                <p style={{ margin: '14px 0 0', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, fontStyle: 'italic' }}>
                  "{fb.comments}"
                </p>
              </div>

              <div
                style={{
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                }}
              >
                <span>From: <strong>{fb.providedBy}</strong></span>
                <span>{new Date(fb.submittedAt).toLocaleDateString()}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Give Feedback Modal */}
      <HrmsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Provide 360-Degree Feedback"
        subtitle="Share constructive insights to empower personal and technical growth"
        maxWidth="560px"
        footer={
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-elevated)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-subtle)',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              form="feedback-form"
              style={{
                padding: '8px 20px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--brand-primary)',
                color: '#ffffff',
                border: 'none',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Submit Feedback
            </button>
          </div>
        }
      >
        <form id="feedback-form" onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <SelectField
              label="Recipient Colleague"
              required
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              options={employees.map((e) => ({
                label: `${e.firstName} ${e.lastName} (${e.designation})`,
                value: e.id,
              }))}
            />

            <SelectField
              label="Relationship Perspective"
              value={type}
              onChange={(e) => setType(e.target.value as 'PEER' | 'MANAGER' | 'UPWARD')}
              options={[
                { label: 'Peer to Peer (Colleague Collaboration)', value: 'PEER' },
                { label: 'Upward Feedback (Feedback for Lead / Manager)', value: 'UPWARD' },
                { label: 'Manager Coaching Feedback', value: 'MANAGER' },
              ]}
            />

            <TextareaField
              label="Feedback & Observations"
              required
              rows={4}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Highlight standout collaborative moments, technical contributions, or suggestions for enhancement."
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                id="anon"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                style={{ cursor: 'pointer' }}
              />
              <label htmlFor="anon" style={{ fontSize: '13px', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                Keep feedback anonymous from recipient
              </label>
            </div>
          </div>
        </form>
      </HrmsModal>
    </div>
  );
};
