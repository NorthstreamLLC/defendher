interface PageBannerProps {
  eyebrow: string;
  title?: React.ReactNode;
  image: string;
  video?: string;
  objectPosition?: string;
  reverse?: boolean;
  plain?: boolean;
}

export default function PageBanner({ eyebrow, title, image, video, objectPosition = 'center', reverse = false, plain = false }: PageBannerProps) {
  const mediaFilter = plain ? 'none' : 'saturate(0.15) contrast(1.1) brightness(0.5)';
  return (
    <section
      aria-label={eyebrow}
      style={{
        position: 'relative',
        height: plain ? 'clamp(220px, 34vw, 480px)' : 'clamp(300px, 46vh, 480px)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
        background: '#111111',
        borderBottom: '3px solid #e8ff3a',
      }}
    >
      <style>{`
        @keyframes dh-banner-drift { from { transform: scale(1.04) translate3d(0,0,0); } to { transform: scale(1.14) translate3d(-1.5%, -1%, 0); } }
        @keyframes dh-banner-drift-rev { from { transform: scale(1.14) translate3d(-1.5%, -1%, 0); } to { transform: scale(1.04) translate3d(0,0,0); } }
        .dh-banner-media { animation: dh-banner-drift 22s ease-in-out infinite alternate; will-change: transform; }
        .dh-banner-media.rev { animation-name: dh-banner-drift-rev; }
        @media (prefers-reduced-motion: reduce) { .dh-banner-media { animation: none; transform: none; } }
      `}</style>

      <div aria-hidden="true" style={{ position: 'absolute', inset: 0 }}>
        {video ? (
          <video
            className="dh-banner-media"
            src={video}
            poster={image}
            autoPlay
            muted
            loop
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition, display: 'block', filter: mediaFilter }}
          />
        ) : (
          <img
            className={`dh-banner-media${reverse ? ' rev' : ''}`}
            src={image}
            alt=""
            fetchPriority="high"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition, display: 'block', filter: mediaFilter }}
          />
        )}
        {!plain && <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,26,26,0.85) 0%, rgba(26,26,26,0) 65%)' }} />}
      </div>

      {!plain && (
      <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(24px, 4vw, 48px) clamp(24px, 6vw, 96px)', width: '100%' }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#e8ff3a', display: 'block', marginBottom: '14px' }}>
          {eyebrow}
        </span>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(48px, 8vw, 112px)', fontWeight: 400, letterSpacing: '0.01em', lineHeight: 0.88, color: '#ffffff', textTransform: 'uppercase', margin: 0 }}>
          {title}
        </h1>
      </div>
      )}
    </section>
  );
}
