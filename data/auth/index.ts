import { useEffect } from "react";
import { ToastLogger } from "@/utils/toastUtils";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import type {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  SignUpRequest,
  SignUpResponse,
  LoginRequest,
  LoginResponse,
  MagicLinkRequest,
  MagicLinkResponse,
  VerifyEmailRequest,
  VerifyEmailResponse,
  SessionResponse,
  LogoutResponse,
  OAuthProvider,
} from "@/types/auth";
import { setUser, clearUser } from "@/redux/slices/user/user.slice";
import { useDispatch } from "react-redux";
import { AxiosError } from "axios";

// Query keys factory
export const authKeys = {
  all: ["auth"] as const,
  session: () => [...authKeys.all, "session"] as const,
  signUp: () => [...authKeys.all, "signup"] as const,
  login: () => [...authKeys.all, "login"] as const,
  magicLink: () => [...authKeys.all, "magic-link"] as const,
  forgotPassword: () => [...authKeys.all, "forgot-password"] as const,
  verifyEmail: () => [...authKeys.all, "verify-email"] as const,
  oauth: (provider: OAuthProvider) => [...authKeys.all, "oauth", provider] as const,
  logout: () => [...authKeys.all, "logout"] as const,
};

// Hook to get current session
export function useGetSession(
  options?: Omit<
    UseQueryOptions<SessionResponse, AxiosError<SessionResponse>>,
    "queryKey" | "queryFn"
  >,
) {
  const dispatch = useDispatch();

  const query = useQuery({
    queryKey: authKeys.session(),
    queryFn: async () => {
      const response = await apiClient.get<SessionResponse>("/api/auth/session");
      return response.data;
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
    ...options,
  });

  // useEffect(() => {
  //   if (query.data?.success && query.data.data) {
  //     dispatch(
  //       setUser({
  //         id: query.data.data.id,
  //         username: query.data.data.username,
  //         email: query.data.data.email,
  //         email_verified: query.data.data.email_verified,
  //       }),
  //     );
  //   }
  //   if (query.error || (query.data && !query.data.success)) {
  //     dispatch(clearUser());
  //   }
  // }, [dispatch, query.data, query.error]);

  return query;
}

// Hook to log out (clears session cookie on server)
export function useLogout(
  options?: UseMutationOptions<LogoutResponse, AxiosError<LogoutResponse>, void>,
) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { onSuccess: userOnSuccess, onError: userOnError, ...restOptions } = options ?? {};

  return useMutation({
    mutationKey: authKeys.logout(),
    mutationFn: async () => {
      const response = await apiClient.post<LogoutResponse>("/api/auth/signout");
      return response.data;
    },
    ...restOptions,
    onSuccess: (data, variables, context, options) => {
      dispatch(clearUser());
      queryClient.removeQueries({ queryKey: authKeys.session() });
      userOnSuccess?.(data, variables, context, options);
    },
    onError: userOnError,
  });
}

// Hook to sign up
export function useSignUp(
  options?: UseMutationOptions<SignUpResponse, AxiosError<SignUpResponse>, SignUpRequest>,
) {
  return useMutation({
    mutationFn: async (data: SignUpRequest) => {
      const response = await apiClient.post<SignUpResponse>("/api/auth/signup", {
        username: data.username,
        email: data.email,
        password: data.password,
      });
      return response.data;
    },
    onSuccess: () => {
      ToastLogger.success("auth", "Account created successfully");
    },
    onError: (error: Error) => {
      ToastLogger.error("auth", `Failed to sign up: ${error.message}`);
    },
    ...options,
  });
}

// Hook to login
export function useLogin(
  options?: UseMutationOptions<LoginResponse, AxiosError<LoginResponse>, LoginRequest>,
) {
  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      const response = await apiClient.post<LoginResponse>("/api/auth/signin", {
        email: data.email,
        password: data.password,
      });
      return response.data;
    },
    onSuccess: () => {
      ToastLogger.success("auth", "Logged in successfully");
    },
    onError: (error: Error) => {
      ToastLogger.error("auth", `Failed to login: ${error.message}`);
    },
    ...options,
  });
}

// Hook to send magic link
export function useMagicLink(
  options?: UseMutationOptions<MagicLinkResponse, AxiosError<MagicLinkResponse>, MagicLinkRequest>,
) {
  return useMutation({
    mutationFn: async (data: MagicLinkRequest) => {
      const response = await apiClient.post<MagicLinkResponse>("/api/auth/magic-link", {
        email: data.email,
      });
      return response.data;
    },
    onSuccess: () => {
      ToastLogger.success("auth", "Magic link sent to your email");
    },
    onError: (error: Error) => {
      ToastLogger.error("auth", `Failed to send magic link: ${error.message}`);
    },
    ...options,
  });
}

export function useForgotPassword(
  options?: UseMutationOptions<
    ForgotPasswordResponse,
    AxiosError<ForgotPasswordResponse>,
    ForgotPasswordRequest
  >,
) {
  return useMutation({
    mutationFn: async (data: ForgotPasswordRequest) => {
      const response = await apiClient.post<ForgotPasswordResponse>("/api/auth/forgot-password", {
        email: data.email,
      });
      return response.data;
    },
    onSuccess: () => {
      ToastLogger.success("auth", "Password reset email sent");
    },
    onError: (error: Error) => {
      ToastLogger.error("auth", `Failed to send reset email: ${error.message}`);
    },
    ...options,
  });
}

// Hook to verify email token
export function useVerifyEmail(
  options?: UseMutationOptions<
    VerifyEmailResponse,
    AxiosError<VerifyEmailResponse>,
    VerifyEmailRequest
  >,
) {
  return useMutation({
    mutationFn: async (data: VerifyEmailRequest) => {
      const response = await apiClient.post<VerifyEmailResponse>("/api/auth/verify", {
        token: data.token,
      });
      return response.data;
    },
    onSuccess: () => {
      ToastLogger.success("auth", "Email verified successfully");
    },
    onError: (error: Error) => {
      ToastLogger.error("auth", `Failed to verify email: ${error.message}`);
    },
    ...options,
  });
}

// OAuth: use full-page navigation to avoid CORS (backend returns 302 to provider)
const getOAuthUrl = (provider: OAuthProvider) => {
  const base = apiClient.defaults.baseURL ?? "";
  return `${base.replace(/\/$/, "")}/api/auth/oauth/${provider}`;
};

// Hook to continue with Google (full-page navigation to avoid CORS; backend redirects to Google)
export function useContinueWithGoogle(
  options?: UseMutationOptions<void, Error, void | { redirect_uri?: string; state?: string }>,
) {
  return useMutation({
    mutationFn: async () => {
      window.location.href = getOAuthUrl("google");
    },
    onError: (error: Error) => {
      ToastLogger.error("auth", `Failed to continue with Google: ${error.message}`);
    },
    ...options,
  });
}

// Hook to continue with Apple
export function useContinueWithApple(
  options?: UseMutationOptions<void, Error, void | { redirect_uri?: string; state?: string }>,
) {
  return useMutation({
    mutationFn: async () => {
      window.location.href = getOAuthUrl("apple");
    },
    onError: (error: Error) => {
      ToastLogger.error("auth", `Failed to continue with Apple: ${error.message}`);
    },
    ...options,
  });
}

// Hook to continue with GitHub
export function useContinueWithGitHub(
  options?: UseMutationOptions<void, Error, void | { redirect_uri?: string; state?: string }>,
) {
  return useMutation({
    mutationFn: async () => {
      window.location.href = getOAuthUrl("github");
    },
    onError: (error: Error) => {
      ToastLogger.error("auth", `Failed to continue with GitHub: ${error.message}`);
    },
    ...options,
  });
}
