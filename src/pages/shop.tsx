import { Link } from 'react-router-dom';
import { Helmet } from '@dr.pogodin/react-helmet';
import { PRODUCTS } from '@/lib/products';
import { useCartStore } from '@/lib/cart-store';

const site = 'https://defendhersport.net';

export default function ShopPage() {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <>
      <Helmet>
        <title>Shop — DefendHer Sport</title>
        <meta name="description" content="Shop DefendHer neck protectors for women's hockey. CE Level 1 certified, women-specific fit." />
        <link rel="canonical" href={`${site}/shop`} />
        <meta property="og:title" content="Shop — DefendHer Sport" />
        <meta property="og:description" content="Shop DefendHer neck protectors for women's hockey." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${site}/shop`} />
      </Helmet>

      <div style={{ paddingTop: '64px', minHeight: '100vh', background: '#1a1a1a' }}>
        {/* Page header */}
        <div
          style={{
            padding: 'clamp(48px, 6vw, 80px) 48px 40px',
            borderBottom: '1px solid #3d3d3d',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: '#8a8a8a',
              display: 'block',
              marginBottom: '12px',
            }}
          >
            DefendHer Store
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(48px, 7vw, 88px)',
              fontWeight: 400,
              letterSpacing: '0.01em',
              lineHeight: 0.85,
              color: '#ffffff',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            PROTECT<br />HER GAME
          </h1>
        </div>

        {/* Product grid */}
        <div style={{ padding: '48px 48px 96px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '2px',
              background: '#3d3d3d',
              border: '1px solid #3d3d3d',
            }}
          >
            {PRODUCTS.map((product) => (
              <div
                key={product.id}
                style={{
                  background: '#2e2e2e',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', display: 'block' }}>
                  <div
                    style={{
                      position: 'relative',
                      aspectRatio: '4/3',
                      overflow: 'hidden',
                      background: '#1a1a1a',
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      width={600}
                      height={450}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
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
                          padding: '4px 8px',
                          borderRadius: '2px',
                        }}
                      >
                        {product.badge}
                      </span>
                    )}
                  </div>
                </Link>

                <div style={{ padding: '20px 24px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h2
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(24px, 3vw, 36px)',
                      fontWeight: 400,
                      letterSpacing: '0.01em',
                      lineHeight: 0.9,
                      color: '#ffffff',
                      textTransform: 'uppercase',
                      margin: '0 0 8px',
                    }}
                  >
                    {product.name}
                  </h2>
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '13px',
                      color: '#8a8a8a',
                      lineHeight: 1.5,
                      marginBottom: '20px',
                      flex: 1,
                    }}
                  >
                    {product.tagline}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'space-between',
                      gap: '16px',
                      paddingTop: '16px',
                      borderTop: '1px solid #3d3d3d',
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: 'clamp(28px, 3.5vw, 40px)',
                          fontWeight: 400,
                          letterSpacing: '0.01em',
                          lineHeight: 1,
                          color: '#ffffff',
                        }}
                      >
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        addItem({ id: product.id, name: product.name, price: product.price, size: 'M', image: product.image })
                      }
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'transparent',
                        border: '2px solid #e8ff3a',
                        color: '#e8ff3a',
                        borderRadius: '9999px',
                        padding: '10px 20px',
                        fontFamily: 'var(--font-sans)',
                        fontWeight: 700,
                        fontSize: '12px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      ADD
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
