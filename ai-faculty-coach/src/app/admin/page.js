'use client';
import { useState, useEffect } from 'react';
import AppLayout from '@/components/Layout/AppLayout';
import { generateMockAdminData } from '@/lib/mockAI';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const { user } = useAuth();
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState('users');
  const [data, setData] = useState(null);

  useEffect(() => {
    // Basic protection - in real app, server would verify
    if (user && user.role !== 'admin') {
      router.push('/dashboard');
    } else {
      setData(generateMockAdminData());
    }
  }, [user, router]);

  if (!data) return (
    <AppLayout>
      <div className="flex-center" style={{height: '100vh'}}>
        <div className="spinner" style={{borderColor: 'var(--color-primary)', borderTopColor: 'transparent', width: 40, height: 40, borderWidth: 4}}></div>
      </div>
    </AppLayout>
  );

  return (
    <AppLayout>
      <div className="page-header mb-md flex-between">
        <div>
          <h1>System Administration</h1>
          <p>Manage users, prompts, templates, and system settings.</p>
        </div>
      </div>

      <div className="tabs">
        <button className={`tab ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>User Management</button>
        <button className={`tab ${activeTab === 'prompts' ? 'active' : ''}`} onClick={() => setActiveTab('prompts')}>Prompt Manager</button>
        <button className={`tab ${activeTab === 'templates' ? 'active' : ''}`} onClick={() => setActiveTab('templates')}>Template Presets</button>
        <button className={`tab ${activeTab === 'reports' ? 'active' : ''}`} onClick={() => setActiveTab('reports')}>Quality Reports</button>
        <button className={`tab ${activeTab === 'logs' ? 'active' : ''}`} onClick={() => setActiveTab('logs')}>System Logs</button>
        <button className={`tab ${activeTab === 'dept' ? 'active' : ''}`} onClick={() => setActiveTab('dept')}>Dept Structure</button>
      </div>

      <div className="card">
        {/* User Management Tab */}
        {activeTab === 'users' && (
          <div>
            <div className="card-header">
              <h3>Faculty & Staff Accounts</h3>
              <div style={{display: 'flex', gap: 8}}>
                <input type="text" className="form-input" placeholder="Search users..." style={{width: 250, padding: '8px 12px'}} />
                <button className="btn btn-primary btn-sm">+ Add User</button>
              </div>
            </div>
            <div className="card-body" style={{padding: 0}}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Role</th>
                    <th>Department</th>
                    <th>Status</th>
                    <th>Last Active</th>
                    <th style={{textAlign: 'right'}}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.users.map(u => (
                    <tr key={u.id}>
                      <td>
                        <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                          <div style={{width: 32, height: 32, borderRadius: '50%', background: 'var(--color-gold-light)', color: 'var(--color-gold-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 'bold'}}>
                            {u.avatar}
                          </div>
                          <div>
                            <div style={{fontWeight: 500}}>{u.name}</div>
                            <div style={{fontSize: 12, color: 'var(--color-text-muted)'}}>{u.email}</div>
                          </div>
                        </div>
                      </td>
                      <td><span className={`role-badge ${u.role}`}>{u.role}</span></td>
                      <td style={{fontSize: 13, color: 'var(--color-text-muted)'}}>{u.department}</td>
                      <td>
                        <div className={`toggle-switch ${u.status === 'active' ? 'active' : ''}`}></div>
                      </td>
                      <td style={{fontSize: 13, color: 'var(--color-text-muted)'}}>{u.lastActive}</td>
                      <td style={{textAlign: 'right'}}>
                        <button className="btn btn-ghost" title="Edit">✏️</button>
                        <button className="btn btn-ghost" title="Reset Password">🔑</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Prompt Manager Tab */}
        {activeTab === 'prompts' && (
          <div>
            <div className="card-header">
              <h3>AI Prompt Versions</h3>
              <button className="btn btn-primary btn-sm">+ New Version</button>
            </div>
            <div className="card-body" style={{padding: 0}}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Version</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Description</th>
                    <th>Avg Tokens</th>
                    <th style={{textAlign: 'right'}}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.promptVersions.map(p => (
                    <tr key={p.version}>
                      <td style={{fontWeight: 600, color: 'var(--color-primary)'}}>{p.version}</td>
                      <td>
                        {p.status === 'active' ? 
                          <span className="badge badge-green">● Active (Prod)</span> : 
                          <span className="badge" style={{background: '#eee', color: '#666'}}>Archived</span>
                        }
                      </td>
                      <td style={{fontSize: 13, color: 'var(--color-text-muted)'}}>{p.createdAt}</td>
                      <td style={{fontSize: 13}}>{p.description}</td>
                      <td style={{fontSize: 13, color: 'var(--color-text-muted)'}}>~{p.tokens}</td>
                      <td style={{textAlign: 'right'}}>
                        <button className="btn btn-ghost">View Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="card-footer">
              <p className="text-muted" style={{fontSize: 12}}>
                ℹ️ <strong>Note:</strong> Changes to the active prompt template take effect immediately for all new generations. Please test thoroughly in staging first.
              </p>
            </div>
          </div>
        )}

        {/* System Logs Tab */}
        {activeTab === 'logs' && (
          <div>
            <div className="card-header">
              <h3>System Activity Log</h3>
              <div style={{display: 'flex', gap: 8}}>
                <select className="form-input form-select" style={{padding: '8px 12px'}}>
                  <option>All Events</option>
                  <option>API Calls</option>
                  <option>Auth Events</option>
                  <option>Errors</option>
                </select>
                <button className="btn btn-outline btn-sm">Export</button>
              </div>
            </div>
            <div className="card-body" style={{padding: 0}}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Time (Today)</th>
                    <th>Type</th>
                    <th>User / Source</th>
                    <th>Message</th>
                  </tr>
                </thead>
                <tbody>
                  {data.systemLogs.map((l, i) => (
                    <tr key={i}>
                      <td style={{fontFamily: 'monospace', fontSize: 13, color: 'var(--color-text-muted)'}}>{l.time}</td>
                      <td>
                        <span className={`badge ${l.type === 'ERROR' ? 'badge-red' : l.type === 'API' ? 'badge-dark' : 'badge-gold'}`}>
                          {l.type}
                        </span>
                      </td>
                      <td style={{fontSize: 13}}>{l.user}</td>
                      <td style={{fontFamily: 'monospace', fontSize: 12, color: l.type === 'ERROR' ? 'var(--color-danger)' : 'var(--color-text)'}}>{l.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Placeholder for other tabs */}
        {['templates', 'reports', 'dept'].includes(activeTab) && (
          <div className="flex-center" style={{height: 300, flexDirection: 'column'}}>
            <div style={{fontSize: 40, marginBottom: 16, opacity: 0.5}}>🛠️</div>
            <h3 className="text-muted">Under Construction</h3>
            <p className="text-muted mt-sm">This section is being built in Phase 2.</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
