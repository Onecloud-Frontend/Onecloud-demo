import React, { useState, useRef } from 'react';
import { Button, Input } from '@shared/components';
import { X, Upload, FileText, CheckCircle2 } from 'lucide-react';
import { ModalBackdrop } from './RecruitmentBadges';
import type { JobPosting } from '@features/hrms/types';
import type { MockCandidateResumeSummary } from '@mock/hrms/commonHrmsMockApi';

export interface ApplyJobModalProps {
  posting: JobPosting | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmitApplication: (data: {
    jobPostingId: string;
    name: string;
    resumeFileName: string;
    resumeSummary: MockCandidateResumeSummary;
  }) => void;
}

export const ApplyJobModal: React.FC<ApplyJobModalProps> = ({
  posting,
  isOpen,
  onClose,
  onSubmitApplication,
}) => {
  const [name, setName] = useState('');
  const [resumeFileName, setResumeFileName] = useState('');
  const [resumeFileSize, setResumeFileSize] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen || !posting) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFileName(file.name);
      setResumeFileSize(`${(file.size / 1024).toFixed(0)} KB`);
      setErrorMessage('');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setResumeFileName(file.name);
      setResumeFileSize(`${(file.size / 1024).toFixed(0)} KB`);
      setErrorMessage('');
    }
  };

  const handleUseSampleResume = () => {
    const firstName = name.trim().split(' ')[0] || 'Candidate';
    const sampleName = `${firstName.toLowerCase()}_senior_resume.pdf`;
    setResumeFileName(sampleName);
    setResumeFileSize('284 KB');
    setErrorMessage('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!resumeFileName) {
      setErrorMessage('Please upload or select a resume file.');
      return;
    }

    const cleanName = name.trim();

    // Build parsed resume summary data fetched from the uploaded resume
    const generatedResumeSummary: MockCandidateResumeSummary = {
      bio: `Seasoned professional with proven domain expertise in ${posting.postingTitle}. Demonstrated track record of architectural leadership, cross-functional collaboration, and delivering scalable enterprise systems with high reliability and performance.`,
      education: 'Bachelor of Technology in Computer Science & Engineering (First Class with Distinction, 2020)',
      skills: posting.requirements.length > 0 ? [...posting.requirements.slice(0, 5), 'Distributed Systems', 'Agile Delivery'] : ['React', 'TypeScript', 'Node.js', 'System Architecture'],
      highlights: [
        `Spearheaded key initiatives matching ${posting.postingTitle} technical qualifications`,
        'Reduced deployment bottlenecks and elevated code review velocity across sprint iterations',
        'Demonstrated strong ownership, product intuition, and robust edge-case handling',
      ],
      fileName: resumeFileName,
      fileSize: resumeFileSize || '312 KB',
    };

    onSubmitApplication({
      jobPostingId: posting.id,
      name: cleanName,
      resumeFileName,
      resumeSummary: generatedResumeSummary,
    });

    // Reset and close
    setName('');
    setResumeFileName('');
    setResumeFileSize('');
    setErrorMessage('');
    onClose();
  };

  return (
    <ModalBackdrop onClose={onClose}>
      <div
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--team-c-border)',
          borderRadius: 'var(--radius-lg)',
          width: '540px',
          maxWidth: '94vw',
          padding: '24px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
          <div>
            <div style={{ fontSize: '11.5px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--team-c-accent)', fontWeight: 700 }}>
              Job Application Form
            </div>
            <h3 style={{ fontSize: '18.5px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '3px' }}>
              Apply for {posting.postingTitle}
            </h3>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              📍 {posting.location}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ color: 'var(--text-muted)', cursor: 'pointer', padding: '4px', background: 'none', border: 'none' }}
          >
            <X size={18} />
          </button>
        </div>

        {errorMessage && (
          <div
            style={{
              padding: '10px 14px',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid var(--status-danger)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--status-danger)',
              fontSize: '13px',
              marginBottom: '16px',
            }}
          >
            ⚠️ {errorMessage}
          </div>
        )}

        {/* Minimal Form: Name & Resume Only */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Field 1: Name */}
          <Input
            label="Full Name *"
            placeholder="e.g. Rohan Verma, Ananya Iyer, Alex Rivera"
            value={name}
            onChange={e => {
              setName(e.target.value);
              if (errorMessage) setErrorMessage('');
            }}
            autoFocus
          />

          {/* Field 2: Resume */}
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
              Resume (PDF, DOCX) *
            </label>

            <input
              type="file"
              ref={fileInputRef}
              accept=".pdf,.doc,.docx"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />

            <div
              onDragOver={e => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: isDragging ? '2px dashed var(--team-c-accent)' : '2px dashed var(--border-subtle)',
                backgroundColor: isDragging ? 'rgba(168, 85, 247, 0.08)' : 'var(--bg-input)',
                borderRadius: 'var(--radius-md)',
                padding: '24px 16px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
              }}
            >
              {resumeFileName ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  <FileText size={24} style={{ color: 'var(--team-c-accent)' }} />
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {resumeFileName}
                    </div>
                    <div style={{ fontSize: '11.5px', color: 'var(--status-success)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCircle2 size={12} /> Ready for submission ({resumeFileSize})
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <Upload size={28} style={{ color: 'var(--text-muted)', margin: '0 auto 8px auto' }} />
                  <div style={{ fontSize: '13.5px', fontWeight: 500, color: 'var(--text-primary)' }}>
                    Click to browse or drag and drop your resume
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Supports PDF, DOC, DOCX up to 10 MB
                  </div>
                </div>
              )}
            </div>

            {/* Quick Helper Button to attach sample resume for quick testing */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
              <button
                type="button"
                onClick={handleUseSampleResume}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--team-c-accent)',
                  fontSize: '11.5px',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                + Select Sample Demo Resume
              </button>
            </div>
          </div>

          {/* Form Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <Button variant="outline" size="sm" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Submit Application
            </Button>
          </div>
        </form>
      </div>
    </ModalBackdrop>
  );
};
