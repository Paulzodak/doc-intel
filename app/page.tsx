"use client";

import GetStarted from "@/components/atoms/GetStarted";
import SeeUseCases from "@/components/atoms/SeeUseCases";
import DocumentInput from "@/components/documentInput";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { LandingHeroVisualColumn } from "@/components/landing/LandingHeroVisualColumn";
import { LandingNav } from "@/components/landing/LandingNav";
import StayInformedandProtected from "@/components/landing/StayInformedandProtected";

export default function Home() {
  return (
    <div className="font-nunito">
      <div className="relative mx-auto max-w-[110rem] gap-8 px-4 font-nunito sm:gap-14 sm:px-6 lg:grid lg:grid-cols-2 lg:px-14">
        <div className=" md:py-0">
          <div className="bg-background-light font-display text-[#121714] dark:bg-background-dark dark:text-white">
            <section className="relative overflow-hidden herso-gradient dark:hero-gradient">
              <div className="relative flex flex-col items-center py-4 sm:py-12 lg:py-14">
                <LandingNav />
                <div className="mb-8 mt-4 inline-flex max-w-[95%] items-center gap-1 rounded-full border border-primary/20 bg-gradient-to-r from-blue-500/5 via-purple-500/5 via-pink-500/5 via-orange-500/5 to-primary-green/5 px-2 py-1 text-center text-[9px] font-bold uppercase tracking-wide text-primary backdrop-blur-[2px] sm:mb-5 sm:gap-1.5 sm:px-2.5 sm:text-[10px] sm:tracking-wider">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                  </span>
                  Next-Gen Document Intelligence
                </div>
                <h1 className="mb-3 max-w-4xl text-center text-[1.65rem] font-black font-lora leading-[1.14] tracking-wide text-gradient dark:text-white sm:mb-5 sm:text-[2rem] lg:mb-6 lg:text-[2.9rem]">
                  Analyze legal documents instantly with AI-powered insights
                </h1>
                <p className="mb-5 max-w-2xl px-1 text-center text-[12.5px] leading-relaxed text-gray-600 dark:text-gray-400 sm:mb-7 sm:text-[14px] md:mb-9 md:text-[15px] font-brockmann font-light">
                  Scale your legal expertise with precision-engineered AI that identifies risks,
                  ensures compliance, and streamlines contract review in seconds.
                </p>

                <div className="block w-full lg:hidden mt-4">
                  <LandingHeroVisualColumn />
                </div>

                <DocumentInput />
              </div>
            </section>
          </div>
        </div>
        <div className="hidden w-full lg:flex">
          <LandingHeroVisualColumn />
        </div>
      </div>
      <StayInformedandProtected />
      <div className="text-black max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-14 my-20">
        <SeeUseCases />
      </div>
      <LandingFooter />
    </div>
  );
}
