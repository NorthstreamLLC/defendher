export interface VideoItem {
  id: string;
  title: string;
  description: string;
  /** Local file in /public, or a YouTube/Vimeo embed URL */
  src: string;
  type: 'file' | 'embed';
  poster?: string;
  /** Optional label shown above the title, e.g. "Product" or "Behind the Build" */
  category?: string;
}

export const VIDEOS: VideoItem[] = [
  {
    id: 'brand-reveal',
    title: 'DefendHer Sports',
    description:
      'Built for her, from the ground up. Protective equipment designed for female athletes — starting with hockey.',
    src: '/brand-intro.mp4',
    type: 'file',
    poster: '/brand-intro-poster.jpg',
    category: 'Brand',
  },
];

export function getVideo(id: string): VideoItem | undefined {
  return VIDEOS.find((v) => v.id === id);
}
