import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

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
  { href: '/articles', label: 'JOURNAL', match: ['/articles', '/womens-wednesday'] },
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

  const isActiveItem = (item: NavItem) => {
    const prefixes = item.match ?? [item.href];
    return prefixes.some((p) => location.pathname === p || location.pathname.startsWith(p + '/'));
  };

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
        padding: '0 clamp(20px, 4vw, 48px)',
        background: solidHeader ? 'rgba(26,26,26,0.97)' : 'rgba(26,26,26,0)',
        borderBottom: solidHeader ? '1px solid #3d3d3d' : '1px solid rgba(61,61,61,0)',
        backdropFilter: solidHeader ? 'blur(4px)' : 'none',
        transition: 'background 300ms cubic-bezier(0.4,0,0.2,1), border-color 300ms cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{ flexShrink: 0, textDecoration: 'none', display: 'flex', alignItems: 'center' }}
        aria-label="DefendHer Sports home"
      >
        <img src="/logo-dhs.png" alt="DefendHer Sports" style={{ height: '56px', width: 'auto', display: 'block' }} />
      </Link>

      {/* Desktop nav */}
      <nav className="hidden md:flex" style={{ gap: '36px', alignItems: 'center', height: '100%' }}>
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

      {/* Mobile toggle */}
      <button
        className="md:hidden"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer', padding: '8px' }}
        aria-label="Toggle menu"
        aria-expanded={isMobileMenuOpen}
      >
        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: '#1a1a1a',
            zIndex: 99,
            padding: 'calc(var(--header-h) + 40px) 24px 40px',
            display: 'flex',
            flexDirection: 'column',
            gap: '28px',
            alignItems: 'flex-start',
            overflowY: 'auto',
          }}
        >
          {navItems.map((item) => (
            <div key={item.href} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Link
                to={item.href}
                style={{
                  ...linkStyle,
                  fontSize: '14px',
                  color: isActiveItem(item) ? '#ffffff' : '#d4d4d4',
                }}
              >
                {item.label}
              </Link>
              {item.children && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', paddingLeft: '16px', borderLeft: '2px solid #3d3d3d' }}>
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      to={child.href}
                      style={{ ...linkStyle, fontSize: '13px', fontWeight: 600, color: location.pathname === child.href ? '#e8ff3a' : '#a0a0a0' }}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
