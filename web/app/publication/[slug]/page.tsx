import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegacyRedirect } from "@/components/legacy-redirect";
import { getPublicationBySlug, getPublications } from "@/lib/content";

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
  const publications = await getPublications();
  return publications.map((publication) => ({ slug: publication.slug }));
}

export default async function LegacyPublicationPage({ params }: PageProps) {
  const { slug } = await params;
  const publication = await getPublicationBySlug(slug);

  if (!publication) {
    notFound();
  }

  return (
    <LegacyRedirect
      to={`/publications/${slug}/`}
      title={publication.title}
    />
  );
}
