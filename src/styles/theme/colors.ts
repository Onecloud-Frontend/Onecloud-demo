export const themeColors = {
  background: {
    base: '#080c14',
    surface: '#0f172a',
    elevated: '#1e293b',
    overlay: 'rgba(15, 23, 42, 0.85)',
    border: 'rgba(148, 163, 184, 0.12)',
    borderHover: 'rgba(148, 163, 184, 0.25)',
  },
  text: {
    primary: '#f8fafc',
    secondary: '#94a3b8',
    muted: '#64748b',
    inverse: '#020617',
  },
  brand: {
    primary: '#6366f1',
    primaryHover: '#4f46e5',
    secondary: '#8b5cf6',
  },
  teams: {
    teamA: {
      name: 'Team A (Platform & Revenue)',
      color: '#10b981',
      bg: 'rgba(16, 185, 129, 0.12)',
      border: 'rgba(16, 185, 129, 0.3)',
    },
    teamB: {
      name: 'Team B (Workforce & Collaboration)',
      color: '#38bdf8',
      bg: 'rgba(56, 189, 248, 0.12)',
      border: 'rgba(56, 189, 248, 0.3)',
    },
    teamC: {
      name: 'Team C (Operations & Systems)',
      color: '#a855f7',
      bg: 'rgba(168, 85, 247, 0.12)',
      border: 'rgba(168, 85, 247, 0.3)',
    }
  },
  status: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  }
} as const;
