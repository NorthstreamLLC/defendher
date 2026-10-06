import { Helmet } from '@dr.pogodin/react-helmet';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import FeatureCards from '../components/FeatureCards';
import SignupForm from '../components/SignupForm';
import FAQ from '../components/FAQ';
import { FAQS } from '@/lib/faq';

const site = 'https://defendhersportsgear.com';

// To add a photo: save it in /public, then add a line here.
const PHOTOS: { src: string; alt: string; light?: boolean; fit?: 'cover' | 'contain'; note?: string }[] = [
  { src: '/prototype-1.jpg', alt: 'DefendHer prototype, front view, worn in the locker room' },
  { src: '/prototype-2.jpg', alt: 'DefendHer prototype, full view with hockey gear' },
  { src: '/prototype-3.webp', alt: 'DefendHer prototype, front flat lay with high neck' },
  { src: '/prototype-4.png', alt: 'DefendHer prototype, back flat lay with racerback and mesh panels' },
  {
    src: '/prototype-magnet-upright.jpg',
    alt: 'Design drawing of the DefendHer garment from the front, side and back. Callouts at the back of the neck mark where the material overlaps and where the neck guard fastens with a magnet.',
    light: true,
    fit: 'contain',
    note: 'Design drawing, front, side and back. The magnetic closure fastens at the back of the neck, with the material overlapping at the join. It isn\u2019t visible in the prototype photos. Early concept; final design may change before launch.',
  },
];

const WATERMARK =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='140'%3E%3Ctext x='40' y='80' transform='rotate(-25 150 70)' font-family='Arial,sans-serif' font-weight='700' font-size='15' letter-spacing='3' fill='white' fill-opacity='0.3'%3EPATENT PENDING%3C/text%3E%3C/svg%3E\")";

const WATERMARK_DARK = WATERMARK.replace("fill='white' fill-opacity='0.3'", "fill='black' fill-opacity='0.14'");

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

function PatentPhoto({ src, alt, ratio = '3/4', eager = false, light = false, fit = 'cover' }: { src: string; alt: string; ratio?: string; eager?: boolean; light?: boolean; fit?: 'cover' | 'contain' }) {
  return (
    <div style={{ position: 'relative', aspectRatio: ratio, overflow: 'hidden', borderRadius: '4px', background: light ? '#ffffff' : '#2e2e2e' }}>
      <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} style={{ width: '100%', height: '100%', objectFit: fit, display: 'block' }} />
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: light ? WATERMARK_DARK : WATERMARK, backgroundSize: '300px 140px' }} />
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
  const points = [
    { title: 'Sports bra base layer', text: 'Support and comfort in a piece you already wear every game.' },
    { title: 'Integrated neck guard', text: 'Neck protection built into the garment, not strapped on top of it.' },
    { title: 'Adjustable magnetic closure', text: 'Fastens at the back of the neck with the material overlapping at the join. A secure fit that keeps hair from catching, with no Velcro to wear out.' },
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
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
        })}</script>
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
            <PatentPhoto src={PHOTOS[active].src} alt={PHOTOS[active].alt} ratio="4/5" eager light={PHOTOS[active].light} fit={PHOTOS[active].fit} />
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${PHOTOS.length}, 1fr)`, gap: '8px', marginTop: '8px' }}>
              {PHOTOS.map((p, i) => (
                <button
                  key={p.src}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Show photo ${i + 1} of ${PHOTOS.length}`}
                  aria-current={i === active}
                  style={{ padding: 0, background: p.light ? '#ffffff' : '#2e2e2e', border: i === active ? '2px solid #e8ff3a' : '2px solid transparent', borderRadius: '4px', overflow: 'hidden', cursor: 'pointer', aspectRatio: '1/1', opacity: i === active ? 1 : 0.65 }}
                >
                  <img src={p.src} alt="" style={{ width: '100%', height: '100%', objectFit: p.fit ?? 'cover', display: 'block' }} />
                </button>
              ))}
            </div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: '#8a8a8a', margin: '12px 0 0' }}>
              {PHOTOS[active].note ?? `Photo ${active + 1} of ${PHOTOS.length}. Early prototype shown; final design and materials may change before launch.`}
            </p>
          </div>
        </section>

        {/* WHAT IT IS */}
        <section style={{ borderTop: '1px solid #3d3d3d', padding: 'clamp(64px, 9vw, 120px) clamp(24px, 5vw, 80px)', maxWidth: '1280px', margin: '0 auto' }}>
          <span style={label}>The idea</span>
          <h2 style={h2}>ONE PIECE.<br />THREE JOBS.</h2>
          <FeatureCards items={points} />
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

        {/* FAQ */}
        <section id="faq" style={{ borderTop: '1px solid #3d3d3d', padding: 'clamp(64px, 9vw, 120px) clamp(24px, 5vw, 80px)', maxWidth: '1280px', margin: '0 auto' }}>
          <span style={label}>FAQ</span>
          <h2 style={h2}>QUESTIONS,<br />ANSWERED</h2>
          <FAQ />
        </section>

        {/* STATUS + SIGNUP */}
        <section id="updates" style={{ borderTop: '1px solid #3d3d3d', padding: 'clamp(64px, 9vw, 120px) clamp(24px, 5vw, 80px)', textAlign: 'center' }}>
          <span style={{ ...label, color: '#e8ff3a' }}>Patent pending &middot; In development</span>
          <h2 style={{ ...h2, color: '#e8ff3a', textAlign: 'center' }}>BE FIRST<br />TO KNOW</h2>
          <p style={{ ...body, margin: '0 auto 36px', textAlign: 'center', maxWidth: '50ch' }}>
            Not for sale yet. Leave your email and we&rsquo;ll tell you when it launches.
          </p>

          <SignupForm source="product" align="center" />

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
