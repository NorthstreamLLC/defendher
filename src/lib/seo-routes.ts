/**
 * Agent-editable registry of publicly-crawlable routes. Consumed by the
 * /sitemap.xml handler in src/server/entry.ts.
 *
 * Guidelines for maintaining this file:
 * - Static public paths are synced automatically from src/routes.tsx.
 * - Do not include dynamic-param routes like "/products/:id" directly.
 *   Instead, enumerate real values (e.g. "/products/desk-pro") or skip.
 * - `path` MUST start with "/".
 * - Priorities are between 0.0 and 1.0. Home = 1.0, main sections = 0.8,
 *   deep pages = 0.5.
 * - Dev-only or auth-required routes MUST NOT be listed.
 */

export interface SeoRoute {
  path: string;
  changefreq?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
  lastmod?: string;
}

export const seoRoutes: SeoRoute[] = [
  { path: "/", changefreq: "weekly", priority: 1.0 },
  { path: "/shop", changefreq: "monthly", priority: 0.8 },
  { path: "/cart", changefreq: "monthly", priority: 0.8 },
  { path: "/checkout", changefreq: "monthly", priority: 0.8 },
  { path: "/order-confirmation", changefreq: "monthly", priority: 0.8 },
  { path: "/account", changefreq: "monthly", priority: 0.8 },
  { path: "/account/orders", changefreq: "monthly", priority: 0.5 },
  { path: "/articles", changefreq: "monthly", priority: 0.8 },
  { path: "/sitemap", changefreq: "monthly", priority: 0.8 },
];
