"use client";

import React from "react";

interface ScanOCRProps {
  isExpanded: boolean;
  onClick: () => void;
}

const ScanOCR = ({ isExpanded, onClick }: ScanOCRProps) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-gray-800 rounded-4xl  ${
        isExpanded
          ? "border-2 border-green-400 shadow-lg"
          : "border border-gray-300 dark:border-gray-700 shadow-sm"
      } overflow-hidden cursor-pointer transition-all duration-300`}
    >
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 gap-8  transition-all duration-500 ease-in-out ${
          isExpanded ? "max-h-[1000px] opacity-100 p-8" : "max-h-0 opacity-0 overflow-hidden p-0"
        }`}
      >
        {/* Left Side - Scan via OCR */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-xs font-bold">
              METHOD 02
            </span>
            <span className="material-symbols-outlined text-green-600 dark:text-green-400">
              camera_alt
            </span>
          </div>
          <div>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Scan via OCR</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Snap or upload a photo for high-precision text recognition.
            </p>
          </div>
          {/* Camera/Upload Area */}
          <div className="border-2 border-dashed border-green-400 rounded-xl p-12 bg-gray-50 dark:bg-gray-900/50 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-green-500 transition-colors">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-3xl">
                camera_alt
              </span>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                Take a photo or upload an image
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Supports JPG, PNG, and PDF formats
              </p>
            </div>
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Open Camera
            </button>
          </div>
        </div>

        {/* Right Side - OCR Features */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-green-600 dark:text-green-400 uppercase tracking-wider">
            OCR Features
          </h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 bg-green-600 rounded-full"></span>
              <span className="text-gray-900 dark:text-white font-medium">Text Recognition</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 bg-green-600 rounded-full"></span>
              <span className="text-gray-900 dark:text-white font-medium">Handwriting Support</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 bg-green-600 rounded-full"></span>
              <span className="text-gray-900 dark:text-white font-medium">Multi-language OCR</span>
            </li>
          </ul>
        </div>
      </div>
      <div
        className={`p-6 flex items-center gap-6 transition-all duration-500 ease-in-out ${
          !isExpanded ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0 overflow-hidden p-0"
        }`}
      >
        <div className="w-16 h-16 bg-primary-green/30 dark:bg-primary-green/30 rounded-full flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-primary-green dark:text-primary-green text-2xl">
            camera_alt
          </span>
        </div>
        <div className="flex-1">
          <span className="text-xs  dark:text-gray-400 font-semibold uppercase tracking-wider text-green-600">
            METHOD 02
          </span>
          <h3 className="text-xl font-black text-gray-900 dark:text-white mt-1 mb-1">
            Scan via OCR
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Snap or upload a photo for high-precision text recognition.
          </p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className="bg-primary-green hover:bg-primary-green text-black px-6 py-3 rounded-full font-bold text-sm transition-colors whitespace-nowrap"
        >
          Open Camera
        </button>
      </div>
    </div>
  );
};

export default ScanOCR;
