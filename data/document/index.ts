import { ToastLogger } from "@/utils/toastUtils";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import type {
  JobResponse,
  ProcessDocumentRequest,
  ProcessDocumentResponse,
  // ProcessTextRequest,
} from "@/types/document";
import { clearError } from "@/redux/slices/document/input.slice";
import { useDispatch } from "react-redux";

// Query keys factory
export const documentsKeys = {
  all: ["documents"] as const,
  lists: () => [...documentsKeys.all, "list"] as const,
  list: (filters?: Record<string, unknown>) => [...documentsKeys.lists(), filters] as const,
  detail: (id: string) => [...documentsKeys.all, "detail", id] as const,
  attachments: (id: string) => [...documentsKeys.all, "attachments", id] as const,
  entity: (entityType: string, entityId: string) =>
    [...documentsKeys.all, "entity", entityType, entityId] as const,
  processing: () => [...documentsKeys.all, "processing"] as const,
  analysis: (id: string) => [...documentsKeys.all, "analysis", id] as const,
  job: (jobId: string) => [...documentsKeys.all, "job", jobId] as const,
};

// Hook to attach document to entity
// export function useProcessDocument(
//   options?: UseMutationOptions<
//     DocumentAttachmentResponse,
//     Error,
//     { documentId: string; data: AttachDocumentRequest }
//   >
// ) {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async ({
//       documentId,
//       data,
//     }: {
//       documentId: string;
//       data: AttachDocumentRequest;
//     }) => {
//       const response = await apiClient.post<DocumentAttachmentResponse>(
//         `/documents/${documentId}/attach`,
//         {
//           entity_type: data.entity_type,
//           entity_id: data.entity_id,
//           notes: data.notes,
//         }
//       );
//       return response.data;
//     },
//     onSuccess: (_data, variables) => {
//       queryClient.invalidateQueries({ queryKey: documentsKeys.detail(variables.documentId) });
//       queryClient.invalidateQueries({ queryKey: documentsKeys.attachments(variables.documentId) });
//       queryClient.invalidateQueries({ queryKey: documentsKeys.lists() });
//       // Invalidate entity documents query
//       queryClient.invalidateQueries({
//         queryKey: documentsKeys.entity(variables.data.entity_type, variables.data.entity_id),
//       });
//       ToastLogger.success("documents", "Document attached successfully");
//     },
//     onError: (error: Error) => {
//       ToastLogger.error("documents", `Failed to attach document: ${error.message}`);
//     },
//     ...options,
//   });
// }

// Hook to process text input for analysis
export function useProcessDocument(
  options?: UseMutationOptions<ProcessDocumentResponse, Error, ProcessDocumentRequest>
) {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: async (data: ProcessDocumentRequest) => {
      dispatch(clearError());
      const response = await apiClient.post<ProcessDocumentResponse>("/api/document/process", {
        text: data.text,
        options: data.options || {
          include_highlights: true,
          include_grading: true,
          analysis_type: "full",
        },
      });
      return response.data;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSuccess: (_data) => {
      queryClient.invalidateQueries({ queryKey: documentsKeys.processing() });
      ToastLogger.success("documents", "Text processing started successfully");
    },
    onError: (error: Error) => {
      ToastLogger.error("documents", `Failed to process text: ${error.message}`);
    },
    ...options,
  });
}

// Hook to get job by ID
export function useJob(
  jobId: string,
  options?: Omit<UseQueryOptions<JobResponse, Error>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: documentsKeys.job(jobId),
    queryFn: async () => {
      const response = await apiClient.get<JobResponse>(`/api/document/job/${jobId}`);
      return response.data;
    },
    enabled: !!jobId,
    ...options,
  });
}
