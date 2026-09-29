import React, { useState } from 'react';
import { PageHeader, Button, Badge } from '@shared/components';

interface DomainItem {
  name: string;
  team: 'Team A' | 'Team B' | 'Team C';
  cluster: string;
  scopeDescription: string;
  isPrimary?: boolean;
}

const allDomains: DomainItem[] = [
  // Primary Three Team Domains
  { name: 'erp', team: 'Team A', cluster: 'Operations & Logistics (Primary)', scopeDescription: 'Primary Team A domain: supply chain, procurement orders, inventory counts, enterprise resource planning.', isPrimary: true },
  { name: 'crm', team: 'Team B', cluster: 'Customer Operations (Primary)', scopeDescription: 'Primary Team B domain: opportunity pipelines, accounts, leads, deal stages, customer relationship management.', isPrimary: true },
  { name: 'hrms', team: 'Team C', cluster: 'Workforce Management (Primary)', scopeDescription: 'Primary Team C domain: employee directory, attendance, leaves, organization chart, human resource management.', isPrimary: true },

  // Supporting / Other Domains
  { name: 'platform-admin', team: 'Team A', cluster: 'Platform & Governance', scopeDescription: 'Tenant lifecycle, global admin settings, license assignment.' },
  { name: 'subscription', team: 'Team A', cluster: 'Commercial Management', scopeDescription: 'Tier management, add-on feature entitlements, seat caps.' },
  { name: 'revenue', team: 'Team A', cluster: 'Commercial Management', scopeDescription: 'Billing lifecycle, automated invoices, payment gateway sync.' },
  { name: 'reporting', team: 'Team A', cluster: 'Business Intelligence', scopeDescription: 'Cross-cloud executive reporting, scheduled exports, KPI graphs.' },

  { name: 'workflow', team: 'Team B', cluster: 'Business Automation', scopeDescription: 'Multi-step approval matrices, workflow triggers, task routing.' },
  { name: 'notifications', team: 'Team B', cluster: 'Communications', scopeDescription: 'In-app notification tray, message broadcast, preferences.' },
  { name: 'calendar', team: 'Team B', cluster: 'Workforce Scheduling', scopeDescription: 'Enterprise shared events, resource and room reservations.' },

  { name: 'finance', team: 'Team C', cluster: 'Financial Systems', scopeDescription: 'General ledger, AP/AR, multi-currency valuation, tax.' },
  { name: 'dms', team: 'Team C', cluster: 'Document Management', scopeDescription: 'Enterprise document vault, versioning, access audits.' },
  { name: 'integrations', team: 'Team C', cluster: 'Ecosystem & APIs', scopeDescription: 'Webhooks, third-party connectors, ERP bridge relays.' },
  { name: 'search', team: 'Team C', cluster: 'Enterprise Discovery', scopeDescription: 'Federated indexing, global search bar, autocomplete.' },
  { name: 'monitoring', team: 'Team C', cluster: 'Operations & Reliability', scopeDescription: 'Health telemetry, API latency boards, error rate monitors.' },
  { name: 'security', team: 'Team C', cluster: 'Identity & Compliance', scopeDescription: 'SSO configuration, session auditing, role policies.' },
  { name: 'developer', team: 'Team C', cluster: 'Developer Platform', scopeDescription: 'API token generation, SDK docs, webhook sandbox testing.' },
  { name: 'portals', team: 'Team C', cluster: 'External Engagement', scopeDescription: 'Vendor portal, client self-service, partner portal.' },
  { name: 'ai', team: 'Team C', cluster: 'Cognitive Services', scopeDescription: 'Enterprise AI assistants, OCR parsing, workflow co-pilot.' },
];

export const TeamOwnershipPage: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState<string>('ALL');

  const filteredDomains = selectedTeam === 'ALL'
    ? allDomains
    : allDomains.filter(d => d.team === selectedTeam);

  return (
    <div>
      <PageHeader
        breadcrumb="Organizational Governance"
        title="Three-Team Ownership Matrix"
        description="Official domain allocation across the three frontend teams. Highlights Team A (ERP), Team B (CRM), and Team C (HRMS) as primary focus areas."
        badge={<Badge variant="core">3 Teams • 19 Domains</Badge>}
        actions={
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              variant={selectedTeam === 'ALL' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setSelectedTeam('ALL')}
            >
              All Domains (19)
            </Button>
            <Button
              variant={selectedTeam === 'Team A' ? 'team-a' : 'outline'}
              size="sm"
              onClick={() => setSelectedTeam('Team A')}
            >
              Team A (ERP Focus)
            </Button>
            <Button
              variant={selectedTeam === 'Team B' ? 'team-b' : 'outline'}
              size="sm"
              onClick={() => setSelectedTeam('Team B')}
            >
              Team B (CRM Focus)
            </Button>
            <Button
              variant={selectedTeam === 'Team C' ? 'team-c' : 'outline'}
              size="sm"
              onClick={() => setSelectedTeam('Team C')}
            >
              Team C (HRMS Focus)
            </Button>
          </div>
        }
      />

      {/* Primary Teams Banner */}
      <div
        style={{
          padding: '18px 22px',
          backgroundColor: 'rgba(99, 102, 241, 0.08)',
          border: '1px solid rgba(99, 102, 241, 0.25)',
          borderRadius: 'var(--radius-lg)',
          marginBottom: '24px',
        }}
      >
        <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-primary)', marginBottom: '6px' }}>
          Official Three-Team Domain Allocation:
        </div>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '13px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Badge variant="team-a">Team A</Badge>
            <span><strong>ERP</strong> (<code>src/features/erp/</code>)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Badge variant="team-b">Team B</Badge>
            <span><strong>CRM</strong> (<code>src/features/crm/</code>)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Badge variant="team-c">Team C</Badge>
            <span><strong>HRMS</strong> (<code>src/features/hrms/</code>)</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filteredDomains.map((domain) => {
          const badgeVariant = domain.team === 'Team A' ? 'team-a' : domain.team === 'Team B' ? 'team-b' : 'team-c';
          return (
            <div
              key={domain.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                backgroundColor: domain.isPrimary ? 'var(--bg-elevated)' : 'var(--bg-card)',
                border: domain.isPrimary ? `1px solid var(--${badgeVariant}-border)` : '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                gap: '16px',
              }}
            >
              <div style={{ minWidth: '220px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <code style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    src/features/{domain.name}
                  </code>
                  {domain.isPrimary && (
                    <Badge variant="success" size="sm">Primary Focus</Badge>
                  )}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {domain.cluster}
                </div>
              </div>

              <div style={{ flex: 1, fontSize: '13px', color: 'var(--text-secondary)' }}>
                {domain.scopeDescription}
              </div>

              <div>
                <Badge variant={badgeVariant}>{domain.team}</Badge>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
