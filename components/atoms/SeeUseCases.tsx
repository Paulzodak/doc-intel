"use client";
import { ArrowLeftIcon } from "@/assets/svg/ArrowLeftIcon";
import { useRouter } from "next/navigation";
const SeeUseCases = () => {
  const router = useRouter();
  const handleGetStarted = () => {
    router.push("/use-cases");
  };
  return (
    <div className="fslex text-black borsder-y-[1px] py-20">
      <div>
        <h1 className="text-5xl font-lora font-medium">See legal review in your workflow.</h1>
        <p className="mt-8 text-gray-500 text-lg tracksing-tight font-google-sans max-w-[65%]">
          We walk through how Qlarety fits intake, redlines, and approvals so your team can move
          agreements faster with clearer risk visibility and fewer back-and-forth cycles.
        </p>
      </div>
      <button
        onClick={handleGetStarted}
        className="flex items-center gap-2 mt-8 bg-primary-green text-legal-navy px-10 py-4 rounded-xl text-[13px] font-extrabold shadow-lg shadow-primary-green/30 hover:scale-105 transition-transform active:scale-95 cursor-pointer"
      >
        See Use Cases
        <ArrowLeftIcon size={15} className="rotate-180" />
      </button>
    </div>
  );
};

export default SeeUseCases;
