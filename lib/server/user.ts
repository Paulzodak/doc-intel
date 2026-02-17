import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { GetUserResponse, User } from "@/types/user";
import { isProduction } from "@/lib/utils";
import { API_BASE_URL } from "../axios";

/**
 * Server-side function to get the current user
 * Redirects to login if 401 (unauthorized)
 * @returns User data or null
 */
export async function getServerUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();

    // Build cookie header string
    const cookieHeader = allCookies.map((cookie) => `${cookie.name}=${cookie.value}`).join("; ");

    console.log(cookieHeader, "cookieHeader");
    const response = await fetch(`${API_BASE_URL}/api/auth/session`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      credentials: "include",
      cache: "no-store", // Always fetch fresh data
    });
    console.log(response, "response");
    // Handle 401 Unauthorized - redirect to login
    if (response.status === 401) {
      redirect("/auth");
      return null;
    }

    // Handle other errors
    if (!response.ok) {
      console.error("Failed to fetch user:", response.status, response.statusText);
      return null;
    }

    const data: GetUserResponse = await response.json();

    if (data.success && data.data) {
      return data.data;
    }

    return null;
  } catch (error) {
    console.error("Error fetching user:", error);
    // On error, redirect to login for safety
    redirect("/auth");
  }
}
