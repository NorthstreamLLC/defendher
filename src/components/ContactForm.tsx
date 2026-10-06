import { useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

const field: React.CSSProperties = {
  background: '#2a2a2a',
  border: '1px solid #3d3d3d',
  borderRadius: '6px',
  padding: '14px 16px',
  fontFamily: 'var(--font-sans)',
  fontSize: '15px',
  color: '#ffffff',
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
};

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setStatus('error');
      setError('Please fill in your name, a valid email and a message.');
      return;
    }
    setStatus('loading');
    setError('');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'message', name, email, message, website }),
        signal: AbortSignal.timeout(20000),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error('failed');
      setStatus('success');
    } catch {
      setStatus('error');
      setError('Something went wrong. Please try again, or email Defendhersports@gmail.com.');
    }
  }

  if (status === 'success') {
    return (
      <p role="status" style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', fontWeight: 700, color: '#e8ff3a', lineHeight: 1.6, margin: 0 }}>
        Thanks, your message is in. We&rsquo;ll get back to you soon.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" aria-label="Name" autoComplete="name" style={field} />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" aria-label="Email" autoComplete="email" style={field} />
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Your message" aria-label="Your message" rows={5} style={{ ...field, resize: 'vertical' }} />
      <button
        type="submit"
        disabled={status === 'loading'}
        style={{ background: 'var(--volt-primary, #e8ff3a)', color: '#1a1a1a', border: 'none', borderRadius: '9999px', padding: '14px 32px', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', cursor: status === 'loading' ? 'wait' : 'pointer', alignSelf: 'flex-start', opacity: status === 'loading' ? 0.7 : 1 }}
      >
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
      {status === 'error' && error && (
        <p role="alert" style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: '#ff8a8a', margin: 0 }}>{error}</p>
      )}
    </form>
  );
}
