import { cookies } from "next/headers";
import { API_BASE_URL } from "../axios";
import type { Document } from "@/types/document";

/**
 * Server-side fetch for a single document by id.
 * Forwards cookies so auth works when required.
 */
export async function getDocument(id: string): Promise<Document | null> {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const response = await fetch(`${API_BASE_URL}/api/document/by-job/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(cookieHeader ? { Cookie: cookieHeader } : {}),
      },
      credentials: "include",
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data as Document;
  } catch {
    return null;
  }
}
