import Link from "next/link";
import { SoftwareProjectTile } from "@/components/software/SoftwareProjectTile";
import { softwareProjects } from "@/content/software";
import { getPageMetadata } from "@/lib/metadata";

export const metadata = getPageMetadata({
  title: "Software",
  path: "/creative-work/software",
});

export default function SoftwarePage() {
  return (
    <div className="software-index-page">
      <header className="software-index-header mx-auto max-w-content px-site-gutter">
        <Link href="/creative-work" className="software-back-link">
          <span aria-hidden="true">←</span> Creative Work
        </Link>
        <h1>Software</h1>
        <p className="software-index-count">
          {softwareProjects.length} featured {softwareProjects.length === 1 ? "project" : "projects"}
        </p>
      </header>

      <section
        aria-label="Software projects"
        className="software-project-list mx-auto max-w-content px-site-gutter"
      >
        {softwareProjects.map((project, index) => (
          <SoftwareProjectTile
            key={project.id}
            project={project}
            index={index}
          />
        ))}
      </section>
    </div>
  );
}
