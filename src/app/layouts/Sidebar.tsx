import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Boxes,
  Briefcase,
  Users as UsersIcon,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { navigationConfig, NavigationDomain } from '@app/config/navigation';

interface SidebarProps {
  collapsed: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine initially expanded domain based on active route
  const getActiveDomainId = (): string | null => {
    const path = location.pathname;
    if (path.startsWith('/erp')) return 'erp';
    if (path.startsWith('/crm')) return 'crm';
    if (path.startsWith('/hrms')) return 'hrms';
    return null;
  };

  const [expandedDomain, setExpandedDomain] = useState<string | null>(getActiveDomainId());

  // Keep expanded domain in sync when route changes externally
  useEffect(() => {
    const active = getActiveDomainId();
    if (active) {
      setExpandedDomain(active);
    }
  }, [location.pathname]);

  const toggleDomain = (domainId: string, rootPath: string) => {
    if (collapsed) {
      navigate(rootPath);
      return;
    }

    if (expandedDomain === domainId) {
      setExpandedDomain(null);
    } else {
      setExpandedDomain(domainId);
    }
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Boxes':
        return <Boxes size={18} style={{ flexShrink: 0 }} />;
      case 'Briefcase':
        return <Briefcase size={18} style={{ flexShrink: 0 }} />;
      case 'Users':
        return <UsersIcon size={18} style={{ flexShrink: 0 }} />;
      default:
        return <Boxes size={18} style={{ flexShrink: 0 }} />;
    }
  };

  return (
    <aside
      style={{
        width: collapsed ? '72px' : '260px',
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
              marginBottom: '8px',
              paddingLeft: '10px',
            }}
          >
            MAIN
          </div>
        )}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          {navigationConfig.main.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
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
              title={item.label}
            >
              <LayoutDashboard size={18} style={{ flexShrink: 0 }} />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Group 2: BUSINESS MODULES (Expandable) */}
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
            BUSINESS MODULES
          </div>
        )}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navigationConfig.businessModules.map((domain: NavigationDomain) => {
            const isDomainActive = location.pathname.startsWith(domain.rootPath);
            const isExpanded = expandedDomain === domain.id && !collapsed;

            return (
              <div key={domain.id} style={{ display: 'flex', flexDirection: 'column' }}>
                {/* Domain Header Row */}
                <button
                  type="button"
                  onClick={() => toggleDomain(domain.id, domain.rootPath)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: collapsed ? 'center' : 'space-between',
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '13.5px',
                    fontWeight: isDomainActive ? 600 : 500,
                    color: isDomainActive ? '#ffffff' : 'var(--text-secondary)',
                    backgroundColor: isDomainActive ? 'var(--bg-elevated)' : 'transparent',
                    border: isDomainActive ? '1px solid var(--border-hover)' : '1px solid transparent',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                    textAlign: 'left',
                  }}
                  title={domain.label}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {renderIcon(domain.iconName)}
                    {!collapsed && <span>{domain.label}</span>}
                  </div>

                  {!collapsed && (
                    <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
                      {isExpanded ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
                    </span>
                  )}
                </button>

                {/* Sub-items (Expandable) */}
                {isExpanded && !collapsed && (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '2px',
                      paddingLeft: '32px',
                      paddingTop: '4px',
                      paddingBottom: '6px',
                    }}
                  >
                    {domain.subItems.map((subItem) => {
                      const isSubActive = location.pathname === subItem.path && !subItem.isTBD;

                      if (subItem.isTBD) {
                        return (
                          <div
                            key={subItem.id}
                            style={{
                              padding: '6px 10px',
                              fontSize: '12px',
                              color: 'var(--text-muted)',
                              fontStyle: 'italic',
                            }}
                            title="Awaiting Approved Requirements"
                          >
                            {subItem.label}
                          </div>
                        );
                      }

                      return (
                        <NavLink
                          key={subItem.id}
                          to={subItem.path}
                          end
                          style={{
                            padding: '6px 10px',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '13px',
                            fontWeight: isSubActive ? 600 : 400,
                            color: isSubActive ? 'var(--brand-primary)' : 'var(--text-secondary)',
                            backgroundColor: isSubActive ? 'rgba(99, 102, 241, 0.08)' : 'transparent',
                            transition: 'color var(--transition-fast)',
                            textDecoration: 'none',
                          }}
                        >
                          {subItem.label}
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
