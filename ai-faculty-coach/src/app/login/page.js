'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { INSTITUTION, TAGLINE } from '@/lib/constants';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    
    if (!email.toLowerCase().endsWith('.edu.in')) {
      setError('Please use your institutional email address ending with .edu.in.');
      return;
    }

    setLoading(true);
    const result = await login(email, password);
    
    if (result.success) {
      router.push('/dashboard');
    } else {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <div className="login-container animate-fadeIn">
      {/* Left Brand Panel */}
      <div className="login-brand">
        <div className="login-brand-content">
          <div className="login-logo">🎓</div>
          <h1>AI Faculty <span>Coach</span></h1>
          <div className="login-tagline">{TAGLINE}</div>
          
          <div className="feature-pills">
            <div className="feature-pill">
              <span className="pill-icon">🎯</span>
              AI-Powered Lesson Evaluation
            </div>
            <div className="feature-pill">
              <span className="pill-icon">📊</span>
              Quality Analytics Dashboard
            </div>
            <div className="feature-pill">
              <span className="pill-icon">🔒</span>
              Role-Based Secure Access
            </div>
          </div>
        </div>
        
        <div className="login-institution">
          {INSTITUTION} • Internal Platform
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="login-form-panel">
        <div className="login-form-card animate-scaleIn">
          <h2>Welcome Back</h2>
          <div className="subtitle">Sign in to your faculty account</div>

          {error && (
            <div className="alert alert-error mb-lg">
              <span className="icon">⚠</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email Address <span className="required">*</span></label>
              <input 
                type="email" 
                className={`form-input ${error && !email ? 'error' : ''}`}
                placeholder="name@gowthami.edu.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password <span className="required">*</span></label>
              <div className="password-wrapper">
                <input 
                  type="password" 
                  className={`form-input ${error && !password ? 'error' : ''}`}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>
            </div>

            <div className="login-remember-row">
              <label className="form-check">
                <input type="checkbox" defaultChecked />
                <span style={{fontSize: 14}}>Remember me</span>
              </label>
              <Link href="/forgot-password" style={{fontSize: 13, fontWeight: 600}}>
                Forgot password?
              </Link>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-full btn-lg"
              disabled={loading}
            >
              {loading ? (
                <><div className="spinner"></div> Signing in...</>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="login-footer-text">
            Don't have an account? <Link href="/register">Register here</Link>
          </div>
          
          <div style={{marginTop: 20, padding: 12, background: 'rgba(212,165,55,0.1)', borderRadius: 8, fontSize: 12, border: '1px solid rgba(212,165,55,0.2)'}}>
            <strong style={{color: 'var(--color-primary)'}}>Demo Credentials:</strong><br/>
            Teacher: priya@gowthami.edu.in / pw: password<br/>
            HOD: rajesh@gowthami.edu.in / pw: password<br/>
            Admin: admin@gowthami.edu.in / pw: password
          </div>
        </div>
      </div>
    </div>
  );
}
