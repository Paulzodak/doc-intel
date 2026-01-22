"use client";

import React, { ChangeEvent, ChangeEventHandler } from "react";
import InputMethodTemplate from "./InputMethodTemplate";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import { useDocumentUpload } from "@/hooks/useDocumentUpload";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setTextInput } from "@/redux/slices/document/input.slice";

interface PasteTextProps {
  isExpanded: boolean;
  onClick: () => void;
}

const PasteText = ({ isExpanded, onClick }: PasteTextProps) => {
  const dispatch = useDispatch();
  const text = useSelector((state: RootState) => state.documentInput.text);
  const { processText, isLoading, reset, error, percentage } = useDocumentUpload();
  const features = [
    { name: "Syntax Highlighting" },
    { name: "Auto-formatting" },
    { name: "Real-time Analysis" },
  ];

  const handleSubmit = () => {
    processText();
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
      icon="content_paste"
      title="Paste Text"
      description="Directly paste contract clauses or snippets from your clipboard."
      featuresTitle="Editor Features"
      features={features}
      colorScheme="purple"
      collapsedButtonText="Launch Editor"
    >
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
      <Button
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
      </Button>
    </InputMethodTemplate>
  );
};

export default PasteText;
