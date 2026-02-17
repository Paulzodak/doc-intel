import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import type { GetUserResponse } from "@/types/user";
import { AxiosError } from "axios";

// Query keys factory
export const userKeys = {
  all: ["user"] as const,
  current: () => [...userKeys.all, "current"] as const,
};

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
