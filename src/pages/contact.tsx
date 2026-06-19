import { useState } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';

const site = 'https://defendhersport.net';

export default function ContactPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <Helmet>
        <title>Contact — DefendHer Sport</title>
        <meta name="description" content="Get in touch with DefendHer Sport. Questions, wholesale inquiries, or just want to say hi — we'd love to hear from you." />
        <link rel="canonical" href={`${site}/contact`} />
      </Helmet>

      <div style={{ paddingTop: '64px', minHeight: '100vh', background: '#1a1a1a' }}>

        {/* Header */}
        <div style={{ padding: 'clamp(64px, 8vw, 120px) clamp(24px, 6vw, 96px) 48px', borderBottom: '1px solid #3d3d3d' }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#8a8a8a', display: 'block', marginBottom: '16px' }}>
            Contact
          </span>
          <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.05, letterSpacing: '-0.02em', margin: 0 }}>
            Let's talk.
          </h1>
        </div>

        {/* Info + Form */}
        <div style={{ padding: 'clamp(48px, 6vw, 96px) clamp(24px, 6vw, 96px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '64px', maxWidth: '1100px', borderBottom: '1px solid #3d3d3d' }}>

          {/* Contact details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {[
              { label: 'Email', value: 'hello@defendhersport.net', href: 'mailto:hello@defendhersport.net' },
              { label: 'Address', value: '123 Placeholder St\n[City, Province, Postal Code]\nCanada', href: null },
              { label: 'Hours', value: 'Monday – Friday\n9am – 5pm CT', href: null },
            ].map(({ label, value, href }) => (
              <div key={label}>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--volt-primary, #e8ff3a)', display: 'block', marginBottom: '10px' }}>
                  {label}
                </span>
                {href ? (
                  <a href={href} style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: '#d4d4d4', textDecoration: 'none', lineHeight: 1.6 }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#d4d4d4')}
                  >
                    {value}
                  </a>
                ) : (
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: '#d4d4d4', margin: 0, lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                    {value}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Contact form */}
          <div>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--volt-primary, #e8ff3a)', display: 'block', marginBottom: '24px' }}>
              Send a Message
            </span>
            <form
              onSubmit={e => { e.preventDefault(); alert('Message sent! (Form not wired up yet)'); }}
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              {['Name', 'Email'].map(field => (
                <input
                  key={field}
                  type={field === 'Email' ? 'email' : 'text'}
                  placeholder={field}
                  required
                  style={{ background: '#2a2a2a', border: '1px solid #3d3d3d', borderRadius: '6px', padding: '14px 16px', fontFamily: 'var(--font-sans)', fontSize: '15px', color: '#ffffff', outline: 'none', width: '100%', boxSizing: 'border-box' }}
                />
              ))}
              <textarea
                placeholder="Your message"
                required
                rows={5}
                style={{ background: '#2a2a2a', border: '1px solid #3d3d3d', borderRadius: '6px', padding: '14px 16px', fontFamily: 'var(--font-sans)', fontSize: '15px', color: '#ffffff', outline: 'none', resize: 'vertical', width: '100%', boxSizing: 'border-box' }}
              />
              <button
                type="submit"
                style={{ background: 'var(--volt-primary, #e8ff3a)', color: '#1a1a1a', border: 'none', borderRadius: '9999px', padding: '14px 32px', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer', alignSelf: 'flex-start' }}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Newsletter */}
        <div style={{ padding: 'clamp(48px, 6vw, 96px) clamp(24px, 6vw, 96px)' }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--volt-primary, #e8ff3a)', display: 'block', marginBottom: '16px' }}>
            Newsletter
          </span>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '20px', fontWeight: 700, color: '#ffffff', margin: '0 0 24px' }}>
            Stay in the loop.
          </p>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', color: '#8a8a8a', margin: '0 0 24px', maxWidth: '400px' }}>
            New products, launch updates, and stories from the ice. No spam, ever.
          </p>
          {submitted ? (
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', color: 'var(--volt-primary, #e8ff3a)', fontWeight: 700 }}>
              You're in. Talk soon.
            </p>
          ) : (
            <form
              onSubmit={e => { e.preventDefault(); setSubmitted(true); }}
              style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}
            >
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                style={{ background: '#2a2a2a', border: '1px solid #3d3d3d', borderRadius: '9999px', padding: '14px 24px', fontFamily: 'var(--font-sans)', fontSize: '15px', color: '#ffffff', outline: 'none', minWidth: '260px', flexGrow: 1, maxWidth: '400px' }}
              />
              <button
                type="submit"
                style={{ background: 'var(--volt-primary, #e8ff3a)', color: '#1a1a1a', border: 'none', borderRadius: '9999px', padding: '14px 28px', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer', whiteSpace: 'nowrap' }}
              >
                Subscribe
              </button>
            </form>
          )}
        </div>

      </div>
    </>
  );
}
