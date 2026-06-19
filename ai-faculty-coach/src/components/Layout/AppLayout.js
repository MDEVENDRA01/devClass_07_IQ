'use client';
import { useAuth } from '@/context/AuthContext';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function AppLayout({ children }) {
  const { user, loading } = useAuth();
  const { toasts } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex-center" style={{ height: '100vh', background: 'var(--color-bg-page)' }}>
        <div className="spinner" style={{ borderColor: 'var(--color-primary)', borderTopColor: 'transparent', width: 40, height: 40, borderWidth: 4 }}></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="main-content animate-fadeIn">
        {children}
      </main>

      {/* Global Toast Container */}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        {toasts.map(toast => (
          <div key={toast.id} style={{
            background: 'var(--color-bg-card)',
            color: 'var(--color-text)',
            padding: '12px 20px',
            borderRadius: '8px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
            borderLeft: `4px solid ${toast.type === 'success' ? 'var(--color-success)' : 'var(--color-danger)'}`,
            display: 'flex',
            alignItems: 'center',
            minWidth: '250px',
            animation: 'fadeIn 0.3s ease-out forwards'
          }}>
            {toast.type === 'success' ? '✅ ' : '❌ '} {toast.message}
          </div>
        ))}
      </div>
    </>
  );
}
