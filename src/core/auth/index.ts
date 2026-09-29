import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserSession {
  userId: string;
  email: string;
  name: string;
  roles: string[];
  tenantId: string;
  isAuthenticated: boolean;
}

export const defaultDemoUser: UserSession = {
  userId: 'usr_demo_001',
  email: 'architect@oneenterprise.internal',
  name: 'Lead Cloud Architect',
  roles: ['EnterpriseAdmin', 'TenantAdmin'],
  tenantId: 'tenant_global_corp',
  isAuthenticated: true,
};

// Backward-compatible alias
export const demoSession: UserSession = defaultDemoUser;

const AUTH_STORAGE_KEY = 'onecloud:demo_auth_session';

export function getStoredSession(): UserSession | null {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return defaultDemoUser; // default active session for demo convenience
    return JSON.parse(raw);
  } catch {
    return defaultDemoUser;
  }
}

export function saveSession(session: UserSession | null): void {
  try {
    if (session) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  } catch (e) {
    console.warn('Storage unavailable', e);
  }
}

interface AuthContextValue {
  user: UserSession | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => Promise<UserSession>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserSession | null>(() => getStoredSession());

  useEffect(() => {
    // Sync storage across tabs or reloads
    saveSession(user);
  }, [user]);

  const login = async (email: string, _password?: string): Promise<UserSession> => {
    // Simulated async network delay for realistic loading feedback
    await new Promise((resolve) => setTimeout(resolve, 450));

    const loggedInUser: UserSession = {
      ...defaultDemoUser,
      email: email.trim() || defaultDemoUser.email,
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) || defaultDemoUser.name,
      isAuthenticated: true,
    };

    setUser(loggedInUser);
    saveSession(loggedInUser);
    return loggedInUser;
  };

  const logout = (): void => {
    const unauthenticatedUser: UserSession = {
      ...defaultDemoUser,
      isAuthenticated: false,
    };
    setUser(unauthenticatedUser);
    saveSession(unauthenticatedUser);
  };

  return React.createElement(
    AuthContext.Provider,
    {
      value: {
        user,
        isAuthenticated: !!user?.isAuthenticated,
        login,
        logout,
      },
    },
    children
  );
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
