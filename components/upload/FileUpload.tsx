"use client";

import React, { useState, useRef, useCallback } from "react";
import { Button } from "../ui/button";
import { RiResetLeftLine } from "react-icons/ri";
import { HiOutlineUpload } from "react-icons/hi";
import { MdDeleteOutline, MdCheckCircle } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

interface UploadedFile {
  id: string;
  file: File;
  status: "pending" | "uploading" | "success" | "error";
  error?: string;
}

interface FileUploadProps {
  onFilesChange?: (files: File[]) => void;
}

const ACCEPTED_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
  "application/msword", // DOC
  "text/markdown",
  "text/plain",
  "application/vnd.oasis.opendocument.text", // ODT
  "text/html",
  "application/epub+zip", // EPUB
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

const FileUpload = ({ onFilesChange }: FileUploadProps) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    // Check file type
    const isValidType =
      ACCEPTED_TYPES.includes(file.type) ||
      ACCEPTED_EXTENSIONS.some((ext) => file.name.toLowerCase().endsWith(ext));

    if (!isValidType) {
      return `File type not supported. Accepted: PDF, DOCX, MD, ODT, HTML, EPUB, RTF, TXT`;
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return `File size exceeds ${MAX_FILE_SIZE / (1024 * 1024)}MB limit`;
    }

    return null;
  };

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
    [files, onFilesChange]
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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
    onFilesChange?.([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const totalSize = files.reduce((sum, f) => sum + f.file.size, 0);

  return (
    <div className="flex flex-col w-full h-full">
      <h3 className="text-center my-2 md:my-4 text-sm md:text-base">
        Upload documents in PDF, DOCX, MD, ODT, HTML, EPUB, RTF, or TXT formats
      </h3>

      {/* File input (hidden) */}
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
        className={`mb-3 md:mb-4 border-2 border-dashed rounded-lg p-6 md:p-8 text-center cursor-pointer transition-colors ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-gray-300 hover:border-primary/50 hover:bg-gray-50"
        }`}
      >
        <HiOutlineUpload className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-2 text-gray-400" />
        <p className="text-sm md:text-base text-gray-600 mb-1">
          Drag and drop files here, or click to select
        </p>
        <p className="text-xs md:text-sm text-gray-400">
          Max {MAX_FILE_SIZE / (1024 * 1024)}MB per file, {MAX_TOTAL_SIZE / (1024 * 1024)}MB total
        </p>
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div className="mb-3 md:mb-4 space-y-2 max-h-[200px] md:max-h-[250px] overflow-y-auto">
          <AnimatePresence>
            {files.map((uploadedFile) => (
              <motion.div
                key={uploadedFile.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={`flex items-center justify-between p-2 md:p-3 rounded-lg border ${
                  uploadedFile.status === "error"
                    ? "bg-red-50 border-red-200"
                    : uploadedFile.status === "success"
                    ? "bg-green-50 border-green-200"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                  {uploadedFile.status === "success" ? (
                    <MdCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  ) : uploadedFile.status === "error" ? (
                    <MdDeleteOutline className="w-5 h-5 text-red-500 flex-shrink-0" />
                  ) : (
                    <HiOutlineUpload className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-xs md:text-sm font-medium truncate ${
                        uploadedFile.status === "error" ? "text-red-700" : "text-gray-700"
                      }`}
                    >
                      {uploadedFile.file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(uploadedFile.file.size)}
                      {uploadedFile.error && (
                        <span className="text-red-500 ml-2">• {uploadedFile.error}</span>
                      )}
                    </p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(uploadedFile.id);
                  }}
                  className="ml-2 p-1 hover:bg-gray-200 rounded transition-colors flex-shrink-0"
                >
                  <MdDeleteOutline className="w-4 h-4 md:w-5 md:h-5 text-gray-500 hover:text-red-500" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* File count and size info */}
      {files.length > 0 && (
        <div className="mb-3 md:mb-4 text-xs md:text-sm text-gray-500 text-center">
          {files.length} file{files.length !== 1 ? "s" : ""} • {formatFileSize(totalSize)} /{" "}
          {formatFileSize(MAX_TOTAL_SIZE)}
        </div>
      )}

      {/* Bottom action buttons */}
      <div className="flex gap-2 md:gap-4">
        <Button
          className="grow rounded-full font-semibold text-xs md:text-md bg-gray-800 border-none"
          onClick={handleReset}
        >
          <RiResetLeftLine className="text-sm md:text-base" />
          <span className="hidden sm:inline">Reset</span>
        </Button>
        <Button
          variant="secondary"
          className="grow rounded-full font-semibold text-xs md:text-md"
          disabled={files.length === 0 || files.some((f) => f.status === "error")}
        >
          <HiOutlineUpload size={"1rem"} />
          <span className="hidden sm:inline">Upload</span>
        </Button>
      </div>
    </div>
  );
};

export default FileUpload;
