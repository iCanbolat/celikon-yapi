import { createClient, type EntryFieldTypes, type Asset } from "contentful";
import type { Locale } from "@/i18n/routing";

const hasDeliveryCreds = Boolean(
  process.env.CONTENTFUL_SPACE_ID && process.env.CONTENTFUL_ACCESS_TOKEN
);
const hasPreviewCreds = Boolean(
  process.env.CONTENTFUL_SPACE_ID && process.env.CONTENTFUL_PREVIEW_TOKEN
);

let client = null as ReturnType<typeof createClient> | null;
let previewClient = null as ReturnType<typeof createClient> | null;
let warnedMissingCreds = false;

const warnMissingCreds = () => {
  if (warnedMissingCreds) return;
  warnedMissingCreds = true;
  console.warn(
    "Contentful credentials are missing. Add CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_PREVIEW_TOKEN to your .env file."
  );
};

if (hasDeliveryCreds) {
  client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID!,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  });
} else {
  warnMissingCreds();
}

if (hasPreviewCreds) {
  previewClient = createClient({
    space: process.env.CONTENTFUL_SPACE_ID!,
    accessToken: process.env.CONTENTFUL_PREVIEW_TOKEN!,
    host: "preview.contentful.com",
  });
} else {
  warnMissingCreds();
}

export const getClient = (preview = false) => {
  const resolved = preview ? previewClient : client;
  if (!resolved) {
    warnMissingCreds();
    throw new Error("Contentful credentials not configured");
  }
  return resolved;
};

// Type definitions for Contentful content types

// Project Content Type
export interface ProjectFields {
  title: EntryFieldTypes.Text;
  slug: EntryFieldTypes.Text;
  description: EntryFieldTypes.RichText;
  shortDescription: EntryFieldTypes.Text;
  featuredImage: EntryFieldTypes.AssetLink;
  gallery: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
  client: EntryFieldTypes.Text;
  location: EntryFieldTypes.Text;
  year: EntryFieldTypes.Integer;
  category: EntryFieldTypes.Text;
  featured: EntryFieldTypes.Boolean;
  seoTitle: EntryFieldTypes.Text;
  seoDescription: EntryFieldTypes.Text;
}

export interface ProjectSkeleton {
  contentTypeId: "project";
  fields: ProjectFields;
}

// Transformed types for easier usage
export type ProjectCategory =
  | "depo"
  | "köprü"
  | "fabrika"
  | "restorasyon"
  | "diğer";

const CATEGORY_LABELS: Record<ProjectCategory, { tr: string; en: string }> = {
  depo: { tr: "Depo", en: "Warehouse" },
  köprü: { tr: "Köprü", en: "Bridge" },
  fabrika: { tr: "Fabrika", en: "Factory" },
  restorasyon: { tr: "Restorasyon", en: "Restoration" },
  diğer: { tr: "Diğer", en: "Other" },
};

function normalizeCategory(raw: string | undefined): ProjectCategory {
  const value = (raw || "").toLowerCase().trim();

  switch (value) {
    case "depo":
      return "depo";
    case "köprü":
    case "kopru":
      return "köprü";
    case "fabrika":
      return "fabrika";
    case "restorasyon":
    case "restoration":
      return "restorasyon";
    case "diğer":
    case "diger":
      return "diğer";
    default:
      return "diğer";
  }
}

function getCategoryLabel(category: ProjectCategory, locale: Locale) {
  return locale === "tr"
    ? CATEGORY_LABELS[category].tr
    : CATEGORY_LABELS[category].en;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: any; // Rich text document
  shortDescription: string;
  featuredImage: {
    url: string;
    title: string;
    width: number;
    height: number;
  } | null;
  gallery: Array<{
    url: string;
    title: string;
    width: number;
    height: number;
  }>;
  client: string;
  location: string;
  year: number;
  category: ProjectCategory;
  categoryLabel: string;
  featured: boolean;
  seoTitle: string;
  seoDescription: string;
}

// Helper to transform asset
function transformAsset(asset: Asset | undefined): Project["featuredImage"] {
  if (!asset?.fields?.file) return null;
  const file = asset.fields.file as any;
  return {
    url: `https:${file.url}`,
    title: (asset.fields.title as string) || "",
    width: file.details?.image?.width || 0,
    height: file.details?.image?.height || 0,
  };
}

// Transform Contentful entry to Project
function transformProject(entry: any, locale: Locale): Project {
  const category = normalizeCategory(entry.fields.category);

  return {
    id: entry.sys.id,
    title: entry.fields.title || "",
    slug: entry.fields.slug || "",
    description: entry.fields.description || null,
    shortDescription: entry.fields.shortDescription || "",
    featuredImage: transformAsset(entry.fields.featuredImage),
    gallery: (entry.fields.gallery || [])
      .map((asset: Asset) => transformAsset(asset))
      .filter(Boolean),
    client: entry.fields.client || "",
    location: entry.fields.location || "",
    year: entry.fields.year || new Date().getFullYear(),
    category,
    categoryLabel: getCategoryLabel(category, locale),
    featured: entry.fields.featured || false,
    seoTitle: entry.fields.seoTitle || entry.fields.title || "",
    seoDescription:
      entry.fields.seoDescription || entry.fields.shortDescription || "",
  };
}

// Fetch all projects
export async function getProjects(
  locale: Locale,
  preview = false
): Promise<Project[]> {
  const contentfulLocale = locale === "tr" ? "tr-TR" : "en-US";

  try {
    if (!hasDeliveryCreds) {
      warnMissingCreds();
      return [];
    }

    const entries = await getClient(preview).getEntries<ProjectSkeleton>({
      content_type: "project",
      locale: contentfulLocale,
      order: ["-fields.year"],
      include: 2,
    });

    return entries.items.map((item) => transformProject(item, locale));
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

// Fetch featured projects
export async function getFeaturedProjects(
  locale: Locale,
  limit = 3,
  preview = false
): Promise<Project[]> {
  const contentfulLocale = locale === "tr" ? "tr-TR" : "en-US";

  try {
    if (!hasDeliveryCreds) {
      warnMissingCreds();
      return [];
    }

    const entries = await getClient(preview).getEntries<ProjectSkeleton>({
      content_type: "project",
      locale: contentfulLocale,
      "fields.featured": true,
      order: ["-fields.year"],
      limit,
      include: 2,
    });

    return entries.items.map((item) => transformProject(item, locale));
  } catch (error) {
    console.error("Error fetching featured projects:", error);
    return [];
  }
}

// Fetch single project by slug
export async function getProjectBySlug(
  slug: string,
  locale: Locale,
  preview = false
): Promise<Project | null> {
  const contentfulLocale = locale === "tr" ? "tr-TR" : "en-US";

  try {
    if (!hasDeliveryCreds) {
      warnMissingCreds();
      return null;
    }

    const entries = await getClient(preview).getEntries<ProjectSkeleton>({
      content_type: "project",
      locale: contentfulLocale,
      "fields.slug": slug,
      limit: 1,
      include: 2,
    });

    if (entries.items.length === 0) {
      return null;
    }

    return transformProject(entries.items[0], locale);
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}

// Get all project slugs for static generation
export async function getAllProjectSlugs(): Promise<
  Array<{ slug: string; locale: Locale }>
> {
  const slugs: Array<{ slug: string; locale: Locale }> = [];

  for (const locale of ["tr", "en"] as Locale[]) {
    const projects = await getProjects(locale);
    for (const project of projects) {
      slugs.push({ slug: project.slug, locale });
    }
  }

  return slugs;
}
