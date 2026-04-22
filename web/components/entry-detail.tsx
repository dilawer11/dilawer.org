/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { JSX } from "react";
import { formatEntryMeta } from "@/components/entry-meta";
import { LinkPills } from "@/components/link-pills";
import { PublicationMeta } from "@/components/publication-meta";
import type { ContentEntry } from "@/lib/content";

type EntryDetailProps = {
  entry: ContentEntry;
  backHref: string;
  backLabel: string;
};

export function EntryDetail({
  entry,
  backHref,
  backLabel,
}: EntryDetailProps): JSX.Element {
  return (
    <div className="detail-shell">
      <section className="section-card">
        <div className="detail-header">
          <Link href={backHref} className="detail-back">
            ← {backLabel}
          </Link>
          <p className="eyebrow">{entry.kind}</p>
          <h1>{entry.title}</h1>
          {entry.kind === "publication" ? (
            <PublicationMeta entry={entry} />
          ) : (
            <p className="section-copy">{formatEntryMeta(entry, "detail")}</p>
          )}
          <LinkPills links={entry.links} />
        </div>
      </section>

      {entry.featuredAssetUrl ? (
        <section className="section-card entry-detail">
          <img src={entry.featuredAssetUrl} alt={entry.title} />
        </section>
      ) : null}

      {(entry.summary || entry.bodyHtml) ? (
        <section className="section-card entry-detail">
          <div className="entry-detail-content detail-prose">
            {entry.summary ? <p className="section-copy">{entry.summary}</p> : null}
            {entry.bodyHtml ? (
              <div
                className="prose-block"
                dangerouslySetInnerHTML={{ __html: entry.bodyHtml }}
              />
            ) : null}
          </div>
        </section>
      ) : null}
    </div>
  );
}
