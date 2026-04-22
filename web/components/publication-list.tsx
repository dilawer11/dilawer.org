import Link from "next/link";
import type { JSX } from "react";
import { PublicationMeta } from "@/components/publication-meta";
import type { ContentEntry } from "@/lib/content";

type PublicationListProps = {
  entries: ContentEntry[];
  showSummary?: boolean;
};

export function PublicationList({
  entries,
  showSummary = true,
}: PublicationListProps): JSX.Element {
  return (
    <div className={`publication-list${!showSummary ? " publication-list-compact" : ""}`}>
      {entries.map((entry) => (
        <article className="publication-list-item" key={entry.slug}>
          <PublicationMeta entry={entry} />
          <h3>
            <Link className="entry-title" href={`/publications/${entry.slug}/`}>
              {entry.title}
            </Link>
          </h3>
          {showSummary && entry.summary ? <p className="entry-summary">{entry.summary}</p> : null}
        </article>
      ))}
    </div>
  );
}
