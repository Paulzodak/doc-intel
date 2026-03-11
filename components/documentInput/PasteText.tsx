"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import InputMethodTemplate from "./InputMethodTemplate";
import ProcessingIndicator from "./ProcessingIndicator";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import { useDocumentUpload } from "@/hooks/useDocumentUpload";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setTextInput } from "@/redux/slices/document/input.slice";
import { FileIconFilled } from "@/assets/svg/FileIconFilled";
import { PlayIconFilled } from "@/assets/svg/PlayIconFilled";
import ErrorFeedback from "../atoms/form/feedback/ErrorFeedback";

interface PasteTextProps {
  isExpanded: boolean;
  onClick: () => void;
}

const PasteText = ({ isExpanded, onClick }: PasteTextProps) => {
  const dispatch = useDispatch();
  const text = useSelector((state: RootState) => state.documentInput.text);
  const { processText, isLoading, percentage, error, currentStep } = useDocumentUpload();
  console.log(percentage, "percentage");
  console.log(error, "errdor");
  const [completedCount, setCompletedCount] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setCompletedCount(completedCount + 1);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [completedCount]);
  const features = [{ name: "Syntax Highlighting" }, { name: "Real-time Analysis" }];

  const handleSubmit = () => {
    processText(text);
  };
  const handleChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setTextInput(e.target.value));
    return;
  };

  console.log(percentage);
  return (
    <InputMethodTemplate
      isExpanded={isExpanded}
      onClick={onClick}
      methodNumber="METHOD 03"
      icon={<FileIconFilled className="" size={20} color="#800080" />}
      title="Paste Text"
      description="Directly paste contract clauses or snippets from your clipboard."
      featuresTitle="Editor Features"
      features={features}
      colorScheme="purple"
      collapsedButtonText="Launch Editor"
    >
      {!isLoading && (
        <>
          {/* Text Editor Area */}
          <div className="border-2 w-full border-dashed border-purple-400 rounded-xl p-8 bg-gray-50 dark:bg-gray-900/50 flex flex-col gap-4 cursor-pointer hover:border-purple-500 transition-colors">
            <Textarea
              value={text}
              onChange={handleChangeText}
              placeholder="Paste your text here or type directly..."
              className="w-full h-64 p-4 border border-purple-300 dark:border-purple-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus-visible:ring-purple-400 focus-visible:border-purple-400 resize-none"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          {/* <Button
        className="mt-8 bg-purple-700 text-white border-none shadow-none"
        variant="primary-green"
        size="analyze"
        onClick={handleSubmit}
        loadingType="both"
        isLoading={isLoading}
        disabled={isLoading}
        showSpinner
        loadingPercentage={percentage}
      >
        <span className="font-brockmann font-light">Analyze Document</span>
        <span className="material-symbols-outlined text-lg">bolt</span>
      </Button> */}
          {error && <ErrorFeedback className="mt-4" key="error" message={error || ""} />}
          <Button
            className="bg-purple-700 shadow shadow-purple-700/30 border-none text-white w-full sm:flex-1 mt-2"
            size="analyze"
            disabled={isLoading}
            onClick={handleSubmit}
            isLoading={isLoading}
            showSpinner
          >
            <span>Analyze Document</span>
            <PlayIconFilled color="white" />
          </Button>
        </>
      )}
      {isLoading && <ProcessingIndicator completedCount={currentStep - 1} colorScheme="purple" />}
    </InputMethodTemplate>
  );
};

export default PasteText;
