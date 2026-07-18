import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { essays, getEssayBySlug } from "@/content/essays";

type EssayPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return essays.map((essay) => ({ slug: essay.slug }));
}

export async function generateMetadata({
  params,
}: EssayPageProps): Promise<Metadata> {
  const { slug } = await params;
  const essay = getEssayBySlug(slug);

  return essay ? { title: essay.title } : {};
}

export default async function EssayPage({ params }: EssayPageProps) {
  const { slug } = await params;
  const essay = getEssayBySlug(slug);

  if (!essay) {
    notFound();
  }

  return (
    <article className="essay-reader">
      <header className="essay-reader__header mx-auto px-site-gutter">
        <Link href="/creative-work/essays" className="essay-back-link">
          <span aria-hidden="true">←</span> Essays
        </Link>
        <p className="essay-kicker">Essay</p>
        <h1>{essay.title}</h1>
        <p className="essay-reader__context">{essay.context}</p>
        <p className="essay-reader__authorship-note">{essay.authorshipNote}</p>
      </header>

      <div className="essay-reader__body mx-auto px-site-gutter">
        {essay.body.map((paragraph, index) => (
          <p
            key={index}
            aria-hidden={paragraph === "~" || undefined}
            className={paragraph === "~" ? "essay-reader__finis" : undefined}
          >
            {paragraph}
          </p>
        ))}

        <footer className="essay-reader__footer">
          <p className="essay-reader__signature">{essay.signature}</p>
          <p className="essay-reader__closing-note">{essay.closingNote}</p>

          <section aria-labelledby="additional-reading-heading">
            <h2 id="additional-reading-heading">Additional Reading</h2>
            <ul>
              {essay.additionalReading.map((title) => (
                <li key={title}>{title}</li>
              ))}
            </ul>
          </section>
        </footer>
      </div>
    </article>
  );
}
