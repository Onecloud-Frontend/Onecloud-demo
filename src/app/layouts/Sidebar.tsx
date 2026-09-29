import React from 'react';
import { NavLink } from 'react-router-dom';

interface NavItem {
  label: string;
  path: string;
  badge?: string;
  badgeType?: 'team-a' | 'team-b' | 'team-c' | 'core' | 'shared';
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export const Sidebar: React.FC = () => {
  const sections: NavSection[] = [
    {
      title: 'FOUNDATION',
      items: [
        { label: 'Architecture Overview', path: '/' },
        { label: 'Architectural Rules', path: '/architecture/rules' },
        { label: 'Core API Infrastructure', path: '/core/api-overview' },
      ],
    },
    {
      title: 'TEAM COLLABORATION',
      items: [
        { label: 'Team Ownership Matrix', path: '/teams/ownership' },
        { label: 'Git & PR Workflow', path: '/git/workflow' },
      ],
    },
    {
      title: 'FEATURE DOMAIN SHELLS',
      items: [
        { label: 'Team A: Platform Admin', path: '/features/platform-admin', badge: 'Team A', badgeType: 'team-a' },
        { label: 'Team B: HRMS Demo', path: '/features/hrms', badge: 'Team B', badgeType: 'team-b' },
        { label: 'Team C: Finance Demo', path: '/features/finance', badge: 'Team C', badgeType: 'team-c' },
      ],
    },
  ];

  return (
    <aside
      style={{
        width: '270px',
        backgroundColor: 'var(--bg-surface)',
        borderRight: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 16px',
        gap: '24px',
        overflowY: 'auto',
      }}
    >
      {sections.map((sec, idx) => (
        <div key={idx}>
          <div
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: 'var(--text-muted)',
              marginBottom: '10px',
              paddingLeft: '12px',
            }}
          >
            {sec.title}
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            {sec.items.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '9px 12px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '13.5px',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#ffffff' : 'var(--text-secondary)',
                  backgroundColor: isActive ? 'var(--bg-elevated)' : 'transparent',
                  border: isActive ? '1px solid var(--border-hover)' : '1px solid transparent',
                  transition: 'all var(--transition-fast)',
                })}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    style={{
                      fontSize: '10.5px',
                      padding: '1px 7px',
                      borderRadius: 'var(--radius-full)',
                      fontWeight: 600,
                      backgroundColor:
                        item.badgeType === 'team-a'
                          ? 'var(--team-a-bg)'
                          : item.badgeType === 'team-b'
                          ? 'var(--team-b-bg)'
                          : 'var(--team-c-bg)',
                      color:
                        item.badgeType === 'team-a'
                          ? 'var(--team-a-accent)'
                          : item.badgeType === 'team-b'
                          ? 'var(--team-b-accent)'
                          : 'var(--team-c-accent)',
                      border:
                        item.badgeType === 'team-a'
                          ? '1px solid var(--team-a-border)'
                          : item.badgeType === 'team-b'
                          ? '1px solid var(--team-b-border)'
                          : '1px solid var(--team-c-border)',
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      ))}

      <div
        style={{
          marginTop: 'auto',
          padding: '14px',
          backgroundColor: 'var(--bg-card)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
          fontSize: '12px',
          color: 'var(--text-muted)',
        }}
      >
        <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
          Unified Frontend Monorepo
        </div>
        <div>3 Teams • 19 Domains • dev baseline • No direct pushes to main</div>
      </div>
    </aside>
  );
};
