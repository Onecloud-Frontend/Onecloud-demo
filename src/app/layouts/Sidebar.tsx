import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Boxes,
  Briefcase,
  Users as UsersIcon
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  return (
    <aside
      style={{
        width: collapsed ? '72px' : '250px',
        backgroundColor: 'var(--bg-surface)',
        borderRight: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        padding: collapsed ? '20px 8px' : '20px 14px',
        gap: '24px',
        overflowY: 'auto',
        transition: 'width var(--transition-normal)',
      }}
    >
      {/* Group 1: MAIN */}
      <div>
        {!collapsed && (
          <div
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: 'var(--text-muted)',
              marginBottom: '10px',
              paddingLeft: '10px',
            }}
          >
            MAIN
          </div>
        )}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <NavLink
            to="/dashboard"
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: collapsed ? 'center' : 'flex-start',
              gap: '12px',
              padding: '10px 12px',
              borderRadius: 'var(--radius-md)',
              fontSize: '14px',
              fontWeight: isActive ? 600 : 500,
              color: isActive ? '#ffffff' : 'var(--text-secondary)',
              backgroundColor: isActive ? 'var(--bg-elevated)' : 'transparent',
              border: isActive ? '1px solid var(--border-hover)' : '1px solid transparent',
              transition: 'all var(--transition-fast)',
            })}
            title="Dashboard"
          >
            <LayoutDashboard size={19} style={{ flexShrink: 0 }} />
            {!collapsed && <span>Dashboard</span>}
          </NavLink>
        </nav>
      </div>

      {/* Group 2: BUSINESS MODULES */}
      <div>
        {!collapsed && (
          <div
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: 'var(--text-muted)',
              marginBottom: '10px',
              paddingLeft: '10px',
            }}
          >
            BUSINESS MODULES
          </div>
        )}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {/* ERP */}
          <NavLink
            to="/erp"
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: collapsed ? 'center' : 'flex-start',
              gap: '12px',
              padding: '10px 12px',
              borderRadius: 'var(--radius-md)',
              fontSize: '14px',
              fontWeight: isActive ? 600 : 500,
              color: isActive ? '#ffffff' : 'var(--text-secondary)',
              backgroundColor: isActive ? 'var(--bg-elevated)' : 'transparent',
              border: isActive ? '1px solid var(--border-hover)' : '1px solid transparent',
              transition: 'all var(--transition-fast)',
            })}
            title="ERP"
          >
            <Boxes size={19} style={{ flexShrink: 0, color: 'var(--brand-primary)' }} />
            {!collapsed && <span>ERP</span>}
          </NavLink>

          {/* CRM */}
          <NavLink
            to="/crm"
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: collapsed ? 'center' : 'flex-start',
              gap: '12px',
              padding: '10px 12px',
              borderRadius: 'var(--radius-md)',
              fontSize: '14px',
              fontWeight: isActive ? 600 : 500,
              color: isActive ? '#ffffff' : 'var(--text-secondary)',
              backgroundColor: isActive ? 'var(--bg-elevated)' : 'transparent',
              border: isActive ? '1px solid var(--border-hover)' : '1px solid transparent',
              transition: 'all var(--transition-fast)',
            })}
            title="CRM"
          >
            <Briefcase size={19} style={{ flexShrink: 0, color: 'var(--brand-primary)' }} />
            {!collapsed && <span>CRM</span>}
          </NavLink>

          {/* HRMS */}
          <NavLink
            to="/hrms"
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: collapsed ? 'center' : 'flex-start',
              gap: '12px',
              padding: '10px 12px',
              borderRadius: 'var(--radius-md)',
              fontSize: '14px',
              fontWeight: isActive ? 600 : 500,
              color: isActive ? '#ffffff' : 'var(--text-secondary)',
              backgroundColor: isActive ? 'var(--bg-elevated)' : 'transparent',
              border: isActive ? '1px solid var(--border-hover)' : '1px solid transparent',
              transition: 'all var(--transition-fast)',
            })}
            title="HRMS"
          >
            <UsersIcon size={19} style={{ flexShrink: 0, color: 'var(--brand-primary)' }} />
            {!collapsed && <span>HRMS</span>}
          </NavLink>
        </nav>
      </div>
    </aside>
  );
};
