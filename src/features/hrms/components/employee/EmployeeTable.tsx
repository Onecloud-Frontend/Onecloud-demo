import React, { useState, useEffect } from 'react';
import { Employee, Department } from '../../types';
import { EmployeeStatusBadge, EmploymentTypeBadge } from './EmployeeStatusBadge';
import { formatDate } from '@shared/utils/formatters';
import { Eye, Edit2, MapPin, Calendar, Building, User, ChevronLeft, ChevronRight } from 'lucide-react';

interface EmployeeTableProps {
  employees: Employee[];
  departments: Department[];
  allEmployees: Employee[];
  onSelectEmployee: (employee: Employee) => void;
  onEditEmployee: (employee: Employee) => void;
  pageSize?: number;
}

export const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  departments,
  allEmployees,
  onSelectEmployee,
  onEditEmployee,
  pageSize = 5,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Reset to page 1 whenever filtered employee list updates
  useEffect(() => {
    setCurrentPage(1);
  }, [employees]);

  const totalPages = Math.max(1, Math.ceil(employees.length / pageSize));
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  const startIndex = (safeCurrentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, employees.length);
  const displayedEmployees = employees.slice(startIndex, endIndex);
  const getDepartmentName = (deptId: string): string => {
    const dept = departments.find((d) => d.id === deptId);
    return dept ? dept.name : deptId;
  };

  const getManagerName = (managerId: string | null): string => {
    if (!managerId) return 'Executive / None';
    const mgr = allEmployees.find((e) => e.id === managerId);
    return mgr ? `${mgr.firstName} ${mgr.lastName}` : managerId;
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  // Generate deterministic avatar background colors
  const getAvatarBg = (name: string) => {
    const colors = [
      '#6366f1',
      '#8b5cf6',
      '#ec4899',
      '#10b981',
      '#3b82f6',
      '#f59e0b',
      '#06b6d4',
      '#14b8a6',
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
      }}
    >
      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            textAlign: 'left',
            fontSize: '13.5px',
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: 'var(--bg-elevated)',
                borderBottom: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)',
                fontSize: '12px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              <th style={{ padding: '14px 18px' }}>Employee</th>
              <th style={{ padding: '14px 18px' }}>Department & Role</th>
              <th style={{ padding: '14px 18px' }}>Status & Type</th>
              <th style={{ padding: '14px 18px' }}>Manager</th>
              <th style={{ padding: '14px 18px' }}>Location & Joined</th>
              <th style={{ padding: '14px 18px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedEmployees.map((employee, idx) => {
              const fullName = `${employee.firstName} ${employee.lastName}`;
              const deptName = getDepartmentName(employee.departmentId);
              const managerName = getManagerName(employee.managerId);
              const avatarBg = getAvatarBg(fullName);

              return (
                <tr
                  key={employee.id}
                  onClick={() => onSelectEmployee(employee)}
                  style={{
                    borderBottom:
                      idx === displayedEmployees.length - 1 ? 'none' : '1px solid var(--border-subtle)',
                    transition: 'background-color var(--transition-fast)',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--bg-card-hover)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {/* Employee Name & Code */}
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {employee.profileImage ? (
                        <img
                          src={employee.profileImage}
                          alt={fullName}
                          style={{
                            width: '38px',
                            height: '38px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: '38px',
                            height: '38px',
                            borderRadius: '50%',
                            backgroundColor: avatarBg,
                            color: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                            fontSize: '13px',
                            letterSpacing: '0.05em',
                            flexShrink: 0,
                          }}
                        >
                          {getInitials(employee.firstName, employee.lastName)}
                        </div>
                      )}

                      <div>
                        <div
                          style={{
                            fontWeight: 600,
                            color: 'var(--text-primary)',
                            fontSize: '14px',
                          }}
                        >
                          {fullName}
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '12px',
                            color: 'var(--text-muted)',
                            marginTop: '2px',
                          }}
                        >
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '11px',
                              backgroundColor: 'rgba(148, 163, 184, 0.1)',
                              padding: '1px 5px',
                              borderRadius: '4px',
                            }}
                          >
                            {employee.employeeCode}
                          </span>
                          <span>•</span>
                          <span>{employee.email}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Department & Role */}
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>
                      {employee.designation}
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        fontSize: '12px',
                        color: 'var(--text-secondary)',
                        marginTop: '3px',
                      }}
                    >
                      <Building size={12} style={{ color: 'var(--text-muted)' }} />
                      <span>{deptName}</span>
                    </div>
                  </td>

                  {/* Status & Type */}
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'flex-start' }}>
                      <EmployeeStatusBadge status={employee.employmentStatus} />
                      <EmploymentTypeBadge type={employee.employmentType} />
                    </div>
                  </td>

                  {/* Manager */}
                  <td style={{ padding: '14px 18px' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: 'var(--text-secondary)',
                        fontSize: '13px',
                      }}
                    >
                      <User size={13} style={{ color: 'var(--text-muted)' }} />
                      <span>{managerName}</span>
                    </div>
                  </td>

                  {/* Location & Joining Date */}
                  <td style={{ padding: '14px 18px' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        color: 'var(--text-secondary)',
                        fontSize: '12.5px',
                      }}
                    >
                      <MapPin size={12} style={{ color: 'var(--text-muted)' }} />
                      <span>{employee.workLocation}</span>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        fontSize: '11.5px',
                        color: 'var(--text-muted)',
                        marginTop: '3px',
                      }}
                    >
                      <Calendar size={12} />
                      <span>Joined {formatDate(employee.joiningDate)}</span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                    <div
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        onClick={() => onSelectEmployee(employee)}
                        title="View Employee Profile"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '6px 10px',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: 'rgba(99, 102, 241, 0.1)',
                          color: 'var(--brand-primary)',
                          border: '1px solid rgba(99, 102, 241, 0.25)',
                          fontSize: '12px',
                          fontWeight: 500,
                          cursor: 'pointer',
                        }}
                      >
                        <Eye size={13} />
                        View
                      </button>

                      <button
                        type="button"
                        onClick={() => onEditEmployee(employee)}
                        title="Edit Employee Information"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '6px 10px',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: 'var(--bg-elevated)',
                          color: 'var(--text-secondary)',
                          border: '1px solid var(--border-subtle)',
                          fontSize: '12px',
                          fontWeight: 500,
                          cursor: 'pointer',
                        }}
                      >
                        <Edit2 size={13} />
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer Controls */}
      {employees.length > 0 && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 20px',
            backgroundColor: 'var(--bg-elevated)',
            borderTop: '1px solid var(--border-subtle)',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          {/* Summary */}
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Showing{' '}
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
              {startIndex + 1}
            </span>{' '}
            to{' '}
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
              {endIndex}
            </span>{' '}
            of{' '}
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
              {employees.length}
            </span>{' '}
            employees
          </div>

          {/* Navigation Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {/* Previous Button */}
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={safeCurrentPage <= 1}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 12px',
                fontSize: '12.5px',
                fontWeight: 500,
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-card)',
                color: safeCurrentPage <= 1 ? 'var(--text-muted)' : 'var(--text-secondary)',
                border: '1px solid var(--border-subtle)',
                cursor: safeCurrentPage <= 1 ? 'not-allowed' : 'pointer',
                opacity: safeCurrentPage <= 1 ? 0.45 : 1,
                transition: 'all var(--transition-fast)',
              }}
            >
              <ChevronLeft size={14} />
              Previous
            </button>

            {/* Page Number Buttons */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
              const isActive = pageNum === safeCurrentPage;
              return (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => setCurrentPage(pageNum)}
                  style={{
                    minWidth: '32px',
                    height: '32px',
                    padding: '0 8px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: isActive ? 'var(--brand-primary)' : 'var(--bg-card)',
                    color: isActive ? '#ffffff' : 'var(--text-secondary)',
                    border: isActive
                      ? '1px solid var(--brand-primary)'
                      : '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                  }}
                >
                  {pageNum}
                </button>
              );
            })}

            {/* Next Button */}
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={safeCurrentPage >= totalPages}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '6px 12px',
                fontSize: '12.5px',
                fontWeight: 500,
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-card)',
                color: safeCurrentPage >= totalPages ? 'var(--text-muted)' : 'var(--text-secondary)',
                border: '1px solid var(--border-subtle)',
                cursor: safeCurrentPage >= totalPages ? 'not-allowed' : 'pointer',
                opacity: safeCurrentPage >= totalPages ? 0.45 : 1,
                transition: 'all var(--transition-fast)',
              }}
            >
              Next
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
