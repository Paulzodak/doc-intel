"use client";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@/assets/svg/ArrowLeftIcon";
const GetStarted = () => {
  const router = useRouter();
  const handleGetStarted = () => {
    router.push("/use-cases");
  };
  return (
    <div className="fslex text-black borsder-y-[1px] py-10 md:py-20">
      <div>
        <h1 className="text-3xl md:text-5xl font-lora font-medium">Start for free.</h1>
        <p className="mt-4 md:mt-8 text-gray-500 text-sm  md:text-lg tracksing-tight font-google-sans max-w-[65%]">
          Get started for free. No credit card required.
        </p>
      </div>

      <button
        onClick={handleGetStarted}
        className="mt-8 flex items-center gap-2 bg-primary-green text-legal-navy px-10 py-4 rounded-xl text-[13px] font-extrabold shadow-lg shadow-primary-green/30 hover:scale-105 transition-transform active:scale-95 cursor-pointer"
      >
        Start For Free
        <ArrowLeftIcon size={15} className="rotate-180" />
      </button>
    </div>
  );
};

export default GetStarted;
