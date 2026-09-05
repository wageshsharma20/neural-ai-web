/**
 * AuthContext.jsx
 *
 * Provides global auth state: current user, login, logout.
 * - On mount: calls GET /auth/me (cookie is sent automatically)
 * - login(): POST /auth/login → stores user in state
 * - logout(): POST /auth/logout → clears cookie + state
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true); // true until first /me check

  // ─── Verify session on app load ───────────────────────────────────────────
  useEffect(() => {
    authAPI.me()
      .then((res) => setUser(res.data.data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  // ─── Login ────────────────────────────────────────────────────────────────
  const login = useCallback(async (email, password) => {
    const res = await authAPI.login({ email, password });
    if (res.data.requiresOtp) {
      return { requiresOtp: true };
    }
    setUser(res.data.data.user);
    return res.data;
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
