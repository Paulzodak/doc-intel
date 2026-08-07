"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToastLogger } from "@/utils/toastUtils";

type SupportEscalationCardProps = {
  reason: string;
  summary: string;
  disabled?: boolean;
  onSubmitted: () => void;
};

export function SupportEscalationCard({
  reason,
  summary,
  disabled,
  onSubmitted,
}: SupportEscalationCardProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    if (!email.trim() || !email.includes("@")) {
      ToastLogger.error("documents", "Please enter a valid email.");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    ToastLogger.success(
      "documents",
      "Ticket stub created — our team will follow up (Stage 0 preview).",
    );
    setSubmitting(false);
    onSubmitted();
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-primary-green/25 bg-gradient-to-br from-[#11161f] to-[#1a2332] p-4 text-white shadow-lg">
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-green">
        Escalate to human
      </p>
      <p className="mt-1 text-sm text-white/70">
        We’ll pass your chat and this note to support. Usually within 24 hours.
      </p>
      <p className="mt-3 rounded-xl bg-white/5 px-3 py-2 text-xs text-white/50">
        Reason: {reason.replaceAll("_", " ")} · {summary.slice(0, 100)}
        {summary.length > 100 ? "…" : ""}
      </p>
      <div className="mt-3 space-y-2">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={disabled || submitting}
          placeholder="Name (optional)"
          className="h-10 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/35"
        />
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={disabled || submitting}
          placeholder="Email *"
          className="h-10 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-white/35"
        />
      </div>
      <Button
        type="button"
        variant="primary-green"
        size="sm"
        className="mt-3 w-full"
        disabled={disabled || submitting}
        onClick={submit}
      >
        {submitting ? "Notifying…" : "Notify support team"}
      </Button>
    </div>
  );
}
