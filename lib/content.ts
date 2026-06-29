export type NavItem = {
  id: string;
  label: string;
};

export type Service = {
  title: string;
  description: string;
};

export type TimelineEntry = {
  year: string;
  category: "Education" | "Work" | "Personal";
  title: string;
  description: string;
};

export type Project = {
  title: string;
  description: string;
  tags: string[];
  href?: string;
};

export const site = {
  name: "Chase Lopez Novak",
  tagline: "Creative consultant & builder of thoughtful work",
  email: "hello@chaselopeznovak.com",
  location: "Available for remote & on-site collaboration",
};

export const navigation: NavItem[] = [
  { id: "introduction", label: "Introduction" },
  { id: "what-i-do", label: "What I Do" },
  { id: "timeline", label: "Timeline" },
  { id: "projects", label: "Projects" },
  { id: "work-with-me", label: "Work with Me" },
];

export const introduction = {
  headline: "I help ideas find their form.",
  paragraphs: [
    "I'm Chase Lopez Novak — a creative consultant who works at the intersection of strategy, storytelling, and making things real.",
    "Whether I'm shaping a brand narrative, designing an experience, or building something from scratch, I care about work that feels honest, useful, and a little bit unexpected.",
    "This site is a living portfolio: a place to share what I'm learning, what I'm making, and how I like to collaborate.",
  ],
};

export const services: Service[] = [
  {
    title: "Creative Strategy",
    description:
      "Clarifying vision, audience, and direction — then translating insight into a plan people can actually follow.",
  },
  {
    title: "Brand & Narrative",
    description:
      "Finding the language, tone, and visual through-line that makes a project feel coherent and unmistakably itself.",
  },
  {
    title: "Experience Design",
    description:
      "Designing journeys, interfaces, and touchpoints that feel intuitive, intentional, and human at every step.",
  },
  {
    title: "Consulting & Collaboration",
    description:
      "Partnering with founders, teams, and studios as a thought partner — from early exploration through launch.",
  },
];

export const timeline: TimelineEntry[] = [
  {
    year: "2024 — Present",
    category: "Work",
    title: "Independent creative consulting",
    description:
      "Working with clients across brand, product, and experience — helping teams move from ambiguity to clarity.",
  },
  {
    year: "2022 — 2024",
    category: "Work",
    title: "Senior creative roles",
    description:
      "Led cross-functional projects spanning research, concept development, and delivery for growing brands and startups.",
  },
  {
    year: "2018 — 2022",
    category: "Education",
    title: "Formal study & self-directed learning",
    description:
      "Deepened expertise in design, communication, and technology through coursework, mentorship, and hands-on practice.",
  },
  {
    year: "Ongoing",
    category: "Personal",
    title: "Side projects & creative experiments",
    description:
      "Writing, photography, and small builds that keep my curiosity sharp and my craft evolving.",
  },
  {
    year: "Foundations",
    category: "Personal",
    title: "Early creative roots",
    description:
      "A lifelong pull toward making things — sketchbooks, zines, community projects, and the people who shaped how I see the world.",
  },
];

export const projects: Project[] = [
  {
    title: "Studio Rebrand",
    description:
      "A full identity refresh for an independent studio — from positioning and voice to visual system and launch materials.",
    tags: ["Brand", "Strategy", "Visual Identity"],
  },
  {
    title: "Product Launch Narrative",
    description:
      "Crafted the story, messaging, and go-to-market creative for a new product entering a crowded category.",
    tags: ["Narrative", "Go-to-Market", "Content"],
  },
  {
    title: "Experience Prototype",
    description:
      "Designed and prototyped an interactive onboarding flow that reduced friction and increased early engagement.",
    tags: ["UX", "Prototyping", "Research"],
  },
  {
    title: "Personal Creative Journal",
    description:
      "An ongoing collection of essays, sketches, and experiments — a sandbox for ideas that don't fit anywhere else.",
    tags: ["Writing", "Personal", "Ongoing"],
  },
];

export const workWithMe = {
  headline: "Let's make something worth remembering.",
  paragraphs: [
    "I'm open to select consulting engagements, creative partnerships, and conversations about what's next.",
    "If you have a project in mind — or you're still figuring out what it could be — I'd love to hear from you.",
  ],
  cta: "Start a conversation",
};
