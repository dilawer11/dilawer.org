import type { Metadata } from "next";
import { CollectionPage } from "@/components/collection-page";
import { EntryCard } from "@/components/entry-card";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected security, privacy, and systems projects by Dilawer Ahmed.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <CollectionPage
      eyebrow="Projects"
      title="Selected Work"
      description="Projects currently migrated from the existing Hugo content tree."
    >
      {projects.map((project) => (
        <EntryCard key={project.slug} entry={project} href={`/projects/${project.slug}/`} />
      ))}
    </CollectionPage>
  );
}
