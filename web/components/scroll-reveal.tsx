"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

const revealSelector = [
  ".page-stack > .section-card",
  ".collection-shell > .section-card",
  ".detail-shell > .section-card",
].join(", ");

export function ScrollReveal(): null {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(revealSelector);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    elements.forEach((element) => {
      element.dataset.reveal = "";
      if (reducedMotion || element.getBoundingClientRect().top < window.innerHeight * 0.92) {
        element.dataset.revealed = "true";
      }
    });

    document.documentElement.dataset.revealReady = "true";

    if (reducedMotion) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.revealed = "true";
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10%", threshold: 0.12 },
    );

    elements.forEach((element) => {
      if (element.dataset.revealed !== "true") {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
