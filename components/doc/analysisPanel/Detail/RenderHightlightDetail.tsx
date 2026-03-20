import { Highlight } from "@/types/analysis";

export const RenderHighlightDetails = ({
  highlightData,
  className,
}: {
  highlightData: Highlight;
  className?: string;
}) => {
  if (!highlightData) return null;
  return (
    <div className={className}>
      <div className="space-y-3">
        <div>
          <b style={{ display: "block" }} className="text-xs font-semibold text-gray-500 uppercase">
            Type
          </b>
          <p
            style={{ color: "#6a7282", fontSize: "14px", fontWeight: "500" }}
            className="text-sm font-medium text-gray-500 capitalize mt-1"
          >
            {highlightData?.type.toUpperCase()}
          </p>
        </div>
        <div>
          <span className="text-xs font-semibold text-gray-500 uppercase">Text</span>
          <p className="text-sm text-gray-700 mt-1 bg-gray-50 p-2 rounded">{highlightData?.text}</p>
        </div>
        {highlightData?.description && (
          <div>
            <span className="text-xs font-semibold text-gray-500 uppercase">Description</span>
            <p className="text-sm text-gray-700 mt-1 bg-gray-50 p-2 rounded">
              {highlightData?.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
