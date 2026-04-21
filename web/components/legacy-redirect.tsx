"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type LegacyRedirectProps = {
  to: string;
  title: string;
};

export function LegacyRedirect({
  to,
  title,
}: LegacyRedirectProps): React.JSX.Element {
  const router = useRouter();

  useEffect(() => {
    void router.replace(to);
  }, [router, to]);

  return (
    <section className="section-card detail-shell">
      <div className="detail-header">
        <p className="eyebrow">Legacy URL</p>
        <h1>{title}</h1>
        <p className="section-copy">
          This page has moved to a new route in the Next.js migration.
        </p>
        <Link href={to} className="button button-primary">
          Continue to the new page
        </Link>
      </div>
    </section>
  );
}
