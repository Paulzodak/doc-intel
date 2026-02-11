"use client";

import React from "react";

export interface Feature {
  name: string;
}

export type ColorScheme = "blue" | "green" | "purple";

export interface InputMethodTemplateProps {
  isExpanded: boolean;
  onClick: () => void;
  methodNumber: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  featuresTitle: string;
  features: Feature[];
  colorScheme: ColorScheme;
  collapsedButtonText: string;
  children: React.ReactNode;
}

const colorClasses = {
  blue: {
    border: "border-blue-400",
    borderHover: "hover:border-blue-500",
    bg: "bg-blue-100",
    bgDark: "dark:bg-blue-900/30",
    text: "text-blue-600",
    textDark: "dark:text-blue-400",
    iconBg: "bg-blue-100",
    iconBgDark: "dark:bg-blue-900/30",
    buttonBg: "bg-blue-600",
    buttonHover: "hover:bg-blue-700",
    buttonText: "text-white",
    featureDot: "bg-blue-600",
  },
  green: {
    border: "border-green-400",
    borderHover: "hover:border-green-500",
    bg: "bg-green-100",
    bgDark: "dark:bg-green-900/30",
    text: "text-green-600",
    textDark: "dark:text-green-400",
    iconBg: "bg-primary-green/30",
    iconBgDark: "dark:bg-primary-green/30",
    buttonBg: "bg-primary-green",
    buttonHover: "hover:bg-primary-green",
    buttonText: "text-black",
    featureDot: "bg-green-600",
  },
  purple: {
    border: "border-purple-400",
    borderHover: "hover:border-purple-500",
    bg: "bg-purple-100",
    bgDark: "dark:bg-purple-900/30",
    text: "text-purple-600",
    textDark: "dark:text-purple-400",
    iconBg: "bg-purple-100",
    iconBgDark: "dark:bg-purple-900/30",
    buttonBg: "bg-primary-green",
    buttonHover: "hover:bg-primary-green",
    buttonText: "text-black",
    featureDot: "bg-purple-600",
  },
};

const InputMethodTemplate = ({
  isExpanded,
  onClick,
  methodNumber,
  icon,
  title,
  description,
  featuresTitle,
  features,
  colorScheme,
  collapsedButtonText,
  children,
}: InputMethodTemplateProps) => {
  const colors = colorClasses[colorScheme];

  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-gray-800 rounded-4xl ${
        isExpanded
          ? `border ${colors.border} shaddow-2xl skcale-105`
          : "border border-gray-300 dark:border-gray-700 shadsow-sm"
      } overflow-scroll cursor-pointer transition-all duration-300`}
    >
      <div
        className={`transition-all duration-500 ease-in-out ${
          isExpanded
            ? "max-h-[1000px] opacity-100 px-4 py-8 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8"
            : "max-h-0 opacity-0 overflow-hidden p-0"
        }`}
      >
        {/* Left Side - Header Content */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1 ${colors.bg} ${colors.bgDark} ${colors.text} ${colors.textDark} rounded-full text-xs font-bold`}
            >
              {methodNumber}
            </span>
            <span className={`material-symbols-outlined ${colors.text} ${colors.textDark}`}>
              {icon}
            </span>
          </div>
          <div className="">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-gray-900 dark:text-white mb-2">
              {title}
            </h2>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">{description}</p>
          </div>
        </div>

        {/* Right Side - Features */}
        <div className="space-y-4">
          <h3
            className={`text-sm font-bold ${colors.text} ${colors.textDark} uppercase tracking-wider`}
          >
            {featuresTitle}
          </h3>
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3">
                <span className={`w-2 h-2 ${colors.featureDot} rounded-full`}></span>
                <span className="text-gray-900 dark:text-white font-medium">{feature.name}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Input Area - Children (Full Width) */}
        <div className="col-span-1 lg:col-span-2 w-full">{children}</div>
      </div>

      {/* Collapsed State */}
      <div
        className={`transition-all duration-500 ease-in-out ${
          !isExpanded
            ? "max-h-[200px] opacity-100 p-6 flex items-center gap-6"
            : "max-h-0 opacity-0 overflow-hidden p-0"
        }`}
      >
        <div
          className={`w-16 h-16 ${colors.iconBg} ${colors.iconBgDark} rounded-full flex items-center justify-center shrink-0`}
        >
          <span className={`material-symbols-outlined ${colors.text} ${colors.textDark} text-2xl`}>
            {icon}
          </span>
        </div>
        <div className="flex-1">
          <span
            className={`text-xs font-semibold uppercase tracking-wider ${colors.text} ${colors.textDark}`}
          >
            {methodNumber}
          </span>
          <h3 className="text-base md:text-lg lg:text-xl font-black text-gray-900 dark:text-white mt-1 mb-1">
            {title}
          </h3>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">{description}</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className={`${colors.buttonBg} ${colors.buttonHover} ${colors.buttonText} px-6 py-3 rounded-full font-semibold text-sm transition-colors whitespace-nowrap hidden md:block`}
        >
          {collapsedButtonText}
        </button>
      </div>
    </div>
  );
};

export default InputMethodTemplate;
