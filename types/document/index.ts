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

import type { Highlight } from "@/types/analysis";

export interface DocumentResult {
  legalAnalysis: {
    confidence: number;
    isLegalDocument: boolean;
  };
  analyzeChunkResults: Array<{ highlights: Highlight[] }>;
}

export interface Document {
  id: string;
  jobId: string;
  userId: string | null;
  guestId: string | null;
  status: string;
  inputText: string;
  result: DocumentResult;
  chunkResults: Array<{ highlights: Highlight[] }>;
  createdAt: string;
  updatedAt: string;
  completedAt: string;
  documentName: string;
  documentSummary: string;
  permission: false | string[];
  externalDocId: string;
}

export interface ListDocumentsResponse {
  success: boolean;
  data?: Document[];
  message?: string;
}

export interface UpdateDocumentRequest {
  documentName?: string;
  /** User IDs with access to the document */
  permission?: string[];
  /** Visibility: "public" | "anyone-with-link" | "me-only" */
  visibility?: 1 | 2 | 3;
}

export interface UpdateDocumentResponse {
  success: boolean;
  data?: Document;
  message?: string;
}

/** Response from POST /api/document/:jobId/archive */
export interface ArchiveDocumentResponse {
  success: boolean;
  message?: string;
  data?: Document;
}

export interface SaveAllowedUsersRequest {
  userIds: string[];
}

export interface SaveAllowedUsersResponse {
  success: boolean;
  message?: string;
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
  message?: string;
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

/** Chat message from document chat API (GET /api/document/chat/:jobId) */
export interface DocumentChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

/** Response from GET /api/document/chat/:jobId */
export interface DocumentChatResponse {
  success?: boolean;
  data?: DocumentChatMessage[];
  messages?: string;
}

/** Response from GET /api/document/share?id= */
export interface ShareDocumentResponse {
  id: string;
  jobId: string;
  userId: string | null;
  guestId: string | null;
  status: string;
  inputText: string | null;
  result: DocumentResult | null;
  chunkResults: Array<{ highlights: Highlight[] }> | null;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
  documentName: string;
  permission: boolean;
  visibility: number;
  externalDocId: string;
}

export interface GeneratePdfRequest {
  html: string;
  scale?: number;
  output?: "png" | "pdf";
  fileName?: string;
  viewportWidth?: number;
  viewportHeight?: number;
  fullPage?: boolean;
}

export interface GeneratePdfResponse {
  success: boolean;
  message?: string;
}

export interface ISidebarDoc {
  id: string;
  jobId: string;
  name: string;
  externalDocId: string;
  date: string;
}
