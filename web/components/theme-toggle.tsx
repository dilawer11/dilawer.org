"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const resolveTheme = (): Theme => {
      const stored = window.localStorage.getItem("theme");
      if (stored === "light" || stored === "dark") {
        return stored;
      }

      return mediaQuery.matches ? "dark" : "light";
    };

    const applyTheme = (nextTheme: Theme) => {
      root.dataset.theme = nextTheme;
      setTheme(nextTheme);
    };

    applyTheme(resolveTheme());

    const handleSystemChange = () => {
      if (!window.localStorage.getItem("theme")) {
        applyTheme(mediaQuery.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleSystemChange);
    return () => mediaQuery.removeEventListener("change", handleSystemChange);
  }, []);

  const activeTheme = theme ?? "light";
  const nextTheme: Theme = activeTheme === "dark" ? "light" : "dark";

  const handleToggle = () => {
    const root = document.documentElement;
    root.dataset.theme = nextTheme;
    window.localStorage.setItem("theme", nextTheme);
    setTheme(nextTheme);
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={`Switch to ${nextTheme} mode`}
      aria-pressed={activeTheme === "dark"}
      title={`Switch to ${nextTheme} mode`}
      onClick={handleToggle}
    >
      <span className="theme-toggle-icon" aria-hidden="true">
        {activeTheme === "dark" ? <SunIcon /> : <MoonIcon />}
      </span>
      <span className="theme-toggle-text">{activeTheme === "dark" ? "Dark" : "Light"}</span>
    </button>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="4.25" />
      <path d="M12 2.5v2.25M12 19.25v2.25M21.5 12h-2.25M4.75 12H2.5M18.72 5.28l-1.6 1.6M6.88 17.12l-1.6 1.6M18.72 18.72l-1.6-1.6M6.88 6.88l-1.6-1.6" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M20 14.5A7.5 7.5 0 0 1 9.5 4 8.75 8.75 0 1 0 20 14.5Z" />
    </svg>
  );
}
