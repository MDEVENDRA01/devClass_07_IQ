'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-bg-page)', padding: 24}}>
      <div className="card animate-scaleIn" style={{width: '100%', maxWidth: 440, padding: 40}}>
        <div style={{textAlign: 'center', marginBottom: 32}}>
          <div className="login-logo" style={{margin: '0 auto 16px', width: 56, height: 56, fontSize: 24}}>🔒</div>
          <h2>Reset Password</h2>
        </div>

        {submitted ? (
          <div className="alert alert-success mb-lg" style={{flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: 24}}>
            <div style={{fontSize: 40, marginBottom: 12}}>✉️</div>
            <h3 style={{marginBottom: 8, color: 'var(--color-success)'}}>Check your email</h3>
            <p>We've sent a password reset link to <strong>{email}</strong>.</p>
            <p className="mt-md" style={{fontSize: 13}}>If you don't see it, check your spam folder.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <p className="text-muted mb-lg" style={{textAlign: 'center'}}>
              Enter your registered email address and we'll send you instructions to reset your password.
            </p>
            
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input 
                type="email" 
                className="form-input" 
                placeholder="name@gowthami.edu.in" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required
              />
            </div>

            <button type="submit" className="btn btn-primary btn-full btn-lg mt-md" disabled={loading}>
              {loading ? <><div className="spinner"></div> Sending Link...</> : 'Send Reset Link'}
            </button>
          </form>
        )}

        <div className="login-footer-text mt-lg">
          <Link href="/login">← Back to Sign In</Link>
        </div>
      </div>
    </div>
  );
}
