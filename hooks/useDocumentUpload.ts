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
  const [error, setErrorState] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  console.log(error, "error");
  const [percentage, setPercentage] = useState(0);
  console.log(percentage, "percentage");
  const [jobId, setJobId] = useState<string | null>(null);
  const socketRef = useRef<Socket | null>(null);

  // const text = useSelector((state: RootState) => state.documentInput.text);
  const isLoading = useSelector((state: RootState) => state.documentInput.isLoading);

  const setIsLoading = (loading: boolean) => {
    dispatch(setLoading(loading));
  };

  const { mutateAsync: processTextMutation } = useProcessDocument({
    onSuccess: (response: ProcessDocumentResponse) => {
      const responseJobId = response?.jobId;
      setJobId(responseJobId);
      connectToSocket(responseJobId);
      options?.onSuccess?.(responseJobId);
    },
    onError: (error) => {
      dispatch(setLoading(false));
      setPercentage(0);
      console.log(error);
      const errorMessage = error.response?.data?.message ?? "An error occurred";
      setErrorState(errorMessage);
      options?.onError?.(errorMessage);

      // Clean up socket if it exists
      if (socketRef.current) {
        disconnectSocket(socketRef.current, jobId || "");
        socketRef.current = null;
      }
    },
  });

  // Connect to socket.io and listen for progress updates
  const connectToSocket = (jobId: string) => {
    const socket = createSocketConnection(jobId);
    if (!jobId) return;

    // Clean up any existing socket connection
    if (socketRef.current) {
      disconnectSocket(socketRef.current, jobId || "");
      socketRef.current = null;
    }

    // Create new socket connection
    socketRef.current = socket;

    // Listen for progress updates
    socket.on(
      "progress",
      (data: {
        percentage: number;
        status?: string;
        statusText?: string;
        message?: string;
        step: number;
      }) => {
        const statusText = data.statusText?.toLowerCase() || "";

        setPercentage(data.percentage);
        options?.onProgress?.(percentage);
        setCurrentStep(data.step);
        if (statusText === "completed") {
          setIsLoading(false);
          setPercentage(100);
          setCurrentStep(data.step);
          disconnectSocket(socket, jobId || "");
          socketRef.current = null;

          router.push(`/doc/${jobId}`);
        }

        if (statusText === "failed") {
          setIsLoading(false);
          setPercentage(0);
          setErrorState("Processing failed");
          disconnectSocket(socket, jobId || "");
          socketRef.current = null;
          options?.onError?.("Processing failed");
        }

        if (!data.status) {
          const errorMessage = data.message || "An error occurred";
          setErrorState(errorMessage);
          setIsLoading(false);
          setPercentage(0);
          disconnectSocket(socket, jobId || "");
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
      disconnectSocket(socket, jobId || "");
      socketRef.current = null;
    });

    // Listen for errors
    socket.on("error", (error: { message: string }) => {
      console.error("Socket error:", error);
      setIsLoading(false);
      setPercentage(0);
      setErrorState(error.message || "Socket error occurred");
      disconnectSocket(socket, jobId || "");
      socketRef.current = null;
      options?.onError?.(error.message || "Socket error occurred");
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      socket.emit("join-job", jobId);
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
    // if (isLoading || !text) return;

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
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        setErrorState(error?.response?.data?.message || "An error occurred");
      });
  };

  // Handle reset
  const reset = () => {
    dispatch(clearTextInput());
    setPercentage(0);
    setIsLoading(false);
    setErrorState(null);
    setJobId(null);

    console.log("stopping the process");
    // Clean up socket connection on reset
    if (socketRef.current) {
      console.log("disconnecting the socket");
      try {
        disconnectSocket(socketRef.current, jobId || "");
        socketRef.current = null;
      } catch (error) {
        console.error("Error disconnecting socket:", error);
      }
    }
  };

  // Cleanup socket on unmount
  useEffect(() => {
    return () => {
      if (socketRef.current) {
        disconnectSocket(socketRef.current, jobId || "");
        socketRef.current = null;
      }
    };
  }, []);

  return {
    // State
    error,
    percentage,
    currentStep,
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
