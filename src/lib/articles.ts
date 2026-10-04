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
    slug: 'from-a-locker-room-idea-to-a-prototype',
    title: 'From a Locker Room Idea to a Prototype',
    subtitle: 'How a neck guard that chafed, caught hair and wore out became a sports bra with the protection built in.',
    date: 'October 4, 2026',
    readTime: '4 min read',
    category: 'Our Story',
    heroImage: '/prototype-1.jpg',
    heroAlt: 'DefendHer prototype worn in a hockey locker room',
    body: [
      {
        type: 'paragraph',
        text: "Most products start with something that bugs someone. For DefendHer Sports, it started in locker rooms, with a neck guard that didn\u2019t work the way it should.",
      },
      {
        type: 'heading',
        text: 'The problem she lived with',
      },
      {
        type: 'paragraph',
        text: "Ally Stymiest played four years of prep school hockey, then NCAA Division III hockey at the University of Southern Maine. Along the way she wore the neck guards that were available, and they let her down in small, constant ways. They chafed her neck. They caught in her hair, leaving her to pull out large knots or spend hours brushing them out. And over time the Velcro closures wore out and lost their effectiveness.",
      },
      {
        type: 'paragraph',
        text: "She wasn\u2019t the only one. Teammates voiced the same frustrations with base layers and protective gear that didn\u2019t fit properly or meet their needs. The result she kept seeing: girls wearing products incorrectly, or not wearing protective gear at all.",
      },
      {
        type: 'heading',
        text: 'The gap she noticed',
      },
      {
        type: 'paragraph',
        text: "Across years of locker rooms, one thing stood out. Nearly every female hockey player already wore a sports bra. Long-sleeve shirts with built-in neck guards existed, but nothing combined support, comfort and protection in one product.",
      },
      {
        type: 'pullquote',
        text: 'Nothing combined support, comfort and protection in one product.',
        attribution: 'DefendHer Sports',
      },
      {
        type: 'paragraph',
        text: 'That gap became the idea: a sports bra with an integrated neck guard.',
      },
      {
        type: 'heading',
        text: 'From idea to first prototype',
      },
      {
        type: 'paragraph',
        text: "Ally brought the concept to Neal, her equipment manager in university. Together they built a first prototype, and both knew they had something worth pursuing.",
      },
      {
        type: 'paragraph',
        text: "They kept refining it. The biggest change was the closure: an adjustable magnetic closure that holds the secure fit athletes need without catching hair the way Velcro does.",
      },
      {
        type: 'heading',
        text: 'What players told us',
      },
      {
        type: 'paragraph',
        text: "The prototype has since been worn by players, some for almost a year. They told us it stays in place because it\u2019s one piece, that there\u2019s less material than a long-sleeve shirt with a neck guard, and that the magnets don\u2019t pull their hair. One player called it a \u201cwell thought out design for women specifically, which you don\u2019t see very often.\u201d",
      },
      {
        type: 'paragraph',
        text: "The feedback was honest, too. One player said the magnet was maybe a bit heavy. That is exactly the kind of note we want, and it has fed straight back into the design.",
      },
      {
        type: 'heading',
        text: "What\u2019s next",
      },
      {
        type: 'paragraph',
        text: "The product is patent pending and still in development. We\u2019re starting with women\u2019s hockey because that\u2019s where our experience is, and our goal is protective equipment for female athletes across all sports. You can see the prototype on our product page, and follow the journey on Instagram and TikTok.",
      },
    ],
  },
  {
    slug: 'why-girls-hockey-needs-better-gear',
    title: "Why Girls' Hockey Deserves Better Gear",
    subtitle: "Every piece of protective equipment on the market was designed for men. Here's what that costs young female players — and what we're doing about it.",
    date: 'June 18, 2026',
    readTime: '6 min read',
    category: 'Protection',
    heroImage: '/article.webp',
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
        attribution: 'DefendHer Sports',
      },
      {
        type: 'image',
        src: '/article.webp',
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
