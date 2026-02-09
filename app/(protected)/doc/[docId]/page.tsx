"use client";

import { use, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import AnalysisPanel from "@/components/doc/AnalysisPanel";
import DocumentContent from "@/components/doc/DocumentContent";
import HighlightDetailsModal from "@/components/doc/HighlightDetailsModal";
import { testDocumentText, testAnalysis } from "@/data/testAnalysis";
import { useJob } from "@/data/document";
import { useDocumentNames } from "@/hooks/useDocumentNames";
import {
  setSelectedHighlight,
  clearSelectedHighlight,
  selectSelectedHighlight,
} from "@/redux/slices/document/documentContent.slice";
import type { Highlight } from "@/types/analysis";

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
  const {
    data: jobData,
    isLoading,
    error,
  } = useJob(docId, {
    refetchInterval: (query) => {
      const status = query.state.data?.statusText;
      return status === "processing" ? 2000 : false;
    },
  });

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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading document...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-4">
          <p className="text-red-600 text-lg mb-2 font-semibold">Error loading document</p>
          <p className="text-gray-600">
            {error?.message || jobData?.message || "Failed to fetch document"}
          </p>
        </div>
      </div>
    );
  }

  // Show processing state
  if (jobData?.statusText === "processing") {
    const progress = jobData.percentage || 0;
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-4">
          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">{progress}% complete</p>
          </div>
          <p className="text-gray-600">Processing document...</p>
        </div>
      </div>
    );
  }

  console.log(jobData);

  // Process document data
  const documentText = jobData?.inputText || testDocumentText;

  const highlights: Highlight[] = [];
  // Handle result as array or object
  if (jobData?.result) {
    if (Array.isArray(jobData.result?.analyzeChunkResults)) {
      jobData.result?.analyzeChunkResults?.forEach((item: { highlights?: Highlight[] }) => {
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

  const result = jobData?.result as ResultType;
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
      <div className="flex-1 overflow-y-auto h-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 h-full">
          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 borjder border-blue-800 h-full">
            {/* Analysis Panel - First on mobile, right column on desktop */}
            <div className=" order-1 lg:order-2 lg:col-span-1 makx-h-full overdflow-scroll bsorder  border-green-800 rounde">
              {/* <div className="lg:ssticky lg:top-6 max-h-full  rounded-2xl border border-red-800"> */}
              <AnalysisPanel analysis={analysis} />
              {/* </div> */}
            </div>

            {/* Document Text - Second on mobile, left column on desktop */}
            <div className="order-2 lg:order-1 lg:col-span-2">
              <DocumentContent
                documentText={documentText}
                highlights={highlights}
                onHighlightClick={handleHighlightClick}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Modal for Highlight Details */}
      <HighlightDetailsModal
        highlight={selectedHighlight}
        isOpen={!!selectedHighlight}
        onClose={() => dispatch(clearSelectedHighlight())}
      />
    </>
  );
}
