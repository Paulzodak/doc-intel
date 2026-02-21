import { ToastLogger } from "@/utils/toastUtils";
import { useEffect } from "react";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import type {
  CleanTextRequest,
  CleanTextResponse,
  JobResponse,
  ListDocumentsResponse,
  ProcessDocumentRequest,
  ProcessDocumentResponse,
  SaveAllowedUsersRequest,
  SaveAllowedUsersResponse,
  ShareDocumentResponse,
  UpdateDocumentRequest,
  UpdateDocumentResponse,
  // ProcessTextRequest,
} from "@/types/document";
import { clearError } from "@/redux/slices/document/input.slice";
import { selectGuestId } from "@/redux/slices/auth/auth.slice";
import { selectUser } from "@/redux/slices/user/user.slice";
import {
  setDocuments,
  setDocumentsLoading,
  setDocumentsError,
  removeDocument,
} from "@/redux/slices/document/documentsList.slice";
import { store } from "@/redux/store";
import { useDispatch } from "react-redux";
import { AxiosError } from "axios";
import type { Document } from "@/types/document";

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
  options?: UseMutationOptions<
    ProcessDocumentResponse,
    AxiosError<ProcessDocumentResponse>,
    ProcessDocumentRequest
  >,
) {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: async (data: ProcessDocumentRequest) => {
      dispatch(clearError());
      const state = store.getState();
      const user = selectUser(state);
      const guestId = selectGuestId(state);
      const body: Record<string, unknown> = {
        text: data.text,
        options: data.options || {
          include_highlights: true,
          include_grading: true,
          analysis_type: "full",
        },
      };
      if (!user && guestId) {
        body.guestId = guestId;
      }
      const response = await apiClient.post<ProcessDocumentResponse>("/api/document/process", body);
      return response.data;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSuccess: (_data) => {
      queryClient.invalidateQueries({ queryKey: documentsKeys.processing() });
      ToastLogger.success("documents", "Text processing started successfully");
    },
    onError: (error: AxiosError<ProcessDocumentResponse>) => {
      ToastLogger.error("documents", `Failed to process text: ${error.message}`);
    },
    ...options,
  });
}

// Hook to clean text
export function useCleanText(
  options?: UseMutationOptions<CleanTextResponse, Error, CleanTextRequest>,
) {
  return useMutation({
    mutationFn: async (data: CleanTextRequest) => {
      const response = await apiClient.post<CleanTextResponse>("/api/document/clean", {
        text: data.text,
      });
      return response.data;
    },
    onSuccess: () => {
      ToastLogger.success("documents", "Text cleaned successfully");
    },
    onError: (error: Error) => {
      ToastLogger.error("documents", `Failed to clean text: ${error.message}`);
    },
    ...options,
  });
}

// Hook to fetch document list and sync to Redux
export function useDocumentsList(
  options?: Omit<
    UseQueryOptions<ListDocumentsResponse, AxiosError<ListDocumentsResponse>>,
    "queryKey" | "queryFn"
  >,
) {
  const dispatch = useDispatch();

  const query = useQuery({
    queryKey: documentsKeys.lists(),
    queryFn: async () => {
      const response = await apiClient.get<ListDocumentsResponse>("/api/documents");
      return response.data;
    },
    ...options,
  });

  useEffect(() => {
    dispatch(setDocumentsLoading(query.isLoading));
  }, [dispatch, query.isLoading]);

  useEffect(() => {
    if (query.data?.data) {
      dispatch(setDocuments(query.data.data));
    }
  }, [dispatch, query.data]);

  useEffect(() => {
    if (query.error) {
      dispatch(setDocumentsError(query.error.message ?? "Failed to fetch documents"));
    }
  }, [dispatch, query.error]);

  return query;
}

// Hook to delete a document
export function useDeleteDocument(
  options?: UseMutationOptions<{ success: boolean; message?: string }, Error, string>,
) {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: async (documentId: string) => {
      const response = await apiClient.delete<{ success: boolean; message?: string }>(
        `/api/documents/${documentId}`,
      );
      return response.data;
    },
    onSuccess: (_data, documentId) => {
      dispatch(removeDocument(documentId));
      queryClient.invalidateQueries({ queryKey: documentsKeys.lists() });
    },
    ...options,
  });
}

// Hook to update a document (name, permission, etc.)
export function useUpdateDocument(
  options?: UseMutationOptions<
    UpdateDocumentResponse,
    AxiosError<UpdateDocumentResponse>,
    { documentId: string; data: UpdateDocumentRequest }
  >,
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      documentId,
      data,
    }: {
      documentId: string;
      data: UpdateDocumentRequest;
    }) => {
      const response = await apiClient.patch<UpdateDocumentResponse>(
        `/api/document/${documentId}`,
        data,
      );
      return response.data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: documentsKeys.detail(variables.documentId) });
      queryClient.invalidateQueries({ queryKey: documentsKeys.lists() });
    },
    onError: (error: AxiosError<UpdateDocumentResponse>) => {
      ToastLogger.error(
        "documents",
        `Failed to update document: ${error.response?.data?.message ?? error.message}`,
      );
    },
    ...options,
  });
}

// Hook to get job by ID
export function useJob(
  jobId: string,
  options?: Omit<UseQueryOptions<JobResponse, AxiosError<JobResponse>>, "queryKey" | "queryFn">,
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
// Hook to get job by ID
export function useDoc(
  docId: string,
  options?: Omit<UseQueryOptions<Document, AxiosError<Document>>, "queryKey" | "queryFn">,
) {
  return useQuery({
    queryKey: documentsKeys.detail(docId),
    queryFn: async () => {
      const response = await apiClient.get<Document>(`/api/document/${docId}`);
      return response.data;
    },
    enabled: !!docId,
    ...options,
  });
}

export function useSaveDocumentAllowedUsers(
  documentId: string,
  options?: UseMutationOptions<
    SaveAllowedUsersResponse,
    AxiosError<SaveAllowedUsersResponse>,
    SaveAllowedUsersRequest
  >,
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: SaveAllowedUsersRequest) => {
      const response = await apiClient.post<SaveAllowedUsersResponse>(
        `/api/document/${documentId}/allowed-users`,
        data,
      );
      return response.data;
    },
    onSuccess: (_data, _variables, context) => {
      queryClient.invalidateQueries({ queryKey: documentsKeys.detail(documentId) });
      queryClient.invalidateQueries({ queryKey: documentsKeys.lists() });
      ToastLogger.success("documents", "Allowed users updated");
    },
    onError: (error: AxiosError<SaveAllowedUsersResponse>) => {
      ToastLogger.error(
        "documents",
        error.response?.data?.message ?? error.message ?? "Failed to update allowed users",
      );
    },
    ...options,
  });
}

const shareKey = (id: string) => [...documentsKeys.all, "share", id] as const;

export function useShareDocument(
  shareId: string | null,
  options?: Omit<
    UseQueryOptions<ShareDocumentResponse, AxiosError<{ message?: string }>>,
    "queryKey" | "queryFn"
  >,
) {
  return useQuery({
    queryKey: shareKey(shareId ?? ""),
    queryFn: async () => {
      const response = await apiClient.post<ShareDocumentResponse>("/api/document/share", {
        sourceDocumentId: shareId,
      });
      return response.data;
    },
    enabled: !!shareId,
    ...options,
  });
}
