"use client";

import React, { useState, useRef } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { RiResetLeftLine } from "react-icons/ri";
import { HiOutlineUpload } from "react-icons/hi";
import { LuScanText } from "react-icons/lu";
import { FaCamera } from "react-icons/fa6";
import { X } from "lucide-react";
import { ErrorFeedback } from "@/components/atoms/form/feedback";
import { AnimatePresence } from "framer-motion";

interface ImageFile {
  file: File;
  preview: string;
  extractedText?: string;
}

interface ImageScannerProps {
  value?: string;
  onChange?: (value: string) => void;
}

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB per file
const MAX_TOTAL_SIZE = 5 * 1024 * 1024; // 5MB total

const ImageScanner = ({ value, onChange }: ImageScannerProps) => {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [extractedText, setExtractedText] = useState<string>(value || "");
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  // Calculate total size of current images
  const getTotalSize = (imageList: ImageFile[]) => {
    return imageList.reduce((total, img) => total + img.file.size, 0);
  };

  // Handle file selection with validation
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setError(null);
    const validFiles: ImageFile[] = [];
    const currentTotalSize = getTotalSize(images);

    for (const file of files) {
      // Check if file is an image
      if (!file.type.startsWith("image/")) {
        setError(`${file.name} is not an image file. Skipping...`);
        continue;
      }

      // Check individual file size
      if (file.size > MAX_FILE_SIZE) {
        setError(`${file.name} exceeds 1MB limit. Skipping...`);
        continue;
      }

      // Check total size
      if (currentTotalSize + file.size > MAX_TOTAL_SIZE) {
        setError(`Adding ${file.name} would exceed 5MB total limit. Skipping...`);
        continue;
      }

      validFiles.push({
        file,
        preview: URL.createObjectURL(file),
      });
    }

    if (validFiles.length > 0) {
      setImages((prev) => [...prev, ...validFiles]);
    }

    // Reset input to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Open file picker
  const handleSelectImage = () => {
    fileInputRef.current?.click();
  };

  // Start camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }, // Use back camera
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (error) {
      console.error("Camera access denied:", error);
      alert("Camera access is required for scanning. Please enable camera permissions.");
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraActive(false);
    }
  };

  // Capture photo from camera
  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(videoRef.current, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const file = new File([blob], `capture-${Date.now()}.jpg`, { type: "image/jpeg" });
            const currentTotalSize = getTotalSize(images);

            // Check file size
            if (file.size > MAX_FILE_SIZE) {
              setError("Captured image exceeds 1MB limit.");
              return;
            }

            // Check total size
            if (currentTotalSize + file.size > MAX_TOTAL_SIZE) {
              setError("Adding this image would exceed 5MB total limit.");
              return;
            }

            setImages((prev) => [
              ...prev,
              {
                file,
                preview: URL.createObjectURL(blob),
              },
            ]);
            stopCamera();
          }
        },
        "image/jpeg",
        0.9
      );
    }
  };

  // Remove an image from the list
  const removeImage = (index: number) => {
    setImages((prev) => {
      const newImages = prev.filter((_, i) => i !== index);
      // Clean up object URLs
      URL.revokeObjectURL(prev[index].preview);
      return newImages;
    });
    setError(null);
  };

  // Extract text from all images
  const extractText = async () => {
    if (images.length === 0) return;

    setIsScanning(true);
    setError(null);
    const extractedTexts: string[] = [];

    try {
      // Process all images sequentially
      for (let i = 0; i < images.length; i++) {
        const imageFile = images[i];
        const formData = new FormData();
        formData.append("image", imageFile.file);

        const response = await fetch("/api/ocr/extract", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (data.success) {
          extractedTexts.push(data.text);
          // Update the image with extracted text
          setImages((prev) =>
            prev.map((img, idx) => (idx === i ? { ...img, extractedText: data.text } : img))
          );
        } else {
          console.error(`OCR failed for ${imageFile.file.name}:`, data.error);
          extractedTexts.push(`[Error extracting text from ${imageFile.file.name}]`);
        }
      }

      // Combine all extracted texts
      const combinedText = extractedTexts.join("\n\n---\n\n");
      setExtractedText(combinedText);
      onChange?.(combinedText);
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while extracting text. Please try again.");
    } finally {
      setIsScanning(false);
    }
  };

  // Reset everything
  const handleReset = () => {
    // Clean up all object URLs
    images.forEach((img) => URL.revokeObjectURL(img.preview));
    setImages([]);
    setExtractedText("");
    onChange?.("");
    setError(null);
    stopCamera();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flesx flsex-col w-full hs-full overflow-scroll">
      <h3 className="text-center my-2 md:my-4 text-sm md:text-base">
        Scan or upload images to extract text from documents (Max 1MB per file, 5MB total)
      </h3>

      {/* File input (hidden) */}
      <input
        type="file"
        accept="image/*"
        multiple
        ref={fileInputRef}
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Error message */}
      <AnimatePresence mode="wait">
        {error && <ErrorFeedback key="error" message={error} />}
      </AnimatePresence>

      {/* File size info */}
      {images.length > 0 && (
        <div className="mb-2 text-xs md:text-sm text-gray-600">
          {images.length} file{images.length !== 1 ? "s" : ""} (
          {(getTotalSize(images) / (1024 * 1024)).toFixed(2)} MB / {MAX_TOTAL_SIZE / (1024 * 1024)}{" "}
          MB)
        </div>
      )}

      {/* Image previews */}
      {images.length > 0 && (
        <div className="mb-3 md:mb-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
          {images.map((imageFile, index) => (
            <div
              key={index}
              className="relative rounded-lg overflow-hidden border border-gray-200 group"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageFile.preview}
                alt={`Preview ${index + 1}`}
                className="w-full h-24 md:h-32 object-cover bg-gray-50"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove image"
              >
                <X size={14} />
              </button>
              {imageFile.extractedText && (
                <div className="absolute bottom-0 left-0 right-0 bg-green-500 text-white text-xs p-1 text-center">
                  ✓ Extracted
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Camera view */}
      {isCameraActive && (
        <div className="mb-3 md:mb-4 rounded-lg overflow-hidden border border-gray-200 relative">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-32 md:h-48 object-cover bg-gray-900"
          />
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
            <Button
              onClick={capturePhoto}
              className="bg-white text-black hover:bg-gray-100 text-xs md:text-sm"
              size="sm"
            >
              <FaCamera className="mr-1 md:mr-2" />
              <span className="hidden sm:inline">Capture</span>
            </Button>
          </div>
        </div>
      )}

      {/* Action buttons for image selection */}
      {images.length === 0 && !isCameraActive && (
        <div className="flex flex-col sm:flex-row gap-2 mb-3 md:mb-4">
          <Button
            onClick={handleSelectImage}
            variant="secondary"
            className="grow rounded-full font-semibold text-sm md:text-md"
          >
            <HiOutlineUpload size={"1rem"} className="mr-1 md:mr-2" />
            <span className="text-xs md:text-base">Select Images</span>
          </Button>
          <Button
            onClick={startCamera}
            variant="secondary"
            className="grow rounded-full font-semibold text-sm md:text-md"
          >
            <LuScanText size={"1rem"} className="mr-1 md:mr-2" />
            <span className="text-xs md:text-base">Use Camera</span>
          </Button>
        </div>
      )}

      {/* Add more images button */}
      {images.length > 0 && !isCameraActive && getTotalSize(images) < MAX_TOTAL_SIZE && (
        <div className="mb-3 md:mb-4">
          <Button
            onClick={handleSelectImage}
            variant="secondary"
            className="w-full rounded-full font-semibold text-sm md:text-md"
            disabled={getTotalSize(images) >= MAX_TOTAL_SIZE}
          >
            <HiOutlineUpload size={"1rem"} className="mr-1 md:mr-2" />
            <span className="text-xs md:text-base">
              Add More Images ({images.length} / {Math.floor(MAX_TOTAL_SIZE / MAX_FILE_SIZE)})
            </span>
          </Button>
        </div>
      )}

      {/* Extract button when images are selected */}
      {images.length > 0 && !isScanning && (
        <div className="mb-3 md:mb-4">
          <Button
            onClick={extractText}
            variant="secondary"
            className="w-full rounded-full font-semibold text-sm md:text-md"
          >
            <LuScanText size={"1rem"} className="mr-1 md:mr-2" />
            <span className="text-xs md:text-base">
              Extract Text from {images.length} Image{images.length !== 1 ? "s" : ""}
            </span>
          </Button>
        </div>
      )}

      {/* Extracted text area */}
      <Textarea
        className="w-full hs-[60%] mb-3 md:mb-4 flex-1 min-h-[150px] md:min-h-[200px] text-sm md:text-base"
        value={isScanning ? "Extracting text..." : extractedText}
        onChange={(e) => {
          setExtractedText(e.target.value);
          onChange?.(e.target.value);
        }}
        placeholder={
          isScanning ? "Extracting text from image..." : "Extracted text will appear here..."
        }
        disabled={isScanning}
      />

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
          disabled={!extractedText || isScanning}
        >
          <HiOutlineUpload size={"1rem"} />
          <span className="hidden sm:inline">Upload</span>
        </Button>
      </div>
    </div>
  );
};

export default ImageScanner;
