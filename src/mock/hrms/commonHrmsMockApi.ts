import type {
  Department,
  Employee,
  JobRequisition,
  JobPosting,
  Candidate,
  Interview,
  CandidateEvaluation,
  OfferLetter,
  RequisitionStatus,
  CandidateStatus,
  OfferStatus,
  HrmsInsurancePlan,
  CandidateInsuranceEnrollment,
} from '@features/hrms/types';
import { ApiResponseEnvelope } from '@core/api/types';
import { delay, createMockEnvelope } from '../data/commonMockData';
import initialDatabase from './mockHrmsDatabase.json';

export interface MockCandidateResumeSummary {
  education: string;
  skills: string[];
  bio: string;
  highlights: string[];
  fileName?: string;
  fileSize?: string;
}

export interface MockRecruitmentCandidate extends Candidate {
  appliedRole: string;
  departmentId: string;
  departmentName: string;
  resumeSummary: MockCandidateResumeSummary;
  processedAt?: string | null;
  transferredToEmployeeId?: string | null;
}

export interface MockRecruitmentInterview extends Interview {
  candidateName: string;
  candidateRole: string;
  departmentName: string;
}

export interface MockRecruitmentMetrics {
  totalOpenPositions: number;
  activeCandidatesCount: number;
  scheduledInterviewsCount: number;
  acceptedOffersCount: number;
  pendingRequisitionsCount: number;
  avgTimeToHireDays: number;
  offerAcceptanceRate: number;
  activePostingsCount: number;
}

export interface HrmsMockDatabaseState {
  departments: Department[];
  jobRequisitions: JobRequisition[];
  jobPostings: JobPosting[];
  candidates: MockRecruitmentCandidate[];
  interviews: MockRecruitmentInterview[];
  evaluations: CandidateEvaluation[];
  offers: OfferLetter[];
  insurancePlans: HrmsInsurancePlan[];
  insuranceEnrollments: CandidateInsuranceEnrollment[];
  employees: Employee[];
  metrics: MockRecruitmentMetrics;
}

const STORAGE_KEY = 'onecloud_hrms_master_db_v2';

/**
 * Clones initial database deep copy
 */
function getInitialState(): HrmsMockDatabaseState {
  return {
    departments: JSON.parse(JSON.stringify(initialDatabase.departments)) as Department[],
    jobRequisitions: JSON.parse(JSON.stringify(initialDatabase.jobRequisitions)) as JobRequisition[],
    jobPostings: JSON.parse(JSON.stringify(initialDatabase.jobPostings)) as JobPosting[],
    candidates: JSON.parse(JSON.stringify(initialDatabase.candidates)) as MockRecruitmentCandidate[],
    interviews: JSON.parse(JSON.stringify(initialDatabase.interviews)) as MockRecruitmentInterview[],
    evaluations: JSON.parse(JSON.stringify(initialDatabase.evaluations)) as CandidateEvaluation[],
    offers: JSON.parse(JSON.stringify(initialDatabase.offers)) as OfferLetter[],
    insurancePlans: JSON.parse(JSON.stringify(initialDatabase.insurancePlans)) as HrmsInsurancePlan[],
    insuranceEnrollments: JSON.parse(JSON.stringify(initialDatabase.insuranceEnrollments)) as CandidateInsuranceEnrollment[],
    employees: JSON.parse(JSON.stringify(initialDatabase.employees)) as Employee[],
    metrics: JSON.parse(JSON.stringify(initialDatabase.metrics)) as MockRecruitmentMetrics,
  };
}

/**
 * Load persisted state from localStorage if available, otherwise initialize
 */
function loadState(): HrmsMockDatabaseState {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as HrmsMockDatabaseState;
        // Basic schema integrity check
        if (parsed.candidates && parsed.jobPostings && parsed.employees) {
          return parsed;
        }
      }
    } catch {
      // Ignore parse errors and fall back to initial
    }
  }
  const fresh = getInitialState();
  saveState(fresh);
  return fresh;
}

/**
 * Save current state into browser localStorage
 */
function saveState(state: HrmsMockDatabaseState): void {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Storage quota or private mode protection
    }
  }
}

let dbState: HrmsMockDatabaseState = loadState();

export const RECRUITMENT_DEPARTMENTS = [
  { id: 'dept-all', name: 'All Departments' },
  { id: 'dept-eng', name: 'Engineering' },
  { id: 'dept-prod', name: 'Product Management' },
  { id: 'dept-sales', name: 'Sales & Growth' },
  { id: 'dept-fin', name: 'Finance' },
  { id: 'dept-hr', name: 'Human Resources' },
];

/**
 * Common Mock API for One Enterprise Cloud HRMS
 * Central single source of truth across Recruitment, Employee Management, Onboarding, Payroll, etc.
 * Base Mock URL: https://api.onecloud.internal/mock/v1/hrms
 */
export const commonHrmsMockApi = {
  /**
   * Reset mock database state to pristine demo defaults
   */
  async resetDatabase(): Promise<ApiResponseEnvelope<boolean>> {
    await delay(100);
    dbState = getInitialState();
    saveState(dbState);
    return createMockEnvelope(true, 'HRMS Mock Database reset to baseline');
  },

  /**
   * Retrieve the entire master dataset JSON for export or inspection
   */
  async getAllData(): Promise<ApiResponseEnvelope<HrmsMockDatabaseState>> {
    await delay(100);
    return createMockEnvelope(dbState, 'Complete HRMS mock data structure fetched');
  },

  /**
   * KPI metrics
   */
  async getMetrics(): Promise<ApiResponseEnvelope<MockRecruitmentMetrics>> {
    await delay(120);
    const openReqs = dbState.jobRequisitions.filter(r => r.status === 'OPEN' || r.status === 'APPROVED').length;
    const activeCands = dbState.candidates.filter(
      c => c.status === 'NEW' || c.status === 'APPLIED' || c.status === 'SCREENING' || c.status === 'INTERVIEWING' || c.status === 'OFFERED'
    ).length;
    const scheduledInts = dbState.interviews.filter(i => i.status === 'SCHEDULED').length;
    const acceptedOffers = dbState.offers.filter(o => o.status === 'ACCEPTED').length;

    const dynamicMetrics: MockRecruitmentMetrics = {
      ...dbState.metrics,
      totalOpenPositions: openReqs,
      activeCandidatesCount: activeCands,
      scheduledInterviewsCount: scheduledInts,
      acceptedOffersCount: acceptedOffers,
      activePostingsCount: dbState.jobPostings.filter(p => p.status === 'PUBLISHED').length,
    };
    return createMockEnvelope(dynamicMetrics, 'Recruitment KPI metrics loaded successfully');
  },

  /**
   * Job Requisitions
   */
  async getJobRequisitions(): Promise<ApiResponseEnvelope<JobRequisition[]>> {
    await delay(150);
    return createMockEnvelope(dbState.jobRequisitions, 'Job requisitions fetched from common mock API');
  },

  async createJobRequisition(
    reqData: Partial<JobRequisition>
  ): Promise<ApiResponseEnvelope<JobRequisition>> {
    await delay(180);
    const id = reqData.id || `req-${Date.now().toString().slice(-4)}`;
    const code = reqData.requisitionCode || `REQ-${Math.floor(1000 + Math.random() * 9000)}-DEPT`;
    const newReq: JobRequisition = {
      id,
      requisitionCode: code,
      title: reqData.title || 'Untitled Opening',
      departmentId: reqData.departmentId || 'dept-eng',
      positionsCount: reqData.positionsCount || 1,
      employmentType: reqData.employmentType || 'FULL_TIME',
      experienceRequired: reqData.experienceRequired || '3+ years',
      budgetMax: reqData.budgetMax || 130000,
      status: reqData.status || 'OPEN',
      requestedBy: reqData.requestedBy || 'Hiring Manager',
      approvedBy: reqData.approvedBy || 'Priya Sharma (HR Director)',
      targetHiringDate: reqData.targetHiringDate || new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    dbState.jobRequisitions = [newReq, ...dbState.jobRequisitions];

    // Also auto-create a matching public Job Posting draft or published posting so it's directly visible in Job Postings
    const postingId = `post-${Date.now().toString().slice(-4)}`;
    const newPosting: JobPosting = {
      id: postingId,
      requisitionId: newReq.id,
      postingTitle: newReq.title,
      jobDescription: `Exciting opening for ${newReq.title} within the ${newReq.departmentId} team. Leading key cloud initiatives, collaborating with cross-functional peers, and shipping performant systems.`,
      requirements: [
        `${newReq.experienceRequired} relevant domain expertise`,
        'Strong problem-solving and modern collaboration practices',
        'Proven track record in high-velocity teams',
      ],
      location: 'Bengaluru, India (Hybrid)',
      status: 'PUBLISHED',
      publishedDate: new Date().toISOString().split('T')[0],
      expiryDate: newReq.targetHiringDate,
      postedBy: 'Meera Sen (Talent Acquisition Lead)',
    };
    dbState.jobPostings = [newPosting, ...dbState.jobPostings];

    saveState(dbState);
    return createMockEnvelope(newReq, 'Job requisition created and synced with job postings');
  },

  async approveRequisition(requisitionId: string): Promise<ApiResponseEnvelope<{ id: string; status: RequisitionStatus }>> {
    await delay(150);
    dbState.jobRequisitions = dbState.jobRequisitions.map(r =>
      r.id === requisitionId
        ? { ...r, status: 'OPEN' as RequisitionStatus, approvedBy: 'Priya Sharma (HR Director)', updatedAt: new Date().toISOString() }
        : r
    );
    saveState(dbState);
    return createMockEnvelope({ id: requisitionId, status: 'OPEN' }, 'Requisition approved and opened');
  },

  async rejectRequisition(requisitionId: string): Promise<ApiResponseEnvelope<{ id: string; status: RequisitionStatus }>> {
    await delay(150);
    dbState.jobRequisitions = dbState.jobRequisitions.map(r =>
      r.id === requisitionId
        ? { ...r, status: 'REJECTED' as RequisitionStatus, updatedAt: new Date().toISOString() }
        : r
    );
    saveState(dbState);
    return createMockEnvelope({ id: requisitionId, status: 'REJECTED' }, 'Requisition rejected');
  },

  async submitForApproval(requisitionId: string): Promise<ApiResponseEnvelope<{ id: string; status: RequisitionStatus }>> {
    await delay(150);
    dbState.jobRequisitions = dbState.jobRequisitions.map(r =>
      r.id === requisitionId
        ? { ...r, status: 'PENDING_APPROVAL' as RequisitionStatus, updatedAt: new Date().toISOString() }
        : r
    );
    saveState(dbState);
    return createMockEnvelope({ id: requisitionId, status: 'PENDING_APPROVAL' }, 'Requisition submitted for approval');
  },

  /**
   * Job Postings
   */
  async getJobPostings(): Promise<ApiResponseEnvelope<JobPosting[]>> {
    await delay(150);
    return createMockEnvelope(dbState.jobPostings, 'Job postings fetched from common mock API');
  },

  async createJobPosting(postingData: Partial<JobPosting>): Promise<ApiResponseEnvelope<JobPosting>> {
    await delay(180);
    const newPosting: JobPosting = {
      id: postingData.id || `post-${Date.now().toString().slice(-4)}`,
      requisitionId: postingData.requisitionId || 'req-custom',
      postingTitle: postingData.postingTitle || 'New Position Opening',
      jobDescription: postingData.jobDescription || 'Detailed job description for opening.',
      requirements: postingData.requirements || ['Relevant experience', 'Strong collaborative skills'],
      location: postingData.location || 'Remote / Hybrid',
      status: postingData.status || 'PUBLISHED',
      publishedDate: new Date().toISOString().split('T')[0],
      expiryDate: postingData.expiryDate || null,
      postedBy: postingData.postedBy || 'Talent Acquisition Team',
    };
    dbState.jobPostings = [newPosting, ...dbState.jobPostings];
    saveState(dbState);
    return createMockEnvelope(newPosting, 'Job posting published to careers list');
  },

  async togglePublishPosting(postingId: string): Promise<ApiResponseEnvelope<JobPosting>> {
    await delay(150);
    let updated: JobPosting | null = null;
    dbState.jobPostings = dbState.jobPostings.map(post => {
      if (post.id === postingId) {
        const nextStatus = post.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
        updated = {
          ...post,
          status: nextStatus,
          publishedDate: nextStatus === 'PUBLISHED' ? new Date().toISOString().split('T')[0] : post.publishedDate,
        };
        return updated;
      }
      return post;
    });
    saveState(dbState);
    if (!updated) throw new Error('Posting not found');
    return createMockEnvelope(updated, 'Job posting status updated');
  },

  /**
   * Candidates & Applications
   */
  async getCandidates(): Promise<ApiResponseEnvelope<MockRecruitmentCandidate[]>> {
    await delay(180);
    return createMockEnvelope(dbState.candidates, 'Candidates ATS pipeline fetched from common mock API');
  },

  async getCandidateById(candidateId: string): Promise<ApiResponseEnvelope<MockRecruitmentCandidate>> {
    await delay(120);
    const candidate = dbState.candidates.find(c => c.id === candidateId);
    if (!candidate) throw new Error(`Candidate ${candidateId} not found`);
    return createMockEnvelope(candidate, 'Candidate details retrieved');
  },

  /**
   * Apply for a job via "Apply Now" (contains Name and Resume)
   */
  async applyForJob(input: {
    jobPostingId: string;
    name: string;
    resumeFileName?: string;
    resumeSummary?: MockCandidateResumeSummary;
  }): Promise<ApiResponseEnvelope<MockRecruitmentCandidate>> {
    await delay(250);

    const posting = dbState.jobPostings.find(p => p.id === input.jobPostingId);
    const roleTitle = posting?.postingTitle || 'Software Engineer';
    const requisition = dbState.jobRequisitions.find(r => r.id === posting?.requisitionId);
    const deptId = requisition?.departmentId || 'dept-eng';
    const deptName = dbState.departments.find(d => d.id === deptId)?.name || 'Engineering';

    const cleanName = input.name.trim();
    const nameParts = cleanName.split(' ');
    const firstName = nameParts[0] || 'Applicant';
    const lastName = nameParts.slice(1).join(' ') || 'Candidate';
    const candidateId = `cand-${Date.now().toString().slice(-4)}`;
    const emailSafe = `${firstName.toLowerCase()}.${lastName.toLowerCase().replace(/\s+/g, '')}@talent.demo`;

    const resumeFileName = input.resumeFileName || `${firstName.toLowerCase()}_${lastName.toLowerCase()}_resume.pdf`;

    // Generated rich resume summary if not provided
    const defaultResumeSummary: MockCandidateResumeSummary = input.resumeSummary || {
      education: 'Bachelor of Technology in Computer Science & Engineering (2021)',
      skills: posting?.requirements.slice(0, 5) || ['Full Stack Development', 'TypeScript', 'Cloud Systems', 'REST APIs'],
      bio: `Results-driven ${roleTitle} with hands-on experience developing enterprise features, high-performance web applications, and resilient cloud architectures. Passionate about engineering excellence and user impact.`,
      highlights: [
        `Delivered scalable solutions aligning with ${roleTitle} responsibilities`,
        'Collaborated with agile engineering teams to accelerate product release velocity by 30%',
        'Implemented modern automated testing, CI/CD, and robust state management',
      ],
      fileName: resumeFileName,
      fileSize: '320 KB',
    };

    const newCandidate: MockRecruitmentCandidate = {
      id: candidateId,
      firstName,
      lastName,
      email: emailSafe,
      phone: `+91 ${Math.floor(9000000000 + Math.random() * 999999999)}`,
      currentCompany: 'Technology Solutions Ltd',
      totalExperienceYears: Math.floor(3 + Math.random() * 5),
      resumeUrl: `/resumes/${resumeFileName}`,
      status: 'NEW', // Initially appears under the NEW stage
      source: 'Careers Portal (Direct Application)',
      appliedDate: new Date().toISOString().split('T')[0],
      appliedRole: roleTitle,
      departmentId: deptId,
      departmentName: deptName,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      jobPostingId: input.jobPostingId,
      resumeSummary: defaultResumeSummary,
    };

    dbState.candidates = [newCandidate, ...dbState.candidates];
    saveState(dbState);

    return createMockEnvelope(newCandidate, `Application submitted successfully for ${cleanName}. Candidate added to ATS under NEW stage.`);
  },

  /**
   * Process Candidate Application: changes stage from NEW to APPLIED
   */
  async processCandidateApplication(candidateId: string): Promise<ApiResponseEnvelope<MockRecruitmentCandidate>> {
    await delay(180);
    let updatedCandidate: MockRecruitmentCandidate | null = null;

    dbState.candidates = dbState.candidates.map(cand => {
      if (cand.id === candidateId) {
        updatedCandidate = {
          ...cand,
          status: 'APPLIED' as CandidateStatus,
          processedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        return updatedCandidate;
      }
      return cand;
    });

    if (!updatedCandidate) {
      throw new Error(`Candidate with ID ${candidateId} not found`);
    }

    saveState(dbState);
    return createMockEnvelope(updatedCandidate, 'Application processed: Candidate moved to APPLIED stage');
  },

  /**
   * Transition candidate to another ATS pipeline stage
   */
  async updateCandidateStage(
    candidateId: string,
    nextStage: CandidateStatus
  ): Promise<ApiResponseEnvelope<{ id: string; status: CandidateStatus }>> {
    await delay(150);
    dbState.candidates = dbState.candidates.map(c =>
      c.id === candidateId
        ? { ...c, status: nextStage, updatedAt: new Date().toISOString() }
        : c
    );
    saveState(dbState);
    return createMockEnvelope({ id: candidateId, status: nextStage }, `Candidate stage advanced to ${nextStage}`);
  },

  /**
   * Interviews & Scorecards
   */
  async getInterviews(): Promise<ApiResponseEnvelope<MockRecruitmentInterview[]>> {
    await delay(150);
    return createMockEnvelope(dbState.interviews, 'Interviews loaded from common mock API');
  },

  async scheduleInterview(interviewData: MockRecruitmentInterview): Promise<ApiResponseEnvelope<MockRecruitmentInterview>> {
    await delay(180);
    dbState.interviews = [interviewData, ...dbState.interviews];
    // Move candidate to INTERVIEWING
    dbState.candidates = dbState.candidates.map(c =>
      c.id === interviewData.candidateId ? { ...c, status: 'INTERVIEWING' as CandidateStatus, updatedAt: new Date().toISOString() } : c
    );
    saveState(dbState);
    return createMockEnvelope(interviewData, 'Interview round scheduled');
  },

  async getEvaluations(): Promise<ApiResponseEnvelope<CandidateEvaluation[]>> {
    await delay(150);
    return createMockEnvelope(dbState.evaluations, 'Candidate evaluations loaded from common mock API');
  },

  async submitEvaluation(evaluation: CandidateEvaluation): Promise<ApiResponseEnvelope<CandidateEvaluation>> {
    await delay(180);
    dbState.evaluations = [evaluation, ...dbState.evaluations];
    dbState.interviews = dbState.interviews.map(i =>
      i.id === evaluation.interviewId ? { ...i, status: 'COMPLETED' } : i
    );
    saveState(dbState);
    return createMockEnvelope(evaluation, 'Scorecard submitted successfully');
  },

  /**
   * Offer Letters
   */
  async getOfferLetters(): Promise<ApiResponseEnvelope<OfferLetter[]>> {
    await delay(150);
    return createMockEnvelope(dbState.offers, 'Offer letters loaded from common mock API');
  },

  async issueOfferLetter(offer: OfferLetter): Promise<ApiResponseEnvelope<OfferLetter>> {
    await delay(180);
    dbState.offers = [offer, ...dbState.offers];
    dbState.candidates = dbState.candidates.map(c =>
      c.id === offer.candidateId ? { ...c, status: 'OFFERED' as CandidateStatus, updatedAt: new Date().toISOString() } : c
    );

    // Auto-create pending insurance enrollment for candidate offer
    const newEnrollment: CandidateInsuranceEnrollment = {
      id: `ins-enr-${Date.now().toString().slice(-4)}`,
      candidateId: offer.candidateId,
      candidateName: offer.candidateName,
      offerId: offer.id,
      planId: 'ins-plan-001',
      planName: 'Comprehensive Health & Hospitalization Plan',
      status: 'PENDING_ONBOARDING',
      effectiveDate: offer.joiningDate,
    };
    dbState.insuranceEnrollments = [newEnrollment, ...dbState.insuranceEnrollments];

    saveState(dbState);
    return createMockEnvelope(offer, 'Offer letter issued to candidate');
  },

  async acceptOfferLetter(offerId: string): Promise<ApiResponseEnvelope<{ id: string; status: OfferStatus }>> {
    await delay(150);
    let candidateId = '';
    dbState.offers = dbState.offers.map(off => {
      if (off.id === offerId) {
        candidateId = off.candidateId;
        return { ...off, status: 'ACCEPTED' as OfferStatus, acceptedAt: new Date().toISOString() };
      }
      return off;
    });

    if (candidateId) {
      dbState.candidates = dbState.candidates.map(c =>
        c.id === candidateId ? { ...c, status: 'HIRED' as CandidateStatus, updatedAt: new Date().toISOString() } : c
      );
    }
    saveState(dbState);

    // Cross-sync with universalHrmsStore and all modules
    try {
      const { universalHrmsStore } = await import('./universalHrmsMockApi');
      const targetOffer = dbState.offers.find((o) => o.id === offerId);
      universalHrmsStore.convertCandidateOfferToEmployee(offerId, targetOffer);
    } catch {
      // ignore
    }

    return createMockEnvelope({ id: offerId, status: 'ACCEPTED' }, 'Offer letter accepted by candidate');
  },

  /**
   * Go to Onboarding: Transfer Candidate to Employee Management Module
   * Creates an active employee master record in the shared dataset.
   */
  async transferCandidateToEmployee(
    candidateId: string,
    offerId?: string
  ): Promise<ApiResponseEnvelope<{ employee: Employee; offer: OfferLetter }>> {
    await delay(250);

    const candidate = dbState.candidates.find(c => c.id === candidateId);
    if (!candidate) {
      throw new Error(`Candidate with ID ${candidateId} not found in ATS`);
    }

    const offer = offerId
      ? dbState.offers.find(o => o.id === offerId)
      : dbState.offers.find(o => o.candidateId === candidateId);

    const employeeCode = `EMP-${Math.floor(10000 + Math.random() * 89999)}`;
    const empId = `emp-${Date.now().toString().slice(-5)}`;

    const newEmployee: Employee = {
      id: empId,
      employeeCode,
      firstName: candidate.firstName,
      lastName: candidate.lastName,
      email: `${candidate.firstName.toLowerCase()}.${candidate.lastName.toLowerCase()}@stackly.io`,
      phone: candidate.phone,
      profileImage: null,
      dateOfBirth: '1995-05-15',
      gender: 'MALE',
      joiningDate: offer?.joiningDate || new Date().toISOString().split('T')[0],
      designation: offer?.jobTitle || candidate.appliedRole,
      departmentId: offer?.departmentId || candidate.departmentId || 'dept-eng',
      managerId: 'emp-10492', // VP Engineering default
      employmentType: 'FULL_TIME',
      employmentStatus: 'ACTIVE',
      workLocation: 'Bengaluru, India (Hybrid)',
      address: {
        street: '15, Tech Village Hub, Outer Ring Road',
        city: 'Bengaluru',
        state: 'Karnataka',
        postalCode: '560103',
        country: 'India',
      },
      emergencyContact: {
        name: 'Primary Contact',
        relationship: 'Family',
        phone: candidate.phone,
      },
      salaryStructureId: 'sal-struct-general',
      baseSalary: offer?.offeredSalary || 140000,
      panNumber: `ABC${Math.floor(1000 + Math.random() * 9000)}P`,
      uanNumber: `100${Math.floor(100000000 + Math.random() * 900000000)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Update candidate status and mark transferred
    dbState.candidates = dbState.candidates.map(c => {
      if (c.id === candidateId) {
        return {
          ...c,
          status: 'HIRED' as CandidateStatus,
          transferredToEmployeeId: empId,
          updatedAt: new Date().toISOString(),
        };
      }
      return c;
    });

    // Update offer status
    let updatedOffer: OfferLetter | null = null;
    if (offer) {
      dbState.offers = dbState.offers.map(o => {
        if (o.id === offer.id) {
          updatedOffer = {
            ...o,
            status: 'ACCEPTED' as OfferStatus,
            acceptedAt: o.acceptedAt || new Date().toISOString(),
            transferredToEmployeeId: empId,
            transferredEmployeeCode: employeeCode,
            onboardedAt: new Date().toISOString(),
          };
          return updatedOffer;
        }
        return o;
      });
    }

    // Activate insurance enrollment
    dbState.insuranceEnrollments = dbState.insuranceEnrollments.map(enr => {
      if (enr.candidateId === candidateId) {
        return { ...enr, status: 'ACTIVE' };
      }
      return enr;
    });

    // Add to master employee directory
    dbState.employees = [newEmployee, ...dbState.employees];
    saveState(dbState);

    try {
      const { universalHrmsStore } = await import('./universalHrmsMockApi');
      if (offer?.id) {
        universalHrmsStore.convertCandidateOfferToEmployee(offer.id, offer);
      } else {
        universalHrmsStore.onboardCandidate(candidateId, undefined, candidate);
      }
    } catch {
      // ignore
    }

    return createMockEnvelope(
      { employee: newEmployee, offer: updatedOffer || (offer as OfferLetter) },
      `Candidate ${candidate.firstName} ${candidate.lastName} successfully transferred to Employee Management as ${employeeCode}!`
    );
  },

  /**
   * Employees Master Directory
   */
  async getEmployees(): Promise<ApiResponseEnvelope<Employee[]>> {
    await delay(150);
    return createMockEnvelope(dbState.employees, 'Employee directory fetched from common mock API');
  },

  async getEmployeeById(id: string): Promise<ApiResponseEnvelope<Employee>> {
    await delay(120);
    const employee = dbState.employees.find(e => e.id === id);
    if (!employee) throw new Error(`Employee ${id} not found`);
    return createMockEnvelope(employee, 'Employee record fetched');
  },

  /**
   * Insurance Plans & Enrollments
   */
  async getInsurancePlans(): Promise<ApiResponseEnvelope<HrmsInsurancePlan[]>> {
    await delay(120);
    return createMockEnvelope(dbState.insurancePlans, 'Insurance plans fetched from common mock API');
  },

  async getInsuranceEnrollments(): Promise<ApiResponseEnvelope<CandidateInsuranceEnrollment[]>> {
    await delay(120);
    return createMockEnvelope(dbState.insuranceEnrollments, 'Insurance enrollments fetched from common mock API');
  },
};
