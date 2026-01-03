import Navbar from "@/components/nav/Navbar";
import InputStack from "@/components/InputStack";
import UseCasesSection from "@/components/UseCasesSection";
import ResponsiveWrapper from "@/components/atoms/ResponsiveWrapper";
import DecorativeDots from "@/components/DecorativeDots";
import Image from "next/image";
import background_grid from "@/assets/images/background_grid.png";
import MainLayout from "@/components/templates/MainLayout";

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

    <MainLayout showNavbar={false}>
      <div
        className="min-h-screen relative bg-[linear-gradient(135deg,white_60%,#1e2939_60%)] md:bg-[linear-gradient(135deg,white_50%,#1e2939_50%)]"
        // style={{
        //   background: "linear-gradient(135deg, white 50%,  #1e2939 50%)",
        // }}
      >
        <div className="py-20 md:py-0">
          <Navbar />
          <Image
            // width="1000"
            // height="800"
            src={background_grid}
            alt="background_grid"
            className="absolute opacity-50 max-w-full scale-75"
          />
          <ResponsiveWrapper className="grid md:grid-cols-2 gap-10 justify-center items-center text-black">
            <div className="inline-flex flex-col">
              <h1 className="bg-gradient-to-r  from-black to-blue-800 bg-clip-text text-transparent text-5xl font-bold text-center ">
                Analyze legal documents instantly with AI-powered insights
              </h1>
              <p className="mt-8 text-center text-lg text-neutral-500 ">
                Extract key points, assess risks, and evaluate compliance in minutes. Transform
                tedious document review into fast, accurate analysis with AI.
              </p>
            </div>
            <InputStack />
          </ResponsiveWrapper>
        </div>
      </div>
      <UseCasesSection />
    </MainLayout>
  );
}
