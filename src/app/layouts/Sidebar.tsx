import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Boxes,
  Briefcase,
  Users as UsersIcon,
  ShieldCheck,
  GitBranch,
  
  Layers,
  Network
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  return (
    <aside
      style={{
        width: collapsed ? '72px' : '260px',
        backgroundColor: 'var(--bg-surface)',
        borderRight: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        padding: collapsed ? '20px 8px' : '20px 14px',
        gap: '22px',
        overflowY: 'auto',
        transition: 'width var(--transition-normal)',
      }}
    >
      {/* Group 1: Main Overview */}
      <div>
        {!collapsed && (
          <div
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: 'var(--text-muted)',
              marginBottom: '8px',
              paddingLeft: '10px',
            }}
          >
            MAIN
          </div>
        )}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          <NavLink
            to="/dashboard"
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: collapsed ? 'center' : 'flex-start',
              gap: '12px',
              padding: '9px 12px',
              borderRadius: 'var(--radius-md)',
              fontSize: '13.5px',
              fontWeight: isActive ? 600 : 500,
              color: isActive ? '#ffffff' : 'var(--text-secondary)',
              backgroundColor: isActive ? 'var(--bg-elevated)' : 'transparent',
              border: isActive ? '1px solid var(--border-hover)' : '1px solid transparent',
              transition: 'all var(--transition-fast)',
            })}
            title="Dashboard"
          >
            <LayoutDashboard size={18} style={{ flexShrink: 0 }} />
            {!collapsed && <span>Dashboard</span>}
          </NavLink>
        </nav>
      </div>

      {/* Group 2: Business Modules (The Three Teams) */}
      <div>
        {!collapsed && (
          <div
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: 'var(--text-muted)',
              marginBottom: '8px',
              paddingLeft: '10px',
            }}
          >
            BUSINESS MODULES (3 TEAMS)
          </div>
        )}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          {/* Team A -> ERP */}
          <NavLink
            to="/erp"
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: collapsed ? 'center' : 'space-between',
              padding: '9px 12px',
              borderRadius: 'var(--radius-md)',
              fontSize: '13.5px',
              fontWeight: isActive ? 600 : 500,
              color: isActive ? '#ffffff' : 'var(--text-secondary)',
              backgroundColor: isActive ? 'var(--team-a-bg)' : 'transparent',
              border: isActive ? '1px solid var(--team-a-border)' : '1px solid transparent',
              transition: 'all var(--transition-fast)',
            })}
            title="ERP (Team A)"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Boxes size={18} style={{ color: 'var(--team-a-accent)', flexShrink: 0 }} />
              {!collapsed && <span>ERP</span>}
            </div>
            {!collapsed && (
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  padding: '1px 6px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--team-a-bg)',
                  color: 'var(--team-a-accent)',
                  border: '1px solid var(--team-a-border)',
                }}
              >
                Team A
              </span>
            )}
          </NavLink>

          {/* Team B -> CRM */}
          <NavLink
            to="/crm"
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: collapsed ? 'center' : 'space-between',
              padding: '9px 12px',
              borderRadius: 'var(--radius-md)',
              fontSize: '13.5px',
              fontWeight: isActive ? 600 : 500,
              color: isActive ? '#ffffff' : 'var(--text-secondary)',
              backgroundColor: isActive ? 'var(--team-b-bg)' : 'transparent',
              border: isActive ? '1px solid var(--team-b-border)' : '1px solid transparent',
              transition: 'all var(--transition-fast)',
            })}
            title="CRM (Team B)"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Briefcase size={18} style={{ color: 'var(--team-b-accent)', flexShrink: 0 }} />
              {!collapsed && <span>CRM</span>}
            </div>
            {!collapsed && (
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  padding: '1px 6px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--team-b-bg)',
                  color: 'var(--team-b-accent)',
                  border: '1px solid var(--team-b-border)',
                }}
              >
                Team B
              </span>
            )}
          </NavLink>

          {/* Team C -> HRMS */}
          <NavLink
            to="/hrms"
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: collapsed ? 'center' : 'space-between',
              padding: '9px 12px',
              borderRadius: 'var(--radius-md)',
              fontSize: '13.5px',
              fontWeight: isActive ? 600 : 500,
              color: isActive ? '#ffffff' : 'var(--text-secondary)',
              backgroundColor: isActive ? 'var(--team-c-bg)' : 'transparent',
              border: isActive ? '1px solid var(--team-c-border)' : '1px solid transparent',
              transition: 'all var(--transition-fast)',
            })}
            title="HRMS (Team C)"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <UsersIcon size={18} style={{ color: 'var(--team-c-accent)', flexShrink: 0 }} />
              {!collapsed && <span>HRMS</span>}
            </div>
            {!collapsed && (
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  padding: '1px 6px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--team-c-bg)',
                  color: 'var(--team-c-accent)',
                  border: '1px solid var(--team-c-border)',
                }}
              >
                Team C
              </span>
            )}
          </NavLink>
        </nav>
      </div>

      {/* Group 3: Architecture & Governance */}
      <div>
        {!collapsed && (
          <div
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: 'var(--text-muted)',
              marginBottom: '8px',
              paddingLeft: '10px',
            }}
          >
            ARCHITECTURE & STANDARDS
          </div>
        )}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          <NavLink
            to="/architecture/rules"
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '9px 12px',
              borderRadius: 'var(--radius-md)',
              fontSize: '13px',
              color: isActive ? '#ffffff' : 'var(--text-secondary)',
              backgroundColor: isActive ? 'var(--bg-elevated)' : 'transparent',
            })}
            title="Dependency Rules"
          >
            <ShieldCheck size={17} style={{ flexShrink: 0 }} />
            {!collapsed && <span>Dependency Rules</span>}
          </NavLink>

          <NavLink
            to="/teams/ownership"
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '9px 12px',
              borderRadius: 'var(--radius-md)',
              fontSize: '13px',
              color: isActive ? '#ffffff' : 'var(--text-secondary)',
              backgroundColor: isActive ? 'var(--bg-elevated)' : 'transparent',
            })}
            title="Team Ownership"
          >
            <Layers size={17} style={{ flexShrink: 0 }} />
            {!collapsed && <span>Team Ownership</span>}
          </NavLink>

          <NavLink
            to="/git/workflow"
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '9px 12px',
              borderRadius: 'var(--radius-md)',
              fontSize: '13px',
              color: isActive ? '#ffffff' : 'var(--text-secondary)',
              backgroundColor: isActive ? 'var(--bg-elevated)' : 'transparent',
            })}
            title="Git Workflow"
          >
            <GitBranch size={17} style={{ flexShrink: 0 }} />
            {!collapsed && <span>Git Workflow</span>}
          </NavLink>

          <NavLink
            to="/core/api-overview"
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '9px 12px',
              borderRadius: 'var(--radius-md)',
              fontSize: '13px',
              color: isActive ? '#ffffff' : 'var(--text-secondary)',
              backgroundColor: isActive ? 'var(--bg-elevated)' : 'transparent',
            })}
            title="Core API Structure"
          >
            <Network size={17} style={{ flexShrink: 0 }} />
            {!collapsed && <span>Core API Structure</span>}
          </NavLink>
        </nav>
      </div>

      {/* Footer Info Box */}
      {!collapsed && (
        <div
          style={{
            marginTop: 'auto',
            padding: '12px',
            backgroundColor: 'var(--bg-card)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            fontSize: '11.5px',
            color: 'var(--text-muted)',
          }}
        >
          <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '3px' }}>
            Unified Frontend Shell
          </div>
          <div>Team A (ERP) • Team B (CRM) • Team C (HRMS)</div>
        </div>
      )}
    </aside>
  );
};
