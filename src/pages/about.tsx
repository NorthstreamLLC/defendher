import { Helmet } from '@dr.pogodin/react-helmet';

const site = 'https://defendhersport.net';

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About — DefendHer Sport</title>
        <meta name="description" content="DefendHer Sport was founded to build protective gear designed specifically for female hockey players." />
        <link rel="canonical" href={`${site}/about`} />
      </Helmet>

      <div style={{ paddingTop: '64px', minHeight: '100vh', background: '#1a1a1a' }}>

        {/* Hero */}
        <div style={{ padding: 'clamp(64px, 8vw, 120px) clamp(24px, 6vw, 96px)', borderBottom: '1px solid #3d3d3d', maxWidth: '900px' }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#8a8a8a', display: 'block', marginBottom: '16px' }}>
            About
          </span>
          <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 24px' }}>
            Built for her.<br />From the ground up.
          </h1>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(16px, 2vw, 20px)', color: '#a0a0a0', lineHeight: 1.7, margin: 0, maxWidth: '620px' }}>
            DefendHer Sport exists because no one else was doing it. Every piece of protective hockey equipment on the market was designed for men — then scaled down and called "women's." We're changing that.
          </p>
        </div>

        {/* Mission */}
        <div style={{ padding: 'clamp(48px, 6vw, 96px) clamp(24px, 6vw, 96px)', borderBottom: '1px solid #3d3d3d', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '48px', maxWidth: '1200px' }}>
          {[
            { label: 'Our Mission', body: 'To design protective gear that actually fits the female body — engineered from scratch, not shrunk from men\'s templates. Every decision we make starts with the female athlete.' },
            { label: 'Our Standard', body: 'CE Level 1 certified protection in every product we ship. That\'s not a marketing claim — it\'s a minimum threshold. If it doesn\'t meet the standard, it doesn\'t leave the building.' },
            { label: 'Our Promise', body: 'We\'re a small team building something we believe in. We\'ll always be honest about what our gear does and doesn\'t do, and we\'ll keep improving it as long as girls are playing hockey.' },
          ].map(({ label, body }) => (
            <div key={label}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--volt-primary, #e8ff3a)', display: 'block', marginBottom: '16px' }}>
                {label}
              </span>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: '#d4d4d4', lineHeight: 1.7, margin: 0 }}>
                {body}
              </p>
            </div>
          ))}
        </div>

        {/* Story */}
        <div style={{ padding: 'clamp(48px, 6vw, 96px) clamp(24px, 6vw, 96px)', borderBottom: '1px solid #3d3d3d', maxWidth: '720px' }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--volt-primary, #e8ff3a)', display: 'block', marginBottom: '24px' }}>
            Our Story
          </span>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '17px', color: '#d4d4d4', lineHeight: 1.8, margin: '0 0 20px' }}>
            [Founder story coming soon — share your story here and we'll write it up.]
          </p>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '17px', color: '#d4d4d4', lineHeight: 1.8, margin: 0 }}>
            DefendHer Sport is based in [location]. Our first product — the DefendHer Neck Protector — ships [date]. More to come.
          </p>
        </div>

        {/* CTA */}
        <div style={{ padding: 'clamp(48px, 6vw, 96px) clamp(24px, 6vw, 96px)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '24px' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '24px', fontWeight: 700, color: '#ffffff', margin: 0 }}>
            Ready to try it?
          </p>
          <a
            href="/shop"
            style={{ display: 'inline-flex', alignItems: 'center', background: 'var(--volt-primary, #e8ff3a)', color: '#1a1a1a', borderRadius: '9999px', padding: '14px 32px', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', textDecoration: 'none' }}
          >
            Shop Now
          </a>
        </div>

      </div>
    </>
  );
}
