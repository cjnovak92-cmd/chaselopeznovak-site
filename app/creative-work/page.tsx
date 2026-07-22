import { CreativeWorkGrid } from "@/components/creative-work/CreativeWorkGrid";
import { creativeWorkCategories } from "@/content/creative-work";
import { getPageMetadata } from "@/lib/metadata";

export const metadata = getPageMetadata({
  title: "Creative Work",
  path: "/creative-work",
});

export default function CreativeWorkPage() {
  return (
    <div className="creative-work-page">
      <header className="creative-work-introduction">
        <div className="mx-auto max-w-content px-site-gutter">
          <h1 className="creative-work-introduction__title">Creative Work</h1>
        </div>
      </header>

      <div className="mx-auto max-w-content px-site-gutter pb-section">
        <CreativeWorkGrid categories={creativeWorkCategories} />
      </div>
    </div>
  );
}
