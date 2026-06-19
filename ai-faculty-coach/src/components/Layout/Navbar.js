'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useApp } from '@/context/AppContext';
import { NAV_LINKS } from '@/lib/constants';
import { useState, useRef, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { unreadCount, notifications, markNotificationRead, setSidebarOpen, sidebarOpen } = useApp();
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotif(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfile(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const visibleLinks = NAV_LINKS.filter(l => l.roles.includes(user?.role));

  return (
    <nav className="navbar" id="main-navbar">
      <div className="navbar-brand">
        <button className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle menu">
          ☰
        </button>
        <div className="navbar-logo">🎓</div>
        <Link href="/dashboard" className="navbar-title" style={{textDecoration:'none'}}>
          AI Faculty <span>Coach</span>
        </Link>
      </div>

      <ul className="navbar-nav">
        {visibleLinks.map(link => (
          <li key={link.href}>
            <Link href={link.href} className={pathname === link.href ? 'active' : ''}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="navbar-actions">
        {/* Notifications */}
        <div ref={notifRef} style={{ position: 'relative' }}>
          <button className="notification-bell" onClick={() => setShowNotif(!showNotif)} id="notification-bell">
            🔔
            {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
          </button>
          {showNotif && (
            <div style={{
              position: 'absolute', right: 0, top: '100%', marginTop: 8,
              width: 340, background: 'white', borderRadius: 'var(--radius-card)',
              boxShadow: 'var(--shadow-elevated)', border: '1px solid var(--color-border-light)',
              zIndex: 100, animation: 'slideDown 0.2s ease', overflow: 'hidden'
            }}>
              <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--color-border-light)', fontWeight: 600, fontSize: 14 }}>
                Notifications
              </div>
              {notifications.map(n => (
                <div key={n.id}
                  onClick={() => markNotificationRead(n.id)}
                  style={{
                    padding: '12px 18px', borderBottom: '1px solid var(--color-border-light)',
                    cursor: 'pointer', background: n.read ? 'white' : 'rgba(212,165,55,0.04)',
                    transition: 'background 0.15s'
                  }}
                >
                  <div style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--color-text)' }}>{n.message}</div>
                  <div style={{ fontSize: 11, color: 'var(--color-text-muted)', marginTop: 4 }}>{n.time}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile */}
        <div ref={profileRef} style={{ position: 'relative' }}>
          <div className="user-avatar" onClick={() => setShowProfile(!showProfile)} id="user-avatar">
            {user?.avatar || 'U'}
          </div>
          {showProfile && (
            <div style={{
              position: 'absolute', right: 0, top: '100%', marginTop: 8,
              width: 220, background: 'white', borderRadius: 'var(--radius-card)',
              boxShadow: 'var(--shadow-elevated)', border: '1px solid var(--color-border-light)',
              zIndex: 100, animation: 'slideDown 0.2s ease', overflow: 'hidden'
            }}>
              <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--color-border-light)' }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{user?.name}</div>
                <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>{user?.email}</div>
                <span className={`role-badge ${user?.role}`} style={{ marginTop: 6, display: 'inline-flex' }}>
                  {user?.role}
                </span>
              </div>
              <Link href="/profile" style={{ display: 'block', padding: '10px 18px', fontSize: 14, color: 'var(--color-text)' }}>
                👤 My Profile
              </Link>
              <Link href="/settings" style={{ display: 'block', padding: '10px 18px', fontSize: 14, color: 'var(--color-text)' }}>
                ⚙️ Settings
              </Link>
              <button onClick={logout} style={{
                display: 'block', width: '100%', textAlign: 'left', padding: '10px 18px',
                fontSize: 14, color: 'var(--color-danger)', borderTop: '1px solid var(--color-border-light)',
                background: 'none', border: 'none', cursor: 'pointer'
              }}>
                🚪 Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
