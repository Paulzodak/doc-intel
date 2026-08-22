"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "@/assets/svg/ArrowLeftIcon";

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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  useEffect(() => {
    const el = textareaRef.current;
    if (!el || isRecording) return;
    el.style.height = "0px";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, [value, isRecording]);

  // Keep startRecording referenced so speech API stays available for future mic UI
  void startRecording;
  void stopRecording;

  return (
    <div className="mt-auto w-full">
      {recognitionError && (
        <p className="mb-2 text-center text-xs text-red-600">{recognitionError}</p>
      )}
      <div className="relative rounded-[1.35rem] border border-[#1e2939]/10 bg-white/90 p-2 shadow-[0_12px_40px_rgba(17,22,31,0.08)] backdrop-blur-md dark:border-white/10 dark:bg-[#11161f]/90">
        <div className="flex items-end gap-2">
          <AnimatePresence mode="wait">
            {isRecording ? (
              <motion.div
                key="recording"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex min-h-[44px] flex-1 flex-col justify-center px-3 py-2"
              >
                <div className="mb-1 flex items-center gap-2 text-red-600">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                  </span>
                  <span className="text-xs font-medium">Listening...</span>
                </div>
                <p className="min-h-5 wrap-break-word whitespace-pre-wrap text-sm text-gray-700">
                  {liveTranscript || <span className="italic text-gray-400">Speak now...</span>}
                </p>
              </motion.div>
            ) : (
              <textarea
                key="input"
                ref={textareaRef}
                rows={1}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey && value.trim() && !disabled) {
                    e.preventDefault();
                    onSend();
                  }
                }}
                placeholder={placeholder}
                className="max-h-[120px] min-h-[44px] flex-1 resize-none bg-transparent px-3 py-2.5 text-sm text-[#11161f] outline-none placeholder:text-gray-400 disabled:opacity-60 dark:text-white"
                disabled={disabled}
              />
            )}
          </AnimatePresence>
          <Button
            type="button"
            variant="primary-green"
            size="sm"
            onClick={onSend}
            disabled={!value.trim() || disabled || isRecording}
            className="shrink-0"
            aria-label="Send message"
          >
            Send
            <ArrowLeftIcon size={14} className="rotate-180" />
          </Button>
        </div>
        <p className="px-3 pb-1 text-[10px] text-gray-400">
          Enter to send · Shift+Enter for a new line · About this document only
        </p>
      </div>
    </div>
  );
};
