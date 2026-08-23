import { cache } from "react";
import fg from "fast-glob";
import matter from "gray-matter";
import { existsSync, promises as fs } from "node:fs";
import path from "node:path";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const repoRoot = path.resolve(process.cwd(), "..");
const contentRoot = path.join(repoRoot, "content");
const mediaRoot = path.join(repoRoot, "assets", "media");
const staticRoot = path.join(repoRoot, "static");

type Frontmatter = Record<string, unknown>;

export type SocialLink = {
  icon: string;
  label: string;
  link: string;
};

export type AuthorProfile = {
  slug: string;
  title: string;
  role?: string;
  organizations: { name: string; url?: string }[];
  interests: string[];
  education: { course: string; institution: string; year?: number }[];
  social: SocialLink[];
  avatarUrl?: string;
  bodyHtml: string;
};

export type ExperienceItem = {
  title: string;
  company: string;
  companyUrl?: string;
  location?: string;
  dateStart: string;
  dateEnd?: string;
  dateLabel: string;
  descriptionHtml: string;
};

export type ContentEntry = {
  kind: "publication" | "project";
  slug: string;
  title: string;
  summary?: string;
  subtitle?: string;
  role?: string;
  outcome?: string;
  topic?: string;
  date?: Date;
  year?: number;
  dateLabel?: string;
  bodyHtml: string;
  featured: boolean;
  featuredAssetUrl?: string;
  authors: string[];
  tags: string[];
  publication?: string;
  publicationShort?: string;
  publicationTypes: string[];
  projects: string[];
  links: { label: string; url: string }[];
};

export const getAuthorProfile = cache(async (slug: string): Promise<AuthorProfile> => {
  const filePath = path.join(contentRoot, "authors", slug, "_index.md");
  const parsed = await parseMarkdownFile(filePath);
  const data = parsed.data as Frontmatter;

  return {
    slug,
    title: stringValue(data.title) ?? slug,
    role: stringValue(data.role),
    organizations: arrayValue<{ name: string; url?: string }>(data.organizations),
    interests: stringArray(data.interests),
    education: arrayValue<{ course: string; institution: string; year?: number }>(
      (data.education as { courses?: unknown } | undefined)?.courses ?? [],
    ),
    social: arrayValue<{ icon: string; link: string }>(data.social).map((social) => ({
      icon: social.icon,
      label: socialLabel(social.icon),
      link: normalizeLink(social.link),
    })),
    avatarUrl: await findSpecificAsset(path.dirname(filePath), /^avatar\./i),
    bodyHtml: await markdownToHtml(parsed.content),
  };
});

export const getProjects = cache(async () => getCollectionEntries("project", "project"));
export const getPublications = cache(async () =>
  getCollectionEntries("publication", "publication"),
);

export async function getProjectBySlug(slug: string) {
  return findBySlug(await getProjects(), slug);
}

export async function getPublicationBySlug(slug: string) {
  return findBySlug(await getPublications(), slug);
}

async function getCollectionEntries(
  section: "publication" | "project",
  kind: ContentEntry["kind"],
): Promise<ContentEntry[]> {
  const files = await fg("*/index.md", {
    cwd: path.join(contentRoot, section),
    absolute: true,
  });

  const authorMap = await getAuthorNameMap();
  const entries = await Promise.all(
    files.map(async (filePath) => {
      const parsed = await parseMarkdownFile(filePath);
      const data = parsed.data as Frontmatter;
      const assetDir = path.dirname(filePath);
      const dateValue = dateValueOf(data.date) ?? dateValueOf(data.publishDate);
      const authors = stringArray(data.authors).map(
        (author) => authorMap.get(author) ?? author,
      );
      const featuredAssetUrl =
        (await findSpecificAsset(assetDir, /^featured\.(png|jpe?g|webp|svg)$/i)) ??
        (await findSpecificAsset(assetDir, /^(logo|process_diagram)\.(png|jpe?g|webp|svg)$/i));

      return {
        kind,
        slug: path.basename(path.dirname(filePath)),
        title: stringValue(data.title) ?? "Untitled",
        summary:
          stringValue(data.summary) ??
          stringValue(data.abstract) ??
          stringValue(data.subtitle),
        subtitle: stringValue(data.subtitle),
        role: stringValue(data.role),
        outcome: stringValue(data.outcome),
        topic: stringValue(data.topic),
        date: dateValue,
        year: dateValue?.getUTCFullYear(),
        dateLabel: formatDate(dateValue),
        bodyHtml: await markdownToHtml(parsed.content, assetDir),
        featured: booleanValue(data.featured),
        featuredAssetUrl,
        authors,
        tags: stringArray(data.tags),
        publication: stringValue(data.publication),
        publicationShort: stringValue(data.publication_short),
        publicationTypes: stringArray(data.publication_types),
        projects: stringArray(data.projects),
        links: buildLinks(data, assetDir),
      } satisfies ContentEntry;
    }),
  );

  return entries.sort((left, right) => {
    const rightTime = right.date?.getTime() ?? 0;
    const leftTime = left.date?.getTime() ?? 0;
    return rightTime - leftTime;
  });
}

async function parseMarkdownFile(filePath: string) {
  const raw = await fs.readFile(filePath, "utf8");
  return matter(raw);
}

async function markdownToHtml(markdown: string, assetDir?: string) {
  const normalized = normalizeMarkdown(markdown, assetDir);
  if (!normalized.trim()) {
    return "";
  }

  const result = await remark()
    .use(remarkGfm)
    .use(remarkHtml)
    .process(normalized);

  return result.toString();
}

function normalizeMarkdown(markdown: string, assetDir?: string) {
  let normalized = markdown;

  normalized = normalized.replace(
    /\{\{<\s*staticref\s+"([^"]+)"[^>]*>\}\}([\s\S]*?)\{\{<\s*\/staticref\s*>\}\}/g,
    (_match, assetPath, label) => `[${label.trim()}](${normalizeLink(assetPath)})`,
  );

  normalized = normalized.replace(
    /\{\{<\s*figure\s+src="([^"]+)"[^>]*caption="([^"]*)"[^>]*>\}\}/g,
    (_match, src, caption) =>
      `![${caption || path.basename(src)}](${resolveAssetReference(src, assetDir)})`,
  );

  normalized = normalized.replace(/\{\{[%<]\s*\/?[^}]+[>%]\}\}/g, "");
  normalized = normalized.replace(/\n{3,}/g, "\n\n");

  return normalized;
}

function buildLinks(data: Frontmatter, assetDir: string) {
  const candidates: Array<[string, string | undefined]> = [
    ["PDF", stringValue(data.url_pdf)],
    ["Code", stringValue(data.url_code)],
    ["Dataset", stringValue(data.url_dataset)],
    ["Poster", stringValue(data.url_poster)],
    ["Project", stringValue(data.url_project)],
    ["Slides", stringValue(data.url_slides)],
    ["Source", stringValue(data.url_source)],
    ["Video", stringValue(data.url_video)],
  ];

  const links = candidates
    .filter(([, url]) => Boolean(url))
    .map(([label, url]) => ({
      label,
      url: normalizeLink(url!, assetDir),
    }));

  return links;
}

function normalizeLink(value: string, assetDir?: string) {
  if (!value) {
    return value;
  }

  if (
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("mailto:") ||
    value.startsWith("#") ||
    value.startsWith("/")
  ) {
    return value;
  }

  const trimmed = value.replace(/^\.\//, "");

  const contentCandidate = path.join(contentRoot, trimmed);
  if (existsSync(contentCandidate)) {
    return `/${path.join("content", trimmed).replaceAll(path.sep, "/")}`;
  }

  if (assetDir) {
    const relativeCandidate = path.resolve(assetDir, trimmed);
    if (existsSync(relativeCandidate)) {
      return toPublicUrl(relativeCandidate);
    }
  }

  const staticCandidate = path.join(staticRoot, trimmed);
  if (existsSync(staticCandidate)) {
    return `/${trimmed.replaceAll(path.sep, "/")}`;
  }

  return `/${trimmed.replaceAll(path.sep, "/")}`;
}

function resolveAssetReference(src: string, assetDir?: string) {
  if (!assetDir) {
    return normalizeLink(src);
  }

  const absolute = path.resolve(assetDir, src);
  return toPublicUrl(absolute);
}

async function findSpecificAsset(directory: string, pattern: RegExp) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const match = entries
    .filter((entry) => entry.isFile() && pattern.test(entry.name))
    .sort((left, right) => left.name.localeCompare(right.name))[0];

  return match ? toPublicUrl(path.join(directory, match.name)) : undefined;
}

function toPublicUrl(filePath: string) {
  if (filePath.startsWith(contentRoot)) {
    return `/${path.relative(repoRoot, filePath).replaceAll(path.sep, "/")}`;
  }

  if (filePath.startsWith(mediaRoot)) {
    return `/media/${path.relative(mediaRoot, filePath).replaceAll(path.sep, "/")}`;
  }

  if (filePath.startsWith(staticRoot)) {
    return `/${path.relative(staticRoot, filePath).replaceAll(path.sep, "/")}`;
  }

  return `/${path.relative(repoRoot, filePath).replaceAll(path.sep, "/")}`;
}

const getAuthorNameMap = cache(async () => {
  const files = await fg("*/_index.md", {
    cwd: path.join(contentRoot, "authors"),
    absolute: true,
  });
  const entries = await Promise.all(
    files.map(async (filePath) => {
      const parsed = await parseMarkdownFile(filePath);
      const slug = path.basename(path.dirname(filePath));
      return [slug, stringValue((parsed.data as Frontmatter).title) ?? slug] as const;
    }),
  );
  return new Map(entries);
});

function findBySlug<T extends { slug: string }>(entries: T[], slug: string) {
  return entries.find((entry) => entry.slug === slug);
}

function formatDate(date?: Date) {
  if (!date) {
    return undefined;
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
  }).format(date);
}

function parseDate(value?: string) {
  if (!value) {
    return undefined;
  }
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function dateValueOf(value: unknown) {
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? undefined : value;
  }

  return typeof value === "string" ? parseDate(value) : undefined;
}

function socialLabel(icon: string) {
  const labels: Record<string, string> = {
    envelope: "Email",
    twitter: "Twitter",
    instagram: "Instagram",
    "graduation-cap": "Scholar",
    github: "GitHub",
    linkedin: "LinkedIn",
  };
  return labels[icon] ?? icon;
}

function stringValue(value: unknown) {
  return typeof value === "string" ? value : undefined;
}

function stringArray(value: unknown) {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

function booleanValue(value: unknown) {
  return value === true;
}

function arrayValue<T>(value: unknown) {
  return Array.isArray(value) ? (value as T[]) : [];
}
