import { CreativeWorkTile } from "@/components/creative-work/CreativeWorkTile";
import type { CreativeWorkCategory } from "@/content/creative-work";

type CreativeWorkGridProps = {
  categories: CreativeWorkCategory[];
};

export function CreativeWorkGrid({ categories }: CreativeWorkGridProps) {
  return (
    <section aria-label="Creative work categories">
      <div className="creative-work-grid">
        {categories.map((category) => (
          <CreativeWorkTile key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}
