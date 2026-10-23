import React, { useState } from 'react';
import { Button, Input } from '@shared/components';
import { X } from 'lucide-react';
import { ModalBackdrop } from './RecruitmentBadges';
import { RECRUITMENT_DEPARTMENTS } from '@mock/hrms/recruitmentMockApi';
import type { JobRequisition, EmploymentType } from '@features/hrms/types';

export interface CreateRequisitionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitRequisition: (requisition: JobRequisition) => void;
}

export const CreateRequisitionModal: React.FC<CreateRequisitionModalProps> = ({
  isOpen,
  onClose,
  onSubmitRequisition,
}) => {
  const [title, setTitle] = useState('');
  const [departmentId, setDepartmentId] = useState('dept-eng');
  const [positionsCount, setPositionsCount] = useState('1');
  const [employmentType, setEmploymentType] = useState<EmploymentType>('FULL_TIME');
  const [experienceRequired, setExperienceRequired] = useState('3-5 years');
  const [budgetMax, setBudgetMax] = useState('130000');
  const [targetHiringDate, setTargetHiringDate] = useState('2026-12-01');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Job Title is required.');
      return;
    }
    const count = parseInt(positionsCount, 10);
    if (isNaN(count) || count < 1) {
      setError('Headcount positions must be at least 1.');
      return;
    }
    const budget = parseFloat(budgetMax);
    if (isNaN(budget) || budget <= 0) {
      setError('Please provide a valid budget.');
      return;
    }

    const newReq: JobRequisition = {
      id: `req-${Date.now().toString().slice(-4)}`,
      requisitionCode: `REQ-${Math.floor(1000 + Math.random() * 9000)}-DEPT`,
      title: title.trim(),
      departmentId,
      positionsCount: count,
      employmentType,
      experienceRequired,
      budgetMax: budget,
      status: 'OPEN',
      requestedBy: 'Current Hiring Manager',
      approvedBy: 'Priya Sharma (HR Director)',
      targetHiringDate,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onSubmitRequisition(newReq);
    setTitle('');
    setError('');
    onClose();
  };

  return (
    <ModalBackdrop onClose={onClose}>
      <div
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          width: '580px',
          maxWidth: '94vw',
          padding: '24px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)' }}>
              New Departmental Job Requisition
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Create an internal headcount opening and route for VP & HR Director approval.
            </p>
          </div>
          <button onClick={onClose} style={{ color: 'var(--text-muted)' }}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {error && (
            <div
              style={{
                color: 'var(--status-danger)',
                fontSize: '13px',
                padding: '8px',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              ⚠️ {error}
            </div>
          )}

          <Input
            label="Job Position Title *"
            placeholder="e.g. Senior Security Engineer"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <div className="grid-cols-2">
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
                Hiring Department *
              </label>
              <select
                value={departmentId}
                onChange={e => setDepartmentId(e.target.value)}
                style={{
                  width: '100%',
                  backgroundColor: 'var(--bg-input)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '10px 14px',
                  fontSize: '14px',
                }}
              >
                {RECRUITMENT_DEPARTMENTS.filter(d => d.id !== 'dept-all').map(dept => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="Headcount (Positions) *"
              type="number"
              min="1"
              value={positionsCount}
              onChange={e => setPositionsCount(e.target.value)}
            />
          </div>

          <div className="grid-cols-2">
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
                Employment Type *
              </label>
              <select
                value={employmentType}
                onChange={e => setEmploymentType(e.target.value as EmploymentType)}
                style={{
                  width: '100%',
                  backgroundColor: 'var(--bg-input)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '10px 14px',
                  fontSize: '14px',
                }}
              >
                <option value="FULL_TIME">Full-time</option>
                <option value="PART_TIME">Part-time</option>
                <option value="CONTRACT">Contract</option>
                <option value="INTERN">Internship</option>
              </select>
            </div>

            <Input
              label="Required Experience"
              placeholder="e.g. 4-6 years"
              value={experienceRequired}
              onChange={e => setExperienceRequired(e.target.value)}
            />
          </div>

          <div className="grid-cols-2">
            <Input
              label="Maximum Budget CTC ($/yr) *"
              type="number"
              placeholder="140000"
              value={budgetMax}
              onChange={e => setBudgetMax(e.target.value)}
            />

            <Input
              label="Target Hiring Date *"
              type="date"
              value={targetHiringDate}
              onChange={e => setTargetHiringDate(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <Button variant="outline" size="sm" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Submit Requisition
            </Button>
          </div>
        </form>
      </div>
    </ModalBackdrop>
  );
};
