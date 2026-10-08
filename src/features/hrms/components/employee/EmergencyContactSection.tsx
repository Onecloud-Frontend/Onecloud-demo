import React from 'react';
import { EmergencyContact } from '../../types';
import { Phone, Mail, UserCheck, ShieldAlert } from 'lucide-react';

interface EmergencyContactSectionProps {
  contact: EmergencyContact;
  onEdit?: () => void;
}

export const EmergencyContactSection: React.FC<EmergencyContactSectionProps> = ({
  contact,
  onEdit,
}) => {
  return (
    <div
      style={{
        backgroundColor: 'var(--bg-elevated)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        padding: '18px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              backgroundColor: 'rgba(239, 68, 68, 0.12)',
              color: 'var(--status-danger)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ShieldAlert size={16} />
          </div>
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
              Emergency Contact
            </h4>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              Point of contact in case of workplace emergencies
            </span>
          </div>
        </div>

        {onEdit && (
          <button
            type="button"
            onClick={onEdit}
            style={{
              fontSize: '12px',
              color: 'var(--brand-primary)',
              fontWeight: 600,
              padding: '4px 8px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              backgroundColor: 'rgba(99, 102, 241, 0.08)',
              cursor: 'pointer',
            }}
          >
            Edit Contact
          </button>
        )}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '14px',
        }}
      >
        <div>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
            Contact Name
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)', fontWeight: 500 }}>
            <UserCheck size={14} style={{ color: 'var(--text-secondary)' }} />
            <span>{contact.name || 'Not provided'}</span>
          </div>
        </div>

        <div>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
            Relationship
          </span>
          <span
            style={{
              display: 'inline-block',
              padding: '2px 8px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'rgba(148, 163, 184, 0.1)',
              color: 'var(--text-secondary)',
              fontSize: '12px',
              fontWeight: 500,
            }}
          >
            {contact.relationship || 'Unspecified'}
          </span>
        </div>

        <div>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
            Primary Phone
          </span>
          {contact.phone ? (
            <a
              href={`tel:${contact.phone}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--brand-primary)',
                fontSize: '13px',
                fontWeight: 500,
              }}
            >
              <Phone size={14} />
              {contact.phone}
            </a>
          ) : (
            <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>—</span>
          )}
        </div>

        {contact.alternatePhone && (
          <div>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              Alternate Phone
            </span>
            <a
              href={`tel:${contact.alternatePhone}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--text-secondary)',
                fontSize: '13px',
              }}
            >
              <Phone size={14} />
              {contact.alternatePhone}
            </a>
          </div>
        )}

        {contact.email && (
          <div>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              Email Address
            </span>
            <a
              href={`mailto:${contact.email}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--brand-primary)',
                fontSize: '13px',
              }}
            >
              <Mail size={14} />
              {contact.email}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
