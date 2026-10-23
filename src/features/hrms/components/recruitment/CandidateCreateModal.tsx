import React, { useState } from 'react';
import { Candidate, JobPosting } from '../../types';
import { HrmsModal } from '../common/HrmsModal';
import { TextInput, SelectField, FormRow, TextareaField } from '../common/HrmsFormFields';

interface CandidateCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  postings: JobPosting[];
  onSubmit: (candidate: Omit<Candidate, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export const CandidateCreateModal: React.FC<CandidateCreateModalProps> = ({
  isOpen,
  onClose,
  postings,
  onSubmit,
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [currentCompany, setCurrentCompany] = useState('');
  const [totalExperienceYears, setTotalExperienceYears] = useState('3');
  const [source, setSource] = useState('Direct Portal');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !phone) {
      alert('Please fill out all required applicant fields.');
      return;
    }

    onSubmit({
      firstName,
      lastName,
      email,
      phone,
      currentCompany: currentCompany || 'Independent / Freelancer',
      totalExperienceYears: Number(totalExperienceYears) || 0,
      resumeUrl: notes || 'https://drive.google.com/recruitment/resumes/candidate.pdf',
      status: 'NEW',
      source,
      appliedDate: new Date().toISOString().split('T')[0],
    });

    // Reset form
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setCurrentCompany('');
    setTotalExperienceYears('3');
    setNotes('');
    onClose();
  };

  return (
    <HrmsModal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Job Applicant"
      subtitle="Register an applicant into the ATS recruitment pipeline (Stage: NEW)"
      maxWidth="650px"
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
            Submit Application
          </button>
        </div>
      }
    >
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <FormRow>
            <TextInput
              label="First Name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="e.g. Alex"
            />
            <TextInput
              label="Last Name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="e.g. Vance"
            />
          </FormRow>

          <FormRow>
            <TextInput
              label="Email Address"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex.vance@example.com"
            />
            <TextInput
              label="Phone Number"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (555) 234-5678"
            />
          </FormRow>

          <FormRow>
            <TextInput
              label="Current Company"
              value={currentCompany}
              onChange={(e) => setCurrentCompany(e.target.value)}
              placeholder="e.g. Stripe, Amazon, or Freelance"
            />
            <TextInput
              label="Total Experience (Years)"
              type="number"
              min="0"
              max="40"
              value={totalExperienceYears}
              onChange={(e) => setTotalExperienceYears(e.target.value)}
            />
          </FormRow>

          <FormRow>
            <SelectField
              label="Target Position"
              options={postings.map((p) => ({
                label: `${p.postingTitle} (${p.location})`,
                value: p.id,
              }))}
            />
            <SelectField
              label="Application Source"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              options={[
                { label: 'Direct Portal', value: 'Direct Portal' },
                { label: 'LinkedIn', value: 'LinkedIn' },
                { label: 'Employee Referral', value: 'Employee Referral' },
                { label: 'Indeed', value: 'Indeed' },
                { label: 'Career Fair / Campus', value: 'Career Fair / Campus' },
              ]}
            />
          </FormRow>

          <TextareaField
            label="Resume Links or Candidate Summary"
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Key skills, portfolio/GitHub link, or preliminary notes."
          />
        </div>
      </form>
    </HrmsModal>
  );
};
