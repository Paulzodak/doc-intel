"use client";

import { useState, useCallback, useRef } from "react";
import { createWorker } from "tesseract.js";
import { useSelector } from "react-redux";
import { selectLanguage } from "@/redux/slices/document/input.slice";
import { useCleanText } from "@/data/document";

export interface OCRProgress {
  status: string;
  progress: number;
}

export interface UseTesseractOCROptions {
  onProgress?: (progress: OCRProgress) => void;
  onComplete?: (text: string) => void;
  onError?: (error: string) => void;
}

// Global progress handler map to avoid closure issues
const progressHandlers = new Map<string, (progress: OCRProgress) => void>();
let handlerIdCounter = 0;

export const useTesseractOCR = (options?: UseTesseractOCROptions) => {
  const { mutateAsync, isPaused, isError, isSuccess } = useCleanText();
  const selectedLanguage = useSelector(selectLanguage);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<OCRProgress>({
    status: "",
    progress: 0,
  });
  const [extractedText, setExtractedText] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Use refs to store callbacks to avoid closure issues
  const onProgressRef = useRef(options?.onProgress);
  const onCompleteRef = useRef(options?.onComplete);
  const onErrorRef = useRef(options?.onError);

  // Update refs when options change
  if (options?.onProgress !== onProgressRef.current) {
    onProgressRef.current = options?.onProgress;
  }
  if (options?.onComplete !== onCompleteRef.current) {
    onCompleteRef.current = options?.onComplete;
  }
  if (options?.onError !== onErrorRef.current) {
    onErrorRef.current = options?.onError;
  }

  // Helper function to process a single image (not wrapped in useCallback to avoid dependency issues)
  const processSingleImage = async (
    imageFile: File | string,
    worker: Awaited<ReturnType<typeof createWorker>>,
    handlerId: string,
    imageIndex: number,
    totalImages: number,
  ): Promise<string> => {
    const handler = progressHandlers.get(handlerId);

    // Update progress for this image
    if (handler) {
      const baseProgress = imageIndex / totalImages;
      handler({
        status: `Recognizing text from image ${imageIndex + 1} of ${totalImages}...`,
        progress: baseProgress + 0.1,
      });
    }

    // Perform OCR
    const result = await worker.recognize(imageFile);
    const response = await mutateAsync({ text: result.data.text });
    if (response.text) {
      return response.text;
    } else {
      throw new Error(response.message);
    }

    console.log(result, "text from worker");
    const text = result.data.text;

    return text;
  };

  const processImages = useCallback(
    async (imageFiles: (File | string)[]) => {
      if (isProcessing || imageFiles.length === 0) return;

      setIsProcessing(true);
      setError(null);
      setProgress({ status: "Initializing...", progress: 0 });
      setExtractedText("");

      // Generate a unique handler ID for this OCR operation
      const handlerId = `ocr-${++handlerIdCounter}`;

      // Register progress handler in global map
      progressHandlers.set(handlerId, (progressData: OCRProgress) => {
        setProgress(progressData);
        if (onProgressRef.current) {
          try {
            onProgressRef.current(progressData);
          } catch (e) {
            console.warn("Error in progress callback:", e);
          }
        }
      });

      try {
        // Use language from Redux store
        const languageString = selectedLanguage || "eng";

        const worker = await createWorker(languageString);

        const handler = progressHandlers.get(handlerId);
        if (handler) {
          handler({ status: "Loading language data...", progress: 0.1 });
        }

        // Process all images sequentially
        const extractedTexts: string[] = [];
        const totalImages = imageFiles.length;

        for (let i = 0; i < imageFiles.length; i++) {
          const imageFile = imageFiles[i];

          // Calculate progress based on current image
          const baseProgress = i / totalImages;
          const imageProgress = baseProgress + (1 / totalImages) * 0.8; // Use 80% of image's progress range

          if (handler) {
            handler({
              status: `Processing image ${i + 1} of ${totalImages}...`,
              progress: imageProgress,
            });
          }

          try {
            const text = await processSingleImage(imageFile, worker, handlerId, i, totalImages);
            extractedTexts.push(text);
          } catch (err) {
            console.error(`Error processing image ${i + 1}:`, err);
            extractedTexts.push(`[Error extracting text from image ${i + 1}]`);
          }
        }

        // Combine all extracted texts with separators
        const combinedText = extractedTexts
          .map((text, index) => {
            if (index === 0) return text;
            // return `\n\n--- Image ${index + 1} ---\n\n${text}`;
            return `${text}`;
          })
          .join("");

        // Clean up handler
        progressHandlers.delete(handlerId);

        // Clean up worker
        await worker.terminate();

        if (handler) {
          handler({ status: "Completed", progress: 1 });
        }

        setExtractedText(combinedText);

        if (onCompleteRef.current) {
          try {
            onCompleteRef.current(combinedText);
          } catch (e) {
            console.warn("Error in complete callback:", e);
          }
        }
      } catch (err) {
        // Clean up handler on error
        progressHandlers.delete(handlerId);

        const errorMessage = err instanceof Error ? err.message : "Failed to process images";
        setError(errorMessage);
        setProgress({ status: "Error", progress: 0 });

        if (onErrorRef.current) {
          onErrorRef.current(errorMessage);
        }
      } finally {
        setIsProcessing(false);
      }
    },
    [isProcessing, selectedLanguage],
  );

  const processImage = useCallback(
    async (imageFile: File | string) => {
      return processImages([imageFile]);
    },
    [processImages],
  );

  const reset = useCallback(() => {
    setIsProcessing(false);
    setProgress({ status: "", progress: 0 });
    setExtractedText("");
    setError(null);
  }, []);

  return {
    processImage,
    processImages,
    isProcessing,
    progress,
    extractedText,
    error,
    reset,
  };
};
