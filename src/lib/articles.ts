export interface Article {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  category: string;
  heroImage: string;
  heroAlt: string;
  body: ArticleBlock[];
}

export type ArticleBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'pullquote'; text: string; attribution?: string }
  | { type: 'image'; src: string; alt: string; caption?: string }
  | { type: 'list'; items: string[] };

export const ARTICLES: Article[] = [
  {
    slug: 'why-girls-hockey-needs-better-gear',
    title: "Why Girls' Hockey Deserves Better Gear",
    subtitle: "Every piece of protective equipment on the market was designed for men. Here's what that costs young female players — and what we're doing about it.",
    date: 'June 18, 2026',
    readTime: '6 min read',
    category: 'Protection',
    heroImage: '/airo-assets/images/pages/article/hero-girl-hockey',
    heroAlt: 'Young female hockey player on the ice',
    body: [
      {
        type: 'paragraph',
        text: "Walk into any hockey equipment store and ask for a neck protector designed for a girl. The answer you'll get — if the staff is being honest — is that there isn't one. There are \"youth\" sizes, which means smaller versions of men's gear. There are \"women's\" colorways, which means the same product in pink or purple. Neither of these is the same as gear that was actually engineered for the female body.",
      },
      {
        type: 'heading',
        text: "The Problem With Scaled-Down Men's Gear",
      },
      {
        type: 'paragraph',
        text: "The female neck and shoulder profile is anatomically different from a male's. The neck is typically narrower relative to shoulder width, the trapezius muscle sits differently, and the clavicle angle creates a distinct geometry at the base of the neck. A neck protector designed for a male athlete — even a youth male athlete — will gap, ride up, or sit off-center on a female player. That's not a fit issue. That's a protection issue.",
      },
      {
        type: 'paragraph',
        text: "When a neck protector gaps at the sides, it creates an unprotected zone. When it rides up, it restricts head movement and creates a false sense of security. When it sits off-center, the high-density foam core is no longer positioned over the carotid arteries and trachea — the exact structures it's meant to protect.",
      },
      {
        type: 'pullquote',
        text: "A neck protector that doesn't fit isn't a neck protector. It's a piece of foam that happens to be near your neck.",
        attribution: 'DefendHer Sport',
      },
      {
        type: 'image',
        src: '/airo-assets/images/pages/article/hero-girl-hockey',
        alt: 'Young female hockey player in full gear',
        caption: "Young players deserve gear that was built for them — not scaled down from adult men's equipment.",
      },
      {
        type: 'heading',
        text: 'What CE Level 1 Certification Actually Means',
      },
      {
        type: 'paragraph',
        text: "CE Level 1 is the European standard for neck protection in ice hockey. It tests for impact absorption, cut resistance, and coverage area. Many leagues — including a growing number of North American women's and girls' leagues — now require CE Level 1 certification for all players. The certification is not optional. The fit, however, has been.",
      },
      {
        type: 'paragraph',
        text: "DefendHer's neck protector meets CE Level 1 certification. But more importantly, it meets it while being designed from the ground up for the female athlete. The foam core is positioned for the female neck profile. The coverage area accounts for the female shoulder geometry. The fit is not an afterthought — it is the product.",
      },
      {
        type: 'heading',
        text: 'Starting Young',
      },
      {
        type: 'paragraph',
        text: "The players who need this most are the youngest ones. Girls who start playing hockey at 6, 7, 8 years old are forming habits around their gear. If the neck protector they wear from the beginning doesn't fit properly, they learn to tolerate poor fit. They adjust their skating posture to compensate. They develop a relationship with their equipment that is defined by compromise.",
      },
      {
        type: 'paragraph',
        text: "We built DefendHer because we believe that relationship should be defined by confidence instead. A young player who puts on gear that actually fits — that stays in place, that doesn't restrict movement, that she doesn't have to think about — plays differently. She plays without the background noise of equipment that isn't working for her.",
      },
      {
        type: 'list',
        items: [
          'CE Level 1 certified protection — meets league requirements',
          'Women-specific anatomical fit — designed for the female neck and shoulder profile',
          'High-density foam core — positioned correctly for the female anatomy',
          'Low-profile under equipment — no bulk, no restriction',
          'Available in XS through XL — sized for girls and women',
          'Machine washable liner — practical for daily training',
        ],
      },
      {
        type: 'heading',
        text: "The Standard We're Setting",
      },
      {
        type: 'paragraph',
        text: "DefendHer is one product right now. A neck protector. We chose to start here because the neck is the most critical unprotected zone in women's hockey — and because the gap between what exists and what should exist is widest here. But the principle extends to every piece of protective equipment in the sport.",
      },
      {
        type: 'paragraph',
        text: "Women's hockey is growing faster than any other segment of the sport. The players coming into the game deserve equipment that was built for them. Not adapted. Not recolored. Built.",
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
