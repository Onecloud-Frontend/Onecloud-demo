import React from 'react';
import { Badge, Button, Card } from '@shared/components';
import { Building, Check, Eye, Plus, Send, Users } from 'lucide-react';
import { formatCurrency } from '@shared/utils/formatters';
import { RequisitionStatusBadge, ApprovalStep } from './RecruitmentBadges';
import { RECRUITMENT_DEPARTMENTS } from '@mock/hrms/commonHrmsMockApi';
import type { JobRequisition, JobPosting } from '@features/hrms/types';

export interface JobRequisitionsViewProps {
  requisitions: JobRequisition[];
  postings: JobPosting[];
  requisitionSubView: 'requisitions' | 'postings';
  setRequisitionSubView: (view: 'requisitions' | 'postings') => void;
  onCreateRequisitionClick: () => void;
  onApplyPosting: (posting: JobPosting) => void;
  onApproveRequisition: (requisitionId: string) => void;
  onRejectRequisition: (requisitionId: string) => void;
  onSubmitForApproval: (requisitionId: string) => void;
  onTogglePublishPosting: (postingId: string) => void;
  onPreviewPosting: (posting: JobPosting) => void;
}

export const JobRequisitionsView: React.FC<JobRequisitionsViewProps> = ({
  requisitions,
  postings,
  requisitionSubView,
  setRequisitionSubView,
  onCreateRequisitionClick,
  onApplyPosting,
  onApproveRequisition,
  onRejectRequisition,
  onSubmitForApproval,
  onTogglePublishPosting,
  onPreviewPosting,
}) => {
  return (
    <div>
      {/* Sub-view switcher & Top Action Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '20px',
        }}
      >
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            variant={requisitionSubView === 'postings' ? 'team-c' : 'outline'}
            size="sm"
            onClick={() => setRequisitionSubView('postings')}
          >
            Public Job Postings ({postings.length})
          </Button>
          <Button
            variant={requisitionSubView === 'requisitions' ? 'team-c' : 'outline'}
            size="sm"
            onClick={() => setRequisitionSubView('requisitions')}
          >
            Departmental Requisitions ({requisitions.length})
          </Button>
        </div>

        {/* Create option: Available across both subviews */}
        <Button
          variant="primary"
          size="sm"
          icon={<Plus size={15} />}
          onClick={onCreateRequisitionClick}
        >
          Create New Job / Requisition
        </Button>
      </div>

      {requisitionSubView === 'postings' ? (
        /* Public Job Postings List with prominent Apply Now buttons */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '16px' }}>
          {postings.map(post => {
            const linkedReq = requisitions.find(r => r.id === post.requisitionId);
            const deptName = linkedReq
              ? RECRUITMENT_DEPARTMENTS.find(d => d.id === linkedReq.departmentId)?.name
              : 'Engineering';

            return (
              <Card
                key={post.id}
                accent={post.status === 'PUBLISHED' ? 'team-c' : 'none'}
                footer={
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                      flexWrap: 'wrap',
                      gap: '8px',
                    }}
                  >
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      {post.publishedDate ? `Published: ${post.publishedDate}` : 'Unpublished draft'}
                    </span>

                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Eye size={14} />}
                        onClick={() => onPreviewPosting(post)}
                      >
                        Preview
                      </Button>

                      <Button
                        variant={post.status === 'PUBLISHED' ? 'outline' : 'secondary'}
                        size="sm"
                        onClick={() => onTogglePublishPosting(post.id)}
                      >
                        {post.status === 'PUBLISHED' ? 'Unpublish' : 'Publish'}
                      </Button>

                      {/* Apply Now Button: Triggers Application Form with Name & Resume */}
                      <Button
                        variant="primary"
                        size="sm"
                        icon={<Send size={13} />}
                        onClick={() => onApplyPosting(post)}
                      >
                        Apply Now
                      </Button>
                    </div>
                  </div>
                }
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <div>
                    <h4 style={{ fontSize: '16.5px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {post.postingTitle}
                    </h4>
                    <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: '2px', display: 'flex', gap: '10px' }}>
                      <span>📍 {post.location}</span>
                      {deptName && <span>🏢 {deptName}</span>}
                    </div>
                  </div>
                  <Badge variant={post.status === 'PUBLISHED' ? 'success' : 'neutral'} size="sm">
                    {post.status}
                  </Badge>
                </div>

                {linkedReq && (
                  <div
                    style={{
                      display: 'flex',
                      gap: '12px',
                      fontSize: '12px',
                      color: 'var(--text-muted)',
                      marginBottom: '10px',
                    }}
                  >
                    <span>Experience: <strong style={{ color: 'var(--text-secondary)' }}>{linkedReq.experienceRequired}</strong></span>
                    <span>Positions: <strong style={{ color: 'var(--text-secondary)' }}>{linkedReq.positionsCount}</strong></span>
                    <span>Budget: <strong style={{ color: 'var(--status-success)' }}>{formatCurrency(linkedReq.budgetMax)}</strong></span>
                  </div>
                )}

                <p
                  style={{
                    fontSize: '13px',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.5,
                    marginBottom: '12px',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {post.jobDescription}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {post.requirements.slice(0, 3).map((req, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '11px',
                        padding: '3px 8px',
                        backgroundColor: 'var(--bg-elevated)',
                        borderRadius: 'var(--radius-sm)',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      ✓ {req}
                    </span>
                  ))}
                  {post.requirements.length > 3 && (
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', alignSelf: 'center' }}>
                      +{post.requirements.length - 3} more
                    </span>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        /* Requisitions View & Approval Workflow */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {requisitions.map(req => {
            const isPending = req.status === 'PENDING_APPROVAL';
            const isOpen = req.status === 'OPEN';
            const isApproved = req.status === 'APPROVED';

            return (
              <Card
                key={req.id}
                accent={isPending ? 'team-c' : isOpen || isApproved ? 'team-a' : 'none'}
                footer={
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                      flexWrap: 'wrap',
                      gap: '12px',
                    }}
                  >
                    <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: 'var(--text-muted)' }}>
                      <span>
                        Requested by: <strong style={{ color: 'var(--text-secondary)' }}>{req.requestedBy}</strong>
                      </span>
                      {req.approvedBy && (
                        <span>
                          Approved by: <strong style={{ color: 'var(--status-success)' }}>{req.approvedBy}</strong>
                        </span>
                      )}
                      <span>
                        Target Date: <strong style={{ color: 'var(--text-secondary)' }}>{req.targetHiringDate}</strong>
                      </span>
                    </div>

                    {/* Approval Action Buttons */}
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {isPending && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            style={{ borderColor: 'var(--status-danger)', color: 'var(--status-danger)' }}
                            onClick={() => onRejectRequisition(req.id)}
                          >
                            Reject
                          </Button>
                          <Button
                            variant="primary"
                            size="sm"
                            icon={<Check size={14} />}
                            onClick={() => onApproveRequisition(req.id)}
                          >
                            Approve Requisition
                          </Button>
                        </>
                      )}

                      {isOpen && (
                        <Badge variant="success" size="sm">
                          Active in Recruitment
                        </Badge>
                      )}

                      {req.status === 'DRAFT' && (
                        <Button
                          variant="outline"
                          size="sm"
                          icon={<Send size={14} />}
                          onClick={() => onSubmitForApproval(req.id)}
                        >
                          Submit for Approval
                        </Button>
                      )}
                    </div>
                  </div>
                }
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span
                        style={{
                          fontSize: '12px',
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--team-c-accent)',
                          fontWeight: 600,
                        }}
                      >
                        {req.requisitionCode}
                      </span>
                      <h4 style={{ fontSize: '17px', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {req.title}
                      </h4>
                      <RequisitionStatusBadge status={req.status} />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        gap: '16px',
                        marginTop: '8px',
                        fontSize: '13px',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Building size={14} />
                        {RECRUITMENT_DEPARTMENTS.find(d => d.id === req.departmentId)?.name || 'General'}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Users size={14} />
                        {req.positionsCount} {req.positionsCount > 1 ? 'Positions' : 'Position'}
                      </span>
                      <span>Experience: {req.experienceRequired}</span>
                      <span>Budget CTC: {formatCurrency(req.budgetMax)}</span>
                      <span>Type: {req.employmentType}</span>
                    </div>
                  </div>
                </div>

                {/* Department Approval Progress Stepper */}
                <div
                  style={{
                    marginTop: '16px',
                    padding: '12px',
                    backgroundColor: 'var(--bg-elevated)',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <ApprovalStep
                    number="1"
                    label="Requested"
                    sublabel="Dept Hiring Manager"
                    isCompleted={true}
                    isActive={false}
                  />
                  <div style={{ flex: 1, height: '2px', backgroundColor: 'var(--status-success)', margin: '0 8px' }} />
                  <ApprovalStep
                    number="2"
                    label="Review"
                    sublabel="Head of Department"
                    isCompleted={req.status !== 'DRAFT'}
                    isActive={req.status === 'PENDING_APPROVAL'}
                  />
                  <div
                    style={{
                      flex: 1,
                      height: '2px',
                      backgroundColor:
                        req.status === 'APPROVED' || req.status === 'OPEN'
                          ? 'var(--status-success)'
                          : 'var(--border-subtle)',
                      margin: '0 8px',
                    }}
                  />
                  <ApprovalStep
                    number="3"
                    label="HR Approval"
                    sublabel="HR Director"
                    isCompleted={req.status === 'APPROVED' || req.status === 'OPEN'}
                    isActive={req.status === 'PENDING_APPROVAL'}
                  />
                  <div
                    style={{
                      flex: 1,
                      height: '2px',
                      backgroundColor: req.status === 'OPEN' ? 'var(--status-success)' : 'var(--border-subtle)',
                      margin: '0 8px',
                    }}
                  />
                  <ApprovalStep
                    number="4"
                    label="Published"
                    sublabel="Careers Portal"
                    isCompleted={req.status === 'OPEN'}
                    isActive={req.status === 'APPROVED'}
                  />
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
