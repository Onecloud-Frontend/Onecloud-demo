import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from '@shared/components';

export const ForbiddenPage: React.FC = () => {
  return (
    <div style={{ maxWidth: '600px', margin: '80px auto', textAlign: 'center', padding: '0 20px' }}>
      <Card title="403 — Access Denied" accent="brand">
        <p style={{ color: 'var(--text-secondary)', margin: '16px 0 24px' }}>
          Your active session lacks permissions for this enterprise domain boundary.
        </p>
        <Link to="/">
          <Button variant="secondary">Back to Dashboard</Button>
        </Link>
      </Card>
    </div>
  );
};
