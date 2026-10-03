/**
 * WOMEN'S WEDNESDAY POSTS
 * ========================
 * To add a new post, copy the template below and paste it at the TOP of the
 * WOMENS_WEDNESDAY array (newest first). Fill in:
 *
 *   slug    — URL-friendly version of the title, lowercase, hyphens (no spaces)
 *   title   — The headline for this week's post
 *   date    — e.g. 'October 8, 2026'
 *   image   — filename in /public, e.g. '/ww-oct-8.jpg'  (or leave as '/article.webp' to use the default)
 *   summary — One or two sentences shown on the listing page
 *   body    — The full post. Write it like a normal document — each paragraph
 *             is a separate string in the array. Start a line with ## to make
 *             it a heading, or >> to make it a pull-quote.
 *
 * That's it. Save the file and the post will appear on the site automatically.
 */

export interface WW {
  slug: string;
  title: string;
  date: string;
  image: string;
  hero?: string;
  summary: string;
  body: string[];
}

export const WOMENS_WEDNESDAY: WW[] = [
  // ─── TEMPLATE — copy this block, paste above, fill it in ───────────────
  // {
  //   slug: 'your-slug-here',
  //   title: 'Your Title Here',
  //   date: 'October 8, 2026',
  //   image: '/article.webp',
  //   summary: 'One or two sentences that appear on the listing page.',
  //   body: [
  //     "## Optional Heading",
  //     "First paragraph goes here.",
  //     "Second paragraph goes here.",
  //     ">> A pull-quote goes here if you want one.",
  //     "## Another Heading",
  //     "More text...",
  //   ],
  // },
  // ───────────────────────────────────────────────────────────────────────

  {
    slug: 'introducing-womens-wednesday',
    title: "Introducing Women's Wednesday",
    date: 'October 8, 2026',
    image: '/ww-thumb.jpg',
    hero: '/ww-hero.jpg',
    summary: "Every Wednesday we take a little time to learn more about the women, moments, and stories that have shaped sports.",
    body: [
      "Welcome to our newest series — Women's Wednesday.",
      "Every Wednesday, we're going to take a little time to learn more about the women, moments, and stories that have shaped sports.",
      "Some will be stories you know. Others might be completely new to you.",
      "## What to Expect",
      "We'll talk about the women who broke barriers and changed the game, but also the fun facts, unexpected moments, controversies, and conversations that make women's sports history so interesting.",
      "Because there's a lot more to the story than what we learned in the history books.",
      ">> Women. Sports. Stories. Impact.",
      "So every Wednesday, come hang out, learn something new, and maybe leave with a \"wait… I had no idea\" moment.",
      "Here at DefendHER Sports — Wednesdays are for HER.",
    ],
  },
];
