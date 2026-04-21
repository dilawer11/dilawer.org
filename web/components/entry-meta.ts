import type { ContentEntry } from "@/lib/content";

type EntryMetaVariant = "card" | "detail";

export function formatEntryMeta(
  entry: ContentEntry,
  variant: EntryMetaVariant,
): string {
  switch (entry.kind) {
    case "publication": {
      const publication = entry.publicationShort ?? entry.publication ?? "";
      const detailParts = [entry.dateLabel, publication, entry.authors.join(", ")];
      const cardParts = [entry.dateLabel, publication];

      return joinMetaParts(variant === "detail" ? detailParts : cardParts);
    }
    case "project":
      return joinMetaParts(
        variant === "detail"
          ? [entry.dateLabel, entry.tags.join(", ")]
          : [entry.dateLabel, entry.tags.slice(0, 3).join(" · ")],
      );
    default:
      return "";
  }
}

function joinMetaParts(parts: Array<string | undefined>): string {
  return parts.filter(Boolean).join(" · ");
}
