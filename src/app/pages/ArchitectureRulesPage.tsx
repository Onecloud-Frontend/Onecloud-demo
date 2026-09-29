import React from 'react';
import { PageHeader, Card, Badge } from '@shared/components';

export const ArchitectureRulesPage: React.FC = () => {
  return (
    <div>
      <PageHeader
        breadcrumb="Architectural Integrity"
        title="Dependency Direction & Boundary Rules"
        description="Formal dependency rules preventing circular dependencies, business logic leaks into shared layers, and cross-team coupling."
        badge={<Badge variant="core">Rule Enforcement</Badge>}
      />

      <div className="grid-cols-2" style={{ marginBottom: '24px' }}>
        <Card title="Allowed Dependency Directions" accent="brand">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13.5px' }}>
            <div style={{ padding: '12px', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontWeight: 600, color: '#34d399' }}>app → core</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '12.5px' }}>
                Application layer initializes core services (auth, tenant resolution, HTTP interceptors).
              </div>
            </div>

            <div style={{ padding: '12px', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontWeight: 600, color: '#34d399' }}>app → shared</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '12.5px' }}>
                Application shell & layouts use shared UI components (Button, Header, PageHeader).
              </div>
            </div>

            <div style={{ padding: '12px', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontWeight: 600, color: '#34d399' }}>app → features</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '12.5px' }}>
                Application router imports feature entry pages to assemble the unified application.
              </div>
            </div>

            <div style={{ padding: '12px', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontWeight: 600, color: '#34d399' }}>features → core</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '12.5px' }}>
                Business features read tenant ID, auth session, and consume standardized API client types.
              </div>
            </div>

            <div style={{ padding: '12px', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontWeight: 600, color: '#34d399' }}>features → shared</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '12.5px' }}>
                Business features consume reusable domain-agnostic UI widgets, formatters, and common types.
              </div>
            </div>
          </div>
        </Card>

        <Card title="Strictly Prohibited Violations" accent="team-a">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13.5px' }}>
            <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontWeight: 600, color: '#ef4444' }}>✕ core → features</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '12.5px' }}>
                Core technical infrastructure must never know about specific business domains.
              </div>
            </div>

            <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontWeight: 600, color: '#ef4444' }}>✕ shared → features</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '12.5px' }}>
                Shared components must remain completely domain-agnostic. No business logic allowed in shared.
              </div>
            </div>

            <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontWeight: 600, color: '#ef4444' }}>✕ features → app</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '12.5px' }}>
                Features cannot import app layouts, router definitions, or application orchestration.
              </div>
            </div>

            <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontWeight: 600, color: '#ef4444' }}>✕ Deep Cross-Feature Imports</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '12.5px' }}>
                <code>features/hrms</code> must NOT deeply import internals from <code>features/finance</code>.
              </div>
            </div>

            <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontWeight: 600, color: '#ef4444' }}>✕ Direct Database / Bypass Core API</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '12.5px' }}>
                Features must never attempt direct DB calls or bypass core API transport security.
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
