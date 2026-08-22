import clsx from "clsx";

interface NoContentProps {
  title?: string;
  description?: string;
  className?: string;
}

export default function NoContent({
  title = "No content yet",
  description = "Nothing to show here right now.",
  className,
}: NoContentProps) {
  return (
    <div
      className={clsx(
        `flex h-full min-h-[12rem] items-center justify-center rounded-lg border border-dashed border-gray-200 bg-gray-50 p-6 text-center`,
        className,
      )}
    >
      <div className="space-y-1">
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}
