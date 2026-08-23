import type { Metadata } from "next";
import { CollectionPage } from "@/components/collection-page";
import { PublicationExplorer } from "@/components/publication-explorer";
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
      description="Conference papers, posters, and research outputs across security, privacy, and real-world systems."
    >
      <PublicationExplorer entries={publications} />
    </CollectionPage>
  );
}
