import { io, type Socket } from "socket.io-client";
import { API_BASE_URL, getGuestIdFromStorage } from "@/lib/axios";

const SUPPORT_CONVERSATION_KEY = "qlarety_support_conversation_id";

export function getSocketOrigin(): string {
  try {
    return new URL(API_BASE_URL).origin;
  } catch {
    return API_BASE_URL;
  }
}

export function getStoredSupportConversationId(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(SUPPORT_CONVERSATION_KEY);
}

export function setStoredSupportConversationId(id: string | null) {
  if (typeof window === "undefined") return;
  if (!id) {
    sessionStorage.removeItem(SUPPORT_CONVERSATION_KEY);
    return;
  }
  sessionStorage.setItem(SUPPORT_CONVERSATION_KEY, id);
}

export type SupportSocketAuth = {
  token?: string;
  sessionToken?: string;
  guestId?: string;
};

/**
 * Support chat socket — cookies via withCredentials; guestId required when anonymous.
 */
export function createSupportSocket(auth?: SupportSocketAuth): Socket {
  const guestId = auth?.guestId ?? getGuestIdFromStorage() ?? undefined;

  return io(getSocketOrigin(), {
    withCredentials: true,
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionAttempts: 8,
    auth: {
      ...(auth?.token ? { token: auth.token } : {}),
      ...(auth?.sessionToken ? { sessionToken: auth.sessionToken } : {}),
      ...(guestId ? { guestId } : {}),
    },
    query: guestId ? { guestId } : undefined,
  });
}
