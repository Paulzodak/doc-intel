import Navbar from "@/components/nav/Navbar";
import InputStack from "@/components/InputStack";
import UseCasesSection from "@/components/UseCasesSection";
import MarketingSection from "@/components/MarketingSection";
import StatsSection from "@/components/StatsSection";
import ResponsiveWrapper from "@/components/atoms/ResponsiveWrapper";
import DecorativeDots from "@/components/DecorativeDots";
import Image from "next/image";
import background_grid from "@/assets/images/background_grid.png";
import MainLayout from "@/components/templates/MainLayout";
import DocumentInput from "@/components/documentInput";

export default function Home() {
  return (
    // <div className="relative overflow-hidden">
    //   <DecorativeDots count={100} />
    //   <div className="relative font-nunito mx-auto">
    //     <div
    //       className="absolute inset-0 bg-cover bg-center bg-no-repeat"
    //       // style={{
    //       //   backgroundImage: `url('https://images.unsplash.com/photo-1518896830268-e472923c4fa3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
    //       //   opacity: 0.1,
    //       // }}
    //     />
    //     {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white" /> */}
    //     <div className="relative z-10 bg-[linear-gradient(135deg,white_60%,#1e2939_60%)] md:bg-[linear-gradient(135deg,white_50%,#1e2939_50%)]">
    //       <ResponsiveWrapper>
    //         <Navbar />
    //       </ResponsiveWrapper>

    <MainLayout>
      <div
      // className="min-h-screen relative bsg-[linear-gradient(135deg,white_60%,#1e2939_60%)] md:bsg-[linear-gradient(135deg,white_50%,#1e2939_50%)]"
      // style={{
      //   background: "linear-gradient(135deg, white 50%,  #1e2939 50%)",
      // }}
      >
        {/* <DocumentInput /> */}
        <div className="psy-20 md:py-0 ">
          <div className="bg-background-light dark:bg-background-dark font-display text-[#121714] dark:text-white">
            {/* <Navbar /> */}
            {/* <!-- Top Navigation --> */}
            {/* <!-- Hero Section --> */}
            <section className="relative herso-gradient dark:hero-gradient overflow-hidden">
              <div className="absolute inset-0 grid-overlay opacity-50"></div>
              <div className="relative masx-w-[1200px] md:mx-auto mx-6 md:px-20 lsg:px-40 py-20 lg:py-32 flex flex-col items-center text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-8 bg-gradient-to-r from-blue-500/5 via-purple-500/5 bordser via-pink-500/5 via-orange-500/5 to-primary-green/5 backdrop-blur-[2px]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  Next-Gen Document Intelligence
                </div>
                <h1 className="text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight mb-8 max-w-4xl text-gradient dark:text-white">
                  Analyze legal documents instantly with AI-powered insights
                </h1>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mb-12 leading-relaxed font-brockmann font-light">
                  Scale your legal expertise with precision-engineered AI that identifies risks,
                  ensures compliance, and streamlines contract review in seconds.
                </p>
                {/* <!-- Interactive Input Stack --> */}
                {/* <InputStack /> */}
                <DocumentInput />
                {/* <div className="w-full max-w-4xl mt-4">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-2 border border-gray-200 dark:border-gray-700">
                    <div className="flex border-b border-gray-100 dark:border-gray-700 px-4 gap-4 sm:gap-12">
                      <button className="flex items-center gap-2 border-b-2 border-accent-blue text-accent-blue py-4 px-2 font-bold text-sm">
                        <span className="material-symbols-outlined text-[20px]">upload_file</span>
                        Upload
                      </button>
                      <button className="flex items-center gap-2 border-b-2 border-transparent text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 py-4 px-2 font-bold text-sm transition-colors">
                        <span className="material-symbols-outlined text-[20px]">
                          document_scanner
                        </span>
                        Scan
                      </button>
                      <button className="flex items-center gap-2 border-b-2 border-transparent text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 py-4 px-2 font-bold text-sm transition-colors">
                        <span className="material-symbols-outlined text-[20px]">content_paste</span>
                        Paste
                      </button>
                    </div>
                    <div className="p-8 md:p-12">
                      <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-12 flex flex-col items-center justify-center gap-6 group cursor-pointer hover:border-primary/50 transition-colors">
                        <div className="size-20 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center text-gray-400 group-hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-4xl">cloud_upload</span>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold">Drop your legal documents here</p>
                          <p className="text-sm text-gray-500 mt-1">
                            Supports PDF, DOCX, and TXT files up to 50MB
                          </p>
                        </div>
                        <button className="bg-legal-navy dark:bg-primary text-white dark:text-legal-navy px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform">
                          Browse Files
                        </button>
                      </div>
                    </div>
                  </div>
                </div> */}
                <div className="mt-16 flex flex-wrap justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
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
                  risk with Legal AI.
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
                  <div className="size-6 bg-legal-navy dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-legal-navy">
                    <span className="material-symbols-outlined text-[16px]">gavel</span>
                  </div>
                  <h2 className="text-lg font-extrabold tracking-tight">Legal AI</h2>
                </div>
                <p className="text-gray-400 text-sm">
                  © 2024 Legal AI Document Intelligence. All rights reserved.
                </p>
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
          {/* <Navbar /> */}
          <Image
            // width="1000"
            // height="800"
            src={background_grid}
            alt="background_grid"
            className="absolute opacity-50 max-w-full scale-75"
          />

          {/* <ResponsiveWrapper className="grid md:grid-cols-2 gap-10 justify-center items-center text-black">
            <div className="inline-flex flex-col">
              <h1 className="bg-gradient-to-r  from-black to-blue-800 bg-clip-text text-transparent text-5xl font-bold text-center ">
                Analyze legal documents instantly with AI-powered insights
              </h1>
              <p className="mt-8 text-center text-lg text-neutral-500 ">
                Extract key points, assess risks, and evaluate compliance in minutes. Transform
                tedious document review into fast, accurate analysis with AI.
              </p>
            </div>
            
          </ResponsiveWrapper> */}
        </div>
      </div>
      {/* <UseCasesSection /> */}
    </MainLayout>
  );
}
