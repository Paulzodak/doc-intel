"use client";

import React, { useState, useCallback, useEffect } from "react";
import InputMethodTemplate from "./InputMethodTemplate";
import { CameraIconFilled } from "@/assets/svg/CameraIconFilled";
import { ImageCapture, ImageFile } from "./ocr/ImageCapture";
import { OCRProcessor } from "./ocr/OCRProcessor";
import { OCRResult } from "./ocr/OCRResult";
import { useTesseractOCR } from "@/hooks/useTesseractOCR";
import ErrorFeedback from "../atoms/form/feedback/ErrorFeedback";

interface ScanOCRProps {
  isExpanded: boolean;
  onClick: () => void;
}

const ScanOCR = ({ isExpanded, onClick }: ScanOCRProps) => {
  const [selectedImages, setSelectedImages] = useState<ImageFile[]>([]);

  const {
    processImages,
    isProcessing,
    progress,
    extractedText,
    error: ocrError,
    reset: resetOCR,
  } = useTesseractOCR({
    onComplete: (text) => {
      console.log("OCR completed:", text);
    },
    onError: (error) => {
      console.error("OCR error:", error);
    },
  });

  const features = [
    { name: "Text Recognition" },
    { name: "Handwriting Support" },
    { name: "Multi-File Processing" },
  ];

  // Handle image selection
  const handleImageSelect = useCallback(
    (files: File[]) => {
      // Create ImageFile objects with preview URLs
      const newImages: ImageFile[] = files.map((file) => ({
        id: `${Date.now()}-${Math.random()}`,
        file,
        previewUrl: URL.createObjectURL(file),
      }));

      setSelectedImages((prev) => {
        const updated = [...prev, ...newImages];
        // Automatically start OCR processing when images are added
        if (updated.length > 0 && !isProcessing) {
          const imageFiles = updated.map((img) => img.file);
          processImages(imageFiles);
        }
        return updated;
      });
    },
    [processImages, isProcessing],
  );

  // Handle image removal
  const handleImageRemove = useCallback(
    (imageId: string) => {
      setSelectedImages((prev) => {
        const imageToRemove = prev.find((img) => img.id === imageId);
        if (imageToRemove) {
          URL.revokeObjectURL(imageToRemove.previewUrl);
        }
        const updated = prev.filter((img) => img.id !== imageId);

        // If images remain, reprocess them
        if (updated.length > 0 && !isProcessing) {
          const imageFiles = updated.map((img) => img.file);
          processImages(imageFiles);
        } else if (updated.length === 0) {
          resetOCR();
        }

        return updated;
      });
    },
    [processImages, isProcessing, resetOCR],
  );

  // Handle text edit
  const handleTextEdit = useCallback((text: string) => {
    // Text is managed by OCRResult component
    console.log("Text edited:", text);
  }, []);

  // Handle process document
  const handleProcessDocument = useCallback((text: string) => {
    // This will be handled by OCRResult component via useDocumentUpload
    console.log("Processing document with text:", text);
  }, []);

  // Handle reset
  const handleReset = useCallback(() => {
    // Clean up all preview URLs
    selectedImages.forEach((image) => {
      URL.revokeObjectURL(image.previewUrl);
    });
    setSelectedImages([]);
    resetOCR();
  }, [selectedImages, resetOCR]);

  // Cleanup preview URLs on unmount
  useEffect(() => {
    return () => {
      selectedImages.forEach((image) => {
        URL.revokeObjectURL(image.previewUrl);
      });
    };
  }, [selectedImages]);

  return (
    <InputMethodTemplate
      isExpanded={isExpanded}
      onClick={onClick}
      methodNumber="METHOD 02"
      icon={<CameraIconFilled className="" size={20} color="#008000" />}
      title="Scan via OCR"
      description="Snap or upload a photo for high-precision text recognition using Tesseract OCR."
      featuresTitle="OCR Features"
      features={features}
      colorScheme="green"
      collapsedButtonText="Open Camera"
    >
      <div className="space-y-6">
        {/* Image Capture Component */}
        <ImageCapture
          onImageSelect={handleImageSelect}
          onImageRemove={handleImageRemove}
          selectedImages={selectedImages}
          disabled={isProcessing}
          maxImages={10}
        />

        {/* OCR Processing Progress */}
        <OCRProcessor progress={progress} isProcessing={isProcessing} />

        {/* Error Display */}
        {ocrError && <ErrorFeedback message={ocrError} />}

        {/* OCR Result */}
        {extractedText && (
          <OCRResult
            extractedText={extractedText}
            onEdit={handleTextEdit}
            onProcess={handleProcessDocument}
            onReset={handleReset}
          />
        )}
      </div>
    </InputMethodTemplate>
  );
};

export default ScanOCR;
