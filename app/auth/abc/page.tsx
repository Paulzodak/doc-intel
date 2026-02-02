"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { IoIosArrowRoundUp } from "react-icons/io";
import { MdArrowBackIosNew, MdCheckCircle, MdError } from "react-icons/md";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useVerifyEmail } from "@/data/auth";
import { ErrorFeedback, SuccessFeedback } from "@/components/atoms/form/feedback";

export default function VerifyEmailPage() {
  const { mutate: verifyEmail, isPending, isSuccess, isError, error } = useVerifyEmail();
  const hasVerifiedRef = useRef(false);

  useEffect(() => {
    verifyEmail({ token: "abc" });
  }, []);
  return (
    <div className="min-h-screen flex dbg-[#0a0a0a] font-nunito relative overflow-hidden bg-gradient-to-br  from-[#11161f] via-100% via-primary-green to-[#11161f]"></div>
  );
}
