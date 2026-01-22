"use client";

import React from "react";
import InputMethodTemplate from "./InputMethodTemplate";
import { Button } from "../ui/button";

interface ScanOCRProps {
  isExpanded: boolean;
  onClick: () => void;
}

const ScanOCR = ({ isExpanded, onClick }: ScanOCRProps) => {
  const features = [
    { name: "Text Recognition" },
    { name: "Handwriting Support" },
    { name: "Multi-language OCR" },
  ];

  return (
    <InputMethodTemplate
      isExpanded={isExpanded}
      onClick={onClick}
      methodNumber="METHOD 02"
      icon="camera_alt"
      title="Scan via OCR"
      description="Snap or upload a photo for high-precision text recognition."
      featuresTitle="OCR Features"
      features={features}
      colorScheme="green"
      collapsedButtonText="Open Camera"
    >
      {/* Camera/Upload Area */}
      <div className="border-2 w-full border-dashed border-primary-green rounded-xl p-12 bg-gray-50 dark:bg-gray-900/50 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-green-500 transition-colors">
        <div className="w-16 h-16 bg-primary-green dark:bg-primary-green rounded-full flex items-center justify-center">
          <span className="material-symbols-outlined text-white dark:text-primary-green text-3xl">
            camera_alt
          </span>
        </div>
        <div className="text-center">
          <p className="text-sm md:text-base lg:text-lg font-semibold text-gray-900 dark:text-white">
            Take a photo or upload an image
          </p>
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Supports JPG, PNG, and PDF formats
          </p>
        </div>
        <button className="bg-primary-green hover:bg-primary-green text-white px-8 py-3 rounded-lg font-semibold transition-colors">
          Open Camera
        </button>
      </div>
      <Button
        className="mt-8 bg-primary-green text-white border-none shadow-none"
        variant="primary-green"
        size="analyze"
      >
        <span>Analyze Document</span>
        <span className="material-symbols-outlined text-lg">bolt</span>
      </Button>
    </InputMethodTemplate>
  );
};

export default ScanOCR;
