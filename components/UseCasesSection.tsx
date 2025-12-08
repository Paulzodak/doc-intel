"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaTag } from "react-icons/fa6";

interface UseCase {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const useCases: UseCase[] = [
  {
    title: "Contract Review",
    description:
      "Instantly analyze contracts for hidden risks, identify key terms, and evaluate advantages. Get AI-powered insights on liability, compliance gaps, and potential issues.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
  {
    title: "Compliance Checking",
    description:
      "Ensure your documents meet local legal standards. AI automatically detects compliance gaps and suggests corrective actions to align with regulations.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: "Legal Due Diligence",
    description:
      "Accelerate M&A and transaction reviews by quickly analyzing multiple documents. Extract key points, assess risks, and grade documents across multiple metrics.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
        />
      </svg>
    ),
  },
  {
    title: "Policy Analysis",
    description:
      "Review company policies and procedures for legal quality, risk factors, and compliance. Get actionable summaries highlighting advantages and potential issues.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
  },
  {
    title: "Agreement Review",
    description:
      "Analyze partnership agreements, NDAs, and service contracts. Identify key benefits, assess risks, and get instant grading on legal quality and compliance.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
  {
    title: "Regulatory Compliance",
    description:
      "Check documents against current regulations and standards. Get AI-powered recommendations to meet local legal requirements and avoid compliance issues.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
  },
];

const UseCasesSection = () => {
  return (
    <section className="py-2 md:py-8 px-4 lg:px-0 max-w-[1440px] mx-auto font-nunito mt-16 md:mt-32">
      <div className="text-center mb-8 md:mb-16">
        <h1 className="bg-gradient-to-r from-black to-blue-800 bg-clip-text text-transparent text-3xl sm:text-4xl md:text-5xl font-[800] text-center">
          Use Cases
        </h1>
        {/* <h2 className="text-4xl font-bold text-white mb-4">Use Cases</h2> */}
        <p className="text-black text-base md:text-lg max-w-2xl mx-auto mt-4 font-medium text-neutral-500 px-4 md:px-0">
          Discover how Legal Document Analyzer can transform your document review process
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {useCases.map((useCase, index) => (
          <motion.div
            key={useCase.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className={` ${
              index % 2 === 0 ? "bg-[#192435]" : "bg-[#44E39E] text-[#192435]"
            }  rounded-xl p-4 md:p-6  transition-colors group `}
          >
            <div>
              <div className="flex items-center gap-2">
                <FaTag className="text-sm md:text-base" />
                <h2 className="font-semibold text-base md:text-lg uppercase">{useCase.title}</h2>
              </div>
              <div
                className={`${
                  index % 2 === 0
                    ? "bg-[#192435] brightness-140"
                    : "bg-[#44e39e22]  brightness-200 "
                } p-3 md:p-4 rounded-2xl mt-6 md:mt-12 font-medium text-sm md:text-base`}
              >
                {useCase.description}
              </div>
            </div>
            {/* <div className="text-purple-400 mb-4 group-hover:text-purple-300 transition-colors">
              {useCase.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{useCase.title}</h3>
            <p className="text-gray-400 leading-relaxed">{useCase.description}</p> */}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default UseCasesSection;
