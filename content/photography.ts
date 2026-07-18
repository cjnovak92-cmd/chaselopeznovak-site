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
    src: "/images/photography/blue-flower-red.JPG",
    alt: "A red flower and seed pods silhouetted against a blue and coral sky.",
    width: 2296,
    height: 2296,
  },
  {
    id: "link",
    src: "/images/photography/web/link.png",
    alt: "A Link figurine posed with one hand raised on a tabletop.",
    width: 2000,
    height: 1500,
  },
  {
    id: "holly-pet-cemetery",
    src: "/images/photography/holly-pet-cemetery.jpg",
    alt: "A cat sitting in a patch of sunlight against a dark doorway.",
    width: 2289,
    height: 2602,
  },
  {
    id: "holly-pose",
    src: "/images/photography/holly-pose.JPG",
    alt: "A portrait of Holly the cat posing for the camera.",
    width: 2830,
    height: 4032,
  },
  {
    id: "just-a-grasshopper",
    src: "/images/photography/just-a-grasshopper.jpg",
    alt: "A grasshopper photographed in close-up.",
    width: 1977,
    height: 1977,
  },
  {
    id: "greyscale-tree",
    src: "/images/photography/greyscale-tree.jpg",
    alt: "A tree rendered in grayscale.",
    width: 3024,
    height: 4032,
  },
  {
    id: "baby-jude",
    src: "/images/photography/baby-jude.jpg",
    alt: "A quiet portrait of baby Jude.",
    width: 1600,
    height: 2513,
  },
  {
    id: "the-street-wheelers",
    src: "/images/photography/the-street-wheelers.jpg",
    alt: "Three musicians performing into microphones, with two playing guitars.",
    width: 1440,
    height: 810,
  },
  {
    id: "candlelit-buddha",
    src: "/images/photography/candlelit-buddha.jpg",
    alt: "A Buddha figure illuminated by candlelight.",
    width: 6000,
    height: 3375,
  },
  {
    id: "big-pink",
    src: "/images/photography/big-pink.jpg",
    alt: "A large pink flower photographed in close-up.",
    width: 3788,
    height: 5682,
  },
  {
    id: "buddha-little-light",
    src: "/images/photography/buddha-little-light.jpg",
    alt: "A Buddha figure illuminated by a small point of light.",
    width: 3232,
    height: 3232,
  },
  {
    id: "saturation-rainbow",
    src: "/images/photography/saturation-rainbow.jpg",
    alt: "A rainbow rendered in saturated color.",
    width: 6000,
    height: 3375,
  },
  {
    id: "silhouette-buddha",
    src: "/images/photography/siloette-buddha.jpg",
    alt: "The silhouette of a Buddha figure.",
    width: 6000,
    height: 4000,
  },
  {
    id: "bee-friend",
    src: "/images/photography/bee-friend.jpg",
    alt: "A bee perched on a flower.",
    width: 6000,
    height: 4000,
  },
  {
    id: "micro-flower",
    src: "/images/photography/micro-flower.jpg",
    alt: "A tiny flower photographed in macro detail.",
    width: 6000,
    height: 4000,
  },
  {
    id: "orange-sun",
    src: "/images/photography/orange-sun.jpg",
    alt: "An orange sun glowing in a hazy sky.",
    width: 4000,
    height: 6000,
  },
  {
    id: "milky-way-two",
    src: "/images/photography/milky-way-two.JPG",
    alt: "The Milky Way stretching across a dark night sky.",
    width: 6000,
    height: 4000,
  },
  {
    id: "milky-way",
    src: "/images/photography/milky-way.jpg",
    alt: "A vertical view of the Milky Way in the night sky.",
    width: 4000,
    height: 6000,
  },
  {
    id: "fog-and-dock",
    src: "/images/photography/fog-and-dock.jpg",
    alt: "A dock extending over water in dense fog.",
    width: 6000,
    height: 4000,
  },
  {
    id: "sunset-with-clouds",
    src: "/images/photography/sunset-with-clouds.jpg",
    alt: "Clouds gathering above a colorful sunset.",
    width: 5623,
    height: 3163,
  },
  {
    id: "reflection",
    src: "/images/photography/reflection.jpg",
    alt: "A landscape reflected in still water.",
    width: 3367,
    height: 5985,
  },
  {
    id: "sunrise-symmetry",
    src: "/images/photography/sunrise-symmetry.jpg",
    alt: "A sunrise reflected symmetrically across water.",
    width: 5291,
    height: 2976,
  },
  {
    id: "greyscale-island",
    src: "/images/photography/greyscale-island.jpg",
    alt: "An island across still water in grayscale.",
    width: 5992,
    height: 3370,
  },
  {
    id: "sunset-over-grand-lake",
    src: "/images/photography/sunset-over-grand-lake.jpg",
    alt: "The sun setting over Grand Lake.",
    width: 5733,
    height: 3225,
  },
  {
    id: "holly",
    src: "/images/photography/holly.JPG",
    alt: "A square portrait of Holly the cat.",
    width: 2609,
    height: 2609,
  },
] satisfies Photograph[];

export const featuredPhotographs = photographs.slice(0, 3);
