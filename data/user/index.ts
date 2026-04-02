import {
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import type {
  GetUserResponse,
  ListUsersResponse,
  UpdateMeRequest,
  UpdateMeResponse,
} from "@/types/user";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/user/user.slice";

// Query keys factory
export const userKeys = {
  all: ["user"] as const,
  current: () => [...userKeys.all, "current"] as const,
  detail: (id: string) => [...userKeys.all, "detail", id] as const,
  list: () => [...userKeys.all, "list"] as const,
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
