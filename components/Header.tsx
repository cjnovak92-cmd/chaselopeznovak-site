import { MastheadController } from "@/components/MastheadController";
import { PrimaryNavigation } from "@/components/PrimaryNavigation";
import { navigation, site } from "@/lib/content";

export function Header() {
  return (
    <header className="site-masthead sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="masthead-layout mx-auto max-w-content px-site-gutter">
        <MastheadController name={site.name} />
        <PrimaryNavigation
          items={navigation}
          label="Primary navigation"
        />
      </div>
    </header>
  );
}
