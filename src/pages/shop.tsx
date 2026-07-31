import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from '@dr.pogodin/react-helmet';
import { PRODUCTS, type Product } from '@/lib/products';

const site = 'https://defendhersport.net';

/**
 * Product tile. Hovering swaps to the second photo so shoppers can see another
 * angle without leaving the grid. The whole card links to the product page.
 */
function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const images = product.images?.length ? product.images : [product.image];
  const shown = hovered && images.length > 1 ? images[1] : images[0];

  return (
    <Link
      to={`/product/${product.id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ textDecoration: 'none', display: 'block' }}
    >
      <div
        style={{
          position: 'relative',
          aspectRatio: '1/1',
          background: '#2e2e2e',
          borderRadius: '4px',
          overflow: 'hidden',
          marginBottom: '16px',
        }}
      >
        <img
          src={shown}
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 400ms cubic-bezier(0.4,0,0.2,1)',
          }}
        />

        {product.badge && (
          <span
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              background: '#e8ff3a',
              color: '#1a1a1a',
              fontFamily: 'var(--font-sans)',
              fontSize: '10px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              padding: '4px 10px',
              borderRadius: '2px',
            }}
          >
            {product.badge}
          </span>
        )}

        {/* Quick view bar, revealed on hover */}
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(232,255,58,0.94)',
            color: '#1a1a1a',
            fontFamily: 'var(--font-sans)',
            fontSize: '11px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            textAlign: 'center',
            padding: '12px 0',
            transform: hovered ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 250ms cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          View Product
        </span>
      </div>

      <h2
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '15px',
          fontWeight: 700,
          color: '#ffffff',
          margin: '0 0 6px',
          lineHeight: 1.3,
        }}
      >
        {product.name}
      </h2>
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '12px',
          color: '#8a8a8a',
          margin: '0 0 10px',
          lineHeight: 1.5,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        {product.sizes.join(' · ')}
      </p>
      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', fontWeight: 700, color: '#e8ff3a' }}>
        ${product.price.toFixed(2)}
      </span>
    </Link>
  );
}

export default function ShopPage() {
  const count = PRODUCTS.length;

  return (
    <>
      <Helmet>
        <title>Shop — DefendHer Sports</title>
        <meta name="description" content="Shop DefendHer protective equipment built for female athletes. CE Level 1 certified, women-specific fit." />
        <link rel="canonical" href={`${site}/shop`} />
      </Helmet>

      <div style={{ paddingTop: 'var(--header-h)', minHeight: '100vh', background: '#1a1a1a' }}>

        {/* Page header */}
        <div style={{ padding: 'clamp(48px, 6vw, 80px) clamp(24px, 6vw, 96px) 40px' }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#8a8a8a', display: 'block', marginBottom: '12px' }}>
            DefendHer Store
          </span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(48px, 7vw, 88px)', fontWeight: 400, letterSpacing: '0.01em', lineHeight: 0.85, color: '#ffffff', textTransform: 'uppercase', margin: 0 }}>
            PROTECT<br />HER GAME
          </h1>
        </div>

        {/* Results bar */}
        <div
          style={{
            borderTop: '1px solid #3d3d3d',
            borderBottom: '1px solid #3d3d3d',
            padding: '16px clamp(24px, 6vw, 96px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#d4d4d4' }}>
            {count} {count === 1 ? 'Result' : 'Results'}
          </span>
        </div>

        {/* Product grid */}
        <div style={{ padding: 'clamp(32px, 4vw, 56px) clamp(24px, 6vw, 96px) clamp(64px, 8vw, 96px)' }}>
          {count === 0 ? (
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', color: '#8a8a8a', margin: 0 }}>
              Products coming soon.
            </p>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: 'clamp(24px, 3vw, 40px)',
                maxWidth: '1400px',
              }}
            >
              {PRODUCTS.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
