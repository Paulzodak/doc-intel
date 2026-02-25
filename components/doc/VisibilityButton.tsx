"use client";

import clsx from "clsx";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LockIcon } from "@/assets/svg/LockIcon";
import { CheckIcon } from "@/assets/svg/CheckIcon";
import { useUpdateDocument } from "@/data/document";

export type VisibilityOption = 1 | 2 | 3;

const VISIBILITY_OPTIONS: { id: VisibilityOption; label: string; description: string }[] = [
  { id: 1, label: "Public", description: "Document is visible to everyone." },
  {
    id: 2,
    label: "Selected Users with the link",
    description: "Only selected users with the link can view this document.",
  },
  { id: 3, label: "Me only", description: "Only you can view this document." },
];

interface VisibilityButtonProps {
  /** Document ID for saving visibility (required for Save to work). */
  documentId?: string;
  /** Initial visibility. Defaults to "public". */
  value?: VisibilityOption;
  /** Called when user selects a new option. */
  onChange?: (value: VisibilityOption) => void;
  className?: string;
}

export const VisibilityButton: React.FC<VisibilityButtonProps> = ({
  documentId,
  value: controlledValue,
  onChange,
  className,
}) => {
  const [internalValue, setInternalValue] = useState<VisibilityOption>(1);
  const [showDropdown, setShowDropdown] = useState(false);
  const [savingOptionId, setSavingOptionId] = useState<VisibilityOption | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const { mutate } = useUpdateDocument();

  const isControlled = controlledValue !== undefined;
  const visibility = isControlled ? controlledValue : internalValue;

  const setVisibility = (next: VisibilityOption) => {
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
    setShowDropdown(false);
  };

  const handleOptionClick = (opt: VisibilityOption) => {
    if (documentId) {
      setSavingOptionId(opt);
      mutate(
        { documentId, data: { visibility: opt } },
        {
          onSuccess: () => {
            if (!isControlled) setInternalValue(opt);
            onChange?.(opt);
            setShowDropdown(false);
          },
          onSettled: () => setSavingOptionId(null),
        },
      );
    } else {
      setVisibility(opt);
    }
  };

  useEffect(() => {
    if (!showDropdown) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

  const selectedMeta = VISIBILITY_OPTIONS.find((o) => o.id === visibility);
  const displayLabel = selectedMeta?.label ?? "Public";

  return (
    <div ref={ref} className={clsx("relative", className)}>
      <button
        type="button"
        onClick={() => setShowDropdown((v) => !v)}
        className="flex bg-neutral-50 border text-sm border-gray-200 gap-2 text-gray-500 items-center px-2 py-1 rounded-full hover:bg-gray-50 transition-colors"
      >
        <LockIcon size={15} />
        <span>{displayLabel}</span>
      </button>
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full mt-1 min-w-[220px] bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden"
          >
            <div className="py-1">
              {VISIBILITY_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleOptionClick(opt.id)}
                  disabled={savingOptionId !== null}
                  className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-70 disabled:pointer-events-none"
                >
                  <span className="w-4 h-4 flex items-center justify-center shrink-0">
                    {savingOptionId === opt.id ? (
                      <span
                        className="animate-spin rounded-full border-2 border-gray-300 border-t-gray-600"
                        style={{ width: 14, height: 14 }}
                      />
                    ) : visibility === opt.id ? (
                      <CheckIcon size={16} color="#05091C" />
                    ) : null}
                  </span>
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
            {selectedMeta && (
              <div className="border-t border-gray-100 bg-gray-50 px-3 py-2 text-xs text-gray-500">
                {selectedMeta.description}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
