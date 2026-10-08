import React from 'react';
import { Badge, Button, Card } from '@shared/components';
import { CheckCircle2, FileText, UserPlus, Shield } from 'lucide-react';
import { formatCurrency, formatDate } from '@shared/utils/formatters';
import { OfferStatusBadge } from './RecruitmentBadges';
import type { OfferLetter } from '@features/hrms/types';

export interface OfferLettersViewProps {
  offers: OfferLetter[];
  onPreviewOfferLetterhead: (offer: OfferLetter) => void;
  onAcceptOffer: (offerId: string) => void;
  onGoToOnboarding: (offer: OfferLetter) => void;
}

export const OfferLettersView: React.FC<OfferLettersViewProps> = ({
  offers,
  onPreviewOfferLetterhead,
  onAcceptOffer,
  onGoToOnboarding,
}) => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>
            Offer Letter Issuance & Insurance Tracking
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Issue official compensation packages, monitor candidate acceptance timelines, track health insurance benefits, and transition finalized hires into Onboarding.
          </p>
        </div>
      </div>

      {/* Insurance Benefits Overview Banner */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '12px',
          marginBottom: '20px',
        }}
      >
        <div
          style={{
            padding: '12px 14px',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <Shield size={20} style={{ color: 'var(--team-c-accent)' }} />
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Corporate Health Cover</div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>$500,000 Group Medical</div>
          </div>
        </div>

        <div
          style={{
            padding: '12px 14px',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <Shield size={20} style={{ color: 'var(--status-success)' }} />
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Group Term Life</div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>3x Annual Compensation</div>
          </div>
        </div>

        <div
          style={{
            padding: '12px 14px',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <Shield size={20} style={{ color: 'var(--status-warning)' }} />
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Accident & Disability</div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>24/7 Global Protection</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {offers.map(off => {
          const isAccepted = off.status === 'ACCEPTED';
          const isIssued = off.status === 'ISSUED';

          return (
            <Card
              key={off.id}
              accent={isAccepted ? 'team-c' : isIssued ? 'team-b' : 'none'}
              footer={
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    flexWrap: 'wrap',
                    gap: '10px',
                  }}
                >
                  <div style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>
                    Issued by: <strong style={{ color: 'var(--text-secondary)' }}>{off.issuedBy}</strong> on{' '}
                    {formatDate(off.issuedAt)}
                  </div>

                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<FileText size={14} />}
                      onClick={() => onPreviewOfferLetterhead(off)}
                    >
                      View Official Letterhead
                    </Button>

                    {isIssued && (
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<CheckCircle2 size={14} />}
                        onClick={() => onAcceptOffer(off.id)}
                      >
                        Simulate Acceptance
                      </Button>
                    )}

                    {isAccepted && (
                      <Badge variant="success" size="md">
                        ✓ Accepted on {off.acceptedAt ? formatDate(off.acceptedAt) : 'Recent'}
                      </Badge>
                    )}

                    {/* Go to Onboarding Action: Displays success message / notification */}
                    <Button
                      variant="primary"
                      size="sm"
                      icon={<UserPlus size={14} />}
                      onClick={() => onGoToOnboarding(off)}
                    >
                      Go to Onboarding
                    </Button>
                  </div>
                </div>
              }
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h4 style={{ fontSize: '17px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {off.candidateName}
                    </h4>
                    <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>• {off.jobTitle}</span>
                    <OfferStatusBadge status={off.status} />
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      gap: '20px',
                      marginTop: '8px',
                      fontSize: '13.5px',
                      color: 'var(--text-secondary)',
                      flexWrap: 'wrap',
                    }}
                  >
                    <span>
                      Annual Offered CTC:{' '}
                      <strong style={{ color: 'var(--text-primary)', fontSize: '15px' }}>
                        {formatCurrency(off.offeredSalary)}
                      </strong>
                    </span>
                    <span>
                      Joining Date: <strong>{off.joiningDate}</strong>
                    </span>
                    <span>
                      Acceptance Deadline: <strong>{off.expiryDate}</strong>
                    </span>
                    <span>
                      Insurance: <strong style={{ color: 'var(--team-c-accent)' }}>100% Employer Funded</strong>
                    </span>
                  </div>
                </div>
              </div>

              {off.terms && (
                <div
                  style={{
                    marginTop: '12px',
                    padding: '10px 14px',
                    backgroundColor: 'var(--bg-elevated)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '12.5px',
                    color: 'var(--text-muted)',
                  }}
                >
                  {off.terms}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};
