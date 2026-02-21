import axios from "axios";
import { store } from "@/redux/store";
import { selectUser } from "@/redux/slices/user/user.slice";
import type { User } from "@/types/user";
import { isProduction } from "./utils";

// Configure axios instance with base URL
export const API_BASE_URL = isProduction ? "https://server.qlarety.com/" : "http://localhost:8000";

export const apiClient = axios.create({
  withCredentials: true,
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

/** Get current user from Redux (null if not logged in or not in storage). */
export function getUserFromRedux(): User | null {
  try {
    return selectUser(store.getState());
  } catch {
    return null;
  }
}

function getGuestIdFromStorage(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("persist:root");
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { auth?: string };
    if (!parsed.auth) return null;
    const auth = JSON.parse(parsed.auth) as { guestId?: string | null };
    return auth.guestId ?? null;
  } catch {
    return null;
  }
}

apiClient.interceptors.request.use(
  (config) => {
    const user = getUserFromRedux();
    if (!user) {
      const guestId = getGuestIdFromStorage();
      if (guestId) {
        config.headers.set("x-guest-id", guestId);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor - redirect to /auth on 401 only when user exists in Redux (session expired)
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined" && getUserFromRedux()) {
      window.location.href = "/auth";
    }
    return Promise.reject(error);
  },
);

export default apiClient;

// // Helper to get CSRF token from cookie
// const getCSRFToken = (): string | null => {
//   const cookies = document.cookie.split(";");
//   for (const cookie of cookies) {
//     const [name, value] = cookie.trim().split("=");
//     if (name === "csrf_token") {
//       return decodeURIComponent(value);
//     }
//   }
//   return null;
// };

// export const apiAxios = (service: "v1" | "base" = "v1") => {
//   const axiosInstance = axios.create({
//     baseURL: service == "v1" ? API_BASE_URL_V1 : API_BASE_URL,
//     timeout: 300000, // Increased from 10s to 300s (5 minutes) for complex document processing
//     withCredentials: true, // Include cookies for session management
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   axiosInstance.interceptors.request.use(
//     (config) => {
//       // Add X-Agency-ID header from user's organization_id
//       const state = store.getState();
//       const user = state.user.user;

//       if (user?.organization_id) {
//         config.headers["X-Agency-ID"] = user.organization_id;
//       } else {
//         // Suppress warning for endpoints that don't require organization_id
//         const url = config.url || "";
//         const endpointsWithoutOrg = [
//           "/auth/me",
//           "/auth/create-agency",
//           "/auth/login",
//           "/auth/register",
//           "/auth/logout",
//           "/auth/forgot-password",
//           "/auth/reset-password",
//           "/auth/set-password",
//           "/auth/magic-link",
//           "/auth/check-email",
//           "/auth/accept-invite",
//           "/auth/oauth/callback",
//           "/diagnostics/permissions", // Can be called before user is fully loaded in Redux during login
//         ];

//         const shouldSuppressWarning = endpointsWithoutOrg.some((endpoint) =>
//           url.includes(endpoint)
//         );

//         // Only log warning if this endpoint typically requires organization_id
//         if (!shouldSuppressWarning && process.env.NODE_ENV === "development") {
//           console.warn(
//             `[Axios Interceptor] No X-Agency-ID header (user.organization_id is missing) for ${config.method?.toUpperCase()} ${
//               config.url
//             }`,
//             {
//               hasUser: !!user,
//               userId: user?.id,
//               email: user?.email,
//               organization_id: user?.organization_id,
//             }
//           );
//         }
//       }

//       // Add CSRF token for unsafe methods (POST, PUT, PATCH, DELETE)
//       const unsafeMethods = ["POST", "PUT", "PATCH", "DELETE"];
//       if (unsafeMethods.includes(config.method?.toUpperCase() || "")) {
//         const csrfToken = getCSRFToken();
//         if (csrfToken) {
//           config.headers["X-CSRF-Token"] = csrfToken;
//         }
//       }

//       // Add JWT Bearer token if available and valid (for Keycloak/OAuth flows)
//       // Only add JWT token if we don't already have an Authorization header
//       // This allows session cookies to be used as fallback if JWT is not available or expired
//       if (!config.headers["Authorization"]) {
//         const jwtToken = keycloakAuth.getAccessToken();
//         const currentPath = window.location.pathname || "";
//         const isOAuthCallback = currentPath.includes("/oauth/callback");
//         const isAuthMeRequest = config.url?.includes("/auth/me");

//         // During OAuth callback, don't check expiration - token was just received
//         // The backend will validate it, and we don't want to clear it prematurely
//         if (jwtToken) {
//           if (isOAuthCallback && isAuthMeRequest) {
//             // OAuth callback flow - always use the token (it was just received)
//             config.headers["Authorization"] = `Bearer ${jwtToken}`;
//             if (process.env.NODE_ENV === "development") {
//               console.log(
//                 "[Axios Interceptor] Using JWT token during OAuth callback (skipping expiration check)"
//               );
//             }
//           } else if (!keycloakAuth.isTokenExpired()) {
//             // Token is valid - use it
//             config.headers["Authorization"] = `Bearer ${jwtToken}`;
//           } else {
//             // Token expired, but don't clear it during OAuth flow
//             // Only clear if we're not in the middle of OAuth callback
//             if (!isOAuthCallback) {
//               if (process.env.NODE_ENV === "development") {
//                 console.warn(
//                   "[Axios Interceptor] Token expired, clearing tokens"
//                 );
//               }
//               keycloakAuth.clearTokens();
//             } else {
//               // During OAuth callback, still try to use the token
//               // The backend will handle validation
//               config.headers["Authorization"] = `Bearer ${jwtToken}`;
//               if (process.env.NODE_ENV === "development") {
//                 console.warn(
//                   "[Axios Interceptor] Token marked as expired during OAuth callback, but using it anyway (backend will validate)"
//                 );
//               }
//             }
//           }
//         }
//         // If no JWT token, session cookies will be used (via withCredentials: true)
//       }

//       // Authentication is handled via session cookies or JWT tokens
//       // Session cookies are sent automatically via withCredentials: true

//       // SECURITY FIX: Removed automatic X-Skip-Auth injection for ledger endpoints
//       // Development testing should manually add X-Skip-Auth header when needed
//       // This prevents accidental authentication bypass in production

//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );

//   axiosInstance.interceptors.response.use(
//     (response) => {
//       return response;
//     },
//     async (error) => {
//       const originalRequest = error.config;

//       if (error.response?.status === 401 && !originalRequest._retry) {
//         const currentPath = window.location.pathname;
//         const requestUrl = String(originalRequest?.url || "");

//         // Don't handle 401 errors on auth pages or diagnostic pages
//         // These are expected when user is not logged in yet
//         // CRITICAL: Don't clear tokens for /auth/me requests during OAuth callback
//         // Tokens were just stored and the 401 might be due to backend sync delay
//         const isOAuthCallback = currentPath.includes("/oauth/callback");
//         const isAuthMeRequest = requestUrl.includes("/auth/me");

//         if (
//           currentPath.startsWith("/auth/") ||
//           currentPath.startsWith("/diagnostics/") ||
//           (isOAuthCallback && isAuthMeRequest)
//         ) {
//           // Don't clear tokens or redirect - just reject the error
//           // The OAuth callback will handle the error gracefully
//           if (isOAuthCallback && isAuthMeRequest) {
//             console.warn(
//               "⚠️ /auth/me failed during OAuth callback - not clearing tokens (backend might still be syncing)"
//             );
//           }
//           return Promise.reject(error);
//         }

//         originalRequest._retry = true;

//         // If the 401 came from the refresh endpoint itself, don't attempt refresh again
//         const requestUrlStr = String(originalRequest?.url || "");
//         const isRefreshCall = requestUrlStr.includes("/auth/keycloak/refresh");

//         if (isRefreshCall) {
//           store.dispatch(clearUser());
//           keycloakAuth.clearTokens();
//           if (!currentPath.startsWith("/auth/")) {
//             window.location.href = "/auth/login";
//           }
//           return Promise.reject(error);
//         }

//         // Try to refresh token if we have Keycloak auth
//         try {
//           const refreshToken = keycloakAuth.getRefreshToken();
//           if (refreshToken) {
//             await keycloakAuth.refreshAccessToken();

//             // Retry the original request with new token
//             const newToken = keycloakAuth.getAccessToken();
//             if (newToken) {
//               originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
//               return axiosInstance(originalRequest);
//             }
//           }
//         } catch (refreshError) {
//           console.error("Token refresh failed:", refreshError);
//         }

//         // If refresh failed or no refresh token, clear user and redirect
//         store.dispatch(clearUser());
//         keycloakAuth.clearTokens();

//         // Redirect to login unless already there
//         if (!currentPath.startsWith("/auth/")) {
//           // Note: This is in an axios interceptor, so we can't use useNavigate hook
//           // For now, keep window.location but this could be improved with a global navigation service
//           window.location.href = "/auth/login";
//         }
//       }

//       const status = error.response?.status;
//       const currentPath = window.location.pathname;
//       const requestUrl = error.config?.url || "";

//       // Handle 403 permission denied errors with toast notification
//       if (status === 403) {
//         const errorMessage =
//           error.response?.data?.message ||
//           error.response?.data?.error ||
//           "You don't have permission to perform this action";
//         const { toast } = await import("sonner");
//         toast.error("Permission Denied", {
//           description: errorMessage,
//           duration: 5000,
//         });
//       }

//       const shouldSkipDiagnostics = // Skip diagnostic redirect for expected errors
//         currentPath.startsWith("/auth/") || // Already on auth pages
//         currentPath.startsWith("/diagnostics/") || // Already on diagnostic page
//         requestUrl.includes("/auth/") || // Auth-related requests
//         requestUrl.includes("/runtime-config") || // Runtime config requests
//         status === 401 || // Handled above
//         status === 403 || // Permission errors (expected)
//         status === 404; // Not found (expected)

//       if (status >= 500 && !shouldSkipDiagnostics) {
//         // Server errors should trigger diagnostics
//         console.error(
//           "Server error detected, redirecting to diagnostics:",
//           error.response?.data?.message || error.message
//         );

//         // Store full error object in sessionStorage
//         const errorId = `${Date.now()}_${Math.random()
//           .toString(36)
//           .substr(2, 9)}`;
//         const state = store.getState();
//         const user = state.user.user;

//         const errorTrace = {
//           status: status || 0,
//           statusText: error.response?.statusText || "Unknown Error",
//           message:
//             error.response?.data?.message || error.message || "Unknown error",
//           url: requestUrl || error.config?.url || "",
//           method: error.config?.method?.toUpperCase() || "UNKNOWN",
//           timestamp: new Date().toISOString(),
//           requestHeaders: error.config?.headers || {},
//           requestBody: error.config?.data || null,
//           responseHeaders: error.response?.headers || {},
//           responseBody: error.response?.data || null,
//           stack: error.stack || null,
//           userAgent: navigator.userAgent,
//           currentPath: window.location.pathname,
//           organization: user?.organization_id || null,
//         };

//         // Store with error_ prefix (DiagnosticError page looks for error_${errorId})
//         sessionStorage.setItem(`error_${errorId}`, JSON.stringify(errorTrace));

//         // Redirect with error ID
//         window.location.href = `/diagnostics/error?id=${errorId}`;
//       } else if (status >= 400 && !shouldSkipDiagnostics) {
//         console.error(
//           "Client error:",
//           error.response?.data?.message || error.message
//         );
//       } else if (!status && !shouldSkipDiagnostics) {
//         console.error("Network error:", error.message);
//       } else if (status >= 500) {
//         console.error(
//           "Server error:",
//           error.response?.data?.message || error.message
//         );
//       }

//       return Promise.reject(error);
//     }
//   );

//   return axiosInstance;
// };

// export default apiAxios;
