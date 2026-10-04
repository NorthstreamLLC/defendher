interface PageBannerProps {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  image?: string;
  video?: string;
  objectPosition?: string;
}

// Text-and-motion banner. Pass `image` (or `video`) later to swap in a real banner.
export default function PageBanner({ eyebrow, title, subtitle, image, video, objectPosition = 'center' }: PageBannerProps) {
  return (
    <section
      aria-label={eyebrow}
      style={{
        position: 'relative',
        minHeight: 'clamp(220px, 24vw, 320px)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
        background: '#141414',
        borderBottom: '3px solid #e8ff3a',
      }}
    >
      <style>{`
        @keyframes dh-shift { from { background-position: 0% 50%; } to { background-position: 100% 50%; } }
        @keyframes dh-slide { from { transform: translateX(-40%) skewX(-24deg); } to { transform: translateX(40%) skewX(-24deg); } }
        @keyframes dh-fade { 0% { opacity: 0; } 50% { opacity: 0.75; } 100% { opacity: 0; } }
        @keyframes dh-roll { from { opacity: 0; clip-path: inset(0 100% 0 0); transform: translateX(-48px); } to { opacity: 1; clip-path: inset(0 0 0 0); transform: translateX(0); } }
        .dh-banner-bg { background: linear-gradient(115deg, #121212 0%, #181c0a 45%, #222810 60%, #121212 100%); background-size: 220% 220%; animation: dh-shift 14s ease-in-out infinite alternate; }
        .dh-banner-line { position: absolute; top: -10%; bottom: -10%; width: 2px; background: linear-gradient(to bottom, transparent 0%, #e8ff3a 30%, #e8ff3a 70%, transparent 100%); opacity: 0; animation: dh-slide 16s ease-in-out infinite alternate, dh-fade 7s ease-in-out infinite; }
        .dh-banner-text > * { animation: dh-roll 900ms cubic-bezier(0.22, 1, 0.36, 1) both; }
        .dh-banner-text > *:nth-child(2) { animation-delay: 120ms; }
        .dh-banner-text > *:nth-child(3) { animation-delay: 260ms; }
        @media (prefers-reduced-motion: reduce) { .dh-banner-bg, .dh-banner-line, .dh-banner-text > * { animation: none; } .dh-banner-line { opacity: 0.4; } }
      `}</style>

      <div aria-hidden="true" style={{ position: 'absolute', inset: 0 }}>
        {video ? (
          <video src={video} poster={image} autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition, display: 'block' }} />
        ) : image ? (
          <img src={image} alt="" fetchPriority="high" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition, display: 'block' }} />
        ) : (
          <>
            <div className="dh-banner-bg" style={{ position: 'absolute', inset: 0 }} />
            <div className="dh-banner-line" style={{ left: '62%' }} />
            <div className="dh-banner-line" style={{ left: '68%', animationDuration: '22s, 9s', animationDelay: '0s, 2s' }} />
            <div className="dh-banner-line" style={{ left: '76%', animationDuration: '28s, 11s', animationDelay: '0s, 4s' }} />
          </>
        )}
      </div>

      <div className="dh-banner-text" style={{ position: 'relative', zIndex: 1, padding: 'clamp(40px, 5vw, 64px) clamp(24px, 6vw, 96px) clamp(28px, 3.5vw, 44px)', width: '100%' }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#e8ff3a', display: 'block', marginBottom: '12px' }}>
          {eyebrow}
        </span>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(36px, 5vw, 68px)', fontWeight: 400, letterSpacing: '0.01em', lineHeight: 0.9, color: '#ffffff', textTransform: 'uppercase', margin: 0 }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(14px, 1.6vw, 17px)', color: '#d4d4d4', margin: '14px 0 0', maxWidth: '70ch', lineHeight: 1.5 }}>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
