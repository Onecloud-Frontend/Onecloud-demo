import React, { useState, useEffect } from 'react';
import {
  Employee,
  Department,
  EmploymentStatus,
  EmploymentType,
  Gender,
} from '../../types';
import { AddressType } from '@shared/types';
import { X, Save, User, Building, MapPin, ShieldAlert, Camera, Upload, Trash2 } from 'lucide-react';

interface EmployeeFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (employeeData: Partial<Employee>) => Promise<void>;
  initialData?: Employee | null;
  departments: Department[];
  allEmployees: Employee[];
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  designation?: string;
  departmentId?: string;
  joiningDate?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
}

export const EmployeeFormModal: React.FC<EmployeeFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  departments,
  allEmployees,
}) => {
  const isEditing = Boolean(initialData);

  // Form states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [employeeCode, setEmployeeCode] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [dateOfBirth, setDateOfBirth] = useState('1995-01-01');
  const [gender, setGender] = useState<Gender>('MALE');
  const [designation, setDesignation] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [managerId, setManagerId] = useState<string>('');
  const [employmentType, setEmploymentType] = useState<EmploymentType>('FULL_TIME');
  const [employmentStatus, setEmploymentStatus] = useState<EmploymentStatus>('ACTIVE');
  const [workLocation, setWorkLocation] = useState('San Francisco, CA');
  const [joiningDate, setJoiningDate] = useState('');
  const [baseSalary, setBaseSalary] = useState('100000');
  const [panNumber, setPanNumber] = useState('');
  const [uanNumber, setUanNumber] = useState('');

  // Address
  const [street, setStreet] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('USA');
  const [addressType, setAddressType] = useState<AddressType>('HOME');

  // Emergency contact
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyRel, setEmergencyRel] = useState('Spouse');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [emergencyAltPhone, setEmergencyAltPhone] = useState('');
  const [emergencyEmail, setEmergencyEmail] = useState('');

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setProfileImage(uploadEvent.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (initialData) {
      setFirstName(initialData.firstName);
      setLastName(initialData.lastName);
      setEmployeeCode(initialData.employeeCode);
      setEmail(initialData.email);
      setPhone(initialData.phone);
      setProfileImage(initialData.profileImage || null);
      setDateOfBirth(initialData.dateOfBirth);
      setGender(initialData.gender);
      setDesignation(initialData.designation);
      setDepartmentId(initialData.departmentId);
      setManagerId(initialData.managerId || '');
      setEmploymentType(initialData.employmentType);
      setEmploymentStatus(initialData.employmentStatus);
      setWorkLocation(initialData.workLocation);
      setJoiningDate(initialData.joiningDate);
      setBaseSalary(initialData.baseSalary.toString());
      setPanNumber(initialData.panNumber || '');
      setUanNumber(initialData.uanNumber || '');

      setStreet(initialData.address?.street || '');
      setAddressLine2(initialData.address?.addressLine2 || '');
      setCity(initialData.address?.city || '');
      setState(initialData.address?.state || '');
      setPostalCode(initialData.address?.postalCode || '');
      setCountry(initialData.address?.country || 'USA');
      setAddressType(initialData.address?.addressType || 'HOME');

      setEmergencyName(initialData.emergencyContact?.name || '');
      setEmergencyRel(initialData.emergencyContact?.relationship || 'Spouse');
      setEmergencyPhone(initialData.emergencyContact?.phone || '');
      setEmergencyAltPhone(initialData.emergencyContact?.alternatePhone || '');
      setEmergencyEmail(initialData.emergencyContact?.email || '');
    } else {
      // Defaults for new employee
      const defaultCode = `EMP-${1001 + allEmployees.length}`;
      const today = new Date().toISOString().split('T')[0];

      setFirstName('');
      setLastName('');
      setEmployeeCode(defaultCode);
      setEmail('');
      setPhone('');
      setProfileImage(null);
      setDateOfBirth('1994-06-15');
      setGender('MALE');
      setDesignation('');
      setDepartmentId(departments[0]?.id || '');
      setManagerId('');
      setEmploymentType('FULL_TIME');
      setEmploymentStatus('ACTIVE');
      setWorkLocation('San Francisco, CA');
      setJoiningDate(today);
      setBaseSalary('95000');
      setPanNumber('');
      setUanNumber('');

      setStreet('');
      setAddressLine2('');
      setCity('');
      setState('');
      setPostalCode('');
      setCountry('USA');
      setAddressType('HOME');

      setEmergencyName('');
      setEmergencyRel('Family');
      setEmergencyPhone('');
      setEmergencyAltPhone('');
      setEmergencyEmail('');
    }
    setErrors({});
  }, [initialData, isOpen, departments, allEmployees]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!firstName.trim()) errs.firstName = 'First name is required';
    if (!lastName.trim()) errs.lastName = 'Last name is required';
    if (!email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please enter a valid email address';
    }

    if (!phone.trim()) errs.phone = 'Phone number is required';
    if (!designation.trim()) errs.designation = 'Job designation is required';
    if (!departmentId) errs.departmentId = 'Department selection is required';
    if (!joiningDate) errs.joiningDate = 'Joining date is required';
    if (!emergencyName.trim()) errs.emergencyContactName = 'Emergency contact name is required';
    if (!emergencyPhone.trim()) errs.emergencyContactPhone = 'Emergency contact phone is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const payload: Partial<Employee> = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      employeeCode: employeeCode.trim(),
      email: email.trim(),
      phone: phone.trim(),
      profileImage: profileImage || null,
      dateOfBirth,
      gender,
      designation: designation.trim(),
      departmentId,
      managerId: managerId || null,
      employmentType,
      employmentStatus,
      workLocation: workLocation.trim(),
      joiningDate,
      baseSalary: parseFloat(baseSalary) || 0,
      panNumber: panNumber.trim() || undefined,
      uanNumber: uanNumber.trim() || undefined,
      address: {
        street: street.trim() || 'Not Provided',
        addressLine2: addressLine2.trim() || undefined,
        city: city.trim() || 'San Francisco',
        state: state.trim() || 'CA',
        postalCode: postalCode.trim() || '94105',
        country: country.trim() || 'USA',
        addressType,
      },
      emergencyContact: {
        name: emergencyName.trim(),
        relationship: emergencyRel.trim(),
        phone: emergencyPhone.trim(),
        alternatePhone: emergencyAltPhone.trim() || undefined,
        email: emergencyEmail.trim() || undefined,
      },
    };

    try {
      setIsSubmitting(true);
      await onSave(payload);
      onClose();
    } catch (err) {
      console.error('Failed to save employee', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: 'var(--bg-input)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 'var(--radius-md)',
    padding: '9px 12px',
    fontSize: '13.5px',
    outline: 'none',
  };

  const errorInputStyle: React.CSSProperties = {
    ...inputStyle,
    border: '1px solid var(--status-danger)',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '12.5px',
    fontWeight: 600,
    color: 'var(--text-secondary)',
    marginBottom: '5px',
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1050,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(2, 6, 23, 0.75)',
          backdropFilter: 'blur(5px)',
        }}
      />

      {/* Modal Dialog */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '820px',
          maxHeight: '90vh',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1051,
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 26px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--bg-surface)',
          }}
        >
          <div>
            <h3
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-display)',
              }}
            >
              {isEditing ? `Edit Employee — ${initialData?.firstName} ${initialData?.lastName}` : 'Add New Employee'}
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Fill in employee master profile, department mapping, and emergency contacts.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '6px',
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

        {/* Scrollable Form Body */}
        <form
          onSubmit={handleSubmit}
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px 26px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          {/* SECTION 1: Personal & Basic Info */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '14px',
                color: 'var(--brand-primary)',
              }}
            >
              <User size={16} />
              <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                Personal & Basic Information
              </h4>
            </div>

            {/* Optional Profile Photo Upload */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '12px 16px',
                backgroundColor: 'var(--bg-elevated)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                marginBottom: '16px',
                flexWrap: 'wrap',
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  backgroundColor: 'var(--bg-card)',
                  border: '2px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Avatar preview"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(99, 102, 241, 0.1)',
                      color: 'var(--brand-primary)',
                    }}
                  >
                    <Camera size={22} />
                  </div>
                )}
              </div>

              <div style={{ flex: '1 1 200px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    Profile Photo
                  </span>
                  <span
                    style={{
                      fontSize: '11px',
                      color: 'var(--text-muted)',
                      backgroundColor: 'rgba(148, 163, 184, 0.1)',
                      padding: '1px 6px',
                      borderRadius: 'var(--radius-sm)',
                    }}
                  >
                    Optional
                  </span>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Upload an employee headshot (PNG, JPG, or WEBP, up to 5MB).
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px' }}>
                  <label
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: 'var(--brand-primary)',
                      padding: '5px 12px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid rgba(99, 102, 241, 0.3)',
                      backgroundColor: 'rgba(99, 102, 241, 0.08)',
                      cursor: 'pointer',
                    }}
                  >
                    <Upload size={13} />
                    {profileImage ? 'Change Photo' : 'Upload Photo'}
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg, image/webp"
                      onChange={handleProfileImageChange}
                      style={{ display: 'none' }}
                    />
                  </label>

                  {profileImage && (
                    <button
                      type="button"
                      onClick={() => setProfileImage(null)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '12px',
                        color: 'var(--status-danger)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '4px 8px',
                      }}
                    >
                      <Trash2 size={13} />
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '14px',
              }}
            >
              <div>
                <label style={labelStyle}>First Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Eleanor"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  style={errors.firstName ? errorInputStyle : inputStyle}
                />
                {errors.firstName && (
                  <span style={{ fontSize: '11.5px', color: 'var(--status-danger)' }}>
                    {errors.firstName}
                  </span>
                )}
              </div>

              <div>
                <label style={labelStyle}>Last Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Vance"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  style={errors.lastName ? errorInputStyle : inputStyle}
                />
                {errors.lastName && (
                  <span style={{ fontSize: '11.5px', color: 'var(--status-danger)' }}>
                    {errors.lastName}
                  </span>
                )}
              </div>

              <div>
                <label style={labelStyle}>Employee Code</label>
                <input
                  type="text"
                  value={employeeCode}
                  onChange={(e) => setEmployeeCode(e.target.value)}
                  style={{ ...inputStyle, fontFamily: 'var(--font-mono)' }}
                />
              </div>

              <div>
                <label style={labelStyle}>Email Address *</label>
                <input
                  type="email"
                  placeholder="e.g. employee@oneenterprise.cloud"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={errors.email ? errorInputStyle : inputStyle}
                />
                {errors.email && (
                  <span style={{ fontSize: '11.5px', color: 'var(--status-danger)' }}>
                    {errors.email}
                  </span>
                )}
              </div>

              <div>
                <label style={labelStyle}>Phone Number *</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={errors.phone ? errorInputStyle : inputStyle}
                />
                {errors.phone && (
                  <span style={{ fontSize: '11.5px', color: 'var(--status-danger)' }}>
                    {errors.phone}
                  </span>
                )}
              </div>

              <div>
                <label style={labelStyle}>Date of Birth</label>
                <input
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as Gender)}
                  style={inputStyle}
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other / Non-Binary</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>PAN Number</label>
                <input
                  type="text"
                  placeholder="e.g. ABCDE1234F"
                  value={panNumber}
                  onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                  style={{ ...inputStyle, fontFamily: 'var(--font-mono)' }}
                />
              </div>

              <div>
                <label style={labelStyle}>UAN Number</label>
                <input
                  type="text"
                  placeholder="e.g. 100987654321"
                  value={uanNumber}
                  onChange={(e) => setUanNumber(e.target.value)}
                  style={{ ...inputStyle, fontFamily: 'var(--font-mono)' }}
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: Employment & Organization */}
          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '20px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '14px',
                color: 'var(--brand-primary)',
              }}
            >
              <Building size={16} />
              <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                Department & Job Role Mapping
              </h4>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '14px',
              }}
            >
              <div>
                <label style={labelStyle}>Job Role / Designation *</label>
                <input
                  type="text"
                  placeholder="e.g. Senior Software Engineer"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  style={errors.designation ? errorInputStyle : inputStyle}
                />
                {errors.designation && (
                  <span style={{ fontSize: '11.5px', color: 'var(--status-danger)' }}>
                    {errors.designation}
                  </span>
                )}
              </div>

              <div>
                <label style={labelStyle}>Department *</label>
                <select
                  value={departmentId}
                  onChange={(e) => setDepartmentId(e.target.value)}
                  style={errors.departmentId ? errorInputStyle : inputStyle}
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name} ({dept.departmentCode})
                    </option>
                  ))}
                </select>
                {errors.departmentId && (
                  <span style={{ fontSize: '11.5px', color: 'var(--status-danger)' }}>
                    {errors.departmentId}
                  </span>
                )}
              </div>

              <div>
                <label style={labelStyle}>Reporting Manager</label>
                <select
                  value={managerId}
                  onChange={(e) => setManagerId(e.target.value)}
                  style={inputStyle}
                >
                  <option value="">None / Top Leadership</option>
                  {allEmployees
                    .filter((emp) => emp.id !== initialData?.id)
                    .map((emp) => (
                      <option key={emp.id} value={emp.id}>
                        {emp.firstName} {emp.lastName} ({emp.designation})
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label style={labelStyle}>Employment Type</label>
                <select
                  value={employmentType}
                  onChange={(e) => setEmploymentType(e.target.value as EmploymentType)}
                  style={inputStyle}
                >
                  <option value="FULL_TIME">Full-Time</option>
                  <option value="PART_TIME">Part-Time</option>
                  <option value="CONTRACT">Contract</option>
                  <option value="INTERN">Intern</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Employment Status</label>
                <select
                  value={employmentStatus}
                  onChange={(e) => setEmploymentStatus(e.target.value as EmploymentStatus)}
                  style={inputStyle}
                >
                  <option value="ACTIVE">Active</option>
                  <option value="PROBATION">Probation</option>
                  <option value="NOTICE_PERIOD">Notice Period</option>
                  <option value="ON_LEAVE">On Leave</option>
                  <option value="INACTIVE">Inactive</option>
                  <option value="TERMINATED">Terminated</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Joining Date *</label>
                <input
                  type="date"
                  value={joiningDate}
                  onChange={(e) => setJoiningDate(e.target.value)}
                  style={errors.joiningDate ? errorInputStyle : inputStyle}
                />
                {errors.joiningDate && (
                  <span style={{ fontSize: '11.5px', color: 'var(--status-danger)' }}>
                    {errors.joiningDate}
                  </span>
                )}
              </div>

              <div>
                <label style={labelStyle}>Work Location</label>
                <input
                  type="text"
                  placeholder="e.g. San Francisco, CA / Remote"
                  value={workLocation}
                  onChange={(e) => setWorkLocation(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Base Annual Salary ($)</label>
                <input
                  type="number"
                  placeholder="e.g. 120000"
                  value={baseSalary}
                  onChange={(e) => setBaseSalary(e.target.value)}
                  style={{ ...inputStyle, fontFamily: 'var(--font-mono)' }}
                />
              </div>
            </div>
          </div>

          {/* SECTION 3: Residential Address */}
          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '20px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '14px',
                color: 'var(--brand-primary)',
              }}
            >
              <MapPin size={16} />
              <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                Residential Address
              </h4>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '14px',
              }}
            >
              <div style={{ gridColumn: 'span 2' }}>
                <label style={labelStyle}>Street Address</label>
                <input
                  type="text"
                  placeholder="e.g. 100 California Street, Apt 5"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>City</label>
                <input
                  type="text"
                  placeholder="e.g. San Francisco"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>State / Province</label>
                <input
                  type="text"
                  placeholder="e.g. CA"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Postal Code</label>
                <input
                  type="text"
                  placeholder="e.g. 94111"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Country</label>
                <input
                  type="text"
                  placeholder="e.g. USA"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Address Type</label>
                <select
                  value={addressType}
                  onChange={(e) => setAddressType(e.target.value as AddressType)}
                  style={inputStyle}
                >
                  <option value="HOME">Home</option>
                  <option value="WORK">Work</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* SECTION 4: Emergency Contact */}
          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '20px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '14px',
                color: 'var(--status-danger)',
              }}
            >
              <ShieldAlert size={16} />
              <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                Emergency Contact Details
              </h4>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '14px',
              }}
            >
              <div>
                <label style={labelStyle}>Emergency Contact Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Robert Vance"
                  value={emergencyName}
                  onChange={(e) => setEmergencyName(e.target.value)}
                  style={errors.emergencyContactName ? errorInputStyle : inputStyle}
                />
                {errors.emergencyContactName && (
                  <span style={{ fontSize: '11.5px', color: 'var(--status-danger)' }}>
                    {errors.emergencyContactName}
                  </span>
                )}
              </div>

              <div>
                <label style={labelStyle}>Relationship</label>
                <input
                  type="text"
                  placeholder="e.g. Spouse, Parent, Sibling"
                  value={emergencyRel}
                  onChange={(e) => setEmergencyRel(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Primary Phone *</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 999-0000"
                  value={emergencyPhone}
                  onChange={(e) => setEmergencyPhone(e.target.value)}
                  style={errors.emergencyContactPhone ? errorInputStyle : inputStyle}
                />
                {errors.emergencyContactPhone && (
                  <span style={{ fontSize: '11.5px', color: 'var(--status-danger)' }}>
                    {errors.emergencyContactPhone}
                  </span>
                )}
              </div>

              <div>
                <label style={labelStyle}>Alternate Phone</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 999-0001"
                  value={emergencyAltPhone}
                  onChange={(e) => setEmergencyAltPhone(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Email Address</label>
                <input
                  type="email"
                  placeholder="e.g. contact@example.com"
                  value={emergencyEmail}
                  onChange={(e) => setEmergencyEmail(e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>
          </div>

          {/* Modal Actions Footer */}
          <div
            style={{
              borderTop: '1px solid var(--border-subtle)',
              paddingTop: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '10px',
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '9px 18px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                backgroundColor: 'transparent',
                color: 'var(--text-secondary)',
                fontSize: '13.5px',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 22px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--brand-primary)',
                color: '#ffffff',
                fontSize: '13.5px',
                fontWeight: 600,
                border: 'none',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                boxShadow: '0 2px 10px rgba(99, 102, 241, 0.35)',
                opacity: isSubmitting ? 0.7 : 1,
              }}
            >
              <Save size={15} />
              {isSubmitting ? 'Saving...' : isEditing ? 'Update Employee' : 'Create Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
