# DefendHer Sports

E-commerce site for DefendHer women's hockey neck protectors.

## Stack

- React 19 + TypeScript
- Vite 6 (build tool)
- React Router 7 (routing)
- Zustand (cart state)
- TanStack Query (data fetching)
- Tailwind CSS + inline styles
- Deployed on Vercel (auto-deploys from `main`)

## Development

```
npm install
npm run dev        # local dev server
npm run build      # production build to dist/client
npm run type-check # TypeScript check
npm run lint       # ESLint
```

## Structure

- `src/pages/` — one file per route (shop, product, cart, checkout, about, contact, articles)
- `src/layouts/` — Header, Footer, RootLayout
- `src/lib/` — products data, articles data, cart store, API helpers
- `public/` — static assets (logo, images)

## Deployment

Push to `main` on GitHub → Vercel builds and deploys automatically.
Build config lives in `vercel.json`.

## Planned

- Supabase backend for auth, orders, and cart persistence
- Contact form + newsletter wiring
