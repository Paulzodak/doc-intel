import fs from "fs";
import path from "path";

export type LegalDocMeta = {
  eyebrow: string;
  title: string;
  description: string;
  lastUpdated: string;
  alternateLabel: string;
  alternateHref: string;
};

export type LegalDocSection = {
  id: string;
  title: string;
  /** Markdown body for the section (no heading) */
  markdown: string;
};

export type LegalDoc = LegalDocMeta & {
  sections: LegalDocSection[];
};

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  if (!raw.startsWith("---")) {
    return { meta: {}, body: raw };
  }
  const end = raw.indexOf("\n---", 3);
  if (end === -1) return { meta: {}, body: raw };

  const fm = raw.slice(4, end).trim();
  const body = raw.slice(end + 4).replace(/^\s*\n/, "");
  const meta: Record<string, string> = {};
  for (const line of fm.split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    meta[key] = value;
  }
  return { meta, body };
}

export function parseLegalMarkdown(raw: string): LegalDoc {
  const { meta, body } = parseFrontmatter(raw);
  const sections: LegalDocSection[] = [];
  const parts = body.split(/^## /m).filter(Boolean);

  for (const part of parts) {
    const nl = part.indexOf("\n");
    const title = (nl === -1 ? part : part.slice(0, nl)).trim();
    const markdown = (nl === -1 ? "" : part.slice(nl + 1)).trim();
    if (!title) continue;
    sections.push({
      id: slugify(title),
      title,
      markdown,
    });
  }

  return {
    eyebrow: meta.eyebrow ?? "Legal",
    title: meta.title ?? "Legal",
    description: meta.description ?? "",
    lastUpdated: meta.lastUpdated ?? "",
    alternateLabel: meta.alternateLabel ?? "",
    alternateHref: meta.alternateHref ?? "/",
    sections,
  };
}

export type LegalDocId = "privacy-policy" | "terms-of-service";

export function loadLegalDoc(id: LegalDocId): LegalDoc {
  const filePath = path.join(process.cwd(), "docs", "legal", `${id}.md`);
  const raw = fs.readFileSync(filePath, "utf8");
  return parseLegalMarkdown(raw);
}
