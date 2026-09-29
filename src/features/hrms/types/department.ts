/**
 * Canonical Department & Organizational Structure Types
 * Ownership: Team HRMS
 */

export type DepartmentStatus = 'ACTIVE' | 'INACTIVE' | 'ARCHIVED';

export interface Department {
  id: string;
  departmentCode: string;
  name: string;
  description?: string;
  headOfDepartmentId: string | null;
  parentDepartmentId: string | null;
  status: DepartmentStatus;
  costCenterCode?: string;
  createdAt: string;
  updatedAt: string;
}

export type SkillProficiency = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';

export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiencyLevel: SkillProficiency;
}

export interface Certification {
  id: string;
  employeeId: string;
  name: string;
  issuingOrganization: string;
  issueDate: string;
  expiryDate?: string | null;
  credentialId?: string;
  credentialUrl?: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  alternatePhone?: string;
  email?: string;
}

export type DocumentVerificationStatus = 'PENDING_VERIFICATION' | 'VERIFIED' | 'REJECTED';

export interface EmployeeDocument {
  id: string;
  employeeId: string;
  documentType: string;
  documentNumber?: string;
  fileUrl: string;
  status: DocumentVerificationStatus;
  uploadedAt: string;
  verifiedAt?: string | null;
}
