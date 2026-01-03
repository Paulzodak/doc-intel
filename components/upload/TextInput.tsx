"use client";

import React from "react";
import { Textarea } from "../ui/textarea";
import UploadAction from "./UploadAction";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setTextInput } from "@/redux/slices/document/input.slice";
import { ErrorFeedback } from "../atoms/form/feedback";
import { AnimatePresence } from "framer-motion";

const TextInput = () => {
  const dispatch = useDispatch();
  const text = useSelector((state: RootState) => state.documentInput.text);
  const isLoading = useSelector((state: RootState) => state.documentInput.isLoading);
  const error = useSelector((state: RootState) => state.documentInput.error);

  console.log("error", error);
  const handleChangeText = (value: string) => {
    // if (typeof value === "string") {
    dispatch(setTextInput(value));
  };

  return (
    <div className="flex flex-col w-full">
      <h3 className="text-center my-2 md:my-4 text-sm md:text-base">
        Paste in the notes, outline or text content you&apos;d like to use
      </h3>
      <AnimatePresence mode="wait">
        {error && <ErrorFeedback key="error" message={error || ""} />}
      </AnimatePresence>
      <Textarea
        className="w-full h-full mb-3 md:mb-4 min-h-[150px] md:min-h-[200px] text-sm md:text-base"
        value={text}
        onChange={(e) => handleChangeText(e.target.value)}
        disabled={isLoading}
        placeholder="Paste your document text here..."
      />
      {/* <div className="flex gap-2 md:gap-4">
        <Button
          onClick={handleReset}
          disabled={isProcessing || !value}
          className="grow rounded-full font-semibold text-xs md:text-md bg-gray-800 border-none"
        >
          <RiResetLeftLine className="text-sm md:text-base" />
          <span className="hidden sm:inline">Reset</span>
        </Button>
        <Button
          variant="secondary"
          className="grow rounded-full font-semibold text-xs md:text-md"
          onClick={handleProcessText}
          isLoading={isProcessing}
          loadingPercentage={percentage}
          showLiquid={isProcessing}
          showSpinner={isProcessing}
          disabled={!value.trim() || isProcessing}
        >
          <HiOutlineUpload size={"1rem"} />
          <span className="hidden sm:inline">
            {isProcessing ? "Processing..." : "Process Text"}
          </span>
        </Button>
      </div> */}
      <UploadAction />
    </div>
  );
};

export default TextInput;
