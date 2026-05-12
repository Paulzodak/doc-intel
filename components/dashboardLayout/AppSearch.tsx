"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "@/assets/svg/SearchIcon";
import { MdKeyboardCommandKey } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { useDocumentsSearch } from "@/data/document";
import { Document } from "@/types/document";
import { QlaretyLogo } from "@/assets/svg/QlaretyLogo";
import { motion } from "framer-motion";
import { FiClock } from "react-icons/fi";
import { timeAgoFromIso } from "@/lib/staticFunctions";

export function AppSearch() {
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [input, setInput] = React.useState("");
  const { data, isLoading } = useDocumentsSearch(debouncedQuery);

  useEffect(() => {
    const trimmed = input.trim();
    const id = window.setTimeout(() => setDebouncedQuery(trimmed), 500);
    return () => window.clearTimeout(id);
  }, [input]);
  return (
    <div className="relative z-10 hidden lg:block">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search documents..."
        className="bg-white rounded-full border shadow-none px-10 !py-2 text-gray-600"
      />
      <SearchIcon
        color="#4a5565"
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"
        size={18}
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-gray-200 p-1 rounded-sm flex gap-1 items-center justify-center text-gray-600 ">
        <MdKeyboardCommandKey size={14} />
        <span className="text-xs ">F</span>
      </div>
      {(data || debouncedQuery.length > 0) && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-12 left-0 w-full border border-gray-200/50 bg-white shadow-md rounded-2xl p-4 max-h-80 overflow-scroll"
        >
          <>
            {data && data?.length > 0 && !isLoading && (
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
                {data?.map((document) => (
                  <DocumentItem key={document.id} document={document} />
                ))}
              </motion.div>
            )}
            {data && data?.length === 0 && !isLoading && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
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
          </>
        </motion.div>
      )}
    </div>
  );
}

const DocumentItem = ({ document }: { document: Document }) => {
  const lastActivity = timeAgoFromIso(document.updatedAt);
  return (
    <div className=" text-gray-500 text-xs border p-2 rounded-xl bg-gray-50">
      <h3>{document.documentName}</h3>
      <div className="flex gap-1 items-center mt-1">
        <FiClock size={11} className="text-gray-400" />
        <span className="text-gray-400 text-[11px]">Last viewed: {lastActivity || "—"}</span>
      </div>
    </div>
  );
};
