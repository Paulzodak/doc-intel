"use client";

import ReactDOMServer from "react-dom/server";
import clsx from "clsx";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DownloadIcon } from "@/assets/svg/DownloadIcon";
import { QlaretyLogo } from "@/assets/svg/QlaretyLogo";
import { DownloadButton } from "../../DownloadButton";
interface ExportResponseButtonProps {
  text?: string;
  className?: string;
}

export const ExportResponseButton: React.FC<ExportResponseButtonProps> = ({ text, className }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showDropdown) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

  const logoHtml = ReactDOMServer.renderToStaticMarkup(<QlaretyLogo size={30} />);
  const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }

    p {
      margin: 0;
      white-space: pre-wrap;
      line-height: 1.6;
    }

  
    .export-brand {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    

    
  }
    .export-container {
      padding: 10px;
      background-color: white;
    }
  </style>
</head>
<body>
<div class="export-container">
<div class="export-brand">
${logoHtml}
</div>
<p class="text-sm whitespace-pre-wrap">${text}</p>
</div>
</body>
</html>`;

  return (
    <div ref={ref} className={clsx("flex items-center", className)}>
      <button type="button" onClick={() => setShowDropdown((v) => !v)} className="my-auto">
        <DownloadIcon size={16} color="#6a7282" />
      </button>
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            key="export-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="bg-black/50 absolute w-full h-full top-0 left-0 inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setShowDropdown(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="relaktive z-50 w-full max-w-[500px] bg-white border border-gray-200 rounded-4xl shadow-xl shadow-black/20 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="py-1 p-4 sm:p-6 sm:px-8">
                <div className="max-h-[300px] relative overflow-hidden border border-gray-200 rounded-2xl mt-4 shadow">
                  {/* {text} */}
                  <p className="text-sm whitespace-pre-wrap">{text}</p>

                  <div className="absolute z-0 w-full h-full todp-[50%] top-0 bg-linear-to-b from-white/10 from-10%  to-white opacity-80  " />
                  <div className="absolute bottom-0 right-0 flex items-end flex-col p-2 m-[4px]">
                    <QlaretyLogo size={40} className="msx-auto" />
                    {/* <span className="text-sm text-black font-medium">Qlarety</span> */}
                  </div>
                </div>
              </div>
              <DownloadButton htmlRenderText={html} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
