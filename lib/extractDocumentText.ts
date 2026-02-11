/**
 * Extracts plain text from document files.
 * Supports: PDF (pdfjs-dist), DOCX/DOC (mammoth), ODT/EPUB (jszip + XML),
 * and text-based types (FileReader).
 *
 * Dependencies: jszip, mammoth, pdfjs-dist. Run `npm install` if not already installed.
 */

const TEXT_TYPES = [
  "text/plain",
  "text/markdown",
  "text/html",
  "text/csv",
  "application/rtf",
  "application/x-rtf",
];

const TEXT_EXTENSIONS = [".txt", ".md", ".markdown", ".html", ".htm", ".rtf", ".csv"];

function isTextFile(file: File): boolean {
  if (TEXT_TYPES.some((t) => file.type === t)) return true;
  const name = file.name.toLowerCase();
  return TEXT_EXTENSIONS.some((ext) => name.endsWith(ext));
}

function isPdf(file: File): boolean {
  return file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
}

function isDocxOrDoc(file: File): boolean {
  const t = file.type.toLowerCase();
  const n = file.name.toLowerCase();
  return (
    t === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    t === "application/msword" ||
    n.endsWith(".docx") ||
    n.endsWith(".doc")
  );
}

function isOdt(file: File): boolean {
  return (
    file.type === "application/vnd.oasis.opendocument.text" ||
    file.name.toLowerCase().endsWith(".odt")
  );
}

function isEpub(file: File): boolean {
  return file.type === "application/epub+zip" || file.name.toLowerCase().endsWith(".epub");
}

function readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(file);
  });
}

async function extractPdfText(arrayBuffer: ArrayBuffer): Promise<string> {
  const pdfjs = await import("pdfjs-dist");
  const lib = pdfjs as unknown as {
    getDocument: (opts: { data: ArrayBuffer }) => { promise: Promise<PDFDocumentProxy> };
    GlobalWorkerOptions?: { workerSrc: string };
    version?: string;
  };
  if (typeof window !== "undefined" && lib.GlobalWorkerOptions && !lib.GlobalWorkerOptions.workerSrc) {
    try {
      const ver = lib.version || "4.0.379";
      lib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${ver}/pdf.worker.min.mjs`;
    } catch {
      // ignore
    }
  }
  const doc = await lib.getDocument({ data: arrayBuffer }).promise;
  const numPages = doc.numPages;
  const parts: string[] = [];
  for (let i = 1; i <= numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    const pageText = (content.items as { str?: string }[])
      .map((item) => item.str ?? "")
      .join(" ");
    parts.push(pageText);
  }
  return parts.join("\n\n");
}

interface PDFDocumentProxy {
  numPages: number;
  getPage: (i: number) => Promise<{ getTextContent: () => Promise<{ items: { str?: string }[] }> }>;
}

async function extractDocxText(arrayBuffer: ArrayBuffer): Promise<string> {
  const mammoth = await import("mammoth");
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
}

/** Strip XML tags and decode entities for ODT content.xml / EPUB xhtml */
function stripXmlToText(xmlString: string): string {
  if (typeof DOMParser === "undefined") {
    return xmlString.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  }
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlString, "text/xml");
    return (doc.documentElement?.textContent ?? xmlString).replace(/\s+/g, " ").trim();
  } catch {
    return xmlString.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  }
}

/** Minimal type for JSZip constructor (loadAsync) and zip instance (file, files). */
interface JSZipStatic {
  loadAsync(data: ArrayBuffer): Promise<{
    file: (name: string) => { async(type: "text"): Promise<string> } | null;
    files: Record<string, unknown>;
  }>;
}

let jszipCache: Promise<JSZipStatic> | null = null;

async function loadJSZip(): Promise<JSZipStatic> {
  if (!jszipCache) {
    jszipCache = import("jszip").then((mod) =>
      ("default" in mod ? mod.default : mod) as JSZipStatic
    );
  }
  return jszipCache;
}

async function extractOdtText(arrayBuffer: ArrayBuffer): Promise<string> {
  const JSZip = await loadJSZip();
  const zip = await JSZip.loadAsync(arrayBuffer);
  const content = zip.file("content.xml");
  if (!content) return "[Could not find content in ODT file.]";
  const text = await content.async("text");
  return stripXmlToText(text);
}

async function extractEpubText(arrayBuffer: ArrayBuffer): Promise<string> {
  const JSZip = await loadJSZip();
  const zip = await JSZip.loadAsync(arrayBuffer);
  const entries = Object.keys(zip.files).filter(
    (p) => p.endsWith(".xhtml") || p.endsWith(".html")
  );
  if (entries.length === 0) return "[No HTML content found in EPUB.]";
  const parts: string[] = [];
  for (const path of entries.sort()) {
    const file = zip.file(path);
    if (!file) continue;
    const text = await file.async("text");
    parts.push(stripXmlToText(text));
  }
  return parts.filter(Boolean).join("\n\n");
}

/**
 * Extract text content from a document file.
 * Supports: PDF, DOCX, DOC, ODT, EPUB, and text-based types (TXT, MD, HTML, RTF, CSV).
 */
export async function extractDocumentText(file: File): Promise<string> {
  try {
    if (isPdf(file)) {
      const ab = await readFileAsArrayBuffer(file);
      return await extractPdfText(ab);
    }

    if (isDocxOrDoc(file)) {
      const ab = await readFileAsArrayBuffer(file);
      return await extractDocxText(ab);
    }

    if (isOdt(file)) {
      const ab = await readFileAsArrayBuffer(file);
      return await extractOdtText(ab);
    }

    if (isEpub(file)) {
      const ab = await readFileAsArrayBuffer(file);
      return await extractEpubText(ab);
    }

    if (isTextFile(file)) {
      return await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result;
          resolve(typeof result === "string" ? result : "");
        };
        reader.onerror = () => reject(reader.error);
        reader.readAsText(file, "UTF-8");
      });
    }

    return `[Text preview not available for ${file.name}. Supported: PDF, DOCX, DOC, ODT, EPUB, TXT, MD, HTML, RTF, CSV.]`;
  } catch (e) {
    return `[Failed to extract text: ${e instanceof Error ? e.message : String(e)}]`;
  }
}

/**
 * Extract text from multiple files in sequence.
 */
export async function extractDocumentTextFromFiles(
  files: File[],
  keyBy: "name" | "index" = "name"
): Promise<Record<string, string>> {
  const out: Record<string, string> = {};
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const key = keyBy === "index" ? String(i) : file.name;
    out[key] = await extractDocumentText(file);
  }
  return out;
}
