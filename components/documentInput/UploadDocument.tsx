"use client";

import React from "react";

interface UploadDocumentProps {
  isExpanded: boolean;
  onClick: () => void;
}

const UploadDocument = ({ isExpanded, onClick }: UploadDocumentProps) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-gray-800 rounded-4xl  ${
        isExpanded
          ? "border-2 border-blue-400 shadow-lg"
          : "border border-gray-300 dark:border-gray-700 shadow-sm"
      } overflow-hidden cursor-pointer transition-all duration-300`}
    >
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 gap-8 transition-all duration-500 ease-in-out ${
          isExpanded ? "max-h-[1000px] opacity-100 p-8" : "max-h-0 opacity-0 overflow-hidden p-0"
        }`}
      >
        {/* Left Side - Upload Document */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold">
              METHOD 01
            </span>
            <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">
              description
            </span>
          </div>
          <div>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
              Upload Document
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Deep-scan PDF, DOCX, or TXT files with full structural preservation.
            </p>
          </div>
          {/* Drag and Drop Area */}
          <div className="border-2 border-dashed border-blue-400 rounded-xl p-12 bg-gray-50 dark:bg-gray-900/50 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-blue-500 transition-colors">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-3xl">
                cloud_upload
              </span>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                Drag and drop your legal files here
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Max file size 50MB</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Browse Files
            </button>
          </div>
        </div>

        {/* Right Side - Quick Insights */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Quick Insights
          </h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              <span className="text-gray-900 dark:text-white font-medium">Metadata Extraction</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              <span className="text-gray-900 dark:text-white font-medium">Table Detection</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              <span className="text-gray-900 dark:text-white font-medium">
                Cross-reference Check
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div
        className={`p-6 flex items-center gap-6 transition-all duration-500 ease-in-out ${
          !isExpanded ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0 overflow-hidden p-0"
        }`}
      >
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-2xl">
            description
          </span>
        </div>
        <div className="flex-1">
          <span className="text-xs text-blue-600 font-semibold uppercase tracking-wider">
            METHOD 01
          </span>
          <h3 className="text-xl font-black text-gray-900 dark:text-white mt-1 mb-1">
            Upload Document
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Deep-scan PDF, DOCX, or TXT files with full structural preservation.
          </p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold text-sm transition-colors whitespace-nowrap"
        >
          Browse Files
        </button>
      </div>
    </div>
  );
};

export default UploadDocument;
