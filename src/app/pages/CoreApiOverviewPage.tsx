import React from 'react';
import { PageHeader, Card, Badge } from '@shared/components';

export const CoreApiOverviewPage: React.FC = () => {
  return (
    <div>
      <PageHeader
        breadcrumb="Technical Infrastructure"
        title="Core API Architecture & Placeholders"
        description="Detailed contract boundary for future API integration. Demonstrates structural organization without fake APIs or real network requests."
        badge={<Badge variant="core">Zero Fake APIs</Badge>}
      />

      <div style={{ padding: '16px 20px', backgroundColor: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.25)', borderRadius: 'var(--radius-md)', marginBottom: '24px' }}>
        <strong style={{ color: '#fbbf24' }}>Architectural Notice: </strong>
        <span style={{ fontSize: '13.5px', color: 'var(--text-secondary)' }}>
          This demo strictly contains NO fake backend endpoints, NO mock network servers or live endpoints, and NO network traffic.
          The folders below demonstrate where technical infrastructure resides when backend contracts are formalized.
        </span>
      </div>

      <div className="grid-cols-2" style={{ gap: '20px' }}>
        <Card title="core/api/client" accent="brand" badge={<Badge variant="core">HTTP Transport</Badge>}>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
            Base HTTP client instance configuration (timeouts, global headers, base URL resolution).
          </p>
          <div style={{ padding: '12px', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)', fontSize: '12.5px', fontFamily: 'var(--font-mono)' }}>
            src/core/api/client/<br />
            ├── index.ts (Transport contract abstraction)<br />
            └── README.md (Technical usage documentation)
          </div>
        </Card>

        <Card title="core/api/interceptors" accent="brand" badge={<Badge variant="core">Pipeline</Badge>}>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
            Cross-cutting token injection, active tenant header assignment, correlation IDs, and 401 handling.
          </p>
          <div style={{ padding: '12px', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)', fontSize: '12.5px', fontFamily: 'var(--font-mono)' }}>
            src/core/api/interceptors/<br />
            ├── index.ts (Standard header application)<br />
            └── README.md (Interceptor documentation)
          </div>
        </Card>

        <Card title="core/api/query" accent="brand" badge={<Badge variant="core">Server State</Badge>}>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
            Global caching policies, stale times, GC timers, and retry behaviors for server-state queries.
          </p>
          <div style={{ padding: '12px', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)', fontSize: '12.5px', fontFamily: 'var(--font-mono)' }}>
            src/core/api/query/<br />
            ├── index.ts (Query defaults & retry policies)<br />
            └── README.md (Server-state guidelines)
          </div>
        </Card>

        <Card title="core/api/types" accent="brand" badge={<Badge variant="core">Type Contracts</Badge>}>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
            Standard response envelopes, pagination contracts, and API error payload types.
          </p>
          <div style={{ padding: '12px', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)', fontSize: '12.5px', fontFamily: 'var(--font-mono)' }}>
            src/core/api/types/<br />
            ├── index.ts (Envelope & pagination types)<br />
            └── README.md (API type documentation)
          </div>
        </Card>
      </div>
    </div>
  );
};
