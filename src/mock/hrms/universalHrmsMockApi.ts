/**
 * Universal HRMS Mock API & Single Source of Truth Store
 * Cross-module reactive store for Employee Management and Recruitment & ATS.
 * Supports pub/sub reactivity across modules.
 */

import type {
  Department,
  Employee,
  JobRequisition,
  JobPosting,
  Candidate,
  Interview,
  CandidateEvaluation,
  OfferLetter,
  OfferStatus,
  CandidateStatus,
} from '@features/hrms/types';

import initialDatabase from './mockHrmsDatabase.json';
import { mockDepartments, mockEmployees } from './employeeMockData';

export class UniversalHrmsStore {
  private static readonly STORAGE_KEY = 'onecloud_hrms_master_db_v2';
  private listeners: Set<() => void> = new Set();

  public departments: Department[] = [];
  public employees: Employee[] = [];
  public requisitions: JobRequisition[] = [];
  public postings: JobPosting[] = [];
  public candidates: Candidate[] = [];
  public interviews: Interview[] = [];
  public evaluations: CandidateEvaluation[] = [];
  public offers: OfferLetter[] = [];

  constructor() {
    this.loadFromStorage();
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  public notify(): void {
    this.saveToStorage();
    this.listeners.forEach((listener) => {
      try {
        listener();
      } catch (err) {
        console.error('HRMS Store listener error:', err);
      }
    });
  }

  public loadFromStorage(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const raw = window.localStorage.getItem(UniversalHrmsStore.STORAGE_KEY);
        if (raw) {
          const db = JSON.parse(raw);
          if (Array.isArray(db.departments) && db.departments.length > 0) {
            this.departments = db.departments;
          } else {
            this.departments = (initialDatabase.departments as unknown as Department[]) || [...mockDepartments];
          }

          if (Array.isArray(db.employees) && db.employees.length > 0) {
            this.employees = db.employees;
          } else {
            this.employees = (initialDatabase.employees as unknown as Employee[]) || [...mockEmployees];
          }

          if (Array.isArray(db.jobRequisitions)) this.requisitions = db.jobRequisitions;
          else this.requisitions = (initialDatabase.jobRequisitions as unknown as JobRequisition[]) || [];

          if (Array.isArray(db.jobPostings)) this.postings = db.jobPostings;
          else this.postings = (initialDatabase.jobPostings as unknown as JobPosting[]) || [];

          if (Array.isArray(db.candidates)) this.candidates = db.candidates;
          else this.candidates = (initialDatabase.candidates as unknown as Candidate[]) || [];

          if (Array.isArray(db.interviews)) this.interviews = db.interviews;
          else this.interviews = (initialDatabase.interviews as unknown as Interview[]) || [];

          if (Array.isArray(db.evaluations)) this.evaluations = db.evaluations;
          else this.evaluations = (initialDatabase.evaluations as unknown as CandidateEvaluation[]) || [];

          if (Array.isArray(db.offers)) this.offers = db.offers;
          else this.offers = (initialDatabase.offers as unknown as OfferLetter[]) || [];

          return;
        }
      } catch (e) {
        console.warn('Failed to load universal HRMS store from localStorage:', e);
      }
    }

    // Default fallback from initialDatabase / mockData
    this.departments = (initialDatabase.departments as unknown as Department[]) || [...mockDepartments];
    this.employees = (initialDatabase.employees as unknown as Employee[]) || [...mockEmployees];
    this.requisitions = (initialDatabase.jobRequisitions as unknown as JobRequisition[]) || [];
    this.postings = (initialDatabase.jobPostings as unknown as JobPosting[]) || [];
    this.candidates = (initialDatabase.candidates as unknown as Candidate[]) || [];
    this.interviews = (initialDatabase.interviews as unknown as Interview[]) || [];
    this.evaluations = (initialDatabase.evaluations as unknown as CandidateEvaluation[]) || [];
    this.offers = (initialDatabase.offers as unknown as OfferLetter[]) || [];
    this.saveToStorage();
  }

  public saveToStorage(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const raw = window.localStorage.getItem(UniversalHrmsStore.STORAGE_KEY);
        const db = raw ? JSON.parse(raw) : {};
        db.departments = this.departments;
        db.employees = this.employees;
        db.jobRequisitions = this.requisitions;
        db.jobPostings = this.postings;
        db.candidates = this.candidates;
        db.interviews = this.interviews;
        db.evaluations = this.evaluations;
        db.offers = this.offers;
        window.localStorage.setItem(UniversalHrmsStore.STORAGE_KEY, JSON.stringify(db));
      } catch (e) {
        console.warn('Failed to save universal HRMS store to localStorage:', e);
      }
    }
  }

  // --- Departments ---
  public getDepartments(): Department[] {
    return [...this.departments];
  }

  // --- Employees ---
  public getEmployees(): Employee[] {
    return [...this.employees];
  }

  public setEmployees(employees: Employee[]): void {
    this.employees = employees;
    this.saveToStorage();
    this.notify();
  }

  // --- Requisitions & Postings ---
  public getRequisitions(): JobRequisition[] {
    return this.requisitions;
  }

  public getPostings(): JobPosting[] {
    return this.postings;
  }

  // --- Candidates ---
  public getCandidates(): Candidate[] {
    return this.candidates;
  }

  public addCandidate(candidate: Candidate): void {
    if (!this.candidates.some((c) => c.id === candidate.id)) {
      this.candidates = [candidate, ...this.candidates];
      this.saveToStorage();
      this.notify();
    }
  }

  public updateCandidateStatus(candidateId: string, status: CandidateStatus): void {
    this.candidates = this.candidates.map((c) =>
      c.id === candidateId ? { ...c, status, updatedAt: new Date().toISOString() } : c
    );
    this.saveToStorage();
    this.notify();
  }

  // --- Offers ---
  public getOffers(): OfferLetter[] {
    return this.offers;
  }

  public addOffer(offer: OfferLetter): void {
    if (!this.offers.some((o) => o.id === offer.id)) {
      this.offers = [offer, ...this.offers];
      this.saveToStorage();
      this.notify();
    }
  }

  public updateOfferStatus(offerId: string, status: OfferStatus): void {
    this.offers = this.offers.map((o) =>
      o.id === offerId
        ? {
            ...o,
            status,
            acceptedAt: status === 'ACCEPTED' ? (o.acceptedAt || new Date().toISOString()) : o.acceptedAt,
          }
        : o
    );
    this.saveToStorage();
    this.notify();
  }

  // --- Cross-Module Action: Convert Offer to Employee ---
  public convertCandidateOfferToEmployee(offerId: string, acceptedOffer?: OfferLetter): Employee {
    const offer = acceptedOffer || this.offers.find((o) => o.id === offerId);
    if (!offer) {
      throw new Error(`Offer ${offerId} not found`);
    }

    const candidate = this.candidates.find((c) => c.id === offer.candidateId);
    const newEmpId = `EMP-${Math.floor(10600 + Math.random() * 900)}`;
    const today = new Date().toISOString().split('T')[0];

    // Determine names from offer or candidate
    const nameParts = (offer.candidateName || `${candidate?.firstName || 'New'} ${candidate?.lastName || 'Hire'}`).split(' ');
    const firstName = nameParts[0] || 'New';
    const lastName = nameParts.slice(1).join(' ') || 'Employee';

    const newEmp: Employee = {
      id: newEmpId.toLowerCase(),
      employeeCode: newEmpId,
      firstName,
      lastName,
      email: candidate?.email || `${firstName.toLowerCase()}.${lastName.toLowerCase()}@stackly.io`,
      phone: candidate?.phone || '+91 98450 00000',
      profileImage: null,
      dateOfBirth: '1995-05-15',
      gender: 'MALE',
      joiningDate: offer.joiningDate || today,
      designation: offer.jobTitle || 'Engineer',
      departmentId: offer.departmentId || 'dept-eng',
      managerId: null,
      employmentType: 'FULL_TIME',
      employmentStatus: 'ACTIVE',
      workLocation: 'Bengaluru, India',
      address: {
        street: '100 Feet Road, Indiranagar',
        city: 'Bengaluru',
        state: 'Karnataka',
        postalCode: '560038',
        country: 'India',
      },
      emergencyContact: {
        name: `${firstName} Emergency`,
        relationship: 'Family',
        phone: candidate?.phone || '+91 98450 00000',
      },
      salaryStructureId: 'sal-struct-std',
      baseSalary: offer.offeredSalary || 155000,
      panNumber: 'ABCDE1234F',
      uanNumber: '100987654321',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // 1. Update candidate stage
    if (candidate) {
      this.candidates = this.candidates.map((c) =>
        c.id === candidate.id
          ? { ...c, status: 'HIRED' as CandidateStatus, updatedAt: new Date().toISOString() }
          : c
      );
    }

    // 2. Update offer status
    this.offers = this.offers.map((o) =>
      o.id === offer.id
        ? {
            ...o,
            status: 'ACCEPTED',
            acceptedAt: o.acceptedAt || new Date().toISOString(),
            transferredToEmployeeId: newEmpId,
            transferredEmployeeCode: newEmpId,
            onboardedAt: new Date().toISOString(),
          }
        : o
    );

    // 3. Add to employee directory
    if (!this.employees.some((e) => e.id === newEmp.id || e.employeeCode === newEmp.employeeCode)) {
      this.employees = [newEmp, ...this.employees];
    }

    this.saveToStorage();
    this.notify();
    return newEmp;
  }

  // --- Cross-Module Action: Onboard Candidate directly when marked HIRED ---
  public onboardCandidate(candidateId: string, offerId?: string, fallbackCandidate?: Candidate): Employee {
    let targetOffer = offerId
      ? this.offers.find((o) => o.id === offerId)
      : this.offers.find((o) => o.candidateId === candidateId);

    if (!targetOffer) {
      let cand = this.candidates.find((c) => c.id === candidateId) || fallbackCandidate;
      if (!cand && typeof window !== 'undefined' && window.localStorage) {
        try {
          const raw = window.localStorage.getItem(UniversalHrmsStore.STORAGE_KEY);
          if (raw) {
            const db = JSON.parse(raw);
            cand = db.candidates?.find((c: Candidate) => c.id === candidateId);
          }
        } catch {}
      }

      const candName = cand ? `${cand.firstName} ${cand.lastName}` : 'Candidate';
      targetOffer = {
        id: `off-${Date.now().toString().slice(-4)}`,
        candidateId,
        candidateName: candName,
        jobTitle: (cand as unknown as { appliedRole?: string })?.appliedRole || 'Senior Full Stack Engineer',
        departmentId: (cand as unknown as { departmentId?: string })?.departmentId || 'dept-eng',
        offeredSalary: 155000,
        joiningDate: new Date().toISOString().split('T')[0],
        expiryDate: '2026-11-01',
        status: 'ACCEPTED',
        issuedBy: 'Priya Sharma (HR Director)',
        issuedAt: new Date().toISOString(),
        acceptedAt: new Date().toISOString(),
        terms: 'Full-time role. Includes health coverage, 401k match, and paid annual leave.',
      };
      this.offers = [targetOffer, ...this.offers];
    }

    return this.convertCandidateOfferToEmployee(targetOffer.id, targetOffer);
  }
}

export const universalHrmsStore = new UniversalHrmsStore();

/**
 * Unified HRMS Mock API Gateway
 */
export const universalHrmsApi = {
  recruitment: {
    getRequisitions: async () => universalHrmsStore.getRequisitions(),
    getCandidates: async () => universalHrmsStore.getCandidates(),
    getOffers: async () => universalHrmsStore.getOffers(),
    convertCandidateOfferToEmployee: async (offerId: string) =>
      universalHrmsStore.convertCandidateOfferToEmployee(offerId),
    onboardCandidate: async (candidateId: string, offerId?: string) =>
      universalHrmsStore.onboardCandidate(candidateId, offerId),
    updateOfferStatus: async (offerId: string, status: OfferStatus) =>
      universalHrmsStore.updateOfferStatus(offerId, status),
  },
  employees: {
    getEmployees: async () => universalHrmsStore.getEmployees(),
    getDepartments: async () => universalHrmsStore.getDepartments(),
  },
};
