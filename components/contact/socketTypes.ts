/** Wire types for support chat Socket.IO events (backend contract). */

export type SupportServerDecision =
  | "answer"
  | "clarify"
  | "escalate"
  | "action"
  | Record<string, unknown>
  | null
  | undefined;

export type SupportServerMessage = {
  id: string;
  role: "user" | "assistant" | "system" | string;
  content?: string;
  text?: string;
  decision?: SupportServerDecision;
  clientMessageId?: string | null;
  sequence?: number;
  createdAt: string | number;
  conversationId?: string;
};

export type SupportReadyPayload = {
  conversationId: string;
  status: string;
  created: boolean;
  messages: SupportServerMessage[];
};

export type SupportStartAck = SupportReadyPayload & {
  ok: boolean;
};

export type SupportMessageAck = {
  ok: boolean;
  duplicate?: boolean;
  userMessage: SupportServerMessage;
  agentMessage?: SupportServerMessage;
};

export type SupportAuthOk = {
  userId: string | null;
  guestId: string | null;
};

export type SupportAuthRequired = {
  message: string;
};

export type SupportErrorPayload = {
  conversationId?: string;
  code: string;
  message: string;
};

export type AgentThinkingPayload = {
  conversationId: string;
};

export type AgentMessagePayload = {
  conversationId: string;
  id: string;
  text: string;
  decision?: SupportServerDecision;
  role?: string;
  sequence?: number;
  createdAt: string | number;
};

export type SupportEndedPayload = {
  conversationId: string;
};

export const SUPPORT_EVENTS = {
  start: "support:start",
  message: "support:message",
  end: "support:end",
  authOk: "support:auth_ok",
  authRequired: "support:auth_required",
  ready: "support:ready",
  userMessage: "support:user_message",
  agentThinking: "agent:thinking",
  agentMessage: "agent:message",
  ended: "support:ended",
  error: "support:error",
} as const;
