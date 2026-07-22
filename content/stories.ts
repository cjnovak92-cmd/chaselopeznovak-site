export type StoryFormat = {
  title: string;
  logline: string;
  setting?: string;
  comparison?: string;
  status?: string;
};

export type StoryDetail = {
  author: string;
  dedication?: string;
  sequenceNote?: string;
  formats: StoryFormat[];
};

export type Story = {
  slug: string;
  title: string;
  titleLines?: string[];
  collectionId: "screenwriting" | "short-stories";
  comparison?: string;
  descriptor?: string;
  status?: string;
  detail?: StoryDetail;
};

export type StoryCollection = {
  id: Story["collectionId"];
  title: string;
  titleLines: string[];
  storySlugs: string[];
};

export const theInformationWars = {
  slug: "the-information-wars",
  title: "The Information Wars",
  titleLines: ["The", "Information", "Wars"],
  collectionId: "screenwriting",
  comparison: "Rope x Steve Jobs",
  status: "Full script coming soon!",
  detail: {
    author: "Chase Lopez Novak",
    dedication:
      "In loving memory of Dr. Eric Jonswold and his mother, Christine.",
    sequenceNote: "The short film is coming first.",
    formats: [
      {
        title: "Short Film",
        logline:
          "Amongst their family garage-turned-lab, a mother and son scientist duo converse through time, hoping to uncover the secrets of black holes while trying to keep their sanity, and memories, intact.",
        setting:
          "The single setting of the story is a garage in a Northern Californian suburban neighborhood. The action of the story is continuous, even through time jumps.",
        comparison: "Rope x Steve Jobs",
        status: "Full script coming soon!",
      },
      {
        title: "Feature Film",
        logline:
          "Eric Miller, an Information Scientist of the year 2045, races against time, memory and the entire planet as he attempts to uncover the secrets of black holes and siphon the information radiating from Cygnus X-1, hoping to obtain the knowledge needed to save his dying mother from a rare neural disease.",
      },
    ],
  },
} satisfies Story;

export const stories: Story[] = [
  theInformationWars,
  {
    slug: "pleasureville",
    title: "PleasureVille",
    collectionId: "screenwriting",
    comparison: "Truman Show x Liar Liar",
    status: "Currently under construction",
  },
  {
    slug: "caveman-high",
    title: "Caveman High",
    collectionId: "screenwriting",
    comparison: "Year One x Superbad",
    status: "Currently under construction",
  },
  {
    slug: "partner-in-crime",
    title: "Partner in Crime",
    collectionId: "screenwriting",
    comparison: "Mr. and Mrs. Smith x",
    status: "Currently under construction",
  },
  {
    slug: "consumed",
    title: "CONSUMED",
    collectionId: "screenwriting",
    status: "Currently under construction",
  },
  {
    slug: "the-adventures-of-jude-the-aussiedood",
    title: "The Adventures of Jude the AussieDood!",
    collectionId: "screenwriting",
    descriptor: "Children’s Book/TV Show",
    status: "Currently under construction",
  },
  {
    slug: "multithought",
    title: "Multithought",
    collectionId: "short-stories",
    status: "Currently under construction",
  },
  {
    slug: "the-greatest-game-ever-made",
    title: "The Greatest Game Ever Made!",
    collectionId: "short-stories",
    status: "Currently under construction",
  },
];

export const storyCollections: StoryCollection[] = [
  {
    id: "screenwriting",
    title: "Screenwriting",
    titleLines: ["Screenwriting"],
    storySlugs: [
      "the-information-wars",
      "pleasureville",
      "caveman-high",
      "partner-in-crime",
      "consumed",
      "the-adventures-of-jude-the-aussiedood",
    ],
  },
  {
    id: "short-stories",
    title: "Science//Fiction Short Stories",
    titleLines: ["Science//Fiction", "Short Stories"],
    storySlugs: ["multithought", "the-greatest-game-ever-made"],
  },
];

export function getStoryBySlug(slug: string) {
  return stories.find((story) => story.slug === slug && story.detail);
}
