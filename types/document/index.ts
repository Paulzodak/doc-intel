export interface AttachDocumentRequest {
  entity_type: string;
  entity_id: string;
  notes?: string;
}

export interface DocumentAttachmentResponse {
  success: boolean;
  message?: string;
  data?: {
    document_id: string;
    entity_type: string;
    entity_id: string;
    attached_at: string;
  };
}

export interface ProcessDocumentRequest {
  text?: string;
  file?: File;
  options?: {
    include_highlights?: boolean;
    include_grading?: boolean;
    analysis_type?: "full" | "quick";
    engine?: string;
  };
}

export interface ProcessDocumentResponse {
  success: boolean;
  jobId: string;
  prompt: string;
}

export interface CleanTextRequest {
  text: string;
}

export interface CleanTextResponse {
  success: boolean;
  text?: string;
  message?: string;
}

export interface JobResponse {
  jobId: string;
  message: string;
  percentage: number;
  inputText: string;
  result: {
    analyzeChunkResults: {
      highlights: Highlight[];
    };
    legalAnalysis: {
      confidence: number;
      isLegalDocument: boolean;
    };
  };
  status: "boolean";
  statusText: string;
  timestamp: number;
}
