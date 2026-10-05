import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SELECTOR = 'section:not([aria-label]), article, figure, [data-reveal]';

export default function ScrollMotion() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const seen = new WeakSet<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -6% 0px' },
    );

    const apply = () => {
      document.querySelectorAll(SELECTOR).forEach((el) => {
        if (seen.has(el) || el.querySelector(SELECTOR)) return;
        seen.add(el);
        el.classList.add('dh-reveal');
        io.observe(el);
      });
    };

    apply();
    const timers = [setTimeout(apply, 150), setTimeout(apply, 600), setTimeout(apply, 1500)];

    return () => {
      timers.forEach(clearTimeout);
      io.disconnect();
    };
  }, [pathname]);

  return (
    <style>{`
      .dh-reveal { opacity: 0; transform: translateY(28px); transition: opacity 800ms cubic-bezier(0.22, 1, 0.36, 1), transform 800ms cubic-bezier(0.22, 1, 0.36, 1); will-change: opacity, transform; }
      .dh-reveal.in { opacity: 1; transform: translateY(0); }
      @keyframes dh-hero-roll { from { opacity: 0; transform: translateX(-36px); } to { opacity: 1; transform: translateX(0); } }
      .dh-roll-in > * { animation: dh-hero-roll 900ms cubic-bezier(0.22, 1, 0.36, 1) both; }
      .dh-roll-in > *:nth-child(2) { animation-delay: 90ms; }
      .dh-roll-in > *:nth-child(3) { animation-delay: 180ms; }
      .dh-roll-in > *:nth-child(4) { animation-delay: 270ms; }
      .dh-roll-in > *:nth-child(5) { animation-delay: 360ms; }
      .dh-roll-in > *:nth-child(6) { animation-delay: 450ms; }
      @media (prefers-reduced-motion: reduce) { .dh-roll-in > * { animation: none; } }
    `}</style>
  );
}
