"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

const navLinks = [
  { href: "/#focus", label: "Focus" },
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/publications/", label: "Publications" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={link.href === "/#focus" ? "site-nav-link site-nav-link-mobile-hidden" : "site-nav-link"}
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}
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

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 7.25h16M4 12h16M4 16.75h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}
