import React from "react";
import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

interface ErrorFeedbackProps {
  message: string;
  className?: string;
}

const ErrorFeedback: React.FC<ErrorFeedbackProps> = ({ message, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`mb-3 md:mb-4 p-2 text-xs md:text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 ${className}`}
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.3, delay: 0.1, type: "spring", stiffness: 200 }}
      >
        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
      </motion.div>
      <motion.span
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2, delay: 0.15 }}
      >
        {message}
      </motion.span>
    </motion.div>
  );
};

export default ErrorFeedback;
