'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_USERS } from '@/lib/constants';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('fc_user');
    if (saved) {
      try { setUser(JSON.parse(saved)); } catch {}
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    await new Promise(r => setTimeout(r, 1200));

    if (!email || !password) {
      return { success: false, error: 'Please enter both email and password.' };
    }

    const normalizedEmail = email.trim().toLowerCase();
    const found = Object.values(MOCK_USERS).find(u => u.email === normalizedEmail);
    const user = found || {
      id: 'u-' + Date.now(),
      name: normalizedEmail.split('@')[0].replace(/[^a-z0-9]/gi, ' ').trim() || 'Faculty User',
      email: normalizedEmail,
      role: 'teacher',
      department: 'General',
      avatar: normalizedEmail.split('@')[0].substring(0, 2).toUpperCase(),
    };

    setUser(user);
    localStorage.setItem('fc_user', JSON.stringify(user));
    return { success: true };
  };

  const register = async (data) => {
    await new Promise(r => setTimeout(r, 1500));
    const newUser = {
      id: 'u-new-' + Date.now(),
      name: data.name,
      email: data.email,
      role: 'teacher',
      department: data.department || 'General',
      avatar: data.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase(),
    };
    setUser(newUser);
    localStorage.setItem('fc_user', JSON.stringify(newUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fc_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
