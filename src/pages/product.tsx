import { Helmet } from '@dr.pogodin/react-helmet';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const site = 'https://defendhersport.net';

// To add a photo: save it in /public, then add a line here.
const PHOTOS = [
  { src: '/prototype-1.jpg', alt: 'DefendHer prototype, front view, worn in the locker room' },
  { src: '/prototype-2.jpg', alt: 'DefendHer prototype, full view with hockey gear' },
  { src: '/prototype-3.webp', alt: 'DefendHer prototype, front flat lay with high neck' },
  { src: '/prototype-4.png', alt: 'DefendHer prototype, back flat lay with racerback and mesh panels' },
];

const WATERMARK =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='140'%3E%3Ctext x='40' y='80' transform='rotate(-25 150 70)' font-family='Arial,sans-serif' font-weight='700' font-size='15' letter-spacing='3' fill='white' fill-opacity='0.3'%3EPATENT PENDING%3C/text%3E%3C/svg%3E\")";

const label: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '12px',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  color: '#8a8a8a',
  display: 'block',
  marginBottom: '20px',
};

const h2: React.CSSProperties = {
  fontFamily: 'var(--font-heading)',
  fontSize: 'clamp(44px, 6vw, 84px)',
  fontWeight: 400,
  letterSpacing: '0.01em',
  lineHeight: 0.9,
  color: '#ffffff',
  textTransform: 'uppercase',
  margin: '0 0 32px',
};

const body: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '16px',
  color: '#d4d4d4',
  lineHeight: 1.7,
  maxWidth: '60ch',
  margin: '0 0 16px',
};

function PatentPhoto({ src, alt, ratio = '3/4', eager = false }: { src: string; alt: string; ratio?: string; eager?: boolean }) {
  return (
    <div style={{ position: 'relative', aspectRatio: ratio, overflow: 'hidden', borderRadius: '4px', background: '#2e2e2e' }}>
      <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: WATERMARK, backgroundSize: '300px 140px' }} />
      <span
        style={{
          position: 'absolute',
          left: '12px',
          bottom: '12px',
          background: '#e8ff3a',
          color: '#1a1a1a',
          fontFamily: 'var(--font-sans)',
          fontSize: '10px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          padding: '5px 10px',
          borderRadius: '2px',
        }}
      >
        Patent Pending
      </span>
    </div>
  );
}

export default function ProductPage() {
  const [active, setActive] = useState(0);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email.');
      return;
    }
    setSubmitted(true);
    setError('');
  }

  const points = [
    { title: 'Sports bra base layer', text: 'Support and comfort in a piece you already wear every game.' },
    { title: 'Integrated neck guard', text: 'Neck protection built into the garment, not strapped on top of it.' },
    { title: 'Adjustable magnetic closure', text: 'A secure fit that keeps hair from catching, with no Velcro to wear out.' },
    { title: 'Designed for her', text: 'Made for female athletes of all ages and every body type, not adapted from men’s equipment.' },
  ];

  return (
    <>
      <Helmet>
        <title>The Prototype — DefendHer Sports</title>
        <meta name="description" content="A sports bra with an integrated neck guard and adjustable magnetic closure, designed for women's hockey. Patent pending. Launching soon." />
        <link rel="canonical" href={`${site}/product`} />
        <meta property="og:title" content="The Prototype — DefendHer Sports" />
        <meta property="og:description" content="A sports bra with an integrated neck guard, designed for women's hockey. Patent pending." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${site}/product`} />
        <meta property="og:image" content={`${site}${PHOTOS[0].src}`} />
      </Helmet>

      <div style={{ paddingTop: 'var(--header-h)', background: '#1a1a1a' }}>
        {/* HERO */}
        <section
          style={{
            padding: 'clamp(48px, 7vw, 96px) clamp(24px, 5vw, 80px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'clamp(40px, 6vw, 96px)',
            alignItems: 'center',
            maxWidth: '1280px',
            margin: '0 auto',
          }}
        >
          <div>
            <span style={{ ...label, color: '#e8ff3a' }}>Prototype &middot; Patent Pending</span>
            <h1 style={{ ...h2, fontSize: 'clamp(48px, 7vw, 104px)', lineHeight: 0.88 }}>
              SPORTS BRA<br />WITH<br />INTEGRATED<br />NECK GUARD
            </h1>
            <p style={{ ...body, fontSize: '18px', marginBottom: '32px' }}>
              Support, comfort and neck protection in one piece. Designed for women&rsquo;s hockey, and currently in development.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <a
                href="#updates"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#e8ff3a', color: '#1a1a1a', borderRadius: '9999px', padding: '14px 28px', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', textDecoration: 'none' }}
              >
                Get launch updates <ArrowRight size={15} />
              </a>
              <a
                href="#story"
                style={{ display: 'inline-flex', alignItems: 'center', border: '2px solid #3d3d3d', color: '#ffffff', borderRadius: '9999px', padding: '12px 26px', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', textDecoration: 'none' }}
              >
                Why we built it
              </a>
            </div>
          </div>
          <div style={{ maxWidth: '520px', width: '100%', justifySelf: 'center' }}>
            <PatentPhoto src={PHOTOS[active].src} alt={PHOTOS[active].alt} ratio="4/5" eager />
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${PHOTOS.length}, 1fr)`, gap: '8px', marginTop: '8px' }}>
              {PHOTOS.map((p, i) => (
                <button
                  key={p.src}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Show photo ${i + 1} of ${PHOTOS.length}`}
                  aria-current={i === active}
                  style={{ padding: 0, background: '#2e2e2e', border: i === active ? '2px solid #e8ff3a' : '2px solid transparent', borderRadius: '4px', overflow: 'hidden', cursor: 'pointer', aspectRatio: '1/1', opacity: i === active ? 1 : 0.65 }}
                >
                  <img src={p.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </button>
              ))}
            </div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: '#8a8a8a', margin: '12px 0 0' }}>
              {PHOTOS.length} prototype photos. Early prototype shown; final design and materials may change before launch.
            </p>
          </div>
        </section>

        {/* WHAT IT IS */}
        <section style={{ borderTop: '1px solid #3d3d3d', padding: 'clamp(64px, 9vw, 120px) clamp(24px, 5vw, 80px)', maxWidth: '1280px', margin: '0 auto' }}>
          <span style={label}>The idea</span>
          <h2 style={h2}>ONE PIECE.<br />THREE JOBS.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1px', border: '1px solid #3d3d3d', background: '#3d3d3d' }}>
            {points.map((p) => (
              <div key={p.title} style={{ background: '#1a1a1a', padding: 'clamp(28px, 3vw, 40px)' }}>
                <div style={{ width: '32px', height: '3px', background: '#e8ff3a', marginBottom: '20px' }} />
                <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#ffffff', margin: '0 0 12px' }}>
                  {p.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#8a8a8a', lineHeight: 1.6, margin: 0 }}>{p.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* STORY */}
        <section id="story" style={{ borderTop: '1px solid #3d3d3d', padding: 'clamp(64px, 9vw, 120px) clamp(24px, 5vw, 80px)', maxWidth: '1280px', margin: '0 auto' }}>
          <span style={label}>Why we built it</span>
          <h2 style={h2}>THE GAP IN<br />THE LOCKER ROOM</h2>
          <p style={body}>
            Traditional neck guards chafed, caught in hair, and wore out as the Velcro lost its grip. Long-sleeve shirts with built-in neck guards existed, but nothing combined support, comfort and protection in one product.
          </p>
          <p style={body}>
            So founder Ally imagined a sports bra with the neck guard built in, then built the first prototype with her university equipment manager, Neal. Together they refined it with an adjustable magnetic closure.
          </p>
        </section>

        {/* STATUS + SIGNUP */}
        <section id="updates" style={{ borderTop: '1px solid #3d3d3d', padding: 'clamp(64px, 9vw, 120px) clamp(24px, 5vw, 80px)', textAlign: 'center' }}>
          <span style={{ ...label, color: '#e8ff3a' }}>Patent pending &middot; In development</span>
          <h2 style={{ ...h2, color: '#e8ff3a', textAlign: 'center' }}>BE FIRST<br />TO KNOW</h2>
          <p style={{ ...body, margin: '0 auto 36px', textAlign: 'center', maxWidth: '50ch' }}>
            Not for sale yet. Leave your email and we&rsquo;ll tell you when it launches.
          </p>

          {submitted ? (
            <div style={{ display: 'inline-flex', border: '2px solid #e8ff3a', borderRadius: '9999px', padding: '14px 28px', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#e8ff3a' }}>
              Thanks. We&rsquo;ll be in touch.
            </div>
          ) : (
            <form onSubmit={handleSignup} aria-label="Launch notification signup" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', justifyContent: 'center' }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                aria-label="Email address"
                style={{ background: 'rgba(255,255,255,0.06)', border: '2px solid #3d3d3d', borderRadius: '9999px', padding: '14px 24px', fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#ffffff', outline: 'none', flex: '1 1 240px', maxWidth: '340px' }}
              />
              <button
                type="submit"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#e8ff3a', border: '2px solid #e8ff3a', color: '#1a1a1a', borderRadius: '9999px', padding: '14px 28px', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer', whiteSpace: 'nowrap' }}
              >
                Notify me <ArrowRight size={15} />
              </button>
            </form>
          )}
          {error && <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: '#ff8a8a', marginTop: '12px' }}>{error}</p>}

          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: '#8a8a8a', marginTop: '24px' }}>
            Follow the build on{' '}
            <a href="https://www.instagram.com/defendhersports" target="_blank" rel="noopener noreferrer" style={{ color: '#d4d4d4' }}>Instagram</a>
            {' '}or email{' '}
            <a href="mailto:Defendhersports@gmail.com" style={{ color: '#d4d4d4' }}>Defendhersports@gmail.com</a>
          </p>
        </section>
      </div>
    </>
  );
}
