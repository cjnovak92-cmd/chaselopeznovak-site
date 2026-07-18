import Image from "next/image";
import Link from "next/link";
import type { CreativeWorkCategory } from "@/content/creative-work";

type CreativeWorkTileProps = {
  category: CreativeWorkCategory;
  index: number;
};

export function CreativeWorkTile({
  category,
  index,
}: CreativeWorkTileProps) {
  const contents = (
    <>
      <div className="creative-work-tile__heading">
        <span aria-hidden="true" className="creative-work-tile__number">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h2 className="creative-work-tile__title">{category.title}</h2>
      </div>

      {category.image ? (
        <figure
          className="creative-work-tile__single-media"
          data-presentation={category.image.presentation ?? "cover"}
        >
          <Image
            src={category.image.src}
            alt={category.image.alt}
            width={category.image.width}
            height={category.image.height}
            sizes="(min-width: 64rem) 27rem, (min-width: 40rem) 42vw, calc(100vw - 2.5rem)"
            className="creative-work-tile__image"
          />
        </figure>
      ) : null}

      {category.images ? (
        <div className="creative-work-tile__collage">
          {category.images.map((image) => (
            <figure key={image.src} className="creative-work-tile__collage-item">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(min-width: 64rem) 18rem, (min-width: 40rem) 28vw, 55vw"
                className="creative-work-tile__image"
              />
            </figure>
          ))}
        </div>
      ) : null}

      {category.essayPreview && (
        <div className="creative-work-tile__essay-preview">
          <p className="creative-work-tile__essay-kicker">
            {category.essayPreview.label}
          </p>
          <p className="creative-work-tile__essay-title">
            {category.essayPreview.title}
          </p>
          <p className="creative-work-tile__essay-context">
            {category.essayPreview.context}
          </p>
          <p className="creative-work-tile__essay-note">
            {category.essayPreview.authorshipNote}
          </p>
          <p className="creative-work-tile__essay-opening">
            {category.essayPreview.opening}
          </p>
          <p className="creative-work-tile__essay-paragraph">
            {category.essayPreview.firstParagraph}
          </p>
        </div>
      )}

      {category.actionLabel ? (
        <span className="creative-work-tile__action">
          <span>{category.actionLabel}</span>
          <span aria-hidden="true">→</span>
        </span>
      ) : !category.image && !category.images && !category.essayPreview ? (
        <div aria-hidden="true" className="creative-work-tile__field">
          <span />
          <span>✦</span>
          <span />
        </div>
      ) : null}
    </>
  );

  return (
    <article
      className="creative-work-tile"
      data-accent={category.accent}
    >
      {category.href ? (
        <Link href={category.href} className="creative-work-tile__link">
          {contents}
        </Link>
      ) : (
        <div className="creative-work-tile__body">{contents}</div>
      )}
    </article>
  );
}
