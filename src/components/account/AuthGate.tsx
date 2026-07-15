'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNotification } from '@/context/NotificationContext';
import { signIn } from 'next-auth/react';

export const AuthGate: React.FC = () => {
  const { login, signup } = useAuth();
  const { showNotification } = useNotification();
  
  const isStatic = process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true';
  
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please fill in all fields.');
      return;
    }
    setErrorMsg('');
    setIsPending(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        showNotification('Signed in successfully!');
      } else {
        setErrorMsg(res.error || 'Authentication failed.');
      }
    } catch (err) {
      setErrorMsg('An unexpected error occurred.');
    } finally {
      setIsPending(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !firstName || !lastName) {
      setErrorMsg('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }
    setErrorMsg('');
    setIsPending(true);

    try {
      const res = await signup(email, password, firstName, lastName);
      if (res.success) {
        showNotification('Account created successfully!');
      } else {
        setErrorMsg(res.error || 'Registration failed.');
      }
    } catch (err) {
      setErrorMsg('An unexpected error occurred.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="auth-gate-page">
      <style dangerouslySetInnerHTML={{ __html: `
        .auth-gate-page {
          --bg: #0a0a0a;
          --panel: rgba(18, 18, 24, 0.68);
          --cyan: #06b6d4;
          --purple: #a855f7;
          --text: #f8fafc;
          --muted: #9ca3af;
          --radius-xl: 28px;
          --shadow-cyan: 0 0 28px rgba(6, 182, 212, 0.22);
          --shadow-purple: 0 0 32px rgba(168, 85, 247, 0.24);
          --font-head: 'Orbitron', system-ui, sans-serif;
          --font-body: 'Inter', system-ui, sans-serif;

          min-height: 100vh;
          display: grid;
          place-items: center;
          padding: 24px;
          background:
            radial-gradient(circle at 15% 12%, rgba(6, 182, 212, 0.22), transparent 34%),
            radial-gradient(circle at 82% 8%, rgba(168, 85, 247, 0.22), transparent 34%),
            var(--bg);
          color: var(--text);
          font-family: var(--font-body);
          position: relative;
          z-index: 1;
        }

        .auth-gate-page::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 46px 46px;
          mask-image: radial-gradient(circle at center, black, transparent 78%);
          opacity: 0.5;
          z-index: 0;
        }

        .auth-card {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 480px;
          background: linear-gradient(145deg, rgba(16,16,22,0.76), rgba(10,10,10,0.62));
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: var(--radius-xl);
          padding: 40px;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow:
            0 28px 90px rgba(0, 0, 0, 0.55),
            inset 0 1px 0 rgba(255, 255, 255, 0.08),
            0 0 0 1px rgba(6, 182, 212, 0.06);
        }

        .auth-brand {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          margin-bottom: 32px;
          text-align: center;
        }

        .auth-logo-mark {
          width: 54px;
          height: 54px;
          border-radius: 18px;
          display: grid;
          place-items: center;
          background:
            linear-gradient(135deg, rgba(6, 182, 212, 0.24), rgba(168, 85, 247, 0.22)),
            rgba(255,255,255,0.04);
          border: 1px solid rgba(6, 182, 212, 0.42);
          box-shadow: var(--shadow-cyan);
        }

        .auth-logo-mark svg {
          width: 30px;
          height: 30px;
          color: var(--cyan);
          filter: drop-shadow(0 0 10px rgba(6, 182, 212, 0.65));
        }

        .auth-title {
          margin: 0;
          font-family: var(--font-head);
          font-size: 1.6rem;
          font-weight: 900;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .auth-subtitle {
          margin: 4px 0 0;
          color: var(--muted);
          font-size: 0.85rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .auth-tabs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          background: rgba(5, 5, 8, 0.58);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 6px;
          border-radius: 16px;
          margin-bottom: 28px;
        }

        .auth-tab-btn {
          background: transparent;
          border: none;
          color: var(--muted);
          padding: 10px 0;
          font-weight: 700;
          font-size: 0.9rem;
          border-radius: 10px;
          cursor: pointer;
          transition: color 180ms ease, background 180ms ease, box-shadow 180ms ease;
        }

        .auth-tab-btn.active {
          color: white;
          background: rgba(6, 182, 212, 0.12);
          border: 1px solid rgba(6, 182, 212, 0.28);
          box-shadow: 0 0 16px rgba(6, 182, 212, 0.08);
        }

        .auth-form {
          display: grid;
          gap: 18px;
        }

        .auth-field {
          display: grid;
          gap: 8px;
        }

        .auth-field-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .auth-label {
          color: rgba(248, 250, 252, 0.82);
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .auth-input {
          width: 100%;
          min-height: 50px;
          border: 1px solid rgba(255,255,255,0.13);
          border-radius: 15px;
          padding: 0 15px;
          color: var(--text);
          background: rgba(5, 5, 8, 0.58);
          outline: none;
          transition: border-color 180ms ease, box-shadow 180ms ease, background 180ms ease;
        }

        .auth-input:focus {
          border-color: var(--cyan);
          box-shadow: 0 0 0 4px rgba(6, 182, 212, 0.10), 0 0 24px rgba(6, 182, 212, 0.18);
          background: rgba(5, 5, 8, 0.78);
        }

        .auth-error {
          color: #fb7185;
          font-size: 0.85rem;
          background: rgba(251, 113, 133, 0.08);
          border: 1px solid rgba(251, 113, 133, 0.22);
          padding: 12px;
          border-radius: 14px;
          line-height: 1.4;
        }

        .auth-submit-btn {
          min-height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border: 1px solid rgba(6, 182, 212, 0.55);
          background: linear-gradient(135deg, rgba(6, 182, 212, 0.92), rgba(168, 85, 247, 0.92));
          color: white;
          font-weight: 800;
          border-radius: 15px;
          cursor: pointer;
          box-shadow: 0 14px 40px rgba(6, 182, 212, 0.16);
          transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
        }

        .auth-submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 18px 46px rgba(168, 85, 247, 0.22), 0 0 26px rgba(6, 182, 212, 0.25);
        }

        .auth-submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .auth-helper-note {
          margin-top: 24px;
          font-size: 0.82rem;
          color: var(--muted);
          text-align: center;
          line-height: 1.5;
          padding: 12px;
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          background: rgba(255, 255, 255, 0.02);
        }

        .auth-helper-note strong {
          color: var(--cyan);
          cursor: pointer;
          text-decoration: underline;
        }

        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 55%;
          border-top-color: white;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .google-signin-container {
          margin-top: 10px;
          margin-bottom: 8px;
        }

        .google-btn {
          width: 100%;
          height: 50px;
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 15px;
          color: #1e293b;
          font-family: var(--font-body);
          font-size: 0.95rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          cursor: pointer;
          transition: background-color 150ms ease, box-shadow 150ms ease, transform 150ms ease;
        }

        .google-btn:hover {
          background-color: #f1f5f9;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
        }

        .google-btn:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.4), 0 0 12px rgba(6, 182, 212, 0.2);
        }

        .google-icon {
          width: 20px;
          height: 20px;
        }

        .auth-divider {
          display: flex;
          align-items: center;
          text-align: center;
          color: var(--muted);
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin: 22px 0;
        }

        .auth-divider::before,
        .auth-divider::after {
          content: '';
          flex: 1;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .auth-divider:not(:empty)::before {
          margin-right: 1.2em;
        }

        .auth-divider:not(:empty)::after {
          margin-left: 1.2em;
        }
      `}} />

      <div className="auth-card">
        <div className="auth-brand">
          <div className="auth-logo-mark">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="m13 2-9 12h7l-1 8 10-13h-7l0-7Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h1 className="auth-title">Street Revolution</h1>
            <p className="auth-subtitle">Console Gateway</p>
          </div>
        </div>

        <div className="auth-tabs">
          <button 
            type="button" 
            className={`auth-tab-btn ${activeTab === 'signin' ? 'active' : ''}`}
            onClick={() => { setActiveTab('signin'); setErrorMsg(''); }}
          >
            Sign In
          </button>
          <button 
            type="button" 
            className={`auth-tab-btn ${activeTab === 'signup' ? 'active' : ''}`}
            onClick={() => { setActiveTab('signup'); setErrorMsg(''); }}
          >
            Sign Up
          </button>
        </div>

        {!isStatic && (
          <>
            <div className="google-signin-container">
              <button
                type="button"
                onClick={() => signIn('google', { callbackUrl: '/account' })}
                className="google-btn"
              >
                <svg viewBox="0 0 48 48" className="google-icon" width="20" height="20" aria-hidden="true">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.5 24c0-1.65-.15-3.22-.42-4.75H24v9h12.75c-.55 2.86-2.17 5.29-4.6 6.92l7.15 5.54C43.5 36.58 46.5 30.86 46.5 24z"/>
                  <path fill="#FBBC05" d="M10.54 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.98-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.15-5.54c-2.2 1.47-5.02 2.35-8.74 2.35-6.26 0-11.57-4.22-13.46-10.19l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
                <span>Sign in with Google</span>
              </button>
            </div>
            <div className="auth-divider">or</div>
          </>
        )}

        {errorMsg && <div className="auth-error">{errorMsg}</div>}

        {activeTab === 'signin' ? (
          <form className="auth-form" onSubmit={handleSignIn}>
            <div className="auth-field">
              <label className="auth-label" htmlFor="auth-email">Email Address</label>
              <input 
                className="auth-input" 
                id="auth-email" 
                type="email" 
                placeholder="e.g. alex@streetrevolution.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isPending}
                required
              />
            </div>

            <div className="auth-field">
              <label className="auth-label" htmlFor="auth-password">Password</label>
              <input 
                className="auth-input" 
                id="auth-password" 
                type="password" 
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isPending}
                required
              />
            </div>

            <button className="auth-submit-btn" type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <div className="spinner"></div>
                  <span>Syncing...</span>
                </>
              ) : (
                <span>Access Console</span>
              )}
            </button>
          </form>
        ) : (
          <form className="auth-form" onSubmit={handleSignUp}>
            <div className="auth-field-row">
              <div className="auth-field">
                <label className="auth-label" htmlFor="auth-first-name">First Name</label>
                <input 
                  className="auth-input" 
                  id="auth-first-name" 
                  type="text" 
                  placeholder="Alex"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={isPending}
                  required
                />
              </div>
              <div className="auth-field">
                <label className="auth-label" htmlFor="auth-last-name">Last Name</label>
                <input 
                  className="auth-input" 
                  id="auth-last-name" 
                  type="text" 
                  placeholder="Rider"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={isPending}
                  required
                />
              </div>
            </div>

            <div className="auth-field">
              <label className="auth-label" htmlFor="auth-signup-email">Email Address</label>
              <input 
                className="auth-input" 
                id="auth-signup-email" 
                type="email" 
                placeholder="e.g. pilot@streetrevolution.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isPending}
                required
              />
            </div>

            <div className="auth-field-row">
              <div className="auth-field">
                <label className="auth-label" htmlFor="auth-signup-pass">Password</label>
                <input 
                  className="auth-input" 
                  id="auth-signup-pass" 
                  type="password" 
                  placeholder="Min 6 chars"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isPending}
                  required
                />
              </div>
              <div className="auth-field">
                <label className="auth-label" htmlFor="auth-signup-confirm">Confirm</label>
                <input 
                  className="auth-input" 
                  id="auth-signup-confirm" 
                  type="password" 
                  placeholder="Match password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isPending}
                  required
                />
              </div>
            </div>

            <button className="auth-submit-btn" type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <div className="spinner"></div>
                  <span>Initializing...</span>
                </>
              ) : (
                <span>Register Signal</span>
              )}
            </button>
          </form>
        )}

        <div className="auth-helper-note">
          {activeTab === 'signin' ? (
            <>
              Testing credentials available: Use <strong onClick={() => { setEmail('alex@streetrevolution.com'); setPassword('any-password'); }}>alex@streetrevolution.com</strong> (click to autofill).
            </>
          ) : (
            <>
              Already registered? Switch tab to <strong onClick={() => setActiveTab('signin')}>Sign In</strong>.
            </>
          )}
        </div>
      </div>
    </div>
  );
};
