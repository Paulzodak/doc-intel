import { QlaretyLogo } from "@/assets/svg/QlaretyLogo";
import UseCasesSection from "@/components/UseCasesSection";
import MarketingSection from "@/components/MarketingSection";
import StatsSection from "@/components/StatsSection";
import Image from "next/image";
import background_grid from "@/assets/images/background_grid.png";
import MainLayout from "@/components/templates/MainLayout";
import DocumentInput from "@/components/documentInput";

export default function Home() {
  return (
    <MainLayout>
      <div>
        <div className="psy-20 md:py-0 ">
          <div className="bg-background-light dark:bg-background-dark font-display text-[#121714] dark:text-white">
            <section className="relative herso-gradient dark:hero-gradient overflow-hidden">
              <div className="absolute inset-0 grid-overlay opacity-50"></div>
              <div className="relative masx-w-[1200px] md:mx-auto mx-6 md:px-20 lsg:px-40 py-20 lg:py-32 flex flex-col items-center ">
                <div className="inline-flex items-center gap-2 px-3 text-center py-1 rounded-full border border-primary/20  text-primary text-xs font-bold uppercase tracking-widest mb-8 bg-gradient-to-r from-blue-500/5 via-purple-500/5 bordser via-pink-500/5 via-orange-500/5 to-primary-green/5 backdrop-blur-[2px]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  Next-Gen Document Intelligence
                </div>
                <h1 className="text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight mb-8 max-w-4xl text-gradient dark:text-white text-center">
                  Analyze legal documents instantly with AI-powered insights
                </h1>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mb-12 leading-relaxed font-brockmann font-light text-center">
                  Scale your legal expertise with precision-engineered AI that identifies risks,
                  ensures compliance, and streamlines contract review in seconds.
                </p>

                <DocumentInput />

                <div className="mt-16 flex flex-wrap justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500 text-center">
                  <p className="w-full text-xs font-bold uppercase tracking-widest mb-4">
                    Trusted by industry leaders
                  </p>
                  <div className="flex items-center gap-2 text-xl font-bold">
                    <span className="material-symbols-outlined">account_balance</span> LEXINGTON
                  </div>
                  <div className="flex items-center gap-2 text-xl font-bold">
                    <span className="material-symbols-outlined">shield</span> GUARDIAN
                  </div>
                  <div className="flex items-center gap-2 text-xl font-bold">
                    <span className="material-symbols-outlined">verified</span> VERITAS
                  </div>
                  <div className="flex items-center gap-2 text-xl font-bold">
                    <span className="material-symbols-outlined">auto_awesome</span> FUTURE LAW
                  </div>
                </div>
              </div>
            </section>
            {/* <!-- Use Cases Section --> */}
            <UseCasesSection />
            {/* <!-- Marketing Section --> */}
            <MarketingSection />
            {/* <!-- Stats Section --> */}
            <StatsSection />
            <section className="py-20 px-6 md:px-20 lg:px-40 bg-primary text-white text-center">
              <div className="max-w-[800px] mx-auto">
                <h2 className="text-4xl font-black mb-6">
                  Ready to transform your legal workflow?
                </h2>
                <p className="text-gray-400 text-lg mb-10">
                  Join thousands of legal professionals who are reclaiming their time and reducing
                  risk with Qlarety.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button className="w-full sm:w-auto bg-primary-green text-primary px-10 py-4 rounded-xl font-extrabold text-lg hover:scale-105 transition-transform">
                    Start Your Free Analysis
                  </button>
                  <button className="w-full sm:w-auto border border-white/20 hover:bg-white/5 px-10 py-4 rounded-xl font-extrabold text-lg transition-colors">
                    Book a Demo
                  </button>
                </div>
              </div>
            </section>
            <footer className="py-12 px-6 md:px-20 lg:px-40 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-background-dark">
              <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex items-center gap-3 grayscale opacity-60">
                  <QlaretyLogo size={24} className="shrink-0" />
                  <h2 className="text-lg font-extrabold tracking-tight">Qlarety</h2>
                </div>
                <p className="text-gray-400 text-sm">© 2024 Qlarety. All rights reserved.</p>
                <div className="flex gap-6 text-sm font-medium text-gray-400">
                  <a className="hover:text-primary transition-colors" href="#">
                    Privacy
                  </a>
                  <a className="hover:text-primary transition-colors" href="#">
                    Terms
                  </a>
                  <a className="hover:text-primary transition-colors" href="#">
                    Security
                  </a>
                </div>
              </div>
            </footer>
          </div>
          <Image
            src={background_grid}
            alt="background_grid"
            className="absolute opacity-50 max-w-full scale-75"
          />
        </div>
      </div>
    </MainLayout>
  );
}
