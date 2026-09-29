import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from '@shared/components';

export const NotFoundPage: React.FC = () => {
  return (
    <div style={{ maxWidth: '600px', margin: '80px auto', textAlign: 'center', padding: '0 20px' }}>
      <Card title="404 — Page Not Found" accent="brand">
        <p style={{ color: 'var(--text-secondary)', margin: '16px 0 24px' }}>
          The requested route is not registered in the One Enterprise Cloud application router.
        </p>
        <Link to="/">
          <Button variant="primary">Return to Architecture Dashboard</Button>
        </Link>
      </Card>
    </div>
  );
};
