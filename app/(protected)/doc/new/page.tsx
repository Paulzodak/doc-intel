"use client";

import { useState } from "react";
import DocumentHeader from "@/components/doc/DocumentHeader";
import InputStack from "@/components/InputStack";
import { useDocumentNames } from "@/hooks/useDocumentNames";
import { motion } from "framer-motion";
import DocumentInput from "@/components/documentInput/DocumentInput";

export default function NewDocumentPage() {
  const { generateUniqueName } = useDocumentNames();

  // Initialize document name only once
  const [documentName, setDocumentName] = useState(() => generateUniqueName());

  return (
    <>
      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Document Name Input */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 shadow-sm">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Document Name
              </label>
              <input
                type="text"
                value={documentName}
                onChange={(e) => setDocumentName(e.target.value)}
                placeholder="Enter document name..."
                className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-gray-900 placeholder-gray-400"
              />
              <p className="mt-2 text-xs text-gray-500">
                The document will be automatically named with the job ID after processing
              </p>
            </div>

            {/* Input Methods Section */}
            <div className="bg-whikte/80 backdrop-blur-sm rousnded-xl px-6 borsder bordejr-gray-200/50 shadjow-sm flex justify-center items-center">
              {/* <h2 className="text-xl font-bold text-gray-900 mb-6">Upload Document</h2> */}
              {/* <InputStack /> */}
              <DocumentInput />
            </div>

            {/* Instructions */}
            <div className="bg-blue-50/50 backdrop-blur-sm rounded-xl p-6 border border-blue-200/50">
              <h3 className="text-sm font-semibold text-blue-900 mb-2">How it works</h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>Upload a file, scan an image, or paste text to analyze</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>Click &quot;Process Text&quot; to start the analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>Your document will be automatically saved with the job ID</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
