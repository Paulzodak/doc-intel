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
  };
}

export interface ProcessDocumentResponse {
  success: boolean;
  jobId: string;
  prompt: string;
}

export interface JobResponse {
  success: boolean;
  message?: string;
  data?: {
    status: "processing" | "completed" | "failed";
    progress?: number;
  };
  inputText?: string;
  result?: {
    grade?: {
      keyPoints?: unknown[];
      risks?: unknown[];
      advantages?: unknown[];
      highlights?: unknown[];
      risk?: number;
      compliance?: number;
      overall?: number;
    };
  };
}
