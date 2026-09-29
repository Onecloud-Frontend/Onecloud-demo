import React from 'react';
import { PageHeader } from '../PageHeader';
import { Card } from '../Card';
import { Badge } from '../Badge';
import {
  User,
  Users,
  Compass,
  FolderCode,
  FileCode,
  Target,
  Layers,
  Database,
  Square,
  Link2,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import {
  DeveloperWorkspaceDefinition,
  getWorkspaceDefinition
} from './workspaceDefinitions';

export interface DeveloperStarterPageProps {
  developerId?: string;
  route?: string;
  domain?: string;
  domainCategory?: string;
  teamBadgeVariant?: 'team-a' | 'team-b' | 'team-c' | 'team-d';
  capability?: string;
  description?: string;
  scopeItems?: string[];
  typeLocation?: string;
  serviceLocation?: string;
  mockLocation?: string;
  workspace?: Partial<DeveloperWorkspaceDefinition>;
}

export const DeveloperStarterPage: React.FC<DeveloperStarterPageProps> = ({
  developerId,
  route,
  domain,
  domainCategory,
  teamBadgeVariant,
  capability,
  description,
  scopeItems,
  workspace
}) => {
  // Retrieve authoritative workspace definition from centralized registry
  const lookupKey = developerId || route || '';
  const registered = getWorkspaceDefinition(lookupKey);

  // Merge definition with fallbacks for complete robustness
  const resolvedDeveloperId = workspace?.developerId || registered?.developerId || developerId || 'DEV-01';
  const resolvedTeam = workspace?.team || registered?.team || 'Domain Development Team';
  const resolvedDomain = workspace?.domain || registered?.domain || domain || 'Enterprise';
  const resolvedCategory = workspace?.domainCategory || registered?.domainCategory || domainCategory || resolvedDomain;
  const resolvedBadgeVariant = workspace?.teamBadgeVariant || registered?.teamBadgeVariant || teamBadgeVariant || 'team-a';
  const resolvedTitle = workspace?.title || registered?.title || capability || 'Developer Workspace';
  const resolvedArea = workspace?.area || registered?.area || resolvedTitle;
  const resolvedRoute = workspace?.route || registered?.route || route || '/workspace';
  const resolvedExpectedPage = workspace?.expectedPage || registered?.expectedPage || 'AssignedPage.tsx';
  const resolvedFeatureLocation = workspace?.featureLocation || registered?.featureLocation || `src/features/${resolvedDomain.toLowerCase()}/`;
  const resolvedDescription = workspace?.description || registered?.description || description || 'Developer implementation workspace for assigned business capabilities.';
  const resolvedResponsibility = workspace?.responsibility || registered?.responsibility || `Implement the ${resolvedArea} frontend experience.`;
  const resolvedBullets = workspace?.responsibilityBullets || registered?.responsibilityBullets || [
    `Build the primary UI for ${resolvedArea}`,
    'Design responsive tables, forms, and workflow actions',
    'Integrate with canonical business types and domain mock layer'
  ];
  const resolvedScope = workspace?.scope || registered?.scope || (scopeItems || []).map((item, idx) => ({
    id: String(idx + 1).padStart(2, '0'),
    title: item,
    description: `Functional implementation slice for ${item}.`
  }));
  const resolvedCanonicalTypes = workspace?.canonicalTypes || registered?.canonicalTypes || [
    { name: `${resolvedDomain}Entity`, description: `Canonical ${resolvedDomain} business domain type` }
  ];
  const resolvedChecklist = workspace?.checklist || registered?.checklist || [
    'Page layout and responsive structure',
    'Primary page header and contextual breadcrumb',
    'Domain data table and filter controls',
    'Creation and editing drawer / modal workflows',
    'Form validation and field error messaging',
    'Loading state (LoadingState)',
    'Empty state (EmptyState)',
    'Error state (ErrorState)',
    'Responsive behavior across desktop and mobile',
    'Accessibility and keyboard navigation',
    'Integration with canonical business types',
    'Integration with existing mock layer'
  ];
  const resolvedDependencies = workspace?.dependencies || registered?.dependencies || [
    { entity: 'Employee', ownerDomain: 'HRMS', purpose: 'User and audit actor reference' }
  ];
  const resolvedNotes = workspace?.notes || registered?.notes || [
    `Use canonical ${resolvedDomain} types from @features/${resolvedDomain.toLowerCase()}/types.`,
    'Use existing shared components from @shared/components.',
    'Use the existing mock infrastructure for frontend development.',
    `Keep business logic within the ${resolvedDomain} feature boundary.`,
    'Do not create duplicate shared entities or competing type definitions.',
    'Keep backend integration separate from UI implementation.',
    'Follow the common developer guide and team guide.'
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* 1. Page Header */}
      <PageHeader
        breadcrumb={resolvedCategory}
        title={resolvedTitle}
        description={resolvedDescription}
        badge={
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
            <Badge variant="neutral">{resolvedDomain}</Badge>
            <Badge variant={resolvedBadgeVariant}>{resolvedDeveloperId}</Badge>
            <Badge variant="neutral">Implementation Workspace</Badge>
          </div>
        }
      />

      {/* Main Grid Layout: Two Balanced Columns */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
          gap: '24px',
          alignItems: 'start',
        }}
      >
        {/* Left Column: Ownership, Responsibility, Scope & Cross-Domain Dependencies */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* 2. Developer Ownership Card */}
          <Card
            title="Developer Ownership"
            subtitle="Assigned engineer and domain boundary specifications"
            accent={resolvedBadgeVariant}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '8px', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <User size={14} /> Developer
                </span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontFamily: 'monospace' }}>
                  {resolvedDeveloperId}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '8px', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Users size={14} /> Team
                </span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                  {resolvedTeam}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '8px', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={14} /> Area
                </span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                  {resolvedArea}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '8px', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Compass size={14} /> Route
                </span>
                <span style={{ color: 'var(--brand-primary)', fontWeight: 600, fontFamily: 'monospace' }}>
                  {resolvedRoute}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '8px', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                  <Target size={14} /> Responsibility
                </span>
                <span style={{ color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  {resolvedResponsibility}
                </span>
              </div>
            </div>
          </Card>

          {/* 3. Implementation Responsibility Card */}
          <Card
            title="Your Responsibility"
            subtitle="Core user journeys and capabilities to implement"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-primary)' }}>
                Build the frontend experience for:
              </div>
              <ul style={{ margin: 0, paddingLeft: '0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {resolvedBullets.map((bullet, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                      fontSize: '13px',
                      color: 'var(--text-secondary)',
                      lineHeight: '1.5',
                    }}
                  >
                    <CheckCircle2
                      size={16}
                      style={{ color: 'var(--brand-primary)', marginTop: '2px', flexShrink: 0 }}
                    />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          {/* 4. Functional Scope Card */}
          <Card
            title="Functional Scope"
            subtitle="Approved functional feature slices assigned to this route"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {resolvedScope.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    gap: '14px',
                    alignItems: 'flex-start',
                    padding: '12px 14px',
                    backgroundColor: 'var(--bg-elevated)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <div
                    style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      fontFamily: 'monospace',
                      color: 'var(--brand-primary)',
                      backgroundColor: 'rgba(99, 102, 241, 0.1)',
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-sm)',
                      flexShrink: 0,
                    }}
                  >
                    {item.id}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '3px' }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                      {item.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* 8. Cross-Domain Dependencies Card */}
          <Card
            title="Cross-Domain Dependencies"
            subtitle="Entities consumed across business domain boundaries"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {resolvedDependencies.map((dep, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    backgroundColor: 'var(--bg-elevated)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '13px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Link2 size={15} style={{ color: 'var(--text-muted)' }} />
                    <span style={{ fontWeight: 600, fontFamily: 'monospace', color: 'var(--text-primary)' }}>
                      {dep.entity}
                    </span>
                    {dep.purpose && (
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        — {dep.purpose}
                      </span>
                    )}
                  </div>
                  <Badge variant="neutral">Owner: {dep.ownerDomain}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column: Technical Ownership, Canonical Types, Checklist & Notes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* 5. Route & Technical Ownership Card */}
          <Card
            title="Route & Technical Ownership"
            subtitle="File locations and architecture placement in source tree"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <Compass size={16} style={{ color: 'var(--text-muted)', marginTop: '2px', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Route</div>
                  <div style={{ fontFamily: 'monospace', fontSize: '12.5px', color: 'var(--brand-primary)' }}>
                    {resolvedRoute}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <FileCode size={16} style={{ color: 'var(--text-muted)', marginTop: '2px', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Expected Page</div>
                  <div style={{ fontFamily: 'monospace', fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                    {resolvedExpectedPage}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <Layers size={16} style={{ color: 'var(--text-muted)', marginTop: '2px', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Domain & Team</div>
                  <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                    {resolvedDomain} — {resolvedTeam}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <FolderCode size={16} style={{ color: 'var(--text-muted)', marginTop: '2px', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Feature Location</div>
                  <div style={{ fontFamily: 'monospace', fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                    {resolvedFeatureLocation}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* 6. Canonical Types Card */}
          <Card
            title="Canonical Types"
            subtitle="Centrally governed TypeScript business contracts for this screen"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {resolvedCanonicalTypes.map((t, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '3px',
                    padding: '10px 12px',
                    backgroundColor: 'var(--bg-elevated)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Database size={13} style={{ color: 'var(--brand-primary)' }} />
                    <span style={{ fontWeight: 600, fontFamily: 'monospace', fontSize: '13px', color: 'var(--text-primary)' }}>
                      {t.name}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.4', paddingLeft: '21px' }}>
                    {t.description}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* 7. Implementation Checklist Card */}
          <Card
            title="Implementation Checklist"
            subtitle="Development roadmap and standard quality gates"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {resolvedChecklist.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '13px',
                    color: 'var(--text-secondary)',
                    padding: '4px 0',
                  }}
                >
                  <Square
                    size={16}
                    style={{
                      color: 'var(--border-subtle)',
                      flexShrink: 0,
                    }}
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* 9. Development Notes Card */}
          <Card
            title="Development Notes"
            subtitle="Architecture constraints and best practice guidelines"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {resolvedNotes.map((note, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    fontSize: '12.5px',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.45',
                  }}
                >
                  <ShieldCheck
                    size={15}
                    style={{ color: 'var(--brand-primary)', marginTop: '2px', flexShrink: 0 }}
                  />
                  <span>{note}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
