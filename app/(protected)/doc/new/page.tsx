"use client";

import { useState } from "react";
import DocumentHeader from "@/components/doc/DocumentHeader";
import InputStack from "@/components/InputStack";
import { useDocumentNames } from "@/hooks/useDocumentNames";
import { motion } from "framer-motion";
import DocumentInput from "@/components/documentInput/DocumentInput";
import { DotGridBackground } from "@/components/atoms/DotGridBackground";

export default function NewDocumentPage() {
  const { generateUniqueName } = useDocumentNames();

  // Initialize document name only once
  const [documentName, setDocumentName] = useState(() => generateUniqueName());

  return (
    <>
      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto sm:px-4 lg:px-6 py-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Document Name Input */}
            {/* <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 shadow-sm">
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
            </div> */}
            <div className="text-center max-w-4xl mx-auto mt-8 ">
              {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-8 bg-gradient-to-r from-blue-500/5 via-purple-500/5 bordser via-pink-500/5 via-orange-500/5 to-primary-green/5 backdrop-blur-[2px]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Next-Gen Document Intelligence
              </div> */}
              <h1 className="text-4xl lg:text-5xl font-black leading-[1.1] tracking-tight mb-8 max-w-4xl text-gradient dark:text-white">
                Analyze legal documents instantly with AI-powered insights
              </h1>
              <p className="text-md md:text-lg text-gray-600 dark:text-gray-400  mb-12 leading-relaxed font-brockmann font-light">
                Scale your legal expertise with precision-engineered AI that identifies risks,
                ensures compliance, and streamlines contract review in seconds.
              </p>
            </div>

            {/* Input Methods Section */}
            <div className="bg-whikte/80 backdrop-blur-sm rousnded-xl px-2 borsder bordejr-gray-200/50 shadjow-sm flex justify-center items-center">
              {/* <h2 className="text-xl font-bold text-gray-900 mb-6">Upload Document</h2> */}
              {/* <InputStack /> */}
              <DocumentInput />
            </div>

            {/* Instructions */}
            <div className="bg-blue-50/50 backdrop-blur-sm rounded-xl p-6 mx-2 border border-blue-200/50">
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
