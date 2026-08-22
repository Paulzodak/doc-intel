"use client";

import { useParams } from "next/navigation";
import AnalysisPanel from "../doc/analysisPanel/AnalysisPanel";
import { useDoc } from "@/data/document";
import { QlaretyLogo } from "@/assets/svg/QlaretyLogo";
import type { Advantage, DocumentAnalysis, Highlight, KeyPoint, Risk } from "@/types/analysis";
import NoContent from "../atoms/NoContent";

// API may return `advantages` either as an array (list of advantages)
// or as a number (overall advantages score).
type ResultGrade = {
  keyPoints?: KeyPoint[];
  risks?: Risk[];
  advantages?: Advantage[] | number;
  highlights?: Highlight[];
  risk?: number;
  compliance?: number;
  overall?: number;
};

type ResultShape =
  | { grade?: ResultGrade; analyzeChunkResults?: Array<{ highlights?: Highlight[] }> }
  | Array<{ grade?: ResultGrade; highlights?: Highlight[] }>
  | undefined;

const RightSidebar = () => {
  const params = useParams();
  const docId = Array.isArray(params?.docId) ? params.docId[0] : params?.docId;
  const { data: docData } = useDoc(docId ?? "");
  console.log(docId, "docId");

  if (!docId) {
    return (
      <div className="h-full flex items-center justify-center text-black">
        {/* <p>No document selected</p> */}
        <NoContent className="!h-auto" />
      </div>
    );
  }

  if (!docData) {
    return (
      <div className="h-full flex items-center justify-center ">
        <QlaretyLogo className="animate-pulse" />
      </div>
    );
  }

  const result = docData.result as ResultShape;

  const highlights: Highlight[] = [];
  if (result && !Array.isArray(result) && Array.isArray(result.analyzeChunkResults)) {
    result.analyzeChunkResults.forEach((item) => {
      if (Array.isArray(item.highlights)) {
        highlights.push(...item.highlights);
      }
    });
  }

  let grade: ResultGrade | undefined;
  if (Array.isArray(result)) {
    grade = result[0]?.grade;
  } else if (result && typeof result === "object") {
    grade = result.grade;
  }

  const advantagesValue = grade?.advantages;
  const advantagesList: Advantage[] = Array.isArray(advantagesValue) ? advantagesValue : [];
  const advantagesScore = typeof advantagesValue === "number" ? advantagesValue : 0;

  const analysis: DocumentAnalysis = {
    keyPoints: grade?.keyPoints ?? [],
    risks: grade?.risks ?? [],
    advantages: advantagesList,
    highlights,
    grading: {
      risk: grade?.risk ?? 0,
      advantages: advantagesScore,
      compliance: grade?.compliance ?? 0,
      overall: grade?.overall ?? 0,
    },
  };

  return (
    <div className="h-full overflow-scroll">
      <AnalysisPanel
        className="border-none h-full max-h-full"
        analysis={analysis}
        docData={docData}
      />
    </div>
  );
};

export default RightSidebar;
