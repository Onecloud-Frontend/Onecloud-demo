import { ApiResponseEnvelope } from '@core/api/types';
import {
  Employee,
  Department,
  EmployeeDocument,
  Skill,
  Certification,
  EmploymentStatus,
  EmploymentType,
  DocumentVerificationStatus,
  SkillProficiency,
} from '../types';
import {
  mockDepartments,
  mockEmployees,
  mockEmployeeDocuments,
  mockSkillsByEmployee,
  mockCertificationsByEmployee,
} from '@mock/hrms/employeeMockData';

const EMPLOYEE_STORAGE_KEY = 'onecloud_employee_service_store_v2';

function loadInitialEmployees(): Employee[] {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const raw = window.localStorage.getItem(EMPLOYEE_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length >= mockEmployees.length) {
          return parsed;
        }
      }
    } catch {}
  }
  return [...mockEmployees];
}

function saveEmployeesToStorage(list: Employee[]) {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      window.localStorage.setItem(EMPLOYEE_STORAGE_KEY, JSON.stringify(list));
    } catch {}
  }
}

// Mutable in-memory store for session persistence
let employeesStore: Employee[] = loadInitialEmployees();
let documentsStore: EmployeeDocument[] = [...mockEmployeeDocuments];
const skillsStore: Record<string, Skill[]> = { ...mockSkillsByEmployee };
const certificationsStore: Record<string, Certification[]> = { ...mockCertificationsByEmployee };

export const registerEmployeeInService = (emp: Employee) => {
  if (
    !employeesStore.some(
      (e) =>
        e.id === emp.id ||
        e.employeeCode === emp.employeeCode ||
        (e.firstName.toLowerCase() === emp.firstName.toLowerCase() &&
          e.lastName.toLowerCase() === emp.lastName.toLowerCase())
    )
  ) {
    employeesStore = [emp, ...employeesStore];
    saveEmployeesToStorage(employeesStore);
  }
};

// Simulated asynchronous network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const createResponse = <T>(data: T, message: string = 'Success'): ApiResponseEnvelope<T> => ({
  success: true,
  data,
  message,
  timestamp: new Date().toISOString(),
});

export interface EmployeeFilterParams {
  search?: string;
  departmentId?: string;
  status?: EmploymentStatus;
  type?: EmploymentType;
}

/**
 * HRMS Employee Domain Service
 * Encapsulates all data communication for Employee Management.
 * Operates on mock data in mock/hrms without modifying shared handlers, adapter, or routers.
 */
export const employeeService = {
  /**
   * Fetch list of employees with optional filtering
   */
  async getEmployees(params?: EmployeeFilterParams): Promise<ApiResponseEnvelope<Employee[]>> {
    await delay(60);

    // 1. Sync any newly hired employees from universalHrmsStore
    try {
      const { universalHrmsStore } = await import('@mock/hrms');
      const uEmps = universalHrmsStore.getEmployees();
      for (const u of uEmps) {
        if (
          !employeesStore.some(
            (e) =>
              e.id === u.id ||
              e.employeeCode === u.employeeCode ||
              (e.firstName.toLowerCase() === u.firstName.toLowerCase() &&
                e.lastName.toLowerCase() === u.lastName.toLowerCase())
          )
        ) {
          employeesStore = [u, ...employeesStore];
        }
      }
    } catch {
      // ignore
    }

    // 2. Also check onecloud_hrms_master_db_v2
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const raw = window.localStorage.getItem('onecloud_hrms_master_db_v2');
        if (raw) {
          const db = JSON.parse(raw);
          if (Array.isArray(db.employees)) {
            for (const e of db.employees) {
              if (
                !employeesStore.some(
                  (x) =>
                    x.id === e.id ||
                    x.employeeCode === e.employeeCode ||
                    (x.firstName.toLowerCase() === e.firstName.toLowerCase() &&
                      x.lastName.toLowerCase() === e.lastName.toLowerCase())
                )
              ) {
                employeesStore = [e, ...employeesStore];
              }
            }
          }
        }
      }
    } catch {}

    saveEmployeesToStorage(employeesStore);

    let result = [...employeesStore];

    if (params) {
      if (params.search) {
        const q = params.search.toLowerCase().trim();
        result = result.filter((emp) => {
          const fullName = `${emp.firstName} ${emp.lastName}`.toLowerCase();
          const code = emp.employeeCode.toLowerCase();
          const designation = (emp.designation || '').toLowerCase();
          const email = (emp.email || '').toLowerCase();
          const dept =
            mockDepartments.find((d) => d.id === emp.departmentId)?.name.toLowerCase() ||
            (emp.department || '').toLowerCase();
          return (
            fullName.includes(q) ||
            code.includes(q) ||
            designation.includes(q) ||
            email.includes(q) ||
            dept.includes(q)
          );
        });
      }

      if (params.departmentId) {
        result = result.filter((emp) => emp.departmentId === params.departmentId);
      }

      if (params.status) {
        result = result.filter((emp) => emp.employmentStatus === params.status);
      }

      if (params.type) {
        result = result.filter((emp) => emp.employmentType === params.type);
      }
    }

    return createResponse(result, `Employees loaded successfully (${result.length} active records)`);
  },

  /**
   * Fetch single employee profile by ID
   */
  async getEmployeeById(id: string): Promise<ApiResponseEnvelope<Employee>> {
    await delay(80);
    let emp = employeesStore.find((e) => e.id === id || e.employeeCode === id);
    if (!emp) {
      try {
        const { universalHrmsStore } = await import('@mock/hrms');
        emp = universalHrmsStore.getEmployees().find((e) => e.id === id || e.employeeCode === id);
        if (emp && !employeesStore.some((e) => e.id === emp!.id)) {
          employeesStore = [emp, ...employeesStore];
        }
      } catch {
        // ignore
      }
    }

    if (!emp) {
      throw new Error(`Employee with ID ${id} not found.`);
    }
    return createResponse(emp, 'Employee profile loaded');
  },

  /**
   * Create a new employee record
   */
  async createEmployee(payload: Partial<Employee>): Promise<ApiResponseEnvelope<Employee>> {
    await delay(200);
    const id = `emp-${Date.now().toString().slice(-4)}`;
    const newCode = payload.employeeCode || `EMP-${1000 + employeesStore.length + 1}`;
    const now = new Date().toISOString();

    const newEmployee: Employee = {
      id,
      employeeCode: newCode,
      firstName: payload.firstName || 'New',
      lastName: payload.lastName || 'Employee',
      email: payload.email || `${(payload.firstName || 'employee').toLowerCase()}@oneenterprise.cloud`,
      phone: payload.phone || '+1 (555) 000-0000',
      profileImage: payload.profileImage ?? null,
      dateOfBirth: payload.dateOfBirth || '1995-01-01',
      gender: payload.gender || 'OTHER',
      joiningDate: payload.joiningDate || now.split('T')[0],
      designation: payload.designation || 'Specialist',
      departmentId: payload.departmentId || mockDepartments[0].id,
      managerId: payload.managerId ?? null,
      employmentType: payload.employmentType || 'FULL_TIME',
      employmentStatus: payload.employmentStatus || 'ACTIVE',
      workLocation: payload.workLocation || 'San Francisco, CA',
      address: payload.address || {
        street: '100 Main St',
        city: 'San Francisco',
        state: 'CA',
        postalCode: '94105',
        country: 'USA',
        addressType: 'HOME',
      },
      emergencyContact: payload.emergencyContact || {
        name: 'Primary Contact',
        relationship: 'Family',
        phone: '+1 (555) 000-1111',
      },
      salaryStructureId: payload.salaryStructureId ?? null,
      baseSalary: payload.baseSalary || 90000,
      panNumber: payload.panNumber,
      uanNumber: payload.uanNumber,
      createdAt: now,
      updatedAt: now,
    };

    employeesStore = [newEmployee, ...employeesStore];

    try {
      const { universalHrmsStore } = await import('@mock/hrms');
      if (!universalHrmsStore.employees.some((e) => e.id === newEmployee.id)) {
        universalHrmsStore.employees = [newEmployee, ...universalHrmsStore.employees];
        universalHrmsStore.notify();
      }
    } catch {
      // ignore
    }

    saveEmployeesToStorage(employeesStore);
    return createResponse(newEmployee, 'Employee created successfully');
  },

  /**
   * Update an existing employee record
   */
  async updateEmployee(id: string, payload: Partial<Employee>): Promise<ApiResponseEnvelope<Employee>> {
    await delay(150);
    const index = employeesStore.findIndex((e) => e.id === id);
    if (index === -1) {
      throw new Error(`Employee with ID ${id} not found.`);
    }

    const updatedEmployee: Employee = {
      ...employeesStore[index],
      ...payload,
      updatedAt: new Date().toISOString(),
    };

    employeesStore[index] = updatedEmployee;

    try {
      const { universalHrmsStore } = await import('@mock/hrms');
      const idx = universalHrmsStore.employees.findIndex((e) => e.id === id);
      if (idx !== -1) {
        universalHrmsStore.employees[idx] = updatedEmployee;
        universalHrmsStore.notify();
      }
    } catch {
      // ignore
    }

    saveEmployeesToStorage(employeesStore);
    return createResponse({ ...updatedEmployee }, 'Employee updated successfully');
  },

  /**
   * Delete or archive an employee record
   */
  async deleteEmployee(id: string): Promise<ApiResponseEnvelope<{ id: string }>> {
    await delay(100);
    employeesStore = employeesStore.filter((e) => e.id !== id);

    try {
      const { universalHrmsStore } = await import('@mock/hrms');
      universalHrmsStore.employees = universalHrmsStore.employees.filter((e) => e.id !== id);
      universalHrmsStore.notify();
    } catch {
      // ignore
    }

    saveEmployeesToStorage(employeesStore);
    return createResponse({ id }, 'Employee deleted successfully');
  },

  /**
   * Fetch all organizational departments
   */
  async getDepartments(): Promise<ApiResponseEnvelope<Department[]>> {
    await delay(100);
    return createResponse([...mockDepartments], 'Departments loaded');
  },

  /**
   * Fetch documents for an employee
   */
  async getEmployeeDocuments(employeeId: string): Promise<ApiResponseEnvelope<EmployeeDocument[]>> {
    await delay(100);
    const docs = documentsStore.filter((d) => d.employeeId === employeeId);
    return createResponse([...docs], 'Employee documents loaded');
  },

  /**
   * Update verification status of an employee document
   */
  async updateDocumentVerification(
    documentId: string,
    status: DocumentVerificationStatus
  ): Promise<ApiResponseEnvelope<EmployeeDocument>> {
    await delay(120);
    const docIndex = documentsStore.findIndex((d) => d.id === documentId);
    if (docIndex === -1) {
      throw new Error(`Document with ID ${documentId} not found.`);
    }

    const updatedDoc: EmployeeDocument = {
      ...documentsStore[docIndex],
      status,
      verifiedAt: status === 'VERIFIED' ? new Date().toISOString() : null,
    };

    documentsStore[docIndex] = updatedDoc;
    return createResponse(updatedDoc, 'Document verification updated');
  },

  /**
   * Add a new document record for an employee
   */
  async addDocument(payload: Partial<EmployeeDocument>): Promise<ApiResponseEnvelope<EmployeeDocument>> {
    await delay(150);
    const newDoc: EmployeeDocument = {
      id: `doc-${Date.now().toString().slice(-4)}`,
      employeeId: payload.employeeId || '',
      documentType: payload.documentType || 'General Verification Document',
      documentNumber: payload.documentNumber,
      fileUrl: payload.fileUrl || '/docs/uploaded_document.pdf',
      status: payload.status || 'PENDING_VERIFICATION',
      uploadedAt: new Date().toISOString(),
      verifiedAt: payload.status === 'VERIFIED' ? new Date().toISOString() : null,
    };

    documentsStore = [newDoc, ...documentsStore];
    return createResponse(newDoc, 'Document added successfully');
  },

  /**
   * Fetch skills for an employee
   */
  async getEmployeeSkills(employeeId: string): Promise<ApiResponseEnvelope<Skill[]>> {
    await delay(80);
    const skills = skillsStore[employeeId] || [];
    return createResponse([...skills], 'Employee skills loaded');
  },

  /**
   * Add a skill to an employee profile
   */
  async addEmployeeSkill(
    employeeId: string,
    payload: { name: string; category?: string; proficiencyLevel?: SkillProficiency }
  ): Promise<ApiResponseEnvelope<Skill>> {
    await delay(120);
    const newSkill: Skill = {
      id: `sk-${Date.now().toString().slice(-4)}`,
      name: payload.name || 'General Skill',
      category: payload.category || 'General',
      proficiencyLevel: payload.proficiencyLevel || 'INTERMEDIATE',
    };
    if (!skillsStore[employeeId]) {
      skillsStore[employeeId] = [];
    }
    skillsStore[employeeId] = [...skillsStore[employeeId], newSkill];
    return createResponse(newSkill, 'Skill added successfully');
  },

  /**
   * Delete a skill from an employee profile
   */
  async deleteEmployeeSkill(employeeId: string, skillId: string): Promise<ApiResponseEnvelope<{ id: string }>> {
    await delay(100);
    if (skillsStore[employeeId]) {
      skillsStore[employeeId] = skillsStore[employeeId].filter((s) => s.id !== skillId);
    }
    return createResponse({ id: skillId }, 'Skill deleted successfully');
  },

  /**
   * Fetch certifications for an employee
   */
  async getEmployeeCertifications(employeeId: string): Promise<ApiResponseEnvelope<Certification[]>> {
    await delay(80);
    const certs = certificationsStore[employeeId] || [];
    return createResponse([...certs], 'Employee certifications loaded');
  },

  /**
   * Add a certification to an employee profile
   */
  async addEmployeeCertification(
    employeeId: string,
    payload: Partial<Certification>
  ): Promise<ApiResponseEnvelope<Certification>> {
    await delay(120);
    const newCert: Certification = {
      id: `cert-${Date.now().toString().slice(-4)}`,
      employeeId,
      name: payload.name || 'New Certification',
      issuingOrganization: payload.issuingOrganization || 'Certification Authority',
      issueDate: payload.issueDate || new Date().toISOString().split('T')[0],
      expiryDate: payload.expiryDate ?? null,
      credentialId: payload.credentialId,
      credentialUrl: payload.credentialUrl,
    };
    if (!certificationsStore[employeeId]) {
      certificationsStore[employeeId] = [];
    }
    certificationsStore[employeeId] = [...certificationsStore[employeeId], newCert];
    return createResponse(newCert, 'Certification added successfully');
  },

  /**
   * Delete a certification from an employee profile
   */
  async deleteEmployeeCertification(
    employeeId: string,
    certId: string
  ): Promise<ApiResponseEnvelope<{ id: string }>> {
    await delay(100);
    if (certificationsStore[employeeId]) {
      certificationsStore[employeeId] = certificationsStore[employeeId].filter((c) => c.id !== certId);
    }
    return createResponse({ id: certId }, 'Certification deleted successfully');
  },
};
