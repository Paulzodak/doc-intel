import { ToastLogger } from "@/utils/toastUtils";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { apiClient } from "@/lib/axios";
import type {
  SignUpRequest,
  SignUpResponse,
  LoginRequest,
  LoginResponse,
  MagicLinkRequest,
  MagicLinkResponse,
  VerifyEmailRequest,
  VerifyEmailResponse,
  OAuthProvider,
} from "@/types/auth";
import { AxiosError } from "axios";

// Query keys factory
export const authKeys = {
  all: ["auth"] as const,
  signUp: () => [...authKeys.all, "signup"] as const,
  login: () => [...authKeys.all, "login"] as const,
  magicLink: () => [...authKeys.all, "magic-link"] as const,
  verifyEmail: () => [...authKeys.all, "verify-email"] as const,
  oauth: (provider: OAuthProvider) => [...authKeys.all, "oauth", provider] as const,
};

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
  options?: UseMutationOptions<
    MagicLinkResponse,
    AxiosError<MagicLinkResponse>,
    MagicLinkRequest
  >,
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
