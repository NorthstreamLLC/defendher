import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

import { socials } from '../../components/Socials';

interface NavChild {
  href: string;
  label: string;
}

interface NavItem {
  href: string;
  label: string;
  children?: NavChild[];
  match?: string[];
}

const navItems: NavItem[] = [
  { href: '/product', label: 'PRODUCT' },
  {
    href: '/about',
    label: 'ABOUT',
    match: ['/about', '/team', '/testimonials', '/videos'],
    children: [
      { href: '/about', label: 'Our story' },
      { href: '/team', label: 'Meet the team' },
      { href: '/testimonials', label: 'Testimonials' },
      { href: '/videos', label: 'Videos' },
    ],
  },
  {
    href: '/articles',
    label: 'JOURNAL',
    match: ['/articles', '/womens-wednesday'],
    children: [
      { href: '/articles', label: 'All articles' },
      { href: '/womens-wednesday', label: "Women's Wednesday" },
    ],
  },
  { href: '/contact', label: 'CONTACT' },
];

const linkStyle: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontWeight: 700,
  fontSize: '12px',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  textDecoration: 'none',
  transition: 'color 150ms',
};

export default function Header() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  const isActiveItem = (item: NavItem) => {
    const prefixes = item.match ?? [item.href];
    return prefixes.some((p) => location.pathname === p || location.pathname.startsWith(p + '/'));
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setOpenMenu(null);
  }, [location.pathname]);

  // When the mobile menu opens, expand the group for the page you're on.
  useEffect(() => {
    if (isMobileMenuOpen) {
      const current = navItems.find((item) => item.children && isActiveItem(item));
      setOpenGroup(current ? current.label : null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobileMenuOpen]);

  // Lock page scroll behind the open menu and let Escape close it.
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [isMobileMenuOpen]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  const isHome = location.pathname === '/';
  const solidHeader = !isHome || isScrolled || isMobileMenuOpen;

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: 'var(--header-h)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 clamp(16px, 4vw, 48px)',
        background: solidHeader ? 'rgba(26,26,26,0.97)' : 'rgba(26,26,26,0)',
        borderBottom: solidHeader ? '1px solid #3d3d3d' : '1px solid rgba(61,61,61,0)',
        // backdrop-filter would turn the header into the containing block for the fixed mobile menu
        backdropFilter: solidHeader && !isMobileMenuOpen ? 'blur(4px)' : 'none',
        transition: 'background 300ms cubic-bezier(0.4,0,0.2,1), border-color 300ms cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      <style>{`
        @keyframes dh-menu-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes dh-menu-fade { from { opacity: 0; } to { opacity: 1; } }
        .dh-mobile-controls { display: flex; align-items: center; gap: 8px; }
        @media (min-width: 768px) { .dh-mobile-controls, .dh-menu-panel { display: none !important; } }
        .dh-menu-panel { animation: dh-menu-fade 220ms ease both; }
        .dh-menu-panel .dh-menu-item { animation: dh-menu-in 420ms cubic-bezier(0.22, 1, 0.36, 1) both; }
        .dh-menu-panel .dh-menu-item:nth-child(1) { animation-delay: 40ms; }
        .dh-menu-panel .dh-menu-item:nth-child(2) { animation-delay: 90ms; }
        .dh-menu-panel .dh-menu-item:nth-child(3) { animation-delay: 140ms; }
        .dh-menu-panel .dh-menu-item:nth-child(4) { animation-delay: 190ms; }
        .dh-menu-panel .dh-menu-item:nth-child(5) { animation-delay: 250ms; }
        .dh-menu-sub { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 280ms cubic-bezier(0.22, 1, 0.36, 1); }
        .dh-menu-sub.open { grid-template-rows: 1fr; }
        .dh-menu-sub > div { overflow: hidden; }
        .dh-menu-chevron { transition: transform 250ms cubic-bezier(0.22, 1, 0.36, 1); }
        .dh-menu-chevron.open { transform: rotate(180deg); }
        @media (prefers-reduced-motion: reduce) {
          .dh-menu-panel, .dh-menu-panel .dh-menu-item { animation: none; }
          .dh-menu-sub, .dh-menu-chevron { transition: none; }
        }
      `}</style>

      {/* Logo */}
      <Link
        to="/"
        style={{ flexShrink: 0, textDecoration: 'none', display: 'flex', alignItems: 'center' }}
        aria-label="DefendHer Sports home"
        onClick={closeMenu}
      >
        <img src="/logo-dhs.png" alt="DefendHer Sports" style={{ height: '56px', width: 'auto', display: 'block' }} />
      </Link>

      {/* Desktop nav */}
      <nav className="hidden md:flex" style={{ gap: '36px', alignItems: 'center', height: '100%' }} aria-label="Main">
        {navItems.map((item) => {
          const isActive = isActiveItem(item);
          const link = (
            <Link
              to={item.href}
              aria-current={location.pathname === item.href ? 'page' : undefined}
              style={{
                ...linkStyle,
                color: isActive ? '#ffffff' : '#d4d4d4',
                position: 'relative',
                paddingBottom: '4px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
              onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.color = '#ffffff'; }}
              onMouseOut={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = '#d4d4d4'; }}
            >
              {item.label}
              {item.children && <ChevronDown size={13} aria-hidden="true" />}
              <span
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: '#e8ff3a',
                  transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                  transformOrigin: 'left',
                  transition: 'transform 150ms cubic-bezier(0.4,0,0.2,1)',
                  display: 'block',
                }}
              />
            </Link>
          );

          if (!item.children) {
            return (
              <div key={item.href} style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                {link}
              </div>
            );
          }

          const open = openMenu === item.label;
          return (
            <div
              key={item.href}
              style={{ position: 'relative', display: 'flex', alignItems: 'center', height: '100%' }}
              onMouseEnter={() => setOpenMenu(item.label)}
              onMouseLeave={() => setOpenMenu(null)}
              onFocus={() => setOpenMenu(item.label)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpenMenu(null);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setOpenMenu(null);
              }}
            >
              {link}
              {open && (
                <div
                  role="menu"
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '-16px',
                    minWidth: '210px',
                    background: 'rgba(26,26,26,0.98)',
                    border: '1px solid #3d3d3d',
                    borderTop: '2px solid #e8ff3a',
                    padding: '8px 0',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  {item.children.map((child) => {
                    const childActive = location.pathname === child.href;
                    return (
                      <Link
                        key={child.href}
                        to={child.href}
                        role="menuitem"
                        style={{
                          ...linkStyle,
                          display: 'block',
                          padding: '12px 20px',
                          fontSize: '13px',
                          color: childActive ? '#e8ff3a' : '#d4d4d4',
                        }}
                        onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.color = '#ffffff'; (e.currentTarget as HTMLElement).style.background = '#222222'; }}
                        onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.color = childActive ? '#e8ff3a' : '#d4d4d4'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                      >
                        {child.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Mobile controls: join + menu */}
      <div className="dh-mobile-controls">
        <Link
          to="/product#updates"
          onClick={closeMenu}
          style={{ background: '#e8ff3a', color: '#1a1a1a', borderRadius: '9999px', padding: '12px 18px', minHeight: '40px', display: 'inline-flex', alignItems: 'center', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.06em', textDecoration: 'none', whiteSpace: 'nowrap' }}
        >
          Join
        </Link>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="dh-menu-panel"
          role="dialog"
          aria-label="Site menu"
          style={{
            position: 'fixed',
            top: 'var(--header-h)',
            left: 0,
            right: 0,
            bottom: 0,
            background: '#141414',
            zIndex: 99,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            padding: '8px clamp(20px, 6vw, 32px) 32px',
          }}
        >
          <nav aria-label="Mobile" style={{ display: 'flex', flexDirection: 'column' }}>
            {navItems.map((item) => {
              const active = isActiveItem(item);
              const rowStyle: React.CSSProperties = {
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(34px, 10vw, 44px)',
                lineHeight: 1,
                textTransform: 'uppercase',
                letterSpacing: '0.01em',
                color: active ? '#e8ff3a' : '#ffffff',
                textDecoration: 'none',
                background: 'none',
                border: 'none',
                borderBottom: '1px solid #2e2e2e',
                width: '100%',
                minHeight: '68px',
                padding: '14px 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                textAlign: 'left',
              };

              if (!item.children) {
                return (
                  <div key={item.href} className="dh-menu-item">
                    <Link to={item.href} onClick={closeMenu} style={rowStyle} aria-current={location.pathname === item.href ? 'page' : undefined}>
                      {item.label}
                    </Link>
                  </div>
                );
              }

              const expanded = openGroup === item.label;
              return (
                <div key={item.href} className="dh-menu-item">
                  <button
                    type="button"
                    onClick={() => setOpenGroup(expanded ? null : item.label)}
                    aria-expanded={expanded}
                    aria-controls={`sub-${item.label}`}
                    style={rowStyle}
                  >
                    {item.label}
                    <ChevronDown className={`dh-menu-chevron${expanded ? ' open' : ''}`} size={26} aria-hidden="true" />
                  </button>
                  <div id={`sub-${item.label}`} className={`dh-menu-sub${expanded ? ' open' : ''}`}>
                    <div>
                      <div style={{ display: 'flex', flexDirection: 'column', padding: '4px 0 12px 4px', borderBottom: '1px solid #2e2e2e' }}>
                        {item.children.map((child) => {
                          const childActive = location.pathname === child.href;
                          return (
                            <Link
                              key={child.href}
                              to={child.href}
                              onClick={closeMenu}
                              tabIndex={expanded ? 0 : -1}
                              style={{
                                fontFamily: 'var(--font-sans)',
                                fontSize: '18px',
                                fontWeight: 600,
                                color: childActive ? '#e8ff3a' : '#d4d4d4',
                                textDecoration: 'none',
                                padding: '14px 0 14px 16px',
                                minHeight: '48px',
                                display: 'flex',
                                alignItems: 'center',
                                borderLeft: `2px solid ${childActive ? '#e8ff3a' : '#3d3d3d'}`,
                              }}
                            >
                              {child.label}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>

          <div className="dh-menu-item" style={{ marginTop: 'auto', paddingTop: '32px' }}>
            <Link
              to="/product#updates"
              onClick={closeMenu}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e8ff3a', color: '#1a1a1a', borderRadius: '9999px', padding: '16px 24px', fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.06em', textDecoration: 'none', minHeight: '52px' }}
            >
              Join the launch list
            </Link>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', marginTop: '24px' }}>
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{ width: '48px', height: '48px', borderRadius: '9999px', border: '1px solid #3d3d3d', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#d4d4d4' }}
                >
                  <Icon />
                </a>
              ))}
            </div>
            <a
              href="mailto:Defendhersports@gmail.com"
              style={{ display: 'block', textAlign: 'center', marginTop: '20px', fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#8a8a8a', textDecoration: 'none' }}
            >
              Defendhersports@gmail.com
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
