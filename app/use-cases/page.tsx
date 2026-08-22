"use client";

import { ArrowLeftIcon } from "@/assets/svg/ArrowLeftIcon";
import GetStarted from "@/components/atoms/GetStarted";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { LandingHeroVisualColumn } from "@/components/landing/LandingHeroVisualColumn";
import { LandingNav } from "@/components/landing/LandingNav";
import useCasesData from "@/data/useCases.json";
import Link from "next/link";

export default function Home() {
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
                  <div className="mb-8 mt-4 inline-flex max-w-[95%] items-center gap-1 rounded-full border border-primary/20 bg-gradient-to-r from-blue-500/5 via-purple-500/5 via-pink-500/5 via-orange-500/5 to-primary-green/5 px-2 py-1 text-center text-[9px] font-bold uppercase tracking-wide text-primary backdrop-blur-[2px] sm:mb-5 sm:gap-1.5 sm:px-2.5 sm:text-[10px] sm:tracking-wider">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                    </span>
                    Use Cases
                  </div>
                  <h1 className="mb-3 max-w-4xl text-center font-medium font-google-sans  text-gradient dark:text-white sm:mb-5 sm:text-[40px] lg:mb-6 lg:text-[60px] leading-[1.2] tracking-tight">
                    Real-world legal use cases powered by intelligent document analysis
                  </h1>
                  <p className="mb-5 max-w-2xl px-1 text-center text-[12.5px] leading-relaxed text-gray-600 dark:text-gray-400 sm:mb-7 sm:text-[14px] md:mb-9 md:text-[15px] font-brockmann font-light">
                    Explore how legal, compliance, procurement, and operations teams use Qlarety to
                    accelerate reviews, reduce risk exposure, and make faster, evidence-backed
                    decisions.
                  </p>
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
        <div className="bordser my-20 border-red-500 text-black font-google-sans  gap-8 sm:gap-14  lg:grid lg:grid-cols-2 ">
          {useCases.map((useCase) => (
            <div className="border-t-[1px] py-8" key={useCase.id}>
              <h2 className="text-xs font-bold uppercase text-green-700">{useCase.header}</h2>
              <h3 className="text-2xl font-smedium mt-8">{useCase.title}</h3>
              <p className="mt-8 leading-7 text-gray-500">{useCase.description[0].description}</p>
              <Link href={`/use-cases/${useCase.id}`} className="mt-8 inline-flex gap-2 items-center">
                <p className="text-green-700">Read more</p>
                <ArrowLeftIcon color="oklch(52.7% 0.154 150.069)" className="rotate-180 w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
        <GetStarted />
      </div>
      <LandingFooter />
    </div>
  );
}
