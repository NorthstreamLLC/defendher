export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  photo?: string;
  alt?: string;
  objectPosition?: string;
  caption?: string;
  blurb: string;
  lead: string;
  bio: string[];
}

// To add a person: add an entry here. Save a photo in /public and set `photo` when you have one.
export const TEAM: TeamMember[] = [
  {
    slug: 'ally',
    name: 'Ally Stymiest',
    role: 'Co-Founder',
    photo: '/ally-use.jpeg',
    alt: 'Ally Stymiest celebrating in her University of Southern Maine jersey',
    objectPosition: 'center 30%',
    blurb: 'Professional hockey player who asked why a neck guard and a sports bra couldn’t be one piece.',
    lead: 'A sports bra with protection built into it. Something women would actually want to wear.',
    bio: [
      'Ally is a professional hockey player and co-founder of DefendHer Sports. She played four years of prep school hockey before competing at the NCAA Division III level at the University of Southern Maine, where she earned a degree in Leadership and Organizational Studies. She then signed her first professional contract, in Sweden.',
      'Growing up, she struggled with traditional neck guards. They chafed, caught in her hair and left her pulling out knots, and the Velcro wore out. She also noticed that nearly every woman in the locker room already wore a sports bra, and asked: why couldn’t the two be combined?',
      'She brought the idea to Neal, and they built the first prototype together. Her vision for DefendHer is gear that prioritizes women, celebrates every body type and is designed for them, not adapted from men’s equipment.',
    ],
  },
  {
    slug: 'neal',
    name: 'Neal',
    role: 'Inventor',
    photo: '/ally-x-neal.jpg',
    alt: 'Neal, right, standing with Ally on the ice at a University of Southern Maine game',
    objectPosition: 'center 22%',
    caption: 'Neal with Ally at a University of Southern Maine game.',
    blurb: 'Equipment manager and skate sharpener who built the first prototype with Ally.',
    lead: 'Someone needed help, so he stepped in.',
    bio: [
      'Neal started as a hockey dad who took over his kids’ Learn to Skate program and built an equipment library so families could borrow gear instead of buying it all upfront. One of those purchases was a skate sharpener, and it changed the next two decades.',
      'He taught himself to sharpen, built a backyard rink out of old bowling alley lanes, and became the University of Southern Maine’s equipment manager and skate sharpener for the men’s and women’s programs. Over sixteen years he built two fully stocked pro shops and became known across Maine as the skate guy.',
      'In 2021 a freshman named Ally wandered into his shop with endless questions. Four years later, she asked him to help build a neck guard players would actually want to wear. They started that same day, with scraps from around the shop.',
    ],
  },
  {
    slug: 'carissa',
    name: 'Carissa',
    role: 'Founding Team',
    blurb: 'Goalie, operating room nurse and business owner who knows the fit problem first-hand.',
    lead: 'She never planned on becoming a goalie.',
    bio: [
      'Carissa grew up with hockey in the backyard rink her dad, Neal, built. When her team’s goalie was sick one game, she ended up in the net, and they won. She played soccer, basketball, lacrosse and hockey through college, including hockey at the University of Southern Maine.',
      'At 5’3” and barely 120 pounds, she spent years making oversized goalie gear work, custom ordering her catcher and blocker to fit her hands. Unless gear was required, she skipped it, even the neck guard. She later realized she wasn’t alone: female athletes in every sport have adapted to equipment designed for someone else.',
      'As an operating room nurse and then a business owner, she learned how to build something from the ground up and listen to what people actually need. She believes women shouldn’t have to choose between feeling protected and feeling comfortable.',
    ],
  },
];

export const HOW_IT_STARTED = [
  { when: '2021', text: 'Ally arrives at the University of Southern Maine and wanders into Neal’s pro shop.' },
  { when: 'Four years', text: 'Counting inventory, baking skates and talking hockey turns into a close friendship.' },
  { when: 'One summer', text: 'Before leaving for Sweden, Ally asks: what if a neck guard was something players actually wanted to wear?' },
  { when: 'That afternoon', text: 'They build the first prototype from scraps around the shop. DefendHer begins.' },
];
