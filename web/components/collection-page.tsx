import type { ReactNode } from "react";

export function CollectionPage({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div className="collection-shell">
      <section className="section-card">
        <div className="collection-header">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          {description ? <p className="section-copy">{description}</p> : null}
        </div>
      </section>
      <section className="section-card">
        <div className="card-grid">{children}</div>
      </section>
    </div>
  );
}
