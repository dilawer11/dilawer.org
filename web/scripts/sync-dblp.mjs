import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import fg from "fast-glob";
import { XMLParser } from "fast-xml-parser";
import matter from "gray-matter";

const SELF_AUTHOR_SLUG = "dilawer";
const SELF_AUTHOR_NAMES = new Set(["dilawer ahmed"]);
const DBLP_AUTHOR_PID = "294/3240";
const DBLP_AUTHOR_FEED = `https://dblp.org/pid/${DBLP_AUTHOR_PID}.xml`;
const OPENALEX_WORKS_URL = "https://api.openalex.org/works";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "../..");
const publicationRoot = path.join(repoRoot, "content/publication");
const dryRun = process.argv.includes("--dry-run");

const parser = new XMLParser({
  attributeNamePrefix: "",
  ignoreAttributes: false,
  textNodeName: "text",
  trimValues: true,
});

async function main() {
  const existingEntries = await loadExistingEntries();
  const existingBySlug = new Map(existingEntries.map((entry) => [entry.slug, entry]));
  const existingByTitle = new Map();
  const existingByCompactTitle = new Map();
  const existingByDoi = new Map();
  const existingByDblpKey = new Map();

  for (const entry of existingEntries) {
    if (entry.dblpKey) {
      existingByDblpKey.set(entry.dblpKey, entry);
    }

    if (entry.doi) {
      existingByDoi.set(entry.doi, entry);
    }

    if (entry.normalizedTitle) {
      existingByTitle.set(entry.normalizedTitle, entry);
    }

    if (entry.compactTitle) {
      existingByCompactTitle.set(entry.compactTitle, entry);
    }
  }

  const dblpRecords = await fetchDblpRecords();
  const openAlexCache = new Map();
  const usedSlugs = new Set(existingEntries.map((entry) => entry.slug));
  const matchedExistingSlugs = new Set();
  let createdCount = 0;
  let updatedCount = 0;

  for (const record of dblpRecords) {
    const existingEntry =
      existingByDblpKey.get(record.dblpKey) ??
      (record.doi ? existingByDoi.get(record.doi) : undefined) ??
      existingByTitle.get(record.normalizedTitle) ??
      existingByCompactTitle.get(record.compactTitle);

    const openAlexWork = await fetchOpenAlexWork(record, openAlexCache);
    const targetSlug = existingEntry?.slug ?? allocateSlug(record.title, usedSlugs);

    if (existingEntry) {
      matchedExistingSlugs.add(existingEntry.slug);
    }

    const nextEntry = buildPublicationEntry({
      existingEntry,
      openAlexWork,
      record,
      slug: targetSlug,
    });

    const currentRaw = existingEntry?.raw ?? "";
    if (nextEntry.raw !== currentRaw) {
      if (!dryRun) {
        await fs.mkdir(path.dirname(nextEntry.filePath), { recursive: true });
        await fs.writeFile(nextEntry.filePath, nextEntry.raw);
      }

      if (existingEntry) {
        updatedCount += 1;
      } else {
        createdCount += 1;
      }
    }

    existingBySlug.set(targetSlug, nextEntry);
  }

  const preservedManualEntries = existingEntries
    .filter((entry) => !matchedExistingSlugs.has(entry.slug))
    .map((entry) => entry.slug)
    .sort();

  const modeLabel = dryRun ? "Dry run" : "Synced";
  console.log(
    `${modeLabel} ${dblpRecords.length} DBLP records (${updatedCount} updated, ${createdCount} created).`,
  );

  if (preservedManualEntries.length > 0) {
    console.log(
      `Preserved ${preservedManualEntries.length} manual-only publication entries: ${preservedManualEntries.join(", ")}`,
    );
  }
}

async function loadExistingEntries() {
  const files = await fg("content/publication/*/index.md", {
    absolute: true,
    cwd: repoRoot,
  });

  return Promise.all(
    files.map(async (filePath) => {
      const raw = await fs.readFile(filePath, "utf8");
      const parsed = matter(raw);
      const slug = path.basename(path.dirname(filePath));
      const data = parsed.data ?? {};

      return {
        raw,
        data,
        content: parsed.content,
        filePath,
        slug,
        normalizedTitle: normalizeTitle(data.title),
        compactTitle: compactTitle(data.title),
        doi: normalizeDoi(data.doi),
        dblpKey: typeof data.dblp_key === "string" ? data.dblp_key.trim() : "",
      };
    }),
  );
}

async function fetchDblpRecords() {
  const response = await fetch(DBLP_AUTHOR_FEED, {
    headers: { accept: "application/xml,text/xml" },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch DBLP feed (${response.status})`);
  }

  const xml = await response.text();
  const parsed = parser.parse(xml);
  const wrappers = asArray(parsed?.dblpperson?.r);

  return wrappers
    .map(parseDblpRecord)
    .filter(Boolean)
    .sort((left, right) => {
      const leftDate = Date.parse(left.date);
      const rightDate = Date.parse(right.date);
      return rightDate - leftDate;
    });
}

function parseDblpRecord(wrapper) {
  if (!wrapper || typeof wrapper !== "object") {
    return null;
  }

  const [kind, node] =
    Object.entries(wrapper).find(([key]) =>
      ["article", "inproceedings", "incollection", "phdthesis", "mastersthesis"].includes(key),
    ) ?? [];

  if (!kind || !node || typeof node !== "object") {
    return null;
  }

  const title = cleanupTitle(readText(node.title));
  const authors = asArray(node.author).map(readAuthorName).filter(Boolean);
  const year = Number.parseInt(readText(node.year), 10);
  const month = readText(node.month);
  const doi = extractDoi(node.ee);
  const venue = cleanupText(
    readText(kind === "article" ? node.journal : node.booktitle),
  );
  const shortVenue = cleanupText(venue);
  const date = buildFallbackDate(year, month);
  const eeUrls = asArray(node.ee).map(readText).filter(Boolean);
  const pdfUrl = eeUrls.find((url) => /\.pdf(?:$|\?)/i.test(url)) ?? "";

  return {
    dblpKey: typeof node.key === "string" ? node.key : "",
    dblpUrl: typeof node.key === "string" ? `https://dblp.org/rec/${node.key}.html` : "",
    kind,
    title,
    normalizedTitle: normalizeTitle(title),
    compactTitle: compactTitle(title),
    authors,
    year,
    doi,
    venue,
    shortVenue,
    date,
    pdfUrl,
  };
}

async function fetchOpenAlexWork(record, cache) {
  const cacheKey = record.doi || record.normalizedTitle;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  let work = null;
  if (record.doi) {
    work = await fetchOpenAlexByDoi(record.doi);
  }

  if (!work) {
    work = await fetchOpenAlexByTitle(record.title, record.year);
  }

  cache.set(cacheKey, work);
  return work;
}

async function fetchOpenAlexByDoi(doi) {
  const response = await fetch(`${OPENALEX_WORKS_URL}/https://doi.org/${doi}`);
  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch OpenAlex work for DOI ${doi} (${response.status})`);
  }

  return response.json();
}

async function fetchOpenAlexByTitle(title, year) {
  const url = new URL(OPENALEX_WORKS_URL);
  url.searchParams.set("search", title);
  url.searchParams.set("per-page", "5");

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to search OpenAlex for "${title}" (${response.status})`);
  }

  const payload = await response.json();
  const candidates = asArray(payload?.results);
  const normalizedTitle = normalizeTitle(title);

  return (
    candidates.find((candidate) => {
      const candidateTitle = normalizeTitle(candidate?.display_name);
      const sameTitle = candidateTitle === normalizedTitle;
      const sameYear = !year || candidate?.publication_year === year;
      return sameTitle && sameYear;
    }) ?? null
  );
}

function buildPublicationEntry({ existingEntry, openAlexWork, record, slug }) {
  const existingData = existingEntry?.data ?? {};
  const existingContent = existingEntry?.content ?? "";
  const title = coerceString(existingData.title) || cleanupTitle(openAlexWork?.display_name || record.title);
  const authors = normalizeArray(existingData.authors).length > 0
    ? normalizeArray(existingData.authors)
    : buildAuthors(openAlexWork, record.authors);
  const date = resolvePublicationDate(openAlexWork, record.date);
  const publication = coerceString(existingData.publication) || buildVenueLabel(record, openAlexWork);
  const publicationShort = resolvePublicationShort(existingData, publication);
  const abstract =
    coerceString(existingData.abstract) ||
    decodeOpenAlexAbstract(openAlexWork?.abstract_inverted_index);
  const summary = coerceString(existingData.summary) || summarizeAbstract(abstract);
  const normalizedExistingUrlPdf = coerceString(existingData.url_pdf);
  const normalizedExistingUrlSource = coerceString(existingData.url_source);
  const manualFields = collectManualFields(existingData);
  const data = {
    title,
    authors,
    date,
    doi: record.doi || normalizeDoi(openAlexWork?.doi) || "",
    publishDate: date,
    publication_types: [mapPublicationType(record.kind)],
    publication,
    publication_short: publicationShort,
    abstract,
    summary,
    tags: normalizeArray(existingData.tags),
    categories: normalizeArray(existingData.categories),
    featured: Boolean(existingData.featured),
    url_pdf:
      normalizedExistingUrlPdf ||
      findOpenAlexPdfUrl(openAlexWork) ||
      record.pdfUrl ||
      "",
    url_code: coerceString(existingData.url_code),
    url_dataset: coerceString(existingData.url_dataset),
    url_poster: coerceString(existingData.url_poster),
    url_project: coerceString(existingData.url_project),
    url_slides: coerceString(existingData.url_slides),
    url_source: normalizedExistingUrlSource || record.dblpUrl,
    url_video: coerceString(existingData.url_video),
    image: existingData.image,
    projects: normalizeArray(existingData.projects),
    slides: existingData.slides ?? "",
    dblp_key: record.dblpKey,
    openalex_id: coerceString(openAlexWork?.id),
    source: "dblp",
    ...manualFields,
  };

  const raw = matter.stringify(existingContent, sanitizeForFrontmatter(data), { lineWidth: 0 });
  return {
    ...existingEntry,
    data,
    raw,
    slug,
    filePath: path.join(publicationRoot, slug, "index.md"),
  };
}

function collectManualFields(data) {
  const reserved = new Set([
    "title",
    "authors",
    "date",
    "doi",
    "publishDate",
    "publication_types",
    "publication",
    "publication_short",
    "abstract",
    "summary",
    "tags",
    "categories",
    "featured",
    "url_pdf",
    "url_code",
    "url_dataset",
    "url_poster",
    "url_project",
    "url_slides",
    "url_source",
    "url_video",
    "image",
    "projects",
    "slides",
    "dblp_key",
    "openalex_id",
    "source",
  ]);

  return Object.fromEntries(
    Object.entries(data).filter(([key, value]) => !reserved.has(key) && value !== undefined),
  );
}

function buildAuthors(openAlexWork, dblpAuthors) {
  const openAlexAuthors = asArray(openAlexWork?.authorships)
    .map((authorship) =>
      cleanupText(authorship?.author?.display_name || authorship?.raw_author_name),
    )
    .filter(Boolean);

  const authors = openAlexAuthors.length > 0 ? openAlexAuthors : dblpAuthors;
  return authors.map((author) =>
    SELF_AUTHOR_NAMES.has(normalizeName(author)) ? SELF_AUTHOR_SLUG : author,
  );
}

function resolvePublicationDate(openAlexWork, fallbackDate) {
  const publicationDate = coerceString(openAlexWork?.publication_date);
  if (publicationDate) {
    return publicationDate;
  }

  return fallbackDate;
}

function resolvePublicationShort(existingData, publication) {
  const existingShort = coerceString(existingData.publication_short);
  if (existingShort && /[*_]/.test(existingShort)) {
    return existingShort;
  }

  return publication;
}

function buildVenueLabel(record, openAlexWork) {
  const rawVenue =
    cleanupText(record.venue) ||
    cleanupText(openAlexWork?.primary_location?.source?.display_name) ||
    cleanupText(record.shortVenue);

  if (!rawVenue) {
    return "";
  }

  const emphasis = `*${rawVenue}*`;
  return record.kind === "article" ? emphasis : `In ${emphasis}`;
}

function buildFallbackDate(year, month) {
  if (!Number.isFinite(year)) {
    return "1970-01-01";
  }

  const monthNumber = resolveMonthNumber(month);
  return `${String(year).padStart(4, "0")}-${String(monthNumber).padStart(2, "0")}-01`;
}

function resolveMonthNumber(monthValue) {
  const month = cleanupText(monthValue).toLowerCase();
  const monthIndex = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ].findIndex((name) => name.startsWith(month.slice(0, 3)));

  return monthIndex >= 0 ? monthIndex + 1 : 1;
}

function extractDoi(values) {
  for (const value of asArray(values).map(readText).filter(Boolean)) {
    const normalized = normalizeDoi(value);
    if (normalized) {
      return normalized;
    }
  }

  return "";
}

function normalizeDoi(value) {
  const raw = cleanupText(value);
  if (!raw) {
    return "";
  }

  const normalized = raw
    .replace(/^https?:\/\/(dx\.)?doi\.org\//i, "")
    .replace(/^doi:\s*/i, "")
    .trim()
    .toLowerCase();

  return /^10\.\d{4,9}\/\S+$/i.test(normalized) ? normalized : "";
}

function decodeOpenAlexAbstract(invertedIndex) {
  if (!invertedIndex || typeof invertedIndex !== "object") {
    return "";
  }

  const tokens = [];
  for (const [word, positions] of Object.entries(invertedIndex)) {
    for (const position of asArray(positions)) {
      if (Number.isInteger(position)) {
        tokens[position] = word;
      }
    }
  }

  return cleanupText(tokens.filter(Boolean).join(" "))
    .replace(/\s+([,.;:!?])/g, "$1")
    .replace(/\(\s+/g, "(")
    .replace(/\s+\)/g, ")");
}

function findOpenAlexPdfUrl(openAlexWork) {
  return (
    coerceString(openAlexWork?.best_oa_location?.pdf_url) ||
    coerceString(openAlexWork?.primary_location?.pdf_url) ||
    asArray(openAlexWork?.locations)
      .map((location) => coerceString(location?.pdf_url))
      .find(Boolean) ||
    ""
  );
}

function summarizeAbstract(abstract) {
  const text = cleanupText(abstract);
  if (!text) {
    return "";
  }

  const firstSentence = text.match(/^(.+?[.!?])(\s|$)/)?.[1];
  if (firstSentence && firstSentence.length <= 280) {
    return firstSentence;
  }

  if (text.length <= 280) {
    return text;
  }

  return `${text.slice(0, 277).trimEnd()}...`;
}

function allocateSlug(title, usedSlugs) {
  const baseSlug = slugify(title) || "publication";
  let slug = baseSlug;
  let index = 2;

  while (usedSlugs.has(slug)) {
    slug = `${baseSlug}-${index}`;
    index += 1;
  }

  usedSlugs.add(slug);
  return slug;
}

function slugify(value) {
  return normalizeTitle(value).replace(/\s+/g, "-");
}

function normalizeTitle(value) {
  return cleanupText(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .toLowerCase();
}

function normalizeName(value) {
  return normalizeTitle(value);
}

function compactTitle(value) {
  return normalizeTitle(value).replace(/\s+/g, "");
}

function cleanupTitle(value) {
  return cleanupText(value).replace(/[.]\s*$/, "");
}

function cleanupText(value) {
  return decodeHtmlEntities(readText(value))
    .replace(/\s+/g, " ")
    .trim();
}

function decodeHtmlEntities(value) {
  return String(value ?? "")
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function readAuthorName(author) {
  return cleanupText(readText(author)).replace(/\s+\d{4}$/, "");
}

function readText(value) {
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value.map(readText).join("");
  }

  if (value && typeof value === "object") {
    return Object.entries(value)
      .filter(([key]) => !["pid", "orcid", "bibtexkey", "aux"].includes(key))
      .map(([, nestedValue]) => readText(nestedValue))
      .join("");
  }

  return "";
}

function coerceString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeArray(value) {
  return Array.isArray(value)
    ? value.filter((item) => typeof item === "string" && item.trim()).map((item) => item.trim())
    : [];
}

function sanitizeForFrontmatter(value) {
  if (Array.isArray(value)) {
    return value
      .map((item) => sanitizeForFrontmatter(item))
      .filter((item) => item !== undefined);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .map(([key, nestedValue]) => [key, sanitizeForFrontmatter(nestedValue)])
        .filter(([, nestedValue]) => nestedValue !== undefined),
    );
  }

  return value === undefined ? undefined : value;
}

function mapPublicationType(kind) {
  switch (kind) {
    case "article":
      return "2";
    case "inproceedings":
    case "incollection":
      return "1";
    case "phdthesis":
    case "mastersthesis":
      return "7";
    default:
      return "0";
  }
}

function asArray(value) {
  if (Array.isArray(value)) {
    return value;
  }

  if (value === undefined || value === null || value === "") {
    return [];
  }

  return [value];
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
