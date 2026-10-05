import { useEffect, useRef, useState } from 'react';

interface FeatureCardsProps {
  items: { title: string; text: string }[];
}

export default function FeatureCards({ items }: FeatureCardsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`dh-fc${visible ? ' in' : ''}`}
      style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1px', border: '1px solid #3d3d3d', background: '#3d3d3d' }}
    >
      <style>{`
        .dh-fc-card { background: #1a1a1a; padding: clamp(32px, 3.5vw, 48px); opacity: 0; transform: translateY(28px); transition: opacity 700ms cubic-bezier(0.22, 1, 0.36, 1), transform 700ms cubic-bezier(0.22, 1, 0.36, 1), background 250ms ease; }
        .dh-fc.in .dh-fc-card { opacity: 1; transform: translateY(0); }
        .dh-fc-bar { display: block; height: 3px; width: 88px; background: #e8ff3a; margin-bottom: 24px; transform: scaleX(0); transform-origin: left center; transition: transform 800ms cubic-bezier(0.22, 1, 0.36, 1) 350ms; }
        .dh-fc.in .dh-fc-bar { transform: scaleX(0.4545); }
        .dh-fc-card:hover { background: #222222; }
        .dh-fc.in .dh-fc-card:hover .dh-fc-bar { transform: scaleX(1); transition-delay: 0ms; transition-duration: 350ms; }
        @media (prefers-reduced-motion: reduce) {
          .dh-fc-card { opacity: 1; transform: none; transition: none; }
          .dh-fc-bar { transform: scaleX(0.4545); transition: none; }
        }
      `}</style>
      {items.map((item, i) => (
        <div key={item.title} className="dh-fc-card" style={{ transitionDelay: visible ? `${i * 120}ms` : '0ms' }}>
          <span className="dh-fc-bar" style={{ transitionDelay: visible ? `${350 + i * 120}ms` : '0ms' }} />
          <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(16px, 1.4vw, 19px)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#ffffff', margin: '0 0 14px', lineHeight: 1.25 }}>
            {item.title}
          </h3>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(15px, 1.3vw, 17px)', color: '#b0b0b0', lineHeight: 1.65, margin: 0 }}>
            {item.text}
          </p>
        </div>
      ))}
    </div>
  );
}
