import { useEffect, useRef, useState } from 'react';

/** Guards against React StrictMode double-mounting the effect in development. */
let mountedOnce = false;

/**
 * Brand loading screen — plays the DefendHer logo animation full screen while
 * the site loads, then crossfades away. Shows every page load.
 *
 * Skipped for users who prefer reduced motion.
 */
export default function BrandIntro() {
  const [show, setShow] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (mountedOnce) return;
    mountedOnce = true;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    setShow(true);
  }, []);

  useEffect(() => {
    if (!show) return;

    const dismiss = () => setLeaving(true);
    // The logo animation starts fading around 4.5s, so begin the overlay
    // crossfade at 5s — the two fades overlap and the site appears without a
    // dead beat. Also a safety net if the video stalls or autoplay is blocked.
    const failsafe = window.setTimeout(dismiss, 5000);

    window.addEventListener('keydown', dismiss);
    return () => {
      window.clearTimeout(failsafe);
      window.removeEventListener('keydown', dismiss);
    };
  }, [show]);

  useEffect(() => {
    if (!leaving) return;
    const t = window.setTimeout(() => setShow(false), 600);
    return () => window.clearTimeout(t);
  }, [leaving]);

  useEffect(() => {
    if (!show) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [show]);

  // Some browsers ignore the autoplay attribute; ask explicitly too.
  useEffect(() => {
    if (!show) return;
    const v = videoRef.current;
    if (!v) return;
    const p = v.play();
    if (p && typeof p.catch === 'function') {
      // Autoplay blocked — the poster frame still shows, then we fade out.
      p.catch(() => undefined);
    }
  }, [show]);

  if (!show) return null;

  return (
    <div
      role="presentation"
      onClick={() => setLeaving(true)}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#0d0d0d',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        opacity: leaving ? 0 : 1,
        transition: 'opacity 600ms cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        poster="/hero-poster.jpg"
        onEnded={() => setLeaving(true)}
        onError={() => setLeaving(true)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: 'block',
          pointerEvents: 'none',
        }}
      >
        {/* VP9 first — it handles the glow gradients on black without banding.
            MP4 is the universal fallback. */}
        <source src="/hero-video.webm" type="video/webm" />
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setLeaving(true);
        }}
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'none',
          border: 'none',
          color: '#6a6a6a',
          fontFamily: 'var(--font-sans)',
          fontSize: '11px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          cursor: 'pointer',
          padding: '8px 16px',
        }}
      >
        Skip
      </button>
    </div>
  );
}
