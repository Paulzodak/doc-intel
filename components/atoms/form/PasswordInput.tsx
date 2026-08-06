"use client";

import { type ComponentProps } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export type PasswordInputProps = ComponentProps<typeof Input> & {
  hidePassword: boolean;
  onToggleHide: () => void;
};

export default function PasswordInput({
  id,
  hidePassword,
  onToggleHide,
  className,
  ...props
}: PasswordInputProps) {
  return (
    <div className="relative">
      <Input
        id={id}
        type={hidePassword ? "password" : "text"}
        className={cn(
          "h-11 rounded-full border-gray-200 py-3 pr-11 font-google-sans text-gray-500",
          className,
        )}
        {...props}
      />
      <button
        type="button"
        onClick={onToggleHide}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-500 transition-colors hover:text-gray-700"
        aria-label={hidePassword ? "Show password" : "Hide password"}
      >
        {hidePassword ? <Eye size={18} /> : <EyeOff size={18} />}
      </button>
    </div>
  );
}

