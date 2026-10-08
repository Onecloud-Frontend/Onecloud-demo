import React, { useState } from 'react';
import { Candidate, Interview, Employee, JobPosting } from '../../types';
import { HrmsModal } from '../common/HrmsModal';
import { TextInput, SelectField, FormRow } from '../common/HrmsFormFields';

interface InterviewSchedulingModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: Candidate | null;
  employees: Employee[];
  postings: JobPosting[];
  onSchedule: (interview: Omit<Interview, 'id'>) => void;
}

export const InterviewSchedulingModal: React.FC<InterviewSchedulingModalProps> = ({
  isOpen,
  onClose,
  candidate,
  employees,
  postings,
  onSchedule,
}) => {
  if (!candidate) return null;

  const [round, setRound] = useState('Technical Architecture & Systems Design');
  const [interviewerId, setInterviewerId] = useState(employees[0]?.id || 'emp-1');
  const [jobPostingId, setJobPostingId] = useState(postings[0]?.id || 'post-1');
  const [startTime, setStartTime] = useState('2026-10-15T14:00');
  const [endTime, setEndTime] = useState('2026-10-15T15:00');
  const [meetingLink, setMeetingLink] = useState('https://meet.onecloud.corp/int-session');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSchedule({
      candidateId: candidate.id,
      jobPostingId,
      interviewRound: round,
      interviewerIds: [interviewerId],
      scheduledStartTime: startTime,
      scheduledEndTime: endTime,
      meetingLink,
      status: 'SCHEDULED',
    });
    onClose();
  };

  return (
    <HrmsModal
      isOpen={isOpen}
      onClose={onClose}
      title={`Schedule Interview: ${candidate.firstName} ${candidate.lastName}`}
      subtitle={`Candidate ID: ${candidate.id} • Experience: ${candidate.totalExperienceYears} Years`}
      maxWidth="600px"
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
            form="interview-form"
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
            Confirm & Send Calendar Invite
          </button>
        </div>
      }
    >
      <form id="interview-form" onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <TextInput
            label="Interview Round Title"
            required
            value={round}
            onChange={(e) => setRound(e.target.value)}
            placeholder="e.g. Technical Coding / Systems Design"
          />

          <FormRow>
            <SelectField
              label="Lead Interviewer"
              required
              value={interviewerId}
              onChange={(e) => setInterviewerId(e.target.value)}
              options={employees.map((e) => ({
                label: `${e.firstName} ${e.lastName} (${e.designation})`,
                value: e.id,
              }))}
            />
            <SelectField
              label="Target Job Posting"
              required
              value={jobPostingId}
              onChange={(e) => setJobPostingId(e.target.value)}
              options={postings.map((p) => ({ label: p.postingTitle, value: p.id }))}
            />
          </FormRow>

          <FormRow>
            <TextInput
              label="Scheduled Start Time"
              type="datetime-local"
              required
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
            <TextInput
              label="Scheduled End Time"
              type="datetime-local"
              required
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </FormRow>

          <TextInput
            label="Video Conference Meeting URL"
            value={meetingLink}
            onChange={(e) => setMeetingLink(e.target.value)}
            placeholder="https://meet.onecloud.corp/room-id"
          />
        </div>
      </form>
    </HrmsModal>
  );
};
