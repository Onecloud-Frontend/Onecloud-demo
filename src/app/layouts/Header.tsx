import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Badge } from '@shared/components';
import { activeDemoTenant } from '@core/tenant';
import { useAuth } from '@core/auth';
import {
  Menu,
  X,
  Search,
  Bell,
  LogOut,
  User as UserIcon,
  ChevronDown,
  Building2,
  Boxes,
  Users as UsersIcon,
  Briefcase,
  LayoutDashboard
} from 'lucide-react';

interface HeaderProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ sidebarOpen, onToggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  // Determine current active module indicator
  const getModuleIndicator = () => {
    const path = location.pathname;
    if (path.startsWith('/erp')) {
      return {
        name: 'ERP Team Workspace',
        team: 'Team A Domain',
        badgeVariant: 'team-a' as const,
        icon: <Boxes size={16} />
      };
    }
    if (path.startsWith('/crm')) {
      return {
        name: 'CRM Team Workspace',
        team: 'Team B Domain',
        badgeVariant: 'team-b' as const,
        icon: <Briefcase size={16} />
      };
    }
    if (path.startsWith('/hrms')) {
      return {
        name: 'HRMS Team Workspace',
        team: 'Team C Domain',
        badgeVariant: 'team-c' as const,
        icon: <UsersIcon size={16} />
      };
    }
    return {
      name: 'Enterprise Dashboard',
      team: 'Unified Monorepo',
      badgeVariant: 'core' as const,
      icon: <LayoutDashboard size={16} />
    };
  };

  const moduleInfo = getModuleIndicator();

  return (
    <header
      style={{
        height: '66px',
        borderBottom: '1px solid var(--border-subtle)',
        backgroundColor: 'var(--bg-surface)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Left: Mobile Toggle + Logo + Current Module Indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          onClick={onToggleSidebar}
          aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-elevated)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'var(--brand-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '16px',
              boxShadow: 'var(--brand-glow)',
            }}
          >
            O
          </div>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 700, fontFamily: 'var(--font-display)', letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>
              ONE ENTERPRISE CLOUD
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              Official Frontend Architecture
            </div>
          </div>
        </div>

        <div style={{ height: '24px', width: '1px', backgroundColor: 'var(--border-subtle)' }} />

        {/* Dynamic Module Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
            <span style={{ color: 'var(--brand-primary)', display: 'flex', alignItems: 'center' }}>
              {moduleInfo.icon}
            </span>
            <span>{moduleInfo.name}</span>
          </div>
          <Badge variant={moduleInfo.badgeVariant}>{moduleInfo.team}</Badge>
        </div>
      </div>

      {/* Middle: Universal Search Placeholder */}
      <div style={{ flex: 1, maxWidth: '380px', margin: '0 24px' }}>
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Search size={16} style={{ position: 'absolute', left: '12px', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search modules, features, docs (placeholder)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              backgroundColor: 'var(--bg-base)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-full)',
              padding: '7px 14px 7px 36px',
              fontSize: '13px',
              color: 'var(--text-primary)',
              outline: 'none',
            }}
          />
        </div>
      </div>

      {/* Right: Tenant, Notifications, User Menu */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Tenant Scope */}
        <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Building2 size={16} style={{ color: 'var(--text-muted)' }} />
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Tenant</div>
            <div style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--text-primary)' }}>
              {activeDemoTenant.tenantName}
            </div>
          </div>
        </div>

        <div style={{ height: '24px', width: '1px', backgroundColor: 'var(--border-subtle)' }} />

        {/* Notifications Placeholder */}
        <div style={{ position: 'relative' }} ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-elevated)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            <Bell size={17} />
            <span
              style={{
                position: 'absolute',
                top: '6px',
                right: '6px',
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: 'var(--brand-primary)',
              }}
            />
          </button>

          {showNotifications && (
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: '46px',
                width: '300px',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                padding: '16px',
                zIndex: 100,
              }}
            >
              <div style={{ fontWeight: 600, fontSize: '13px', marginBottom: '8px' }}>Notifications (Demo)</div>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                Notification services are non-operational in this architectural demo. Real SSE/WebSocket streams connect through <code>@core/telemetry</code> when backend is deployed.
              </p>
            </div>
          )}
        </div>

        {/* User Profile & Menu */}
        <div style={{ position: 'relative' }} ref={userMenuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '4px 10px 4px 6px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--bg-elevated)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
            }}
          >
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                backgroundColor: 'var(--brand-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '12px',
              }}
            >
              {user?.name ? user.name.slice(0, 2).toUpperCase() : 'CA'}
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '12.5px', fontWeight: 600, lineHeight: 1.2 }}>
                {user?.name || 'Lead Architect'}
              </div>
              <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>
                {user?.roles?.[0] || 'Enterprise Admin'}
              </div>
            </div>
            <ChevronDown size={14} style={{ color: 'var(--text-muted)' }} />
          </button>

          {showUserMenu && (
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: '46px',
                width: '240px',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                padding: '12px',
                zIndex: 100,
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div style={{ paddingBottom: '8px', borderBottom: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '12.5px', fontWeight: 600 }}>{user?.email || 'architect@oneenterprise.internal'}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Tenant: {activeDemoTenant.tenantId}</div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 8px', fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                <UserIcon size={14} />
                <span>Session: Local Demo Mode</span>
              </div>

              <button
                onClick={handleLogout}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  color: '#ef4444',
                  fontSize: '13px',
                  fontWeight: 600,
                  marginTop: '4px',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left',
                }}
              >
                <LogOut size={14} />
                <span>Sign Out / Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
