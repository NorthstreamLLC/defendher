function IconInstagram() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconX() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.735-8.835L1.254 2.25H8.08l4.264 5.633 5.9-5.633Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function IconTikTok() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.6 6.7a4.8 4.8 0 0 1-3.8-4.2h-3.4v13.3a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6 0 .8.1V9.5a6.3 6.3 0 1 0 5.5 6.3V9a8.2 8.2 0 0 0 4.800 1.500V7.100c-.3 0-.7-.1-1-.4z" />
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.5 22v-8.2h2.8l.5-3.3h-3.3V8.4c0-.9.4-1.7 1.8-1.7h1.6V3.9s-1.3-.2-2.5-.2c-2.600 0-4.200 1.500-4.200 4.300v2.500H7.400v3.300h2.800V22h3.300z" />
    </svg>
  );
}

export const socials = [
  { href: 'https://www.instagram.com/defendhersports', label: 'Instagram', Icon: IconInstagram },
  { href: 'https://www.facebook.com/people/Defendher-Sports/61594389727062/', label: 'Facebook', Icon: IconFacebook },
  { href: 'https://www.tiktok.com/@defendhersports', label: 'TikTok', Icon: IconTikTok },
  { href: 'https://x.com/DefendHERsport', label: 'X (Twitter)', Icon: IconX },
  { href: 'https://www.linkedin.com/in/defendher-sports-22a54343a/', label: 'LinkedIn', Icon: IconLinkedIn },
];


export function FollowStrip() {
  return (
    <div
      style={{
        borderTop: '1px solid #3d3d3d',
        borderBottom: '1px solid #3d3d3d',
        background: '#111111',
        padding: '20px clamp(24px, 5vw, 80px)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px 32px',
      }}
    >
      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#ffffff' }}>
        Follow the journey
      </span>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 28px' }}>
        {socials.map(({ href, label, Icon }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 700, color: '#d4d4d4', textDecoration: 'none' }}
          >
            <Icon />
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}

export function HeroSocials() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px 20px', marginBottom: 'clamp(32px, 6vh, 56px)' }}>
      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#d4d4d4' }}>
        Follow the journey
      </span>
      {socials.map(({ href, label, Icon }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          style={{ color: '#ffffff', display: 'flex' }}
        >
          <Icon />
        </a>
      ))}
    </div>
  );
}
