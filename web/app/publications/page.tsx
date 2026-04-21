import type { Metadata } from "next";
import { CollectionPage } from "@/components/collection-page";
import { EntryCard } from "@/components/entry-card";
import { getPublications } from "@/lib/content";

export const metadata: Metadata = {
  title: "Publications",
  description: "Research publications, posters, and conference work by Dilawer Ahmed.",
};

export default async function PublicationsPage() {
  const publications = await getPublications();

  return (
    <CollectionPage
      eyebrow="Research"
      title="Publications"
      description="Conference papers, posters, and research outputs sourced from the existing repository content."
    >
      {publications.map((publication) => (
        <EntryCard
          key={publication.slug}
          entry={publication}
          href={`/publications/${publication.slug}/`}
        />
      ))}
    </CollectionPage>
  );
}
