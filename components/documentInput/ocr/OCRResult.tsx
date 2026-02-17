"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, Edit2, X, Loader2 } from "lucide-react";
import { useDocumentUpload } from "@/hooks/useDocumentUpload";
import { EyeIconFilled } from "@/assets/svg/EyeIconFilled";
import { PlayIconFilled } from "@/assets/svg/PlayIconFilled";
import { EditIcon } from "@/assets/svg/EditIcon";
import { DocumentTextIcon } from "@/assets/svg/DocumentTextIcon";

interface OCRResultProps {
  extractedText: string;
  onEdit?: (text: string) => void;
  onProcess?: (text: string) => void;
  onReset?: () => void;
}

export const OCRResult: React.FC<OCRResultProps> = ({
  extractedText,
  onEdit,
  onProcess,
  onReset,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(extractedText);
  const [copied, setCopied] = useState(false);
  const { processText, isLoading } = useDocumentUpload();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(extractedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  const handleSaveEdit = () => {
    onEdit?.(editedText);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedText(extractedText);
    setIsEditing(false);
  };

  const handleProcess = () => {
    const textToProcess = isEditing ? editedText : extractedText;
    if (textToProcess.trim()) {
      processText(textToProcess);
      onProcess?.(textToProcess);
    }
  };

  if (!extractedText) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full space-y-4 fontkk-jakarta"
    >
      <div className="flex items-center justify-between border px-4 py-2 rounded-full bg-nseutral-100/50">
        <div className="flex gap-2 items-center ">
          <DocumentTextIcon color="#4a5565" size={20} />
          <h3 className="text-md font-medium text-gray-600 dark:text-white">Extracted Text</h3>
        </div>
        <div className="flex items-center gap-2">
          <div
            onClick={handleCopy}
            className="flex border text-sm border-gray-200 gap-2 text-gray-500 items-center px-2  py-1 rounded-full"
          >
            <span>Copy</span>
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          </div>
          {!isEditing ? (
            <div
              className="flex border text-sm border-gray-200 gap-2 text-gray-500 items-center px-2  py-1 rounded-full"
              onClick={() => setIsEditing(true)}
            >
              <span>Edit</span>
              <EditIcon color="#6a7282" size={20} />
            </div>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSaveEdit}
                className="h-8 text-green-600 hover:text-green-700"
              >
                <Check className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancelEdit}
                className="h-8 text-red-600 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isEditing ? (
          <motion.div
            key="editing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Textarea
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="min-h-[200px] font-mono text-sm text-gray-600"
              placeholder="Edit extracted text..."
            />
          </motion.div>
        ) : (
          <motion.div
            key="display"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 max-h-96 overflow-y-auto"
          >
            <pre className="whitespace-pre-wrap text-sm text-gray-900 dark:text-gray-100 font-mono">
              {extractedText}
            </pre>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-6 flex flex-wrap gap-3 items-center">
        <Button
          className="bg-primarys-green bg-green-600 shadow shadow-primary-green/30 border-none text-white w-full sm:flex-1"
          size="analyze"
          onClick={onReset}
          disabled={isLoading || !extractedText.trim()}
        >
          <span>Preview Document</span>
          <EyeIconFilled color="white" />
        </Button>
        <Button
          className="bg-primarys-green bg-green-600  shadow shadow-primary-green/30 border-none text-white w-full sm:flex-1"
          size="analyze"
          onClick={handleProcess}
          disabled={isLoading}
          isLoading={isLoading}
          showSpinner
        >
          <span>Analyze Document</span>
          <PlayIconFilled color="white" />
        </Button>
      </div>
      {/* <div className="flex items-center gap-3">
        <Button
          onClick={handleProcess}
          disabled={isLoading || !extractedText.trim()}
          className="bg-primary-green hover:bg-green-600 text-white flex-1"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Processing...
            </>
          ) : (
            <>
              <span>Analyze Document</span>
              <span className="material-symbols-outlined text-lg ml-2">bolt</span>
            </>
          )}
        </Button>
        {onReset && (
          <Button
            variant="outline"
            onClick={onReset}
            disabled={isLoading}
          >
            Reset
          </Button>
        )}
      </div> */}
    </motion.div>
  );
};
