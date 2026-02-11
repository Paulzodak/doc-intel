"use client";

import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import type { Socket } from "socket.io-client";
import { createSocketConnection, disconnectSocket } from "@/lib/socket";
import { useProcessDocument } from "@/data/document";
import { ProcessDocumentResponse } from "@/types/document";
import { RootState } from "@/redux/store";
import { clearTextInput, setLoading } from "@/redux/slices/document/input.slice";
import { useDocumentNames } from "@/hooks/useDocumentNames";

interface UseDocumentUploadOptions {
  onSuccess?: (jobId: string) => void;
  onError?: (error: string) => void;
  onProgress?: (percentage: number) => void;
}

export const useDocumentUpload = (options?: UseDocumentUploadOptions) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { setDocumentName } = useDocumentNames();

  const [error, setErrorState] = useState<string | null>(null);
  const [percentage, setPercentage] = useState(0);
  const [jobId, setJobId] = useState<string | null>(null);
  const socketRef = useRef<Socket | null>(null);

  // const text = useSelector((state: RootState) => state.documentInput.text);
  const isLoading = useSelector((state: RootState) => state.documentInput.isLoading);

  const setIsLoading = (loading: boolean) => {
    dispatch(setLoading(loading));
  };

  const { mutate: processTextMutation } = useProcessDocument({
    onSuccess: (response: ProcessDocumentResponse) => {
      const responseJobId = response?.jobId;
      setJobId(responseJobId);
      connectToSocket(responseJobId);
      options?.onSuccess?.(responseJobId);
    },
    onError: (error) => {
      dispatch(setLoading(false));
      setPercentage(0);
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      setErrorState(errorMessage);
      options?.onError?.(errorMessage);

      // Clean up socket if it exists
      if (socketRef.current) {
        disconnectSocket(socketRef.current);
        socketRef.current = null;
      }
    },
  });

  // Connect to socket.io and listen for progress updates
  const connectToSocket = (jobId: string) => {
    if (!jobId) return;

    // Clean up any existing socket connection
    if (socketRef.current) {
      disconnectSocket(socketRef.current);
      socketRef.current = null;
    }

    // Create new socket connection
    const socket = createSocketConnection(jobId);
    socketRef.current = socket;

    // Listen for progress updates
    socket.on(
      "progress",
      (data: { progress: number; status?: string; statusText?: string; message?: string }) => {
        const statusText = data.statusText?.toLowerCase() || "";
        const progress = data.progress || 0;

        setPercentage(progress);
        options?.onProgress?.(progress);

        if (statusText === "completed") {
          setIsLoading(false);
          setPercentage(100);
          disconnectSocket(socket);
          socketRef.current = null;

          // Auto-name document with jobId when processing completes
          if (jobId) {
            setDocumentName(jobId, `Document ${jobId.slice(0, 8)}`);
          }

          router.push(`/doc/${jobId}`);
        }

        if (statusText === "failed") {
          setIsLoading(false);
          setPercentage(0);
          setErrorState("Processing failed");
          disconnectSocket(socket);
          socketRef.current = null;
          options?.onError?.("Processing failed");
        }

        if (!data.status) {
          const errorMessage = data.message || "An error occurred";
          setErrorState(errorMessage);
          setIsLoading(false);
          setPercentage(0);
          disconnectSocket(socket);
          socketRef.current = null;
          options?.onError?.(errorMessage);
        }
      },
    );

    // Listen for analysis completion
    socket.on("analysis_complete", () => {
      setIsLoading(false);
      setPercentage(100);
      options?.onProgress?.(100);
      disconnectSocket(socket);
      socketRef.current = null;
    });

    // Listen for errors
    socket.on("error", (error: { message: string }) => {
      console.error("Socket error:", error);
      setIsLoading(false);
      setPercentage(0);
      setErrorState(error.message || "Socket error occurred");
      disconnectSocket(socket);
      socketRef.current = null;
      options?.onError?.(error.message || "Socket error occurred");
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("Socket disconnected");
      // Only reset if we're still processing (unexpected disconnect)
      if (isLoading) {
        setIsLoading(false);
        setPercentage(0);
      }
      socketRef.current = null;
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      if (isLoading) {
        setIsLoading(false);
        setPercentage(0);
      }
      setErrorState("Failed to connect to server");
      options?.onError?.("Failed to connect to server");
    });
  };

  // Handle text processing
  const processText = async (text: string) => {
    if (isLoading || !text) return;

    setIsLoading(true);
    setErrorState(null);
    setPercentage(0);

    processTextMutation({
      text: text || "",
      options: {
        include_highlights: true,
        include_grading: true,
        analysis_type: "full",
      },
    });
  };

  // Handle reset
  const reset = () => {
    dispatch(clearTextInput());
    setPercentage(0);
    setIsLoading(false);
    setErrorState(null);
    setJobId(null);

    // Clean up socket connection on reset
    if (socketRef.current) {
      disconnectSocket(socketRef.current);
      socketRef.current = null;
    }
  };

  // Cleanup socket on unmount
  useEffect(() => {
    return () => {
      if (socketRef.current) {
        disconnectSocket(socketRef.current);
        socketRef.current = null;
      }
    };
  }, []);

  return {
    // State
    error,
    percentage,
    jobId,
    isLoading,
    // text,

    // Actions
    processText,
    reset,
    connectToSocket,

    // Utilities
    clearError: () => setErrorState(null),
  };
};
