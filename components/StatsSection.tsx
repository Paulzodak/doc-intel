"use client";

import React from "react";

const StatsSection = () => {
  return (
    <section className="py-24 md:pb-56 px-6 md:px-20 lg:px-40 bg-background-light dark:bg-background-dark">
      <div className="max-w-[1400px] mx-auto">
        {/* Top Section with Title and Description */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 mb-16 items-start">
          <div className="lg:pr-8">
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Qlarety helps companies enhance the efficiency of their document review processes,
              providing ease in contract analysis and fostering growth in legal operations.
            </p>
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[#121714] dark:text-white leading-tight">
              Qlarety: revolutionizing document analysis, elevating legal performance.
            </h2>
          </div>
        </div>

        {/* Three Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Card - Productivity Increase */}
          <div className="bsg-[#D4F36B] bg-primary-green rounded-4xl p-8 md:p-10 flex flex-col items-center">
            {/* Circular Progress Indicator */}
            <div className="relative w-48 h-48 mb-6">
              <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 200 200">
                {/* Dashed background circle */}
                <circle
                  cx="100"
                  cy="100"
                  r="85"
                  fill="none"
                  stroke="#A5D6A7"
                  strokeWidth="6"
                  strokeDasharray="8 12"
                  strokeDashoffset="0"
                />
                {/* Dashed progress circle (65% filled) with rolling animation */}
                <circle
                  cx="100"
                  cy="100"
                  r="85"
                  fill="none"
                  stroke="#1e2939"
                  strokeWidth="6"
                  strokeDasharray="8 12"
                  strokeDashoffset="122"
                  strokeLinecap="round"
                  style={{
                    animation: "rollProgress 10s linear infinite",
                  }}
                />
              </svg>
              {/* Center number */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white rounded-full w-32 h-32 flex items-center justify-center shadow-lg">
                  <span className="text-5xl font-black text-[#1e2939]">65%</span>
                </div>
              </div>
            </div>
            {/* Text below */}
            <p className="text-xl font-bold text-[#1e2939] mb-8 text-center">
              Increase in productivity
            </p>
            {/* Rating Section */}
          </div>

          {/* Middle Card - Customer Count */}
          <div className="bg-[#24282B] rounded-4xl p-8 md:p-10 flex flex-col items-center text-white translate-y-42">
            {/* Profile Pictures */}
            {/* <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary/30">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-2xl">person</span>
                </div>
              </div>
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary/30">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-2xl">person</span>
                </div>
              </div>
            </div> */}
            {/* Customer Count */}
            <div className="text-center mb-4">
              <span className="text-6xl md:text-7xl font-black">12m+</span>
            </div>
            {/* Label */}
            <p className="text-xl font-semibold text-gray-300">Customers</p>
          </div>

          {/* Right Card - Countries Served */}
          <div className="bg-[#F7F6EF] rounded-4xl p-8 md:p-10 translate-y-16">
            {/* Countries Metric */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-6xl md:text-7xl font-black text-[#1e2939]">50+</span>
              <span className="text-lg font-semibold text-gray-700">Countries served</span>
            </div>
            {/* Descriptive Paragraph */}
            <p className="text-gray-700 leading-relaxed">
              From bustling urban centers to remote rural areas, Qlarety extends its reach to over
              50 countries, making a global impact while maintaining local excellence in legal
              document analysis and compliance services.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
