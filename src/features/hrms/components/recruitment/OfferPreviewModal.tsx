import React from 'react';
import { Button } from '@shared/components';
import { formatCurrency, formatDate } from '@shared/utils/formatters';
import { ModalBackdrop } from './RecruitmentBadges';
import type { OfferLetter } from '@features/hrms/types';

export interface OfferPreviewModalProps {
  offer: OfferLetter | null;
  onClose: () => void;
}

export const OfferPreviewModal: React.FC<OfferPreviewModalProps> = ({ offer, onClose }) => {
  if (!offer) return null;

  return (
    <ModalBackdrop onClose={onClose}>
      <div
        style={{
          backgroundColor: '#ffffff',
          color: '#0f172a',
          borderRadius: 'var(--radius-lg)',
          width: '760px',
          maxWidth: '94vw',
          maxHeight: '92vh',
          overflowY: 'auto',
          padding: '40px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)',
          fontFamily: 'serif',
        }}
      >
        {/* Enterprise Letterhead */}
        <div
          style={{
            borderBottom: '2px solid #0f172a',
            paddingBottom: '16px',
            marginBottom: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <div>
            <h1
              style={{
                fontSize: '24px',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                margin: 0,
                fontFamily: 'sans-serif',
              }}
            >
              ONE ENTERPRISE CLOUD CORP
            </h1>
            <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'sans-serif', marginTop: '2px' }}>
              Global Headquarters • 100 Enterprise Way, Suite 400 • San Francisco, CA 94105
            </div>
          </div>
          <div style={{ textAlign: 'right', fontSize: '11px', color: '#64748b', fontFamily: 'sans-serif' }}>
            <div>HUMAN RESOURCES & TALENT ACQUISITION</div>
            <div>Ref Code: {offer.id.toUpperCase()}</div>
          </div>
        </div>

        {/* Letter Date & Recipient */}
        <div style={{ fontSize: '14px', lineHeight: 1.6, marginBottom: '24px', fontFamily: 'sans-serif' }}>
          <div>Date: {formatDate(offer.issuedAt)}</div>
          <div style={{ marginTop: '14px', fontWeight: 600 }}>Dear {offer.candidateName},</div>
        </div>

        {/* Body */}
        <div
          style={{
            fontSize: '14px',
            lineHeight: 1.8,
            color: '#1e293b',
            fontFamily: 'serif',
            marginBottom: '24px',
          }}
        >
          <p style={{ marginBottom: '14px' }}>
            On behalf of <strong>One Enterprise Cloud Corp</strong>, we are thrilled to offer you the position of{' '}
            <strong>{offer.jobTitle}</strong>. We were exceptionally impressed by your background,
            technical problem solving during our interview rounds, and alignment with our collaborative culture.
          </p>

          <div
            style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              padding: '16px 20px',
              margin: '20px 0',
              fontFamily: 'sans-serif',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', fontSize: '13px' }}>
              <div>
                <span style={{ color: '#64748b' }}>Position Title:</span> <strong>{offer.jobTitle}</strong>
              </div>
              <div>
                <span style={{ color: '#64748b' }}>Annual Base Compensation:</span>{' '}
                <strong style={{ color: '#059669', fontSize: '15px' }}>
                  {formatCurrency(offer.offeredSalary)}
                </strong>
              </div>
              <div>
                <span style={{ color: '#64748b' }}>Anticipated Joining Date:</span>{' '}
                <strong>{offer.joiningDate}</strong>
              </div>
              <div>
                <span style={{ color: '#64748b' }}>Offer Acceptance Deadline:</span>{' '}
                <strong>{offer.expiryDate}</strong>
              </div>
            </div>
          </div>

          <p style={{ marginBottom: '14px' }}>{offer.terms}</p>

          <p>
            To accept this offer, please sign below and return this executed letter prior to{' '}
            <strong>{offer.expiryDate}</strong>. Upon receipt, your employee profile will be
            automatically initialized within our Human Resource Management System (HRMS).
          </p>
        </div>

        {/* Signature Block */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '40px',
            marginTop: '40px',
            paddingTop: '20px',
            borderTop: '1px dashed #cbd5e1',
            fontFamily: 'sans-serif',
          }}
        >
          <div>
            <div style={{ fontSize: '15px', fontWeight: 700, fontFamily: 'cursive', color: '#1e293b' }}>
              Priya Sharma
            </div>
            <div style={{ width: '180px', height: '1px', backgroundColor: '#94a3b8', margin: '4px 0 8px 0' }} />
            <div style={{ fontSize: '12px', fontWeight: 600 }}>Priya Sharma</div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>VP of Global Human Resources</div>
          </div>

          <div>
            <div style={{ fontSize: '15px', fontWeight: 700, fontFamily: 'cursive', color: '#1e293b' }}>
              {offer.status === 'ACCEPTED' ? offer.candidateName : ''}
            </div>
            <div style={{ width: '180px', height: '1px', backgroundColor: '#94a3b8', margin: '4px 0 8px 0' }} />
            <div style={{ fontSize: '12px', fontWeight: 600 }}>{offer.candidateName}</div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>
              {offer.status === 'ACCEPTED'
                ? `Accepted on ${formatDate(offer.acceptedAt || new Date().toISOString())}`
                : 'Candidate Acceptance Signature'}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '10px',
            marginTop: '30px',
            fontFamily: 'sans-serif',
          }}
        >
          <Button variant="outline" size="sm" onClick={onClose}>
            Close Preview
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              window.print();
            }}
          >
            Print / Save PDF
          </Button>
        </div>
      </div>
    </ModalBackdrop>
  );
};
