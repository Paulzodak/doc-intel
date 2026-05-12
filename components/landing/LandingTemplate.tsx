"use client";

import React, { ReactElement, ReactNode } from "react";
import { LandingFooter } from "./LandingFooter";
import { ArrowLeftIcon, Link } from "lucide-react";
import GetStarted from "../atoms/GetStarted";
import useCasesData from "@/data/useCases.json";
import { LandingNav } from "./LandingNav";
import { LandingHeroVisualColumn } from "./LandingHeroVisualColumn";
interface LandingTemplateProps {
  children: ReactNode | ReactElement;
  children2: ReactNode | ReactElement;
}

export function LandingTemplate({ children, children2 }: LandingTemplateProps) {
  const useCases = useCasesData;
  return (
    <div className="font-nunito">
      <div className="relative mx-auto max-w-[110rem] gap-8 px-4 font-nunito sm:gap-14 sm:px-6 lg:grid lg:grid-cols-2 lg:px-14">
        <div className="md:py-0  flex">
          <div className="bg-background-light  flex font-display text-[#121714] dark:bg-background-dark dark:text-white">
            <section className="relative  flex flex-1 overflow-hidden herso-gradient dark:hero-gradient">
              <div className="relative  flex-1 flex flex-col items-center py-4 sm:py-12 lg:py-14">
                <LandingNav />
                <div className=" flex-1 flex flex-col items-center justify-center">
                  {children ? children : null}
                </div>

                <div className="block w-full lg:hidden mt-4">
                  <LandingHeroVisualColumn />
                </div>

                {/* <DocumentInput /> */}
              </div>
            </section>
          </div>
        </div>
        <div className="hidden w-full lg:flex mt-14">
          <LandingHeroVisualColumn />
        </div>
      </div>
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-14">
        {children2 ? children2 : null}
      </div>
      <LandingFooter />
    </div>
  );
}
