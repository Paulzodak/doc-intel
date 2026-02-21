import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import type { GetUserResponse, ListUsersResponse } from "@/types/user";
import { AxiosError } from "axios";

// Query keys factory
export const userKeys = {
  all: ["user"] as const,
  current: () => [...userKeys.all, "current"] as const,
  list: () => [...userKeys.all, "list"] as const,
};

// Hook to get users list (GET api/users)
export function useUsers(
  options?: Omit<
    UseQueryOptions<ListUsersResponse, AxiosError<ListUsersResponse>>,
    "queryKey" | "queryFn"
  >
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

// Hook to get current user (mutation for manual .then()/.catch() handling in consumer)
export function useGetUser(
  options?: Omit<
    UseMutationOptions<GetUserResponse, AxiosError<GetUserResponse>, void>,
    "mutationFn"
  >
) {
  return useMutation({
    mutationFn: async () => {
      const response = await apiClient.get<GetUserResponse>("/api/auth/session");
      return response.data;
    },
    ...options,
  });
}
