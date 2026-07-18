import Image from "next/image";
import type { SoftwareProject } from "@/content/software";

type SoftwareProjectTileProps = {
  project: SoftwareProject;
  index: number;
};

export function SoftwareProjectTile({
  project,
  index,
}: SoftwareProjectTileProps) {
  return (
    <article className="software-project-tile">
      <a
        href={project.href}
        className="software-project-tile__link"
        aria-label={`Visit ${project.title} at ${project.domain}`}
      >
        <figure className="software-project-tile__media">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            width={project.image.width}
            height={project.image.height}
            sizes="(min-width: 64rem) 55rem, calc(100vw - 2.5rem)"
            className="software-project-tile__image"
            priority={index === 0}
          />
        </figure>

        <div className="software-project-tile__details">
          <div>
            <p className="software-project-tile__number">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h2>{project.title}</h2>
            <p className="software-project-tile__domain">{project.domain}</p>
          </div>
          <span className="software-project-tile__action">
            Visit site <span aria-hidden="true">↗</span>
          </span>
        </div>
      </a>
    </article>
  );
}
