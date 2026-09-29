import React, { useState, useEffect } from 'react';
import { PageHeader, Card, LoadingState, ErrorState } from '@shared/components';
import { Briefcase } from 'lucide-react';
import { crmService } from '../services/crmService';
import { CrmWorkspaceStatus } from '../types';

export const CrmHomePage: React.FC = () => {
  const [data, setData] = useState<CrmWorkspaceStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await crmService.getWorkspaceStatus();
      if (response.success) {
        setData(response.data);
      } else {
        setError(response.message || 'Failed to load CRM status');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown communication error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <PageHeader
        breadcrumb="Business Modules"
        title="CRM"
        description="Customer Relationship Management"
      />

      <Card title="CRM Workspace">
        {isLoading && <LoadingState message="Loading CRM workspace foundation..." />}

        {error && !isLoading && (
          <ErrorState
            title="Service Communication Issue"
            message={error}
            onRetry={loadData}
            retryLabel="Retry"
          />
        )}

        {!isLoading && !error && (
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
              <Briefcase size={32} />
            </div>

            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
                CRM Workspace
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '460px', margin: '0 auto 12px' }}>
                CRM modules will be developed here.
              </p>
              <div
                style={{
                  display: 'inline-block',
                  fontSize: '12px',
                  color: 'var(--text-muted)',
                  backgroundColor: 'var(--bg-elevated)',
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                {data?.pendingRequirementsNote || 'TBD — Requirement/Backend Contract Required'}
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
