"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactElement, useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

const navLinks = [
  { href: "/#focus", label: "Focus", sectionId: "focus" },
  { href: "/#experience", label: "Experience", sectionId: "experience" },
  { href: "/#projects", label: "Projects", sectionId: "projects", pathPrefix: "/projects" },
  {
    href: "/publications/",
    label: "Publications",
    sectionId: "publications",
    pathPrefix: "/publications",
  },
  { href: "/#contact", label: "Contact", sectionId: "contact" },
];

function isPathActive(pathname: string, pathPrefix?: string): boolean {
  if (!pathPrefix) {
    return false;
  }

  return pathname === pathPrefix || pathname.startsWith(`${pathPrefix}/`);
}

export function SiteHeader(): ReactElement {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>();
  const isScrolledRef = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 981px)");
    let frameId = 0;

    const getThresholds = () =>
      mediaQuery.matches
        ? { enter: 72, exit: 10 }
        : { enter: 132, exit: 4 };

    const evaluateScroll = () => {
      frameId = 0;
      const scrollY = window.scrollY;
      const thresholds = getThresholds();
      const nextIsScrolled = isScrolledRef.current
        ? scrollY > thresholds.exit
        : scrollY > thresholds.enter;

      if (nextIsScrolled !== isScrolledRef.current) {
        isScrolledRef.current = nextIsScrolled;
        setIsScrolled(nextIsScrolled);
      }

      if (!nextIsScrolled) {
        setIsMenuOpen(false);
      }
    };

    const handleScroll = () => {
      if (!frameId) {
        frameId = window.requestAnimationFrame(evaluateScroll);
      }
    };

    const handleMediaChange = () => {
      if (mediaQuery.matches) {
        setIsMenuOpen(false);
      }
      handleScroll();
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      window.removeEventListener("scroll", handleScroll);
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  useEffect(() => {
    if (!isHomepage) {
      return;
    }

    const sections = navLinks
      .map((link) => document.getElementById(link.sectionId))
      .filter((section): section is HTMLElement => Boolean(section));
    const visibleSections = new Map<string, IntersectionObserverEntry>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSections.set(entry.target.id, entry);
          } else {
            visibleSections.delete(entry.target.id);
          }
        });

        const nearestSection = [...visibleSections.values()].sort(
          (left, right) =>
            Math.abs(left.boundingClientRect.top) - Math.abs(right.boundingClientRect.top),
        )[0];
        setActiveSection(nearestSection?.target.id);
      },
      { rootMargin: "-24% 0px -58%", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHomepage]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className="site-header"
      data-scrolled={isScrolled ? "true" : "false"}
      data-menu-open={isMenuOpen ? "true" : "false"}
    >
      <div className="site-header-inner">
        <Link href="/" className="site-title" onClick={closeMenu}>
          Dilawer Ahmed
        </Link>
        <nav className="site-nav" id="site-primary-nav" aria-label="Primary">
          {navLinks.map((link) => {
            const isActive = isHomepage
              ? activeSection === link.sectionId
              : isPathActive(pathname, link.pathPrefix);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  link.sectionId === "focus"
                    ? "site-nav-link site-nav-link-mobile-hidden"
                    : "site-nav-link"
                }
                aria-current={isActive ? "location" : undefined}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="site-header-controls">
          <button
            type="button"
            className="site-menu-toggle"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            aria-controls="site-primary-nav"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span className="site-menu-toggle-icon" aria-hidden="true">
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </span>
          </button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

function MenuIcon(): ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 7.25h16M4 12h16M4 16.75h16" />
    </svg>
  );
}

function CloseIcon(): ReactElement {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}
