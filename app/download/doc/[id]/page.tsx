"use client";
import { notFound } from "next/navigation";
import { getDocument } from "@/lib/server/document";
import { RenderTextContent } from "@/components/doc/docContent/RenderTextContent";
import type { Highlight } from "@/types/analysis";
import { useDoc } from "@/data/document";
import LogoLoading from "@/components/atoms/LogoLoading";
import { use, useEffect } from "react";
import ReactDOMServer from "react-dom/server";

export const dynamic = "force-dynamic";
interface PublicDocPageProps {
  params: Promise<{ id: string }>;
}

export default function PublicDocPage({ params }: PublicDocPageProps) {
  const { id } = use(params);
  const { data: docData } = useDoc(id);

  useEffect(() => {
    const html = ReactDOMServer.renderToStaticMarkup(
      <RenderTextContent
        documentText={docData?.inputText || ""}
        highlights={
          docData?.result?.analyzeChunkResults?.flatMap((chunk) => chunk.highlights || []) || []
        }
      />,
    );
    console.log(html);
  }, [docData]);
  // const docData =  getDocument(id);

  // const { id } = await params;
  // if (!docData) {
  //   notFound();
  // }

  // const documentText = docData.inputText ?? "";
  // const highlights: Highlight[] = [];

  // if (docData.result?.analyzeChunkResults) {
  //   for (const item of docData.result.analyzeChunkResults) {
  //     if (item.highlights && Array.isArray(item.highlights)) {
  //       highlights.push(...(item.highlights as Highlight[]));
  //     }
  //   }
  // }

  return (
    <main className="min-h-screen bg-white text-black prose">
      {docData && (
        <RenderTextContent
          documentText={docData.inputText}
          highlights={docData.result?.analyzeChunkResults?.flatMap(
            (chunk) => chunk.highlights || [],
          )}
        />
      )}
      {!docData && (
        <div className="flex items-center justify-center h-screen">
          <LogoLoading />
        </div>
      )}
    </main>
  );
}
