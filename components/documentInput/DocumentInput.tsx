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
    // If clicking the same method, collapse it; otherwise expand the new one
    setExpandedMethod(expandedMethod === method ? method : method);
  };

  return (
    <section className="relative py-12   max-w-full ">
      {/* Dotted Grid Background */}
      <div
        className="absolute inset-0 opacity-30"
        // style={{
        //   backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
        //   backgroundSize: "24px 24px",
        // }}
      />
      <div className="relative max-w-[800px]  mx-auto">
        <div className=" grid gap-6 relative">
          <div className="bg-[#1e2939] dasrk:bg-gray-900 rounded-4xl px-8 py-6 shadow-lg ">
            <div className="flex flex-col md:flex-row itesms-center justify-between gap-6">
              {/* Left Side */}
              <div className="">
                <h3 className="text-xl lg:text-2xl font-black text-white mb-2">
                  Ready to proceed?
                </h3>
                <p className="text-gray-300 text-xs md:text-sm">
                  Review your selected input before initiating the AI engine.
                </p>
              </div>
              {/* Right Side */}
              <div className="grid sm:flex items-center gap-4">
                {/* Avatars */}
                <div className="flex items-center -space-x-3 mx-auto">
                  <div className="w-10 h-10 rounded-full bg-orange-400 border-2 border-[#1e2939] dark:border-gray-900"></div>
                  <div className="w-10 h-10 rounded-full bg-amber-700 border-2 border-[#1e2939] dark:border-gray-900"></div>
                  <div className="w-10 h-10 rounded-full bg-gray-400 border-2 border-[#1e2939] dark:border-gray-900 flex items-center justify-center text-white text-xs font-bold">
                    +12
                  </div>
                </div>
                {/* Analyze Button */}
                {/* <Button variant="primary-green" size="analyze">
                <span>Analyze Document</span>
                <PlayIconFilled />
              </Button> */}
              </div>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-4 mt-4 sm:mt-2 flex-wrap sm:flex-nowrap">
              <EngineSelector />
              <LanguageSelector />
            </div>
          </div>
          <div className=" border-2 border-gray-200 w-[70%]  h-full absolute -z-20 top-0 left-[15%]" />
          {/* Main Input Section - Method 01 */}
          <UploadDocument
            isExpanded={expandedMethod === "upload"}
            onClick={() => handleMethodClick("upload")}
          />

          {/* Method 02 - Scan via OCR */}
          <ScanOCR
            isExpanded={expandedMethod === "scan"}
            onClick={() => handleMethodClick("scan")}
          />

          {/* Method 03 - Paste Text */}
          <PasteText
            isExpanded={expandedMethod === "paste"}
            onClick={() => handleMethodClick("paste")}
          />
        </div>
        {/* Call to Action Section */}

        {/* Footer - Global Features */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 py-6">
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            {/* <span className="material-symbols-outlined text-lg">lock</span> */}
            <LockIcon className="" size={20} />
            <span className="text-xs font-bold uppercase tracking-wider">
              END-TO-END ENCRYPTION
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <DisplayIcon className="" size={20} />
            <span className="text-xs font-bold uppercase tracking-wider">AI INSIGHTS</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <VerifiedCheckedIcon className="" size={20} />
            <span className="text-xs font-bold uppercase tracking-wider">
              LEGAL GRADE PRECISION
            </span>
          </div>
        </div>
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
        onClick={() => setShowModelOptions(!showModelOptions)}
        className="flex bg-white/5  rounded-full p-2 px-3 text-gray-200 cursor-pointer"
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
        onClick={() => setShowLanguageOptions(!showLanguageOptions)}
        className="flex bg-white/5  rounded-full p-2 px-3 text-gray-200 cursor-pointer"
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
