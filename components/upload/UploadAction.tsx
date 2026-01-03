"use client";

import React, { useState, useEffect, useRef } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { RiResetLeftLine } from "react-icons/ri";
import { HiOutlineUpload } from "react-icons/hi";
import type { DocumentAnalysis } from "@/types/analysis";
import { createSocketConnection, disconnectSocket } from "@/lib/socket";
import type { Socket } from "socket.io-client";
import { useProcessDocument } from "@/data/document";
import { ProcessDocumentResponse } from "@/types/document";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { clearTextInput, setError, setLoading } from "@/redux/slices/document/input.slice";
import { useRouter } from "next/navigation";
import { useDocumentNames } from "@/hooks/useDocumentNames";
import ErrorFeedback from "../atoms/form/feedback/ErrorFeedback";

const UploadAction = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { setDocumentName } = useDocumentNames();
  const [error, setError] = useState<string | null>(null);
  const [percentage, setPercentage] = useState(0);
  const [jobId, setJobId] = useState<string | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const text = useSelector((state: RootState) => state.documentInput.text);
  console.log("text", text);
  const isLoading = useSelector((state: RootState) => state.documentInput.isLoading);

  const { mutate: processTextMutation } = useProcessDocument({
    onSuccess: (response: ProcessDocumentResponse) => {
      console.log(response);
      setJobId(response?.jobId);
      connectToSocket(response?.jobId);
      // if (response.success && response.data) {
      //   // Start socket connection for progress updates if status is processing
      //   if (response.data.status === "processing") {
      //     setIsProcessing(true);
      //     // Connect to socket.io for real-time progress updates
      //     connectToSocket(response.data.analysis_id);
      //   } else if (response.data.status === "completed") {
      //     setIsProcessing(false);
      //     setPercentage(100);
      //     // Fetch the completed analysis
      //     fetchAnalysisResults(response.data.analysis_id);
      //   }
      // }
    },
    onError: () => {
      dispatch(setLoading(false));
      setPercentage(0);
      // Clean up socket if it exists
      if (socketRef.current) {
        disconnectSocket(socketRef.current);
        socketRef.current = null;
      }
    },
  });

  const setIsLoading = (loading: boolean) => {
    dispatch(setLoading(loading));
  };
  // Connect to socket.io and listen for progress updates
  const connectToSocket = (jobId: string) => {
    if (!jobId) return;
    // Clean up any existing socket connection
    if (socketRef.current) {
      disconnectSocket(socketRef.current);
      socketRef.current = null;
    }
    console.log(jobId);
    // Create new socket connection
    const socket = createSocketConnection(jobId);
    socketRef.current = socket;

    // Listen for progress updates
    socket.on(
      "progress",
      (data: { progress: number; status?: string; statusText?: string; message?: string }) => {
        const statusText = data.statusText?.toLowerCase() || "";
        // socket.on(`job:${jobId}`, (data: { progress: number; status?: string }) => {
        console.log("Progress update:", data);
        const progress = data.progress || 0;
        setPercentage(progress);

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
          disconnectSocket(socket);
          socketRef.current = null;
        }
        if (!data.status) {
          setError(data.message || "");
          setIsLoading(false);
          setPercentage(0);
          disconnectSocket(socket);
          socketRef.current = null;
        }
      }
    );

    // Listen for analysis completion
    socket.on("analysis_complete", (data: { analysis_id: string; analysis?: DocumentAnalysis }) => {
      setIsLoading(false);
      setPercentage(100);

      if (data.analysis) {
        // onAnalysisComplete?.(data.analysis);
      } else {
        // Fetch the completed analysis if not included in the event
      }

      disconnectSocket(socket);
      socketRef.current = null;
    });

    // Listen for errors
    socket.on("error", (error: { message: string }) => {
      console.error("Socket error:", error);
      setIsLoading(false);
      setPercentage(0);
      disconnectSocket(socket);
      socketRef.current = null;
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
    });
  };

  // Handle text processing
  const handleProcessText = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setError(null);
    setPercentage(0);

    processTextMutation({
      text: text,
      options: {
        include_highlights: true,
        include_grading: true,
        analysis_type: "full",
      },
    });
  };

  // Handle reset
  const handleReset = () => {
    dispatch(clearTextInput());
    setPercentage(0);
    setIsLoading(false);
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

  return (
    <div>
      {error && <ErrorFeedback key="error" message={error || ""} />}
      <div className="flex gap-2 md:gap-4">
        <Button
          onClick={handleReset}
          disabled={isLoading}
          className="grow rounded-full font-semibold text-xs md:text-md bg-gray-800 border-none"
        >
          <RiResetLeftLine className="text-sm md:text-base" />
          <span className="hidden sm:inline">Reset</span>
        </Button>
        <Button
          variant="secondary"
          className="grow rounded-full font-semibold text-xs md:text-md"
          onClick={handleProcessText}
          isLoading={isLoading}
          loadingPercentage={percentage}
          showLiquid={isLoading}
          showSpinner={isLoading}
          disabled={isLoading}
        >
          <HiOutlineUpload size={"1rem"} />
          <span className="hidden sm:inline">{isLoading ? "Processing..." : "Process Text"}</span>
        </Button>
      </div>
    </div>
  );
};

export default UploadAction;
