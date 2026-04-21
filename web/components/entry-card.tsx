/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { JSX } from "react";
import { formatEntryMeta } from "@/components/entry-meta";
import type { ContentEntry } from "@/lib/content";

type EntryCardProps = {
  entry: ContentEntry;
  href: string;
};

export function EntryCard({ entry, href }: EntryCardProps): JSX.Element {
  const meta = formatEntryMeta(entry, "card");

  return (
    <article className="entry-card">
      {entry.featuredAssetUrl ? (
        <Link href={href}>
          <img src={entry.featuredAssetUrl} alt={entry.title} />
        </Link>
      ) : null}
      <div className="entry-card-content">
        <p className="entry-meta">{meta}</p>
        <h3>
          <Link className="entry-title" href={href}>
            {entry.title}
          </Link>
        </h3>
        {entry.summary ? <p className="entry-summary">{entry.summary}</p> : null}
      </div>
    </article>
  );
}
