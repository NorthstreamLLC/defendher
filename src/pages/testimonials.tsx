import { Helmet } from '@dr.pogodin/react-helmet';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const site = 'https://defendhersport.net';

// To add a testimonial: save a square-ish photo in /public and add an entry here.
const TESTIMONIALS = [
  {
    name: 'Bella Jonsson',
    team: 'NDHL · Sundsvall',
    photo: '/testimonial-bella.jpg',
    alt: 'Bella Jonsson smiling in her navy Sundsvall jersey and helmet',
    quote: [
      'I have used the neck guard and bra with the magnetic enclosure for prototype for almost a year now.',
      'Before using the prototype I used a shirt neck guard which I didn’t like because it was too much material on the arms which would make me warm. Also with the Velcro enclosure my hair would get stuck in it which would be distracting and it caused pain.',
      'With the prototype that I am using the product stays in place and there is less material, cooler during games. Something else that I like is the magnetic enclosure because my hair no longer gets pulled!',
    ],
  },
  {
    name: 'Felicia Sånnevall',
    team: 'NDHL · Sundsvall',
    photo: '/testimonial-felicia.jpg',
    alt: 'Felicia Sånnevall in her navy Sundsvall jersey and helmet mid-game',
    quote: [
      'I used the neck guard and bra prototype for almost 1 year now.',
      'Before I was using a long sleeve shirt with neck guard and also just a neck guard and a bra. With the shirt I found it was too hot and both neck guard products were itchy and would become out of place.',
      'With the neck bra it is comfortable and less hot because you are wearing less material. Because it’s one piece it stays in the correct place during the game. My hair has been less damaged because of the magnetic enclosure over the Velcro enclosure because the magnets don’t catch my hair.',
    ],
  },
];

const THEMES = [
  { title: 'Stays in place', text: 'One piece, so it doesn’t shift or itch during the game.' },
  { title: 'Less material, less heat', text: 'Cooler than a long-sleeve shirt with a neck guard.' },
  { title: 'Hair doesn’t get caught', text: 'The magnetic closure replaces Velcro that pulled and damaged hair.' },
];

const eyebrow: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: '12px',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  display: 'block',
  marginBottom: '16px',
};

export default function TestimonialsPage() {
  return (
    <>
      <Helmet>
        <title>Player Testimonials — DefendHer Sports</title>
        <meta name="description" content="Two NDHL players on a year in the DefendHer prototype: it stays in place, runs cooler, and the magnetic closure doesn't catch their hair." />
        <link rel="canonical" href={`${site}/testimonials`} />
        <meta property="og:title" content="Player Testimonials — DefendHer Sports" />
        <meta property="og:description" content="Players on a year in the DefendHer prototype." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${site}/testimonials`} />
        <meta property="og:image" content={`${site}/testimonial-bella.jpg`} />
      </Helmet>

      <div style={{ paddingTop: 'var(--header-h)', background: '#1a1a1a' }}>
        {/* HEADER */}
        <section style={{ padding: 'clamp(48px, 7vw, 96px) clamp(24px, 5vw, 80px) clamp(40px, 5vw, 64px)', maxWidth: '1280px', margin: '0 auto' }}>
          <span style={{ ...eyebrow, color: '#e8ff3a' }}>Tested by players</span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(56px, 9vw, 128px)', fontWeight: 400, letterSpacing: '0.01em', lineHeight: 0.86, color: '#ffffff', textTransform: 'uppercase', margin: '0 0 28px' }}>
            IN THEIR<br />OWN WORDS
          </h1>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '18px', color: '#d4d4d4', lineHeight: 1.6, maxWidth: '52ch', margin: 0 }}>
            Two players wore the prototype for almost a year. Here&rsquo;s what they told us.
          </p>
        </section>

        {/* TESTIMONIALS */}
        <section style={{ padding: '0 clamp(24px, 5vw, 80px)', maxWidth: '1280px', margin: '0 auto' }}>
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={t.name}
              style={{
                margin: 0,
                padding: 'clamp(40px, 5vw, 72px) 0',
                borderTop: '1px solid #3d3d3d',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 'clamp(32px, 5vw, 80px)',
                alignItems: 'center',
              }}
            >
              <div style={{ order: i % 2 === 0 ? 0 : 1, borderRadius: '4px 4px 4px 96px', overflow: 'hidden', background: '#2e2e2e', aspectRatio: '1/1' }}>
                <img src={t.photo} alt={t.alt} loading={i === 0 ? 'eager' : 'lazy'} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>

              <div>
                <div aria-hidden="true" style={{ fontFamily: 'var(--font-heading)', fontSize: '120px', lineHeight: 0.6, color: '#e8ff3a', height: '56px' }}>
                  &ldquo;
                </div>
                <blockquote style={{ margin: 0 }}>
                  {t.quote.map((para, k) => (
                    <p
                      key={k}
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: k === 0 ? '20px' : '16px',
                        fontWeight: k === 0 ? 600 : 400,
                        color: k === 0 ? '#ffffff' : '#d4d4d4',
                        lineHeight: 1.7,
                        margin: '0 0 16px',
                        maxWidth: '58ch',
                      }}
                    >
                      {para}
                    </p>
                  ))}
                </blockquote>
                <figcaption style={{ marginTop: '28px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ width: '40px', height: '2px', background: '#e8ff3a', display: 'block' }} />
                  <span>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', color: '#e8ff3a', textTransform: 'uppercase', letterSpacing: '0.01em', lineHeight: 1, display: 'block' }}>
                      {t.name}
                    </span>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#8a8a8a' }}>
                      {t.team}
                    </span>
                  </span>
                </figcaption>
              </div>
            </figure>
          ))}
        </section>

        {/* THEMES */}
        <section style={{ borderTop: '1px solid #3d3d3d', padding: 'clamp(56px, 8vw, 104px) clamp(24px, 5vw, 80px)', maxWidth: '1280px', margin: '0 auto' }}>
          <span style={{ ...eyebrow, color: '#8a8a8a' }}>What both players said</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1px', border: '1px solid #3d3d3d', background: '#3d3d3d' }}>
            {THEMES.map((th) => (
              <div key={th.title} style={{ background: '#1a1a1a', padding: 'clamp(28px, 3vw, 40px)' }}>
                <div style={{ width: '32px', height: '3px', background: '#e8ff3a', marginBottom: '20px' }} />
                <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#ffffff', margin: '0 0 12px' }}>
                  {th.title}
                </h2>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#8a8a8a', lineHeight: 1.6, margin: 0 }}>{th.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ borderTop: '1px solid #3d3d3d', padding: 'clamp(56px, 8vw, 104px) clamp(24px, 5vw, 80px)', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(44px, 6vw, 88px)', fontWeight: 400, lineHeight: 0.9, color: '#e8ff3a', textTransform: 'uppercase', margin: '0 0 28px' }}>
            SEE THE<br />PROTOTYPE
          </h2>
          <Link
            to="/product"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#e8ff3a', color: '#1a1a1a', borderRadius: '9999px', padding: '14px 28px', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', textDecoration: 'none' }}
          >
            View the product <ArrowRight size={15} />
          </Link>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: '#8a8a8a', marginTop: '20px' }}>
            Patent pending. Prototype testimonials; final product may differ.
          </p>
        </section>
      </div>
    </>
  );
}
