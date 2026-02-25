import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import type { DocumentChatResponse } from "@/types/document";
import { AxiosError } from "axios";
import { documentsKeys } from "../index";

export const documentChatKeys = {
  all: [...documentsKeys.all, "chat"] as const,
  list: (jobId: string) => [...documentChatKeys.all, jobId] as const,
};

/**
 * Query to get chat for a document by job ID.
 * GET /api/document/chat/:jobId
 */
export function useDocumentChat(
  jobId: string,
  options?: Omit<
    UseQueryOptions<DocumentChatResponse, AxiosError<DocumentChatResponse>>,
    "queryKey" | "queryFn"
  >,
) {
  return useQuery({
    queryKey: documentChatKeys.list(jobId),
    queryFn: async () => {
      const response = await apiClient.get<DocumentChatResponse>(
        `/api/document/chat/${jobId}`,
      );
      return response.data;
    },
    enabled: !!jobId,
    ...options,
  });
}
