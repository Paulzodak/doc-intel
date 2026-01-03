export interface Highlight {
  start: number;
  end: number;
  type: "risk" | "advantage" | "compliance";
  text: string;
  description?: string;
}

export interface Risk {
  text: string;
  severity: "low" | "medium" | "high";
  description: string;
  start?: number;
  end?: number;
}

export interface Advantage {
  text: string;
  description: string;
  start?: number;
  end?: number;
}

export interface KeyPoint {
  text: string;
  description: string;
}

export interface Grading {
  risk: number; // 0-100
  advantages: number; // 0-100
  compliance: number; // 0-100
  overall: number; // 0-100
}

export interface DocumentAnalysis {
  keyPoints: KeyPoint[];
  risks: Risk[];
  advantages: Advantage[];
  highlights: Highlight[];
  grading: Grading;
  summary?: string;
}

export type HighlightType = "risk" | "advantage" | "compliance" | "combined";
