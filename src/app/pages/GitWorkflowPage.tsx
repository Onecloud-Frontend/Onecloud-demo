import React from 'react';
import { PageHeader, Card, Badge } from '@shared/components';

export const GitWorkflowPage: React.FC = () => {
  return (
    <div>
      <PageHeader
        breadcrumb="Engineering Collaboration Standards"
        title="Git Branching Strategy & Safety Rules"
        description="Standardized branch flow, Pull Request guardrails, and commit conventions ensuring conflict-free collaboration among three teams."
        badge={<Badge variant="core">Git Standards</Badge>}
      />

      {/* Visual Branch Hierarchy */}
      <Card title="Branch Topology & Merge Lifecycle" accent="brand" style={{ marginBottom: '24px' }}>
        <div style={{ padding: '20px', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-mono)', fontSize: '13px', lineHeight: 1.8 }}>
          <div style={{ color: '#34d399', fontWeight: 700 }}>main (Production / Stable Branch)</div>
          <div style={{ color: 'var(--text-muted)' }}>  ▲</div>
          <div style={{ color: 'var(--text-muted)' }}>  │ [Pull Request: Release Cut & Integration Verification]</div>
          <div style={{ color: '#818cf8', fontWeight: 700 }}>dev (Development Baseline / Integration Branch)</div>
          <div style={{ color: 'var(--text-muted)' }}>  ▲</div>
          <div style={{ color: 'var(--text-muted)' }}>  ├── [Pull Request] ── feature/team-a-platform-dashboard</div>
          <div style={{ color: 'var(--text-muted)' }}>  ├── [Pull Request] ── feature/team-b-hrms-users</div>
          <div style={{ color: 'var(--text-muted)' }}>  └── [Pull Request] ── feature/team-c-finance-reports</div>
        </div>
      </Card>

      {/* Mandatory Safety Rules */}
      <div className="grid-cols-2" style={{ marginBottom: '24px' }}>
        <Card title="Strict Git Safety Guardrails" accent="team-a">
          <ul style={{ paddingLeft: '18px', fontSize: '13.5px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li><strong>NO Direct Push to main:</strong> Direct pushes to production branch are blocked.</li>
            <li><strong>NO Direct Push to dev:</strong> All changes merge into <code>dev</code> exclusively via reviewed PRs.</li>
            <li><strong>NO Force Push:</strong> <code>git push --force</code> is strictly prohibited on shared branches.</li>
            <li><strong>NO Destructive Resets:</strong> Preserves shared commit history across all three teams.</li>
            <li><strong>Branch Naming Rule:</strong> Branches represent work/tasks, NOT individual people.</li>
            <li><strong>Baseline Rule:</strong> Every feature branch must branch off the latest <code>dev</code>.</li>
          </ul>
        </Card>

        <Card title="Standardized Commit Conventions" accent="team-b">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
            <div><code>feat:</code> New domain functionality (e.g. <code>feat: add team A platform module shell</code>)</div>
            <div><code>fix:</code> Defect correction (e.g. <code>fix: correct router configuration</code>)</div>
            <div><code>refactor:</code> Code adjustment without behavior change</div>
            <div><code>docs:</code> Documentation updates (e.g. <code>docs: update team workflow</code>)</div>
            <div><code>test:</code> Unit or integration test suites</div>
            <div><code>chore:</code> Build, dependencies, or tool configurations</div>
          </div>
        </Card>
      </div>

      <Card title="Pull Request & Review Protocol" accent="team-c">
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '14px' }}>
          To prevent architectural erosion and cross-team interference:
        </p>
        <div className="grid-cols-3">
          <div style={{ padding: '14px', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>1. Feature Scope PRs</div>
            <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
              Reviewed by peers within the same team. Verified against domain boundaries.
            </div>
          </div>

          <div style={{ padding: '14px', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>2. Shared / Core PRs</div>
            <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
              Modifications to <code>src/shared/</code> or <code>src/core/</code> require multi-team peer review.
            </div>
          </div>

          <div style={{ padding: '14px', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>3. Architecture PRs</div>
            <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
              Any structural layer adjustment requires explicit approval from the Project Lead / Architect.
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
