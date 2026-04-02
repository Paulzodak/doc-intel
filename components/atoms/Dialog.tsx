"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiAlertTriangle } from "react-icons/fi";
import { Button } from "../ui/button";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "destructive" | "ghost" | "link" | "primary-green";
}
interface DialogProps {
  isOpen: boolean;
  primaryButton: ButtonProps;
  secondaryButton: ButtonProps;
  title: string;
  message: string;
  onClose: () => void;

  variant: "danger" | "warning" | "info";
  className?: string;
}

const Dialog: React.FC<DialogProps> = ({
  isOpen,
  title,
  message,
  onClose,
  primaryButton,
  secondaryButton,
  variant = "info",
  className = "",
}) => {
  const variantStyles = {
    danger: {
      button: "bg-red-800 hover:bg-red-700 text-white",
      icon: "text-red-500",
      border: "border-red-200",
    },
    warning: {
      button: "bg-yellow-600 hover:bg-yellow-700 text-white",
      icon: "text-yellow-500",
      border: "border-yellow-200",
    },
    info: {
      button: "bg-blue-600 hover:bg-blue-700 text-white",
      icon: "text-blue-500",
      border: "border-blue-200",
    },
  };

  const styles = variantStyles[variant];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          />

          {/* Dialog */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className={`bg-white relative rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden ${className}`}
            >
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors absolute top-4 right-4"
              >
                <FiX className="text-gray-500" size={20} />
              </button>
              {/* Header */}
              <div className={`p-4 bosrder-b ${styles.border}`}>
                <div className="flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                    className="bg-red-50 rounded-full mx-auto p-4 rounded-f"
                  >
                    <FiAlertTriangle className={`w-6 h-6 ${styles.icon}`} />
                  </motion.div>
                </div>
                <div className="flex items-start gap-4 my-4">
                  <div className="mx-auto grid gap-2 text-center">
                    <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                    <p className="text-sm text-gray-600">{message}</p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6  grid-cols-2 grid grid-flow-col gap-3 bg-gray-100">
                <Button
                  className="w-full rounded-full text-sm text-gray-500"
                  onClick={secondaryButton.onClick}
                  variant="outline"
                >
                  {secondaryButton.children}
                </Button>
                <Button
                  className={`${styles.button} w-full rounded-full text-sm border-none`}
                  onClick={primaryButton.onClick}
                >
                  {primaryButton.children}
                </Button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Dialog;
