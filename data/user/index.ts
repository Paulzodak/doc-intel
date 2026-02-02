import { ToastLogger } from "@/utils/toastUtils";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import type { GetUserResponse } from "@/types/user";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser, setLoading, setError, clearError } from "@/redux/slices/user/user.slice";

// Query keys factory
export const userKeys = {
  all: ["user"] as const,
  current: () => [...userKeys.all, "current"] as const,
};

// Hook to get current user
export function useGetUser(
  options?: Omit<
    UseQueryOptions<GetUserResponse, AxiosError<GetUserResponse>>,
    "queryKey" | "queryFn"
  >,
) {
  const dispatch = useDispatch();

  const result = useQuery({
    queryKey: userKeys.current(),
    queryFn: async () => {
      dispatch(setLoading(true));
      dispatch(clearError());
      const response = await apiClient.get<GetUserResponse>("/api/auth/session");
      return response.data;
    },
    ...options,
  });

  useEffect(() => {
    if (result.isSuccess && result.data) {
      const data = result.data;
      if (data.success && data.data) {
        dispatch(setUser(data.data));
        ToastLogger.success("user", "User data loaded successfully");
      } else {
        dispatch(setError(data.message || "Failed to load user data"));
        ToastLogger.error("user", data.message || "Failed to load user data");
      }
    }
  }, [result.isSuccess, result.data, dispatch]);

  useEffect(() => {
    if (result.isError && result.error) {
      const errorMessage =
        result.error.response?.data?.message ||
        result.error.message ||
        "Failed to load user data";
      dispatch(setError(errorMessage));
      ToastLogger.error("user", errorMessage);
    }
  }, [result.isError, result.error, dispatch]);

  return result;
}
