import { FAQS } from '@/lib/faq';

export default function FAQ() {
  return (
    <div style={{ maxWidth: '860px' }}>
      <style>{`
        .dh-faq details { border-bottom: 1px solid #3d3d3d; }
        .dh-faq details:first-child { border-top: 1px solid #3d3d3d; }
        .dh-faq summary { list-style: none; cursor: pointer; display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 22px 0; font-family: var(--font-sans); font-size: clamp(16px, 1.6vw, 19px); font-weight: 700; color: #ffffff; transition: color 200ms ease; }
        .dh-faq summary::-webkit-details-marker { display: none; }
        .dh-faq summary:hover { color: #e8ff3a; }
        .dh-faq .dh-faq-icon { position: relative; flex-shrink: 0; width: 18px; height: 18px; }
        .dh-faq .dh-faq-icon::before, .dh-faq .dh-faq-icon::after { content: ''; position: absolute; left: 0; right: 0; top: 50%; height: 2px; background: #e8ff3a; transition: transform 250ms cubic-bezier(0.22, 1, 0.36, 1); }
        .dh-faq .dh-faq-icon::after { transform: rotate(90deg); }
        .dh-faq details[open] .dh-faq-icon::after { transform: rotate(0deg); }
        .dh-faq .dh-faq-answer { padding: 0 48px 24px 0; font-family: var(--font-sans); font-size: 16px; line-height: 1.7; color: #b0b0b0; animation: dh-faq-in 350ms cubic-bezier(0.22, 1, 0.36, 1); }
        @keyframes dh-faq-in { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
        @media (prefers-reduced-motion: reduce) { .dh-faq .dh-faq-answer { animation: none; } .dh-faq .dh-faq-icon::before, .dh-faq .dh-faq-icon::after { transition: none; } }
      `}</style>
      <div className="dh-faq">
        {FAQS.map((item) => (
          <details key={item.q}>
            <summary>
              {item.q}
              <span className="dh-faq-icon" aria-hidden="true" />
            </summary>
            <p className="dh-faq-answer" style={{ margin: 0 }}>{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
