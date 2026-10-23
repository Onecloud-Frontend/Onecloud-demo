import React, { useState, useEffect } from 'react';
import { Button, Input } from '@shared/components';
import { X } from 'lucide-react';
import { ModalBackdrop } from './RecruitmentBadges';
import type { MockRecruitmentCandidate, MockRecruitmentInterview } from '@mock/hrms/recruitmentMockApi';

export interface ScheduleInterviewModalProps {
  isOpen: boolean;
  candidates: MockRecruitmentCandidate[];
  initialCandidateId?: string;
  onClose: () => void;
  onSubmitSchedule: (interview: MockRecruitmentInterview) => void;
}

export const ScheduleInterviewModal: React.FC<ScheduleInterviewModalProps> = ({
  isOpen,
  candidates,
  initialCandidateId = '',
  onClose,
  onSubmitSchedule,
}) => {
  const [candidateId, setCandidateId] = useState(initialCandidateId);
  const [interviewRound, setInterviewRound] = useState('Technical Round 1: Coding & Architecture');
  const [interviewDate, setInterviewDate] = useState('2026-10-12T14:00');
  const [interviewers, setInterviewers] = useState('Arjun Mehta (VP Eng)');
  const [meetingLink, setMeetingLink] = useState('https://meet.google.com/one-cloud-interview');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialCandidateId) {
      setCandidateId(initialCandidateId);
    }
  }, [initialCandidateId]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateId) {
      setError('Please select a candidate.');
      return;
    }

    const cand = candidates.find(c => c.id === candidateId);
    if (!cand) return;

    const nextId = `int-${Date.now().toString().slice(-4)}`;
    const newInt: MockRecruitmentInterview = {
      id: nextId,
      candidateId: cand.id,
      candidateName: `${cand.firstName} ${cand.lastName}`,
      candidateRole: cand.appliedRole,
      departmentName: cand.departmentName,
      jobPostingId: 'post-001',
      interviewRound,
      interviewerIds: [interviewers],
      scheduledStartTime: new Date(interviewDate).toISOString(),
      scheduledEndTime: new Date(new Date(interviewDate).getTime() + 60 * 60 * 1000).toISOString(),
      meetingLink,
      status: 'SCHEDULED',
    };

    onSubmitSchedule(newInt);
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
          width: '560px',
          maxWidth: '94vw',
          padding: '24px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)' }}>
              Schedule Interview Round
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Assign interview panelists, select interview round rubric, and generate meeting coordinates.
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
              Candidate *
            </label>
            <select
              value={candidateId}
              onChange={e => setCandidateId(e.target.value)}
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
              <option value="">Select Candidate...</option>
              {candidates
                .filter(c => c.status !== 'HIRED' && c.status !== 'REJECTED')
                .map(c => (
                  <option key={c.id} value={c.id}>
                    {c.firstName} {c.lastName} — {c.appliedRole} ({c.status})
                  </option>
                ))}
            </select>
          </div>

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
              Interview Round & Focus *
            </label>
            <select
              value={interviewRound}
              onChange={e => setInterviewRound(e.target.value)}
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
              <option value="Round 1: Technical Coding & Algorithms">Round 1: Technical Coding & Algorithms</option>
              <option value="Round 2: System Architecture & Design">Round 2: System Architecture & Design</option>
              <option value="Round 3: Domain Specialization & Case Study">Round 3: Domain Specialization & Case Study</option>
              <option value="Round 4: Executive Leadership & Culture Alignment">Round 4: Executive Leadership & Culture Alignment</option>
            </select>
          </div>

          <div className="grid-cols-2">
            <Input
              label="Date & Time *"
              type="datetime-local"
              value={interviewDate}
              onChange={e => setInterviewDate(e.target.value)}
            />

            <Input
              label="Assigned Interviewer(s) *"
              placeholder="e.g. Arjun Mehta, Kunal Shah"
              value={interviewers}
              onChange={e => setInterviewers(e.target.value)}
            />
          </div>

          <Input
            label="Video Meeting URL"
            placeholder="https://meet.google.com/..."
            value={meetingLink}
            onChange={e => setMeetingLink(e.target.value)}
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <Button variant="outline" size="sm" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Confirm Schedule
            </Button>
          </div>
        </form>
      </div>
    </ModalBackdrop>
  );
};
