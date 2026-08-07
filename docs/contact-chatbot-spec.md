# Qlarety — Contact Support Chatbot Plan

**Version:** 1.0  
**Date:** August 7, 2026  
**Status:** Draft  
**Replaces:** Static `/contact-us` form (kept as fallback / escalation channel)  
**Related:** [Product Specification](./product-spec.md), [Admin Console Spec](./admin-console-spec.md)

---

## 1. Goal

Convert `/contact-us` from a one-shot contact form into a **full-page autonomous support agent** that:

1. Answers product questions from grounded Qlarety context (features, pricing posture, docs, policies).
2. Decides when to **answer**, **clarify**, **escalate to human support**, or **run an allowed action**.
3. Feels on-brand with the rest of the marketing site (LandingNav, green/dark system, Lora / Brockmann).

This document splits delivery into **stages**. **Stage 0 (UI)** ships first with mocked or stubbed agent behavior so design and UX can be validated before backend autonomy.

---

## 2. Product principles

| Principle                   | Meaning                                                                               |
| --------------------------- | ------------------------------------------------------------------------------------- |
| **Grounded answers**        | Prefer retrieval from approved product knowledge; refuse or escalate when unsure.     |
| **Explicit decisions**      | Every turn ends with a clear intent: `answer` \| `clarify` \| `escalate` \| `action`. |
| **Human handoff**           | Escalation captures context + transcript; never dead-ends the user.                   |
| **Least privilege actions** | Actions are allowlisted, confirmed when sensitive, audited.                           |
| **No legal advice**         | Same product rule as Terms: Qlarety assists; the agent must not give legal advice.    |

---

## 3. Stage roadmap (summary)

| Stage | Name                         | Outcome                                                                    | Depends on |
| ----- | ---------------------------- | -------------------------------------------------------------------------- | ---------- |
| **0** | **UI / UX shell**            | Chat-first contact page, polished empty/loading/error states, stub replies | —          |
| **1** | Conversation API + streaming | Real SSE/WebSocket (or fetch stream) chat session; persist transcript      | Stage 0    |
| **2** | Product knowledge grounding  | RAG / curated KB from product, FAQ, Privacy, Terms, use cases              | Stage 1    |
| **3** | Decision router              | Classifier: answer vs clarify vs escalate vs action                        | Stages 1–2 |
| **4** | Human escalation             | Ticket / email / admin inbox with transcript + contact details             | Stage 3    |
| **5** | Tooling / actions            | Allowlisted tools (e.g. resend magic link, open doc help deep-link)        | Stage 3    |
| **6** | Autonomy hardening           | Eval set, guardrails, rate limits, analytics, admin visibility             | Stages 2–5 |

Suggested ship order: **0 → 1 → 2 → 3 → 4**, then **5** and **6** in parallel where possible.

---

## 4. Stage 0 — UI design (first)

### 4.1 Objective

Replace the form-centric layout with a **chat workspace** that can later plug into a real agent without redesign.

Keep secondary “reach us” channels (email / phone / location) as a quiet fallback, not the hero.

### 4.2 Layout (desktop)

```
┌─────────────────────────────────────────────────────────────┐
│ LandingNav                                                  │
├──────────────────────────────┬──────────────────────────────┤
│                              │                              │
│  Brand / intro               │  Sticky visual / status      │
│  - Qlarety mark              │  (reuse ContactUsImageColumn │
│  - “Talk with Qlarety”       │   or replace with live       │
│  - Short value line          │   “agent online” panel)      │
│                              │                              │
│  ┌────────────────────────┐  │                              │
│  │ Chat transcript        │  │                              │
│  │  - system welcome      │  │                              │
│  │  - user / assistant    │  │                              │
│  │  - tool / escalate UI  │  │                              │
│  │                        │  │                              │
│  │ [composer + send]      │  │                              │
│  └────────────────────────┘  │                              │
│                              │                              │
│  Suggested prompts (chips)   │                              │
├──────────────────────────────┴──────────────────────────────┤
│ Direct lines (Call / Email / Visit) — existing pattern      │
│ LandingFooter                                               │
└─────────────────────────────────────────────────────────────┘
```

**Mobile:** Single column — intro → chat (full width) → compact visual optional → direct lines → footer.

### 4.3 Core UI components (new)

Place under `components/contact/` (or `components/support-chat/`):

| Component                  | Responsibility                                                     |
| -------------------------- | ------------------------------------------------------------------ |
| `ContactChatPage`          | Page composition (nav, columns, footer)                            |
| `SupportChatShell`         | Transcript scroll region + composer sticky footer                  |
| `SupportChatMessage`       | User / assistant / system / escalation bubbles                     |
| `SupportChatComposer`      | Input, send, disabled/loading, optional attach later               |
| `SupportSuggestedPrompts`  | Chip starters (pricing, demo, technical, partnership)              |
| `SupportEscalationCard`    | Inline UI when agent chooses escalate (name/email + “Notify team”) |
| `SupportActionConfirmCard` | Confirm/cancel for proposed actions (Stage 5; stub in Stage 0)     |
| `SupportAgentStatus`       | “Online · typically replies instantly” pulse                       |

### 4.4 Visual direction (match brand)

- Background: soft green bloom + subtle grid (same language as redesigned contact / legal pages).
- Assistant bubbles: light surface `#f7f9f8` / dark `#11161f` with green accent bar or avatar.
- User bubbles: primary-green tint or inverted dark navy.
- Primary send control: shared `Button` `variant="primary-green"`.
- Typography: Lora for page title; Nunito / Brockmann for chat body.
- Motion: welcome fade-in; message enter; typing indicator (3-dot or green pulse). **Do not** spam motion.

### 4.5 Interaction states (must design in Stage 0)

| State             | Behavior                                                                         |
| ----------------- | -------------------------------------------------------------------------------- |
| Empty             | Welcome message + 3–5 suggested prompts                                          |
| Typing            | Assistant typing indicator; composer disabled or soft-disabled                   |
| Streaming         | Partial assistant text (even if stubbed with fake stream)                        |
| Error             | Inline retry on last turn; toast optional                                        |
| Escalation        | Card asking for email (if anonymous) + optional name; submit creates stub ticket |
| Offline / limited | Banner + mailto fallback                                                         |
| Rate limited      | Calm copy + retry-after                                                          |

### 4.6 Suggested starter prompts (copy)

- “What does Qlarety analyze?”
- “How do upload, OCR, and paste differ?”
- “Is this legal advice?”
- “I need a demo for my legal team”
- “Something’s wrong with my account / login”

### 4.7 Stage 0 stub agent (UI-only)

Local mock that:

- Echoes or returns canned answers by keyword for demos.
- Randomly or via keyword (`human`, `speak to someone`) shows **EscalationCard**.
- Via keyword (`resend`, `magic link`) shows **ActionConfirmCard** (no real side effect).

No production LLM required for Stage 0 merge.

### 4.8 Stage 0 acceptance criteria

- [ ] `/contact-us` is chat-first; old form removed or behind a “Email us instead” link.
- [ ] Welcome + suggested prompts work.
- [ ] User can send messages; stub assistant replies with typing state.
- [ ] Escalation and action cards render from stub intents.
- [ ] Direct lines + footer remain.
- [ ] Mobile layout usable without horizontal overflow.
- [ ] Uses shared `Button` variants (no one-off green pill styles).

### 4.9 Out of scope for Stage 0

- Real LLM, RAG, auth session binding, ticket backend, tool execution, analytics.

---

## 5. Stage 1 — Conversation backend (Socket.IO)

### 5.1 Objective

Wire `/contact-us` chat to the live support socket: auth, conversation start/resume, messaging, thinking, and errors.

### 5.2 Auth

```ts
io(url, {
  withCredentials: true,
  auth: { token?, sessionToken?, guestId? },
  // query: { guestId } when anonymous
})
```

- Signed-in users: session cookies (`withCredentials`).
- Guests: Redux / `qlarety_guest_id` → `auth.guestId` (+ query).
- Handlers only after `support:auth_ok`. Otherwise `support:auth_required`.

### 5.3 Client → server

| Event | Payload |
|-------|---------|
| `support:start` | `{}` or `{ conversationId }` |
| `support:message` | `{ conversationId, text, clientMessageId? }` |
| `support:end` | `{ conversationId }` |

### 5.4 Server → client

| Event | Role |
|-------|------|
| `support:auth_ok` / `support:auth_required` | Gate messaging |
| `support:ready` | Hydrate conversation + history |
| `support:user_message` | Confirm / sync user message |
| `agent:thinking` | Typing indicator |
| `agent:message` | Assistant reply (`text`, `decision`) |
| `support:ended` | Conversation closed |
| `support:error` | `UNAUTHORIZED`, `RATE_LIMITED`, `CONVERSATION_CLOSED`, etc. |

### 5.5 Frontend implementation

- `lib/supportSocket.ts` — connection helper
- `components/contact/useSupportChat.ts` — session lifecycle
- `components/contact/socketTypes.ts` + `mapServerMessage.ts`
- `conversationId` persisted in `sessionStorage` (`qlarety_support_conversation_id`)

### 5.6 Acceptance

- [x] Connect with credentials + guestId when anonymous
- [x] `support:start` / resume stored conversation; hydrate messages
- [x] Send via `support:message` with optimistic UI + `clientMessageId`
- [x] Show typing on `agent:thinking`; append on `agent:message`
- [x] Surface `support:error` / auth / ended states in UI
- [ ] Eval / load test rate limits in staging

---

## 6. Stage 2 — Product knowledge grounding

### 6.1 Objective

Answers are **grounded** in approved Qlarety context, not free hallucination.

### 6.2 Knowledge sources (v1)

| Source                                                | Use                                                                            |
| ----------------------------------------------------- | ------------------------------------------------------------------------------ |
| `docs/product-spec.md`                                | Capabilities, roles, value props                                               |
| Privacy / Terms pages (exported or mirrored markdown) | Policy questions                                                               |
| Use cases JSON / marketing copy                       | Workflow examples                                                              |
| Curated FAQ markdown (`docs/support-faq.md`)          | Short answers (billing posture, “not legal advice”, formats PDF/DOCX, engines) |
| Public landing feature copy                           | High-level product claims only                                                 |

### 6.3 Approach

1. Curate / chunk documents into a support KB.
2. Retrieve top-k chunks per user turn.
3. Prompt: answer only from chunks; cite section titles internally; if insufficient → `clarify` or `escalate`.
4. Hard system rules: no legal advice; no inventing pricing if not in KB; no inventing SLAs.

### 6.4 Acceptance

- [ ] Golden questions answered correctly with citations in metadata.
- [ ] Off-topic / adversarial prompts refused or redirected.
- [ ] “Is this legal advice?” always clear disclaimer.

---

## 7. Stage 3 — Decision router (autonomy core)

### 7.1 Objective

Every turn produces a structured **decision**, not only text.

### 7.2 Intent schema (illustrative)

```ts
type SupportDecision =
  | { type: "answer"; message: string; citations?: string[] }
  | { type: "clarify"; message: string; questions: string[] }
  | { type: "escalate"; reason: string; priority: "low" | "normal" | "high"; summary: string }
  | { type: "action"; actionId: string; args: Record<string, unknown>; confirmRequired: boolean };
```

### 7.3 Escalation triggers (examples)

- Explicit “talk to a human”
- Account/billing disputes, security incidents, data deletion requests
- Repeated failure after N clarifications
- Low retrieval confidence
- Requests outside product scope that still need a person (sales enterprise deals)

### 7.4 Acceptance

- [ ] Router unit tests / eval set for answer vs escalate.
- [ ] UI maps each `type` to existing Stage 0 cards.

---

## 8. Stage 4 — Human escalation

### 8.1 Objective

Seamless handoff to real customer support.

### 8.2 Flows

1. Agent emits `escalate`.
2. UI collects email (+ name optional) if missing.
3. Create ticket: email to `contact@qlarety.com` and/or admin console “Support queue” (see admin-console-spec).
4. Payload: transcript, decision reason, user agent, session id, optional account id.
5. User sees confirmation + ticket/reference id; chat can continue in “waiting” mode or close.

### 8.3 Acceptance

- [ ] Support receives usable context without re-asking the whole story.
- [ ] User gets clear expectation (“usually within 24h” — match marketing copy).

---

## 9. Stage 5 — Actions (tool use)

### 9.1 Objective

Agent may **propose or perform** allowlisted actions.

### 9.2 Candidate v1 actions (conservative)

| Action ID                     | Description                             | Confirm? | Auth                          |
| ----------------------------- | --------------------------------------- | -------- | ----------------------------- |
| `link.docs_help`              | Deep-link to in-app help / how-it-works | No       | None                          |
| `link.auth`                   | Send user to `/auth` or magic-link page | No       | None                          |
| `link.contact_email`          | Prefill mailto                          | No       | None                          |
| `account.resend_verification` | Resend verify email                     | Yes      | User email verified ownership |
| `sales.request_demo`          | Create demo lead with captured details  | Yes      | Email required                |

**Explicitly deferred:** deleting documents, changing passwords, billing mutations, exporting all user data (route to escalation / privacy process).

### 9.3 Acceptance

- [ ] No action runs without schema validation.
- [ ] Confirm UI required when `confirmRequired: true`.
- [ ] Audit log entry for each executed action.

---

## 10. Stage 6 — Hardening & ops

- Eval harness (golden + adversarial prompts).
- Observability: latency, escalate rate, CSAT optional thumbs.
- PII redaction in logs where possible.
- Admin: view sessions, force-escalate, disable agent kill-switch.
- Feature flag: `support_chat_v1` for gradual rollout; form fallback remains.

---

## 11. File / route sketch (post Stage 0)

```
app/contact-us/page.tsx              → ContactChatPage
components/contact/
  SupportChatShell.tsx
  SupportChatMessage.tsx
  SupportChatComposer.tsx
  SupportSuggestedPrompts.tsx
  SupportEscalationCard.tsx
  SupportActionConfirmCard.tsx
  SupportAgentStatus.tsx
docs/support-faq.md                  → Stage 2 KB seed
docs/contact-chatbot-spec.md         → this document
app/api/support/...                  → Stage 1+
```

Preserve `ContactUsImageColumn` as optional right rail or evolve into agent status visual.

---

## 12. Risks & mitigations

| Risk                        | Mitigation                                             |
| --------------------------- | ------------------------------------------------------ |
| Hallucinated product claims | Grounding + refuse; Stage 2 before aggressive autonomy |
| Agent gives legal advice    | Hard system prompt + eval; escalate edge cases         |
| Spam / cost blowups         | Rate limits, max tokens, session caps                  |
| Bad escalations (noise)     | Router thresholds; Stage 6 tuning                      |
| UI rewrite thrash           | Stage 0 stubs all future intents                       |

---

## 13. Immediate next step

**Implement Stage 0 only:** redesign `/contact-us` as the chat UI with stub decision types (`answer` / `escalate` / `action`), then review UX before Stage 1 API work.

---

## 14. Open questions (resolve before Stage 1)

1. Guest-only chat vs require email before first message?
2. Ticket system of record: email-only vs admin console queue?
3. Same LLM stack as in-app document chat, or dedicated smaller support model?
4. Keep a permanent “Email form” fallback on the page or only after escalation failure?
