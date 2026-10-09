import React, { useState } from 'react';
import { Department, JobRequisition } from '../../types';
import { HrmsModal } from '../common/HrmsModal';
import { TextInput, SelectField, FormRow } from '../common/HrmsFormFields';

interface RequisitionCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  departments: Department[];
  onSubmit: (req: Omit<JobRequisition, 'id' | 'createdAt' | 'updatedAt' | 'requisitionCode'>) => void;
}

export const RequisitionCreateModal: React.FC<RequisitionCreateModalProps> = ({
  isOpen,
  onClose,
  departments,
  onSubmit,
}) => {
  const [title, setTitle] = useState('');
  const [departmentId, setDepartmentId] = useState(departments[0]?.id || 'dept-1');
  const [positionsCount, setPositionsCount] = useState('2');
  const [employmentType, setEmploymentType] = useState<JobRequisition['employmentType']>('FULL_TIME');
  const [experienceRequired, setExperienceRequired] = useState('4+ Years');
  const [budgetMax, setBudgetMax] = useState('140000');
  const [targetHiringDate, setTargetHiringDate] = useState('2026-11-30');
  const [status, setStatus] = useState<JobRequisition['status']>('OPEN');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const count = Number(positionsCount);
    const budget = Number(budgetMax);

    // Headcount validation
    if (!positionsCount || isNaN(count) || count < 1) {
      setErrorMessage('Headcount validation failed: Positions count must be at least 1.');
      return;
    }

    // Budget validation
    if (!budgetMax || isNaN(budget) || budget < 10000) {
      setErrorMessage('Budget validation failed: Maximum budget must be at least $10,000 per annum.');
      return;
    }

    if (!title) {
      setErrorMessage('Please provide a job requisition title.');
      return;
    }

    onSubmit({
      title,
      departmentId,
      positionsCount: count,
      employmentType,
      experienceRequired,
      budgetMax: budget,
      status,
      requestedBy: 'Engineering Director / VP',
      approvedBy: status === 'OPEN' ? 'Chief Executive Officer' : null,
      targetHiringDate,
    });

    // Reset form
    setTitle('');
    setPositionsCount('2');
    setBudgetMax('140000');
    setErrorMessage(null);
    onClose();
  };

  return (
    <HrmsModal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Departmental Job Requisition"
      subtitle="Define hiring request, validated headcount positions, and annual budget cap."
      maxWidth="680px"
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'transparent',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-subtle)',
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            style={{
              padding: '8px 20px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--brand-primary)',
              color: '#ffffff',
              border: 'none',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Authorize Requisition
          </button>
        </div>
      }
    >
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {errorMessage && (
            <div
              style={{
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#ef4444',
                fontSize: '13px',
                fontWeight: 600,
              }}
            >
              {errorMessage}
            </div>
          )}

          <FormRow>
            <TextInput
              label="Requisition Job Title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Senior Cloud Infrastructure Architect"
            />
            <SelectField
              label="Department"
              value={departmentId}
              onChange={(e) => setDepartmentId(e.target.value)}
              options={departments.map((d) => ({
                label: d.name,
                value: d.id,
              }))}
            />
          </FormRow>

          <FormRow>
            <TextInput
              label="Required Headcount (Positions)"
              type="number"
              min="1"
              max="50"
              required
              value={positionsCount}
              onChange={(e) => setPositionsCount(e.target.value)}
            />
            <SelectField
              label="Employment Type"
              value={employmentType}
              onChange={(e) => setEmploymentType(e.target.value as JobRequisition['employmentType'])}
              options={[
                { label: 'Full Time Regular', value: 'FULL_TIME' },
                { label: 'Contractor', value: 'CONTRACT' },
                { label: 'Part Time', value: 'PART_TIME' },
                { label: 'Internship', value: 'INTERN' },
              ]}
            />
          </FormRow>

          <FormRow>
            <TextInput
              label="Annual Budget Cap ($ Max CTC)"
              type="number"
              min="10000"
              step="5000"
              required
              value={budgetMax}
              onChange={(e) => setBudgetMax(e.target.value)}
            />
            <TextInput
              label="Experience Required"
              value={experienceRequired}
              onChange={(e) => setExperienceRequired(e.target.value)}
              placeholder="e.g. 5+ Years"
            />
          </FormRow>

          <FormRow>
            <TextInput
              label="Target Hiring Date"
              type="date"
              required
              value={targetHiringDate}
              onChange={(e) => setTargetHiringDate(e.target.value)}
            />
            <SelectField
              label="Initial Approval Status"
              value={status}
              onChange={(e) => setStatus(e.target.value as JobRequisition['status'])}
              options={[
                { label: 'OPEN (Approved for Sourcing)', value: 'OPEN' },
                { label: 'DRAFT (Pending Board Sign-off)', value: 'DRAFT' },
              ]}
            />
          </FormRow>
        </div>
      </form>
    </HrmsModal>
  );
};
