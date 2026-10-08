import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Users,
  Clock,
  CalendarDays,
  CreditCard,
  Briefcase,
  TrendingUp,
  Laptop,
  LayoutDashboard
} from 'lucide-react';

interface HrmsPageContainerProps {
  title: string;
  description: string;
  badgeText?: string;
  actionsSlot?: React.ReactNode;
  children: React.ReactNode;
}

const HRMS_NAV_MODULES = [
  { path: '/hrms', label: 'HRMS Overview', icon: <LayoutDashboard size={15} />, end: true },
  { path: '/hrms/employees', label: 'Employees', icon: <Users size={15} /> },
  { path: '/hrms/attendance', label: 'Attendance', icon: <Clock size={15} /> },
  { path: '/hrms/leave', label: 'Leave', icon: <CalendarDays size={15} /> },
  { path: '/hrms/payroll', label: 'Payroll', icon: <CreditCard size={15} /> },
  { path: '/hrms/recruitment', label: 'Recruitment', icon: <Briefcase size={15} /> },
  { path: '/hrms/performance', label: 'Performance', icon: <TrendingUp size={15} /> },
  { path: '/hrms/ess-assets', label: 'ESS & Assets', icon: <Laptop size={15} /> },
];

export const HrmsPageContainer: React.FC<HrmsPageContainerProps> = ({
  title,
  description,
  badgeText = 'Team 3 HRMS Domain',
  actionsSlot,
  children,
}) => {
  return (
    <div style={{ padding: '24px 32px', maxWidth: '1440px', margin: '0 auto', width: '100%' }}>
      {/* Module Quick Nav Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '6px',
          overflowX: 'auto',
          paddingBottom: '16px',
          marginBottom: '20px',
          borderBottom: '1px solid var(--border-subtle)',
          scrollbarWidth: 'none',
        }}
      >
        {HRMS_NAV_MODULES.map((mod) => (
          <NavLink
            key={mod.path}
            to={mod.path}
            end={mod.end}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-md)',
              fontSize: '12px',
              fontWeight: 600,
              textDecoration: 'none',
              backgroundColor: isActive ? 'var(--brand-primary)' : 'var(--bg-elevated)',
              color: isActive ? '#ffffff' : 'var(--text-secondary)',
              border: isActive ? '1px solid var(--brand-primary)' : '1px solid var(--border-subtle)',
              whiteSpace: 'nowrap',
              transition: 'all 150ms ease',
            })}
          >
            {mod.icon}
            {mod.label}
          </NavLink>
        ))}
      </div>

      {/* Page Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1
              style={{
                fontSize: '24px',
                fontWeight: 700,
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-display)',
                margin: 0,
              }}
            >
              {title}
            </h1>
            {badgeText && (
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  padding: '3px 8px',
                  borderRadius: '999px',
                  backgroundColor: 'rgba(168, 85, 247, 0.15)',
                  color: '#c084fc',
                  border: '1px solid rgba(168, 85, 247, 0.3)',
                }}
              >
                {badgeText}
              </span>
            )}
          </div>
          <p style={{ margin: '6px 0 0', fontSize: '14px', color: 'var(--text-secondary)' }}>
            {description}
          </p>
        </div>

        {actionsSlot && <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>{actionsSlot}</div>}
      </div>

      {/* Main Page Content */}
      {children}
    </div>
  );
};
