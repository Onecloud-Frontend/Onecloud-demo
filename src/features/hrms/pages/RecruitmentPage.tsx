import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PageHeader,
  Button,
  LoadingState,
  ErrorState,
} from '@shared/components';
import { HrmsSubNav } from '../components/common/HrmsSubNav';
import { universalHrmsStore } from '../../../mock/hrms';
import { registerEmployeeInService } from '../services/recruitmentService';
import type {
  JobRequisition,
  JobPosting,
  CandidateEvaluation,
  OfferLetter,
  RequisitionStatus,
  CandidateStatus,
  InterviewStatus,
  OfferStatus,
} from '@features/hrms/types';
import {
  Briefcase,
  Users,
  Calendar,
  FileText,
  Plus,
  X,
  Sparkles,
} from 'lucide-react';

import {
  MOCK_JOB_REQUISITIONS,
  MOCK_JOB_POSTINGS,
  MOCK_CANDIDATES,
  MOCK_INTERVIEWS,
  MOCK_CANDIDATE_EVALUATIONS,
  MOCK_OFFER_LETTERS,
  RECRUITMENT_DEPARTMENTS,
  recruitmentMockApi,
} from '@mock/hrms/recruitmentMockApi';
import type {
  MockRecruitmentCandidate,
  MockRecruitmentInterview,
  MockCandidateResumeSummary,
} from '@mock/hrms/recruitmentMockApi';

import {
  RecruitmentKpiCards,
  ApplicantPipelineView,
  JobRequisitionsView,
  InterviewsView,
  OfferLettersView,
  ResumeReviewModal,
  CreateRequisitionModal,
  ScheduleInterviewModal,
  ScorecardEvaluatorModal,
  CreateOfferModal,
  OfferPreviewModal,
  JobPostingPreviewModal,
  ApplyJobModal,
} from '../components/recruitment';

export const RecruitmentPage: React.FC = () => {
  const navigate = useNavigate();
  // Navigation Tab State: Job Postings (requisitions) comes FIRST, followed by ATS (pipeline)
  const [activeTab, setActiveTab] = useState<'requisitions' | 'pipeline' | 'interviews' | 'offers'>('requisitions');
  const [requisitionSubView, setRequisitionSubView] = useState<'postings' | 'requisitions'>('postings');

  // Async API & Feedback States
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Master Entity Datasets
  const [requisitions, setRequisitions] = useState<JobRequisition[]>(MOCK_JOB_REQUISITIONS);
  const [postings, setPostings] = useState<JobPosting[]>(MOCK_JOB_POSTINGS);
  const [candidates, setCandidates] = useState<MockRecruitmentCandidate[]>(MOCK_CANDIDATES);
  const [interviews, setInterviews] = useState<MockRecruitmentInterview[]>(MOCK_INTERVIEWS);
  const [evaluations, setEvaluations] = useState<CandidateEvaluation[]>(MOCK_CANDIDATE_EVALUATIONS);
  const [offers, setOffers] = useState<OfferLetter[]>(MOCK_OFFER_LETTERS);

  // Filter & Search Controls
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('dept-all');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Modal Dialog States
  const [showCreateRequisitionModal, setShowCreateRequisitionModal] = useState(false);
  const [showScheduleInterviewModal, setShowScheduleInterviewModal] = useState(false);
  const [scheduleModalCandidateId, setScheduleModalCandidateId] = useState('');
  const [selectedCandidateForResume, setSelectedCandidateForResume] = useState<MockRecruitmentCandidate | null>(null);
  const [selectedInterviewForScorecard, setSelectedInterviewForScorecard] = useState<MockRecruitmentInterview | null>(null);
  const [existingEvaluationForScorecard, setExistingEvaluationForScorecard] = useState<CandidateEvaluation | undefined>(undefined);
  const [showCreateOfferModal, setShowCreateOfferModal] = useState<MockRecruitmentCandidate | null>(null);
  const [selectedOfferForPreview, setSelectedOfferForPreview] = useState<OfferLetter | null>(null);
  const [selectedPostingForPreview, setSelectedPostingForPreview] = useState<JobPosting | null>(null);
  const [selectedPostingForApply, setSelectedPostingForApply] = useState<JobPosting | null>(null);

  // Initialize and load data asynchronously from Recruitment Mock API
  useEffect(() => {
    let isMounted = true;
    async function loadMockData() {
      try {
        setIsLoading(true);
        const [reqRes, postRes, candRes, intRes, evalRes, offRes] = await Promise.all([
          recruitmentMockApi.getJobRequisitions(),
          recruitmentMockApi.getJobPostings(),
          recruitmentMockApi.getCandidates(),
          recruitmentMockApi.getInterviews(),
          recruitmentMockApi.getEvaluations(),
          recruitmentMockApi.getOfferLetters(),
        ]);

        if (isMounted) {
          setRequisitions(reqRes.data);
          setPostings(postRes.data);
          setCandidates(candRes.data);
          setInterviews(intRes.data);
          setEvaluations(evalRes.data);
          setOffers(offRes.data);
          setIsLoading(false);
        }
      } catch {
        if (isMounted) {
          setHasError(true);
          setIsLoading(false);
        }
      }
    }

    loadMockData();

    // Cross-module reactive subscription to universal HRMS store
    const unsubscribe = universalHrmsStore.subscribe(() => {
      if (isMounted) {
        if (universalHrmsStore.requisitions.length) setRequisitions([...universalHrmsStore.requisitions]);
        if (universalHrmsStore.postings.length) setPostings([...universalHrmsStore.postings]);
        if (universalHrmsStore.candidates.length) setCandidates(universalHrmsStore.candidates as MockRecruitmentCandidate[]);
        if (universalHrmsStore.interviews.length) setInterviews(universalHrmsStore.interviews as MockRecruitmentInterview[]);
        if (universalHrmsStore.evaluations.length) setEvaluations([...universalHrmsStore.evaluations]);
        if (universalHrmsStore.offers.length) setOffers([...universalHrmsStore.offers]);
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Dynamic KPI Metrics Calculation (responsive to entity state updates, postings, and department filter)
  const kpiData = useMemo(() => {
    const isAllDepts = departmentFilter === 'dept-all';
    const selectedDeptObj = RECRUITMENT_DEPARTMENTS.find(d => d.id === departmentFilter);
    const deptName = selectedDeptObj ? selectedDeptObj.name : '';

    // Active Job Postings in scope
    const targetPostings = isAllDepts
      ? postings
      : postings.filter(p => {
          const req = requisitions.find(r => r.id === p.requisitionId);
          return req ? req.departmentId === departmentFilter : true;
        });

    // Requisitions in scope
    const targetReqs = isAllDepts
      ? requisitions
      : requisitions.filter(r => r.departmentId === departmentFilter);
    const openReqs = targetReqs.filter(r => r.status === 'OPEN' || r.status === 'APPROVED' || r.status === 'PENDING_APPROVAL');

    // Total open positions reflects the live active job postings / open requisitions
    const openPositionsCount = Math.max(targetPostings.length, openReqs.length);

    // Unique departments with open positions across company
    const openDepts = new Set([
      ...requisitions
        .filter(r => r.status === 'OPEN' || r.status === 'APPROVED' || r.status === 'PENDING_APPROVAL')
        .map(r => r.departmentId),
      ...postings
        .map(p => {
          const req = requisitions.find(r => r.id === p.requisitionId);
          return req?.departmentId;
        })
        .filter((d): d is string => Boolean(d)),
    ]);
    const totalCompanyDepartments = RECRUITMENT_DEPARTMENTS.filter(d => d.id !== 'dept-all').length;
    const departmentsCount = isAllDepts
      ? (openDepts.size > 0 ? openDepts.size : totalCompanyDepartments)
      : 1;

    const departmentsLabel = isAllDepts
      ? `Across ${departmentsCount} ${departmentsCount === 1 ? 'department' : 'departments'}`
      : `In ${deptName}`;

    // Candidates in scope
    const targetCandidates = isAllDepts
      ? candidates
      : candidates.filter(c => c.departmentId === departmentFilter);

    // All active candidates in the pipeline (excluding rejected)
    const activeCandidatesCount = targetCandidates.filter(c => c.status !== 'REJECTED').length;

    const newCandidatesCount = targetCandidates.filter(c => c.status === 'NEW' || c.status === 'APPLIED').length;
    const screeningCandidatesCount = targetCandidates.filter(c => c.status === 'SCREENING').length;
    const interviewingCandidatesCount = targetCandidates.filter(c => c.status === 'INTERVIEWING').length;

    // Candidate IDs for filtering related interviews, evaluations, and offers
    const deptCandIds = new Set(targetCandidates.map(c => c.id));

    // Interviews in scope
    const targetInterviews = isAllDepts
      ? interviews
      : interviews.filter(i => deptCandIds.has(i.candidateId));
    const scheduledInterviewsCount = targetInterviews.filter(i => i.status === 'SCHEDULED').length;

    // Evaluations in scope
    const targetEvaluations = isAllDepts
      ? evaluations
      : evaluations.filter(e => deptCandIds.has(e.candidateId));
    const evaluationsCount = targetEvaluations.length;

    // Offers in scope
    const targetOffers = isAllDepts
      ? offers
      : offers.filter(o => o.departmentId === departmentFilter || deptCandIds.has(o.candidateId));
    const acceptedOffersCount = targetOffers.filter(o => o.status === 'ACCEPTED').length;
    const outstandingOffersCount = targetOffers.filter(o => o.status === 'ISSUED').length;

    return {
      stats: {
        openPositions: openPositionsCount,
        activeCandidates: activeCandidatesCount,
        scheduledInterviews: scheduledInterviewsCount,
        acceptedOffers: acceptedOffersCount,
      },
      departmentsCount,
      departmentsLabel,
      newCandidatesCount,
      screeningCandidatesCount,
      interviewingCandidatesCount,
      evaluationsCount,
      outstandingOffersCount,
    };
  }, [requisitions, postings, candidates, interviews, evaluations, offers, departmentFilter]);

  // Filtered Candidates
  const filteredCandidates = useMemo(() => {
    return candidates.filter(c => {
      const matchesSearch =
        c.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.appliedRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.currentCompany && c.currentCompany.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesDept = departmentFilter === 'dept-all' || c.departmentId === departmentFilter;
      const matchesStatus = statusFilter === 'ALL' || c.status === statusFilter;

      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [candidates, searchQuery, departmentFilter, statusFilter]);

  // Stage Candidates for ATS Pipeline (Applied → Screening → Interview → Offer)
  const stageCandidates = useMemo(() => {
    return {
      APPLIED: filteredCandidates.filter(c => c.status === 'NEW' || c.status === 'APPLIED'),
      SCREENING: filteredCandidates.filter(c => c.status === 'SCREENING'),
      INTERVIEWING: filteredCandidates.filter(c => c.status === 'INTERVIEWING'),
      OFFERED: filteredCandidates.filter(c => c.status === 'OFFERED'),
    };
  }, [filteredCandidates]);

  // Requisition Action Handlers
  const handleApproveRequisition = async (id: string) => {
    await recruitmentMockApi.approveRequisition(id);
    setRequisitions(prev =>
      prev.map(req => {
        if (req.id === id) {
          return {
            ...req,
            status: 'OPEN' as RequisitionStatus,
            approvedBy: 'Priya Sharma (HR Director)',
            updatedAt: new Date().toISOString(),
          };
        }
        return req;
      })
    );
    showToast(`Requisition approved and opened for active recruitment.`);
  };

  const handleRejectRequisition = async (id: string) => {
    await recruitmentMockApi.rejectRequisition(id);
    setRequisitions(prev =>
      prev.map(req => {
        if (req.id === id) {
          return {
            ...req,
            status: 'REJECTED' as RequisitionStatus,
            updatedAt: new Date().toISOString(),
          };
        }
        return req;
      })
    );
    showToast(`Requisition marked as rejected.`);
  };

  const handleSubmitForApproval = async (id: string) => {
    const target = requisitions.find(r => r.id === id);
    await recruitmentMockApi.submitForApproval(id);
    setRequisitions(prev =>
      prev.map(r => (r.id === id ? { ...r, status: 'PENDING_APPROVAL' as RequisitionStatus } : r))
    );
    showToast(`Requisition ${target?.requisitionCode || id} submitted for approval.`);
  };

  // Toggle Job Posting Publish State
  const handleTogglePublishPosting = async (id: string) => {
    try {
      const res = await recruitmentMockApi.togglePublishPosting(id);
      setPostings(prev => prev.map(p => (p.id === id ? res.data : p)));
      showToast(`Job posting status updated to ${res.data.status}.`);
    } catch {
      setPostings(prev =>
        prev.map(post => {
          if (post.id === id) {
            const nextStatus = post.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
            return {
              ...post,
              status: nextStatus,
              publishedDate: nextStatus === 'PUBLISHED' ? new Date().toISOString().split('T')[0] : post.publishedDate,
            };
          }
          return post;
        })
      );
      showToast(`Job posting status updated.`);
    }
  };

  // Process Candidate Application: Changes status from NEW to APPLIED
  const handleProcessApplication = async (candidateId: string) => {
    try {
      const res = await recruitmentMockApi.processCandidateApplication(candidateId);
      setCandidates(prev => prev.map(c => (c.id === candidateId ? res.data : c)));
      if (selectedCandidateForResume?.id === candidateId) {
        setSelectedCandidateForResume(res.data);
      }
      showToast(`Application processed! Candidate ${res.data.firstName} ${res.data.lastName} moved from New to Applied.`);
    } catch {
      handleMoveCandidateStage(candidateId, 'APPLIED');
    }
  };

  // Candidate Stage Transition
  const handleMoveCandidateStage = async (candidateId: string, nextStage: CandidateStatus) => {
    try {
      await recruitmentMockApi.updateCandidateStage(candidateId, nextStage);
    } catch {
      // ignore
    }
    setCandidates(prev =>
      prev.map(cand => {
        if (cand.id === candidateId) {
          return {
            ...cand,
            status: nextStage,
            updatedAt: new Date().toISOString(),
          };
        }
        return cand;
      })
    );
    if (selectedCandidateForResume?.id === candidateId) {
      setSelectedCandidateForResume(prev => (prev ? { ...prev, status: nextStage } : null));
    }

    // When candidate is marked as HIRED, immediately onboard into all HRMS modules
    if (nextStage === 'HIRED') {
      try {
        const cand = candidates.find(c => c.id === candidateId);
        const newEmp = universalHrmsStore.onboardCandidate(candidateId, undefined, cand);
        registerEmployeeInService(newEmp);
        showToast(`🎉 Candidate successfully hired! ${(newEmp as any).name || `${newEmp.firstName} ${newEmp.lastName}`} (${newEmp.employeeCode}) is active in Employee Management and all pages.`);
        return;
      } catch (e) {
        console.error('Onboard candidate error:', e);
      }
    }

    showToast(`Candidate stage updated to ${nextStage}.`);
  };

  // Create Requisition Submit
  const handleCreateRequisitionSubmit = async (newReq: JobRequisition) => {
    try {
      const res = await recruitmentMockApi.createJobRequisition(newReq);
      setRequisitions(prev => [res.data, ...prev]);
      const postRes = await recruitmentMockApi.getJobPostings();
      setPostings(postRes.data);
      universalHrmsStore.requisitions = [res.data, ...universalHrmsStore.requisitions];
      universalHrmsStore.postings = postRes.data;
      universalHrmsStore.saveToStorage();
      universalHrmsStore.notify();
      showToast(`Job opening ${res.data.requisitionCode} created and published.`);
    } catch {
      setRequisitions(prev => [newReq, ...prev]);
      showToast(`Job opening ${newReq.requisitionCode} created.`);
    }
  };

  // Apply Now Submit: Handles application with Name & Resume
  const handleApplySubmit = async (data: {
    jobPostingId: string;
    name: string;
    resumeFileName: string;
    resumeSummary: MockCandidateResumeSummary;
  }) => {
    try {
      const res = await recruitmentMockApi.applyForJob(data);
      setCandidates(prev => [res.data, ...prev]);
      universalHrmsStore.addCandidate(res.data);
      showToast(`🎉 Application received for ${data.name}! Added to ATS under NEW stage.`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error submitting application.';
      showToast(message);
    }
  };

  // Go to Onboarding: Converts Candidate Offer to Employee in Universal Store & navigates to Employee 360° Profile
  const handleGoToOnboarding = async (offer: OfferLetter) => {
    try {
      await recruitmentMockApi.acceptOfferLetter(offer.id);
    } catch {
      // ignore
    }

    const updatedOffer: OfferLetter = {
      ...offer,
      status: 'ACCEPTED',
      acceptedAt: offer.acceptedAt || new Date().toISOString(),
    };

    setOffers(prev =>
      prev.map(off => (off.id === offer.id ? updatedOffer : off))
    );

    setCandidates(prev =>
      prev.map(c => (c.id === offer.candidateId ? { ...c, status: 'HIRED', updatedAt: new Date().toISOString() } : c))
    );

    try {
      const newEmp = universalHrmsStore.convertCandidateOfferToEmployee(offer.id, updatedOffer);
      registerEmployeeInService(newEmp);
      showToast(`🎉 Candidate ${(newEmp as any).name || `${newEmp.firstName} ${newEmp.lastName}`} successfully onboarded as ${newEmp.employeeCode}! Opening Employee Directory...`);
      setTimeout(() => {
        navigate(`/hrms/employees?empId=${newEmp.id}`);
      }, 500);
    } catch (err) {
      console.error('Onboarding conversion error:', err);
      showToast(`Candidate ${offer.candidateName} has been sent to Onboarding.`);
      navigate('/hrms/employees');
    }
  };

  // Schedule Interview Submit
  const handleScheduleInterviewSubmit = async (newInt: MockRecruitmentInterview) => {
    try {
      await recruitmentMockApi.scheduleInterview(newInt);
    } catch {
      // ignore
    }
    setInterviews(prev => [newInt, ...prev]);
    handleMoveCandidateStage(newInt.candidateId, 'INTERVIEWING');
    showToast(`Interview round scheduled for ${newInt.candidateName}.`);
  };

  // Scorecard Evaluator Submit
  const handleScorecardSubmit = async (
    interviewId: string,
    _candidateId: string,
    evalRecord: CandidateEvaluation,
    avgRating: number,
    notes: string
  ) => {
    try {
      await recruitmentMockApi.submitEvaluation(evalRecord);
    } catch {
      // ignore
    }
    setEvaluations(prev => [evalRecord, ...prev]);
    setInterviews(prev =>
      prev.map(i => {
        if (i.id === interviewId) {
          return {
            ...i,
            status: 'COMPLETED' as InterviewStatus,
            rating: avgRating,
            feedbackSummary: notes,
          };
        }
        return i;
      })
    );
    showToast(`Interview scorecard evaluated with recommendation: ${evalRecord.overallRecommendation.replace('_', ' ')}.`);
  };

  // Create Offer Letter Submit
  const handleCreateOfferSubmit = async (newOffer: OfferLetter) => {
    try {
      await recruitmentMockApi.issueOfferLetter(newOffer);
    } catch {
      // ignore
    }
    universalHrmsStore.addOffer(newOffer);
    setOffers(prev => [newOffer, ...prev]);
    handleMoveCandidateStage(newOffer.candidateId, 'OFFERED');
    showToast(`Offer letter issued to ${newOffer.candidateName}.`);
  };

  // Simulate Candidate Offer Acceptance
  const handleAcceptOffer = async (offerId: string) => {
    const offer = offers.find(o => o.id === offerId);
    try {
      await recruitmentMockApi.acceptOfferLetter(offerId);
    } catch {
      // ignore
    }

    const acceptedAt = new Date().toISOString();
    setOffers(prev =>
      prev.map(off => {
        if (off.id === offerId) {
          return {
            ...off,
            status: 'ACCEPTED' as OfferStatus,
            acceptedAt,
          };
        }
        return off;
      })
    );

    if (offer) {
      const acceptedOffer: OfferLetter = { ...offer, status: 'ACCEPTED', acceptedAt };
      handleMoveCandidateStage(offer.candidateId, 'HIRED');
      try {
        const newEmp = universalHrmsStore.convertCandidateOfferToEmployee(offerId, acceptedOffer);
        registerEmployeeInService(newEmp);
        showToast(`🎉 Offer accepted! ${(newEmp as any).name || `${newEmp.firstName} ${newEmp.lastName}`} (${newEmp.employeeCode}) is officially hired and active across all HRMS modules!`);
        return;
      } catch (e) {
        console.error('Convert offer error:', e);
      }
    }
    showToast(`🎉 Offer accepted by candidate! Ready for Onboarding.`);
  };

  if (isLoading) {
    return <LoadingState message="Loading Recruitment & ATS module..." size="lg" />;
  }

  if (hasError) {
    return (
      <ErrorState
        title="Recruitment Data Stream Offline"
        message="Unable to communicate with the HRMS talent acquisition service layer."
        onRetry={async () => {
          setHasError(false);
          setIsLoading(true);
          try {
            const [reqRes, postRes, candRes, intRes, evalRes, offRes] = await Promise.all([
              recruitmentMockApi.getJobRequisitions(),
              recruitmentMockApi.getJobPostings(),
              recruitmentMockApi.getCandidates(),
              recruitmentMockApi.getInterviews(),
              recruitmentMockApi.getEvaluations(),
              recruitmentMockApi.getOfferLetters(),
            ]);
            setRequisitions(reqRes.data);
            setPostings(postRes.data);
            setCandidates(candRes.data);
            setInterviews(intRes.data);
            setEvaluations(evalRes.data);
            setOffers(offRes.data);
            setIsLoading(false);
          } catch {
            setHasError(true);
            setIsLoading(false);
          }
        }}
      />
    );
  }

  return (
    <div style={{ paddingBottom: '60px' }}>
      <HrmsSubNav />
      {/* Toast Alert */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            right: '24px',
            zIndex: 9999,
            backgroundColor: 'var(--bg-elevated)',
            border: '1px solid var(--team-c-border)',
            borderRadius: 'var(--radius-md)',
            padding: '12px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
            color: 'var(--text-primary)',
            fontSize: '13.5px',
          }}
        >
          <Sparkles size={18} style={{ color: 'var(--team-c-accent)' }} />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            style={{ color: 'var(--text-muted)', marginLeft: '6px', cursor: 'pointer', background: 'none', border: 'none' }}
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* Primary Page Header */}
      <PageHeader
        title="Recruitment & Talent Acquisition"
        description="Manage the complete hiring process, from creating job openings and public postings to tracking applicants, scheduling interview rounds, evaluating scorecards, and onboarding new employees."
        actions={
          <div style={{ display: 'flex', gap: '10px' }}>
            <Button
              variant="team-c"
              size="sm"
              icon={<Plus size={16} />}
              onClick={() => setShowCreateRequisitionModal(true)}
            >
              New Job Requisition
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon={<Calendar size={16} />}
              onClick={() => {
                setScheduleModalCandidateId('');
                setShowScheduleInterviewModal(true);
              }}
            >
              Schedule Interview
            </Button>
          </div>
        }
      />

      {/* KPI Summary Cards */}
      <RecruitmentKpiCards
        stats={kpiData.stats}
        departmentsCount={kpiData.departmentsCount}
        departmentsLabel={kpiData.departmentsLabel}
        newCandidatesCount={kpiData.newCandidatesCount}
        screeningCandidatesCount={kpiData.screeningCandidatesCount}
        interviewingCandidatesCount={kpiData.interviewingCandidatesCount}
        evaluationsCount={kpiData.evaluationsCount}
        outstandingOffersCount={kpiData.outstandingOffersCount}
        onCardClick={tab => setActiveTab(tab)}
      />

      {/* Module Navigation Tabs: Order is Job Postings FIRST, followed by ATS, Interviews, Offer & Insurance */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          borderBottom: '1px solid var(--border-subtle)',
          marginBottom: '20px',
        }}
      >
        {/* TAB 1: REQUISITIONS & JOB POSTINGS (Comes First) */}
        <button
          onClick={() => setActiveTab('requisitions')}
          style={{
            padding: '10px 18px',
            fontSize: '14px',
            fontWeight: 600,
            color: activeTab === 'requisitions' ? 'var(--team-c-accent)' : 'var(--text-secondary)',
            borderBottom: activeTab === 'requisitions' ? '2px solid var(--team-c-accent)' : '2px solid transparent',
            background: 'none',
            borderTop: 'none',
            borderLeft: 'none',
            borderRight: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <Briefcase size={16} />
          Job Postings & Requisitions
          <span
            style={{
              padding: '1px 6px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--bg-elevated)',
              fontSize: '11px',
            }}
          >
            {postings.length}
          </span>
        </button>

        {/* TAB 2: APPLICANT PIPELINE (ATS) (Comes Next) */}
        <button
          onClick={() => setActiveTab('pipeline')}
          style={{
            padding: '10px 18px',
            fontSize: '14px',
            fontWeight: 600,
            color: activeTab === 'pipeline' ? 'var(--team-c-accent)' : 'var(--text-secondary)',
            borderBottom: activeTab === 'pipeline' ? '2px solid var(--team-c-accent)' : '2px solid transparent',
            background: 'none',
            borderTop: 'none',
            borderLeft: 'none',
            borderRight: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <Users size={16} />
          Applicant Pipeline (ATS)
          <span
            style={{
              padding: '1px 6px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--bg-elevated)',
              fontSize: '11px',
            }}
          >
            {candidates.length}
          </span>
        </button>

        {/* TAB 3: INTERVIEWS & SCORECARDS */}
        <button
          onClick={() => setActiveTab('interviews')}
          style={{
            padding: '10px 18px',
            fontSize: '14px',
            fontWeight: 600,
            color: activeTab === 'interviews' ? 'var(--team-c-accent)' : 'var(--text-secondary)',
            borderBottom: activeTab === 'interviews' ? '2px solid var(--team-c-accent)' : '2px solid transparent',
            background: 'none',
            borderTop: 'none',
            borderLeft: 'none',
            borderRight: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <Calendar size={16} />
          Interviews & Scorecards
          <span
            style={{
              padding: '1px 6px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--bg-elevated)',
              fontSize: '11px',
            }}
          >
            {interviews.length}
          </span>
        </button>

        {/* TAB 4: OFFER LETTERS & INSURANCE */}
        <button
          onClick={() => setActiveTab('offers')}
          style={{
            padding: '10px 18px',
            fontSize: '14px',
            fontWeight: 600,
            color: activeTab === 'offers' ? 'var(--team-c-accent)' : 'var(--text-secondary)',
            borderBottom: activeTab === 'offers' ? '2px solid var(--team-c-accent)' : '2px solid transparent',
            background: 'none',
            borderTop: 'none',
            borderLeft: 'none',
            borderRight: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <FileText size={16} />
          Offer & Insurance
          <span
            style={{
              padding: '1px 6px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--bg-elevated)',
              fontSize: '11px',
            }}
          >
            {offers.length}
          </span>
        </button>
      </div>

      {/* TAB 1: JOB OPENINGS & REQUISITIONS + PUBLIC POSTING MANAGER (FIRST) */}
      {activeTab === 'requisitions' && (
        <JobRequisitionsView
          requisitions={requisitions}
          postings={postings}
          requisitionSubView={requisitionSubView}
          setRequisitionSubView={setRequisitionSubView}
          onCreateRequisitionClick={() => setShowCreateRequisitionModal(true)}
          onApplyPosting={post => setSelectedPostingForApply(post)}
          onApproveRequisition={handleApproveRequisition}
          onRejectRequisition={handleRejectRequisition}
          onSubmitForApproval={handleSubmitForApproval}
          onTogglePublishPosting={handleTogglePublishPosting}
          onPreviewPosting={post => setSelectedPostingForPreview(post)}
        />
      )}

      {/* TAB 2: APPLICANT TRACKING PIPELINE (ATS KANBAN) (SECOND) */}
      {activeTab === 'pipeline' && (
        <ApplicantPipelineView
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          departmentFilter={departmentFilter}
          setDepartmentFilter={setDepartmentFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          filteredCandidates={filteredCandidates}
          stageCandidates={stageCandidates}
          onReviewCandidate={cand => setSelectedCandidateForResume(cand)}
          onMoveCandidateStage={handleMoveCandidateStage}
          onProcessApplication={handleProcessApplication}
          onScheduleInterview={cand => {
            setScheduleModalCandidateId(cand.id);
            setShowScheduleInterviewModal(true);
          }}
          onGenerateOffer={cand => setShowCreateOfferModal(cand)}
        />
      )}

      {/* TAB 3: INTERVIEW SCHEDULING & SCORECARDS EVALUATOR */}
      {activeTab === 'interviews' && (
        <InterviewsView
          interviews={interviews}
          evaluations={evaluations}
          onScheduleInterviewClick={() => {
            setScheduleModalCandidateId('');
            setShowScheduleInterviewModal(true);
          }}
          onOpenScorecard={(int, evaluation) => {
            setSelectedInterviewForScorecard(int);
            setExistingEvaluationForScorecard(evaluation);
          }}
        />
      )}

      {/* TAB 4: OFFER LETTER ISSUANCE & ONBOARDING */}
      {activeTab === 'offers' && (
        <OfferLettersView
          offers={offers}
          onPreviewOfferLetterhead={off => setSelectedOfferForPreview(off)}
          onAcceptOffer={handleAcceptOffer}
          onGoToOnboarding={handleGoToOnboarding}
        />
      )}

      {/* MODAL 1: RESUME REVIEW & APPLICANT DETAILS MODAL */}
      <ResumeReviewModal
        candidate={selectedCandidateForResume}
        onClose={() => setSelectedCandidateForResume(null)}
        onMoveCandidateStage={handleMoveCandidateStage}
        onScheduleInterview={cand => {
          setScheduleModalCandidateId(cand.id);
          setShowScheduleInterviewModal(true);
        }}
        onGenerateOffer={cand => setShowCreateOfferModal(cand)}
      />

      {/* MODAL 2: CREATE DEPARTMENT REQUISITION MODAL */}
      <CreateRequisitionModal
        isOpen={showCreateRequisitionModal}
        onClose={() => setShowCreateRequisitionModal(false)}
        onSubmitRequisition={handleCreateRequisitionSubmit}
      />

      {/* MODAL 3: SCHEDULE INTERVIEW MODAL */}
      <ScheduleInterviewModal
        isOpen={showScheduleInterviewModal}
        candidates={candidates}
        initialCandidateId={scheduleModalCandidateId}
        onClose={() => {
          setShowScheduleInterviewModal(false);
          setScheduleModalCandidateId('');
        }}
        onSubmitSchedule={handleScheduleInterviewSubmit}
      />

      {/* MODAL 4: INTERVIEW SCORECARD EVALUATOR MODAL */}
      <ScorecardEvaluatorModal
        interview={selectedInterviewForScorecard}
        existingEvaluation={existingEvaluationForScorecard}
        onClose={() => {
          setSelectedInterviewForScorecard(null);
          setExistingEvaluationForScorecard(undefined);
        }}
        onSubmitScorecard={handleScorecardSubmit}
      />

      {/* MODAL 5: CREATE OFFER LETTER MODAL */}
      <CreateOfferModal
        candidate={showCreateOfferModal}
        onClose={() => setShowCreateOfferModal(null)}
        onSubmitOffer={handleCreateOfferSubmit}
      />

      {/* MODAL 6: OFFICIAL OFFER LETTERHEAD PREVIEW MODAL */}
      <OfferPreviewModal
        offer={selectedOfferForPreview}
        onClose={() => setSelectedOfferForPreview(null)}
      />

      {/* MODAL 7: PUBLIC JOB POSTING PREVIEW MODAL */}
      <JobPostingPreviewModal
        posting={selectedPostingForPreview}
        onClose={() => setSelectedPostingForPreview(null)}
      />

      {/* MODAL 8: APPLY NOW APPLICATION MODAL (NAME & RESUME ONLY) */}
      <ApplyJobModal
        posting={selectedPostingForApply}
        isOpen={Boolean(selectedPostingForApply)}
        onClose={() => setSelectedPostingForApply(null)}
        onSubmitApplication={handleApplySubmit}
      />
    </div>
  );
};
