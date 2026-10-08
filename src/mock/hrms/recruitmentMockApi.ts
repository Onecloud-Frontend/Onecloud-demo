import type {
  Department,
  Employee,
  JobRequisition,
  JobPosting,
  Candidate,
  Interview,
  CandidateEvaluation,
  OfferLetter,
  CandidateStatus,
} from '@features/hrms/types';

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

export const INITIAL_RECRUITMENT_METRICS: MockRecruitmentMetrics = {
  totalOpenPositions: 9,
  activeCandidatesCount: 8,
  scheduledInterviewsCount: 2,
  acceptedOffersCount: 1,
  pendingRequisitionsCount: 2,
  avgTimeToHireDays: 24,
  offerAcceptanceRate: 85.5,
  activePostingsCount: 2,
};

export const MOCK_JOB_REQUISITIONS: JobRequisition[] = [
  {
    id: 'req-001',
    requisitionCode: 'REQ-2026-001',
    title: 'Senior Full Stack Engineer',
    departmentId: 'dept-eng',
    positionsCount: 3,
    employmentType: 'FULL_TIME',
    experienceRequired: '5+ years',
    budgetMax: 155000,
    status: 'OPEN',
    requestedBy: 'Arjun Mehta (VP Engineering)',
    approvedBy: 'Priya Sharma (HR Director)',
    targetHiringDate: '2026-11-15',
    createdAt: '2026-09-15T09:00:00Z',
    updatedAt: '2026-09-20T11:30:00Z',
  },
  {
    id: 'req-002',
    requisitionCode: 'REQ-2026-002',
    title: 'Staff DevOps & Cloud Architect',
    departmentId: 'dept-eng',
    positionsCount: 1,
    employmentType: 'FULL_TIME',
    experienceRequired: '7+ years',
    budgetMax: 180000,
    status: 'OPEN',
    requestedBy: 'Arjun Mehta (VP Engineering)',
    approvedBy: 'Priya Sharma (HR Director)',
    targetHiringDate: '2026-11-30',
    createdAt: '2026-09-18T10:00:00Z',
    updatedAt: '2026-09-22T14:15:00Z',
  },
  {
    id: 'req-003',
    requisitionCode: 'REQ-2026-003',
    title: 'Lead Product Designer',
    departmentId: 'dept-prod',
    positionsCount: 2,
    employmentType: 'FULL_TIME',
    experienceRequired: '4-6 years',
    budgetMax: 135000,
    status: 'PENDING_APPROVAL',
    requestedBy: 'Kavita Rao (Head of Product)',
    approvedBy: null,
    targetHiringDate: '2026-12-01',
    createdAt: '2026-10-01T08:30:00Z',
    updatedAt: '2026-10-01T08:30:00Z',
  },
  {
    id: 'req-004',
    requisitionCode: 'REQ-2026-004',
    title: 'Enterprise Account Executive',
    departmentId: 'dept-sales',
    positionsCount: 2,
    employmentType: 'FULL_TIME',
    experienceRequired: '3-5 years',
    budgetMax: 110000,
    status: 'PENDING_APPROVAL',
    requestedBy: 'Vikram Malhotra (VP Sales)',
    approvedBy: null,
    targetHiringDate: '2026-11-20',
    createdAt: '2026-10-03T11:00:00Z',
    updatedAt: '2026-10-03T11:00:00Z',
  },
  {
    id: 'req-005',
    requisitionCode: 'REQ-2026-005',
    title: 'Senior Financial Analyst',
    departmentId: 'dept-fin',
    positionsCount: 1,
    employmentType: 'FULL_TIME',
    experienceRequired: '5+ years',
    budgetMax: 125000,
    status: 'APPROVED',
    requestedBy: 'Suresh Nair (CFO)',
    approvedBy: 'Priya Sharma (HR Director)',
    targetHiringDate: '2026-12-15',
    createdAt: '2026-09-25T14:00:00Z',
    updatedAt: '2026-10-02T16:00:00Z',
  },
  {
    id: 'req-006',
    requisitionCode: 'REQ-2026-006',
    title: 'AI/ML Platform Engineer',
    departmentId: 'dept-eng',
    positionsCount: 1,
    employmentType: 'FULL_TIME',
    experienceRequired: '4+ years',
    budgetMax: 170000,
    status: 'DRAFT',
    requestedBy: 'Arjun Mehta (VP Engineering)',
    approvedBy: null,
    targetHiringDate: '2026-12-31',
    createdAt: '2026-10-04T15:20:00Z',
    updatedAt: '2026-10-04T15:20:00Z',
  },
];

export const MOCK_JOB_POSTINGS: JobPosting[] = [
  {
    id: 'post-001',
    requisitionId: 'req-001',
    postingTitle: 'Senior Full Stack Engineer (React 19 & Cloud Backend)',
    jobDescription:
      'We are seeking an experienced Full Stack Engineer to lead frontend architecture and scale cloud microservices. You will build high-impact enterprise workflows, collaborate with cross-functional teams, and mentor junior engineers.',
    requirements: [
      '5+ years with React, TypeScript, and modern state architectures',
      'Solid experience with Node.js, RESTful APIs, and Postgres',
      'Familiarity with distributed caching, Docker, and CI/CD',
      'Strong problem-solving and communicative mindset',
    ],
    location: 'Bengaluru, India (Hybrid)',
    status: 'PUBLISHED',
    publishedDate: '2026-09-21',
    expiryDate: '2026-11-15',
    postedBy: 'Meera Sen (Talent Acquisition Lead)',
  },
  {
    id: 'post-002',
    requisitionId: 'req-002',
    postingTitle: 'Staff DevOps & Cloud Infrastructure Architect',
    jobDescription:
      'Join our Platform Reliability team to architect multi-region Kubernetes clusters, enforce zero-trust security postures, and implement enterprise-grade observability pipelines.',
    requirements: [
      '7+ years in Cloud Infrastructure (AWS / GCP) and Kubernetes',
      'Production expertise in Terraform, GitOps, and Helm',
      'Experience in disaster recovery, multi-region routing, and service meshes',
      'Relevant CKA or AWS Solutions Architect certification preferred',
    ],
    location: 'San Francisco, CA (Remote)',
    status: 'PUBLISHED',
    publishedDate: '2026-09-23',
    expiryDate: '2026-11-30',
    postedBy: 'Meera Sen (Talent Acquisition Lead)',
  },
  {
    id: 'post-003',
    requisitionId: 'req-005',
    postingTitle: 'Senior Financial Analyst — SaaS Metrics & FP&A',
    jobDescription:
      'Partner directly with business domain heads and the CFO to build operational financial models, track ARR expansion, and optimize corporate budgets.',
    requirements: [
      '5+ years in SaaS corporate finance or FP&A',
      'Advanced Excel/Google Sheets, SQL, and BI reporting tools',
      'Deep understanding of ASC 606, CAC, LTV, and churn modeling',
      'MBA in Finance or CPA qualification',
    ],
    location: 'New York, NY (Hybrid)',
    status: 'DRAFT',
    publishedDate: null,
    expiryDate: null,
    postedBy: 'Meera Sen (Talent Acquisition Lead)',
  },
];

export const MOCK_CANDIDATES: MockRecruitmentCandidate[] = [
  // Stage: NEW
  {
    id: 'cand-001',
    firstName: 'Rohan',
    lastName: 'Verma',
    email: 'rohan.verma@talent.demo',
    phone: '+91 98765 43210',
    currentCompany: 'Apex Fintech Solutions',
    totalExperienceYears: 6,
    resumeUrl: '/resumes/rohan-verma.pdf',
    status: 'NEW',
    source: 'LinkedIn Recruiter',
    appliedDate: '2026-10-04',
    appliedRole: 'Senior Full Stack Engineer',
    departmentId: 'dept-eng',
    departmentName: 'Engineering',
    createdAt: '2026-10-04T08:30:00Z',
    updatedAt: '2026-10-04T08:30:00Z',
    resumeSummary: {
      education: 'B.Tech in Computer Science, IIT Bombay (2020)',
      skills: ['React 19', 'TypeScript', 'Node.js', 'PostgreSQL', 'GraphQL', 'AWS'],
      bio: 'Lead frontend engineer with 6 years experience designing mission-critical payment gateways and financial dashboards.',
      highlights: [
        'Scaled customer-facing checkout system handling 15,000 req/sec',
        'Migrated monolithic legacy app to modern micro-frontend React architecture',
        'Spearheaded performance tuning, reducing LCP by 45%',
      ],
    },
  },
  {
    id: 'cand-002',
    firstName: 'Ananya',
    lastName: 'Iyer',
    email: 'ananya.iyer@talent.demo',
    phone: '+91 98123 45678',
    currentCompany: 'CloudScale Technologies',
    totalExperienceYears: 8,
    resumeUrl: '/resumes/ananya-iyer.pdf',
    status: 'NEW',
    source: 'Employee Referral',
    appliedDate: '2026-10-05',
    appliedRole: 'Staff DevOps & Cloud Architect',
    departmentId: 'dept-eng',
    departmentName: 'Engineering',
    createdAt: '2026-10-05T06:15:00Z',
    updatedAt: '2026-10-05T06:15:00Z',
    resumeSummary: {
      education: 'M.S. in Computer Science, Georgia Tech (2018)',
      skills: ['Kubernetes', 'Terraform', 'GCP', 'AWS', 'ArgoCD', 'Prometheus', 'Golang'],
      bio: 'DevOps architect focused on automated multi-cluster orchestration, zero-downtime blue/green rollouts, and infrastructure compliance.',
      highlights: [
        'Architected Kubernetes clusters across 4 global regions with 99.99% uptime',
        'Reduced enterprise cloud compute spend by 32% via autoscaling and spot pools',
      ],
    },
  },

  // Stage: SCREENING
  {
    id: 'cand-003',
    firstName: 'Devansh',
    lastName: 'Patel',
    email: 'devansh.patel@talent.demo',
    phone: '+1 415 555 0192',
    currentCompany: 'SaaSify Global',
    totalExperienceYears: 5,
    resumeUrl: '/resumes/devansh-patel.pdf',
    status: 'SCREENING',
    source: 'Careers Portal',
    appliedDate: '2026-10-02',
    appliedRole: 'Senior Full Stack Engineer',
    departmentId: 'dept-eng',
    departmentName: 'Engineering',
    createdAt: '2026-10-02T11:20:00Z',
    updatedAt: '2026-10-03T10:00:00Z',
    resumeSummary: {
      education: 'B.S. Software Engineering, San Jose State University (2021)',
      skills: ['React', 'TypeScript', 'Node.js', 'Express', 'Redis', 'Docker'],
      bio: 'Full stack product developer passionate about clean UI abstractions, type safety, and real-time collaboration widgets.',
      highlights: [
        'Implemented WebSocket collaboration canvas used by 100K+ daily active users',
        'Standardized company design tokens and reusable component library',
      ],
    },
  },
  {
    id: 'cand-004',
    firstName: 'Sneha',
    lastName: 'Kulkarni',
    email: 'sneha.k@talent.demo',
    phone: '+91 99234 56789',
    currentCompany: 'InfraGen Solutions',
    totalExperienceYears: 7,
    resumeUrl: '/resumes/sneha-k.pdf',
    status: 'SCREENING',
    source: 'LinkedIn Recruiter',
    appliedDate: '2026-10-03',
    appliedRole: 'Staff DevOps & Cloud Architect',
    departmentId: 'dept-eng',
    departmentName: 'Engineering',
    createdAt: '2026-10-03T09:40:00Z',
    updatedAt: '2026-10-04T12:00:00Z',
    resumeSummary: {
      education: 'B.Tech Information Technology, VJTI Mumbai (2019)',
      skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD Pipelines', 'Ansible', 'Linux'],
      bio: 'Senior SRE specializing in automated deployment pipelines, canary testing, and container vulnerability scanning.',
      highlights: [
        'Automated release pipeline cutting production deployment duration from 45m to 7m',
        'Implemented centralized logging with OpenTelemetry and Grafana Loki',
      ],
    },
  },

  // Stage: INTERVIEWING
  {
    id: 'cand-005',
    firstName: 'Marcus',
    lastName: 'Chen',
    email: 'marcus.chen@talent.demo',
    phone: '+1 206 555 0144',
    currentCompany: 'Stripe Ecosystem',
    totalExperienceYears: 6,
    resumeUrl: '/resumes/marcus-chen.pdf',
    status: 'INTERVIEWING',
    source: 'Direct Sourcing',
    appliedDate: '2026-09-28',
    appliedRole: 'Senior Full Stack Engineer',
    departmentId: 'dept-eng',
    departmentName: 'Engineering',
    createdAt: '2026-09-28T14:00:00Z',
    updatedAt: '2026-10-04T16:00:00Z',
    resumeSummary: {
      education: 'B.S. Computer Science, University of Washington (2020)',
      skills: ['React', 'TypeScript', 'Node.js', 'Distributed Systems', 'PostgreSQL', 'Kafka'],
      bio: 'Software engineer with deep background in high-concurrency event ingestion, distributed billing, and resilient APIs.',
      highlights: [
        'Designed idempotent webhook processing engine with 99.999% delivery guarantee',
        'Mentored 4 junior and mid-level software engineers to promotion',
      ],
    },
  },
  {
    id: 'cand-006',
    firstName: 'Pooja',
    lastName: 'Reddy',
    email: 'pooja.reddy@talent.demo',
    phone: '+91 97345 67890',
    currentCompany: 'KubeWorks Cloud',
    totalExperienceYears: 9,
    resumeUrl: '/resumes/pooja-reddy.pdf',
    status: 'INTERVIEWING',
    source: 'Employee Referral',
    appliedDate: '2026-09-29',
    appliedRole: 'Staff DevOps & Cloud Architect',
    departmentId: 'dept-eng',
    departmentName: 'Engineering',
    createdAt: '2026-09-29T10:15:00Z',
    updatedAt: '2026-10-05T09:30:00Z',
    resumeSummary: {
      education: 'B.Tech Electrical & Electronics, NIT Trichy (2017)',
      skills: ['AWS', 'GCP', 'Kubernetes', 'Terraform', 'Vault', 'Zero Trust', 'Python'],
      bio: 'Seasoned cloud architect with demonstrated success building defense-in-depth infrastructure for regulated fintech apps.',
      highlights: [
        'Led SOC-2 Type II and ISO 27001 infrastructure compliance certification',
        'Implemented automated secret rotation and mTLS between microservices',
      ],
    },
  },

  // Stage: OFFERED
  {
    id: 'cand-007',
    firstName: 'Siddharth',
    lastName: 'Nair',
    email: 'siddharth.nair@talent.demo',
    phone: '+91 98456 78901',
    currentCompany: 'Razorpay Systems',
    totalExperienceYears: 7,
    resumeUrl: '/resumes/siddharth-nair.pdf',
    status: 'OFFERED',
    source: 'LinkedIn InMail',
    appliedDate: '2026-09-20',
    appliedRole: 'Senior Full Stack Engineer',
    departmentId: 'dept-eng',
    departmentName: 'Engineering',
    createdAt: '2026-09-20T10:00:00Z',
    updatedAt: '2026-10-01T15:00:00Z',
    resumeSummary: {
      education: 'B.Tech Computer Science, BITS Pilani (2019)',
      skills: ['React 19', 'TypeScript', 'Node.js', 'System Architecture', 'Redis', 'Kafka'],
      bio: 'Fintech engineering veteran experienced in building ultra-scalable settlement pipelines and polished web applications.',
      highlights: [
        'Completed full interview loop with unanimous Strong Hire recommendations',
        'Led architectural design for multi-tenant merchant onboarding portal',
      ],
    },
  },
  {
    id: 'cand-008',
    firstName: 'Elena',
    lastName: 'Rostova',
    email: 'elena.rostova@talent.demo',
    phone: '+1 415 555 0188',
    currentCompany: 'Datadog Platforms',
    totalExperienceYears: 8,
    resumeUrl: '/resumes/elena-rostova.pdf',
    status: 'OFFERED',
    source: 'Careers Portal',
    appliedDate: '2026-09-18',
    appliedRole: 'Staff DevOps & Cloud Architect',
    departmentId: 'dept-eng',
    departmentName: 'Engineering',
    createdAt: '2026-09-18T16:00:00Z',
    updatedAt: '2026-10-02T14:20:00Z',
    resumeSummary: {
      education: 'B.S. Computer Engineering, UC Berkeley (2018)',
      skills: ['Kubernetes', 'Multi-Cloud', 'Observability', 'Terraform', 'Golang'],
      bio: 'Infrastructure lead experienced in planetary-scale telemetries, service meshes, and incident response automation.',
      highlights: [
        'Offer letter accepted; onboarding scheduled for HRMS employee creation',
        'Top-rated candidate with 5/5 scorecards across all technical rubrics',
      ],
    },
  },
];

export const MOCK_INTERVIEWS: MockRecruitmentInterview[] = [
  {
    id: 'int-001',
    candidateId: 'cand-005',
    candidateName: 'Marcus Chen',
    candidateRole: 'Senior Full Stack Engineer',
    departmentName: 'Engineering',
    jobPostingId: 'post-001',
    interviewRound: 'Round 1: Data Structures & Live Coding',
    interviewerIds: ['EMP-1002 (Kunal Shah)', 'EMP-1008 (Deepak Verma)'],
    scheduledStartTime: '2026-10-04T14:00:00Z',
    scheduledEndTime: '2026-10-04T15:00:00Z',
    meetingLink: 'https://meet.google.com/one-tech-rnd1',
    status: 'COMPLETED',
    feedbackSummary: 'Excellent algorithm optimization, clean coding style, and solid edge-case analysis.',
    rating: 4.8,
  },
  {
    id: 'int-002',
    candidateId: 'cand-005',
    candidateName: 'Marcus Chen',
    candidateRole: 'Senior Full Stack Engineer',
    departmentName: 'Engineering',
    jobPostingId: 'post-001',
    interviewRound: 'Round 2: System Architecture & Concurrency',
    interviewerIds: ['EMP-1001 (Arjun Mehta - VP Eng)'],
    scheduledStartTime: '2026-10-06T16:00:00Z',
    scheduledEndTime: '2026-10-06T17:00:00Z',
    meetingLink: 'https://meet.google.com/one-arch-rnd2',
    status: 'SCHEDULED',
  },
  {
    id: 'int-003',
    candidateId: 'cand-006',
    candidateName: 'Pooja Reddy',
    candidateRole: 'Staff DevOps & Cloud Architect',
    departmentName: 'Engineering',
    jobPostingId: 'post-002',
    interviewRound: 'Round 1: Kubernetes & Infrastructure as Code',
    interviewerIds: ['EMP-1001 (Arjun Mehta)', 'EMP-1014 (Siddharth Das)'],
    scheduledStartTime: '2026-10-07T10:00:00Z',
    scheduledEndTime: '2026-10-07T11:00:00Z',
    meetingLink: 'https://meet.google.com/one-devops-rnd1',
    status: 'SCHEDULED',
  },
  {
    id: 'int-004',
    candidateId: 'cand-007',
    candidateName: 'Siddharth Nair',
    candidateRole: 'Senior Full Stack Engineer',
    departmentName: 'Engineering',
    jobPostingId: 'post-001',
    interviewRound: 'Executive Leadership & Cultural Alignment',
    interviewerIds: ['EMP-1000 (Priya Sharma - HR Dir)', 'EMP-1001 (Arjun Mehta)'],
    scheduledStartTime: '2026-09-25T11:00:00Z',
    scheduledEndTime: '2026-09-25T12:00:00Z',
    meetingLink: 'https://meet.google.com/one-exec-fit',
    status: 'COMPLETED',
    feedbackSummary: 'Unanimous cultural fit. Exemplifies ownership, collaboration, and engineering leadership.',
    rating: 5.0,
  },
];

export const MOCK_CANDIDATE_EVALUATIONS: CandidateEvaluation[] = [
  {
    id: 'eval-001',
    interviewId: 'int-001',
    candidateId: 'cand-005',
    evaluatorId: 'EMP-1002 (Kunal Shah - Principal Engineer)',
    technicalRating: 5,
    communicationRating: 5,
    culturalFitRating: 4,
    overallRecommendation: 'STRONG_HIRE',
    notes:
      'Candidate solved both algorithmic challenges with optimal O(N) runtime and O(1) space. Demonstrated exceptional command of TypeScript type gymnastics and React component lifecycle.',
    submittedAt: '2026-10-04T15:20:00Z',
  },
  {
    id: 'eval-002',
    interviewId: 'int-004',
    candidateId: 'cand-007',
    evaluatorId: 'EMP-1000 (Priya Sharma - HR Director)',
    technicalRating: 5,
    communicationRating: 5,
    culturalFitRating: 5,
    overallRecommendation: 'STRONG_HIRE',
    notes:
      'Outstanding cross-functional communicator with high emotional intelligence. Articulated pragmatic tradeoffs between velocity and tech debt.',
    submittedAt: '2026-09-25T12:30:00Z',
  },
];

export const MOCK_OFFER_LETTERS: OfferLetter[] = [
  {
    id: 'off-001',
    candidateId: 'cand-007',
    candidateName: 'Siddharth Nair',
    jobTitle: 'Senior Full Stack Engineer',
    departmentId: 'dept-eng',
    offeredSalary: 155000,
    joiningDate: '2026-11-01',
    expiryDate: '2026-10-15',
    status: 'ISSUED',
    issuedBy: 'Priya Sharma (HR Director)',
    issuedAt: '2026-10-01T10:00:00Z',
    acceptedAt: null,
    terms:
      'Full-time salaried role. Includes medical/dental/vision coverage, 401(k) 5% matching, 20 annual paid leaves, and $3,000 annual learning stipend.',
  },
  {
    id: 'off-002',
    candidateId: 'cand-008',
    candidateName: 'Elena Rostova',
    jobTitle: 'Staff DevOps & Cloud Architect',
    departmentId: 'dept-eng',
    offeredSalary: 180000,
    joiningDate: '2026-10-20',
    expiryDate: '2026-10-10',
    status: 'ACCEPTED',
    issuedBy: 'Priya Sharma (HR Director)',
    issuedAt: '2026-09-28T09:00:00Z',
    acceptedAt: '2026-10-02T14:20:00Z',
    terms:
      'Staff level role. Includes $25,000 equity RSU grant vesting over 4 years, comprehensive global health plan, and remote home office budget.',
  },
];

export const RECRUITMENT_DEPARTMENTS = [
  { id: 'dept-all', name: 'All Departments' },
  { id: 'dept-eng', name: 'Engineering' },
  { id: 'dept-prod', name: 'Product Management' },
  { id: 'dept-sales', name: 'Sales & Growth' },
  { id: 'dept-fin', name: 'Finance' },
  { id: 'dept-hr', name: 'Human Resources' },
];

export const mockDepartments: Department[] = [
  {
    id: 'dept-eng',
    departmentCode: 'ENG',
    name: 'Engineering',
    description: 'Software Architecture, Cloud Infrastructure, and Platform Development',
    headOfDepartmentId: 'emp-10492',
    parentDepartmentId: null,
    status: 'ACTIVE',
    costCenterCode: 'CC-ENG-101',
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2025-01-10T10:00:00Z',
  },
  {
    id: 'dept-prod',
    departmentCode: 'PROD',
    name: 'Product Management',
    description: 'Product Strategy, UX Research, Feature Execution, and Roadmap Planning',
    headOfDepartmentId: 'emp-10518',
    parentDepartmentId: null,
    status: 'ACTIVE',
    costCenterCode: 'CC-PRD-102',
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2025-01-10T10:00:00Z',
  },
  {
    id: 'dept-sales',
    departmentCode: 'SG',
    name: 'Sales & Growth',
    description: 'Enterprise Accounts, Customer Success, and Revenue Expansion',
    headOfDepartmentId: 'emp-12190',
    parentDepartmentId: null,
    status: 'ACTIVE',
    costCenterCode: 'CC-SG-103',
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2025-01-10T10:00:00Z',
  },
  {
    id: 'dept-fin',
    departmentCode: 'FIN',
    name: 'Finance',
    description: 'Corporate Accounting, Financial Planning & Analysis, Treasury, and Payroll',
    headOfDepartmentId: 'emp-12234',
    parentDepartmentId: null,
    status: 'ACTIVE',
    costCenterCode: 'CC-FIN-106',
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2025-01-10T10:00:00Z',
  },
  {
    id: 'dept-hr',
    departmentCode: 'HR',
    name: 'Human Resources',
    description: 'People Operations, Strategic HRBP, Talent Acquisition, and Recruitment',
    headOfDepartmentId: 'emp-10702',
    parentDepartmentId: null,
    status: 'ACTIVE',
    costCenterCode: 'CC-HR-104',
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2025-01-10T10:00:00Z',
  },
];

export const mockRecruitmentEmployees: Employee[] = [
  {
    id: 'emp-10492',
    employeeCode: 'EMP-10492',
    firstName: 'Arjun',
    lastName: 'Mehta',
    email: 'arjun.mehta@stackly.io',
    phone: '+91 98450 10492',
    profileImage: null,
    dateOfBirth: '1987-04-12',
    gender: 'MALE',
    joiningDate: '2021-03-01',
    designation: 'VP of Engineering',
    departmentId: 'dept-eng',
    managerId: null,
    employmentType: 'FULL_TIME',
    employmentStatus: 'ACTIVE',
    workLocation: 'Bengaluru, India',
    address: {
      street: '42, Indiranagar 100ft Road',
      city: 'Bengaluru',
      state: 'Karnataka',
      postalCode: '560038',
      country: 'India',
    },
    emergencyContact: {
      name: 'Ritu Mehta',
      relationship: 'Spouse',
      phone: '+91 98450 99881',
    },
    salaryStructureId: 'sal-struct-arch',
    baseSalary: 160000,
    panNumber: 'ABCPS8192K',
    uanNumber: '100928174829',
    createdAt: '2021-03-01T08:00:00Z',
    updatedAt: '2025-02-14T11:20:00Z',
  },
  {
    id: 'emp-10702',
    employeeCode: 'EMP-10702',
    firstName: 'Priya',
    lastName: 'Sharma',
    email: 'priya.sharma@stackly.io',
    phone: '+91 98450 10702',
    profileImage: null,
    dateOfBirth: '1990-02-14',
    gender: 'FEMALE',
    joiningDate: '2021-09-15',
    designation: 'Director of Human Resources',
    departmentId: 'dept-hr',
    managerId: null,
    employmentType: 'FULL_TIME',
    employmentStatus: 'ACTIVE',
    workLocation: 'Bengaluru, India',
    address: {
      street: '18, Koramangala 4th Block',
      city: 'Bengaluru',
      state: 'Karnataka',
      postalCode: '560034',
      country: 'India',
    },
    emergencyContact: {
      name: 'Vikram Sharma',
      relationship: 'Spouse',
      phone: '+91 98450 88772',
    },
    salaryStructureId: 'sal-struct-hrbp-sr',
    baseSalary: 145000,
    panNumber: 'DNPAD9102L',
    uanNumber: '100659281749',
    createdAt: '2021-09-15T09:00:00Z',
    updatedAt: '2025-02-28T16:00:00Z',
  },
];

import { commonHrmsMockApi } from './commonHrmsMockApi';
export * from './commonHrmsMockApi';

/**
 * Async Mock API Service for Recruitment Domain
 * Delegates directly to the canonical commonHrmsMockApi single source of truth.
 */
export const recruitmentMockApi = {
  getMetrics: () => commonHrmsMockApi.getMetrics(),
  getJobRequisitions: () => commonHrmsMockApi.getJobRequisitions(),
  createJobRequisition: (reqData: Partial<JobRequisition>) => commonHrmsMockApi.createJobRequisition(reqData),
  getJobPostings: () => commonHrmsMockApi.getJobPostings(),
  createJobPosting: (postingData: Partial<JobPosting>) => commonHrmsMockApi.createJobPosting(postingData),
  togglePublishPosting: (postingId: string) => commonHrmsMockApi.togglePublishPosting(postingId),
  getCandidates: () => commonHrmsMockApi.getCandidates(),
  getCandidateById: (candidateId: string) => commonHrmsMockApi.getCandidateById(candidateId),
  applyForJob: (input: {
    jobPostingId: string;
    name: string;
    resumeFileName?: string;
    resumeSummary?: MockCandidateResumeSummary;
  }) => commonHrmsMockApi.applyForJob(input),
  processCandidateApplication: (candidateId: string) => commonHrmsMockApi.processCandidateApplication(candidateId),
  getInterviews: () => commonHrmsMockApi.getInterviews(),
  getEvaluations: () => commonHrmsMockApi.getEvaluations(),
  getOfferLetters: () => commonHrmsMockApi.getOfferLetters(),
  approveRequisition: (requisitionId: string) => commonHrmsMockApi.approveRequisition(requisitionId),
  rejectRequisition: (requisitionId: string) => commonHrmsMockApi.rejectRequisition(requisitionId),
  submitForApproval: (requisitionId: string) => commonHrmsMockApi.submitForApproval(requisitionId),
  updateCandidateStage: (candidateId: string, nextStage: CandidateStatus) =>
    commonHrmsMockApi.updateCandidateStage(candidateId, nextStage),
  scheduleInterview: (interview: MockRecruitmentInterview) => commonHrmsMockApi.scheduleInterview(interview),
  submitEvaluation: (evaluation: CandidateEvaluation) => commonHrmsMockApi.submitEvaluation(evaluation),
  issueOfferLetter: (offer: OfferLetter) => commonHrmsMockApi.issueOfferLetter(offer),
  acceptOfferLetter: (offerId: string) => commonHrmsMockApi.acceptOfferLetter(offerId),
  transferCandidateToEmployee: (candidateId: string, offerId?: string) =>
    commonHrmsMockApi.transferCandidateToEmployee(candidateId, offerId),
  getEmployees: () => commonHrmsMockApi.getEmployees(),
  getInsurancePlans: () => commonHrmsMockApi.getInsurancePlans(),
  getInsuranceEnrollments: () => commonHrmsMockApi.getInsuranceEnrollments(),
};
