import React, { useState } from 'react';
import {
  User,
  FileText,
  HelpCircle,
  Calendar,
  Mail,
  Phone,
  MapPin,
  HeartHandshake,
  Plus,
  Eye,
  Briefcase,
  ShieldCheck,
  CreditCard,
} from 'lucide-react';
import type {
  Employee,
  Department,
  EmployeeDocument,
  EmployeeRequest,
  LeaveBalance,
  AttendanceRecord,
  CreateEmployeeRequestPayload,
} from '../../types';

interface EssProfileSectionProps {
  employee: Employee;
  department: Department | null;
  documents: EmployeeDocument[];
  requests: EmployeeRequest[];
  leaveBalances: LeaveBalance[];
  attendanceRecords: AttendanceRecord[];
  assignedAssetsCount: number;
  onRequestClick: (initialType?: CreateEmployeeRequestPayload['requestType']) => void;
  onUploadDocumentClick: () => void;
  onViewDocumentClick: (doc: EmployeeDocument) => void;
}

type EssSubsection =
  | 'my-profile'
  | 'my-details'
  | 'personal-info'
  | 'contact-info'
  | 'my-requests'
  | 'my-documents'
  | 'leave-attendance';

export const EssProfileSection: React.FC<EssProfileSectionProps> = ({
  employee,
  department,
  documents,
  requests,
  leaveBalances,
  attendanceRecords,
  assignedAssetsCount,
  onRequestClick,
  onUploadDocumentClick,
  onViewDocumentClick,
}) => {
  const [activeSub, setActiveSub] = useState<EssSubsection>('my-profile');
  const [requestFilter, setRequestFilter] = useState<'ALL' | 'OPEN' | 'IN_REVIEW' | 'RESOLVED' | 'REJECTED'>('ALL');

  const openRequestsCount = requests.filter((r) => r.status === 'OPEN' || r.status === 'IN_REVIEW').length;
  const totalAvailableLeave = leaveBalances.reduce((sum, b) => sum + b.availableDays, 0);

  const filteredRequests = requestFilter === 'ALL'
    ? requests
    : requests.filter((r) => r.status === requestFilter);

  const formatCurrency = (val: number): string => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Sub-navigation bar */}
      <div className="ess-subnav" role="tablist">
        <button
          type="button"
          className={`ess-subnav-btn ${activeSub === 'my-profile' ? 'active' : ''}`}
          onClick={() => setActiveSub('my-profile')}
        >
          <User size={15} /> My Profile
        </button>
        <button
          type="button"
          className={`ess-subnav-btn ${activeSub === 'my-details' ? 'active' : ''}`}
          onClick={() => setActiveSub('my-details')}
        >
          <Briefcase size={15} /> My Details
        </button>
        <button
          type="button"
          className={`ess-subnav-btn ${activeSub === 'personal-info' ? 'active' : ''}`}
          onClick={() => setActiveSub('personal-info')}
        >
          <ShieldCheck size={15} /> Personal Information
        </button>
        <button
          type="button"
          className={`ess-subnav-btn ${activeSub === 'contact-info' ? 'active' : ''}`}
          onClick={() => setActiveSub('contact-info')}
        >
          <Phone size={15} /> Contact Information
        </button>
        <button
          type="button"
          className={`ess-subnav-btn ${activeSub === 'my-requests' ? 'active' : ''}`}
          onClick={() => setActiveSub('my-requests')}
        >
          <HelpCircle size={15} /> My Requests
          {openRequestsCount > 0 && (
            <span
              style={{
                backgroundColor: 'rgba(99, 102, 241, 0.25)',
                color: '#818cf8',
                borderRadius: '999px',
                padding: '1px 6px',
                fontSize: '11px',
                fontWeight: 700,
              }}
            >
              {openRequestsCount}
            </span>
          )}
        </button>
        <button
          type="button"
          className={`ess-subnav-btn ${activeSub === 'my-documents' ? 'active' : ''}`}
          onClick={() => setActiveSub('my-documents')}
        >
          <FileText size={15} /> My Documents ({documents.length})
        </button>
        <button
          type="button"
          className={`ess-subnav-btn ${activeSub === 'leave-attendance' ? 'active' : ''}`}
          onClick={() => setActiveSub('leave-attendance')}
        >
          <Calendar size={15} /> Leave & Attendance
        </button>
      </div>

      {/* =========================================================================
          SUBSECTION 1: MY PROFILE
          ========================================================================= */}
      {activeSub === 'my-profile' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Hero Profile Card */}
          <div className="ess-profile-hero">
            <div className="ess-profile-hero-left">
              <div className="ess-hero-avatar">
                {employee.firstName[0]}{employee.lastName[0]}
              </div>
              <div>
                <div className="ess-hero-name-row">
                  <h2 className="ess-hero-name">
                    {employee.firstName} {employee.lastName}
                  </h2>
                  <span className="ess-hero-code">{employee.employeeCode}</span>
                  <span
                    className={`badge-status-pill ${
                      employee.employmentStatus === 'ACTIVE'
                        ? 'badge-status-verified'
                        : 'badge-status-pending'
                    }`}
                  >
                    {employee.employmentStatus}
                  </span>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {employee.employmentType.replace('_', ' ')}
                  </span>
                </div>

                <p className="ess-hero-role">
                  {employee.designation} • Department: <strong>{department ? department.name : 'Unassigned'}</strong>
                </p>

                <div className="ess-hero-meta">
                  <span className="ess-hero-meta-item">
                    <Mail size={14} /> {employee.email}
                  </span>
                  <span className="ess-hero-meta-item">
                    <Phone size={14} /> {employee.phone}
                  </span>
                  <span className="ess-hero-meta-item">
                    <MapPin size={14} /> {employee.workLocation}
                  </span>
                  <span className="ess-hero-meta-item">
                    <Calendar size={14} /> Joined {new Date(employee.joiningDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                className="ess-subnav-btn"
                style={{ backgroundColor: 'var(--bg-elevated)', color: 'var(--text-primary)' }}
                onClick={() => onRequestClick('INFO_UPDATE')}
              >
                Update Profile Info
              </button>
              <button
                type="button"
                className="ess-subnav-btn"
                style={{ backgroundColor: 'var(--brand-primary)', color: '#ffffff', fontWeight: 600 }}
                onClick={() => onRequestClick('LETTER_REQUEST')}
              >
                <Plus size={15} /> Request Letter
              </button>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="ess-metrics-grid">
            <div className="ess-metric-box">
              <span className="ess-metric-title">Assigned Hardware Assets</span>
              <span className="ess-metric-val">{assignedAssetsCount}</span>
              <span className="ess-metric-sub">Laptops & peripherals in custody</span>
            </div>
            <div className="ess-metric-box">
              <span className="ess-metric-title">Open Self-Service Requests</span>
              <span className="ess-metric-val">{openRequestsCount}</span>
              <span className="ess-metric-sub">Pending HR & IT review</span>
            </div>
            <div className="ess-metric-box">
              <span className="ess-metric-title">Available Paid Leave</span>
              <span className="ess-metric-val" style={{ color: '#10b981' }}>{totalAvailableLeave} Days</span>
              <span className="ess-metric-sub">Annual & casual balance for 2026</span>
            </div>
            <div className="ess-metric-box">
              <span className="ess-metric-title">Verified Documents in Vault</span>
              <span className="ess-metric-val">{documents.filter((d) => d.status === 'VERIFIED').length} / {documents.length}</span>
              <span className="ess-metric-sub">Confidential HR compliance records</span>
            </div>
          </div>

          {/* Dual Column Information Cards */}
          <div className="ess-details-grid">
            {/* Quick Contact Card */}
            <div className="ess-card">
              <div className="ess-card-header">
                <h4 className="ess-card-title">
                  <MapPin size={18} style={{ color: 'var(--brand-primary)' }} />
                  Residential Address & Primary Contact
                </h4>
                <button
                  type="button"
                  onClick={() => setActiveSub('contact-info')}
                  className="ess-subnav-btn"
                  style={{ fontSize: '11px', padding: '2px 8px' }}
                >
                  View Details →
                </button>
              </div>
              <div className="ess-row-list">
                <div className="ess-row-item">
                  <span className="ess-row-label">Street Address:</span>
                  <span className="ess-row-value">{employee.address.street}</span>
                </div>
                <div className="ess-row-item">
                  <span className="ess-row-label">City & State:</span>
                  <span className="ess-row-value">{employee.address.city}, {employee.address.state}</span>
                </div>
                <div className="ess-row-item">
                  <span className="ess-row-label">Postal Code:</span>
                  <span className="ess-row-value">{employee.address.postalCode}</span>
                </div>
                <div className="ess-row-item">
                  <span className="ess-row-label">Country:</span>
                  <span className="ess-row-value">{employee.address.country}</span>
                </div>
              </div>
            </div>

            {/* Emergency Contact Card */}
            <div className="ess-card">
              <div className="ess-card-header">
                <h4 className="ess-card-title">
                  <HeartHandshake size={18} style={{ color: '#ef4444' }} />
                  Emergency Contact
                </h4>
                <button
                  type="button"
                  onClick={() => onRequestClick('INFO_UPDATE')}
                  className="ess-subnav-btn"
                  style={{ fontSize: '11px', padding: '2px 8px' }}
                >
                  Request Update
                </button>
              </div>
              <div className="ess-row-list">
                <div className="ess-row-item">
                  <span className="ess-row-label">Full Name:</span>
                  <span className="ess-row-value">{employee.emergencyContact.name}</span>
                </div>
                <div className="ess-row-item">
                  <span className="ess-row-label">Relationship:</span>
                  <span className="ess-row-value">{employee.emergencyContact.relationship}</span>
                </div>
                <div className="ess-row-item">
                  <span className="ess-row-label">Primary Phone:</span>
                  <span className="ess-row-value">{employee.emergencyContact.phone}</span>
                </div>
                <div className="ess-row-item">
                  <span className="ess-row-label">Alternate Phone:</span>
                  <span className="ess-row-value">{employee.emergencyContact.alternatePhone || 'None on record'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SUBSECTION 2: MY DETAILS
          ========================================================================= */}
      {activeSub === 'my-details' && (
        <div className="ess-details-grid">
          <div className="ess-card">
            <h4 className="ess-card-title">
              <Briefcase size={18} style={{ color: 'var(--brand-primary)' }} />
              Employment Master Records
            </h4>
            <div className="ess-row-list">
              <div className="ess-row-item">
                <span className="ess-row-label">Employee Code:</span>
                <span className="ess-row-value" style={{ fontFamily: 'var(--font-mono)' }}>{employee.employeeCode}</span>
              </div>
              <div className="ess-row-item">
                <span className="ess-row-label">Designation / Role:</span>
                <span className="ess-row-value">{employee.designation}</span>
              </div>
              <div className="ess-row-item">
                <span className="ess-row-label">Department:</span>
                <span className="ess-row-value">{department ? department.name : 'Unassigned'} ({department?.departmentCode || 'N/A'})</span>
              </div>
              <div className="ess-row-item">
                <span className="ess-row-label">Department Cost Center:</span>
                <span className="ess-row-value" style={{ fontFamily: 'var(--font-mono)' }}>{department?.costCenterCode || 'N/A'}</span>
              </div>
              <div className="ess-row-item">
                <span className="ess-row-label">Employment Type:</span>
                <span className="ess-row-value">{employee.employmentType.replace('_', ' ')}</span>
              </div>
              <div className="ess-row-item">
                <span className="ess-row-label">Status:</span>
                <span className="ess-row-value">{employee.employmentStatus}</span>
              </div>
              <div className="ess-row-item">
                <span className="ess-row-label">Official Joining Date:</span>
                <span className="ess-row-value">{new Date(employee.joiningDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="ess-card">
            <h4 className="ess-card-title">
              <CreditCard size={18} style={{ color: '#10b981' }} />
              Compensation & Statutory Compliance
            </h4>
            <div className="ess-row-list">
              <div className="ess-row-item">
                <span className="ess-row-label">Base Monthly Salary:</span>
                <span className="ess-row-value" style={{ color: '#10b981', fontSize: '15px' }}>{formatCurrency(employee.baseSalary)}</span>
              </div>
              <div className="ess-row-item">
                <span className="ess-row-label">Salary Structure Reference:</span>
                <span className="ess-row-value" style={{ fontFamily: 'var(--font-mono)' }}>{employee.salaryStructureId || 'Standard Level Band'}</span>
              </div>
              <div className="ess-row-item">
                <span className="ess-row-label">Tax ID / PAN Number:</span>
                <span className="ess-row-value" style={{ fontFamily: 'var(--font-mono)' }}>{employee.panNumber || 'Not on file'}</span>
              </div>
              <div className="ess-row-item">
                <span className="ess-row-label">Universal Account Number (UAN):</span>
                <span className="ess-row-value" style={{ fontFamily: 'var(--font-mono)' }}>{employee.uanNumber || 'Not on file'}</span>
              </div>
              <div className="ess-row-item">
                <span className="ess-row-label">Work Location / Office:</span>
                <span className="ess-row-value">{employee.workLocation}</span>
              </div>
              <div className="ess-row-item">
                <span className="ess-row-label">Profile Created:</span>
                <span className="ess-row-value">{new Date(employee.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SUBSECTION 3: PERSONAL INFORMATION
          ========================================================================= */}
      {activeSub === 'personal-info' && (
        <div className="ess-details-grid">
          <div className="ess-card">
            <h4 className="ess-card-title">
              <ShieldCheck size={18} style={{ color: 'var(--brand-primary)' }} />
              Personal & Demographics Record
            </h4>
            <div className="ess-row-list">
              <div className="ess-row-item">
                <span className="ess-row-label">Full Name:</span>
                <span className="ess-row-value">{employee.firstName} {employee.lastName}</span>
              </div>
              <div className="ess-row-item">
                <span className="ess-row-label">Date of Birth:</span>
                <span className="ess-row-value">{new Date(employee.dateOfBirth).toLocaleDateString()}</span>
              </div>
              <div className="ess-row-item">
                <span className="ess-row-label">Gender:</span>
                <span className="ess-row-value">{employee.gender}</span>
              </div>
              <div className="ess-row-item">
                <span className="ess-row-label">Work Location:</span>
                <span className="ess-row-value">{employee.workLocation}</span>
              </div>
            </div>

            <div
              style={{
                marginTop: '16px',
                padding: '14px',
                backgroundColor: 'var(--bg-elevated)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                Notice on Changing Personal Details:
              </span>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Under enterprise HR compliance rules, modifications to legal name, date of birth, or identification documents require submitting an Information Update Request along with supporting documentation.
              </p>
              <button
                type="button"
                className="ess-subnav-btn"
                style={{
                  alignSelf: 'flex-start',
                  backgroundColor: 'var(--brand-primary)',
                  color: '#ffffff',
                  fontWeight: 600,
                  marginTop: '4px',
                }}
                onClick={() => onRequestClick('INFO_UPDATE')}
              >
                Submit Update Request
              </button>
            </div>
          </div>

          <div className="ess-card">
            <h4 className="ess-card-title">
              <HeartHandshake size={18} style={{ color: '#ef4444' }} />
              Emergency Contact Record
            </h4>
            <div className="ess-row-list">
              <div className="ess-row-item">
                <span className="ess-row-label">Contact Name:</span>
                <span className="ess-row-value">{employee.emergencyContact.name}</span>
              </div>
              <div className="ess-row-item">
                <span className="ess-row-label">Relationship:</span>
                <span className="ess-row-value">{employee.emergencyContact.relationship}</span>
              </div>
              <div className="ess-row-item">
                <span className="ess-row-label">Primary Mobile Phone:</span>
                <span className="ess-row-value">{employee.emergencyContact.phone}</span>
              </div>
              <div className="ess-row-item">
                <span className="ess-row-label">Alternate Landline / Phone:</span>
                <span className="ess-row-value">{employee.emergencyContact.alternatePhone || 'None'}</span>
              </div>
              <div className="ess-row-item">
                <span className="ess-row-label">Email Address:</span>
                <span className="ess-row-value">{employee.emergencyContact.email || 'None on record'}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SUBSECTION 4: CONTACT INFORMATION
          ========================================================================= */}
      {activeSub === 'contact-info' && (
        <div className="ess-details-grid">
          <div className="ess-card">
            <h4 className="ess-card-title">
              <Phone size={18} style={{ color: 'var(--brand-primary)' }} />
              Telecommunications & Corporate Email
            </h4>
            <div className="ess-row-list">
              <div className="ess-row-item">
                <span className="ess-row-label">Corporate Work Email:</span>
                <span className="ess-row-value">{employee.email}</span>
              </div>
              <div className="ess-row-item">
                <span className="ess-row-label">Primary Mobile Phone:</span>
                <span className="ess-row-value">{employee.phone}</span>
              </div>
              <div className="ess-row-item">
                <span className="ess-row-label">Work Base Office:</span>
                <span className="ess-row-value">{employee.workLocation}</span>
              </div>
            </div>
          </div>

          <div className="ess-card">
            <h4 className="ess-card-title">
              <MapPin size={18} style={{ color: '#38bdf8' }} />
              Verified Residential Address
            </h4>
            <div className="ess-row-list">
              <div className="ess-row-item">
                <span className="ess-row-label">Street Address:</span>
                <span className="ess-row-value">{employee.address.street}</span>
              </div>
              <div className="ess-row-item">
                <span className="ess-row-label">City:</span>
                <span className="ess-row-value">{employee.address.city}</span>
              </div>
              <div className="ess-row-item">
                <span className="ess-row-label">State / Province:</span>
                <span className="ess-row-value">{employee.address.state}</span>
              </div>
              <div className="ess-row-item">
                <span className="ess-row-label">Postal / ZIP Code:</span>
                <span className="ess-row-value" style={{ fontFamily: 'var(--font-mono)' }}>{employee.address.postalCode}</span>
              </div>
              <div className="ess-row-item">
                <span className="ess-row-label">Country:</span>
                <span className="ess-row-value">{employee.address.country}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SUBSECTION 5: MY REQUESTS
          ========================================================================= */}
      {activeSub === 'my-requests' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {(['ALL', 'OPEN', 'IN_REVIEW', 'RESOLVED', 'REJECTED'] as const).map((st) => (
                <button
                  key={st}
                  type="button"
                  className={`ess-subnav-btn ${requestFilter === st ? 'active' : ''}`}
                  onClick={() => setRequestFilter(st)}
                >
                  {st.replace('_', ' ')}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="ess-subnav-btn"
              style={{ backgroundColor: 'var(--brand-primary)', color: '#ffffff', fontWeight: 600 }}
              onClick={() => onRequestClick()}
            >
              <Plus size={16} /> Raise New Request
            </button>
          </div>

          <div className="ess-table-wrap">
            <table className="ess-table">
              <thead>
                <tr>
                  <th>Request Details</th>
                  <th>Category</th>
                  <th>Submitted Date</th>
                  <th>Status</th>
                  <th>Assigned Specialist</th>
                  <th>Resolution Remarks</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>
                      No requests found for {employee.firstName} {employee.lastName} matching this filter.
                    </td>
                  </tr>
                ) : (
                  filteredRequests.map((req) => (
                    <tr key={req.id}>
                      <td>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{req.title}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px', maxWidth: '340px' }}>
                          {req.description}
                        </div>
                      </td>
                      <td>
                        <span style={{ fontSize: '11.5px', fontFamily: 'var(--font-mono)', color: '#a5b4fc' }}>
                          {req.requestType.replace('_', ' ')}
                        </span>
                      </td>
                      <td>{new Date(req.createdAt).toLocaleDateString()}</td>
                      <td>
                        <span
                          className={`badge-status-pill ${
                            req.status === 'RESOLVED'
                              ? 'badge-status-verified'
                              : req.status === 'OPEN'
                              ? 'badge-status-open'
                              : req.status === 'IN_REVIEW'
                              ? 'badge-status-pending'
                              : 'badge-status-maintenance'
                          }`}
                        >
                          {req.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td>
                        <span style={{ color: req.assignedTo ? 'var(--text-primary)' : 'var(--text-muted)', fontSize: '12.5px' }}>
                          {req.assignedTo || 'Unassigned (IT / HR Queue)'}
                        </span>
                      </td>
                      <td>
                        <span style={{ fontSize: '12px', color: req.resolutionNotes ? 'var(--text-secondary)' : 'var(--text-muted)' }}>
                          {req.resolutionNotes || '—'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =========================================================================
          SUBSECTION 6: MY DOCUMENTS
          ========================================================================= */}
      {activeSub === 'my-documents' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>
                Employee Document Vault
              </h3>
              <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
                Confidential compliance records, educational credentials, and government identity proofs.
              </p>
            </div>

            <button
              type="button"
              className="ess-subnav-btn"
              style={{ backgroundColor: 'var(--brand-primary)', color: '#ffffff', fontWeight: 600 }}
              onClick={onUploadDocumentClick}
            >
              <Plus size={16} /> Upload New Document
            </button>
          </div>

          <div className="ess-table-wrap">
            <table className="ess-table">
              <thead>
                <tr>
                  <th>Document Title</th>
                  <th>Reference Number</th>
                  <th>Uploaded Date</th>
                  <th>Verified Date</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {documents.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>
                      No documents on file for {employee.firstName} {employee.lastName}.
                    </td>
                  </tr>
                ) : (
                  documents.map((doc) => (
                    <tr key={doc.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <FileText size={16} style={{ color: 'var(--brand-primary)' }} />
                          <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{doc.documentType}</span>
                        </div>
                      </td>
                      <td>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-secondary)' }}>
                          {doc.documentNumber || '—'}
                        </span>
                      </td>
                      <td>{new Date(doc.uploadedAt).toLocaleDateString()}</td>
                      <td>
                        {doc.verifiedAt ? new Date(doc.verifiedAt).toLocaleDateString() : (
                          <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Pending Review</span>
                        )}
                      </td>
                      <td>
                        <span
                          className={`badge-status-pill ${
                            doc.status === 'VERIFIED'
                              ? 'badge-status-verified'
                              : doc.status === 'PENDING_VERIFICATION'
                              ? 'badge-status-pending'
                              : 'badge-status-maintenance'
                          }`}
                        >
                          {doc.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          type="button"
                          className="ess-subnav-btn"
                          style={{ padding: '4px 10px', fontSize: '11.5px', gap: '4px' }}
                          onClick={() => onViewDocumentClick(doc)}
                        >
                          <Eye size={13} /> View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =========================================================================
          SUBSECTION 7: LEAVE & ATTENDANCE
          ========================================================================= */}
      {activeSub === 'leave-attendance' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Leave Balances Grid */}
          <div>
            <h4 style={{ margin: '0 0 12px', fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>
              2026 Annual Leave Entitlement & Balances
            </h4>
            <div className="ess-metrics-grid">
              {leaveBalances.map((bal) => (
                <div key={bal.id} className="ess-metric-box">
                  <span className="ess-metric-title">{bal.leaveTypeName}</span>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                    <span className="ess-metric-val" style={{ color: '#10b981' }}>{bal.availableDays}</span>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>/ {bal.allocatedDays} Available</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    <span>Used: {bal.usedDays}d</span>
                    <span>Pending: {bal.pendingDays}d</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Attendance Punch History */}
          <div>
            <h4 style={{ margin: '0 0 12px', fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>
              Recent Web Terminal Attendance Punches
            </h4>
            <div className="ess-table-wrap">
              <table className="ess-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Check In</th>
                    <th>Check Out</th>
                    <th>Working Hours</th>
                    <th>Status</th>
                    <th>Audit Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceRecords.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>
                        No recent attendance records for this period.
                      </td>
                    </tr>
                  ) : (
                    attendanceRecords.map((att) => (
                      <tr key={att.id}>
                        <td>{new Date(att.date).toLocaleDateString()}</td>
                        <td style={{ fontFamily: 'var(--font-mono)' }}>{att.checkInTime || '—'}</td>
                        <td style={{ fontFamily: 'var(--font-mono)' }}>{att.checkOutTime || '—'}</td>
                        <td>
                          <strong>{att.workingHours} hrs</strong>
                        </td>
                        <td>
                          <span
                            className={`badge-status-pill ${
                              att.status === 'PRESENT'
                                ? 'badge-status-verified'
                                : 'badge-status-pending'
                            }`}
                          >
                            {att.status}
                          </span>
                        </td>
                        <td>
                          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                            {att.remarks || 'Standard work punch'}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
