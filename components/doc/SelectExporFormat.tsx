"use client";

import { motion } from "framer-motion";
import { staticConstants } from "@/constants/staticConstants";
import { useDispatch, useSelector } from "react-redux";
import {
  selectExportFormat,
  setExportFormat,
} from "@/redux/slices/document/documentAnalysis.slice";

export const SelectExporFormat = ({}) => {
  const dispatch = useDispatch();
  const exportFormat = useSelector(selectExportFormat);
  const onSelectFormat = (value: string) => {
    dispatch(setExportFormat(value as "png" | "pdf"));
  };
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="flex items-center justify-center gap-2 text-gray-600 mb-4 bg-gray-100 p-2 rounded-full w-auto mx-auto">
        {staticConstants.exportOptions.map((option) => {
          const isActive = exportFormat === option.value;
          return (
            <motion.button
              key={option.value}
              onClick={() => onSelectFormat(option.value)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`relative py-2 px-4 rounded-full transition-colors duration-200 ${
                isActive ? "text-white" : "text-gray-600 hover:text-gray-800"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="active-export-format-pill"
                  className="absolute inset-0 rounded-full bg-green-700"
                />
              )}
              <span className="relative z-10">{option.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
