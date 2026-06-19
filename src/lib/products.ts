export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  sizes: string[];
  features: string[];
  specs: { label: string; value: string }[];
  image: string;
  badge?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'neck-protector-v1',
    name: 'DefendHer Neck Protector',
    tagline: 'The only neck protector built for women\'s hockey',
    description:
      'Engineered from the ground up for the female athlete. High-density foam core with CE Level 1 certification, contoured to the female neck and shoulder profile. Stays in place through every check, every shift, every game.',
    price: 89.99,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    features: [
      'CE Level 1 certified protection',
      'Women-specific anatomical fit',
      'High-density impact foam core',
      'Moisture-wicking inner lining',
      'Low-profile under equipment',
      'Machine washable liner',
    ],
    specs: [
      { label: 'certification', value: 'CE Level 1' },
      { label: 'fit', value: 'Women-specific design' },
      { label: 'material', value: 'High-density foam' },
      { label: 'ships', value: 'Free over $75' },
    ],
    image: '/shop.webp',
    badge: 'NEW',
  },
];

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}
