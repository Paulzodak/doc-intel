"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "@/assets/svg/SearchIcon";
import { MdKeyboardCommandKey } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { useDocumentsSearch } from "@/data/document";
import { Document } from "@/types/document";
import { QlaretyLogo } from "@/assets/svg/QlaretyLogo";
import { AnimatePresence, motion } from "framer-motion";
import { FiClock, FiX } from "react-icons/fi";
import { timeAgoFromIso } from "@/lib/staticFunctions";
import { useRouter } from "next/navigation";

export function AppSearch() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <SearchTrigger onClick={() => setIsOpen(true)} />
      <AnimatePresence>
        {isOpen && <SearchModal onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

function SearchTrigger({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative z-10 hiddesn lg:flex  items-center w-full bg-gray-100/50 rounded-full border boxrder-gray-500 shadow-none px-10 py-2 text-left text-sm text-gray-500 cursor-pointer hover:bg-gray-50 transition-colors"
    >
      <SearchIcon
        color="#6a7282"
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"
        size={16}
      />
      <span className="hidden sm:block">Search documents...</span>
      <span className="sm:hidden">Search...</span>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-gray-200 p-1 rounded-sm flex gap-1 items-center justify-center text-gray-600">
        <MdKeyboardCommandKey size={14} />
        <span className="text-xs">F</span>
      </div>
    </button>
  );
}

function SearchModal({ onClose }: { onClose: () => void }) {
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [input, setInput] = useState("");
  const { data, isLoading } = useDocumentsSearch(debouncedQuery);

  useEffect(() => {
    const trimmed = input.trim();
    const id = window.setTimeout(() => setDebouncedQuery(trimmed), 500);
    return () => window.clearTimeout(id);
  }, [input]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center phh-4 pt-24">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        aria-hidden
      />
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: -20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: -20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-2xl shadow-2xl w-[90%]  max-w-2xl overflow-hidden"
      >
        <div className="relative border-b border-gray-100 py-2 ">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search documents..."
            autoFocus
            className=" border-0 shadow-none  rounded-none px-14 py-6 text-base! text-gray-500 placeholder:text-gray-500 focus-visible:ring-0 focus-visible:border-0"
          />
          <SearchIcon
            color="#6a7282"
            className="absolute left-6 top-[36px] -translate-y-1/2 text-gray-600"
            size={18}
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="absolute right-6 top-[36px] -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FiX className="text-gray-500" size={18} />
          </button>
        </div>

        <div className="p-6 max-h-96 overflow-auto">
          {data && data.length > 0 && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="gap-2 grid text-gray-500"
            >
              <div className="flex gap-1 items-center">
                <SearchIcon color="#4a5565" className="w-3 h-3" />
                <h1 className="text-gray-500 text-xs font-medium uppercase">Search Results</h1>
              </div>
              <div className="pt-2 gap-2 grid">
                {data.map((document) => (
                  <DocumentItem onClose={onClose} key={document.id} document={document} />
                ))}
              </div>
            </motion.div>
          )}
          {data && data.length === 0 && !isLoading && debouncedQuery.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-gray-500 text-sm py-6 text-center"
            >
              <h3>No documents found</h3>
            </motion.div>
          )}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <QlaretyLogo className="mx-auto my-2 animate-pulse" />
            </motion.div>
          )}
          {!isLoading && debouncedQuery.length === 0 && (
            <div className="text-gray-400 text-sm py-6 text-center">
              Start typing to search your documents
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

const DocumentItem = ({ document, onClose }: { document: Document; onClose: () => void }) => {
  const lastActivity = timeAgoFromIso(document.updatedAt);
  const router = useRouter();
  const handleDocumentClick = () => {
    onClose();
    router.push(`/doc/${document.jobId}`);
  };
  return (
    <div
      onClick={handleDocumentClick}
      className="text-gray-500 cursor-pointer text-xs bosrder p-3 rounded-xl bg-gray-50"
    >
      <h3>{document.documentName}</h3>
      <div className="flex gap-1 items-center mt-1">
        <FiClock size={11} className="text-gray-400" />
        <span className="text-gray-400 text-[11px] mt-[1px]">
          Last viewed: {lastActivity || "—"}
        </span>
      </div>
    </div>
  );
};
