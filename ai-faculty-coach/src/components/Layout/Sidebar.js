'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useApp } from '@/context/AppContext';
import { NAV_LINKS, INSTITUTION } from '@/lib/constants';

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const { sidebarOpen, setSidebarOpen } = useApp();

  const visibleLinks = NAV_LINKS.filter(l => l.roles.includes(user?.role));

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 890,
          }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-section mt-md">
          <div className="sidebar-label">Main Menu</div>
          <ul className="sidebar-nav">
            {visibleLinks.map(link => (
              <li key={link.href}>
                <Link 
                  href={link.href} 
                  className={pathname === link.href ? 'active' : ''}
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="icon">{link.icon}</span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="sidebar-section">
          <div className="sidebar-label">User Options</div>
          <ul className="sidebar-nav">
            <li>
              <Link 
                href="/profile" 
                className={pathname === '/profile' ? 'active' : ''}
                onClick={() => setSidebarOpen(false)}
              >
                <span className="icon">👤</span> My Profile
              </Link>
            </li>
            <li>
              <Link 
                href="/settings" 
                className={pathname === '/settings' ? 'active' : ''}
                onClick={() => setSidebarOpen(false)}
              >
                <span className="icon">⚙️</span> Settings
              </Link>
            </li>
          </ul>
        </div>

        <div className="sidebar-footer">
          <p>Logged in as: <span style={{color: 'white', fontWeight: 500}}>{user?.role}</span></p>
          <div className="institution mt-sm">{INSTITUTION}</div>
          <p className="mt-sm" style={{fontSize: 10, opacity: 0.3}}>App v1.0.0 (2026)</p>
        </div>
      </aside>
    </>
  );
}
