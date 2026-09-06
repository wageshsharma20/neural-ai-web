/**
 * AuthContext.jsx
 *
 * Provides global auth state: current user, login, logout.
 * - On mount: calls GET /auth/me (cookie is sent automatically)
 * - login(): POST /auth/login → stores user in state
 * - logout(): POST /auth/logout → clears cookie + state
 *
 * LOCAL DEV (no backend): use mock credentials below to access the portal.
 *   admin@neural.ai  /  admin123   → Super Admin
 *   member@neural.ai /  member123  → Core Team
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

// ── Mock credentials for local frontend-only development ──────────────────────
const MOCK_CREDENTIALS = [
  { email: 'admin@neural.ai',  password: 'admin123',  role: 'Super Admin', name: 'Admin (Local)' },
  { email: 'member@neural.ai', password: 'member123', role: 'Core Team',   name: 'Member (Local)' },
];

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true); // true until first /me check

  // ─── Verify session on app load ───────────────────────────────────────────
  useEffect(() => {
    // Use a short timeout so the app doesn't hang when the backend is offline.
    // If /auth/me doesn't respond within 3 s, treat user as logged out.
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3000);

    authAPI.me({ signal: controller.signal })
      .then((res) => setUser(res.data.data.user))
      .catch(() => {
        // Restore mock session if one was saved
        const saved = localStorage.getItem('mock_user');
        setUser(saved ? JSON.parse(saved) : null);
      })
      .finally(() => { clearTimeout(timer); setLoading(false); });

    return () => { clearTimeout(timer); controller.abort(); };
  }, []);

  // ─── Login ────────────────────────────────────────────────────────────────
  const login = useCallback(async (email, password) => {
    try {
      const res = await authAPI.login({ email, password });
      if (res.data.requiresOtp) {
        return { requiresOtp: true };
      }
      setUser(res.data.data.user);
      return res.data;
    } catch (err) {
      // If backend is unreachable, fall back to mock credentials
      if (!err.response) {
        const match = MOCK_CREDENTIALS.find(
          (c) => c.email === email && c.password === password
        );
        if (match) {
          const mockUser = { _id: 'mock-1', name: match.name, email: match.email, role: match.role };
          localStorage.setItem('mock_user', JSON.stringify(mockUser));
          setUser(mockUser);
          return { data: { user: mockUser } };
        }
        // Wrong mock credentials — give a helpful hint
        const hint = new Error(
          'Backend is offline. For local access use:\n' +
          'admin@neural.ai / admin123'
        );
        hint.isMock = true;
        throw hint;
      }
      throw err;
    }
  }, []);

  const verifyOtp = useCallback(async (email, otp) => {
    const res = await authAPI.verifyOtp({ email, otp });
    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
    }
    setUser(res.data.data.user);
    return res.data;
  }, []);

  // ─── Logout ───────────────────────────────────────────────────────────────
  const logout = useCallback(async () => {
    try {
      await authAPI.logout();
    } catch (err) {
      console.error('Logout err:', err);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('mock_user');
      setUser(null);
    }
  }, []);

  const value = {
    user,
    loading,
    login,
    verifyOtp,
    logout,
    isAuthenticated: !!user,
    isAdmin: ['Super Admin', 'Admin'].includes(user?.role),
    isCoreTeam: ['Super Admin', 'Admin', 'Core Team'].includes(user?.role),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/** Hook to consume auth context */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}

export default AuthContext;
