import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Users,
  Clock,
  CalendarOff,
  CreditCard,
  UserCheck,
  TrendingUp,
  Laptop,
} from 'lucide-react';
import '../styles/hrms.css';

interface SubNavItem {
  to: string;
  label: string;
  icon: React.ReactNode;
  badge?: string;
}

export const HrmsSubNav: React.FC = () => {
  const navItems: SubNavItem[] = [
    {
      to: '/hrms/employees',
      label: 'Employees',
      icon: <Users size={15} />,
      badge: '21',
    },
    {
      to: '/hrms/attendance',
      label: 'Attendance',
      icon: <Clock size={15} />,
      badge: 'Daily',
    },
    {
      to: '/hrms/leave',
      label: 'Leave Management',
      icon: <CalendarOff size={15} />,
      badge: '6 Reqs',
    },
    {
      to: '/hrms/payroll',
      label: 'Payroll',
      icon: <CreditCard size={15} />,
      badge: 'Oct \'26',
    },
    {
      to: '/hrms/recruitment',
      label: 'Recruitment & ATS',
      icon: <UserCheck size={15} />,
      badge: '4 Open',
    },
    {
      to: '/hrms/performance',
      label: 'Performance + Learning',
      icon: <TrendingUp size={15} />,
      badge: 'FY26',
    },
    {
      to: '/hrms/ess-assets',
      label: 'ESS & Assets',
      icon: <Laptop size={15} />,
      badge: '21 Devices',
    },
  ];

  return (
    <nav className="hrms-subnav-container" aria-label="HRMS Domain Navigation">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `hrms-subnav-link ${isActive ? 'active' : ''}`
          }
        >
          {item.icon}
          <span>{item.label}</span>
          {item.badge && <span className="hrms-subnav-badge">{item.badge}</span>}
        </NavLink>
      ))}
    </nav>
  );
};
