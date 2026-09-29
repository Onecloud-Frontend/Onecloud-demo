import React from 'react';
import { PageHeader, Card, Button, Badge } from '@shared/components';
import { demoSession } from '@core/auth';
import { activeDemoTenant } from '@core/tenant';

export const PlatformAdminDemoPage: React.FC = () => {
  return (
    <div>
      <PageHeader
        breadcrumb="Domain Feature Shell / Team A"
        title="Platform Administration"
        description="Demonstration domain view owned by Team A. Illustrates clean feature isolation, consuming shared components and core session context without deep cross-domain coupling."
        badge={<Badge variant="team-a">Team A: platform-admin</Badge>}
        actions={
          <Button variant="team-a" size="sm">
            Simulate Admin Action
          </Button>
        }
      />

      <div className="grid-cols-3" style={{ marginBottom: '24px' }}>
        <Card title="Active Tenant Scope" accent="team-a" badge={<Badge variant="success">Active</Badge>}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '12px' }}>
            Resolved via Core Tenant Context:
          </p>
          <div style={{ padding: '12px', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontWeight: 600 }}>{activeDemoTenant.tenantName}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>ID: {activeDemoTenant.tenantId}</div>
            <div style={{ fontSize: '12px', color: 'var(--team-a-accent)', marginTop: '4px' }}>Tier: {activeDemoTenant.tier}</div>
          </div>
        </Card>

        <Card title="Authenticated Operator" accent="team-a" badge={<Badge variant="core">Core Auth</Badge>}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '12px' }}>
            Session context injected from Core Auth:
          </p>
          <div style={{ padding: '12px', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontWeight: 600 }}>{demoSession.name}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{demoSession.email}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Roles: {demoSession.roles.join(', ')}
            </div>
          </div>
        </Card>

        <Card title="Team A Boundary Info" accent="team-a" badge={<Badge variant="team-a">Ownership</Badge>}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '8px' }}>
            Assigned domains in Team A scope:
          </p>
          <ul style={{ paddingLeft: '20px', fontSize: '13px', color: 'var(--text-secondary)' }}>
            <li><code>platform-admin</code> (Current)</li>
            <li><code>subscription</code></li>
            <li><code>revenue</code></li>
            <li><code>reporting</code></li>
          </ul>
        </Card>
      </div>

      <Card
        title="Team A Development Isolation Principles"
        accent="team-a"
        footer={
          <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Git branch: <code>feature/team-a-platform-admin-demo</code> → Pull Request → <code>dev</code>
          </div>
        }
      >
        <p style={{ color: 'var(--text-secondary)', marginBottom: '14px', fontSize: '14px' }}>
          This page represents an architectural demonstration. Team A engineers work exclusively inside
          <code>src/features/platform-admin/</code>. They consume approved components from <code>@shared</code> and
          technical infrastructure from <code>@core</code>.
        </p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Badge variant="team-a">Isolated State</Badge>
          <Badge variant="neutral">No Cross-Feature Imports</Badge>
          <Badge variant="neutral">Zero Direct DB Access</Badge>
          <Badge variant="neutral">Core API Standardized</Badge>
        </div>
      </Card>
    </div>
  );
};
