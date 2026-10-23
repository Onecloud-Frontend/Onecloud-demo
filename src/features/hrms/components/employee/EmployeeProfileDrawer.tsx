import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Employee,
  Department,
  EmployeeDocument,
  Skill,
  Certification,
  DocumentVerificationStatus,
  SkillProficiency,
} from '../../types';
import { employeeService } from '../../services/employeeService';
import { EmployeeStatusBadge, EmploymentTypeBadge } from './EmployeeStatusBadge';
import { EmergencyContactSection } from './EmergencyContactSection';
import { EmployeeDocumentSection } from './EmployeeDocumentSection';
import { formatDate, formatCurrency } from '@shared/utils/formatters';
import {
  X,
  Edit2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building,
  User,
  Award,
  BookOpen,
  DollarSign,
  ExternalLink,
  Plus,
  Trash2,
} from 'lucide-react';

interface EmployeeProfileDrawerProps {
  employee: Employee | null;
  departments: Department[];
  allEmployees: Employee[];
  isOpen: boolean;
  onClose: () => void;
  onEdit: (employee: Employee) => void;
  onEmployeeUpdated?: (updated: Employee) => void;
}

type TabType = 'overview' | 'personal' | 'emergency' | 'documents' | 'skills';

export const EmployeeProfileDrawer: React.FC<EmployeeProfileDrawerProps> = ({
  employee,
  departments,
  allEmployees,
  isOpen,
  onClose,
  onEdit,
}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [documents, setDocuments] = useState<EmployeeDocument[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loadingExtras, setLoadingExtras] = useState(false);

  // Skill interactive states
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState('Engineering');
  const [newSkillProficiency, setNewSkillProficiency] = useState<SkillProficiency>('ADVANCED');
  const [savingSkill, setSavingSkill] = useState(false);

  // Certification interactive states
  const [showAddCert, setShowAddCert] = useState(false);
  const [newCertName, setNewCertName] = useState('');
  const [newCertIssuer, setNewCertIssuer] = useState('');
  const [newCertIssueDate, setNewCertIssueDate] = useState('');
  const [newCertExpiryDate, setNewCertExpiryDate] = useState('');
  const [newCertCredId, setNewCertCredId] = useState('');
  const [newCertCredUrl, setNewCertCredUrl] = useState('');
  const [savingCert, setSavingCert] = useState(false);

  useEffect(() => {
    if (!employee || !isOpen) return;

    let isMounted = true;
    setLoadingExtras(true);

    Promise.all([
      employeeService.getEmployeeDocuments(employee.id),
      employeeService.getEmployeeSkills(employee.id),
      employeeService.getEmployeeCertifications(employee.id),
    ])
      .then(([docsRes, skillsRes, certsRes]) => {
        if (!isMounted) return;
        setDocuments(docsRes.data || []);
        setSkills(skillsRes.data || []);
        setCertifications(certsRes.data || []);
      })
      .catch((err) => {
        console.error('Failed to load employee profile details', err);
      })
      .finally(() => {
        if (isMounted) setLoadingExtras(false);
      });

    return () => {
      isMounted = false;
    };
  }, [employee, isOpen]);

  if (!isOpen || !employee) return null;

  const department = departments.find((d) => d.id === employee.departmentId);
  const departmentName = department ? department.name : employee.departmentId;

  const manager = allEmployees.find((e) => e.id === employee.managerId);
  const managerName = manager
    ? `${manager.firstName} ${manager.lastName} (${manager.designation})`
    : 'Executive Leadership / None';

  const handleVerifyStatus = async (
    documentId: string,
    status: DocumentVerificationStatus
  ) => {
    try {
      const res = await employeeService.updateDocumentVerification(documentId, status);
      if (res.success) {
        setDocuments((prev) =>
          prev.map((d) => (d.id === documentId ? res.data : d))
        );
      }
    } catch (err) {
      console.error('Failed to update document verification status', err);
    }
  };

  const handleAddDocument = async (docPayload: Partial<EmployeeDocument>) => {
    try {
      const res = await employeeService.addDocument(docPayload);
      if (res.success) {
        setDocuments((prev) => [res.data, ...prev]);
      }
    } catch (err) {
      console.error('Failed to add document', err);
    }
  };

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    try {
      setSavingSkill(true);
      const res = await employeeService.addEmployeeSkill(employee.id, {
        name: newSkillName.trim(),
        category: newSkillCategory.trim(),
        proficiencyLevel: newSkillProficiency,
      });
      if (res.success) {
        setSkills((prev) => [...prev, res.data]);
        setNewSkillName('');
        setShowAddSkill(false);
      }
    } catch (err) {
      console.error('Failed to add skill', err);
    } finally {
      setSavingSkill(false);
    }
  };

  const handleDeleteSkill = async (skillId: string) => {
    try {
      const res = await employeeService.deleteEmployeeSkill(employee.id, skillId);
      if (res.success) {
        setSkills((prev) => prev.filter((s) => s.id !== skillId));
      }
    } catch (err) {
      console.error('Failed to delete skill', err);
    }
  };

  const handleAddCertification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCertName.trim() || !newCertIssuer.trim()) return;
    try {
      setSavingCert(true);
      const res = await employeeService.addEmployeeCertification(employee.id, {
        name: newCertName.trim(),
        issuingOrganization: newCertIssuer.trim(),
        issueDate: newCertIssueDate || new Date().toISOString().split('T')[0],
        expiryDate: newCertExpiryDate || null,
        credentialId: newCertCredId.trim() || undefined,
        credentialUrl: newCertCredUrl.trim() || undefined,
      });
      if (res.success) {
        setCertifications((prev) => [...prev, res.data]);
        setNewCertName('');
        setNewCertIssuer('');
        setNewCertIssueDate('');
        setNewCertExpiryDate('');
        setNewCertCredId('');
        setNewCertCredUrl('');
        setShowAddCert(false);
      }
    } catch (err) {
      console.error('Failed to add certification', err);
    } finally {
      setSavingCert(false);
    }
  };

  const handleDeleteCertification = async (certId: string) => {
    try {
      const res = await employeeService.deleteEmployeeCertification(employee.id, certId);
      if (res.success) {
        setCertifications((prev) => prev.filter((c) => c.id !== certId));
      }
    } catch (err) {
      console.error('Failed to delete certification', err);
    }
  };

  const getInitials = (first: string, last: string) => {
    return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
  };

  const tabs: { id: TabType; label: string; count?: number }[] = [
    { id: 'overview', label: 'Employment & Org' },
    { id: 'personal', label: 'Personal & Contact' },
    { id: 'emergency', label: 'Emergency Contact' },
    { id: 'documents', label: 'Documents', count: documents.length },
    { id: 'skills', label: 'Skills & Certifications', count: skills.length + certifications.length },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(2, 6, 23, 0.7)',
          backdropFilter: 'blur(4px)',
          animation: 'fadeIn 0.2s ease',
        }}
      />

      {/* Slide-over Drawer Panel */}
      <aside
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '640px',
          height: '100vh',
          backgroundColor: 'var(--bg-surface)',
          borderLeft: '1px solid var(--border-subtle)',
          boxShadow: '-8px 0 32px rgba(0, 0, 0, 0.4)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1001,
          animation: 'slideInRight 0.25s ease',
        }}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '24px 28px 20px',
            borderBottom: '1px solid var(--border-subtle)',
            backgroundColor: 'var(--bg-card)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              marginBottom: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  backgroundColor: 'var(--brand-primary)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '20px',
                  fontFamily: 'var(--font-display)',
                  boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)',
                  flexShrink: 0,
                }}
              >
                {employee.profileImage ? (
                  <img
                    src={employee.profileImage}
                    alt={`${employee.firstName} ${employee.lastName}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  getInitials(employee.firstName, employee.lastName)
                )}
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h2
                    style={{
                      fontSize: '20px',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-display)',
                    }}
                  >
                    {employee.firstName} {employee.lastName}
                  </h2>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'rgba(148, 163, 184, 0.1)',
                      color: 'var(--text-secondary)',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    {employee.employeeCode}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: '14px',
                    color: 'var(--text-secondary)',
                    marginTop: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span>{employee.designation}</span>
                  <span>•</span>
                  <span>{departmentName}</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                onClick={() => onEdit(employee)}
                title="Edit Employee"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 12px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--brand-primary)',
                  color: '#ffffff',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: 'none',
                }}
              >
                <Edit2 size={13} />
                Edit
              </button>

              <button
                type="button"
                onClick={onClose}
                title="Close"
                style={{
                  padding: '8px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-elevated)',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Quick Badges & Meta */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexWrap: 'wrap',
              fontSize: '13px',
              color: 'var(--text-muted)',
            }}
          >
            <EmployeeStatusBadge status={employee.employmentStatus} size="md" />
            <EmploymentTypeBadge type={employee.employmentType} size="md" />

            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-secondary)' }}>
              <MapPin size={13} style={{ color: 'var(--text-muted)' }} />
              <span>{employee.workLocation}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-secondary)' }}>
              <Calendar size={13} style={{ color: 'var(--text-muted)' }} />
              <span>Joined {formatDate(employee.joiningDate)}</span>
            </div>
          </div>

          {/* Cross-Module Quick Jump Actions */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: '16px',
              paddingTop: '14px',
              borderTop: '1px solid var(--border-subtle)',
              flexWrap: 'wrap',
            }}
          >
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Connected HRMS Views:
            </span>
            <button
              type="button"
              onClick={() => {
                onClose();
                navigate('/hrms/payroll');
              }}
              style={{
                fontSize: '11.5px',
                padding: '4px 9px',
                borderRadius: '6px',
                backgroundColor: 'rgba(99, 102, 241, 0.12)',
                color: 'var(--brand-primary)',
                border: '1px solid rgba(99, 102, 241, 0.25)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <span>Payroll</span>
              <ExternalLink size={11} />
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                navigate('/hrms/attendance');
              }}
              style={{
                fontSize: '11.5px',
                padding: '4px 9px',
                borderRadius: '6px',
                backgroundColor: 'rgba(168, 85, 247, 0.12)',
                color: 'var(--team-c-accent)',
                border: '1px solid rgba(168, 85, 247, 0.25)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <span>Attendance</span>
              <ExternalLink size={11} />
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                navigate('/hrms/leave');
              }}
              style={{
                fontSize: '11.5px',
                padding: '4px 9px',
                borderRadius: '6px',
                backgroundColor: 'rgba(16, 185, 129, 0.12)',
                color: '#10b981',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <span>Leaves</span>
              <ExternalLink size={11} />
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                navigate('/hrms/ess-assets');
              }}
              style={{
                fontSize: '11.5px',
                padding: '4px 9px',
                borderRadius: '6px',
                backgroundColor: 'rgba(245, 158, 11, 0.12)',
                color: '#f59e0b',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <span>ESS &amp; Assets</span>
              <ExternalLink size={11} />
            </button>
          </div>
        </div>

        {/* Tabs Bar */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid var(--border-subtle)',
            backgroundColor: 'var(--bg-elevated)',
            overflowX: 'auto',
            padding: '0 16px',
            gap: '8px',
          }}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '12px 14px',
                  fontSize: '13px',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? 'var(--brand-primary)' : 'var(--text-secondary)',
                  borderBottom: `2px solid ${isActive ? 'var(--brand-primary)' : 'transparent'}`,
                  backgroundColor: 'transparent',
                  borderTop: 'none',
                  borderLeft: 'none',
                  borderRight: 'none',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'color var(--transition-fast)',
                }}
              >
                {tab.label}
                {tab.count !== undefined && (
                  <span
                    style={{
                      fontSize: '11px',
                      padding: '1px 6px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: isActive
                        ? 'rgba(99, 102, 241, 0.2)'
                        : 'rgba(148, 163, 184, 0.1)',
                      color: isActive ? 'var(--brand-primary)' : 'var(--text-muted)',
                    }}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Drawer Body */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px 28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {/* TAB 1: OVERVIEW & EMPLOYMENT */}
          {activeTab === 'overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Organization & Hierarchy */}
              <div
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '18px 20px',
                }}
              >
                <h4
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <Building size={16} style={{ color: 'var(--brand-primary)' }} />
                  Department & Role Mapping
                </h4>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '16px',
                    fontSize: '13px',
                  }}
                >
                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '3px' }}>
                      Department
                    </span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                      {departmentName}
                    </span>
                    {department?.costCenterCode && (
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginTop: '2px' }}>
                        Cost Center: {department.costCenterCode}
                      </span>
                    )}
                  </div>

                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '3px' }}>
                      Designation / Role
                    </span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                      {employee.designation}
                    </span>
                  </div>

                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '3px' }}>
                      Reporting Manager
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)', fontWeight: 500 }}>
                      <User size={13} style={{ color: 'var(--text-secondary)' }} />
                      <span>{managerName}</span>
                    </div>
                  </div>

                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '3px' }}>
                      Work Location
                    </span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                      {employee.workLocation}
                    </span>
                  </div>
                </div>
              </div>

              {/* Compensation & Structure */}
              <div
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '18px 20px',
                }}
              >
                <h4
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <DollarSign size={16} style={{ color: '#10b981' }} />
                  Compensation & Package
                </h4>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '16px',
                    fontSize: '13px',
                  }}
                >
                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '3px' }}>
                      Base Annual Salary
                    </span>
                    <span style={{ color: '#34d399', fontWeight: 700, fontSize: '16px', fontFamily: 'var(--font-mono)' }}>
                      {formatCurrency(employee.baseSalary, 'USD')}
                    </span>
                  </div>

                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '3px' }}>
                      Salary Structure Template
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '12px',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {employee.salaryStructureId || 'STANDARD-EXEMPT'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Lifecycle & Timestamps */}
              <div
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px 20px',
                  fontSize: '12px',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '8px',
                }}
              >
                <span>Joined Date: <strong style={{ color: 'var(--text-secondary)' }}>{formatDate(employee.joiningDate)}</strong></span>
                <span>Profile Created: <strong style={{ color: 'var(--text-secondary)' }}>{formatDate(employee.createdAt)}</strong></span>
                <span>Last Updated: <strong style={{ color: 'var(--text-secondary)' }}>{formatDate(employee.updatedAt)}</strong></span>
              </div>
            </div>
          )}

          {/* TAB 2: PERSONAL & CONTACT */}
          {activeTab === 'personal' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Personal Details */}
              <div
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '18px 20px',
                }}
              >
                <h4
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <User size={16} style={{ color: 'var(--brand-primary)' }} />
                  Personal Information
                </h4>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '16px',
                    fontSize: '13px',
                  }}
                >
                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '3px' }}>
                      Date of Birth
                    </span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                      {formatDate(employee.dateOfBirth)}
                    </span>
                  </div>

                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '3px' }}>
                      Gender
                    </span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                      {employee.gender}
                    </span>
                  </div>

                  {employee.panNumber && (
                    <div>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '3px' }}>
                        PAN Number
                      </span>
                      <span style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                        {employee.panNumber}
                      </span>
                    </div>
                  )}

                  {employee.uanNumber && (
                    <div>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '3px' }}>
                        Universal Account Number (UAN)
                      </span>
                      <span style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                        {employee.uanNumber}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Direct Contact & Address */}
              <div
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '18px 20px',
                }}
              >
                <h4
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <Mail size={16} style={{ color: 'var(--brand-primary)' }} />
                  Contact Information & Address
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Mail size={15} style={{ color: 'var(--text-muted)' }} />
                    <span style={{ color: 'var(--text-muted)', width: '60px' }}>Email:</span>
                    <a href={`mailto:${employee.email}`} style={{ color: 'var(--brand-primary)', fontWeight: 500 }}>
                      {employee.email}
                    </a>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Phone size={15} style={{ color: 'var(--text-muted)' }} />
                    <span style={{ color: 'var(--text-muted)', width: '60px' }}>Phone:</span>
                    <a href={`tel:${employee.phone}`} style={{ color: 'var(--brand-primary)', fontWeight: 500 }}>
                      {employee.phone}
                    </a>
                  </div>

                  <div
                    style={{
                      borderTop: '1px solid var(--border-subtle)',
                      paddingTop: '12px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                    }}
                  >
                    <MapPin size={15} style={{ color: 'var(--text-muted)', marginTop: '2px' }} />
                    <div>
                      <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '12px', marginBottom: '2px' }}>
                        Residential Address ({employee.address?.addressType || 'HOME'}):
                      </span>
                      <div style={{ color: 'var(--text-primary)', lineHeight: 1.5 }}>
                        {employee.address?.street}
                        {employee.address?.addressLine2 ? `, ${employee.address.addressLine2}` : ''}
                        <br />
                        {employee.address?.city}, {employee.address?.state} {employee.address?.postalCode}
                        <br />
                        {employee.address?.country}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: EMERGENCY CONTACT */}
          {activeTab === 'emergency' && (
            <EmergencyContactSection
              contact={employee.emergencyContact}
              onEdit={() => onEdit(employee)}
            />
          )}

          {/* TAB 4: DOCUMENTS */}
          {activeTab === 'documents' && (
            <EmployeeDocumentSection
              employeeId={employee.id}
              documents={documents}
              onVerifyStatus={handleVerifyStatus}
              onAddDocument={handleAddDocument}
            />
          )}

          {/* TAB 5: SKILLS & CERTIFICATIONS */}
          {activeTab === 'skills' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Skills Section */}
              <div
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '18px 20px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '16px',
                    flexWrap: 'wrap',
                    gap: '8px',
                  }}
                >
                  <h4
                    style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <BookOpen size={16} style={{ color: 'var(--brand-primary)' }} />
                    Core Competencies & Skills ({skills.length})
                  </h4>

                  {!showAddSkill && (
                    <button
                      type="button"
                      onClick={() => setShowAddSkill(true)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: 'var(--brand-primary)',
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid rgba(99, 102, 241, 0.3)',
                        backgroundColor: 'rgba(99, 102, 241, 0.08)',
                        cursor: 'pointer',
                      }}
                    >
                      <Plus size={13} />
                      Add Skill
                    </button>
                  )}
                </div>

                {/* Add Skill Form */}
                {showAddSkill && (
                  <form
                    onSubmit={handleAddSkill}
                    style={{
                      backgroundColor: 'var(--bg-elevated)',
                      border: '1px solid var(--border-focus)',
                      borderRadius: 'var(--radius-md)',
                      padding: '14px',
                      marginBottom: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                    }}
                  >
                    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      Add Skill to Employee Profile
                    </div>

                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                        gap: '10px',
                      }}
                    >
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '3px' }}>
                          Skill Name *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. React 19, Python, System Design"
                          value={newSkillName}
                          onChange={(e) => setNewSkillName(e.target.value)}
                          required
                          style={{
                            width: '100%',
                            padding: '6px 10px',
                            fontSize: '13px',
                            backgroundColor: 'var(--bg-input)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: 'var(--radius-sm)',
                            color: 'var(--text-primary)',
                            outline: 'none',
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '3px' }}>
                          Category
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Frontend, Cloud, Management"
                          value={newSkillCategory}
                          onChange={(e) => setNewSkillCategory(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '6px 10px',
                            fontSize: '13px',
                            backgroundColor: 'var(--bg-input)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: 'var(--radius-sm)',
                            color: 'var(--text-primary)',
                            outline: 'none',
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '3px' }}>
                          Proficiency Level
                        </label>
                        <select
                          value={newSkillProficiency}
                          onChange={(e) => setNewSkillProficiency(e.target.value as SkillProficiency)}
                          style={{
                            width: '100%',
                            padding: '6px 10px',
                            fontSize: '13px',
                            backgroundColor: 'var(--bg-input)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: 'var(--radius-sm)',
                            color: 'var(--text-primary)',
                            outline: 'none',
                          }}
                        >
                          <option value="BEGINNER">Beginner</option>
                          <option value="INTERMEDIATE">Intermediate</option>
                          <option value="ADVANCED">Advanced</option>
                          <option value="EXPERT">Expert</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '4px' }}>
                      <button
                        type="button"
                        onClick={() => setShowAddSkill(false)}
                        style={{
                          fontSize: '12px',
                          padding: '5px 10px',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--border-subtle)',
                          color: 'var(--text-secondary)',
                          backgroundColor: 'transparent',
                          cursor: 'pointer',
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={savingSkill || !newSkillName.trim()}
                        style={{
                          fontSize: '12px',
                          fontWeight: 600,
                          padding: '5px 12px',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: 'var(--brand-primary)',
                          color: '#ffffff',
                          border: 'none',
                          cursor: savingSkill ? 'not-allowed' : 'pointer',
                        }}
                      >
                        {savingSkill ? 'Adding...' : 'Save Skill'}
                      </button>
                    </div>
                  </form>
                )}

                {skills.length === 0 ? (
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                    No recorded skills for this employee.
                  </p>
                ) : (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {skills.map((skill) => (
                      <div
                        key={skill.id}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '6px 10px',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: 'var(--bg-elevated)',
                          border: '1px solid var(--border-subtle)',
                          fontSize: '12.5px',
                        }}
                      >
                        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                          {skill.name}
                        </span>
                        <span
                          style={{
                            fontSize: '10.5px',
                            fontWeight: 600,
                            padding: '1px 6px',
                            borderRadius: '4px',
                            backgroundColor:
                              skill.proficiencyLevel === 'EXPERT'
                                ? 'rgba(16, 185, 129, 0.15)'
                                : skill.proficiencyLevel === 'ADVANCED'
                                ? 'rgba(99, 102, 241, 0.15)'
                                : 'rgba(148, 163, 184, 0.15)',
                            color:
                              skill.proficiencyLevel === 'EXPERT'
                                ? '#34d399'
                                : skill.proficiencyLevel === 'ADVANCED'
                                ? '#a5b4fc'
                                : 'var(--text-secondary)',
                          }}
                        >
                          {skill.proficiencyLevel}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleDeleteSkill(skill.id)}
                          title={`Remove ${skill.name}`}
                          style={{
                            color: 'var(--text-muted)',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            padding: '2px',
                            marginLeft: '2px',
                            borderRadius: '3px',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = 'var(--status-danger)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'var(--text-muted)';
                          }}
                        >
                          <X size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Certifications Section */}
              <div
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '18px 20px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '16px',
                    flexWrap: 'wrap',
                    gap: '8px',
                  }}
                >
                  <h4
                    style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <Award size={16} style={{ color: '#f59e0b' }} />
                    Professional Certifications ({certifications.length})
                  </h4>

                  {!showAddCert && (
                    <button
                      type="button"
                      onClick={() => setShowAddCert(true)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: 'var(--brand-primary)',
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid rgba(99, 102, 241, 0.3)',
                        backgroundColor: 'rgba(99, 102, 241, 0.08)',
                        cursor: 'pointer',
                      }}
                    >
                      <Plus size={13} />
                      Add Certification
                    </button>
                  )}
                </div>

                {/* Add Certification Form */}
                {showAddCert && (
                  <form
                    onSubmit={handleAddCertification}
                    style={{
                      backgroundColor: 'var(--bg-elevated)',
                      border: '1px solid var(--border-focus)',
                      borderRadius: 'var(--radius-md)',
                      padding: '14px',
                      marginBottom: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                    }}
                  >
                    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      Register New Professional Certification
                    </div>

                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                        gap: '10px',
                      }}
                    >
                      <div>
                        <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '3px' }}>
                          Certification Title *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. AWS Certified Solutions Architect"
                          value={newCertName}
                          onChange={(e) => setNewCertName(e.target.value)}
                          required
                          style={{
                            width: '100%',
                            padding: '6px 10px',
                            fontSize: '13px',
                            backgroundColor: 'var(--bg-input)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: 'var(--radius-sm)',
                            color: 'var(--text-primary)',
                            outline: 'none',
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '3px' }}>
                          Issuing Organization *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Amazon Web Services, Scrum.org"
                          value={newCertIssuer}
                          onChange={(e) => setNewCertIssuer(e.target.value)}
                          required
                          style={{
                            width: '100%',
                            padding: '6px 10px',
                            fontSize: '13px',
                            backgroundColor: 'var(--bg-input)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: 'var(--radius-sm)',
                            color: 'var(--text-primary)',
                            outline: 'none',
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '3px' }}>
                          Issue Date
                        </label>
                        <input
                          type="date"
                          value={newCertIssueDate}
                          onChange={(e) => setNewCertIssueDate(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '6px 10px',
                            fontSize: '13px',
                            backgroundColor: 'var(--bg-input)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: 'var(--radius-sm)',
                            color: 'var(--text-primary)',
                            outline: 'none',
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '3px' }}>
                          Expiry Date (Optional)
                        </label>
                        <input
                          type="date"
                          value={newCertExpiryDate}
                          onChange={(e) => setNewCertExpiryDate(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '6px 10px',
                            fontSize: '13px',
                            backgroundColor: 'var(--bg-input)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: 'var(--radius-sm)',
                            color: 'var(--text-primary)',
                            outline: 'none',
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '3px' }}>
                          Credential ID
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. AWS-PSA-94827"
                          value={newCertCredId}
                          onChange={(e) => setNewCertCredId(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '6px 10px',
                            fontSize: '13px',
                            backgroundColor: 'var(--bg-input)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: 'var(--radius-sm)',
                            color: 'var(--text-primary)',
                            outline: 'none',
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '3px' }}>
                          Credential URL
                        </label>
                        <input
                          type="url"
                          placeholder="https://..."
                          value={newCertCredUrl}
                          onChange={(e) => setNewCertCredUrl(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '6px 10px',
                            fontSize: '13px',
                            backgroundColor: 'var(--bg-input)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: 'var(--radius-sm)',
                            color: 'var(--text-primary)',
                            outline: 'none',
                          }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '4px' }}>
                      <button
                        type="button"
                        onClick={() => setShowAddCert(false)}
                        style={{
                          fontSize: '12px',
                          padding: '5px 10px',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--border-subtle)',
                          color: 'var(--text-secondary)',
                          backgroundColor: 'transparent',
                          cursor: 'pointer',
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={savingCert || !newCertName.trim() || !newCertIssuer.trim()}
                        style={{
                          fontSize: '12px',
                          fontWeight: 600,
                          padding: '5px 12px',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: 'var(--brand-primary)',
                          color: '#ffffff',
                          border: 'none',
                          cursor: savingCert ? 'not-allowed' : 'pointer',
                        }}
                      >
                        {savingCert ? 'Saving...' : 'Save Certification'}
                      </button>
                    </div>
                  </form>
                )}

                {certifications.length === 0 ? (
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                    No certifications registered.
                  </p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {certifications.map((cert) => (
                      <div
                        key={cert.id}
                        style={{
                          padding: '12px 14px',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: 'var(--bg-elevated)',
                          border: '1px solid var(--border-subtle)',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                          gap: '10px',
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '13.5px' }}>
                            {cert.name}
                          </div>
                          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                            Issued by {cert.issuingOrganization} • {formatDate(cert.issueDate)}
                            {cert.expiryDate ? ` (Expires ${formatDate(cert.expiryDate)})` : ' (No Expiration)'}
                          </div>
                          {cert.credentialId && (
                            <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', marginTop: '4px' }}>
                              Credential ID: {cert.credentialId}
                            </div>
                          )}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {cert.credentialUrl && (
                            <a
                              href={cert.credentialUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                fontSize: '12px',
                                color: 'var(--brand-primary)',
                                padding: '4px 8px',
                                borderRadius: 'var(--radius-sm)',
                                border: '1px solid rgba(99, 102, 241, 0.3)',
                              }}
                            >
                              <ExternalLink size={12} />
                              Verify
                            </a>
                          )}

                          <button
                            type="button"
                            onClick={() => handleDeleteCertification(cert.id)}
                            title="Remove certification"
                            style={{
                              padding: '5px 8px',
                              borderRadius: 'var(--radius-sm)',
                              border: '1px solid var(--border-subtle)',
                              backgroundColor: 'transparent',
                              color: 'var(--text-muted)',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = 'var(--status-danger)';
                              e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = 'var(--text-muted)';
                              e.currentTarget.style.borderColor = 'var(--border-subtle)';
                            }}
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {loadingExtras && (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '12px' }}>
              Refreshing extra profile resources...
            </div>
          )}
        </div>
      </aside>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};
