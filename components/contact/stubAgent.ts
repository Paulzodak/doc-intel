import type { SupportDecision } from "./types";

function includesAny(text: string, terms: string[]) {
  const lower = text.toLowerCase();
  return terms.some((t) => lower.includes(t));
}

/** Stage 0 keyword stub — replace with real agent in Stage 1+. */
export async function stubSupportAgent(userText: string): Promise<SupportDecision> {
  await new Promise((r) => setTimeout(r, 700 + Math.random() * 900));

  if (
    includesAny(userText, [
      "human",
      "speak to someone",
      "real person",
      "customer support",
      "talk to a person",
      "agent please",
    ])
  ) {
    return {
      type: "escalate",
      message:
        "I can bring in a teammate. Share how we can reach you and a short summary — they’ll get this chat context.",
      reason: "user_requested_human",
      priority: "normal",
      summary: userText.slice(0, 240),
    };
  }

  if (includesAny(userText, ["resend", "magic link", "verification email", "verify email"])) {
    return {
      type: "action",
      message:
        "I can help with login email issues. Confirm and I’ll show the next step (Stage 0 stub — no email is sent yet).",
      actionId: "account.resend_verification",
      args: {},
      confirmRequired: true,
      label: "Resend verification / magic link",
      description: "We’ll guide you to the magic-link flow. No email is sent in this UI preview.",
    };
  }

  if (includesAny(userText, ["demo", "legal team", "partnership", "enterprise"])) {
    return {
      type: "action",
      message:
        "Happy to set up a demo conversation. Confirm and we’ll capture a lead stub for the team.",
      actionId: "sales.request_demo",
      args: { topic: userText.slice(0, 120) },
      confirmRequired: true,
      label: "Request a demo",
      description: "Notify the Qlarety team that you’d like a walkthrough for your legal team.",
    };
  }

  if (includesAny(userText, ["legal advice", "is this legal"])) {
    return {
      type: "answer",
      message:
        "Qlarety is not a law firm and does not provide legal advice. Analysis, grades, and highlights are decision-support tools — always verify critical findings against the source document and consult qualified counsel when needed.",
    };
  }

  if (includesAny(userText, ["upload", "ocr", "paste", "scan", "docx", "pdf"])) {
    return {
      type: "answer",
      message:
        "Three ways in:\n\n• Upload — drop PDF or DOCX files for analysis.\n• Scan / OCR — capture or upload images of pages and extract text.\n• Paste — drop plain text when you already have the content.\n\nThen pick an engine and language before you run analysis.",
    };
  }

  if (includesAny(userText, ["analyze", "qlarety", "what does", "product", "risk", "compliance"])) {
    return {
      type: "answer",
      message:
        "Qlarety is AI-powered legal document intelligence. It reviews contracts and agreements for risk and compliance signals, surfaces key clauses, and helps teams move from document to decision faster — via upload, OCR, or paste.",
    };
  }

  if (includesAny(userText, ["login", "account", "password", "sign in", "wrong"])) {
    return {
      type: "clarify",
      message:
        "I can help with account access. Are you stuck on Google/GitHub/Microsoft sign-in, magic link email, or something else?",
      questions: [
        "Magic link / email not arriving",
        "OAuth sign-in error",
        "Speak to a human instead",
      ],
    };
  }

  return {
    type: "answer",
    message: `Thanks for reaching out. Here’s a Stage 0 preview reply based on: “${userText.slice(0, 140)}${userText.length > 140 ? "…" : ""}”.\n\nTry asking about analysis, upload vs OCR vs paste, legal advice, a demo, magic links, or say “speak to a human” to see escalation.`,
  };
}
