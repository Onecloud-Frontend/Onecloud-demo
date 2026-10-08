import React, { useState } from 'react';
import { User, Search, Check, ChevronDown } from 'lucide-react';
import type { Employee, Department } from '../../types';

interface EmployeeSwitcherProps {
  employees: Employee[];
  departments: Department[];
  selectedEmployee: Employee | null;
  onSelectEmployee: (employee: Employee) => void;
}

export const EmployeeSwitcher: React.FC<EmployeeSwitcherProps> = ({
  employees,
  departments,
  selectedEmployee,
  onSelectEmployee,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const getDepartmentName = (departmentId: string): string => {
    const dept = departments.find((d) => d.id === departmentId);
    return dept ? dept.name : 'Unknown Department';
  };

  const filteredEmployees = employees.filter((emp) => {
    const deptName = getDepartmentName(emp.departmentId);
    const term = searchTerm.toLowerCase();
    return (
      emp.firstName.toLowerCase().includes(term) ||
      emp.lastName.toLowerCase().includes(term) ||
      emp.employeeCode.toLowerCase().includes(term) ||
      emp.designation.toLowerCase().includes(term) ||
      deptName.toLowerCase().includes(term)
    );
  });

  return (
    <div className="ess-switcher-bar" style={{ position: 'relative' }}>
      <div className="ess-switcher-left">
        <div className="ess-switcher-avatar">
          {selectedEmployee
            ? `${selectedEmployee.firstName[0]}${selectedEmployee.lastName[0]}`
            : <User size={18} />}
        </div>
        <div className="ess-switcher-info">
          <span className="ess-switcher-label">Active Self-Service Employee Session</span>
          <div className="ess-switcher-name">
            {selectedEmployee ? (
              <>
                <span>{selectedEmployee.firstName} {selectedEmployee.lastName}</span>
                <span className="ess-hero-code">{selectedEmployee.employeeCode}</span>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 400 }}>
                  • {selectedEmployee.designation} ({getDepartmentName(selectedEmployee.departmentId)})
                </span>
              </>
            ) : (
              <span>No Employee Selected</span>
            )}
          </div>
        </div>
      </div>

      <div className="ess-switcher-select-wrap">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="ess-switcher-select"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            minWidth: '220px',
            justifyContent: 'space-between',
          }}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span>Switch Employee...</span>
          <ChevronDown size={16} />
        </button>

        {isOpen && (
          <>
            <div
              style={{ position: 'fixed', inset: 0, zIndex: 100 }}
              onClick={() => setIsOpen(false)}
            />
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: '20px',
                width: '380px',
                maxHeight: '360px',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.45)',
                zIndex: 101,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              <div style={{ padding: '12px', borderBottom: '1px solid var(--border-subtle)' }}>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <Search
                    size={16}
                    style={{ position: 'absolute', left: '10px', color: 'var(--text-muted)' }}
                  />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search name, code, dept, role..."
                    autoFocus
                    style={{
                      width: '100%',
                      padding: '8px 10px 8px 34px',
                      backgroundColor: 'var(--bg-input)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--text-primary)',
                      fontSize: '13px',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div style={{ overflowY: 'auto', maxHeight: '280px', padding: '6px' }} role="listbox">
                {filteredEmployees.length === 0 ? (
                  <div style={{ padding: '16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
                    No matching employees found
                  </div>
                ) : (
                  filteredEmployees.map((emp) => {
                    const isSelected = selectedEmployee?.id === emp.id;
                    const deptName = getDepartmentName(emp.departmentId);
                    return (
                      <button
                        key={emp.id}
                        type="button"
                        onClick={() => {
                          onSelectEmployee(emp);
                          setIsOpen(false);
                          setSearchTerm('');
                        }}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 12px',
                          border: 'none',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: isSelected ? 'var(--bg-elevated)' : 'transparent',
                          color: 'var(--text-primary)',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'background-color var(--transition-fast)',
                        }}
                        onMouseEnter={(e) => {
                          if (!isSelected) e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: 'var(--radius-sm)',
                              backgroundColor: isSelected ? 'var(--brand-primary)' : 'var(--bg-input)',
                              color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 700,
                              fontSize: '12px',
                            }}
                          >
                            {emp.firstName[0]}{emp.lastName[0]}
                          </div>
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                              {emp.firstName} {emp.lastName}
                              <span style={{ marginLeft: '6px', fontSize: '11px', color: '#a5b4fc', fontFamily: 'var(--font-mono)' }}>
                                {emp.employeeCode}
                              </span>
                            </div>
                            <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                              {emp.designation} • {deptName}
                            </div>
                          </div>
                        </div>
                        {isSelected && <Check size={16} style={{ color: 'var(--brand-primary)' }} />}
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
