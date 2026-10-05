export interface Testimonial {
  name?: string;
  team: string;
  label?: string;
  photo?: string;
  alt?: string;
  quote: string[];
  highlight: string;
}

// To add a testimonial: save a square-ish photo in /public (optional) and add an entry here.
// Leave `name` out for anonymous entries.
export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Bella Jonsson',
    team: 'NDHL · Sundsvall',
    photo: '/testimonial-bella.jpg',
    alt: 'Bella Jonsson smiling in her navy Sundsvall jersey and helmet',
    highlight: 'Something else that I like is the magnetic enclosure because my hair no longer gets pulled!',
    quote: [
      'I have used the neck guard and bra with the magnetic enclosure for prototype for almost a year now.',
      'Before using the prototype I used a shirt neck guard which I didn’t like because it was too much material on the arms which would make me warm. Also with the Velcro enclosure my hair would get stuck in it which would be distracting and it caused pain.',
      'With the prototype that I am using the product stays in place and there is less material, cooler during games. Something else that I like is the magnetic enclosure because my hair no longer gets pulled!',
    ],
  },
  {
    name: 'Felicia Sånnevall',
    team: 'NDHL · Sundsvall',
    photo: '/testimonial-felicia.jpg',
    alt: 'Felicia Sånnevall in her navy Sundsvall jersey and helmet mid-game',
    highlight: 'Because it’s one piece it stays in the correct place during the game.',
    quote: [
      'I used the neck guard and bra prototype for almost 1 year now.',
      'Before I was using a long sleeve shirt with neck guard and also just a neck guard and a bra. With the shirt I found it was too hot and both neck guard products were itchy and would become out of place.',
      'With the neck bra it is comfortable and less hot because you are wearing less material. Because it’s one piece it stays in the correct place during the game. My hair has been less damaged because of the magnetic enclosure over the Velcro enclosure because the magnets don’t catch my hair.',
    ],
  },
  {
    name: 'Eva Hlynsdottir',
    team: 'Icelandic National Team / NDHL',
    photo: '/testimonial-eva.jpg',
    alt: 'Eva Hlynsdottir in her white Iceland jersey, waiting for a face-off',
    highlight: 'My favourite thing was that I barely felt like I was wearing anything.',
    quote: [
      'Overall, I was really impressed with the prototype because it was both comfortable and looked really good. My favourite thing was that I barely felt like I was wearing anything. I also liked that it combines a bra and a neck guard, making it quicker and easier to use one product instead of two and it wasn\u2019t too thick.',
      'The prototype was very comfortable, and the neck guard stayed in place really well. The magnet was much more comfortable than Velcro because Velcro can stick to your hair and you can sometimes feel it.',
      'I think this product is unique because it is specifically designed for women and their needs unlike other neck guards that are probably made for men. Right now, I use a bib neck guard. The Velcro gets worn out, and I have had to replace it a couple of times, I can also never fasten it in exactly the same position, while a magnet gives the same fit every time.',
    ],
  },
  {
    team: 'SDHL / National Team Player',
    label: 'Design feedback',
    highlight: 'The prototype was impressive. Well thought out design for women specifically, which you don’t see very often.',
    quote: [
      'The prototype was impressive. Well thought out design for women specifically, which you don’t see very often.',
      'My favorite thing about the prototype was the magnet. It was maybe a bit heavy but such a great alternative to the Velcro that rips out your hair. The comfort is great. Since it’s attached to the sports bra, it doesn’t move around or need to be adjusted while you play.',
      'It’s unique to women’s sports obviously because of the sports bra aspect but the magnet is needed for ponytails & buns to stay in place while playing.',
    ],
  },
];
