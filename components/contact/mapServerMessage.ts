import type { SupportDecision, SupportMessage, SupportRole } from "./types";
import type { SupportServerDecision, SupportServerMessage } from "./socketTypes";

export function messageBody(msg: { content?: string; text?: string }): string {
  return (msg.content ?? msg.text ?? "").toString();
}

export function mapServerDecision(
  decision: SupportServerDecision,
  text: string,
): SupportDecision | undefined {
  if (decision == null) {
    return { type: "answer", message: text };
  }

  if (typeof decision === "string") {
    switch (decision) {
      case "clarify":
        return { type: "clarify", message: text };
      case "escalate":
        return {
          type: "escalate",
          message: text,
          reason: "agent_escalation",
          priority: "normal",
          summary: text.slice(0, 240),
        };
      case "action":
        return {
          type: "action",
          message: text,
          actionId: "link.auth",
          args: {},
          confirmRequired: true,
          label: "Continue",
          description: text,
        };
      case "answer":
      default:
        return { type: "answer", message: text };
    }
  }

  const type = String((decision as { type?: string }).type ?? "answer");
  if (type === "escalate") {
    return {
      type: "escalate",
      message: text,
      reason: String((decision as { reason?: string }).reason ?? "agent_escalation"),
      priority: ((decision as { priority?: string }).priority as "low" | "normal" | "high") ?? "normal",
      summary: String((decision as { summary?: string }).summary ?? text).slice(0, 240),
    };
  }
  if (type === "clarify") {
    return {
      type: "clarify",
      message: text,
      questions: Array.isArray((decision as { questions?: string[] }).questions)
        ? (decision as { questions: string[] }).questions
        : undefined,
    };
  }
  if (type === "action") {
    const d = decision as {
      actionId?: string;
      args?: Record<string, unknown>;
      confirmRequired?: boolean;
      label?: string;
      description?: string;
    };
    return {
      type: "action",
      message: text,
      actionId: (d.actionId as SupportDecision extends { type: "action"; actionId: infer A } ? A : never) || "link.auth",
      args: d.args ?? {},
      confirmRequired: d.confirmRequired ?? true,
      label: d.label ?? "Continue",
      description: d.description ?? text,
    };
  }

  return { type: "answer", message: text };
}

export function mapServerMessage(msg: SupportServerMessage): SupportMessage {
  const content = messageBody(msg);
  const role = (msg.role === "user" || msg.role === "assistant" || msg.role === "system"
    ? msg.role
    : "assistant") as SupportRole;
  const createdAt =
    typeof msg.createdAt === "number" ? msg.createdAt : new Date(msg.createdAt).getTime() || Date.now();

  const decision =
    role === "assistant" ? mapServerDecision(msg.decision, content) : undefined;

  return {
    id: msg.id,
    role,
    content,
    createdAt,
    decision,
    clientMessageId: msg.clientMessageId ?? undefined,
    sequence: msg.sequence,
    resolved:
      !decision || decision.type === "answer" || decision.type === "clarify"
        ? true
        : false,
  };
}
