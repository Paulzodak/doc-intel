"use client";

import { motion } from "framer-motion";

type SupportSuggestedPromptsProps = {
  prompts: readonly string[];
  onSelect: (prompt: string) => void;
  disabled?: boolean;
};

export function SupportSuggestedPrompts({
  prompts,
  onSelect,
  disabled,
}: SupportSuggestedPromptsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {prompts.map((prompt, index) => (
        <motion.button
          key={prompt}
          type="button"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 * index, duration: 0.3 }}
          disabled={disabled}
          onClick={() => onSelect(prompt)}
          className="rounded-full border border-[#1e2939]/10 bg-white/80 px-3.5 py-2 text-left text-[12px] font-medium text-[#11161f] shadow-sm backdrop-blur transition-colors hover:border-primary-green/40 hover:bg-primary-green/10 disabled:pointer-events-none disabled:opacity-50 dark:border-white/10 dark:bg-[#11161f]/80 dark:text-white dark:hover:bg-primary-green/15"
        >
          {prompt}
        </motion.button>
      ))}
    </div>
  );
}
