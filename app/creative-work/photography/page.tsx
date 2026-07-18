import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { photographs } from "@/content/photography";

export const metadata: Metadata = {
  title: "Photography",
};

export default function PhotographyPage() {
  return (
    <div className="photography-index-page">
      <header className="photography-index-header mx-auto max-w-content px-site-gutter">
        <Link href="/creative-work" className="photography-back-link">
          <span aria-hidden="true">←</span> Creative Work
        </Link>
        <h1>Photography</h1>
        <p className="photography-index-count">
          {photographs.length} photographs · Newest first
        </p>
      </header>

      <section
        aria-label="Photography gallery"
        className="photography-gallery mx-auto max-w-content px-site-gutter"
      >
        {photographs.map((photograph, index) => (
          <figure key={photograph.id} className="photography-gallery__item">
            <Image
              src={photograph.src}
              alt={photograph.alt}
              width={photograph.width}
              height={photograph.height}
              sizes="(min-width: 64rem) 33vw, (min-width: 40rem) 50vw, calc(100vw - 2.5rem)"
              className="photography-gallery__image"
              priority={index < 2}
            />
          </figure>
        ))}
      </section>
    </div>
  );
}
