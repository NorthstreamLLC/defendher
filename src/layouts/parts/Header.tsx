import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useCartStore } from '@/lib/cart-store';
import { PRODUCTS } from '@/lib/products';

export default function Header() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [shopMenuOpen, setShopMenuOpen] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);
  const totalItems = useCartStore((s) => s.totalItems());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setShopMenuOpen(false);
  }, [location.pathname]);

  // Close the mega-menu on Escape
  useEffect(() => {
    if (!shopMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShopMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [shopMenuOpen]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const openShopMenu = () => {
    window.clearTimeout(closeTimer.current);
    setShopMenuOpen(true);
  };
  // Small delay so moving the cursor from the link into the panel doesn't close it
  const scheduleCloseShopMenu = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setShopMenuOpen(false), 140);
  };

  const navItems = [
    { href: '/shop', label: 'SHOP' },
    { href: '/about', label: 'ABOUT' },
    { href: '/contact', label: 'CONTACT' },
    { href: '/videos', label: 'VIDEOS' },
    { href: '/articles', label: 'JOURNAL' },
  ];

  const isHome = location.pathname === '/';
  const isShop = location.pathname === '/shop' || location.pathname.startsWith('/shop/');

  const solidHeader = !isHome || isScrolled || isMobileMenuOpen || shopMenuOpen;

  // Mega-menu tiles derive from the product list, so adding products updates the menu
  const shopTiles = [
    ...PRODUCTS.map((p) => ({
      href: `/product/${p.id}`,
      label: p.name,
      image: p.image,
      badge: p.badge,
    })),
    { href: '/shop', label: 'Shop All', image: PRODUCTS[0]?.image ?? '/shop.webp', badge: undefined },
  ];

  return (
    <header
      onMouseLeave={scheduleCloseShopMenu}
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
        padding: '0 48px',
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
        <img src="/logo-dhs.png" alt="DefendHer Sports" style={{ height: '64px', width: 'auto', display: 'block' }} />
      </Link>

      {/* Desktop nav */}
      <nav className="hidden md:flex" style={{ gap: '36px', alignItems: 'center' }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/');
          const hasMenu = item.href === '/shop';
          return (
            <Link
              key={item.href}
              to={item.href}
              aria-current={isActive ? 'page' : undefined}
              aria-expanded={hasMenu ? shopMenuOpen : undefined}
              onMouseEnter={hasMenu ? openShopMenu : scheduleCloseShopMenu}
              onFocus={hasMenu ? openShopMenu : undefined}
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: isActive || (hasMenu && shopMenuOpen) ? '#ffffff' : '#d4d4d4',
                textDecoration: 'none',
                position: 'relative',
                paddingBottom: '4px',
                transition: 'color 150ms cubic-bezier(0.4,0,0.2,1)',
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLElement).style.color = '#ffffff';
              }}
              onMouseOut={(e) => {
                if (!isActive && !(hasMenu && shopMenuOpen)) {
                  (e.currentTarget as HTMLElement).style.color = '#d4d4d4';
                }
              }}
            >
              {item.label}
              <span
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'var(--volt-primary, #e8ff3a)',
                  transform: isActive || (hasMenu && shopMenuOpen) ? 'scaleX(1)' : 'scaleX(0)',
                  transformOrigin: 'left',
                  transition: 'transform 150ms cubic-bezier(0.4,0,0.2,1)',
                  display: 'block',
                }}
              />
            </Link>
          );
        })}
      </nav>

      {/* Shop mega-menu */}
      <div
        className="hidden md:block"
        onMouseEnter={openShopMenu}
        onMouseLeave={scheduleCloseShopMenu}
        style={{
          position: 'fixed',
          top: 'var(--header-h)',
          left: 0,
          right: 0,
          background: 'rgba(20,20,20,0.985)',
          borderBottom: '1px solid #3d3d3d',
          backdropFilter: 'blur(8px)',
          padding: shopMenuOpen ? 'clamp(28px, 3vw, 44px) 48px' : '0 48px',
          maxHeight: shopMenuOpen ? '70vh' : 0,
          opacity: shopMenuOpen ? 1 : 0,
          overflow: 'hidden',
          pointerEvents: shopMenuOpen ? 'auto' : 'none',
          transition: 'max-height 260ms cubic-bezier(0.4,0,0.2,1), opacity 200ms cubic-bezier(0.4,0,0.2,1), padding 260ms cubic-bezier(0.4,0,0.2,1)',
          zIndex: 99,
        }}
        aria-hidden={!shopMenuOpen}
      >
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '11px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#8a8a8a',
            display: 'block',
            marginBottom: '20px',
          }}
        >
          Shop
        </span>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 240px))',
            gap: 'clamp(16px, 2vw, 28px)',
          }}
        >
          {shopTiles.map((tile) => (
            <Link
              key={tile.href + tile.label}
              to={tile.href}
              tabIndex={shopMenuOpen ? 0 : -1}
              style={{ textDecoration: 'none', display: 'block' }}
              onMouseEnter={(e) => {
                const img = e.currentTarget.querySelector('img');
                if (img) (img as HTMLElement).style.transform = 'scale(1.06)';
              }}
              onMouseLeave={(e) => {
                const img = e.currentTarget.querySelector('img');
                if (img) (img as HTMLElement).style.transform = 'scale(1)';
              }}
            >
              <div
                style={{
                  position: 'relative',
                  aspectRatio: '1/1',
                  background: '#2e2e2e',
                  borderRadius: '3px',
                  overflow: 'hidden',
                  marginBottom: '10px',
                }}
              >
                <img
                  src={tile.image}
                  alt=""
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 300ms cubic-bezier(0.4,0,0.2,1)',
                  }}
                />
                {tile.badge && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '8px',
                      left: '8px',
                      background: 'var(--volt-primary, #e8ff3a)',
                      color: '#1a1a1a',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '9px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      padding: '3px 8px',
                      borderRadius: '2px',
                    }}
                  >
                    {tile.badge}
                  </span>
                )}
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#ffffff',
                  display: 'block',
                  lineHeight: 1.3,
                }}
              >
                {tile.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Desktop CTA + Cart + mobile toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
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
              el.style.color = '#1a1a1a';
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
          style={{ position: 'relative', color: '#d4d4d4', display: 'flex', alignItems: 'center', transition: 'color 150ms cubic-bezier(0.4,0,0.2,1)' }}
          aria-label={`Cart, ${totalItems} item${totalItems !== 1 ? 's' : ''}`}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#ffffff'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#d4d4d4'; }}
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

      {/* Mobile menu overlay */}
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
