import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

const navLinks = [
  { href: "/#focus", label: "Focus" },
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/publications/", label: "Publications" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="site-title">
          Dilawer Ahmed
        </Link>
        <div className="site-header-actions">
          <nav className="site-nav" aria-label="Primary">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
