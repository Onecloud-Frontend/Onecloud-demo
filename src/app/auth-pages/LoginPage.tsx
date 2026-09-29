import React from 'react';
import { Card, Button, PageHeader } from '@shared/components';

export const LoginPage: React.FC = () => {
  return (
    <div style={{ maxWidth: '440px', margin: '60px auto', padding: '0 16px' }}>
      <PageHeader title="Sign In" description="One Enterprise Cloud Unified SSO" />
      <Card title="Corporate Identity Portal">
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '20px' }}>
          This is an architectural placeholder for application-level authentication flows.
        </p>
        <Button variant="primary" style={{ width: '100%' }}>
          Authenticate via Enterprise SSO
        </Button>
      </Card>
    </div>
  );
};
