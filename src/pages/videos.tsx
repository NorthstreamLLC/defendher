import { Helmet } from '@dr.pogodin/react-helmet';
import { VIDEOS } from '@/lib/videos';

const site = 'https://defendhersport.net';

export default function VideosPage() {
  return (
    <>
      <Helmet>
        <title>Videos — DefendHer Sports</title>
        <meta name="description" content="Product videos, fit guides, and behind-the-scenes from DefendHer Sports." />
        <link rel="canonical" href={`${site}/videos`} />
      </Helmet>

      <div style={{ paddingTop: 'var(--header-h)', minHeight: '100vh', background: '#1a1a1a' }}>

        {/* Header */}
        <div style={{ padding: 'clamp(48px, 6vw, 80px) clamp(24px, 6vw, 96px) 40px', borderBottom: '1px solid #3d3d3d' }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#8a8a8a', display: 'block', marginBottom: '12px' }}>
            Watch
          </span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(48px, 7vw, 88px)', fontWeight: 400, letterSpacing: '0.01em', lineHeight: 0.85, color: '#ffffff', textTransform: 'uppercase', margin: 0 }}>
            VIDEOS
          </h1>
        </div>

        {/* Grid */}
        <div style={{ padding: 'clamp(40px, 5vw, 64px) clamp(24px, 6vw, 96px) clamp(64px, 8vw, 96px)' }}>
          {VIDEOS.length === 0 ? (
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', color: '#8a8a8a', margin: 0 }}>
              Videos coming soon.
            </p>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: 'clamp(24px, 3vw, 40px)',
                maxWidth: '1400px',
              }}
            >
              {VIDEOS.map((video) => (
                <article key={video.id}>
                  <div
                    style={{
                      position: 'relative',
                      aspectRatio: '16/9',
                      background: '#0d0d0d',
                      border: '1px solid #3d3d3d',
                      borderRadius: '4px',
                      overflow: 'hidden',
                      marginBottom: '16px',
                    }}
                  >
                    {video.type === 'embed' ? (
                      <iframe
                        src={video.src}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
                      />
                    ) : (
                      <video
                        controls
                        playsInline
                        preload="metadata"
                        poster={video.poster}
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', background: '#0d0d0d' }}
                      >
                        <source src={video.src} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </div>

                  {video.category && (
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--volt-primary, #e8ff3a)', display: 'block', marginBottom: '8px' }}>
                      {video.category}
                    </span>
                  )}
                  <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: '18px', fontWeight: 700, color: '#ffffff', lineHeight: 1.3, margin: '0 0 8px' }}>
                    {video.title}
                  </h2>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#8a8a8a', lineHeight: 1.6, margin: 0 }}>
                    {video.description}
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
