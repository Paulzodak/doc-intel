"use client";

import React from "react";

const MarketingSection = () => {
  return (
    <section className="py-24 px-6 md:px-20 lg:px-40 bg-background-light dark:bg-background-dark">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-[#121714] dark:text-white">
            Transform your legal workflow from analysis to action
          </h2>
        </div>

        {/* Three Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-4">
          {/* Left Section - Document Analysis Progress */}
          <div className="bg-[#5D4037] rounded-2xl p-6 md:p-8 text-white">
            <div className="space-y-6">
              {/* Recent Analysis Card */}
              <div className="bg-white rounded-xl p-4 shadow-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-gray-800 mb-1">Qlarety</h3>
                    <p className="text-xs text-gray-500">2 Hours Ago</p>
                  </div>
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-lg">gavel</span>
                  </div>
                </div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">
                  Contract Analysis: 5 key risk factors identified
                </h4>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-3/4"></div>
                </div>
              </div>

              {/* Document Processing Checklist */}
              <div className="bg-white rounded-xl p-4 shadow-lg">
                <h4 className="text-sm font-bold text-gray-800 mb-4">
                  Document Analysis Checklist
                </h4>
                <div className="space-y-4">
                  {/* Step 1 */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-semibold text-gray-700">
                        Step 1: Extract key terms and clauses
                      </p>
                    </div>
                    <div className="space-y-1 mb-2">
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-green-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-xs text-gray-600">
                          Identified all contract parties and obligations
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-green-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-xs text-gray-600">
                          Extracted payment terms and deadlines
                        </span>
                      </div>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 w-full"></div>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div>
                    <p className="text-xs font-semibold text-gray-700 mb-2">
                      Step 2: Assess compliance and risk factors
                    </p>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 w-1/2"></div>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div>
                    <p className="text-xs font-semibold text-gray-700 mb-2">
                      Step 3: Generate actionable insights and recommendations
                    </p>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gray-300 w-0"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Section - Document Processing Features */}
          <div className="bg-[#C8E6C9] rounded-2xl p-6 md:p-8">
            <div className="space-y-6">
              {/* Document Feature Card */}
              <div className="bg-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-primary rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-2xl">
                      description
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1">AI-Powered Contract Analyzer</p>
                    <p className="text-lg font-bold text-gray-900 mb-1">99.2% Accuracy</p>
                    <p className="text-xs text-gray-600 mb-1">Qlarety Platform</p>
                    <div className="flex items-center gap-1">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">(2,847 reviews)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Workflow Feature Card */}
              <div className="bg-white rounded-xl p-4 shadow-lg">
                <div className="mb-2">
                  <span className="text-xs text-gray-500">Featured</span>
                  <p className="text-xs font-semibold text-gray-800 mt-1">Qlarety</p>
                </div>
                <div className="relative mb-3">
                  <div className="flex gap-2">
                    <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center">
                      <span className="material-symbols-outlined text-white">search</span>
                    </div>
                    <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center">
                      <span className="material-symbols-outlined text-white">shield</span>
                    </div>
                    <div className="w-16 h-16 bg-orange-500 rounded-lg flex items-center justify-center">
                      <span className="material-symbols-outlined text-white">insights</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/70 text-white px-3 py-1 rounded text-xs font-bold">
                      Advanced Analysis 30% Faster
                    </div>
                  </div>
                </div>
                <button className="w-full bg-primary text-white py-2 rounded-lg text-xs font-semibold mb-2">
                  Analyze Document
                </button>
                <div className="flex items-center gap-4 text-gray-400">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Collaboration & Sharing */}
          <div className="bg-[#00695C] rounded-2xl p-6 md:p-8 text-white">
            <h3 className="text-sm font-semibold mb-6 text-center">
              Share insights and collaborate with your team across platforms.
            </h3>
            <div className="space-y-6">
              {/* Collaboration Post 1 */}
              <div className="bg-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold text-gray-800">Qlarety Team</p>
                  <span className="text-xs text-gray-500">1/3</span>
                </div>
                <div className="bg-gray-100 rounded-lg h-32 flex items-center justify-center mb-3">
                  <div className="flex gap-2">
                    <div className="w-12 h-16 bg-primary/20 rounded flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary text-2xl">
                        description
                      </span>
                    </div>
                    <div className="w-12 h-16 bg-blue-100 rounded flex items-center justify-center">
                      <span className="material-symbols-outlined text-blue-600 text-2xl">
                        insights
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-gray-400">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                  </svg>
                </div>
              </div>

              {/* Collaboration Post 2 */}
              <div className="bg-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold text-gray-800">Qlarety</p>
                </div>
                <div className="bg-gray-100 rounded-lg h-32 flex items-center justify-center mb-3 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-primary/10"></div>
                  <div className="relative z-10 w-12 h-16 bg-primary rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-2xl">gavel</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-3 h-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-xs text-gray-500">Sarah M • Contract Review</span>
                </div>
                <div className="flex items-center gap-4 text-gray-400">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketingSection;
