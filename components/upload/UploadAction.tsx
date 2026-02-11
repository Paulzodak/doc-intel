"use client";

import React from "react";
import { Button } from "../ui/button";
import { RiResetLeftLine } from "react-icons/ri";
import { HiOutlineUpload } from "react-icons/hi";
import ErrorFeedback from "../atoms/form/feedback/ErrorFeedback";
import { useDocumentUpload } from "@/hooks/useDocumentUpload";

const UploadAction = () => {
  const { error, percentage, isLoading, processText, reset } = useDocumentUpload();

  return (
    <div>
      {error && <ErrorFeedback key="error" message={error || ""} />}
      <div className="flex gap-2 md:gap-4">
        <Button
          onClick={reset}
          disabled={isLoading}
          className="grow rounded-full font-semibold text-xs md:text-md bg-gray-800 border-none"
        >
          <RiResetLeftLine className="text-sm md:text-base" />
          <span className="hidden sm:inline">Reset</span>
        </Button>
        {/* <Button
          variant="secondary"
          className="grow rounded-full font-semibold text-xs md:text-md"
          onClick={processText}
          isLoading={isLoading}
          loadingPercentage={percentage}
          showLiquid={isLoading}
          showSpinner={isLoading}
          disabled={isLoading}
        >
          <HiOutlineUpload size={"1rem"} />
          <span className="hidden sm:inline">{isLoading ? "Processing..." : "Process Text"}</span>
        </Button> */}
      </div>
    </div>
  );
};

export default UploadAction;
