import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, verifyOtp, isAuthenticated } = useAuth();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // If already logged in, redirect to portal
  if (isAuthenticated) {
    return <Navigate to="/portal" replace />;
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);
    try {
      const res = await login(email, password);
      if (res?.requiresOtp) {
        setStep(2);
        setSuccessMsg('OTP sent to your email.');
      } else {
        navigate('/portal');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await verifyOtp(email, otp);
      navigate('/portal');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <div className="auth-page">
        <div className="auth-card">
          <p className="text-2xs text-mono uppercase tracking-widest text-signal-cyan auth-eyebrow">Portal Access</p>
          <h1 className="auth-heading">Welcome Back.</h1>
          <p className="auth-subhead">
            {step === 1 ? 'Sign in with your DTU organizational email to access the Neural AI members portal.' : 'Enter the 6-digit OTP sent to your email address.'}
          </p>
          
          {error && <div style={{ color: 'red', marginBottom: '1rem', fontSize: '14px' }}>{error}</div>}
          {successMsg && <div style={{ color: 'var(--signal-cyan)', marginBottom: '1rem', fontSize: '14px' }}>{successMsg}</div>}
          
          {step === 1 ? (
            <form className="auth-form" onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  className="auth-input"
                  placeholder="you@dtu.ac.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>
              
              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label>Password</label>
                  <a href="#" style={{ fontSize: '11px', color: 'var(--mist)', textDecoration: 'none' }}>Forgot password?</a>
                </div>
                <input
                  type="password"
                  className="auth-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
              </div>
              
              <button type="submit" className="auth-submit" disabled={loading}>
                {loading ? (
                  <div className="spinner"></div>
                ) : (
                  <>Continue <ArrowRight size={16} /></>
                )}
              </button>
            </form>
          ) : (
            <form className="auth-form" onSubmit={handleOtpSubmit}>
              <div className="form-group">
                <label>One-Time Password</label>
                <input
                  type="text"
                  className="auth-input"
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  autoComplete="one-time-code"
                  maxLength={6}
                  required
                />
              </div>
              
              <button type="submit" className="auth-submit" disabled={loading}>
                {loading ? (
                  <div className="spinner"></div>
                ) : (
                  <>Sign In <ArrowRight size={16} /></>
                )}
              </button>
              
              <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <a href="#" onClick={(e) => { e.preventDefault(); setStep(1); setSuccessMsg(null); setError(null); }} style={{ fontSize: '12px', color: 'var(--mist)', textDecoration: 'none' }}>
                  &larr; Back to login
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
