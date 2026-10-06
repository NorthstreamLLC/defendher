import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface SignupFormProps {
  source: string;
  align?: 'left' | 'center';
  buttonLabel?: string;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function SignupForm({ source, align = 'left', buttonLabel = 'Notify me' }: SignupFormProps) {
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');
  const justify = align === 'center' ? 'center' : 'flex-start';

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = email.trim();
    if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }
    setStatus('loading');
    setMessage('');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: value, source, website }),
        signal: AbortSignal.timeout(20000),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus('success');
      } else if (data?.error === 'invalid_email') {
        setStatus('error');
        setMessage('That email doesn’t look right. Please check it and try again.');
      } else {
        throw new Error('failed');
      }
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again, or email Defendhersports@gmail.com.');
    }
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        style={{ display: 'inline-flex', alignItems: 'center', border: '2px solid #e8ff3a', borderRadius: '9999px', padding: '14px 28px', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#e8ff3a' }}
      >
        You&rsquo;re on the list. We&rsquo;ll be in touch.
      </div>
    );
  }

  return (
    <div>
      <form
        onSubmit={onSubmit}
        noValidate
        aria-label="Launch notification signup"
        style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', justifyContent: justify }}
      >
        <input
          type="text"
          name="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          aria-label="Email address"
          autoComplete="email"
          style={{ background: 'rgba(255,255,255,0.08)', border: '2px solid #3d3d3d', borderRadius: '9999px', padding: '14px 24px', fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#ffffff', outline: 'none', minWidth: '240px', flex: '1 1 240px', maxWidth: '340px' }}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#e8ff3a', border: '2px solid #e8ff3a', color: '#1a1a1a', borderRadius: '9999px', padding: '14px 28px', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', cursor: status === 'loading' ? 'wait' : 'pointer', whiteSpace: 'nowrap', opacity: status === 'loading' ? 0.7 : 1 }}
        >
          {status === 'loading' ? 'Joining...' : buttonLabel} <ArrowRight size={15} />
        </button>
      </form>
      {status === 'error' && message && (
        <p role="alert" style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: '#ff8a8a', margin: '12px 0 0', textAlign: align }}>
          {message}
        </p>
      )}
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: '#8a8a8a', lineHeight: 1.5, margin: '14px 0 0', maxWidth: '52ch', textAlign: align, marginLeft: align === 'center' ? 'auto' : 0, marginRight: align === 'center' ? 'auto' : 0 }}>
        We&rsquo;ll only email you about the launch. Unsubscribe any time. See our{' '}
        <Link to="/privacy" style={{ color: '#d4d4d4' }}>Privacy Policy</Link>.
      </p>
    </div>
  );
}
