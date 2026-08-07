"use client";

import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@/assets/svg/ArrowLeftIcon";
import { Button } from "@/components/ui/button";

const GetStarted = () => {
  const router = useRouter();

  return (
    <div className="py-10 text-black md:py-20">
      <div>
        <h1 className="font-lora text-3xl font-medium md:text-5xl">Start for free.</h1>
        <p className="mt-4 max-w-[65%] font-google-sans text-sm text-gray-500 md:mt-8 md:text-lg">
          Get started for free. No credit card required.
        </p>
      </div>

      <Button
        type="button"
        variant="primary-green"
        size="lg"
        className="mt-8"
        onClick={() => router.push("/use-cases")}
      >
        Start For Free
        <ArrowLeftIcon size={15} className="rotate-180" />
      </Button>
    </div>
  );
};

export default GetStarted;
