"use client";

import React, { useState, useRef, useCallback } from "react";
import InputMethodTemplate from "./InputMethodTemplate";
import { Button } from "../ui/button";
import { FileUploadIconFilled } from "@/assets/svg/FileUploadIconFilled";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineUpload } from "react-icons/hi";
import { MdDeleteOutline, MdCheckCircle } from "react-icons/md";
import { PlayIconFilled } from "@/assets/svg/PlayIconFilled";
import { TrashIcon } from "@/assets/svg/TrashIcon";
import { EyeIconFilled } from "@/assets/svg/EyeIconFilled";
import { extractDocumentText } from "@/lib/extractDocumentText";
import { DocumentPreviewPanel } from "./DocumentPreviewPanel";
import { useDocumentUpload } from "@/hooks/useDocumentUpload";
import { ErrorFeedback } from "../atoms/form/feedback";

interface UploadDocumentProps {
  isExpanded: boolean;
  onClick: () => void;
  onFilesChange?: (files: File[]) => void;
  /** Selected AI engine from DocumentInput (for future API use). */
}

interface UploadedFile {
  id: string;
  file: File;
  status: "pending" | "uploading" | "success" | "error";
  error?: string;
  /** Extracted plain text for preview */
  extractedText?: string;
  extractionStatus?: "idle" | "extracting" | "done" | "error";
  extractionError?: string;
}

const ACCEPTED_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
  "text/markdown",
  "text/plain",
  "application/vnd.oasis.opendocument.text",
  "text/html",
  "application/epub+zip",
  "application/rtf",
];

const ACCEPTED_EXTENSIONS = [
  ".pdf",
  ".docx",
  ".doc",
  ".md",
  ".txt",
  ".odt",
  ".html",
  ".epub",
  ".rtf",
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB per file
const MAX_TOTAL_SIZE = 50 * 1024 * 1024; // 50MB total

const UploadDocument = ({ isExpanded, onClick, onFilesChange }: UploadDocumentProps) => {
  const { processText, isLoading, reset, error, percentage } = useDocumentUpload();
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [showPreviewPanel, setShowPreviewPanel] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  console.log(error, "eror");
  const features = [
    { name: "Full Data Extraction" },
    { name: "Multi-File Processing" },
    { name: "Cross-reference Check" },
  ];

  const validateFile = useCallback((file: File): string | null => {
    const isValidType =
      ACCEPTED_TYPES.includes(file.type) ||
      ACCEPTED_EXTENSIONS.some((ext) => file.name.toLowerCase().endsWith(ext));

    if (!isValidType) {
      return `File type not supported. Accepted: PDF, DOCX, MD, ODT, HTML, EPUB, RTF, TXT`;
    }
    if (file.size > MAX_FILE_SIZE) {
      return `File size exceeds ${MAX_FILE_SIZE / (1024 * 1024)}MB limit`;
    }
    return null;
  }, []);

  const handleFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList) return;

      const newFiles: UploadedFile[] = [];
      let totalSize = files.reduce((sum, f) => sum + f.file.size, 0);

      Array.from(fileList).forEach((file) => {
        const error = validateFile(file);
        totalSize += file.size;

        if (totalSize > MAX_TOTAL_SIZE) {
          newFiles.push({
            id: `${Date.now()}-${Math.random()}`,
            file,
            status: "error",
            error: "Total size exceeds 50MB limit",
          });
          return;
        }

        newFiles.push({
          id: `${Date.now()}-${Math.random()}`,
          file,
          status: error ? "error" : "pending",
          error: error || undefined,
        });
      });

      const updatedFiles = [...files, ...newFiles];
      setFiles(updatedFiles);
      onFilesChange?.(updatedFiles.filter((f) => f.status !== "error").map((f) => f.file));
    },
    [files, onFilesChange, validateFile],
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeFile = (id: string) => {
    const updatedFiles = files.filter((f) => f.id !== id);
    setFiles(updatedFiles);
    onFilesChange?.(updatedFiles.filter((f) => f.status !== "error").map((f) => f.file));
  };

  const handleReset = () => {
    setFiles([]);
    setShowPreviewPanel(false);
    onFilesChange?.([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleAnalyzeDocument = async () => {
    const validFiles = files.filter((f) => f.status !== "error");
    if (validFiles.length === 0) return;

    const texts: string[] = [];
    for (const uf of validFiles) {
      if (uf.extractionStatus === "done" && uf.extractedText != null) {
        texts.push(uf.extractedText);
        continue;
      }
      setFiles((prev) =>
        prev.map((f) => (f.id === uf.id ? { ...f, extractionStatus: "extracting" as const } : f)),
      );
      try {
        const text = await extractDocumentText(uf.file);
        texts.push(text);
        setFiles((prev) =>
          prev.map((f) =>
            f.id === uf.id ? { ...f, extractedText: text, extractionStatus: "done" as const } : f,
          ),
        );
      } catch (e) {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === uf.id
              ? {
                  ...f,
                  extractionError: String(e),
                  extractionStatus: "error" as const,
                }
              : f,
          ),
        );
      }
    }
    const combined = texts.join("\n");
    if (combined) processText(combined);
  };

  const runExtractionAndShowPreview = useCallback(async () => {
    const validFiles = files.filter((f) => f.status !== "error");
    if (validFiles.length === 0) return;

    setShowPreviewPanel(true);
    setFiles((prev) =>
      prev.map((f) =>
        f.status === "error"
          ? f
          : {
              ...f,
              extractionStatus: "extracting" as const,
              extractedText: undefined,
              extractionError: undefined,
            },
      ),
    );

    for (const uf of validFiles) {
      try {
        const text = await extractDocumentText(uf.file);
        setFiles((prev) =>
          prev.map((f) =>
            f.id === uf.id ? { ...f, extractedText: text, extractionStatus: "done" as const } : f,
          ),
        );
      } catch (e) {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === uf.id
              ? { ...f, extractionError: String(e), extractionStatus: "error" as const }
              : f,
          ),
        );
      }
    }
  }, [files]);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const totalSize = files.reduce((sum, f) => sum + f.file.size, 0);
  const hasValidFiles = files.length > 0 && !files.some((f) => f.status === "error");

  console.log("files", files);
  return (
    <InputMethodTemplate
      isExpanded={isExpanded}
      onClick={onClick}
      methodNumber="METHOD 01"
      icon={<FileUploadIconFilled className="" size={20} color="#155dfc" />}
      title="Upload Document"
      description="Deep-scan PDF, DOCX, or TXT files with full structural preservation."
      featuresTitle="Quick Insights"
      features={features}
      colorScheme="blue"
      collapsedButtonText="Browse Files"
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept={ACCEPTED_EXTENSIONS.join(",")}
        multiple
        className="hidden"
      />

      {/* Drag and drop area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 w-full border-dashed rounded-xl p-8 md:p-12 flex flex-col items-center justify-center gap-4 cursor-pointer transition-colors ${
          isDragging
            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
            : "border-blue-400 bg-gray-50 dark:bg-gray-900/50 hover:border-blue-500"
        }`}
      >
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center shrink-0">
          <HiOutlineUpload className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="text-center">
          <p className="text-sm md:text-base lg:text-lg font-semibold text-gray-900 dark:text-white">
            Drag and drop your legal files here, or click to select
          </p>
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Max {MAX_FILE_SIZE / (1024 * 1024)}MB per file, {MAX_TOTAL_SIZE / (1024 * 1024)}MB total
            • PDF, DOCX, TXT, MD, ODT, HTML, EPUB, RTF
          </p>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3  font-semibold transition-colors rounded-full"
        >
          Browse Files
        </button>
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
          <AnimatePresence>
            {files.map((uploadedFile) => (
              <motion.div
                key={uploadedFile.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  uploadedFile.status === "error"
                    ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                    : uploadedFile.status === "success"
                      ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                      : "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
                }`}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {uploadedFile.status === "success" ? (
                    <MdCheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                  ) : uploadedFile.status === "error" ? (
                    <MdDeleteOutline className="w-5 h-5 text-red-500 shrink-0" />
                  ) : (
                    <HiOutlineUpload className="w-5 h-5 text-gray-400 shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-medium truncate ${
                        uploadedFile.status === "error"
                          ? "text-red-700 dark:text-red-400"
                          : "text-gray-700 dark:text-gray-200"
                      }`}
                    >
                      {uploadedFile.file.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatFileSize(uploadedFile.file.size)}
                      {uploadedFile.error && (
                        <span className="text-red-500 dark:text-red-400 ml-2">
                          • {uploadedFile.error}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(uploadedFile.id);
                  }}
                  className="ml-2 p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors shrink-0 cursor-pointer"
                  aria-label="Remove file"
                >
                  <TrashIcon color="#6a7282" size={20} />
                  {/* <MdDeleteOutline className="w-4 h-4 md:w-5 md:h-5 text-gray-500 hover:,text-red-500" /> */}
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {files.length > 0 && (
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
          {files.length} file{files.length !== 1 ? "s" : ""} • {formatFileSize(totalSize)} /{" "}
          {formatFileSize(MAX_TOTAL_SIZE)}
        </p>
      )}

      {/* Extracted text preview panel (single or multi-file with indicators) */}
      {showPreviewPanel && hasValidFiles && (
        <AnimatePresence>
          <DocumentPreviewPanel
            key="document-preview-panel"
            files={files
              .filter((f) => f.status !== "error")
              .map((f) => ({
                id: f.id,
                fileName: f.file.name,
                text: f.extractedText ?? "",
                isLoading: f.extractionStatus === "extracting",
                error: f.extractionError,
              }))}
            onClose={() => setShowPreviewPanel(false)}
            className="mt-4"
          />
        </AnimatePresence>
      )}
      {error && <ErrorFeedback className="mt-4" message={error} />}
      {files.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-3 items-center">
          <Button
            className="bg-blue-600 shadow shadow-blue-600/30 border-none text-white w-full sm:flex-1"
            size="analyze"
            // disabled={!hasValidFiles}
            onClick={runExtractionAndShowPreview}
          >
            <span>Preview Document</span>
            <EyeIconFilled color="white" />
          </Button>
          <Button
            className="bg-blue-600 shadow shadow-blue-600/30 border-none text-white w-full sm:flex-1"
            size="analyze"
            // disabled={!hasValidFiles}
            onClick={handleAnalyzeDocument}
            isLoading={isLoading}
            showSpinner
          >
            <span>Analyze Document</span>
            <PlayIconFilled color="white" />
          </Button>
        </div>
      )}
      {files.length > 0 && (
        <Button
          type="button"
          variant="outline"
          className="rounded-full font-semibold text-sm w-full mt-4 text-gray-500"
          onClick={handleReset}
        >
          <TrashIcon color="#6a7282" />
          Clear all
        </Button>
      )}
    </InputMethodTemplate>
  );
};

export default UploadDocument;
