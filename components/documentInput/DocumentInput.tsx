"use client";

import React, { useState } from "react";
import UploadDocument from "./UploadDocument";
import ScanOCR from "./ScanOCR";
import PasteText from "./PasteText";
import { Button } from "@/components/ui/button";

type MethodType = "upload" | "scan" | "paste" | null;

const DocumentInput = () => {
  const [expandedMethod, setExpandedMethod] = useState<MethodType>("upload");

  const handleMethodClick = (method: MethodType) => {
    // If clicking the same method, collapse it; otherwise expand the new one
    setExpandedMethod(expandedMethod === method ? method : method);
  };

  return (
    <section className="relative py-12   max-w-full ">
      {/* Dotted Grid Background */}
      <div
        className="absolute inset-0 opacity-30"
        // style={{
        //   backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
        //   backgroundSize: "24px 24px",
        // }}
      />
      <div className="relative max-w-[800px]  mx-auto">
        <div className=" grid gap-6 relative">
          <div className=" border-2 border-gray-200 w-[70%]  h-full absolute -z-20 top-0 left-[15%]" />
          {/* Main Input Section - Method 01 */}
          <UploadDocument
            isExpanded={expandedMethod === "upload"}
            onClick={() => handleMethodClick("upload")}
          />

          {/* Method 02 - Scan via OCR */}
          <ScanOCR
            isExpanded={expandedMethod === "scan"}
            onClick={() => handleMethodClick("scan")}
          />

          {/* Method 03 - Paste Text */}
          <PasteText
            isExpanded={expandedMethod === "paste"}
            onClick={() => handleMethodClick("paste")}
          />
          <div className="bg-[#1e2939] dasrk:bg-gray-900 rounded-4xl p-8 shadow-lg mt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Left Side */}
              <div>
                <h3 className="text-lg md:text-xl lg:text-2xl font-black text-white mb-2">
                  Ready to proceed?
                </h3>
                <p className="text-gray-300 text-xs md:text-sm">
                  Review your selected input before initiating the AI engine.
                </p>
              </div>
              {/* Right Side */}
              <div className="grid sm:flex items-center gap-4">
                {/* Avatars */}
                <div className="flex items-center -space-x-3 mx-auto">
                  <div className="w-10 h-10 rounded-full bg-orange-400 border-2 border-[#1e2939] dark:border-gray-900"></div>
                  <div className="w-10 h-10 rounded-full bg-amber-700 border-2 border-[#1e2939] dark:border-gray-900"></div>
                  <div className="w-10 h-10 rounded-full bg-gray-400 border-2 border-[#1e2939] dark:border-gray-900 flex items-center justify-center text-white text-xs font-bold">
                    +12
                  </div>
                </div>
                {/* Analyze Button */}
                <Button variant="primary-green" size="analyze">
                  <span>Analyze Document</span>
                  <span className="material-symbols-outlined text-lg">bolt</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* Call to Action Section */}

        {/* Footer - Global Features */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 py-6">
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <span className="material-symbols-outlined text-lg">lock</span>
            <span className="text-xs font-bold uppercase tracking-wider">
              END-TO-END ENCRYPTION
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <span className="material-symbols-outlined text-lg">language</span>
            <span className="text-xs font-bold uppercase tracking-wider">
              SUPPORTS 40+ LANGUAGES
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <span className="material-symbols-outlined text-lg">balance</span>
            <span className="text-xs font-bold uppercase tracking-wider">
              LEGAL GRADE PRECISION
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DocumentInput;
