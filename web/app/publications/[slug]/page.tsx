import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EntryDetail } from "@/components/entry-detail";
import { getPublicationBySlug, getPublications } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const publications = await getPublications();
  return publications.map((publication) => ({ slug: publication.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const publication = await getPublicationBySlug(slug);

  if (!publication) {
    return {};
  }

  return {
    title: publication.title,
    description: publication.summary,
  };
}

export default async function PublicationDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const publication = await getPublicationBySlug(slug);

  if (!publication) {
    notFound();
  }

  return (
    <EntryDetail
      entry={publication}
      backHref="/publications/"
      backLabel="All publications"
    />
  );
}
