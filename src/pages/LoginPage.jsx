import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword } from '../utils/helpers';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');
    if (!validateEmail(email)) {
      setFormError('Please enter a valid email.');
      return;
    }
    if (!validatePassword(password)) {
      setFormError('Password must be at least 6 characters.');
      return;
    }
    dispatch(loginStart());
    setTimeout(() => {
      if (email === 'user@example.com' && password === 'password') {
        dispatch(loginSuccess({ name: 'Anant Anand', email }));
        navigate('/');
      } else {
        dispatch(loginFailure('Invalid email or password.'));
      }
    }, 1000);
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f7f7f7', width: '100vw' }}>
      <div style={{ width: '100%', maxWidth: 350, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #e5e7eb', padding: 32 }}>
        <h2 style={{ fontWeight: 700, marginBottom: 16, textAlign: 'center', fontSize: 22 }}>Login to Your Account</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Email</label>
            <input
              type="email"
              style={{ width: '100%', maxWidth: 300, padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 15, marginBottom: 2 }}
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="user@example.com"
              autoComplete="email"
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 6, fontWeight: 500 }}>Password</label>
            <input
              type="password"
              style={{ width: '100%', maxWidth: 300, padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 15, marginBottom: 2 }}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>
          {(formError || error) && (
            <div style={{ color: '#ef4444', fontSize: 14, marginBottom: 8 }}>{formError || error}</div>
          )}
          <button
            type="submit"
            style={{ width: '100%', background: '#2563eb', color: '#fff', padding: '12px 0', borderRadius: 8, fontWeight: 600, fontSize: 16, border: 'none', marginTop: 8, cursor: 'pointer' }}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div style={{ marginTop: 16, textAlign: 'center', color: '#888', fontSize: 14 }}>
          <p>Demo: <span style={{ fontFamily: 'monospace' }}>user@example.com</span> / <span style={{ fontFamily: 'monospace' }}>password</span></p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage; 