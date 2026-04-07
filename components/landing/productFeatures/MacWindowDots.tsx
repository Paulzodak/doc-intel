/** macOS-style traffic lights (decorative). */
export function MacWindowDots({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      <span className="size-2.5 rounded-full bg-[#FF5F57] shadow-[inset_0_-1px_0_rgba(0,0,0,0.12)] ring-1 ring-black/8 sm:size-[11px]" />
      <span className="size-2.5 rounded-full bg-[#FEBC2E] shadow-[inset_0_-1px_0_rgba(0,0,0,0.1)] ring-1 ring-black/8 sm:size-[11px]" />
      <span className="size-2.5 rounded-full bg-[#28C840] shadow-[inset_0_-1px_0_rgba(0,0,0,0.1)] ring-1 ring-black/8 sm:size-[11px]" />
    </div>
  );
}
