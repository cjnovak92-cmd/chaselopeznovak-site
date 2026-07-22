import type { MetadataRoute } from "next";
import { essays } from "@/content/essays";
import { stories } from "@/content/stories";
import { absoluteUrl } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/creative-work",
    "/creative-work/photography",
    "/creative-work/essays",
    "/creative-work/stories",
    "/creative-work/software",
    "/manifesto",
  ].map((path) => ({ url: absoluteUrl(path) }));

  const essayRoutes = essays.map((essay) => ({
    url: absoluteUrl(`/creative-work/essays/${essay.slug}`),
    lastModified: essay.publishedDate,
  }));

  const storyRoutes = stories
    .filter((story) => story.detail)
    .map((story) => ({
      url: absoluteUrl(`/creative-work/stories/${story.slug}`),
    }));

  return [...staticRoutes, ...essayRoutes, ...storyRoutes];
}
