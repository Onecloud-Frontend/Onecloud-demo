import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader, Card, Button } from '@shared/components';
import { Boxes, Briefcase, Users as UsersIcon, ArrowRight } from 'lucide-react';

export const OverviewPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <PageHeader
        breadcrumb="Enterprise Overview"
        title="Welcome to One Enterprise Cloud"
        description="Manage your enterprise modules from one place."
      />

      <div className="grid-cols-3" style={{ gap: '24px' }}>
        {/* ERP Card */}
        <Card
          title="ERP"
          subtitle="Enterprise Resource Planning"
          footer={
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/erp')}
              style={{ width: '100%', justifyContent: 'space-between' }}
            >
              <span>Open ERP</span>
              <ArrowRight size={15} />
            </Button>
          }
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', padding: '12px 0' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                color: 'var(--brand-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Boxes size={22} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                ERP Workspace
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.5 }}>
                Access enterprise resource planning and operations.
              </p>
            </div>
          </div>
        </Card>

        {/* CRM Card */}
        <Card
          title="CRM"
          subtitle="Customer Relationship Management"
          footer={
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/crm')}
              style={{ width: '100%', justifyContent: 'space-between' }}
            >
              <span>Open CRM</span>
              <ArrowRight size={15} />
            </Button>
          }
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', padding: '12px 0' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                color: 'var(--brand-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Briefcase size={22} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                CRM Workspace
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.5 }}>
                Access customer relationship management and customer accounts.
              </p>
            </div>
          </div>
        </Card>

        {/* HRMS Card */}
        <Card
          title="HRMS"
          subtitle="Human Resource Management System"
          footer={
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/hrms')}
              style={{ width: '100%', justifyContent: 'space-between' }}
            >
              <span>Open HRMS</span>
              <ArrowRight size={15} />
            </Button>
          }
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', padding: '12px 0' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                color: 'var(--brand-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <UsersIcon size={22} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                HRMS Workspace
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.5 }}>
                Access workforce directory and human resources.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
