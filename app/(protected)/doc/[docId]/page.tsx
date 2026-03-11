"use client";

import { use, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import AnalysisPanel from "@/components/doc/analysisPanel";
import DocumentContent from "@/components/doc/DocumentContent";
import HighlightDetailsModal from "@/components/doc/HighlightDetailsModal";
import { testDocumentText, testAnalysis } from "@/data/testAnalysis";
import { useDoc, useJob } from "@/data/document";
import { useDocumentNames } from "@/hooks/useDocumentNames";
import {
  setSelectedHighlight,
  clearSelectedHighlight,
  selectSelectedHighlight,
} from "@/redux/slices/document/documentContent.slice";
import type { Highlight } from "@/types/analysis";
import LogoLoading from "@/components/atoms/LogoLoading";
import { ErrorFeedback } from "@/components/atoms/form/feedback";

interface DocPageProps {
  params: Promise<{ docId: string }>;
}

export default function DocPage({ params }: DocPageProps) {
  const { docId } = use(params);
  const dispatch = useDispatch();
  const selectedHighlight = useSelector(selectSelectedHighlight);
  const { setDocumentName, documents: allDocuments } = useDocumentNames();
  const hasInitializedName = useRef<string | null>(null);

  // Fetch job data
  const { data: docData, isLoading, error } = useDoc(docId, {});

  // Auto-name document with jobId if it doesn't have a name yet (only once per docId)
  useEffect(() => {
    // Reset ref if docId changed
    if (hasInitializedName.current !== docId) {
      hasInitializedName.current = null;
    }

    if (hasInitializedName.current === docId) return; // Already initialized for this docId

    // Check if document already exists in the documents array
    const existingDoc = allDocuments.find((d: { id: string }) => d.id === docId);

    // Only set name if document doesn't exist or has a default name
    if (
      !existingDoc ||
      (existingDoc.name.startsWith("Document ") && existingDoc.name.length < 20)
    ) {
      setDocumentName(docId, `Document ${docId.slice(0, 8)}`);
    }

    hasInitializedName.current = docId;
  }, [docId, allDocuments, setDocumentName]);

  const handleHighlightClick = useCallback(
    (highlight: Highlight) => {
      dispatch(setSelectedHighlight(highlight));
    },
    [dispatch],
  );

  // Show loading state
  if (isLoading) {
    return (
      <LogoLoading>
        <p className="text-sm text-gray-600 mt-4">Opening document…</p>
      </LogoLoading>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center px-4 font-jakarta ">
        <ErrorFeedback message={error?.response?.data?.status || "Failed to fetch document"} />
      </div>
      // <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      //   <div className="text-center max-w-md mx-4">
      //     <p className="text-red-600 text-lg mb-2 font-semibold">Error loading document</p>
      //     <p className="text-gray-600">
      //       {error?.response?.data?.status || "Failed to fetch document"}
      //     </p>
      //   </div>
      // </div>
    );
  }

  console.log(docData);

  // Process document data
  const documentText = docData?.inputText || "";

  const highlights: Highlight[] = [];
  // Handle result as array or object
  if (docData?.result) {
    if (Array.isArray(docData.result?.analyzeChunkResults)) {
      docData.result?.analyzeChunkResults?.forEach((item: { highlights?: Highlight[] }) => {
        if (item.highlights && Array.isArray(item.highlights)) {
          highlights.push(...item.highlights);
        }
      });
    }
  }

  // Type-safe extraction of grade data
  // Note: The API returns 'advantages' as both array (for list) and number (for score)
  type ResultGrade = {
    keyPoints?: unknown[];
    risks?: unknown[];
    advantages?: unknown[] | number; // Can be array or number
    highlights?: unknown[];
    risk?: number;
    compliance?: number;
    overall?: number;
  };

  type ResultType =
    | { grade?: ResultGrade }
    | Array<{ grade?: ResultGrade; highlights?: Highlight[] }>
    | undefined;

  const result = docData?.result as ResultType;
  let grade: ResultGrade | undefined;

  if (Array.isArray(result)) {
    grade = result[0]?.grade;
  } else if (result && typeof result === "object" && "grade" in result) {
    grade = result.grade;
  }

  // Extract advantages - can be array or number
  const advantagesValue = grade?.advantages;
  const advantagesList = Array.isArray(advantagesValue)
    ? (advantagesValue as typeof testAnalysis.advantages)
    : testAnalysis.advantages || [];
  const advantagesScore =
    typeof advantagesValue === "number" ? advantagesValue : (testAnalysis.grading?.advantages ?? 0);

  const analysis = {
    keyPoints: (grade?.keyPoints as typeof testAnalysis.keyPoints) || testAnalysis.keyPoints || [],
    risks: (grade?.risks as typeof testAnalysis.risks) || testAnalysis.risks || [],
    advantages: advantagesList,
    highlights: highlights,
    grading: {
      risk: grade?.risk ?? testAnalysis.grading?.risk ?? 0,
      advantages: advantagesScore,
      compliance: grade?.compliance ?? testAnalysis.grading?.compliance ?? 0,
      overall: grade?.overall ?? testAnalysis.grading?.overall ?? 0,
    },
  };

  return (
    <>
      {/* Header */}
      {/* <DocumentHeader title="Document Analysis Dashboard" /> */}

      {/* Content */}
      {docData && (
        <div className="flex-1 overflow-y-auto h-full">
          <div className="madx-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 h-full">
            <div className="flex flex-col lg:grid lg:grid-cols-10 gap-6 bokrder border-blue-800 h-full md:overflow-hidden">
              {/* Analysis Panel - First on mobile, right column on desktop */}
              <div className=" order-1 lg:order-2 lg:col-span-3  md:overflow-scroll borkder  border-green-800 rounde">
                {/* <div className="lg:ssticky lg:top-6 max-h-full  rounded-2xl border border-red-800"> */}
                <AnalysisPanel analysis={analysis} docData={docData} />
              </div>
              {/* </div> */}

              {/* Document Text - Second on mobile, left column on desktop */}
              <div className="order-2 lg:order-1 lg:col-span-7 md:overflow-scroll h-full bodrder border-red-800">
                <DocumentContent
                  docId={docId}
                  docData={docData}
                  documentName={docData?.documentName ?? `Document ${docId.slice(0, 8)}`}
                  documentText={documentText}
                  highlights={highlights}
                  onHighlightClick={handleHighlightClick}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Modal for Highlight Details */}
      <HighlightDetailsModal
        highlight={selectedHighlight}
        isOpen={!!selectedHighlight}
        onClose={() => dispatch(clearSelectedHighlight())}
      />
    </>
  );
}
