export type Photograph = {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const photographs = [
  {
    id: "blue-flower-red",
    src: "/images/photography/blue-flower-red.webp",
    alt: "A red flower and seed pods silhouetted against a blue and coral sky.",
    width: 2296,
    height: 2296,
  },
  {
    id: "link",
    src: "/images/photography/web/link.webp",
    alt: "A Link figurine posed with one hand raised on a tabletop.",
    width: 2000,
    height: 1500,
  },
  {
    id: "holly-pet-cemetery",
    src: "/images/photography/holly-pet-cemetery.webp",
    alt: "A cat sitting in a patch of sunlight against a dark doorway.",
    width: 2289,
    height: 2602,
  },
  {
    id: "holly-pose",
    src: "/images/photography/holly-pose.webp",
    alt: "A portrait of Holly the cat posing for the camera.",
    width: 2106,
    height: 3000,
  },
  {
    id: "just-a-grasshopper",
    src: "/images/photography/just-a-grasshopper.webp",
    alt: "A grasshopper photographed in close-up.",
    width: 1977,
    height: 1977,
  },
  {
    id: "greyscale-tree",
    src: "/images/photography/greyscale-tree.webp",
    alt: "A tree rendered in grayscale.",
    width: 2250,
    height: 3000,
  },
  {
    id: "baby-jude",
    src: "/images/photography/baby-jude.webp",
    alt: "A brown-and-white puppy peeking through purple flowers.",
    width: 1600,
    height: 2513,
  },
  {
    id: "the-street-wheelers",
    src: "/images/photography/the-street-wheelers.webp",
    alt: "Three musicians performing into microphones, with two playing guitars.",
    width: 1440,
    height: 810,
  },
  {
    id: "candlelit-buddha",
    src: "/images/photography/candlelit-buddha.webp",
    alt: "A Buddha figure illuminated by candlelight.",
    width: 3000,
    height: 1688,
  },
  {
    id: "big-pink",
    src: "/images/photography/big-pink.webp",
    alt: "A pink glass high-rise framed by green leaves against a blue sky.",
    width: 2000,
    height: 3000,
  },
  {
    id: "buddha-little-light",
    src: "/images/photography/buddha-little-light.webp",
    alt: "A Buddha figure illuminated by a small point of light.",
    width: 3000,
    height: 3000,
  },
  {
    id: "saturation-rainbow",
    src: "/images/photography/saturation-rainbow.webp",
    alt: "A rainbow rendered in saturated color.",
    width: 3000,
    height: 1688,
  },
  {
    id: "silhouette-buddha",
    src: "/images/photography/silhouette-buddha.webp",
    alt: "The silhouette of a Buddha figure.",
    width: 3000,
    height: 2000,
  },
  {
    id: "bee-friend",
    src: "/images/photography/bee-friend.webp",
    alt: "A bee perched on a flower.",
    width: 3000,
    height: 2000,
  },
  {
    id: "micro-flower",
    src: "/images/photography/micro-flower.webp",
    alt: "A tiny flower photographed in macro detail.",
    width: 3000,
    height: 2000,
  },
  {
    id: "orange-sun",
    src: "/images/photography/orange-sun.webp",
    alt: "An orange sun glowing in a hazy sky.",
    width: 2000,
    height: 3000,
  },
  {
    id: "milky-way-two",
    src: "/images/photography/milky-way-two.webp",
    alt: "The Milky Way stretching across a dark night sky.",
    width: 3000,
    height: 2000,
  },
  {
    id: "milky-way",
    src: "/images/photography/milky-way.webp",
    alt: "A vertical view of the Milky Way in the night sky.",
    width: 2000,
    height: 3000,
  },
  {
    id: "fog-and-dock",
    src: "/images/photography/fog-and-dock.webp",
    alt: "A dock extending over water in dense fog.",
    width: 3000,
    height: 2000,
  },
  {
    id: "sunset-with-clouds",
    src: "/images/photography/sunset-with-clouds.webp",
    alt: "Clouds gathering above a colorful sunset.",
    width: 3000,
    height: 1688,
  },
  {
    id: "reflection",
    src: "/images/photography/reflection.webp",
    alt: "A landscape reflected in still water.",
    width: 1688,
    height: 3000,
  },
  {
    id: "sunrise-symmetry",
    src: "/images/photography/sunrise-symmetry.webp",
    alt: "A sunrise reflected symmetrically across water.",
    width: 3000,
    height: 1687,
  },
  {
    id: "greyscale-island",
    src: "/images/photography/greyscale-island.webp",
    alt: "An island across still water in grayscale.",
    width: 3000,
    height: 1687,
  },
  {
    id: "sunset-over-grand-lake",
    src: "/images/photography/sunset-over-grand-lake.webp",
    alt: "The sun setting over Grand Lake.",
    width: 3000,
    height: 1688,
  },
  {
    id: "holly",
    src: "/images/photography/holly.webp",
    alt: "A square portrait of Holly the cat.",
    width: 2609,
    height: 2609,
  },
] satisfies Photograph[];

const featuredPhotographIds = [
  "milky-way",
  "the-street-wheelers",
  "micro-flower",
] as const;

export const featuredPhotographs = featuredPhotographIds.map(
  (id) => photographs.find((photograph) => photograph.id === id)!,
);
