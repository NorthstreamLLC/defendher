import { useEffect, useRef, useState } from 'react';

const SEEN_KEY = 'dh_intro_seen';

/**
 * Brand intro overlay — plays the DefendHer logo animation once per browser
 * session, then fades away. Skipped for users who prefer reduced motion, and
 * dismissible by click or any key.
 *
 * NOT CURRENTLY RENDERED: the homepage hero plays this same animation, so
 * showing it here too would play it twice back to back. To re-enable, render
 * <BrandIntro /> in App.tsx.
 */
export default function BrandIntro() {
  const [show, setShow] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const alreadySeen = sessionStorage.getItem(SEEN_KEY) === '1';

    if (reduceMotion || alreadySeen) return;

    sessionStorage.setItem(SEEN_KEY, '1');
    setShow(true);
  }, []);

  useEffect(() => {
    if (!show) return;

    const dismiss = () => setLeaving(true);
    // Safety net: never trap the user if the video stalls
    const failsafe = window.setTimeout(dismiss, 9000);

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
          // Fills the viewport. `contain` keeps the logo whole and un-stretched;
          // the video's black edges blend into the black backdrop, so it reads
          // as full screen. Swap to 'cover' once a landscape master is available.
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: 'block',
          pointerEvents: 'none',
        }}
      >
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
