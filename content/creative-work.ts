import { latestEssay } from "@/content/essays";
import { featuredPhotographs } from "@/content/photography";
import { gameMood } from "@/content/software";
import { theInformationWars } from "@/content/stories";

export const CREATIVE_WORK_ACCENTS = ["blue", "green", "red"] as const;

export type CreativeWorkAccent = (typeof CREATIVE_WORK_ACCENTS)[number];

export type CreativeWorkImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  presentation?: "contained" | "cover";
};

export type CreativeWorkEssayPreview = {
  label: string;
  title: string;
  context: string;
  authorshipNote: string;
  opening: string;
  firstParagraph: string;
};

export type CreativeWorkCategory = {
  id: string;
  title: string;
  accent: CreativeWorkAccent;
  image?: CreativeWorkImage;
  images?: CreativeWorkImage[];
  essayPreview?: CreativeWorkEssayPreview;
  href?: string;
  actionLabel?: string;
};

export const creativeWorkCategories = [
  {
    id: "photography",
    title: "Photography",
    accent: "red",
    images: featuredPhotographs,
    href: "/creative-work/photography",
    actionLabel: "View photography",
  },
  {
    id: "essays",
    title: "Essays",
    accent: "blue",
    essayPreview: {
      label: "Essay",
      title: latestEssay.title,
      context: latestEssay.context,
      authorshipNote: latestEssay.authorshipNote,
      opening: latestEssay.body[0],
      firstParagraph: latestEssay.body[1],
    },
    href: "/creative-work/essays",
    actionLabel: "Read essays",
  },
  {
    id: "screenwriting",
    title: "Stories",
    accent: "blue",
    image: {
      src: "/images/stories/the-information-wars-preview.webp",
      alt: `Title-page preview for “${theInformationWars.title}.”`,
      width: 1136,
      height: 506,
      presentation: "contained",
    },
    href: "/creative-work/stories",
    actionLabel: "Explore stories",
  },
  {
    id: "software",
    title: "Software",
    accent: "green",
    image: {
      ...gameMood.creativeWorkPreview,
      presentation: "contained",
    },
    href: "/creative-work/software",
    actionLabel: "Explore software",
  },
] satisfies CreativeWorkCategory[];
