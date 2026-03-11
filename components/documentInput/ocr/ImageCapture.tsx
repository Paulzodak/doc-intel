"use client";

import React, { useRef, useState, useCallback } from "react";
import { CameraIconFilled } from "@/assets/svg/CameraIconFilled";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GalleryIcon } from "@/assets/svg/GalleryIcon";
import { GalleryIconFilled } from "@/assets/svg/GalleryIconFilled";

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
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
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
    },
    [onImageSelect, selectedImages.length, maxImages],
  );

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length > 0) {
        handleFileSelect(files);
      }
      e.target.value = "";
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
    cameraInputRef.current?.click();
  }, [disabled]);

  const handleSelectImageClick = useCallback(() => {
    if (disabled) return;
    galleryInputRef.current?.click();
  }, [disabled]);

  const handleRemoveImage = useCallback(
    (imageId: string) => {
      onImageRemove?.(imageId);
    },
    [onImageRemove],
  );

  return (
    <div className="w-full ">
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
        disabled={disabled}
        capture="environment" // Prefer rear camera on mobile
      />
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
        disabled={disabled}
        multiple
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
            className={`border-2 w-full border-dashed rounded-xl p-12 bg-gray-50 dark:bg-gray-900/50 flex flex-col items-center justify-center gap-4 transition-colors ${
              isDragging
                ? "border-primary-green bg-primary-green/10"
                : "border-primary-green hover:border-green-500"
            } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <div className="w-16 h-16 bg-green-600 dark:bg-green-600 rounded-full flex items-center justify-center">
              <CameraIconFilled className="" size={20} color="white" />
            </div>
            <div className="text-center">
              <p className="text-sm md:text-base lg:text-lg font-semibold text-gray-900 dark:text-white">
                {isDragging ? "Drop image here" : "Take a photo or select an image"}
              </p>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">
                Supports JPG, PNG, and other image formats
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm items-center justify-center">
              {/* <Button
                type="button"
                disabled={disabled}
                onClick={handleCameraClick}
                className="bg-green-600 hover:bg-green-600 text-white border-none px-6 py-3 rounded-full font-semibold transition-colors disabled:opacity-50 w-fusll"
              >
                Open Camera
              </Button> */}
              <Button
                type="button"
                disabled={disabled}
                onClick={handleSelectImageClick}
                className="bg-green-600 text-white border border-green-200 hover:border-green-300 px-6 py-3 rounded-full font-semibold transition-colors disabled:opacity-50 ws-full"
              >
                Upload
                <GalleryIconFilled color="white" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
