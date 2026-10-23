import React, { useState } from 'react';
import { Button, Input } from '@shared/components';
import { X } from 'lucide-react';
import { ModalBackdrop } from './RecruitmentBadges';
import type { MockRecruitmentCandidate } from '@mock/hrms/recruitmentMockApi';
import type { OfferLetter } from '@features/hrms/types';

export interface CreateOfferModalProps {
  candidate: MockRecruitmentCandidate | null;
  onClose: () => void;
  onSubmitOffer: (offer: OfferLetter) => void;
}

export const CreateOfferModal: React.FC<CreateOfferModalProps> = ({
  candidate,
  onClose,
  onSubmitOffer,
}) => {
  const [offerSalary, setOfferSalary] = useState('150000');
  const [offerJoiningDate, setOfferJoiningDate] = useState('2026-11-15');
  const [offerExpiryDate, setOfferExpiryDate] = useState('2026-10-25');
  const [offerTerms, setOfferTerms] = useState(
    'Standard full-time employment contract with comprehensive medical coverage, 401(k) retirement match, and 20 days annual PTO.'
  );

  if (!candidate) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const salary = parseFloat(offerSalary);
    const nextId = `off-${Date.now().toString().slice(-4)}`;

    const newOffer: OfferLetter = {
      id: nextId,
      candidateId: candidate.id,
      candidateName: `${candidate.firstName} ${candidate.lastName}`,
      jobTitle: candidate.appliedRole,
      departmentId: candidate.departmentId,
      offeredSalary: isNaN(salary) ? 120000 : salary,
      joiningDate: offerJoiningDate,
      expiryDate: offerExpiryDate,
      status: 'ISSUED',
      issuedBy: 'Priya Sharma (HR Director)',
      issuedAt: new Date().toISOString(),
      acceptedAt: null,
      terms: offerTerms,
    };

    onSubmitOffer(newOffer);
    onClose();
  };

  return (
    <ModalBackdrop onClose={onClose}>
      <div
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--team-c-border)',
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
              Issue Official Offer Letter
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Candidate: <strong>{candidate.firstName} {candidate.lastName}</strong> ({candidate.appliedRole})
            </p>
          </div>
          <button onClick={onClose} style={{ color: 'var(--text-muted)' }}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <Input
            label="Offered Annual Base Salary ($ / yr) *"
            type="number"
            value={offerSalary}
            onChange={e => setOfferSalary(e.target.value)}
          />

          <div className="grid-cols-2">
            <Input
              label="Target Joining Date *"
              type="date"
              value={offerJoiningDate}
              onChange={e => setOfferJoiningDate(e.target.value)}
            />

            <Input
              label="Offer Expiry Date *"
              type="date"
              value={offerExpiryDate}
              onChange={e => setOfferExpiryDate(e.target.value)}
            />
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
              Employment Terms & Benefits Summary
            </label>
            <textarea
              rows={3}
              value={offerTerms}
              onChange={e => setOfferTerms(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: 'var(--bg-input)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '10px 14px',
                fontSize: '13px',
                fontFamily: 'inherit',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <Button variant="outline" size="sm" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Generate & Issue Offer
            </Button>
          </div>
        </form>
      </div>
    </ModalBackdrop>
  );
};
