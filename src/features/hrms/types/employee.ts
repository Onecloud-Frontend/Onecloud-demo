/**
 * Canonical Employee Master Types
 * Ownership: Team HRMS
 */

import type { Address } from '@shared/types';
import type { EmergencyContact } from './department';

export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export type EmploymentType =
  | 'FULL_TIME'
  | 'PART_TIME'
  | 'CONTRACT'
  | 'INTERN';

export type EmploymentStatus =
  | 'ACTIVE'
  | 'INACTIVE'
  | 'PROBATION'
  | 'NOTICE_PERIOD'
  | 'TERMINATED'
  | 'ON_LEAVE';

export interface Employee {
  id: string;
  employeeCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profileImage: string | null;
  dateOfBirth: string;
  gender: Gender;
  joiningDate: string;
  designation: string;
  departmentId: string;
  managerId: string | null;
  employmentType: EmploymentType;
  employmentStatus: EmploymentStatus;
  workLocation: string;
  address: Address;
  emergencyContact: EmergencyContact;
  salaryStructureId: string | null;
  baseSalary: number;
  name?: string;
  department?: string;
  reportingManager?: string;
  annualCtc?: number;
  monthlyCtc?: number;
  skills?: string[];
  panNumber?: string;
  uanNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeReference {
  id: string;
  employeeCode: string;
  fullName: string;
  email: string;
  designation?: string;
  departmentName?: string;
}
