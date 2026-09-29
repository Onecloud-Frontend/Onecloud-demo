import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeader, Card, Button, Badge } from '@shared/components';
import { Boxes, Briefcase, Users as UsersIcon } from 'lucide-react';

export const OverviewPage: React.FC = () => {
  return (
    <div>
      <PageHeader
        breadcrumb="Enterprise Unified Dashboard"
        title="One Enterprise Cloud Architecture & Team Base"
        description="Official React + TypeScript + Vite architecture demonstration establishing the shared application shell and clean feature foundations for three engineering teams."
        badge={<Badge variant="core">Base Shell Active</Badge>}
        actions={
          <div style={{ display: 'flex', gap: '8px' }}>
            <Link to="/git/workflow">
              <Button variant="secondary" size="sm">Git Workflow</Button>
            </Link>
            <Link to="/teams/ownership">
              <Button variant="primary" size="sm">Team Ownership</Button>
            </Link>
          </div>
        }
      />

      {/* Primary 3-Team Foundations */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
              Primary Three-Team Business Foundations
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Dedicated feature folders for concurrent, collision-free development.
            </p>
          </div>
          <Badge variant="success">All 3 Bases Initialized</Badge>
        </div>

        <div className="grid-cols-3">
          {/* Team A -> ERP */}
          <Card
            title="Team A — ERP"
            accent="team-a"
            badge={<Badge variant="team-a">Team A</Badge>}
            action={
              <Link to="/erp">
                <Button variant="team-a" size="sm">Open ERP Base</Button>
              </Link>
            }
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <Boxes size={20} style={{ color: 'var(--team-a-accent)' }} />
              <div style={{ fontWeight: 600, fontSize: '14px' }}>Enterprise Resource Planning</div>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
              Base workspace: <code>src/features/erp/</code>. Ready for procurement, inventory, and supply chain modules.
            </p>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Branch: <code>feature/team-a-erp-demo</code>
            </div>
          </Card>

          {/* Team B -> CRM */}
          <Card
            title="Team B — CRM"
            accent="team-b"
            badge={<Badge variant="team-b">Team B</Badge>}
            action={
              <Link to="/crm">
                <Button variant="team-b" size="sm">Open CRM Base</Button>
              </Link>
            }
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <Briefcase size={20} style={{ color: 'var(--team-b-accent)' }} />
              <div style={{ fontWeight: 600, fontSize: '14px' }}>Customer Relationship Management</div>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
              Base workspace: <code>src/features/crm/</code>. Ready for sales pipelines, customer accounts, and leads.
            </p>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Branch: <code>feature/team-b-crm-demo</code>
            </div>
          </Card>

          {/* Team C -> HRMS */}
          <Card
            title="Team C — HRMS"
            accent="team-c"
            badge={<Badge variant="team-c">Team C</Badge>}
            action={
              <Link to="/hrms">
                <Button variant="team-c" size="sm">Open HRMS Base</Button>
              </Link>
            }
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <UsersIcon size={20} style={{ color: 'var(--team-c-accent)' }} />
              <div style={{ fontWeight: 600, fontSize: '14px' }}>Human Resource Management System</div>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
              Base workspace: <code>src/features/hrms/</code>. Ready for workforce directory, leaves, and attendance.
            </p>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Branch: <code>feature/team-c-hrms-demo</code>
            </div>
          </Card>
        </div>
      </div>

      {/* 4 Architectural Layers Banner */}
      <div style={{ marginBottom: '28px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 600, fontFamily: 'var(--font-display)', marginBottom: '14px' }}>
          Four Architectural Pillars
        </h2>
        <div className="grid-cols-4">
          <Card title="APP" accent="brand" badge={<Badge variant="app">Orchestration</Badge>}>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
              <code>src/app/</code>
            </p>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Top-level bootstrap, application config, routes, layout assembly, Header, Sidebar, Footer, and guards.
            </p>
          </Card>

          <Card title="CORE" accent="brand" badge={<Badge variant="core">Infrastructure</Badge>}>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
              <code>src/core/</code>
            </p>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Shared technical infrastructure: API transport client contracts, auth session, permissions, multi-tenant context, and storage.
            </p>
          </Card>

          <Card title="FEATURES" accent="brand" badge={<Badge variant="success">Business Domains</Badge>}>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
              <code>src/features/</code>
            </p>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Autonomous business domain folders (ERP for Team A, CRM for Team B, HRMS for Team C, plus supporting domains).
            </p>
          </Card>

          <Card title="SHARED" accent="brand" badge={<Badge variant="shared">Domain-Agnostic</Badge>}>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
              <code>src/shared/</code>
            </p>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Strictly domain-agnostic UI primitives (Button, Card, PageHeader, Badge, Input), generic hooks, and utility formatters.
            </p>
          </Card>
        </div>
      </div>

      {/* Dependency Rules Quick Check */}
      <Card
        title="Architectural Boundary Safeguards"
        accent="brand"
        footer={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Enforced via architectural linting and mandatory Pull Request code reviews.
            </span>
            <Link to="/architecture/rules">
              <Button variant="outline" size="sm">View Full Dependency Matrix</Button>
            </Link>
          </div>
        }
      >
        <div className="grid-cols-2">
          <div style={{ padding: '16px', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontWeight: 600, color: 'var(--status-success)', marginBottom: '8px' }}>
              ✓ ALLOWED DEPENDENCY FLOWS
            </div>
            <ul style={{ paddingLeft: '20px', fontSize: '13px', color: 'var(--text-secondary)' }}>
              <li><code>app → core</code> (Orchestration consumes infrastructure)</li>
              <li><code>app → shared</code> (Orchestration consumes shared UI)</li>
              <li><code>app → features</code> (Orchestration routes domain pages)</li>
              <li><code>features → core</code> (Domains consume tenant/auth context)</li>
              <li><code>features → shared</code> (Domains consume shared buttons, inputs)</li>
            </ul>
          </div>

          <div style={{ padding: '16px', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontWeight: 600, color: 'var(--status-danger)', marginBottom: '8px' }}>
              ✕ STRICTLY PROHIBITED FLOWS
            </div>
            <ul style={{ paddingLeft: '20px', fontSize: '13px', color: 'var(--text-secondary)' }}>
              <li><code>core → features</code> (Infrastructure cannot know domains)</li>
              <li><code>shared → features</code> (Shared cannot know domains)</li>
              <li><code>features → app</code> (Domains cannot depend on orchestration)</li>
              <li><code>erp ──✕──&gt; crm / hrms</code> (No cross-feature imports between teams)</li>
              <li>Business domain logic placed inside <code>shared</code> or <code>core</code></li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};
