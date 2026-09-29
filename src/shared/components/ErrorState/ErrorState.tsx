import React from 'react';
import { Button } from '../Button';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Failed to Load Data',
  message = 'An unexpected error occurred while communicating with the service layer.',
  onRetry,
  retryLabel = 'Retry Request',
  className = '',
}) => {
  return (
    <div
      style={{
        padding: '24px',
        backgroundColor: 'rgba(239, 68, 68, 0.08)',
        border: '1px solid rgba(239, 68, 68, 0.25)',
        borderRadius: 'var(--radius-lg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: '10px',
      }}
      className={className}
      role="alert"
    >
      <div style={{ color: 'var(--status-danger)', fontSize: '24px' }}>⚠️</div>
      <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--status-danger)' }}>{title}</h3>
      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', maxWidth: '440px' }}>{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry} style={{ marginTop: '6px' }}>
          {retryLabel}
        </Button>
      )}
    </div>
  );
};
