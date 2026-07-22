import type { Metadata } from "next";
import { getPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = getPageMetadata({
  title: "The Manifesto",
  description:
    "The vision behind The Memoryline and a more personal, creative kind of software.",
  path: "/manifesto",
});

export default function ManifestoPage() {
  return (
    <article className="manifesto-page">
      <div className="manifesto-page__content">
        <h1>The Manifesto</h1>

        <section aria-labelledby="manifesto-memoryline">
          <h2 id="manifesto-memoryline">What is The Memoryline™?</h2>
          <p>
            The Memoryline is a way to chronicle your life and its major events,
            <br />
            and to reference your past as so to remember it,
            <br />
            and even dwell on it,
            <br />
            with options for descriptions and photos.
          </p>
        </section>

        <section aria-labelledby="manifesto-website">
          <h2 id="manifesto-website">What is The Website?</h2>
          <p>The website is my take on my own “app”.</p>

          <p>
            At its core is The Memoryline, but Creative Work is a mainstay as
            well;
            <br />
            it is to inspire creatives and artists - so all of us - to design
            and build
            <br />
            our own representation of ourselves,
            <br />
            in software form.
          </p>

          <p>
            It is a place to put our photos, and writings and
            <br />
            what ever other creative work we may do.
            <br />
            Designing and building our app is part of the creative work too.
          </p>
        </section>

        <p className="manifesto-page__divider" aria-hidden="true">
          ~
        </p>

        <div className="manifesto-page__declaration">
          <p>
            Imagine designing your own instagram/Facebook/linkedIn
            <br />
            page/profile...
          </p>

          <p>You can customize it, personalize it, update it, and redesign it.</p>

          <p>
            You can even throw in some hidden secrets and easter eggs for those
            in your life you share your app with.
          </p>

          <p>Which ideally, its everyone.</p>

          <p>
            By sharing your Memoryline and Creative Work, you expose yourself a
            bit
            <br />
            (thankfully only digitally;)).
          </p>

          <p>
            You reveal some part of yourself, so that the next time you connect
            with someone, you feel a little bit
            <br />
            closer than if you were going in blind.
          </p>

          <p>The ice is broken and you can connect even deeper.</p>
        </div>

        <p className="manifesto-page__divider" aria-hidden="true">
          ~
        </p>

        <footer className="manifesto-page__closing">
          <p>
            Please reach out to help me build this vision into something unique
            and useful.
          </p>
          <address>
            Chase Lopez Novak
            <br />
            <a href="mailto:cj.novak@yahoo.com">cj.novak@yahoo.com</a>
          </address>
        </footer>
      </div>
    </article>
  );
}
