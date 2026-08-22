import {
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import type {
  ChangePasswordRequest,
  ChangePasswordResponse,
  GetUserResponse,
  ListUsersResponse,
  User,
  UpdateMeRequest,
  UpdateMeResponse,
} from "@/types/user";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/user/user.slice";
import { ToastLogger } from "@/utils/toastUtils";

// Query keys factory
export const userKeys = {
  all: ["user"] as const,
  current: () => [...userKeys.all, "current"] as const,
  detail: (id: string) => [...userKeys.all, "detail", id] as const,
  list: () => [...userKeys.all, "list"] as const,
  search: (query: string) => [...userKeys.all, "search", query] as const,
};

// Hook to get users list (GET api/users)
export function useUsers(
  options?: Omit<
    UseQueryOptions<ListUsersResponse, AxiosError<ListUsersResponse>>,
    "queryKey" | "queryFn"
  >,
) {
  return useQuery({
    queryKey: userKeys.list(),
    queryFn: async () => {
      const response = await apiClient.get<ListUsersResponse>("/api/users");
      return response.data;
    },
    ...options,
  });
}

// Hook to search users via /api/admin/users/search
export function useUserSearch(
  query: string,
  options?: Omit<
    UseQueryOptions<User | null, AxiosError<{ message?: string }>>,
    "queryKey" | "queryFn" | "enabled"
  >,
) {
  return useQuery({
    queryKey: userKeys.search(query),
    queryFn: async () => {
      const response = await apiClient.get("/api/users/search", {
        params: { email: query },
      });
      const payload = response.data;
      const userCandidate =
        payload?.data?.user ?? payload?.data ?? payload?.user ?? payload ?? null;
      if (!userCandidate?.id) return null;
      return {
        id: userCandidate.id,
        username: userCandidate.username,
        email: userCandidate.email,
      } as User;
    },
    enabled: false,
    ...options,
  });
}

// Hook to get user by id
export function useGetUser(
  options?: Omit<
    UseQueryOptions<GetUserResponse, AxiosError<GetUserResponse>>,
    "queryKey" | "queryFn"
  >,
) {
  const dispatch = useDispatch();
  return useQuery({
    queryKey: userKeys.current(),
    queryFn: async () => {
      const response = await apiClient.get<GetUserResponse>(`/api/user/me`);
      console.log(response);
      dispatch(setUser(response.data.user));
      return response.data;
    },
    enabled: true,
    ...options,
  });
}

export function useUpdateMe(
  options?: UseMutationOptions<UpdateMeResponse, AxiosError<UpdateMeResponse>, UpdateMeRequest>,
) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { onSuccess: userOnSuccess, ...restOptions } = options ?? {};

  return useMutation({
    mutationFn: async (data: UpdateMeRequest) => {
      const response = await apiClient.patch<UpdateMeResponse>("/api/user/me", data);
      return response.data;
    },
    ...restOptions,
    onSuccess: (data, variables, context, mutation) => {
      if (data?.user) dispatch(setUser(data.user));
      queryClient.invalidateQueries({ queryKey: userKeys.current() });
      queryClient.invalidateQueries({ queryKey: userKeys.list() });
      userOnSuccess?.(data, variables, context, mutation);
    },
  });
}

export function useChangePassword(
  options?: UseMutationOptions<
    ChangePasswordResponse,
    AxiosError<ChangePasswordResponse>,
    ChangePasswordRequest
  >,
) {
  const { onError: userOnError, ...restOptions } = options ?? {};

  return useMutation({
    mutationFn: async (data: ChangePasswordRequest) => {
      const response = await apiClient.patch<ChangePasswordResponse>("/api/user/me/password", data);
      return response.data;
    },
    ...restOptions,
    onError: (error, variables, onMutateResult, context) => {
      ToastLogger.error(
        "auth",
        error.response?.data?.message ?? error.message ?? "Failed to change password",
      );
      userOnError?.(error, variables, onMutateResult, context);
    },
  });
}
