"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MicrophoneIcon } from "@/assets/svg/MicrophoneIcon";
import { ArrowLeftIcon } from "@/assets/svg/ArrowLeftIcon";
import { SendIcon } from "@/assets/svg/SendIcon";
import { SendIconFilled } from "@/assets/svg/SendIconFilled";

interface SpeechRecognitionEventLike {
  resultIndex: number;
  results: {
    length: number;
    item?(index: number): {
      isFinal: boolean;
      length: number;
      0?: { transcript: string };
      item?(i: number): { transcript: string };
    };
    [i: number]: { isFinal: boolean; 0?: { transcript: string }; length: number };
  };
}

type SpeechRecognitionInstance = {
  start(): void;
  stop(): void;
  abort(): void;
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
};

const getSpeechRecognition = (): (new () => SpeechRecognitionInstance) | null => {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
};

export interface SpeechToTextInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  placeholder?: string;
  disabled?: boolean;
}

export const SpeechToTextInput: React.FC<SpeechToTextInputProps> = ({
  value,
  onChange,
  onSend,
  placeholder = "Ask Qlarety about this document...",
  disabled = false,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState("");
  const [recognitionError, setRecognitionError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const liveTranscriptRef = useRef("");

  const stopRecording = useCallback(() => {
    const rec = recognitionRef.current;
    if (rec) {
      try {
        rec.stop();
      } catch {
        // already stopped
      }
      recognitionRef.current = null;
    }
    setIsRecording(false);
  }, []);

  const startRecording = useCallback(() => {
    const SpeechRecognitionAPI = getSpeechRecognition();
    if (!SpeechRecognitionAPI) {
      setRecognitionError("Speech recognition is not supported in this browser.");
      return;
    }
    setRecognitionError(null);
    setLiveTranscript("");
    const rec = new SpeechRecognitionAPI();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = "en-US";

    rec.onresult = (event: SpeechRecognitionEventLike) => {
      let interim = "";
      let final = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const text = (result[0]?.transcript ?? "") as string;
        if (result.isFinal) final += text;
        else interim += text;
      }
      setLiveTranscript((prev) => {
        const base = prev;
        const next = final
          ? base + final + (interim ? " " + interim : "")
          : base + (interim ? (base ? " " : "") + interim : "");
        liveTranscriptRef.current = next;
        return next;
      });
    };

    rec.onerror = (event: { error: string }) => {
      if (event.error === "not-allowed") {
        setRecognitionError("Microphone access was denied.");
      } else if (event.error !== "aborted") {
        setRecognitionError("Speech recognition error. Try again.");
      }
      setIsRecording(false);
      recognitionRef.current = null;
    };

    rec.onend = () => {
      if (recognitionRef.current === rec) {
        recognitionRef.current = null;
        setIsRecording(false);
      }
    };

    try {
      rec.start();
      recognitionRef.current = rec;
      setIsRecording(true);
    } catch {
      setRecognitionError("Could not start microphone.");
      setIsRecording(false);
    }
  }, []);

  const toggleRecording = useCallback(() => {
    if (isRecording) {
      stopRecording();
      const captured = liveTranscriptRef.current;
      onChange(value.trim() ? `${value.trim()} ${captured}` : captured);
      liveTranscriptRef.current = "";
    } else {
      liveTranscriptRef.current = "";
      startRecording();
    }
  }, [isRecording, value, onChange, startRecording, stopRecording]);

  useEffect(() => {
    return () => {
      const rec = recognitionRef.current;
      if (rec) {
        try {
          rec.abort();
        } catch {
          // ignore
        }
        recognitionRef.current = null;
      }
    };
  }, []);

  return (
    <>
      {recognitionError && <p className="text-xs text-red-600 mb-2">{recognitionError}</p>}
      <div className="fledx gap-2 border border-gray-200 min-h-[80px] rounded-3xl bg-zinc-100/50 p-2 sm:p-3">
        <AnimatePresence mode="wait">
          {isRecording ? (
            <motion.div
              key="recording"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 w-full flex flex-col justify-center min-h-[44px] px-2"
            >
              <div className="flex items-center gap-2 text-red-600 mb-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                </span>
                <span className="text-xs font-medium">Listening...</span>
              </div>
              <p className="text-sm text-gray-700 whitespace-pre-wrap wrap-break-word min-h-5">
                {liveTranscript || <span className="text-gray-400 italic">Speak now...</span>}
              </p>
            </motion.div>
          ) : (
            <input
              key="input"
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey && value.trim() && !disabled) {
                  e.preventDefault();
                  onSend();
                }
              }}
              placeholder={placeholder}
              className="w-full border-none outline-none bg-transparent focus:outline-none focus:ring-0 text-gray-700 placeholder:text-gray-500 text-sm min-w-0"
              disabled={disabled}
            />
          )}
        </AnimatePresence>
        <div className="flex items-center justify-end shrink-0">
          <div className="flex gap-2 items-center">
            {/* <button
              type="button"
              onClick={toggleRecording}
              disabled={disabled}
              className={`p-[6px] border rounded-full shadow-sm cursor-pointer transition-colors ${
                isRecording
                  ? "border-red-300 bg-red-50 hover:bg-red-100 text-red-600"
                  : "border-gray-300 bg-white hover:bg-gray-200"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
              aria-label={isRecording ? "Stop recording" : "Start voice input"}
            >
              <MicrophoneIcon size={16} color={isRecording ? "#dc2626" : "black"} />
            </button> */}
            <button
              type="button"
              onClick={onSend}
              disabled={!value.trim() || disabled}
              className="p-[8px] rounded-full bg-green-700 text-white shadow-sm hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Send message"
            >
              {/* <ArrowLeftIcon size={16} color="white" className="rotate-90" /> */}
              <SendIconFilled size={18} color="white" className="" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
