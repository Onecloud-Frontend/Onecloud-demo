import React from 'react';
import { Card } from '@shared/components';
import { Briefcase, Users, Clock, FileText } from 'lucide-react';

export interface RecruitmentKpiCardsProps {
  stats: {
    openPositions: number;
    activeCandidates: number;
    scheduledInterviews: number;
    acceptedOffers: number;
  };
  departmentsCount?: number;
  departmentsLabel?: string;
  newCandidatesCount: number;
  screeningCandidatesCount: number;
  interviewingCandidatesCount?: number;
  pipelineSubtitle?: string;
  evaluationsCount: number;
  outstandingOffersCount: number;
  onCardClick?: (tab: 'requisitions' | 'pipeline' | 'interviews' | 'offers') => void;
}

export const RecruitmentKpiCards: React.FC<RecruitmentKpiCardsProps> = ({
  stats,
  departmentsCount,
  departmentsLabel,
  newCandidatesCount,
  screeningCandidatesCount,
  interviewingCandidatesCount,
  pipelineSubtitle,
  evaluationsCount,
  outstandingOffersCount,
  onCardClick,
}) => {
  const deptDisplay =
    departmentsLabel ??
    `Across ${departmentsCount ?? 5} ${(departmentsCount ?? 5) === 1 ? 'department' : 'departments'}`;

  const pipelineDisplay =
    pipelineSubtitle ??
    (interviewingCandidatesCount !== undefined && interviewingCandidatesCount > 0
      ? `New (${newCandidatesCount}) • Screening (${screeningCandidatesCount}) • Interviewing (${interviewingCandidatesCount})`
      : `New (${newCandidatesCount}) • Screening (${screeningCandidatesCount})`);

  const scorecardDisplay = `${evaluationsCount} ${evaluationsCount === 1 ? 'Scorecard' : 'Scorecards'} completed`;
  const offerDisplay = `${outstandingOffersCount} Outstanding ${outstandingOffersCount === 1 ? 'decision' : 'decisions'}`;

  return (
    <div className="grid-cols-4" style={{ marginBottom: '24px' }}>
      <div
        onClick={() => onCardClick?.('requisitions')}
        style={{ cursor: onCardClick ? 'pointer' : 'default', height: '100%' }}
        title={onCardClick ? 'View Job Postings & Requisitions' : undefined}
      >
        <Card accent="team-c" style={{ height: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 500 }}>Active Openings</span>
            <Briefcase size={18} style={{ color: 'var(--team-c-accent)' }} />
          </div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)' }}>
            {stats.openPositions} Open
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            {deptDisplay}
          </div>
        </Card>
      </div>

      <div
        onClick={() => onCardClick?.('pipeline')}
        style={{ cursor: onCardClick ? 'pointer' : 'default', height: '100%' }}
        title={onCardClick ? 'View Applicant Pipeline (ATS)' : undefined}
      >
        <Card accent="team-c" style={{ height: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 500 }}>Candidate Pipeline</span>
            <Users size={18} style={{ color: 'var(--team-c-accent)' }} />
          </div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)' }}>
            {stats.activeCandidates} Active
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            {pipelineDisplay}
          </div>
        </Card>
      </div>

      <div
        onClick={() => onCardClick?.('interviews')}
        style={{ cursor: onCardClick ? 'pointer' : 'default', height: '100%' }}
        title={onCardClick ? 'View Interviews & Scorecards' : undefined}
      >
        <Card accent="team-c" style={{ height: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 500 }}>Scheduled Rounds</span>
            <Clock size={18} style={{ color: 'var(--team-c-accent)' }} />
          </div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)' }}>
            {stats.scheduledInterviews} Pending
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            {scorecardDisplay}
          </div>
        </Card>
      </div>

      <div
        onClick={() => onCardClick?.('offers')}
        style={{ cursor: onCardClick ? 'pointer' : 'default', height: '100%' }}
        title={onCardClick ? 'View Offer & Insurance' : undefined}
      >
        <Card accent="team-c" style={{ height: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 500 }}>Offer Letters</span>
            <FileText size={18} style={{ color: 'var(--team-c-accent)' }} />
          </div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--status-success)' }}>
            {stats.acceptedOffers} Accepted
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            {offerDisplay}
          </div>
        </Card>
      </div>
    </div>
  );
};
