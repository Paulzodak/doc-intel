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

interface WorkflowCard {
  id: number;
  title: string;
  description: string;
  icon: string;
  colorClass: string;
  hoverBorderClass: string;
}

const workflowCards: WorkflowCard[] = [
  {
    id: 1,
    title: "Contract Review",
    description:
      "Identify hidden liabilities, unusual clauses, and unfavorable terms automatically using our specialized neural engine.",
    icon: "contract",
    colorClass: "primary",
    hoverBorderClass: "primary",
  },
  {
    id: 2,
    title: "Compliance Checking",
    description:
      "Automatically map internal documents against GDPR, CCPA, and global financial standards in real-time.",
    icon: "rule",
    colorClass: "accent-blue",
    hoverBorderClass: "accent-blue",
  },
  {
    id: 3,
    title: "Legal Due Diligence",
    description:
      "Rapidly audit large volumes of documents during M&A or litigation phases with high-precision summaries.",
    icon: "search_check",
    colorClass: "accent-purple",
    hoverBorderClass: "accent-purple",
  },
  {
    id: 4,
    title: "Policy Analysis",
    description:
      "Ensure corporate governance alignment by identifying discrepancies between operational policies and legal mandates.",
    icon: "policy",
    colorClass: "accent-blue",
    hoverBorderClass: "accent-blue",
  },
  {
    id: 5,
    title: "Agreement Review",
    description:
      "Compare multiple versions of an agreement clause-by-clause to visualize changes in risk profile instantly.",
    icon: "handshake",
    colorClass: "primary",
    hoverBorderClass: "primary",
  },
  {
    id: 6,
    title: "Regulatory Compliance",
    description:
      "Stay ahead of shifting laws with AI that automatically updates your risk assessments based on the latest regulations.",
    icon: "update",
    colorClass: "accent-purple",
    hoverBorderClass: "accent-purple",
  },
];

const UseCasesSection = () => {
  return (
    <section className="py-2  px-4 lg:px-0 max-w-[1440px] mx-auto font-nunito mts-16 mds:mt-20">
      {/* <!-- Use Cases Section --> */}
      <section className="py-24 px-6 md:px-20 lg:px-40 bg-background-light dark:bg-background-dark">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
              Intelligence for every workflow
            </h2>
            <div className="h-1.5 w-24 bg-primary rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflowCards.map((card) => {
              const colorClasses = {
                primary: {
                  bg: "bg-primary-green/10",
                  text: "text-primary-green",
                  hover: "hover:border-primary-green/30",
                },
                "accent-blue": {
                  bg: "bg-blue-500/10",
                  text: "text-blue-500",
                  hover: "hover:border-blue-500/30",
                },
                "accent-purple": {
                  bg: "bg-purple-500/10",
                  text: "text-purple-500",
                  hover: "hover:border-purple-500/30",
                },
              };
              const colors = colorClasses[card.colorClass as keyof typeof colorClasses];

              return (
                <div
                  key={card.id}
                  className={` bento-card group p-8 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl ${colors.hover} transition-all`}
                >
                  <div
                    className={`  size-12 rounded-full ${colors.bg} ${colors.text}    flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <span className="material-symbols-outlined">{card.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </section>
  );
};

export default UseCasesSection;
