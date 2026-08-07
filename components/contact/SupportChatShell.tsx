"use client";

import { useEffect, useRef } from "react";
import { SupportChatComposer } from "./SupportChatComposer";
import { SupportChatMessage, SupportTypingIndicator } from "./SupportChatMessage";
import { SupportSuggestedPrompts } from "./SupportSuggestedPrompts";
import { SupportEscalationCard } from "./SupportEscalationCard";
import { SupportActionConfirmCard } from "./SupportActionConfirmCard";
import { SupportAgentStatus } from "./SupportAgentStatus";
import { Button } from "@/components/ui/button";
import { SUGGESTED_PROMPTS } from "./types";
import { useSupportChat } from "./useSupportChat";

function statusLabel(status: string) {
  switch (status) {
    case "online":
      return "Online · live agent";
    case "connecting":
      return "Connecting…";
    case "auth_required":
      return "Auth required";
    case "ended":
      return "Conversation ended";
    case "offline":
      return "Reconnecting…";
    default:
      return status;
  }
}

export function SupportChatShell() {
  const {
    messages,
    isTyping,
    status,
    errorBanner,
    canSend,
    sendMessage,
    retryLastFailed,
    startNewConversation,
    markResolved,
    setErrorBanner,
  } = useSupportChat();

  const bottomRef = useRef<HTMLDivElement>(null);
  const userCount = messages.filter((m) => m.role === "user").length;
  const showPrompts = userCount === 0 && !isTyping && status === "online";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    void sendMessage(text);
  };

  return (
    <div className="relative flex h-[min(72vh,680px)] min-h-[440px] w-full flex-col overflow-hidden rounded-[1.75rem] border border-[#1e2939]/10 bg-white/70 shadow-[0_24px_80px_rgba(17,22,31,0.1)] backdrop-blur-xl dark:border-white/10 dark:bg-[#0e131c]/75">
      <div className="relative flex items-center justify-between gap-3 border-b border-[#1e2939]/8 px-4 py-3 sm:px-5 dark:border-white/10">
        <div className="min-w-0">
          <p className="truncate font-lora text-base font-medium text-[#11161f] dark:text-white sm:text-lg">
            Support assistant
          </p>
          <p className="truncate text-[11px] text-gray-500">{statusLabel(status)}</p>
        </div>
        {status === "online" ? (
          <SupportAgentStatus />
        ) : (
          <span className="rounded-full border border-[#1e2939]/10 px-3 py-1.5 text-[11px] font-medium text-gray-500 dark:border-white/10">
            {statusLabel(status)}
          </span>
        )}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary-green/40 to-transparent"
        />
      </div>

      {errorBanner && (
        <div className="flex items-start justify-between gap-3 border-b border-amber-200/80 bg-amber-50 px-4 py-2.5 text-xs text-amber-900 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-100">
          <p>{errorBanner}</p>
          <button
            type="button"
            className="shrink-0 font-semibold underline"
            onClick={() => setErrorBanner(null)}
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="relative flex-1 overflow-y-auto px-3 py-4 sm:px-5">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(71,225,140,0.2) 1px, transparent 0)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="relative mx-auto max-w-2xl space-y-4">
          {messages.map((message) => (
            <SupportChatMessage
              key={message.id}
              message={message}
              onRetry={message.error ? () => retryLastFailed(message) : undefined}
            >
              {message.decision?.type === "escalate" && !message.resolved && (
                <SupportEscalationCard
                  reason={message.decision.reason}
                  summary={message.decision.summary}
                  disabled={isTyping}
                  onSubmitted={() =>
                    markResolved(
                      message.id,
                      "Thanks — I’ve flagged this for a human. You’ll hear from us at the email you provided.",
                    )
                  }
                />
              )}
              {message.decision?.type === "action" && !message.resolved && (
                <SupportActionConfirmCard
                  actionId={message.decision.actionId}
                  label={message.decision.label}
                  description={message.decision.description}
                  disabled={isTyping}
                  onResolved={(confirmed) =>
                    markResolved(
                      message.id,
                      confirmed
                        ? `Confirmed “${message.decision && message.decision.type === "action" ? message.decision.label : "action"}”.`
                        : "No problem — cancelled. Ask anything else whenever you’re ready.",
                    )
                  }
                />
              )}
              {message.decision?.type === "clarify" && message.decision.questions && !isTyping && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {message.decision.questions.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => handleSend(q)}
                      disabled={!canSend}
                      className="rounded-full border border-[#1e2939]/10 bg-white px-3 py-1.5 text-[11px] font-medium text-[#11161f] hover:border-primary-green/40 hover:bg-primary-green/10 disabled:opacity-50 dark:border-white/10 dark:bg-[#161c27] dark:text-white"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </SupportChatMessage>
          ))}
          {isTyping && <SupportTypingIndicator />}
          <div ref={bottomRef} />
        </div>
      </div>

      <div className="relative space-y-3 border-t border-[#1e2939]/8 bg-gradient-to-t from-white via-white/95 to-white/70 px-3 py-3 sm:px-5 sm:py-4 dark:border-white/10 dark:from-[#0e131c] dark:via-[#0e131c]/95 dark:to-[#0e131c]/70">
        <div className="mx-auto w-full max-w-2xl space-y-3">
          {(status === "ended" || status === "auth_required") && (
            <div className="flex justify-center">
              <Button
                type="button"
                variant="primary-green"
                size="sm"
                onClick={startNewConversation}
              >
                {status === "ended" ? "Start a new conversation" : "Retry connection"}
              </Button>
            </div>
          )}
          {showPrompts && (
            <SupportSuggestedPrompts
              prompts={SUGGESTED_PROMPTS}
              onSelect={handleSend}
              disabled={!canSend}
            />
          )}
          <SupportChatComposer
            disabled={!canSend || isTyping}
            onSend={handleSend}
          />
          <p className="text-center text-[10px] text-gray-400">
            Prefer email?{" "}
            <a
              href="mailto:contact@qlarety.com"
              className="font-medium text-[#11161f] underline decoration-primary-green/40 underline-offset-2 dark:text-white"
            >
              contact@qlarety.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
