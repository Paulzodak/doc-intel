"use client";

import React from "react";
import { FiFileText, FiSearch, FiFilter } from "react-icons/fi";
import { motion } from "framer-motion";

interface DocumentHeaderProps {
  title?: string;
  onSearch?: (query: string) => void;
  onFilter?: () => void;
}

const DocumentHeader: React.FC<DocumentHeaderProps> = ({
  title = "Document Analysis",
  onSearch,
  onFilter,
}) => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-30"
    >
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Title Section */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg">
              <FiFileText className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                {title}
              </h1>
              <p className="text-sm text-gray-500">Analyze and review document clauses</p>
            </div>
          </div>

          {/* Actions Section */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Search */}
            <div className="relative flex-1 sm:flex-initial">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search..."
                onChange={(e) => onSearch?.(e.target.value)}
                className="w-full sm:w-64 pl-10 pr-4 py-2 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-sm"
              />
            </div>
            {/* Filter */}
            <button
              onClick={onFilter}
              className="p-2 bg-white/50 hover:bg-white border border-gray-200 rounded-lg transition-colors"
            >
              <FiFilter className="text-gray-600" size={18} />
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default DocumentHeader;

