"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import type { Socket } from "socket.io-client";
import { selectGuestId } from "@/redux/slices/auth/auth.slice";
import { selectUser } from "@/redux/slices/user/user.slice";
import {
  createSupportSocket,
  getStoredSupportConversationId,
  setStoredSupportConversationId,
} from "@/lib/supportSocket";
import { WELCOME_MESSAGE, type SupportMessage } from "./types";
import { mapServerDecision, mapServerMessage, messageBody } from "./mapServerMessage";
import {
  SUPPORT_EVENTS,
  type AgentMessagePayload,
  type AgentThinkingPayload,
  type SupportAuthRequired,
  type SupportEndedPayload,
  type SupportErrorPayload,
  type SupportMessageAck,
  type SupportReadyPayload,
  type SupportServerMessage,
  type SupportStartAck,
} from "./socketTypes";

function uid() {
  return crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

type ConnectionStatus = "connecting" | "online" | "auth_required" | "offline" | "ended";

const welcomeMessage = (): SupportMessage => ({
  id: "welcome",
  role: "system",
  content: WELCOME_MESSAGE,
  createdAt: Date.now(),
});

function upsertByIdOrClientId(list: SupportMessage[], incoming: SupportMessage): SupportMessage[] {
  const idx = list.findIndex(
    (m) =>
      m.id === incoming.id ||
      (incoming.clientMessageId && m.clientMessageId === incoming.clientMessageId) ||
      (incoming.clientMessageId && m.id === incoming.clientMessageId),
  );
  if (idx === -1) return [...list, incoming];
  const next = [...list];
  next[idx] = { ...next[idx], ...incoming };
  return next;
}

export function useSupportChat() {
  const user = useSelector(selectUser);
  const guestId = useSelector(selectGuestId);
  const socketRef = useRef<Socket | null>(null);
  const conversationIdRef = useRef<string | null>(getStoredSupportConversationId());
  const startedRef = useRef(false);

  const [messages, setMessages] = useState<SupportMessage[]>([welcomeMessage()]);
  const [isTyping, setIsTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<ConnectionStatus>("connecting");
  const [conversationId, setConversationId] = useState<string | null>(
    getStoredSupportConversationId(),
  );
  const [errorBanner, setErrorBanner] = useState<string | null>(null);

  const applyReady = useCallback((payload: SupportReadyPayload) => {
    conversationIdRef.current = payload.conversationId;
    setConversationId(payload.conversationId);
    setStoredSupportConversationId(payload.conversationId);
    setStatus(payload.status === "closed" || payload.status === "ended" ? "ended" : "online");
    setErrorBanner(null);

    const mapped = (payload.messages ?? []).map(mapServerMessage);
    setMessages(mapped.length > 0 ? [welcomeMessage(), ...mapped] : [welcomeMessage()]);
  }, []);

  const startConversation = useCallback(
    (socket: Socket) => {
      if (startedRef.current) return;
      startedRef.current = true;

      const payload = conversationIdRef.current
        ? { conversationId: conversationIdRef.current }
        : {};

      socket
        .timeout(15000)
        .emit(SUPPORT_EVENTS.start, payload, (err: Error | null, ack?: SupportStartAck) => {
          if (err) {
            startedRef.current = false;
            setErrorBanner("Could not start support chat. Retrying…");
            setStatus("connecting");
            return;
          }
          if (!ack?.ok) {
            startedRef.current = false;
            setErrorBanner("Support chat failed to start.");
            return;
          }
          applyReady(ack);
        });
    },
    [applyReady],
  );

  useEffect(() => {
    // Wait until we have either a logged-in user or a guest id
    if (!user && !guestId) return;

    const socket = createSupportSocket({
      guestId: user ? undefined : guestId || undefined,
    });
    socketRef.current = socket;
    startedRef.current = false;

    const onAuthOk = () => {
      startConversation(socket);
    };

    const onAuthRequired = (payload: SupportAuthRequired) => {
      setStatus("auth_required");
      setErrorBanner(payload.message || "Authentication required for support chat.");
    };

    const onReady = (payload: SupportReadyPayload) => {
      applyReady(payload);
    };

    const onUserMessage = (msg: SupportServerMessage) => {
      if (msg.conversationId && msg.conversationId !== conversationIdRef.current) return;
      setMessages((prev) => upsertByIdOrClientId(prev, mapServerMessage(msg)));
    };

    const onThinking = (payload: AgentThinkingPayload) => {
      if (payload.conversationId !== conversationIdRef.current) return;
      setIsTyping(true);
    };

    const onAgentMessage = (payload: AgentMessagePayload) => {
      if (payload.conversationId !== conversationIdRef.current) return;
      setIsTyping(false);
      setIsSending(false);
      const text = payload.text ?? "";
      const decision = mapServerDecision(payload.decision, text);
      setMessages((prev) =>
        upsertByIdOrClientId(prev, {
          id: payload.id,
          role: "assistant",
          content: text,
          createdAt:
            typeof payload.createdAt === "number"
              ? payload.createdAt
              : new Date(payload.createdAt).getTime() || Date.now(),
          decision,
          sequence: payload.sequence,
          resolved: !decision || decision.type === "answer" || decision.type === "clarify",
        }),
      );
    };

    const onEnded = (payload: SupportEndedPayload) => {
      if (payload.conversationId !== conversationIdRef.current) return;
      setStatus("ended");
      setIsTyping(false);
      setIsSending(false);
    };

    const onError = (payload: SupportErrorPayload) => {
      setIsTyping(false);
      setIsSending(false);
      if (payload.code === "RATE_LIMITED") {
        setErrorBanner(payload.message || "Too many messages — please wait a moment.");
      } else if (payload.code === "UNAUTHORIZED") {
        setStatus("auth_required");
        setErrorBanner(payload.message || "Please sign in or refresh to continue.");
      } else if (payload.code === "CONVERSATION_CLOSED") {
        setStatus("ended");
        setErrorBanner("This conversation was closed. Start a new one below.");
      } else {
        setErrorBanner(payload.message || "Something went wrong.");
      }
    };

    const onDisconnect = () => {
      setStatus((s) => (s === "ended" || s === "auth_required" ? s : "offline"));
      setIsTyping(false);
      startedRef.current = false;
    };

    const onConnect = () => {
      // Auth events drive start; if already authed some servers emit auth_ok after connect
      setStatus((s) => (s === "ended" ? s : "connecting"));
    };

    socket.on("connect", onConnect);
    socket.on(SUPPORT_EVENTS.authOk, onAuthOk);
    socket.on(SUPPORT_EVENTS.authRequired, onAuthRequired);
    socket.on(SUPPORT_EVENTS.ready, onReady);
    socket.on(SUPPORT_EVENTS.userMessage, onUserMessage);
    socket.on(SUPPORT_EVENTS.agentThinking, onThinking);
    socket.on(SUPPORT_EVENTS.agentMessage, onAgentMessage);
    socket.on(SUPPORT_EVENTS.ended, onEnded);
    socket.on(SUPPORT_EVENTS.error, onError);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off(SUPPORT_EVENTS.authOk, onAuthOk);
      socket.off(SUPPORT_EVENTS.authRequired, onAuthRequired);
      socket.off(SUPPORT_EVENTS.ready, onReady);
      socket.off(SUPPORT_EVENTS.userMessage, onUserMessage);
      socket.off(SUPPORT_EVENTS.agentThinking, onThinking);
      socket.off(SUPPORT_EVENTS.agentMessage, onAgentMessage);
      socket.off(SUPPORT_EVENTS.ended, onEnded);
      socket.off(SUPPORT_EVENTS.error, onError);
      socket.off("disconnect", onDisconnect);
      socket.disconnect();
      socketRef.current = null;
      startedRef.current = false;
    };
  }, [user, guestId, applyReady, startConversation]);

  const sendMessage = useCallback(async (text: string) => {
    const socket = socketRef.current;
    const convId = conversationIdRef.current;
    const trimmed = text.trim();
    if (!socket || !convId || !trimmed) return;

    const clientMessageId = uid();
    const optimistic: SupportMessage = {
      id: clientMessageId,
      role: "user",
      content: trimmed,
      createdAt: Date.now(),
      clientMessageId,
    };

    setMessages((prev) => [...prev, optimistic]);
    setIsSending(true);
    setIsTyping(true);
    setErrorBanner(null);

    socket
      .timeout(60000)
      .emit(
        SUPPORT_EVENTS.message,
        { conversationId: convId, text: trimmed, clientMessageId },
        (err: Error | null, ack?: SupportMessageAck) => {
          if (err) {
            setIsSending(false);
            setIsTyping(false);
            setMessages((prev) =>
              prev.map((m) =>
                m.clientMessageId === clientMessageId
                  ? { ...m, error: true, content: trimmed }
                  : m,
              ),
            );
            setErrorBanner("Message failed to send. Tap retry on the message.");
            return;
          }

          if (!ack?.ok) {
            setIsSending(false);
            setIsTyping(false);
            setErrorBanner("Message was rejected.");
            return;
          }

          if (ack.userMessage) {
            setMessages((prev) => upsertByIdOrClientId(prev, mapServerMessage(ack.userMessage)));
          }

          // Some servers return agent in ack; others emit agent:message separately
          if (ack.agentMessage) {
            setIsTyping(false);
            setIsSending(false);
            const mapped = mapServerMessage({
              ...ack.agentMessage,
              content: messageBody(ack.agentMessage),
            });
            setMessages((prev) => upsertByIdOrClientId(prev, mapped));
          }
          // else wait for agent:thinking / agent:message
          setIsSending(false);
        },
      );
  }, []);

  const retryLastFailed = useCallback(
    (failed: SupportMessage) => {
      setMessages((prev) => prev.filter((m) => m.id !== failed.id));
      void sendMessage(failed.content);
    },
    [sendMessage],
  );

  const startNewConversation = useCallback(() => {
    const socket = socketRef.current;
    setStoredSupportConversationId(null);
    conversationIdRef.current = null;
    setConversationId(null);
    setMessages([welcomeMessage()]);
    setErrorBanner(null);
    setStatus("connecting");
    startedRef.current = false;
    if (socket?.connected) {
      startConversation(socket);
    }
  }, [startConversation]);

  const endConversation = useCallback(() => {
    const socket = socketRef.current;
    const convId = conversationIdRef.current;
    if (socket && convId) {
      socket.emit(SUPPORT_EVENTS.end, { conversationId: convId });
    }
    setStatus("ended");
  }, []);

  const markResolved = useCallback((messageId: string, followUp: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === messageId ? { ...m, resolved: true } : m)).concat({
        id: uid(),
        role: "assistant",
        content: followUp,
        createdAt: Date.now(),
        resolved: true,
      }),
    );
  }, []);

  const online = status === "online";
  const canSend = online && !isSending && !!conversationId;

  return {
    messages,
    isTyping,
    isSending,
    status,
    conversationId,
    errorBanner,
    canSend,
    online,
    sendMessage,
    retryLastFailed,
    startNewConversation,
    endConversation,
    markResolved,
    setErrorBanner,
  };
}
