import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegacyRedirect } from "@/components/legacy-redirect";
import { getProjectBySlug, getProjects } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function LegacyProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <LegacyRedirect
      to={`/projects/${slug}/`}
      title={project.title}
    />
  );
}
