"use client";

import React, { useState, useRef, useEffect } from "react";
import UploadDocument from "./UploadDocument";
import ScanOCR from "./ScanOCR";
import PasteText from "./PasteText";
import { LockIcon } from "@/assets/svg/LockIcon";
import { DisplayIcon } from "@/assets/svg/DisplayIcon";
import { VerifiedCheckedIcon } from "@/assets/svg/VerifiedCheckedIcon";
import { CaretDownIcon } from "@/assets/svg/CaretDownIcon";
import { AnimatePresence, motion } from "framer-motion";
import { SettingsIcon } from "@/assets/svg/SettingsIcon";
import { PowerIcon } from "@/assets/svg/PowerIcon";
import { ArrowLeftIcon } from "@/assets/svg/ArrowLeftIcon";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage, selectLanguage } from "@/redux/slices/document/input.slice";

type MethodType = "upload" | "scan" | "paste" | null;

const DocumentInput = () => {
  const [expandedMethod, setExpandedMethod] = useState<MethodType>("upload");

  const handleMethodClick = (method: MethodType) => {
    setExpandedMethod(expandedMethod === method ? method : method);
  };

  const trustSignals = [
    { icon: LockIcon, label: "Encrypted" },
    { icon: DisplayIcon, label: "AI insights" },
    { icon: VerifiedCheckedIcon, label: "Legal-grade" },
  ] as const;

  return (
    <section className="relative py-6 sm:py-10 max-w-full">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-8 h-64 w-[28rem] -translate-x-1/2 rounded-full bg-primary-green/10 blur-3xl" />
        <div className="absolute right-[10%] bottom-16 h-40 w-40 rounded-full bg-[#1e2939]/8 blur-2xl" />
      </div>

      <div className="relative mx-auto max-w-[800px]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-5 overflow-hidden rounded-[1.75rem] border border-[#1e2939]/10 bg-gradient-to-br from-[#11161f] via-[#1a2332] to-[#1e2939] px-5 py-5 sm:px-7 sm:py-6"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(71,225,140,0.18) 1px, transparent 0)",
              backgroundSize: "22px 22px",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-primary-green/20 blur-2xl"
          />

          <div className="relative flex flex-col gap-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-md">
                <div className="mb-2 flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-green opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-green" />
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-green/80">
                    Analysis console
                  </span>
                </div>
                <h3 className="font-lora text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  Choose how you bring the document in
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/55">
                  Upload, scan, or paste — then tune the engine before you run analysis.
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-3 self-start sm:self-auto">
                <div className="hidden h-px w-8 bg-gradient-to-r from-transparent to-primary-green/40 sm:block" />
                <div className="rounded-full border border-primary-green/25 bg-primary-green/10 px-3 py-1.5 text-[11px] font-medium tracking-wide text-primary-green">
                  3 input paths
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 border-t border-white/10 pt-4 sm:flex-row sm:flex-wrap sm:items-center">
              <EngineSelector />
              <div className="hidden h-4 w-px bg-white/10 sm:block" />
              <LanguageSelector />
            </div>
          </div>
        </motion.div>

        <div className="relative grid gap-3.5 sm:gap-4">
          <div
            aria-hidden
            className="absolute left-[8%] top-0 -z-10 h-full w-[84%] rounded-[2rem] border border-dashed border-[#1e2939]/12 sm:left-[12%] sm:w-[76%]"
          />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-3.5 sm:gap-4"
          >
            <UploadDocument
              isExpanded={expandedMethod === "upload"}
              onClick={() => handleMethodClick("upload")}
            />
            <ScanOCR
              isExpanded={expandedMethod === "scan"}
              onClick={() => handleMethodClick("scan")}
            />
            <PasteText
              isExpanded={expandedMethod === "paste"}
              onClick={() => handleMethodClick("paste")}
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:gap-x-8"
        >
          {trustSignals.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 text-[#1e2939]/70 dark:text-gray-300"
            >
              <Icon size={16} />
              <span className="text-[11px] font-medium tracking-wide sm:text-xs">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default DocumentInput;

const EngineSelector = () => {
  const [showModelOptions, setShowModelOptions] = useState<boolean>(false);
  const modelOptionsRef = useRef<HTMLDivElement>(null);
  const [selectedModel, setSelectedModel] = useState<number>(4);
  const modelOptions = [
    { id: 1, pro: true, name: "Claude 3.5 Sonnet", description: "200k tokens" },
    { id: 2, pro: true, name: "Claude 4.5 Opus", description: "Antropic's Advanced Model" },
    { id: 3, pro: true, name: "Gemini 2.5 Pro", description: "Google's Advanced Model" },
    { id: 4, pro: false, name: "GPT-4o", description: "OpenAI's Advanced Model" },
    { id: 5, pro: true, name: "GPT-4o-mini", description: "OpenAI's Advanced Model" },
    { id: 6, pro: true, name: "GPT-4o-mini", description: "OpenAI's Advanced Model" },
  ];
  const modelSelected = modelOptions.find((model) => model.id === selectedModel);

  useEffect(() => {
    if (!showModelOptions) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (modelOptionsRef.current && !modelOptionsRef.current.contains(e.target as Node)) {
        setShowModelOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showModelOptions]);

  return (
    <div ref={modelOptionsRef} className="flex items-center relative gap-1 text-gray-100">
      <div className="flex items-center gap-2">
        <PowerIcon color="white" className="w-3 h-3 text-gray-200" />
        <div className="text-sm">Engine</div>
        <ArrowLeftIcon color="white" className="w-3 h-3 text-gray-200 rotate-180" />
      </div>
      <div
        // onClick={() => setShowModelOptions(!showModelOptions)}
        className="flex bg-white/5  rounded-full p-2 px-3 text-gray-200 cursor-not-allowed"
      >
        {modelSelected && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider">{modelSelected.name}</span>
            <CaretDownIcon
              className={`${showModelOptions ? "rotate-180" : ""} transition-all duration-300`}
              color="gray"
            />
          </div>
        )}
      </div>
      <AnimatePresence>
        {showModelOptions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-14 left-0 bg-white border rounded-lg text-gray-500  p-2 grid shadow-lg z-50"
          >
            {modelOptions.map((model) => {
              const isPro = model.pro;
              const isSelected = model.id === selectedModel;
              const handleModelClick = () => {
                if (isPro) return;
                setSelectedModel(model.id);
                setShowModelOptions(false);
              };
              return (
                <div
                  onClick={handleModelClick}
                  key={model.id}
                  className={`hover:bg-gray-100 rounded-lg p-2 px-3 items-center gap-2  relative ${isPro ? "text-gray-400 cursor-not-allowed" : "cursor-pointer"} ${
                    isSelected ? "bg-gray-100" : ""
                  }`}
                >
                  {isPro && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-[7px] font-bold uppercase tracking-wider rounded-full  py-[2px] px-[4px]">
                      Pro
                    </div>
                  )}
                  <div className={`text-xs font-bold uppercase tracking-wider`}>{model.name}</div>
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    {model.description}
                  </span>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const LanguageSelector = () => {
  const dispatch = useDispatch();
  const selectedLanguage = useSelector(selectLanguage);
  const [showLanguageOptions, setShowLanguageOptions] = useState<boolean>(false);
  const languageOptionsRef = useRef<HTMLDivElement>(null);

  const languageOptions = [
    { enabled: true, code: "eng", name: "English", nativeName: "English" },
    { enabled: false, code: "fra", name: "French", nativeName: "Français" },
    { enabled: false, code: "spa", name: "Spanish", nativeName: "Español" },
    { enabled: false, code: "deu", name: "German", nativeName: "Deutsch" },
    { enabled: false, code: "ita", name: "Italian", nativeName: "Italiano" },
    { enabled: false, code: "por", name: "Portuguese", nativeName: "Português" },
  ];

  const languageSelected =
    languageOptions.find((lang) => lang.code === selectedLanguage) || languageOptions[0];

  useEffect(() => {
    if (!showLanguageOptions) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (languageOptionsRef.current && !languageOptionsRef.current.contains(e.target as Node)) {
        setShowLanguageOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showLanguageOptions]);

  return (
    <div ref={languageOptionsRef} className="flex items-center relative gap-1 text-gray-100">
      <div className="flex items-center gap-2">
        <SettingsIcon color="white" className="w-3 h-3 text-gray-200" />
        <div className="text-sm">Language</div>
        <ArrowLeftIcon color="white" className="w-3 h-3 text-gray-200 rotate-180" />
      </div>
      <div
        // onClick={() => setShowLanguageOptions(!showLanguageOptions)}
        className="flex bg-white/5  rounded-full p-2 px-3 text-gray-200 cursor-not-allowed"
      >
        {languageSelected && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider">
              {languageSelected.name}
            </span>
            <CaretDownIcon
              className={`${showLanguageOptions ? "rotate-180" : ""} transition-all duration-300`}
              color="gray"
            />
          </div>
        )}
      </div>
      <AnimatePresence>
        {showLanguageOptions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-14 left-0 bg-white border rounded-lg text-gray-500  p-2 grid shadow-lg z-50 min-w-[200px]"
          >
            {languageOptions.map((language) => {
              const isSelected = language.code === selectedLanguage;
              const isEnabled = language.enabled;
              const handleLanguageClick = () => {
                if (!isEnabled) return;
                dispatch(setLanguage(language.code));
                setShowLanguageOptions(false);
              };
              return (
                <div
                  onClick={handleLanguageClick}
                  key={language.code}
                  className={`hover:bg-gray-100 rounded-lg p-2 px-3 items-center gap-2  relative ${
                    isSelected ? "bg-gray-100" : ""
                  } ${isEnabled ? "cursor-pointer" : "cursor-not-allowed text-gray-400"}`}
                >
                  <div className="text-xs font-bold uppercase tracking-wider">{language.name}</div>
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    {language.nativeName}
                  </span>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
