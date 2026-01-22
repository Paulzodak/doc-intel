"use client";

import React from "react";
import InputMethodTemplate from "./InputMethodTemplate";
import { Button } from "../ui/button";

interface UploadDocumentProps {
  isExpanded: boolean;
  onClick: () => void;
}

const UploadDocument = ({ isExpanded, onClick }: UploadDocumentProps) => {
  const features = [
    { name: "Metadata Extraction" },
    { name: "Table Detection" },
    { name: "Cross-reference Check" },
  ];

  return (
    <InputMethodTemplate
      isExpanded={isExpanded}
      onClick={onClick}
      methodNumber="METHOD 01"
      icon="description"
      title="Upload Document"
      description="Deep-scan PDF, DOCX, or TXT files with full structural preservation."
      featuresTitle="Quick Insights"
      features={features}
      colorScheme="blue"
      collapsedButtonText="Browse Files"
    >
      {/* Drag and Drop Area */}
      <div className="border-2 w-full border-dashed border-blue-400 rounded-xl p-12 bg-gray-50 dark:bg-gray-900/50 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-blue-500 transition-colors">
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
          <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-3xl">
            cloud_upload
          </span>
        </div>
        <div className="text-center">
          <p className="text-sm md:text-base lg:text-lg font-semibold text-gray-900 dark:text-white">
            Drag and drop your legal files here
          </p>
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Max file size 50MB
          </p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
          Browse Files
        </button>
      </div>
      <Button
        className="mt-8 bg-blue-600 shadow shadow-blue-600/30 border-none text-white"
        size="analyze"
      >
        <span>Analyze Document</span>
        <span className="material-symbols-outlined text-lg">bolt</span>
      </Button>
    </InputMethodTemplate>
  );
};

export default UploadDocument;
