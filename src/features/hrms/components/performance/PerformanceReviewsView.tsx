import React, { useState } from 'react';
import { PerformanceReview, Employee } from '../../types';
import { HrmsStatusBadge } from '../common/HrmsStatusBadge';
import { Star, Plus } from 'lucide-react';
import { HrmsModal } from '../common/HrmsModal';
import { TextInput, SelectField, TextareaField, FormRow } from '../common/HrmsFormFields';

interface PerformanceReviewsViewProps {
  reviews: PerformanceReview[];
  employees: Employee[];
  onSubmitReview: (review: Omit<PerformanceReview, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export const PerformanceReviewsView: React.FC<PerformanceReviewsViewProps> = ({
  reviews,
  employees,
  onSubmitReview,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeId, setEmployeeId] = useState(employees[0]?.id || 'emp-7');
  const [reviewerId, setReviewerId] = useState('emp-1');
  const [cycle, setCycle] = useState('Annual 2026 Appraisal');
  const [selfRating, setSelfRating] = useState('4.5');
  const [managerRating, setManagerRating] = useState('4.8');
  const [selfComments, setSelfComments] = useState('');
  const [managerComments, setManagerComments] = useState('');

  const getEmployee = (id: string) => employees.find((e) => e.id === id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalScore = Number(((Number(selfRating) + Number(managerRating)) / 2).toFixed(1));

    onSubmitReview({
      employeeId,
      reviewCycle: cycle,
      reviewerId,
      selfRating: Number(selfRating),
      managerRating: Number(managerRating),
      finalRating: finalScore,
      selfComments,
      managerComments,
      status: 'COMPLETED',
      reviewDate: new Date().toISOString().split('T')[0],
    });
    setIsModalOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>
            Performance Appraisal Cycles & Ratings
          </h3>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
            Semi-annual and annual 1-on-1 performance review consensus and manager feedback.
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
          <Plus size={15} /> New Appraisal Review
        </button>
      </div>

      <div
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: 'rgba(30, 41, 59, 0.4)', borderBottom: '1px solid var(--border-subtle)' }}>
              <th style={{ padding: '12px 18px', color: 'var(--text-secondary)', fontWeight: 600 }}>EMPLOYEE</th>
              <th style={{ padding: '12px 18px', color: 'var(--text-secondary)', fontWeight: 600 }}>CYCLE</th>
              <th style={{ padding: '12px 18px', color: 'var(--text-secondary)', fontWeight: 600 }}>REVIEWER</th>
              <th style={{ padding: '12px 18px', color: 'var(--text-secondary)', fontWeight: 600 }}>SELF RATING</th>
              <th style={{ padding: '12px 18px', color: 'var(--text-secondary)', fontWeight: 600 }}>MANAGER RATING</th>
              <th style={{ padding: '12px 18px', color: 'var(--text-secondary)', fontWeight: 600 }}>FINAL RATING</th>
              <th style={{ padding: '12px 18px', color: 'var(--text-secondary)', fontWeight: 600 }}>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((rev) => {
              const emp = getEmployee(rev.employeeId);
              const reviewer = getEmployee(rev.reviewerId);

              return (
                <tr key={rev.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '14px 18px', color: 'var(--text-primary)' }}>
                    <div style={{ fontWeight: 600 }}>{emp ? `${emp.firstName} ${emp.lastName}` : 'Employee'}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{emp?.employeeCode}</div>
                  </td>
                  <td style={{ padding: '14px 18px', color: 'var(--text-primary)', fontWeight: 500 }}>
                    {rev.reviewCycle}
                  </td>
                  <td style={{ padding: '14px 18px', color: 'var(--text-secondary)' }}>
                    {reviewer ? `${reviewer.firstName} ${reviewer.lastName}` : 'Manager'}
                  </td>
                  <td style={{ padding: '14px 18px', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                    {rev.selfRating || '—'} / 5.0
                  </td>
                  <td style={{ padding: '14px 18px', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                    {rev.managerRating || '—'} / 5.0
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ display: 'center', alignItems: 'center', gap: '4px', color: '#10b981', fontWeight: 700 }}>
                      <Star size={14} fill="#10b981" />
                      <span>{rev.finalRating || '—'}</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <HrmsStatusBadge status={rev.status} size="sm" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Review Modal */}
      <HrmsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Submit Performance Review Assessment"
        subtitle="Record formal appraisal scores and constructive feedback"
        maxWidth="620px"
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
              form="review-form"
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
              Submit Review
            </button>
          </div>
        }
      >
        <form id="review-form" onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <TextInput
              label="Appraisal Cycle Name"
              required
              value={cycle}
              onChange={(e) => setCycle(e.target.value)}
            />

            <FormRow>
              <SelectField
                label="Employee Being Appraised"
                required
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                options={employees.map((e) => ({
                  label: `${e.firstName} ${e.lastName} (${e.designation})`,
                  value: e.id,
                }))}
              />
              <SelectField
                label="Reviewer"
                required
                value={reviewerId}
                onChange={(e) => setReviewerId(e.target.value)}
                options={employees.map((e) => ({
                  label: `${e.firstName} ${e.lastName} (${e.designation})`,
                  value: e.id,
                }))}
              />
            </FormRow>

            <FormRow>
              <SelectField
                label="Self Assessment Rating"
                value={selfRating}
                onChange={(e) => setSelfRating(e.target.value)}
                options={[
                  { label: '5.0 - Role Model / Top Tier', value: '5.0' },
                  { label: '4.5 - Outstanding Exceeds Expectations', value: '4.5' },
                  { label: '4.0 - Meets All High Expectations', value: '4.0' },
                  { label: '3.5 - Satisfactory', value: '3.5' },
                  { label: '3.0 - Development Plan Required', value: '3.0' },
                ]}
              />
              <SelectField
                label="Manager Appraisal Rating"
                value={managerRating}
                onChange={(e) => setManagerRating(e.target.value)}
                options={[
                  { label: '5.0 - Role Model / Top Tier', value: '5.0' },
                  { label: '4.8 - High Performer', value: '4.8' },
                  { label: '4.0 - Consistent Contributor', value: '4.0' },
                  { label: '3.5 - Developing Competency', value: '3.5' },
                ]}
              />
            </FormRow>

            <TextareaField
              label="Self Assessment Commentary"
              rows={2}
              value={selfComments}
              onChange={(e) => setSelfComments(e.target.value)}
              placeholder="Self-reflection on accomplishments, contributions, and challenges."
            />

            <TextareaField
              label="Manager Commentary & Growth Goals"
              required
              rows={3}
              value={managerComments}
              onChange={(e) => setManagerComments(e.target.value)}
              placeholder="Key accomplishments, technical strengths, and focus areas for next cycle."
            />
          </div>
        </form>
      </HrmsModal>
    </div>
  );
};
