import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCartStore } from '@/lib/cart-store';

export default function Header() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { href: '/shop', label: 'SHOP' },
    { href: '/articles', label: 'JOURNAL' },
    { href: '/about', label: 'ABOUT' },
    { href: '/contact', label: 'CONTACT' },
  ];

  const isHome = location.pathname === '/';
  const isShop = location.pathname === '/shop' || location.pathname.startsWith('/shop/');

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 48px',
        background:
          isHome && !isScrolled && !isMobileMenuOpen
            ? 'rgba(26,26,26,0)'
            : 'rgba(26,26,26,0.97)',
        borderBottom:
          isHome && !isScrolled && !isMobileMenuOpen
            ? '1px solid rgba(61,61,61,0)'
            : '1px solid #3d3d3d',
        backdropFilter: isScrolled || !isHome ? 'blur(4px)' : 'none',
        transition: 'background 300ms cubic-bezier(0.4,0,0.2,1), border-color 300ms cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{ flexShrink: 0, textDecoration: 'none', display: 'flex', alignItems: 'center' }}
        aria-label="DefendHer home"
      >
        <img src="/defendher_logo.png" alt="DefendHer" style={{ height: '52px', width: 'auto', display: 'block', filter: 'brightness(3)', mixBlendMode: 'screen' }} />
      </Link>

      {/* Desktop nav */}
      <nav className="hidden md:flex" style={{ gap: '36px', alignItems: 'center' }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/');
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
                color: isActive ? 'var(--chalk-primary, #ffffff)' : 'var(--chalk-secondary, #d4d4d4)',
                textDecoration: 'none',
                position: 'relative',
                paddingBottom: '4px',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = 'var(--chalk-primary, #ffffff)';
                const line = (e.currentTarget as HTMLElement).querySelector('.nav-underline') as HTMLElement;
                if (line) line.style.transform = 'scaleX(1)';
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.color = 'var(--chalk-secondary, #d4d4d4)';
                }
                const line = (e.currentTarget as HTMLElement).querySelector('.nav-underline') as HTMLElement;
                if (line && !isActive) line.style.transform = 'scaleX(0)';
              }}
            >
              {item.label}
              {/* Kit-spec: 2px volt underline, scaleX from left, active always shown */}
              <span
                className="nav-underline"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'var(--volt-primary, #e8ff3a)',
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

      {/* Desktop CTA + Cart + mobile toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {/* Kit-spec: nav CTA — volt border pill, desktop only, hidden on shop pages */}
        {!isShop && (
        <Link
          to="/shop"
          className="hidden md:inline-flex"
          style={{
            alignItems: 'center',
            background: 'transparent',
            border: '2px solid var(--volt-primary, #e8ff3a)',
            color: 'var(--volt-primary, #e8ff3a)',
            borderRadius: '9999px',
            padding: '10px 22px',
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            transition: 'background 150ms cubic-bezier(0.4,0,0.2,1), color 150ms cubic-bezier(0.4,0,0.2,1)',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = 'var(--volt-primary, #e8ff3a)';
            el.style.color = 'var(--concrete-900, #1a1a1a)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = 'transparent';
            el.style.color = 'var(--volt-primary, #e8ff3a)';
          }}
        >
          SHOP NOW
        </Link>
        )}

        <Link
          to="/cart"
          style={{ position: 'relative', color: 'var(--chalk-secondary, #d4d4d4)', display: 'flex', alignItems: 'center', transition: 'color 150ms cubic-bezier(0.4,0,0.2,1)' }}
          aria-label={`Cart, ${totalItems} item${totalItems !== 1 ? 's' : ''}`}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--chalk-primary, #ffffff)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--chalk-secondary, #d4d4d4)'; }}
        >
          <ShoppingCart size={20} />
          {totalItems > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '-6px',
                right: '-8px',
                width: '16px',
                height: '16px',
                background: '#e8ff3a',
                color: '#1a1a1a',
                borderRadius: '50%',
                fontSize: '9px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: 1,
              }}
              aria-hidden="true"
            >
              {totalItems}
            </span>
          )}
        </Link>

        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer', padding: '8px' }}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu overlay — z-index 99 sits below the nav bar (100) per kit spec */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'var(--concrete-900, #1a1a1a)',
            zIndex: 99,
            padding: '104px 24px 40px', /* 64px bar + 40px breathing room */
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
            alignItems: 'flex-start',
            overflow: 'hidden',
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
                color: location.pathname === item.href ? 'var(--chalk-primary, #ffffff)' : 'var(--chalk-secondary, #d4d4d4)',
                textDecoration: 'none',
              }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/shop"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: 'transparent',
              border: '2px solid var(--volt-primary, #e8ff3a)',
              color: 'var(--volt-primary, #e8ff3a)',
              borderRadius: '9999px',
              padding: '10px 22px',
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              textDecoration: 'none',
              marginTop: '8px',
            }}
          >
            SHOP NOW
          </Link>
        </div>
      )}
    </header>
  );
}
