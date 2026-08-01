import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout';
import './Auth.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setLoading(true);
    // Simulate network request
    setTimeout(() => {
      navigate('/2fa');
    }, 1200);
  };

  return (
    <PageLayout>
      <div className="auth-page">
        <div className="auth-card">
          <p className="text-2xs text-mono uppercase tracking-widest text-signal-cyan auth-eyebrow">Portal Access</p>
          <h1 className="auth-heading">Welcome Back.</h1>
          <p className="auth-subhead">Sign in with your DTU organizational email to access the Neural AI members portal.</p>
          
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                className="auth-input"
                placeholder="you@dtu.ac.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
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
              />
            </div>
            
            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? (
                <div className="spinner"></div>
              ) : (
                <>Sign In <ArrowRight size={16} /></>
              )}
            </button>
          </form>
        </div>
      </div>
    </PageLayout>
  );
}
