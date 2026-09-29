import React from 'react';
import { PageHeader, Card, Button, Badge } from '@shared/components';
import { activeDemoTenant } from '@core/tenant';
import { useAuth } from '@core/auth';
import { Briefcase, ShieldAlert, GitBranch, CheckCircle2 } from 'lucide-react';

export const CrmHomePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div>
      <PageHeader
        breadcrumb="Business Domain / Team B"
        title="Customer Relationship Management (CRM)"
        description="Official CRM Team Workspace. This base shell establishes the clean architectural foundation for Team B without any premature business logic."
        badge={<Badge variant="team-b">Team B: crm</Badge>}
        actions={
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button variant="team-b" size="sm" icon={<GitBranch size={15} />}>
              Branch: feature/team-b-crm-demo
            </Button>
          </div>
        }
      />

      {/* Domain Workspace Banner */}
      <div
        style={{
          padding: '20px 24px',
          backgroundColor: 'var(--team-b-bg)',
          border: '1px solid var(--team-b-border)',
          borderRadius: 'var(--radius-lg)',
          marginBottom: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              backgroundColor: 'var(--team-b-accent)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)',
            }}
          >
            <Briefcase size={24} />
          </div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
              Team B — CRM Workspace Foundation
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Base directory: <code>src/features/crm/</code> • Scope: Customer Relationship Management
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Badge variant="success">Base Shell Ready</Badge>
          <Badge variant="team-b">Team B Dedicated</Badge>
        </div>
      </div>

      {/* Information Grid */}
      <div className="grid-cols-3" style={{ marginBottom: '24px' }}>
        <Card title="Team Ownership" accent="team-b" badge={<Badge variant="team-b">Team B</Badge>}>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
            Team B is the sole owner of <code>src/features/crm/</code>. All CRM developments take place exclusively here.
          </p>
          <div style={{ padding: '12px', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)', fontSize: '12.5px' }}>
            <div><strong>Active User:</strong> {user?.name}</div>
            <div style={{ color: 'var(--text-muted)' }}>Tenant: {activeDemoTenant.tenantName}</div>
          </div>
        </Card>

        <Card title="Feature Folder Anatomy" accent="team-b" badge={<Badge variant="core">Clean Architecture</Badge>}>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
            Standard domain subdirectories:
          </p>
          <div style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
            ├── pages/ (CrmHomePage.tsx)<br />
            ├── components/ (Domain widgets)<br />
            ├── hooks/ (Domain hooks)<br />
            ├── services/ (API connectors via core)<br />
            ├── types/ & constants/<br />
            └── routes/ (Route contracts)
          </div>
        </Card>

        <Card title="Boundary Protection" accent="team-b" badge={<Badge variant="success">Enforced</Badge>}>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '10px' }}>
            Strict feature isolation rules:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12.5px', color: 'var(--text-secondary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={14} style={{ color: 'var(--status-success)' }} />
              <span>Zero imports from ERP or HRMS</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={14} style={{ color: 'var(--status-success)' }} />
              <span>Consumes @shared UI primitives</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={14} style={{ color: 'var(--status-success)' }} />
              <span>Consumes @core technical services</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Architecture Disclaimer */}
      <Card
        title="Zero Premature Business Functionality Notice"
        accent="brand"
        footer={
          <div style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>
            Git Flow: <code>dev</code> → <code>feature/team-b-crm-demo</code> → Pull Request Review → <code>dev</code>
          </div>
        }
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
          <ShieldAlert size={22} style={{ color: 'var(--status-warning)', flexShrink: 0, marginTop: '2px' }} />
          <div>
            <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginBottom: '10px', lineHeight: 1.6 }}>
              In accordance with project guidelines, this phase is strictly dedicated to establishing the <strong>common application shell and clean feature foundations</strong>.
              Actual CRM business modules (leads, contacts, opportunity pipelines, customer accounts, campaigns) will be developed in subsequent phases by Team B.
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Badge variant="neutral">No Fake APIs</Badge>
              <Badge variant="neutral">No Mock Endpoints</Badge>
              <Badge variant="team-b">Team B Foundation Active</Badge>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
