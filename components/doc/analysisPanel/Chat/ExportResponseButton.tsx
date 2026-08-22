"use client";

import ReactDOMServer from "react-dom/server";
import clsx from "clsx";
import React, { useState, useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { DownloadIcon } from "@/assets/svg/DownloadIcon";
import { QlaretyLogo } from "@/assets/svg/QlaretyLogo";
import { DownloadButton } from "../../DownloadButton";

interface ExportResponseButtonProps {
  text?: string;
  className?: string;
}

const emptySubscribe = () => () => {};

function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

export const ExportResponseButton: React.FC<ExportResponseButtonProps> = ({ text, className }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const isClient = useIsClient();

  useEffect(() => {
    if (!showDropdown) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
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
    <div className={clsx("flex items-center", className)}>
      <button type="button" onClick={() => setShowDropdown((v) => !v)} className="my-auto">
        <DownloadIcon size={16} color="#6a7282" />
      </button>
      {isClient &&
        createPortal(
          <AnimatePresence>
            {showDropdown && (
              <motion.div
                key="export-modal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
                onClick={() => setShowDropdown(false)}
                role="dialog"
                aria-modal="true"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="relative z-[101] w-full max-w-[500px] overflow-hidden rounded-4xl border border-gray-200 bg-white shadow-xl shadow-black/20"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-4 py-1 sm:p-6 sm:px-8">
                    <div className="relative mt-4 max-h-[200px] font-google-sans p-2 overflow-hidden rounded-2xl border border-gray-200 shadow">
                      <p className="text-sm text-gray-800 whitespace-pre-wrap">{text}</p>

                      <div
                        className="absolute top-0 z-0 h-full w-full bg-linear-to-b from-white/10 from-10% to-white opacity-80"
                        aria-hidden
                      />
                      <div className="absolute bottom-0 right-0 m-[4px] flex flex-col items-end p-2">
                        <QlaretyLogo size={40} className="msx-auto" />
                      </div>
                    </div>
                  </div>
                  <DownloadButton htmlRenderText={html} />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
};
