export interface SignUpRequest {
  username: string;
  email: string;
  password: string;
}

export interface SignUpResponse {
  success: boolean;
  message?: string;
  data?: {
    user_id: string;
    username: string;
    email: string;
    token?: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  data?: {
    user_id: string;
    email: string;
    token?: string;
  };
}

export interface MagicLinkRequest {
  email: string;
}

export interface MagicLinkResponse {
  success: boolean;
  message?: string;
  data?: {
    email: string;
    sent: boolean;
  };
}

export interface VerifyEmailRequest {
  token: string;
}

export interface VerifyEmailResponse {
  success: boolean;
  message?: string;
  data?: {
    email: string;
    verified: boolean;
  };
}

export interface SessionResponse {
  success: boolean;
  message?: string;
  user?: {
    id: string;
    username: string;
    email: string;
    email_verified?: boolean;
  };
}

export type OAuthProvider = "google" | "apple" | "github";

export interface OAuthRedirectRequest {
  provider: OAuthProvider;
  redirect_uri?: string;
  state?: string;
}

export interface OAuthRedirectResponse {
  success: boolean;
  message?: string;
  data?: {
    redirect_url: string;
    state?: string;
  };
}
