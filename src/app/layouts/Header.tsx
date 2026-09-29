import React from 'react';
import { Badge } from '@shared/components';
import { activeDemoTenant } from '@core/tenant';
import { demoSession } from '@core/auth';

export const Header: React.FC = () => {
  return (
    <header
      style={{
        height: '68px',
        borderBottom: '1px solid var(--border-subtle)',
        backgroundColor: 'var(--bg-surface)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 28px',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        backdropFilter: 'blur(8px)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'var(--brand-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '16px',
              boxShadow: 'var(--brand-glow)',
            }}
          >
            O
          </div>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 700, fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}>
              ONE ENTERPRISE CLOUD
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              Official Frontend Architecture & Team Collaboration Model
            </div>
          </div>
        </div>

        <div style={{ height: '24px', width: '1px', backgroundColor: 'var(--border-subtle)' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Badge variant="core">Integration Baseline: dev</Badge>
          <Badge variant="neutral">Demo Mode (No Real APIs)</Badge>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Active Tenant Scope</div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
            {activeDemoTenant.tenantName}
          </div>
        </div>

        <div style={{ height: '28px', width: '1px', backgroundColor: 'var(--border-subtle)' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-elevated)',
              border: '1px solid var(--border-hover)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 600,
              fontSize: '13px',
              color: 'var(--brand-primary)',
            }}
          >
            CA
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600 }}>{demoSession.name}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Enterprise Admin</div>
          </div>
        </div>
      </div>
    </header>
  );
};
