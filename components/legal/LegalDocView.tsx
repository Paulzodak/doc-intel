"use client";

import { LegalPageShell } from "@/components/legal/LegalPageShell";
import { LegalMarkdown } from "@/components/legal/LegalMarkdown";
import type { LegalDoc } from "@/lib/legal/loadLegalDoc";

export function LegalDocView({ doc }: { doc: LegalDoc }) {
  return (
    <LegalPageShell
      eyebrow={doc.eyebrow}
      title={doc.title}
      description={doc.description}
      lastUpdated={doc.lastUpdated}
      alternate={{ label: doc.alternateLabel, href: doc.alternateHref }}
      sections={doc.sections.map((section) => ({
        id: section.id,
        title: section.title,
        content: <LegalMarkdown markdown={section.markdown} />,
      }))}
    />
  );
}
