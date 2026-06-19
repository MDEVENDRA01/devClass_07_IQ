'use client';
import AppLayout from '@/components/Layout/AppLayout';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { useApp } from '@/context/AppContext';

export default function ProfilePage() {
  const { user } = useAuth();
  const { addToast } = useApp();
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      addToast('Profile updated successfully!');
    }, 1000);
  };

  if (!user) return null;

  return (
    <AppLayout>
      <div className="page-header mb-lg">
        <h1>My Profile</h1>
        <p>Manage your account details and personal preferences.</p>
      </div>

      <div className="profile-card mb-lg animate-fadeInUp">
        <div className="profile-avatar-large">
          {user.avatar}
        </div>
        <div style={{flex: 1}}>
          <h2 style={{color: 'var(--color-primary)', marginBottom: 4}}>{user.name}</h2>
          <div className="text-muted" style={{marginBottom: 16}}>{user.email}</div>
          
          <div style={{display: 'flex', gap: 12}}>
            <span className={`role-badge ${user.role}`}>
              {user.role}
            </span>
            <span className="badge badge-dark">
              {user.department} Dept
            </span>
          </div>
        </div>
        <div>
          <button className="btn btn-outline">Change Photo</button>
        </div>
      </div>

      <div className="card animate-fadeInUp" style={{animationDelay: '0.1s'}}>
        <div className="card-header">
          <h3>Personal Information</h3>
        </div>
        <div className="card-body">
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input type="text" className="form-input" defaultValue={user.name} />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input type="email" className="form-input" defaultValue={user.email} disabled style={{background: 'var(--color-bg-page)', opacity: 0.7}} />
              <div className="form-helper">Email cannot be changed directly. Contact IT.</div>
            </div>
          </div>
          
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Phone Number (Optional)</label>
              <input type="tel" className="form-input" placeholder="+91 98765 43210" />
            </div>
            <div className="form-group">
              <label className="form-label">Bio / Focus Area</label>
              <input type="text" className="form-input" placeholder="e.g. Specializing in organic chemistry and practical applications..." />
            </div>
          </div>
        </div>
        <div className="card-footer" style={{display: 'flex', justifyContent: 'flex-end'}}>
          <button className="btn btn-primary" onClick={handleSave} disabled={loading}>
            {loading ? <><div className="spinner"></div> Saving...</> : 'Save Changes'}
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
