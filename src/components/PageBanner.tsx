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
        height: 'clamp(180px, 24vw, 280px)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
        background: '#1f2410',
        borderBottom: '3px solid #e8ff3a',
      }}
    >
      <style>{`
        @keyframes dh-shift { from { background-position: 0% 50%; } to { background-position: 100% 50%; } }
        @keyframes dh-slide { from { transform: translateX(-30%) skewX(-24deg); } to { transform: translateX(30%) skewX(-24deg); } }
        @keyframes dh-rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        .dh-banner-bg { background: linear-gradient(115deg, #1a1a1a 0%, #262b12 45%, #343c14 60%, #1a1a1a 100%); background-size: 220% 220%; animation: dh-shift 14s ease-in-out infinite alternate; }
        .dh-banner-line { position: absolute; top: -10%; bottom: -10%; width: 2px; background: #e8ff3a; opacity: 0.55; animation: dh-slide 16s ease-in-out infinite alternate; }
        .dh-banner-text > * { animation: dh-rise 700ms cubic-bezier(0.22, 1, 0.36, 1) both; }
        .dh-banner-text > *:nth-child(2) { animation-delay: 90ms; }
        .dh-banner-text > *:nth-child(3) { animation-delay: 180ms; }
        @media (prefers-reduced-motion: reduce) { .dh-banner-bg, .dh-banner-line, .dh-banner-text > * { animation: none; } }
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
            <div className="dh-banner-line" style={{ left: '68%', opacity: 0.3, animationDuration: '22s' }} />
            <div className="dh-banner-line" style={{ left: '76%', opacity: 0.18, animationDuration: '28s' }} />
          </>
        )}
      </div>

      <div className="dh-banner-text" style={{ position: 'relative', zIndex: 1, padding: 'clamp(20px, 3vw, 36px) clamp(24px, 6vw, 96px)', width: '100%' }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#e8ff3a', display: 'block', marginBottom: '12px' }}>
          {eyebrow}
        </span>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(40px, 6vw, 84px)', fontWeight: 400, letterSpacing: '0.01em', lineHeight: 0.9, color: '#ffffff', textTransform: 'uppercase', margin: 0 }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(14px, 1.6vw, 17px)', color: '#d4d4d4', margin: '14px 0 0', maxWidth: '52ch', lineHeight: 1.5 }}>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
