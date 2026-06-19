'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { SUBJECTS } from '@/lib/constants';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', instCode: '', department: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { register } = useAuth();

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.name || !formData.email || !formData.password || !formData.instCode) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!formData.email.toLowerCase().endsWith('.edu.in')) {
      setError('Please register with an institutional email address ending with .edu.in.');
      return;
    }
    
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    
    if (formData.instCode !== 'SGI2026') {
      setError('Invalid institution code. Please contact your administrator.');
      return;
    }

    setLoading(true);
    const result = await register(formData);
    
    if (result.success) {
      router.push('/dashboard');
    } else {
      setError('Registration failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-bg-page)', padding: 24}}>
      <div className="card animate-scaleIn" style={{width: '100%', maxWidth: 500, padding: 40}}>
        <div style={{textAlign: 'center', marginBottom: 32}}>
          <div className="login-logo" style={{margin: '0 auto 16px', width: 64, height: 64, fontSize: 28}}>🎓</div>
          <h2>Faculty Registration</h2>
          <p className="text-muted mt-sm">Create your AI Faculty Coach account</p>
        </div>

        {error && (
          <div className="alert alert-error mb-lg">
            <span className="icon">⚠</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name <span className="required">*</span></label>
            <input type="text" name="name" className="form-input" placeholder="Dr. Firstname Lastname" value={formData.name} onChange={handleChange} />
          </div>
          
          <div className="form-group">
            <label className="form-label">Email Address <span className="required">*</span></label>
            <input type="email" name="email" className="form-input" placeholder="name@gowthami.edu.in" value={formData.email} onChange={handleChange} />
          </div>
          
          <div className="form-group">
            <label className="form-label">Department / Subject Area</label>
            <select name="department" className="form-input form-select" value={formData.department} onChange={handleChange}>
              <option value="">Select Department...</option>
              {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Institution Code <span className="required">*</span></label>
            <input type="text" name="instCode" className="form-input" placeholder="Ask your HOD for this code" value={formData.instCode} onChange={handleChange} />
            <div className="form-helper">Demo code: SGI2026</div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Password <span className="required">*</span></label>
            <input type="password" name="password" className="form-input" placeholder="Min 8 characters" value={formData.password} onChange={handleChange} />
          </div>

          <button type="submit" className="btn btn-primary btn-full btn-lg mt-lg" disabled={loading}>
            {loading ? <><div className="spinner"></div> Creating Account...</> : 'Create Account'}
          </button>
        </form>

        <div className="login-footer-text">
          Already have an account? <Link href="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
