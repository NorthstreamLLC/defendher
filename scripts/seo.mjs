// Runs after `vite build`. Writes sitemap.xml and a copy of index.html per route with that
// page's own title, description, canonical and share tags, so crawlers and social scrapers
// that don't run JavaScript see the right metadata. Never fails the build.
import fs from 'node:fs';
import path from 'node:path';
import { buildSync } from 'esbuild';

const SITE = 'https://defendhersportsgear.com';
const DIST = 'dist/client';

const PAGES = {
  '/': 'src/pages/index.tsx',
  '/product': 'src/pages/product.tsx',
  '/about': 'src/pages/about.tsx',
  '/team': 'src/pages/team.tsx',
  '/testimonials': 'src/pages/testimonials.tsx',
  '/articles': 'src/pages/articles/index.tsx',
  '/womens-wednesday': 'src/pages/womens-wednesday/index.tsx',
  '/contact': 'src/pages/contact.tsx',
  '/videos': 'src/pages/videos.tsx',
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

async function loadData(file) {
  const out = buildSync({ entryPoints: [file], bundle: true, format: 'esm', platform: 'node', write: false });
  const code = out.outputFiles[0].text;
  return import('data:text/javascript;base64,' + Buffer.from(code).toString('base64'));
}

function fromHelmet(file) {
  try {
    const src = fs.readFileSync(file, 'utf8');
    const title = src.match(/<title>([^<]+)<\/title>/)?.[1]?.trim();
    const description = src.match(/name="description"\s+content=(?:"([^"]+)"|\{`([^`]+)`\})/);
    return { title, description: (description?.[1] || description?.[2])?.trim() };
  } catch {
    return {};
  }
}

function page(base, route, meta, image) {
  const url = SITE + (route === '/' ? '/' : route);
  const img = image ? (image.startsWith('http') ? image : SITE + image) : `${SITE}/brand-banner.jpg`;
  const tags = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:site_name" content="DefendHer Sports" />`,
    `<meta property="og:type" content="${meta.type || 'website'}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${img}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${img}" />`,
  ].join('\n    ');
  const stripped = base
    .replace(/<title>[\s\S]*?<\/title>\s*/i, '')
    .replace(/<link rel="canonical"[^>]*>\s*/gi, '')
    .replace(/<meta (?:name|property)="(?:description|og:[a-z_:]+|twitter:[a-z_:]+)"[^>]*>\s*/gi, '');
  return stripped.replace('</head>', `    ${tags}\n  </head>`);
}

function write(route, html) {
  const dir = route === '/' ? DIST : path.join(DIST, route);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
}

async function main() {
  const baseFile = path.join(DIST, 'index.html');
  const base = fs.readFileSync(baseFile, 'utf8');
  const today = new Date().toISOString().slice(0, 10);
  const urls = [];

  for (const [route, file] of Object.entries(PAGES)) {
    const found = fromHelmet(file);
    if (!found.title || !found.description) {
      console.warn(`[seo] no title/description found for ${route}, keeping defaults`);
      urls.push(route);
      continue;
    }
    write(route, page(base, route, found));
    urls.push(route);
  }

  try {
    const { ARTICLES } = await loadData('src/lib/articles.ts');
    for (const a of ARTICLES) {
      const route = `/articles/${a.slug}`;
      write(route, page(base, route, { title: `${a.title} | DefendHer Sports`, description: a.subtitle, type: 'article' }, a.heroImage));
      urls.push(route);
    }
  } catch (e) {
    console.warn('[seo] articles skipped:', e.message);
  }

  try {
    const { WOMENS_WEDNESDAY } = await loadData('src/lib/womens-wednesday.ts');
    for (const w of WOMENS_WEDNESDAY) {
      const route = `/womens-wednesday/${w.slug}`;
      write(route, page(base, route, { title: `${w.title} | DefendHer Sports`, description: w.summary, type: 'article' }, w.hero || w.image));
      urls.push(route);
    }
  } catch (e) {
    console.warn('[seo] women\'s wednesday skipped:', e.message);
  }

  const sitemap =
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map((u) => `  <url><loc>${SITE}${u === '/' ? '/' : u}</loc><lastmod>${today}</lastmod></url>`).join('\n') +
    `\n</urlset>\n`;
  fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemap);
  console.log(`[seo] wrote sitemap.xml and ${urls.length} route pages`);
}

main().catch((e) => console.warn('[seo] skipped:', e.message));
