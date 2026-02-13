"use client";

import React, { useRef, useState, useCallback } from "react";
import { CameraIconFilled } from "@/assets/svg/CameraIconFilled";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface ImageFile {
  id: string;
  file: File;
  previewUrl: string;
}

interface ImageCaptureProps {
  onImageSelect: (files: File[]) => void;
  onImageRemove?: (imageId: string) => void;
  selectedImages?: ImageFile[];
  disabled?: boolean;
  maxImages?: number;
}

export const ImageCapture: React.FC<ImageCaptureProps> = ({
  onImageSelect,
  onImageRemove,
  selectedImages = [],
  disabled = false,
  maxImages = 10,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = useCallback(
    (files: File[]) => {
      const validFiles: File[] = [];
      const MAX_SIZE = 10 * 1024 * 1024; // 10MB per file

      for (const file of files) {
        // Validate file type
        if (!file.type.startsWith("image/")) {
          continue;
        }

        // Validate file size
        if (file.size > MAX_SIZE) {
          continue;
        }

        // Check max images limit
        if (selectedImages.length + validFiles.length >= maxImages) {
          break;
        }

        validFiles.push(file);
      }

      if (validFiles.length > 0) {
        onImageSelect(validFiles);
      }

      // Reset input to allow selecting the same file again
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [onImageSelect, selectedImages.length, maxImages],
  );

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length > 0) {
        handleFileSelect(files);
      }
    },
    [handleFileSelect],
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) {
        setIsDragging(true);
      }
    },
    [disabled],
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (disabled) return;

      const files = Array.from(e.dataTransfer.files || []);
      if (files.length > 0) {
        handleFileSelect(files);
      }
    },
    [disabled, handleFileSelect],
  );

  const handleCameraClick = useCallback(() => {
    if (disabled) return;
    fileInputRef.current?.click();
  }, [disabled]);

  const handleRemoveImage = useCallback(
    (imageId: string) => {
      onImageRemove?.(imageId);
    },
    [onImageRemove],
  );

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
        disabled={disabled}
        multiple
        capture="environment" // Prefer rear camera on mobile
      />

      {/* Selected Images Grid */}
      {selectedImages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          {selectedImages.map((image) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative rounded-xl overflow-hidden border-2 border-primary-green"
            >
              <img
                src={image.previewUrl}
                alt={image.file.name}
                className="w-full h-32 object-cover bg-gray-50"
              />
              <button
                onClick={() => handleRemoveImage(image.id)}
                disabled={disabled}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-lg transition-colors disabled:opacity-50"
                aria-label="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-1.5 text-xs truncate">
                {image.file.name}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {selectedImages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 w-full border-dashed rounded-xl p-12 bg-gray-50 dark:bg-gray-900/50 flex flex-col items-center justify-center gap-4 cursor-pointer transition-colors ${
              isDragging
                ? "border-primary-green bg-primary-green/10"
                : "border-primary-green hover:border-green-500"
            } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={handleCameraClick}
          >
            <div className="w-16 h-16 bg-green-600 dark:bg-green-600 rounded-full flex items-center justify-center">
              <CameraIconFilled className="" size={20} color="white" />
            </div>
            <div className="text-center">
              <p className="text-sm md:text-base lg:text-lg font-semibold text-gray-900 dark:text-white">
                {isDragging ? "Drop image here" : "Take a photo or upload an image"}
              </p>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">
                Supports JPG, PNG, and other image formats
              </p>
            </div>
            <Button
              type="button"
              disabled={disabled}
              className="bg-green-600 hover:bg-green-600 text-white border-none px-8 py-3 rounded-full font-semibold transition-colors disabled:opacity-50"
            >
              {isDragging ? "Drop Image" : "Open Camera"}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
