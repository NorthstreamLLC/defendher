import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { href: '/product', label: 'PRODUCT' },
    { href: '/about', label: 'ABOUT' },
    { href: '/articles', label: 'JOURNAL' },
    { href: '/videos', label: 'VIDEOS' },
    { href: '/contact', label: 'CONTACT' },
  ];

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
      <nav className="hidden md:flex" style={{ gap: '36px', alignItems: 'center' }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/') || (item.href === '/articles' && location.pathname.startsWith('/womens-wednesday'));
          return (
            <Link
              key={item.href}
              to={item.href}
              aria-current={isActive ? 'page' : undefined}
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: isActive ? '#ffffff' : '#d4d4d4',
                textDecoration: 'none',
                position: 'relative',
                paddingBottom: '4px',
                transition: 'color 150ms',
              }}
              onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.color = '#ffffff'; }}
              onMouseOut={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = '#d4d4d4'; }}
            >
              {item.label}
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
            gap: '32px',
            alignItems: 'flex-start',
            overflowY: 'auto',
          }}
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: location.pathname === item.href ? '#ffffff' : '#d4d4d4',
                textDecoration: 'none',
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
