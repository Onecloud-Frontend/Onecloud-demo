import React from 'react';
import { PageHeader, Card } from '@shared/components';
import { Boxes } from 'lucide-react';

export const ErpHomePage: React.FC = () => {
  return (
    <div>
      <PageHeader
        breadcrumb="Business Modules"
        title="ERP"
        description="Enterprise Resource Planning"
      />

      <Card title="ERP Workspace">
        <div
          style={{
            padding: '48px 24px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              backgroundColor: 'rgba(99, 102, 241, 0.1)',
              color: 'var(--brand-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Boxes size={32} />
          </div>

          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
              ERP Workspace
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '460px', margin: '0 auto' }}>
              ERP modules will be developed here.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
