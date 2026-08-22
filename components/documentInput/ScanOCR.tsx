"use client";

import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import InputMethodTemplate from "./InputMethodTemplate";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, X } from "lucide-react";
import { CameraIconFilled } from "@/assets/svg/CameraIconFilled";
import { EditIcon } from "@/assets/svg/EditIcon";
import { DocumentTextIcon } from "@/assets/svg/DocumentTextIcon";
import { PlayIconFilled } from "@/assets/svg/PlayIconFilled";
import { TrashIcon } from "@/assets/svg/TrashIcon";
import ProcessingIndicator from "./ProcessingIndicator";
import { ImageCapture, ImageFile } from "./ocr/ImageCapture";
import { OCRProcessor } from "./ocr/OCRProcessor";
import { useTesseractOCR } from "@/hooks/useTesseractOCR";
import { useDocumentUpload } from "@/hooks/useDocumentUpload";
import ErrorFeedback from "../atoms/form/feedback/ErrorFeedback";
import { CloseIcon } from "@/assets/svg/CloseIcon";

interface ScanOCRProps {
  isExpanded: boolean;
  onClick: () => void;
}

interface OCRResultProps {
  extractedText: string;
  onEdit?: (text: string) => void;
  onProcess?: (text: string) => void;
  onReset?: () => void;
  setEditedText: (text: string) => void;
  setIsEditing: (isEditing: boolean) => void;
  isEditing: boolean;
  editedText: string;
}

const OCRResult: React.FC<OCRResultProps> = ({
  extractedText,
  onEdit,
  onProcess,
  onReset,
  setIsEditing,
  setEditedText,
  isEditing,
  editedText,
}) => {
  const [copied, setCopied] = useState(false);

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

  if (!extractedText) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full space-y-4 fontkk-jakarta"
    >
      <>
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
                {editedText}
              </pre>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    </motion.div>
  );
};

const ScanOCR = ({ isExpanded, onClick }: ScanOCRProps) => {
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
  const [selectedImages, setSelectedImages] = useState<ImageFile[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(extractedText);
  const { processText, isLoading, error, currentStep, reset } = useDocumentUpload();

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

  const handleProcess = () => {
    const textToProcess = editedText;
    if (textToProcess.trim()) {
      processText(textToProcess);
    }
  };

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

  useEffect(() => {
    setEditedText(extractedText);
  }, [extractedText]);
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
      {!isLoading && !isProcessing && (
        <div className="space-y-6">
          {/* Image Capture Component */}
          <ImageCapture
            onImageSelect={handleImageSelect}
            onImageRemove={handleImageRemove}
            selectedImages={selectedImages}
            disabled={isProcessing}
            maxImages={10}
          />

          {/* Error Display */}
          {ocrError && <ErrorFeedback message={ocrError} />}

          {/* OCR Result */}
          {extractedText && (
            <OCRResult
              setIsEditing={setIsEditing}
              setEditedText={setEditedText}
              isEditing={isEditing}
              editedText={editedText}
              extractedText={extractedText}
              onEdit={handleTextEdit}
              onProcess={handleProcessDocument}
              onReset={handleReset}
            />
          )}
          {error && <ErrorFeedback className="mt-4" key="error" message={error || ""} />}

          {selectedImages.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3 items-center">
              <Button
                className="bg-primarys-green bg-green-600 shadow shadow-primary-green/30 border-none text-white w-full sm:flex-1"
                size="analyze"
                onClick={handleReset}
                disabled={isLoading || !extractedText.trim()}
              >
                <span>Clear</span>
                <TrashIcon color="white" />
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
          )}
        </div>
      )}
      {/* OCR Processing Progress */}
      <OCRProcessor progress={progress} isProcessing={isProcessing} />
      {isLoading && (
        <>
          {" "}
          <ProcessingIndicator completedCount={currentStep} colorScheme="green" />
          <Button
            className="bg-green-600 shadow shadow-green-600/30 border-none text-white w-full sm:flex-1 mt-4"
            size="analyze"
            // disabled={!hasValidFiles}
            onClick={reset}
            isLoading={isLoading}
            showSpinner
          >
            <span>Cancel</span>
            <CloseIcon color="white" />
          </Button>{" "}
        </>
      )}
    </InputMethodTemplate>
  );
};

export default ScanOCR;
