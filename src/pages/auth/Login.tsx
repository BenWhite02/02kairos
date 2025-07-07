// =============================================================================
// KAIROS FRONTEND - INLINE STYLES LOGIN (NO CSS CLASSES)
// =============================================================================
// Author: Sankhadeep Banerjee
// Project: Kairos - Marketing Decisioning Solution
// File: src/pages/auth/Login.tsx
// =============================================================================

import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#0a0a0a',
    display: 'flex',
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    color: '#ffffff',
    backgroundImage: `
      radial-gradient(circle at 20% 80%, rgba(0, 217, 255, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 107, 157, 0.15) 0%, transparent 50%)
    `
  },
  leftSide: {
    display: 'none',
    width: '50%',
    position: 'relative' as const,
    '@media (min-width: 1024px)': {
      display: 'flex'
    }
  },
  leftContent: {
    padding: '3rem',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center'
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1.5rem'
  },
  logo: {
    width: '4rem',
    height: '4rem',
    borderRadius: '1rem',
    background: 'linear-gradient(135deg, #00d9ff, #ff6b9d)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: 'bold'
  },
  brandTitle: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #00d9ff, #ff6b9d)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '0.5rem',
    margin: 0
  },
  brandSubtitle: {
    fontSize: '1.125rem',
    color: '#9ca3af',
    margin: 0
  },
  brandDescription: {
    fontSize: '1.25rem',
    color: '#d1d5db',
    lineHeight: '1.6',
    marginBottom: '2rem'
  },
  rightSide: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    position: 'relative' as const
  },
  formContainer: {
    width: '100%',
    maxWidth: '28rem'
  },
  mobileLogoContainer: {
    textAlign: 'center' as const,
    marginBottom: '2rem',
    display: 'block'
  },
  mobileLogo: {
    width: '3rem',
    height: '3rem',
    borderRadius: '0.75rem',
    background: 'linear-gradient(135deg, #00d9ff, #ff6b9d)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1rem',
    color: 'white',
    fontSize: '1.25rem'
  },
  mobileBrandTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #00d9ff, #ff6b9d)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '0.5rem',
    margin: '0 0 0.5rem 0'
  },
  card: {
    background: 'rgba(17, 17, 17, 0.8)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '1rem',
    padding: '2rem'
  },
  cardTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: '0.5rem',
    textAlign: 'center' as const,
    margin: '0 0 0.5rem 0'
  },
  cardSubtitle: {
    color: '#9ca3af',
    textAlign: 'center' as const,
    marginBottom: '2rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1.5rem'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column' as const
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#d1d5db',
    marginBottom: '0.5rem'
  },
  input: {
    width: '100%',
    padding: '0.75rem 1rem',
    backgroundColor: 'rgba(31, 41, 55, 0.5)',
    border: '1px solid #374151',
    borderRadius: '0.75rem',
    color: '#f3f4f6',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s'
  },
  inputFocus: {
    borderColor: '#00d9ff',
    boxShadow: '0 0 0 2px rgba(0, 217, 255, 0.2)'
  },
  passwordContainer: {
    position: 'relative' as const
  },
  passwordToggle: {
    position: 'absolute' as const,
    right: '0.75rem',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: '#9ca3af',
    cursor: 'pointer',
    padding: '0.25rem'
  },
  demoNotice: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    border: '1px solid rgba(59, 130, 246, 0.2)',
    borderRadius: '0.5rem',
    padding: '0.75rem'
  },
  demoTitle: {
    fontSize: '0.75rem',
    color: '#60a5fa',
    fontWeight: '600',
    marginBottom: '0.25rem',
    margin: '0 0 0.25rem 0'
  },
  demoText: {
    fontSize: '0.75rem',
    color: '#93c5fd',
    margin: 0
  },
  submitButton: {
    width: '100%',
    background: 'linear-gradient(135deg, #00d9ff, #ff6b9d)',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.75rem',
    border: 'none',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
    fontSize: '1rem'
  },
  submitButtonHover: {
    opacity: 0.9
  },
  submitButtonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed'
  },
  footer: {
    marginTop: '1.5rem',
    paddingTop: '1.5rem',
    borderTop: '1px solid #374151',
    textAlign: 'center' as const
  },
  footerLink: {
    fontSize: '0.875rem',
    color: '#9ca3af',
    textDecoration: 'none',
    display: 'block',
    marginBottom: '0.5rem'
  },
  footerText: {
    fontSize: '0.75rem',
    color: '#6b7280',
    margin: 0
  },
  primaryLink: {
    color: '#00d9ff',
    textDecoration: 'none'
  },
  securityNotice: {
    marginTop: '1.5rem',
    textAlign: 'center' as const
  },
  securityText: {
    fontSize: '0.75rem',
    color: '#6b7280',
    margin: 0
  }
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, isAuthenticated } = useAuth();

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      
      if (success) {
        // Navigation will be handled by the auth context
      } else {
        alert('Login failed. Please try again.');
      }
    } catch (error) {
      alert('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Left Side - Branding (Desktop Only) */}
      <div style={{...styles.leftSide, display: window.innerWidth >= 1024 ? 'flex' : 'none'}}>
        <div style={styles.leftContent}>
          {/* Logo & Brand */}
          <div style={{marginBottom: '2rem'}}>
            <div style={styles.logoContainer}>
              <div style={styles.logo}>⏰</div>
              <div>
                <h1 style={styles.brandTitle}>Kairos</h1>
                <p style={styles.brandSubtitle}>Marketing Decisioning Solution</p>
              </div>
            </div>
            <p style={styles.brandDescription}>
              Deliver the perfect moment with AI-powered marketing decisions that understand timing, context, and customer intent.
            </p>
          </div>

          {/* Features */}
          <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
            {[
              {emoji: '⚡', title: 'Lightning Fast', desc: 'Sub-second decision making for perfect timing'},
              {emoji: '🧪', title: 'EligibilityAtoms™', desc: 'Reusable decision components for precise targeting'},
              {emoji: '🛡️', title: 'Enterprise Security', desc: 'Bank-grade security with multi-tenant isolation'}
            ].map((feature, index) => (
              <div key={index} style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                <div style={{
                  width: '3rem',
                  height: '3rem',
                  borderRadius: '0.75rem',
                  backgroundColor: 'rgba(31, 41, 55, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem'
                }}>
                  {feature.emoji}
                </div>
                <div>
                  <h3 style={{color: '#ffffff', fontWeight: '600', marginBottom: '0.25rem', margin: '0 0 0.25rem 0'}}>
                    {feature.title}
                  </h3>
                  <p style={{color: '#9ca3af', margin: 0}}>{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div style={{...styles.rightSide, width: window.innerWidth >= 1024 ? '50%' : '100%'}}>
        <div style={styles.formContainer}>
          {/* Mobile Logo */}
          <div style={{...styles.mobileLogoContainer, display: window.innerWidth >= 1024 ? 'none' : 'block'}}>
            <div style={styles.mobileLogo}>⏰</div>
            <h1 style={styles.mobileBrandTitle}>Kairos</h1>
            <p style={{color: '#9ca3af', margin: 0}}>Marketing Decisioning Solution</p>
          </div>

          {/* Login Card */}
          <div style={styles.card}>
            <div style={{textAlign: 'center', marginBottom: '2rem'}}>
              <h2 style={styles.cardTitle}>Welcome Back</h2>
              <p style={styles.cardSubtitle}>Sign in to your Kairos account</p>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
              {/* Email Field */}
              <div style={styles.inputGroup}>
                <label htmlFor="email" style={styles.label}>Email Address</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={styles.input}
                  placeholder="you@company.com"
                  disabled={isLoading}
                  required
                />
              </div>

              {/* Password Field */}
              <div style={styles.inputGroup}>
                <label htmlFor="password" style={styles.label}>Password</label>
                <div style={styles.passwordContainer}>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{...styles.input, paddingRight: '3rem'}}
                    placeholder="Enter your password"
                    disabled={isLoading}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={styles.passwordToggle}
                    disabled={isLoading}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              {/* Demo Credentials */}
              <div style={styles.demoNotice}>
                <p style={styles.demoTitle}>Demo Mode</p>
                <p style={styles.demoText}>Use any email and password to log in</p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  ...styles.submitButton,
                  ...(isLoading ? styles.submitButtonDisabled : {})
                }}
              >
                {isLoading ? 'Signing in...' : 'Sign In →'}
              </button>
            </form>

            {/* Footer Links */}
            <div style={styles.footer}>
              <a href="#" style={styles.footerLink}>Forgot your password?</a>
              <p style={styles.footerText}>
                Don't have an account?{' '}
                <a href="#" style={styles.primaryLink}>Contact Sales</a>
              </p>
            </div>
          </div>

          {/* Security Notice */}
          <div style={styles.securityNotice}>
            <p style={styles.securityText}>Protected by enterprise-grade security</p>
          </div>
        </div>
      </div>
    </div>
  );
}