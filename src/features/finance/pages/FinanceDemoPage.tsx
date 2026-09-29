import React from 'react';
import { PageHeader, Card, Button, Badge } from '@shared/components';
import { activeDemoTenant } from '@core/tenant';

export const FinanceDemoPage: React.FC = () => {
  return (
    <div>
      <PageHeader
        breadcrumb="Domain Feature Shell / Team C"
        title="Financial Ledger & Accounts (Finance)"
        description="Demonstration domain view owned by Team C. Highlights complex systems operations, multi-currency ledger structures, and strict boundary discipline."
        badge={<Badge variant="team-c">Team C: finance</Badge>}
        actions={
          <Button variant="team-c" size="sm">
            Simulate Reconciliation
          </Button>
        }
      />

      <div className="grid-cols-3" style={{ marginBottom: '24px' }}>
        <Card title="Operations & Systems Scope" accent="team-c" badge={<Badge variant="team-c">Team C Scope</Badge>}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '8px' }}>
            Domains maintained by Team C:
          </p>
          <ul style={{ paddingLeft: '20px', fontSize: '13px', color: 'var(--text-secondary)' }}>
            <li><code>finance</code> & <code>erp</code></li>
            <li><code>dms</code> & <code>integrations</code></li>
            <li><code>search</code> & <code>monitoring</code></li>
            <li><code>security</code>, <code>developer</code>, <code>portals</code>, <code>ai</code></li>
          </ul>
        </Card>

        <Card title="Tenant Financial Partition" accent="team-c" badge={<Badge variant="core">Core Context</Badge>}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '12px' }}>
            Ledger context resolved through Core:
          </p>
          <div style={{ padding: '12px', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontWeight: 600 }}>{activeDemoTenant.tenantName}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Tenant: {activeDemoTenant.tenantId}</div>
            <div style={{ fontSize: '12px', color: 'var(--team-c-accent)', marginTop: '4px' }}>Base Currency: USD (Demo)</div>
          </div>
        </Card>

        <Card title="Zero Cross-Domain Mutation" accent="team-c" badge={<Badge variant="success">Compliant</Badge>}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '8px' }}>
            Contract Boundary:
          </p>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Finance does not directly mutate HRMS or Subscription models. Any cross-domain correlation happens through
            approved orchestration or event contracts.
          </p>
        </Card>
      </div>

      <Card
        title="Team C Boundary Guidelines"
        accent="team-c"
        footer={
          <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Git branch: <code>feature/team-c-finance-demo</code> → Pull Request → <code>dev</code>
          </div>
        }
      >
        <p style={{ color: 'var(--text-secondary)', marginBottom: '14px', fontSize: '14px' }}>
          Team C maintains mission-critical operational and enterprise infrastructure domains. Team C engineers work
          in feature branches like <code>feature/team-c-finance-reports</code> and open PRs against <code>dev</code>.
          Zero direct pushes to <code>dev</code> or <code>main</code> are permitted.
        </p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Badge variant="team-c">Strict Boundary Discipline</Badge>
          <Badge variant="neutral">Financial Data Isolation</Badge>
          <Badge variant="neutral">Review Required</Badge>
        </div>
      </Card>
    </div>
  );
};
