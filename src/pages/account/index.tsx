import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from '@dr.pogodin/react-helmet';
import {
  login,
  register,
  logout,
  getStoredCustomer,
  getSessionId,
  type Customer,
} from '@/lib/auth-client';

const site = 'https://defendhersport.net';

const inputStyle: React.CSSProperties = {
  background: '#2e2e2e',
  border: '1px solid #3d3d3d',
  borderRadius: '2px',
  color: '#ffffff',
  fontFamily: 'var(--font-sans)',
  fontSize: '16px',
  padding: '12px 16px',
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '12px',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  color: '#d4d4d4',
};

export default function AccountPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    const stored = getStoredCustomer();
    const sessionId = getSessionId();
    if (stored && sessionId) {
      setCustomer(stored);
    }
    setLoading(false);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      if (mode === 'login') {
        const { customer: c } = await login(email, password);
        setCustomer(c);
      } else {
        if (!firstName || !lastName) {
          setError('First and last name are required');
          setSubmitting(false);
          return;
        }
        const { customer: c } = await register({ email, password, firstName, lastName });
        setCustomer(c);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleLogout() {
    await logout();
    setCustomer(null);
    setEmail('');
    setPassword('');
  }

  if (loading) {
    return (
      <div style={{ paddingTop: '64px', minHeight: '100vh', background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', color: '#8a8a8a', textTransform: 'uppercase' }}>Loading...</div>
      </div>
    );
  }

  if (customer) {
    return (
      <>
        <Helmet>
          <title>My Account — DefendHer Sport</title>
          <meta name="description" content="Manage your DefendHer account." />
          <link rel="canonical" href={`${site}/account`} />
          <meta name="robots" content="noindex" />
        </Helmet>
        <div style={{ paddingTop: '64px', minHeight: '100vh', background: '#1a1a1a' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', padding: 'clamp(48px, 6vw, 80px) 48px' }}>

            {/* Greeting */}
            <div style={{ marginBottom: '48px' }}>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#8a8a8a', marginBottom: '8px' }}>
                Welcome back
              </div>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(48px, 7vw, 80px)', fontWeight: 400, letterSpacing: '0.01em', lineHeight: 0.85, color: '#ffffff', textTransform: 'uppercase', margin: '0 0 12px' }}>
                {customer.firstName.toUpperCase()} {customer.lastName.toUpperCase()}
              </h1>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#8a8a8a' }}>{customer.email}</div>
            </div>

            {/* Quick links */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2px', background: '#3d3d3d', border: '1px solid #3d3d3d', marginBottom: '48px' }}>
              {[
                { href: '/account/orders', label: 'ORDER HISTORY', desc: 'Track and manage your orders' },
                { href: '/shop', label: 'SHOP', desc: 'Browse our products' },
              ].map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  style={{ background: '#2e2e2e', padding: '28px 24px', textDecoration: 'none', display: 'block' }}
                >
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', color: '#e8ff3a', textTransform: 'uppercase', letterSpacing: '0.01em', marginBottom: '8px' }}>{item.label}</div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: '#8a8a8a' }}>{item.desc}</div>
                </Link>
              ))}
            </div>

            {/* Account details */}
            <div style={{ borderTop: '1px solid #3d3d3d', paddingTop: '32px', marginBottom: '32px' }}>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#8a8a8a', marginBottom: '16px' }}>Account Details</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {[
                  { label: 'Name', value: `${customer.firstName} ${customer.lastName}` },
                  { label: 'Email', value: customer.email },
                  { label: 'Phone', value: customer.phone || '—' },
                  { label: 'Member since', value: new Date(customer.createdAt).toLocaleDateString('en-CA', { year: 'numeric', month: 'long' }) },
                ].map((field) => (
                  <div key={field.label}>
                    <div style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#8a8a8a', marginBottom: '4px' }}>{field.label}</div>
                    <div style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#d4d4d4' }}>{field.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleLogout}
              style={{ background: 'none', border: 'none', color: '#8a8a8a', fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer', padding: 0 }}
            >
              Sign Out →
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{mode === 'login' ? 'Sign In' : 'Create Account'} — DefendHer Sport</title>
        <meta name="description" content="Sign in or create your DefendHer account." />
        <link rel="canonical" href={`${site}/account`} />
        <meta name="robots" content="noindex" />
      </Helmet>

      <div style={{ paddingTop: '64px', minHeight: '100vh', background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px' }}>
        <div style={{ width: '100%', maxWidth: '440px' }}>

          {/* Toggle */}
          <div style={{ display: 'flex', marginBottom: '40px', border: '1px solid #3d3d3d', borderRadius: '2px', overflow: 'hidden' }}>
            {(['login', 'register'] as const).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(''); }}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: mode === m ? '#e8ff3a' : 'transparent',
                  border: 'none',
                  color: mode === m ? '#1a1a1a' : '#8a8a8a',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 700,
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                  transition: 'all 150ms',
                }}
              >
                {m === 'login' ? 'SIGN IN' : 'CREATE ACCOUNT'}
              </button>
            ))}
          </div>

          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(48px, 8vw, 72px)', fontWeight: 400, letterSpacing: '0.01em', lineHeight: 0.85, color: '#ffffff', textTransform: 'uppercase', margin: '0 0 40px' }}>
            {mode === 'login' ? 'SIGN IN' : 'JOIN US'}
          </h1>

          {error && (
            <div style={{ background: 'rgba(255,60,60,0.1)', border: '1px solid rgba(255,60,60,0.4)', borderRadius: '2px', padding: '12px 16px', marginBottom: '20px', fontFamily: 'var(--font-sans)', fontSize: '13px', color: '#ff6b6b' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} noValidate>
            {mode === 'register' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={labelStyle} htmlFor="acc-first">First name *</label>
                  <input id="acc-first" type="text" required autoComplete="given-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} style={inputStyle} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={labelStyle} htmlFor="acc-last">Last name *</label>
                  <input id="acc-last" type="text" required autoComplete="family-name" value={lastName} onChange={(e) => setLastName(e.target.value)} style={inputStyle} />
                </div>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={labelStyle} htmlFor="acc-email">Email *</label>
              <input id="acc-email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={labelStyle} htmlFor="acc-password">Password {mode === 'register' ? '(min 8 chars) *' : '*'}</label>
              <input id="acc-password" type="password" required autoComplete={mode === 'login' ? 'current-password' : 'new-password'} value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} />
            </div>

            <button
              type="submit"
              disabled={submitting}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                border: '2px solid #e8ff3a',
                color: submitting ? '#8a8a8a' : '#e8ff3a',
                borderColor: submitting ? '#3d3d3d' : '#e8ff3a',
                borderRadius: '9999px',
                padding: '16px 32px',
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                cursor: submitting ? 'not-allowed' : 'pointer',
                width: '100%',
                marginTop: '8px',
                transition: 'all 150ms',
              }}
            >
              {submitting ? 'PLEASE WAIT...' : mode === 'login' ? 'SIGN IN' : 'CREATE ACCOUNT'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
