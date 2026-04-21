import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section-card detail-shell">
      <div className="detail-header">
        <p className="eyebrow">404</p>
        <h1>Page not found</h1>
        <p className="section-copy">
          This route has not been migrated yet, or the content slug does not exist.
        </p>
        <Link href="/" className="button button-primary">
          Return home
        </Link>
      </div>
    </section>
  );
}
