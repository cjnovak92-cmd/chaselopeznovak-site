export type NavItem = {
  id: string;
  label: string;
  href: string;
};

export const site = {
  name: "Chase Lopez Novak",
  tagline: "Sensitive, Intuitive, Inquisitive, Creative",
  version: "1.0",
  copyrightYear: 2026,
};

export const navigation: NavItem[] = [
  { id: "memoryline", label: "Memoryline", href: "/#memoryline" },
  {
    id: "creative-work",
    label: "Creative Work",
    href: "/creative-work",
  },
];

export const introduction = {
  headingLines: [
    "Hello World",
    "and",
    "welcome to my website!",
  ],
  paragraph:
    "Feel free to peruse my memoryline below to get to know me and don’t forget to explore my creative work :)",
};
