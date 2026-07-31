import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from '@dr.pogodin/react-helmet';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PRODUCTS, type Product } from '@/lib/products';
import { useCartStore } from '@/lib/cart-store';

const site = 'https://defendhersport.net';

/**
 * Featured layout — image gallery beside full details.
 * Used for the first product so a single-product shop still feels intentional.
 */
function FeaturedProduct({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const [size, setSize] = useState('M');
  const [added, setAdded] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  const images = product.images?.length ? product.images : [product.image];
  const prev = () => setActiveIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setActiveIdx((i) => (i + 1) % images.length);

  function handleAdd() {
    addItem({ id: product.id, name: product.name, price: product.price, size, image: product.image });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 'clamp(32px, 5vw, 64px)',
        alignItems: 'start',
        maxWidth: '1100px',
      }}
    >
      {/* Gallery */}
      <div style={{ maxWidth: '460px' }}>
        <div style={{ position: 'relative', aspectRatio: '4/3', background: '#2e2e2e', borderRadius: '4px', overflow: 'hidden' }}>
          <Link to={`/product/${product.id}`}>
            <img src={images[activeIdx]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </Link>
          {product.badge && (
            <span style={{ position: 'absolute', top: '12px', left: '12px', background: '#e8ff3a', color: '#1a1a1a', fontFamily: 'var(--font-sans)', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', padding: '4px 10px', borderRadius: '2px' }}>
              {product.badge}
            </span>
          )}
          {images.length > 1 && (
            <>
              <button onClick={prev} aria-label="Previous image" style={arrowStyle('left')}>
                <ChevronLeft size={18} />
              </button>
              <button onClick={next} aria-label="Next image" style={arrowStyle('right')}>
                <ChevronRight size={18} />
              </button>
            </>
          )}
        </div>

        {images.length > 1 && (
          <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                aria-label={`View image ${i + 1}`}
                style={{
                  flex: 1,
                  aspectRatio: '1/1',
                  overflow: 'hidden',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  borderRadius: '3px',
                  outline: activeIdx === i ? '2px solid #e8ff3a' : '2px solid #3d3d3d',
                  background: 'none',
                }}
              >
                <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: activeIdx === i ? 1 : 0.45, transition: 'opacity 150ms' }} />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Details */}
      <div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px, 3.5vw, 52px)', fontWeight: 400, letterSpacing: '0.01em', lineHeight: 0.9, color: '#ffffff', textTransform: 'uppercase', margin: '0 0 12px' }}>
          {product.name}
        </h2>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', color: '#8a8a8a', lineHeight: 1.6, margin: '0 0 24px' }}>
          {product.tagline}
        </p>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', color: '#d4d4d4', lineHeight: 1.7, margin: '0 0 28px' }}>
          {product.description}
        </p>

        <div style={{ marginBottom: '28px' }}>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#8a8a8a', marginBottom: '10px' }}>
            Size: <span style={{ color: '#fff' }}>{size}</span>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                aria-pressed={size === s}
                style={{
                  width: '44px',
                  height: '44px',
                  background: size === s ? '#e8ff3a' : 'transparent',
                  border: `2px solid ${size === s ? '#e8ff3a' : '#3d3d3d'}`,
                  borderRadius: '2px',
                  color: size === s ? '#1a1a1a' : '#d4d4d4',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 700,
                  fontSize: '12px',
                  cursor: 'pointer',
                  transition: 'all 150ms',
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '32px' }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '44px', fontWeight: 400, color: '#e8ff3a', lineHeight: 1 }}>
            ${product.price.toFixed(2)}
          </span>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={handleAdd}
              style={{
                background: '#e8ff3a',
                color: '#1a1a1a',
                border: '2px solid #e8ff3a',
                borderRadius: '9999px',
                padding: '14px 28px',
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {added ? 'Added ✓' : 'Add to Cart'}
            </button>
            <Link
              to={`/product/${product.id}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: 'transparent',
                color: '#e8ff3a',
                border: '2px solid #e8ff3a',
                borderRadius: '9999px',
                padding: '14px 28px',
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              View Details
            </Link>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #3d3d3d' }}>
          {product.specs.map((spec, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', padding: '10px 0', borderBottom: '1px solid #3d3d3d' }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: '#8a8a8a' }}>{spec.label}</span>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 700, color: '#fff', textAlign: 'right' }}>{spec.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Compact card used for every product after the first. */
function ProductCard({ product }: { product: Product }) {
  const images = product.images?.length ? product.images : [product.image];
  const [hovered, setHovered] = useState(false);
  const showImage = hovered && images.length > 1 ? images[1] : images[0];

  return (
    <Link
      to={`/product/${product.id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ textDecoration: 'none', display: 'block' }}
    >
      <div style={{ position: 'relative', aspectRatio: '1/1', background: '#2e2e2e', borderRadius: '4px', overflow: 'hidden', marginBottom: '14px' }}>
        <img
          src={showImage}
          alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: hovered ? 'scale(1.04)' : 'scale(1)', transition: 'transform 400ms cubic-bezier(0.4,0,0.2,1)' }}
        />
        {product.badge && (
          <span style={{ position: 'absolute', top: '10px', left: '10px', background: '#e8ff3a', color: '#1a1a1a', fontFamily: 'var(--font-sans)', fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', padding: '3px 8px', borderRadius: '2px' }}>
            {product.badge}
          </span>
        )}
      </div>
      <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', fontWeight: 700, color: '#ffffff', margin: '0 0 4px', lineHeight: 1.3 }}>
        {product.name}
      </h3>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: '#8a8a8a', margin: '0 0 8px', lineHeight: 1.5 }}>
        {product.tagline}
      </p>
      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 700, color: '#e8ff3a' }}>
        ${product.price.toFixed(2)}
      </span>
    </Link>
  );
}

function arrowStyle(side: 'left' | 'right'): React.CSSProperties {
  return {
    position: 'absolute',
    [side]: '8px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(0,0,0,0.5)',
    border: 'none',
    borderRadius: '50%',
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: '#fff',
  };
}

export default function ShopPage() {
  const [featured, ...rest] = PRODUCTS;

  return (
    <>
      <Helmet>
        <title>Shop — DefendHer Sports</title>
        <meta name="description" content="Shop DefendHer protective equipment built for female athletes. CE Level 1 certified, women-specific fit." />
        <link rel="canonical" href={`${site}/shop`} />
      </Helmet>

      <div style={{ paddingTop: 'var(--header-h)', minHeight: '100vh', background: '#1a1a1a' }}>

        {/* Page header */}
        <div style={{ padding: 'clamp(48px, 6vw, 80px) clamp(24px, 6vw, 96px) 40px', borderBottom: '1px solid #3d3d3d' }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#8a8a8a', display: 'block', marginBottom: '12px' }}>
            DefendHer Store
          </span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(48px, 7vw, 88px)', fontWeight: 400, letterSpacing: '0.01em', lineHeight: 0.85, color: '#ffffff', textTransform: 'uppercase', margin: 0 }}>
            PROTECT<br />HER GAME
          </h1>
        </div>

        {/* Featured product */}
        {featured && (
          <section style={{ padding: 'clamp(40px, 5vw, 64px) clamp(24px, 6vw, 96px)' }}>
            <FeaturedProduct product={featured} />
          </section>
        )}

        {/* Remaining products — appears automatically as the catalogue grows */}
        {rest.length > 0 && (
          <section style={{ padding: '0 clamp(24px, 6vw, 96px) clamp(64px, 8vw, 96px)' }}>
            <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8a8a8a', margin: '0 0 24px', paddingTop: '40px', borderTop: '1px solid #3d3d3d' }}>
              More Gear
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 'clamp(20px, 3vw, 36px)', maxWidth: '1400px' }}>
              {rest.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        {/* Empty state */}
        {PRODUCTS.length === 0 && (
          <div style={{ padding: 'clamp(48px, 6vw, 96px)' }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', color: '#8a8a8a', margin: 0 }}>
              Products coming soon.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
