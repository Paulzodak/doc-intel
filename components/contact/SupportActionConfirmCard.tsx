"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ToastLogger } from "@/utils/toastUtils";
import type { SupportActionId } from "./types";

type SupportActionConfirmCardProps = {
  actionId: SupportActionId;
  label: string;
  description: string;
  disabled?: boolean;
  onResolved: (confirmed: boolean) => void;
};

export function SupportActionConfirmCard({
  actionId,
  label,
  description,
  disabled,
  onResolved,
}: SupportActionConfirmCardProps) {
  const [busy, setBusy] = useState(false);

  const confirm = async () => {
    setBusy(true);
    await new Promise((r) => setTimeout(r, 500));
    ToastLogger.success(
      "documents",
      `Action “${actionId}” confirmed (stub — no side effects yet).`,
    );
    setBusy(false);
    onResolved(true);
  };

  return (
    <div className="rounded-2xl border border-[#1e2939]/12 bg-white p-4 shadow-md dark:border-white/10 dark:bg-[#11161f]">
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-green">
        Suggested action
      </p>
      <h4 className="mt-1 font-lora text-lg font-medium text-[#11161f] dark:text-white">{label}</h4>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{description}</p>
      <div className="mt-4 flex gap-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={disabled || busy}
          onClick={() => onResolved(false)}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          type="button"
          variant="primary-green"
          size="sm"
          disabled={disabled || busy}
          onClick={confirm}
          className="flex-1"
        >
          {busy ? "Working…" : "Confirm"}
        </Button>
      </div>
    </div>
  );
}
