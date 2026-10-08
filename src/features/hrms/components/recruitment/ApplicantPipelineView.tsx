import React from 'react';
import { Badge, Button, EmptyState, Input } from '@shared/components';
import { Search, Filter, RotateCcw } from 'lucide-react';
import { CandidatePipelineCard } from './CandidatePipelineCard';
import { RECRUITMENT_DEPARTMENTS } from '@mock/hrms/commonHrmsMockApi';
import type { MockRecruitmentCandidate } from '@mock/hrms/commonHrmsMockApi';
import type { CandidateStatus } from '@features/hrms/types';

export interface ApplicantPipelineViewProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  departmentFilter: string;
  setDepartmentFilter: (deptId: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  filteredCandidates: MockRecruitmentCandidate[];
  stageCandidates: {
    APPLIED: MockRecruitmentCandidate[];
    SCREENING: MockRecruitmentCandidate[];
    INTERVIEWING: MockRecruitmentCandidate[];
    OFFERED: MockRecruitmentCandidate[];
  };
  onReviewCandidate: (candidate: MockRecruitmentCandidate) => void;
  onMoveCandidateStage: (candidateId: string, nextStage: CandidateStatus) => void;
  onProcessApplication: (candidateId: string) => void;
  onScheduleInterview: (candidate: MockRecruitmentCandidate) => void;
  onGenerateOffer: (candidate: MockRecruitmentCandidate) => void;
}

export const ApplicantPipelineView: React.FC<ApplicantPipelineViewProps> = ({
  searchQuery,
  setSearchQuery,
  departmentFilter,
  setDepartmentFilter,
  statusFilter,
  setStatusFilter,
  filteredCandidates,
  stageCandidates,
  onReviewCandidate,
  onMoveCandidateStage,
  onProcessApplication,
  onScheduleInterview,
  onGenerateOffer,
}) => {
  const hasActiveFilters = searchQuery !== '' || departmentFilter !== 'dept-all' || statusFilter !== 'ALL';

  const resetFilters = () => {
    setSearchQuery('');
    setDepartmentFilter('dept-all');
    setStatusFilter('ALL');
  };

  const newApplicantsCount = stageCandidates.APPLIED.filter(c => c.status === 'NEW').length;

  return (
    <div>
      {/* Global Filter Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
          flexWrap: 'wrap',
          marginBottom: '22px',
          padding: '14px',
          backgroundColor: 'var(--bg-card)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '280px' }}>
          <Input
            placeholder="Search candidate name, role, company, or email..."
            iconPrefix={<Search size={16} />}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Filter size={15} style={{ color: 'var(--text-muted)' }} />
            <select
              value={departmentFilter}
              onChange={e => setDepartmentFilter(e.target.value)}
              style={{
                backgroundColor: 'var(--bg-input)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '8px 12px',
                fontSize: '13px',
                outline: 'none',
              }}
            >
              {RECRUITMENT_DEPARTMENTS.map(dept => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            style={{
              backgroundColor: 'var(--bg-input)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '8px 12px',
              fontSize: '13px',
              outline: 'none',
            }}
          >
            <option value="ALL">All Statuses</option>
            <option value="NEW">New Applications</option>
            <option value="APPLIED">Applied</option>
            <option value="SCREENING">Screening</option>
            <option value="INTERVIEWING">Interview</option>
            <option value="OFFERED">Offer</option>
            <option value="HIRED">Hired / Onboarded</option>
            <option value="REJECTED">Rejected</option>
          </select>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              icon={<RotateCcw size={14} />}
              onClick={resetFilters}
            >
              Reset
            </Button>
          )}
        </div>
      </div>

      {/* ATS Pipeline Kanban Board: Applied → Screening → Interview → Offer */}
      {filteredCandidates.length === 0 ? (
        <EmptyState
          title="No Candidates Found"
          description="No applicant profiles match your search criteria or department filter."
          actionLabel="Clear Filters"
          onAction={resetFilters}
        />
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, minmax(280px, 1fr))',
            gap: '16px',
            overflowX: 'auto',
            paddingBottom: '16px',
          }}
        >
          {/* Column 1: APPLIED (Includes NEW incoming applications) */}
          <div
            style={{
              backgroundColor: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--brand-primary)',
                  }}
                />
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>APPLIED</h3>
              </div>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                {newApplicantsCount > 0 && (
                  <Badge variant="team-c" size="sm">
                    {newApplicantsCount} New
                  </Badge>
                )}
                <Badge variant="neutral" size="sm">
                  {stageCandidates.APPLIED.length}
                </Badge>
              </div>
            </div>

            {stageCandidates.APPLIED.length === 0 ? (
              <div
                style={{
                  padding: '24px 12px',
                  textAlign: 'center',
                  color: 'var(--text-muted)',
                  fontSize: '13px',
                  border: '1px dashed var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                No applicants in Applied stage
              </div>
            ) : (
              stageCandidates.APPLIED.map(cand => (
                <CandidatePipelineCard
                  key={cand.id}
                  candidate={cand}
                  onReview={() => onReviewCandidate(cand)}
                  onNextStage={() => onMoveCandidateStage(cand.id, 'SCREENING')}
                  nextStageLabel="Screen"
                  onReject={() => onMoveCandidateStage(cand.id, 'REJECTED')}
                  onProcessApplication={cand.status === 'NEW' ? () => onProcessApplication(cand.id) : undefined}
                />
              ))
            )}
          </div>

          {/* Column 2: SCREENING */}
          <div
            style={{
              backgroundColor: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--status-warning)',
                  }}
                />
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>SCREENING</h3>
              </div>
              <Badge variant="warning" size="sm">
                {stageCandidates.SCREENING.length}
              </Badge>
            </div>

            {stageCandidates.SCREENING.length === 0 ? (
              <div
                style={{
                  padding: '24px 12px',
                  textAlign: 'center',
                  color: 'var(--text-muted)',
                  fontSize: '13px',
                  border: '1px dashed var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                No candidates in screening
              </div>
            ) : (
              stageCandidates.SCREENING.map(cand => (
                <CandidatePipelineCard
                  key={cand.id}
                  candidate={cand}
                  onReview={() => onReviewCandidate(cand)}
                  onNextStage={() => onScheduleInterview(cand)}
                  nextStageLabel="Schedule Round"
                  onReject={() => onMoveCandidateStage(cand.id, 'REJECTED')}
                />
              ))
            )}
          </div>

          {/* Column 3: INTERVIEW */}
          <div
            style={{
              backgroundColor: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--team-c-accent)',
                  }}
                />
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>INTERVIEW</h3>
              </div>
              <Badge variant="team-c" size="sm">
                {stageCandidates.INTERVIEWING.length}
              </Badge>
            </div>

            {stageCandidates.INTERVIEWING.length === 0 ? (
              <div
                style={{
                  padding: '24px 12px',
                  textAlign: 'center',
                  color: 'var(--text-muted)',
                  fontSize: '13px',
                  border: '1px dashed var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                No active interviews
              </div>
            ) : (
              stageCandidates.INTERVIEWING.map(cand => (
                <CandidatePipelineCard
                  key={cand.id}
                  candidate={cand}
                  onReview={() => onReviewCandidate(cand)}
                  onNextStage={() => onGenerateOffer(cand)}
                  nextStageLabel="Generate Offer"
                  onReject={() => onMoveCandidateStage(cand.id, 'REJECTED')}
                />
              ))
            )}
          </div>

          {/* Column 4: OFFER */}
          <div
            style={{
              backgroundColor: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--status-success)',
                  }}
                />
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>OFFER</h3>
              </div>
              <Badge variant="success" size="sm">
                {stageCandidates.OFFERED.length}
              </Badge>
            </div>

            {stageCandidates.OFFERED.length === 0 ? (
              <div
                style={{
                  padding: '24px 12px',
                  textAlign: 'center',
                  color: 'var(--text-muted)',
                  fontSize: '13px',
                  border: '1px dashed var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                No pending offers
              </div>
            ) : (
              stageCandidates.OFFERED.map(cand => (
                <CandidatePipelineCard
                  key={cand.id}
                  candidate={cand}
                  onReview={() => onReviewCandidate(cand)}
                  onNextStage={() => onMoveCandidateStage(cand.id, 'HIRED')}
                  nextStageLabel="Accept & Hire"
                  onReject={() => onMoveCandidateStage(cand.id, 'REJECTED')}
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
