export type SupportRole = "user" | "assistant" | "system";

export type SupportDecisionType = "answer" | "clarify" | "escalate" | "action";

export type SupportActionId = "link.auth" | "account.resend_verification" | "sales.request_demo";

export type SupportDecision =
  | { type: "answer"; message: string }
  | { type: "clarify"; message: string; questions?: string[] }
  | {
      type: "escalate";
      message: string;
      reason: string;
      priority: "low" | "normal" | "high";
      summary: string;
    }
  | {
      type: "action";
      message: string;
      actionId: SupportActionId;
      args: Record<string, unknown>;
      confirmRequired: boolean;
      label: string;
      description: string;
    };

export type SupportMessage = {
  id: string;
  role: SupportRole;
  content: string;
  createdAt: number;
  decision?: SupportDecision;
  resolved?: boolean;
  error?: boolean;
  clientMessageId?: string;
  sequence?: number;
};

export const SUGGESTED_PROMPTS = [
  "What does Qlarety analyze?",
  "How do upload, OCR, and paste differ?",
  "Is this legal advice?",
  "I need a demo for my legal team",
  "Something’s wrong with my account / login",
] as const;

export const WELCOME_MESSAGE =
  "Hi — I’m Qlarety’s support assistant. Ask about the product, demos, or account help. I can answer from what I know, connect you to a human, or walk you through a next step.";
