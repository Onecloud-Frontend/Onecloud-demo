import React, { useState } from 'react';

export const Footer: React.FC = () => {
  const [modalText, setModalText] = useState<string | null>(null);

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-subtle)',
        backgroundColor: 'var(--bg-surface)',
        padding: '14px 28px',
        fontSize: '12px',
        color: 'var(--text-muted)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span>© 2026 <strong>One Enterprise Cloud</strong></span>
        <span>•</span>
        <span style={{ color: 'var(--text-secondary)' }}>Version: 1.0.0</span>
        <span>•</span>
        <span style={{ color: 'var(--text-secondary)' }}>Environment: Development</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          type="button"
          onClick={() => setModalText('Enterprise Privacy Policy: Confidential multi-tenant data governance.')}
          style={{ color: 'var(--text-muted)', fontSize: '12px' }}
        >
          Privacy Policy
        </button>
        <span>•</span>
        <button
          type="button"
          onClick={() => setModalText('Enterprise Terms of Service apply.')}
          style={{ color: 'var(--text-muted)', fontSize: '12px' }}
        >
          Terms of Service
        </button>
        <span>•</span>
        <button
          type="button"
          onClick={() => setModalText('Support: Contact your system administrator.')}
          style={{ color: 'var(--text-muted)', fontSize: '12px' }}
        >
          Support
        </button>
      </div>

      {modalText && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={() => setModalText(null)}
        >
          <div
            style={{
              maxWidth: '440px',
              padding: '24px',
              backgroundColor: 'var(--bg-card)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ fontWeight: 600, fontSize: '15px', marginBottom: '10px' }}>Notice</div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>{modalText}</p>
            <button
              onClick={() => setModalText(null)}
              style={{
                padding: '6px 16px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--brand-primary)',
                color: '#fff',
                fontSize: '13px',
                fontWeight: 600,
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};
