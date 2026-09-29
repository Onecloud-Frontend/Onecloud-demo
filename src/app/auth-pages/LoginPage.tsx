import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Input, Badge } from '@shared/components';
import { useAuth } from '@core/auth';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();

  const [email, setEmail] = useState('architect@oneenterprise.internal');
  const [password, setPassword] = useState('DemoSecure123!');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [forgotPasswordNotice, setForgotPasswordNotice] = useState(false);

  // If already authenticated, redirect to /dashboard
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const validate = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'Email address or corporate username is required';
    } else if (!/\S+@\S+\.\S+/.test(email.trim()) && !email.includes('admin')) {
      newErrors.email = 'Please provide a valid corporate email (e.g. user@oneenterprise.internal)';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validate()) return;

    try {
      setIsLoading(true);
      await login(email, password);

      const targetPath = (location.state as { from?: { pathname?: string } })?.from?.pathname || '/dashboard';
      navigate(targetPath, { replace: true });
    } catch {
      setErrors({ general: 'Authentication failed. Please verify credentials.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg-base)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        position: 'relative',
      }}
    >
      {/* Top Banner indicating local demo auth */}
      <div
        style={{
          maxWidth: '480px',
          width: '100%',
          marginBottom: '20px',
          padding: '12px 16px',
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          borderRadius: 'var(--radius-md)',
          fontSize: '12.5px',
          color: 'var(--text-secondary)',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '10px',
        }}
      >
        <span style={{ fontSize: '16px' }}>ℹ️</span>
        <div>
          <strong style={{ color: '#818cf8' }}>Demo Authentication Mode: </strong>
          Backend authentication service is pending deployment. This login operates entirely via local state in{' '}
          <code>@core/auth</code> without live network requests.
        </div>
      </div>

      <div
        style={{
          maxWidth: '480px',
          width: '100%',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-xl)',
          padding: '36px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        }}
      >
        {/* Logo and Brand Title */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              width: '46px',
              height: '46px',
              margin: '0 auto 12px',
              borderRadius: '12px',
              background: 'var(--brand-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '22px',
              boxShadow: 'var(--brand-glow)',
            }}
          >
            O
          </div>
          <h1
            style={{
              fontSize: '22px',
              fontWeight: 700,
              fontFamily: 'var(--font-display)',
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
            }}
          >
            One Enterprise Cloud
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Unified Enterprise Portal • 3-Team Monorepo
          </p>
        </div>

        {/* General Error Banner */}
        {errors.general && (
          <div
            style={{
              padding: '10px 14px',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: 'var(--radius-md)',
              color: '#ef4444',
              fontSize: '13px',
              marginBottom: '18px',
            }}
          >
            {errors.general}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <Input
            label="Corporate Email or Username"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            placeholder="architect@oneenterprise.internal"
            disabled={isLoading}
            autoComplete="username"
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            placeholder="Enter your corporate password"
            allowPasswordToggle
            disabled={isLoading}
            autoComplete="current-password"
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: 'var(--text-secondary)' }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ accentColor: 'var(--brand-primary)', cursor: 'pointer' }}
              />
              Remember me
            </label>

            <button
              type="button"
              onClick={() => setForgotPasswordNotice(true)}
              style={{
                color: 'var(--brand-primary)',
                fontSize: '13px',
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              Forgot password?
            </button>
          </div>

          {forgotPasswordNotice && (
            <div
              style={{
                padding: '10px 14px',
                backgroundColor: 'var(--bg-elevated)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '12px',
                color: 'var(--text-secondary)',
              }}
            >
              Demo notice: Corporate password resets are managed via IAM SSO when the backend is connected.
              <button
                type="button"
                onClick={() => setForgotPasswordNotice(false)}
                style={{ display: 'block', marginTop: '6px', color: 'var(--brand-primary)', fontWeight: 600 }}
              >
                Dismiss
              </button>
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
            style={{ width: '100%', marginTop: '6px', height: '42px' }}
          >
            {isLoading ? 'Authenticating...' : 'Sign In to Workspace'}
          </Button>
        </form>

        {/* Demo Credentials Helper */}
        <div
          style={{
            marginTop: '24px',
            paddingTop: '18px',
            borderTop: '1px solid var(--border-subtle)',
            fontSize: '12px',
            color: 'var(--text-muted)',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Demo Account:</span>
            <Badge variant="core">Enterprise Admin</Badge>
          </div>
          <div>Login: <code>architect@oneenterprise.internal</code></div>
          <div>Password: <code>DemoSecure123!</code></div>
        </div>
      </div>
    </div>
  );
};
