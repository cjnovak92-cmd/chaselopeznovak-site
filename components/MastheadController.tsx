"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Wordmark } from "@/components/Wordmark";

const HERO_WORDMARK_SENTINEL_ID = "hero-wordmark-sentinel";

type MastheadControllerProps = {
  name: string;
};

export function MastheadController({ name }: MastheadControllerProps) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isCompact, setIsCompact] = useState(pathname !== "/");
  const [identityHasFocus, setIdentityHasFocus] = useState(false);
  const showIdentity = isCompact || identityHasFocus;

  useEffect(() => {
    const sentinel = document.getElementById(HERO_WORDMARK_SENTINEL_ID);

    if (!sentinel) {
      setIsCompact(true);
      return;
    }

    const hero = sentinel.closest("section");
    const masthead = containerRef.current?.closest("header");
    const mastheadHeight = Math.ceil(
      masthead?.getBoundingClientRect().height ?? 0,
    );
    let isMounted = true;

    const setCompactState = (nextState: boolean) => {
      if (!isMounted) {
        return;
      }

      setIsCompact(nextState);
      hero?.toggleAttribute("data-wordmark-inactive", nextState);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) {
          return;
        }

        const hasPassedMasthead =
          !entry.isIntersecting &&
          entry.boundingClientRect.top <= mastheadHeight;

        setCompactState(hasPassedMasthead);
      },
      {
        rootMargin: `-${mastheadHeight}px 0px 0px 0px`,
        threshold: 0,
      },
    );

    observer.observe(sentinel);

    return () => {
      isMounted = false;
      observer.disconnect();
      hero?.removeAttribute("data-wordmark-inactive");
    };
  }, [pathname]);

  const handleHomeClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (window.location.pathname !== "/") {
      return;
    }

    event.preventDefault();
    window.location.assign("/");
  };

  return (
    <div
      ref={containerRef}
      data-compact={showIdentity}
      className="masthead-identity"
      onFocus={() => setIdentityHasFocus(true)}
      onBlur={() => setIdentityHasFocus(false)}
    >
      <Link
        href="/"
        aria-label={`${name}, home`}
        aria-hidden={!showIdentity}
        tabIndex={showIdentity ? undefined : -1}
        className="masthead-wordmark-link"
        onClick={handleHomeClick}
      >
        <Wordmark name={name} variant="horizontal" decorative />
      </Link>
    </div>
  );
}
