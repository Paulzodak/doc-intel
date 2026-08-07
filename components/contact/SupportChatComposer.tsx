"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "@/assets/svg/ArrowLeftIcon";

type SupportChatComposerProps = {
  disabled?: boolean;
  onSend: (text: string) => void;
  placeholder?: string;
};

export function SupportChatComposer({
  disabled,
  onSend,
  placeholder = "Ask about Qlarety, demos, or account help…",
}: SupportChatComposerProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "0px";
    el.style.height = `${Math.min(el.scrollHeight, 140)}px`;
  }, [value]);

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  };

  return (
    <div className="relative rounded-[1.5rem] border border-[#1e2939]/10 bg-white/90 p-2 shadow-[0_12px_40px_rgba(17,22,31,0.08)] backdrop-blur-md dark:border-white/10 dark:bg-[#11161f]/90">
      <div className="flex items-end gap-2">
        <textarea
          ref={textareaRef}
          rows={1}
          value={value}
          disabled={disabled}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
          placeholder={placeholder}
          className="max-h-[140px] min-h-[44px] flex-1 resize-none bg-transparent px-3 py-2.5 text-sm text-[#11161f] outline-none placeholder:text-gray-400 disabled:opacity-60 dark:text-white"
        />
        <Button
          type="button"
          variant="primary-green"
          size="sm"
          disabled={disabled || !value.trim()}
          onClick={submit}
          className="shrink-0"
          aria-label="Send message"
        >
          Send
          <ArrowLeftIcon size={14} className="rotate-180" />
        </Button>
      </div>
      <p className="px-3 pb-1 text-[10px] text-gray-400">
        Enter to send · Shift+Enter for a new line · Not legal advice
      </p>
    </div>
  );
}
