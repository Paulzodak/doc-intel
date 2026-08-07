import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { LegalList } from "@/components/legal/LegalPageShell";

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(text.slice(last, match.index));
    }
    const token = match[0];
    if (token.startsWith("**")) {
      nodes.push(
        <strong key={key++} className="font-semibold text-[#11161f] dark:text-white">
          {token.slice(2, -2)}
        </strong>,
      );
    } else {
      const m = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (m) {
        const href = m[2];
        const label = m[1];
        const className =
          "font-semibold text-[#11161f] underline decoration-primary-green/40 underline-offset-4 dark:text-white";
        if (href.startsWith("http") || href.startsWith("mailto:")) {
          nodes.push(
            <a key={key++} href={href} className={className}>
              {label}
            </a>,
          );
        } else {
          nodes.push(
            <Link key={key++} href={href} className={className}>
              {label}
            </Link>,
          );
        }
      }
    }
    last = match.index + token.length;
  }

  if (last < text.length) {
    nodes.push(text.slice(last));
  }

  return nodes;
}

/** Lightweight markdown for legal docs: paragraphs, lists, bold, links. */
export function LegalMarkdown({ markdown }: { markdown: string }) {
  const lines = markdown.split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i += 1;
      continue;
    }

    if (line.trimStart().startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trimStart().startsWith("- ")) {
        items.push(lines[i].trim().slice(2));
        i += 1;
      }
      blocks.push(
        <LegalList
          key={key++}
          items={items.map((item, idx) => (
            <Fragment key={idx}>{renderInline(item)}</Fragment>
          ))}
        />,
      );
      continue;
    }

    const para: string[] = [];
    while (i < lines.length && lines[i].trim() && !lines[i].trimStart().startsWith("- ")) {
      para.push(lines[i]);
      i += 1;
    }
    blocks.push(
      <p key={key++}>{renderInline(para.join(" ").replace(/\s+/g, " ").trim())}</p>,
    );
  }

  return <>{blocks}</>;
}
