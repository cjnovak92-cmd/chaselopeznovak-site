import type { Metadata } from "next";
import { CreativeWorkGrid } from "@/components/creative-work/CreativeWorkGrid";
import { creativeWorkCategories } from "@/content/creative-work";

export const metadata: Metadata = {
  title: "Creative Work",
};

export default function CreativeWorkPage() {
  return (
    <div className="creative-work-page">
      <header className="creative-work-introduction">
        <div className="mx-auto max-w-content px-site-gutter">
          <p className="creative-work-introduction__eyebrow">
            <span aria-hidden="true">✦</span>
            A collection
          </p>
          <h1 className="creative-work-introduction__title">Creative Work</h1>
          <p className="creative-work-introduction__disciplines">
            Photography <span aria-hidden="true">·</span> Essays{" "}
            <span aria-hidden="true">·</span> Stories{" "}
            <span aria-hidden="true">·</span> Software
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-content px-site-gutter pb-section">
        <CreativeWorkGrid categories={creativeWorkCategories} />
      </div>
    </div>
  );
}
