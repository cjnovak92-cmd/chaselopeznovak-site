export type SoftwareProject = {
  id: string;
  title: string;
  href: string;
  domain: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  creativeWorkPreview: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

export const gameMood = {
  id: "gamemood",
  title: "gameMOOD",
  href: "https://gamemoodapp.com",
  domain: "gamemoodapp.com",
  image: {
    src: "/images/software/gamemood-software-page-preview.webp",
    alt: "The gameMOOD landing page with its guiding principle card.",
    width: 2726,
    height: 894,
  },
  creativeWorkPreview: {
    src: "/images/software/gamemood-landing-preview.webp",
    alt: "The gameMOOD landing page asking, ‘What state are you playing toward?’",
    width: 1486,
    height: 698,
  },
} satisfies SoftwareProject;

export const softwareProjects = [gameMood] satisfies SoftwareProject[];
