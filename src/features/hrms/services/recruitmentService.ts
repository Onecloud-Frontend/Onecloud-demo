import {
  MOCK_JOB_OPENINGS,
  UNIFIED_MOCK_CANDIDATES,
  UnifiedJobOpening,
  UnifiedCandidate,
} from '@mock/hrms/recruitmentMockData';

let openingsStore: UnifiedJobOpening[] = [...MOCK_JOB_OPENINGS];
let candidatesStore: UnifiedCandidate[] = [...UNIFIED_MOCK_CANDIDATES];

export interface UnifiedInterview {
  id: string;
  candidateId: string;
  candidateName: string;
  role: string;
  roundName: string;
  interviewerName: string;
  dateTime: string;
  meetingLink: string;
  rating?: number;
  recommendation: 'Strong Hire' | 'Hire' | 'Pending' | 'Needs Review';
  status: 'Scheduled' | 'Completed';
}

let interviewsStore: UnifiedInterview[] = [
  {
    id: 'INT-301',
    candidateId: 'CAN-801',
    candidateName: 'Aniket Mukherjee',
    role: 'Senior Cloud Platform Engineer',
    roundName: 'System Architecture Deep-Dive',
    interviewerName: 'Aarav Sharma (Principal Architect)',
    dateTime: '2026-10-09 · 02:00 PM',
    meetingLink: 'https://meet.google.com/stk-eng-301',
    rating: 4.5,
    recommendation: 'Hire',
    status: 'Scheduled',
  },
  {
    id: 'INT-302',
    candidateId: 'CAN-803',
    candidateName: 'Rahul Bhatnagar',
    role: 'Enterprise Account Executive',
    roundName: 'Executive VP Commercial Pitch',
    interviewerName: 'Rohan Mehta (VP Sales)',
    dateTime: '2026-10-08 · 11:30 AM',
    meetingLink: 'https://meet.google.com/stk-sls-402',
    rating: 4.2,
    recommendation: 'Pending',
    status: 'Scheduled',
  },
  {
    id: 'INT-303',
    candidateId: 'CAN-804',
    candidateName: 'Sameera Khan',
    role: 'Staff UI Design Architect',
    roundName: 'Design Systems Portfolio Review',
    interviewerName: 'Vikramaditya Roy (Lead Design)',
    dateTime: '2026-10-07 · 04:00 PM',
    meetingLink: 'https://meet.google.com/stk-des-108',
    rating: 4.9,
    recommendation: 'Strong Hire',
    status: 'Completed',
  },
];

export interface UnifiedOfferLetter {
  id: string;
  candidateId: string;
  candidateName: string;
  role: string;
  department: string;
  offeredCtc: number;
  proposedJoiningDate: string;
  status: 'Draft' | 'Sent' | 'Accepted' | 'Declined';
  onboardingConverted?: boolean;
}

let offersStore: UnifiedOfferLetter[] = [
  {
    id: 'OFR-2026-01',
    candidateId: 'CAN-802',
    candidateName: 'Deepika Sundaram',
    role: 'Product Growth Manager',
    department: 'Product Management',
    offeredCtc: 2150000,
    proposedJoiningDate: '2026-11-01',
    status: 'Accepted',
    onboardingConverted: true,
  },
  {
    id: 'OFR-2026-02',
    candidateId: 'CAN-805',
    candidateName: 'Karthik Subramanian',
    role: 'Senior Cloud Platform Engineer',
    department: 'Engineering',
    offeredCtc: 2500000,
    proposedJoiningDate: '2026-10-25',
    status: 'Accepted',
    onboardingConverted: false,
  },
];

const delay = (ms = 80) => new Promise((resolve) => setTimeout(resolve, ms));

export const getJobOpenings = async (): Promise<UnifiedJobOpening[]> => {
  await delay(60);
  return [...openingsStore];
};

export const createJobOpening = async (
  payload: Omit<UnifiedJobOpening, 'id' | 'requisitionCode' | 'applicantsCount'>
): Promise<UnifiedJobOpening> => {
  await delay(100);
  const newOpening: UnifiedJobOpening = {
    id: `REQ-${Date.now().toString().slice(-4)}`,
    requisitionCode: `REQ-${Math.floor(4000 + Math.random() * 900)}`,
    applicantsCount: 0,
    ...payload,
  };
  openingsStore = [newOpening, ...openingsStore];
  return newOpening;
};

export const getCandidates = async (
  options?: { searchQuery?: string; stage?: string }
): Promise<UnifiedCandidate[]> => {
  await delay(60);
  let list = [...candidatesStore];
  if (!options) return list;

  if (options.searchQuery && options.searchQuery.trim()) {
    const q = options.searchQuery.toLowerCase().trim();
    list = list.filter(
      (c) =>
        c.fullName.toLowerCase().includes(q) ||
        c.applyingFor.toLowerCase().includes(q) ||
        c.candidateCode.toLowerCase().includes(q) ||
        c.currentCompany.toLowerCase().includes(q)
    );
  }

  if (options.stage && options.stage !== 'All') {
    list = list.filter((c) => c.stage === options.stage);
  }

  return list;
};

export const updateCandidateStage = async (
  id: string,
  newStage: UnifiedCandidate['stage']
): Promise<UnifiedCandidate> => {
  await delay(80);
  const idx = candidatesStore.findIndex((c) => c.id === id);
  if (idx === -1) throw new Error(`Candidate ${id} not found.`);
  candidatesStore[idx] = { ...candidatesStore[idx], stage: newStage };
  return candidatesStore[idx];
};

export const getInterviews = async (): Promise<UnifiedInterview[]> => {
  await delay(60);
  return [...interviewsStore];
};

export const getOfferLetters = async (): Promise<UnifiedOfferLetter[]> => {
  await delay(60);
  return [...offersStore];
};

export const convertOfferToOnboarding = async (offerId: string): Promise<UnifiedOfferLetter> => {
  await delay(80);
  const idx = offersStore.findIndex((o) => o.id === offerId);
  if (idx === -1) throw new Error(`Offer ${offerId} not found.`);
  offersStore[idx] = { ...offersStore[idx], onboardingConverted: true };
  return offersStore[idx];
};

/**
 * Cross-service employee registration helper for candidate onboarding
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const registerEmployeeInService = (emp: any): void => {
  if (typeof window !== 'undefined' && window.localStorage && emp) {
    try {
      const raw = window.localStorage.getItem('onecloud_hrms_master_db_v2');
      if (raw) {
        const db = JSON.parse(raw);
        if (!Array.isArray(db.employees)) db.employees = [];
        if (!db.employees.some((e: { id: string; employeeCode?: string }) => e.id === emp.id || e.employeeCode === emp.employeeCode)) {
          db.employees = [emp, ...db.employees];
          window.localStorage.setItem('onecloud_hrms_master_db_v2', JSON.stringify(db));
        }
      }
    } catch {}
  }
};
