"use client";

import { ArrowLeftIcon } from "@/assets/svg/ArrowLeftIcon";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const SeeUseCases = () => {
  const router = useRouter();

  return (
    <div className="py-20 text-black">
      <div>
        <h1 className="font-lora text-5xl font-medium">See legal review in your workflow.</h1>
        <p className="mt-8 max-w-[65%] font-google-sans text-lg text-gray-500">
          We walk through how Qlarety fits intake, redlines, and approvals so your team can move
          agreements faster with clearer risk visibility and fewer back-and-forth cycles.
        </p>
      </div>
      <Button
        type="button"
        variant="primary-green"
        size="lg"
        className="mt-8"
        onClick={() => router.push("/use-cases")}
      >
        See Use Cases
        <ArrowLeftIcon size={15} className="rotate-180" />
      </Button>
    </div>
  );
};

export default SeeUseCases;
