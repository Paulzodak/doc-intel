"use client";

type SupportAgentStatusProps = {
  className?: string;
};

export function SupportAgentStatus({ className = "" }: SupportAgentStatusProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border border-primary-green/25 bg-primary-green/10 px-3 py-1.5 ${className}`}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-green opacity-70" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-green" />
      </span>
      <span className="text-[11px] font-semibold tracking-wide text-[#11161f] dark:text-white">
        Online · replies instantly
      </span>
    </div>
  );
}
