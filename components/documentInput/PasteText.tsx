"use client";

import React from "react";

interface PasteTextProps {
  isExpanded: boolean;
  onClick: () => void;
}

const PasteText = ({ isExpanded, onClick }: PasteTextProps) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-gray-800 rounded-4xl  ${
        isExpanded
          ? "border-2 border-purple-400 shadow-lg"
          : "border border-gray-300 dark:border-gray-700 shadow-sm"
      } overflow-hidden cursor-pointer transition-all duration-300`}
    >
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 gap-8 transition-all duration-500 ease-in-out ${
          isExpanded ? "max-h-[1000px] opacity-100 p-8" : "max-h-0 opacity-0 overflow-hidden p-0"
        }`}
      >
        {/* Left Side - Paste Text */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <p className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-xs font-bold">
              METHOD 03
            </p>
            <span className="material-symbols-outlined text-purple-600 dark:text-purple-400">
              content_paste
            </span>
          </div>
          <div>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Paste Text</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Directly paste contract clauses or snippets from your clipboard.
            </p>
          </div>
          {/* Text Editor Area */}
          <div className="border-2 border-dashed border-purple-400 rounded-xl p-8 bg-gray-50 dark:bg-gray-900/50 flex flex-col gap-4">
            <textarea
              placeholder="Paste your text here or type directly..."
              className="w-full h-64 p-4 border border-purple-300 dark:border-purple-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-colors self-start"
            >
              Launch Editor
            </button>
          </div>
        </div>

        {/* Right Side - Editor Features */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
            Editor Features
          </h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
              <span className="text-gray-900 dark:text-white font-medium">Syntax Highlighting</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
              <span className="text-gray-900 dark:text-white font-medium">Auto-formatting</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
              <span className="text-gray-900 dark:text-white font-medium">Real-time Analysis</span>
            </li>
          </ul>
        </div>
      </div>
      <div
        className={`p-6 flex items-center gap-6 transition-all duration-500 ease-in-out ${
          !isExpanded ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0 overflow-hidden p-0"
        }`}
      >
        <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-purple-600 dark:text-purple-400 text-2xl">
            content_paste
          </span>
        </div>
        <div className="flex-1">
          <span className="text-xs  dark:text-gray-400 font-semibold uppercase tracking-wider  text-purple-600">
            METHOD 03
          </span>
          <h3 className="text-xl font-black text-gray-900 dark:text-white mt-1 mb-1">Paste Text</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Directly paste contract clauses or snippets from your clipboard.
          </p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className="bg-primary-green hover:bg-primary-green text-black px-6 py-3 rounded-full font-bold text-sm transition-colors whitespace-nowrap"
        >
          Launch Editor
        </button>
      </div>
    </div>
  );
};

export default PasteText;
