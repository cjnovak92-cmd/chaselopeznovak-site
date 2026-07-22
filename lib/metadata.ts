import type { Metadata } from "next";
import { site } from "@/lib/content";

export const socialImage = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: `${site.name} — ${site.tagline}`,
};

type PageMetadataOptions = {
  title: string;
  path: string;
  description?: string;
  type?: "website" | "article";
};

export function getPageMetadata({
  title,
  path,
  description = site.tagline,
  type = "website",
}: PageMetadataOptions): Metadata {
  const openGraph = {
    title,
    description,
    url: path,
    siteName: site.name,
    locale: site.locale,
    images: [socialImage],
  };

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph:
      type === "article"
        ? { ...openGraph, type: "article" }
        : { ...openGraph, type: "website" },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}
