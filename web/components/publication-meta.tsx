import type { JSX, ReactNode } from "react";
import type { ContentEntry } from "@/lib/content";

type PublicationMetaProps = {
  entry: ContentEntry;
};

export function PublicationMeta({ entry }: PublicationMetaProps): JSX.Element {
  const parts: ReactNode[] = [];

  if (entry.dateLabel) {
    parts.push(<span key="date">{entry.dateLabel}</span>);
  }

  const publication = entry.publicationShort ?? entry.publication;
  if (publication) {
    parts.push(<span key="venue">{renderInlineMarkdown(publication)}</span>);
  }

  if (entry.authors.length > 0) {
    parts.push(<span key="authors">{renderAuthors(entry.authors)}</span>);
  }

  return (
    <p className="entry-meta">
      {parts.map((part, index) => (
        <span key={index}>
          {index > 0 ? " · " : ""}
          {part}
        </span>
      ))}
    </p>
  );
}

function renderAuthors(authors: string[]): ReactNode[] {
  return authors.flatMap((author, index) => {
    const renderedAuthor =
      author.toLowerCase() === "dilawer ahmed" ? <strong key={author}>{author}</strong> : author;

    if (index === 0) {
      return [renderedAuthor];
    }

    return [", ", renderedAuthor];
  });
}

function renderInlineMarkdown(text: string): ReactNode[] {
  return text
    .split(/(\*[^*]+\*|_[^_]+_)/g)
    .filter(Boolean)
    .map((part, index) => {
      if (
        (part.startsWith("*") && part.endsWith("*")) ||
        (part.startsWith("_") && part.endsWith("_"))
      ) {
        return <em key={index}>{part.slice(1, -1)}</em>;
      }

      return <span key={index}>{part}</span>;
    });
}
