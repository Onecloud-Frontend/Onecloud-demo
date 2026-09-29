import React, { useState } from 'react';
import { PageHeader, Button, Badge } from '@shared/components';

interface DomainItem {
  name: string;
  team: 'Team A' | 'Team B' | 'Team C';
  cluster: string;
  scopeDescription: string;
}

const allDomains: DomainItem[] = [
  { name: 'platform-admin', team: 'Team A', cluster: 'Platform & Governance', scopeDescription: 'Tenant lifecycle, global admin settings, license assignment.' },
  { name: 'subscription', team: 'Team A', cluster: 'Commercial Management', scopeDescription: 'Tier management, add-on feature entitlements, seat caps.' },
  { name: 'revenue', team: 'Team A', cluster: 'Commercial Management', scopeDescription: 'Billing lifecycle, automated invoices, payment gateway sync.' },
  { name: 'reporting', team: 'Team A', cluster: 'Business Intelligence', scopeDescription: 'Cross-cloud executive reporting, scheduled exports, KPI graphs.' },

  { name: 'hrms', team: 'Team B', cluster: 'Workforce Management', scopeDescription: 'Employee directory, attendance, leaves, onboarding checklists.' },
  { name: 'crm', team: 'Team B', cluster: 'Customer Operations', scopeDescription: 'Deals pipeline, lead tracking, customer account contacts.' },
  { name: 'workflow', team: 'Team B', cluster: 'Business Automation', scopeDescription: 'Multi-step approval matrices, workflow triggers, task routing.' },
  { name: 'notifications', team: 'Team B', cluster: 'Communications', scopeDescription: 'In-app notification tray, message broadcast, preferences.' },
  { name: 'calendar', team: 'Team B', cluster: 'Workforce Management', scopeDescription: 'Enterprise shared events, resource and room reservations.' },

  { name: 'erp', team: 'Team C', cluster: 'Operations & Logistics', scopeDescription: 'Supply chain, inventory tracking, procurement orders.' },
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
        description="Clear domain allocation across 19 business domains. Fosters parallel velocity while eliminating ownership ambiguity."
        badge={<Badge variant="core">19 Domains</Badge>}
        actions={
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              variant={selectedTeam === 'ALL' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setSelectedTeam('ALL')}
            >
              All (19)
            </Button>
            <Button
              variant={selectedTeam === 'Team A' ? 'team-a' : 'outline'}
              size="sm"
              onClick={() => setSelectedTeam('Team A')}
            >
              Team A (4)
            </Button>
            <Button
              variant={selectedTeam === 'Team B' ? 'team-b' : 'outline'}
              size="sm"
              onClick={() => setSelectedTeam('Team B')}
            >
              Team B (5)
            </Button>
            <Button
              variant={selectedTeam === 'Team C' ? 'team-c' : 'outline'}
              size="sm"
              onClick={() => setSelectedTeam('Team C')}
            >
              Team C (10)
            </Button>
          </div>
        }
      />

      {/* Critical Disclaimer Card */}
      <div
        style={{
          padding: '16px 20px',
          backgroundColor: 'rgba(99, 102, 241, 0.08)',
          border: '1px solid rgba(99, 102, 241, 0.25)',
          borderRadius: 'var(--radius-md)',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <span style={{ fontSize: '20px' }}>ℹ️</span>
        <div style={{ fontSize: '13.5px', color: 'var(--text-secondary)' }}>
          <strong style={{ color: 'var(--text-primary)' }}>Demonstration Ownership Notice: </strong>
          Team allocations shown here are illustrative models for 3-team parallel development and can be adjusted
          by the project lead as business needs evolve. The architectural domain boundaries remain permanent regardless of team assignment.
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
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                gap: '16px',
              }}
            >
              <div style={{ minWidth: '220px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <code style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    src/features/{domain.name}
                  </code>
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
