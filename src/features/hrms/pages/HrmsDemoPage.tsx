import React from 'react';
import { PageHeader, Card, Button, Badge } from '@shared/components';
import { activeDemoTenant } from '@core/tenant';

export const HrmsDemoPage: React.FC = () => {
  return (
    <div>
      <PageHeader
        breadcrumb="Domain Feature Shell / Team B"
        title="Human Resource Management System (HRMS)"
        description="Demonstration domain view owned by Team B. Demonstrates independent feature velocity, team isolation, and adherence to shared design system contracts."
        badge={<Badge variant="team-b">Team B: hrms</Badge>}
        actions={
          <Button variant="team-b" size="sm">
            Simulate Employee Directory
          </Button>
        }
      />

      <div className="grid-cols-3" style={{ marginBottom: '24px' }}>
        <Card title="Workforce Domain Scope" accent="team-b" badge={<Badge variant="team-b">Team B Scope</Badge>}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '8px' }}>
            Domains maintained by Team B:
          </p>
          <ul style={{ paddingLeft: '20px', fontSize: '13px', color: 'var(--text-secondary)' }}>
            <li><code>hrms</code> (Workforce & Leave)</li>
            <li><code>crm</code> (Sales & Pipelines)</li>
            <li><code>workflow</code> (Approvals & Process)</li>
            <li><code>notifications</code> (In-App & Email)</li>
            <li><code>calendar</code> (Scheduling & Events)</li>
          </ul>
        </Card>

        <Card title="Tenant Boundary" accent="team-b" badge={<Badge variant="core">Core Context</Badge>}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '12px' }}>
            Workforce partition bound to tenant:
          </p>
          <div style={{ padding: '12px', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontWeight: 600 }}>{activeDemoTenant.tenantName}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Tenant ID: {activeDemoTenant.tenantId}</div>
            <div style={{ fontSize: '12px', color: 'var(--team-b-accent)', marginTop: '4px' }}>Region: {activeDemoTenant.region}</div>
          </div>
        </Card>

        <Card title="Domain Autonomy" accent="team-b" badge={<Badge variant="success">Autonomous</Badge>}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '8px' }}>
            Parallel Velocity Guarantee:
          </p>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Team B commits to <code>feature/team-b-hrms-*</code> without risking merge conflicts with Team A or Team C.
          </p>
        </Card>
      </div>

      <Card
        title="Team B Boundary Guidelines"
        accent="team-b"
        footer={
          <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Git branch: <code>feature/team-b-hrms-demo</code> → Pull Request → <code>dev</code>
          </div>
        }
      >
        <p style={{ color: 'var(--text-secondary)', marginBottom: '14px', fontSize: '14px' }}>
          When real product work begins, Team B engineers will implement HRMS forms, state machines, and queries
          inside <code>src/features/hrms/</code>. Business rules regarding employee lifecycle remain encapsulated here
          and are never placed in <code>shared/</code> or <code>core/</code>.
        </p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Badge variant="team-b">Encapsulated Business Logic</Badge>
          <Badge variant="neutral">Independent PR Velocity</Badge>
          <Badge variant="neutral">Shared Component Reuse</Badge>
        </div>
      </Card>
    </div>
  );
};
