import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeader, Card, Button, Badge } from '@shared/components';

export const OverviewPage: React.FC = () => {
  return (
    <div>
      <PageHeader
        breadcrumb="Executive Architecture Briefing"
        title="One Enterprise Cloud Frontend Architecture"
        description="Official React + TypeScript + Vite architecture demonstration showcasing domain-based feature separation, 3-team parallel velocity, and rigorous Git workflow guardrails."
        badge={<Badge variant="core">Architecture Demo</Badge>}
        actions={
          <div style={{ display: 'flex', gap: '8px' }}>
            <Link to="/git/workflow">
              <Button variant="secondary" size="sm">Git Workflow</Button>
            </Link>
            <Link to="/teams/ownership">
              <Button variant="primary" size="sm">Team Matrix</Button>
            </Link>
          </div>
        }
      />

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
              Top-level bootstrap, application config, route definitions, layout scaffolds, guards, and cross-cutting error boundaries.
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
              19 autonomous business domain folders (HRMS, CRM, Finance, ERP, etc.) owned in parallel by 3 frontend teams.
            </p>
          </Card>

          <Card title="SHARED" accent="brand" badge={<Badge variant="shared">Domain-Agnostic</Badge>}>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
              <code>src/shared/</code>
            </p>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Strictly domain-agnostic UI components (Button, Card, PageHeader), generic utility functions, hooks, and shared types.
            </p>
          </Card>
        </div>
      </div>

      {/* Three-Team Parallel Velocity Model */}
      <div style={{ marginBottom: '28px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 600, fontFamily: 'var(--font-display)', marginBottom: '14px' }}>
          3-Team Parallel Development Model
        </h2>
        <div className="grid-cols-3">
          <Card
            title="Team A"
            accent="team-a"
            badge={<Badge variant="team-a">Platform & Revenue</Badge>}
            action={<Link to="/features/platform-admin"><Button variant="team-a" size="sm">Explore Demo</Button></Link>}
          >
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '10px' }}>
              Example Domain Ownership:
            </p>
            <ul style={{ paddingLeft: '18px', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
              <li><code>platform-admin</code></li>
              <li><code>subscription</code></li>
              <li><code>revenue</code></li>
              <li><code>reporting</code></li>
            </ul>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Active Branch: <code>feature/team-a-platform-admin-demo</code>
            </div>
          </Card>

          <Card
            title="Team B"
            accent="team-b"
            badge={<Badge variant="team-b">Workforce & Collab</Badge>}
            action={<Link to="/features/hrms"><Button variant="team-b" size="sm">Explore Demo</Button></Link>}
          >
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '10px' }}>
              Example Domain Ownership:
            </p>
            <ul style={{ paddingLeft: '18px', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
              <li><code>hrms</code></li>
              <li><code>crm</code></li>
              <li><code>workflow</code></li>
              <li><code>notifications</code>, <code>calendar</code></li>
            </ul>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Active Branch: <code>feature/team-b-hrms-demo</code>
            </div>
          </Card>

          <Card
            title="Team C"
            accent="team-c"
            badge={<Badge variant="team-c">Operations & Systems</Badge>}
            action={<Link to="/features/finance"><Button variant="team-c" size="sm">Explore Demo</Button></Link>}
          >
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '10px' }}>
              Example Domain Ownership:
            </p>
            <ul style={{ paddingLeft: '18px', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
              <li><code>finance</code> & <code>erp</code></li>
              <li><code>dms</code> & <code>integrations</code></li>
              <li><code>search</code> & <code>monitoring</code></li>
              <li><code>security</code>, <code>developer</code>, <code>portals</code>, <code>ai</code></li>
            </ul>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Active Branch: <code>feature/team-c-finance-demo</code>
            </div>
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
              <li><code>features → shared</code> (Domains consume shared buttons, cards)</li>
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
              <li><code>features/a → features/b</code> (No deep cross-feature imports)</li>
              <li>Business domain logic placed inside <code>shared</code> or <code>core</code></li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};
