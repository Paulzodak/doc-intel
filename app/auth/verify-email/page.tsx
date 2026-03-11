"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { IoIosArrowRoundUp } from "react-icons/io";
import { MdArrowBackIosNew, MdCheckCircle, MdError } from "react-icons/md";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useVerifyEmail } from "@/data/auth";
import type { AxiosError } from "axios";
import { ErrorFeedback, SuccessFeedback } from "@/components/atoms/form/feedback";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tokenParam = searchParams.get("token");
  const hasVerifiedRef = useRef(false);

  const { mutateAsync: verifyEmail, isPending, isSuccess, isError, error } = useVerifyEmail();

  const fetchStatus = () => {
    console.log("fecthed status");
    verifyEmail({ token: tokenParam || "" }).then(() => router.push("/doc/new"));
  };
  useEffect(() => {
    fetchStatus();
  }, []);

  const handleGoBack = () => router.push("/auth");
  const handleRetry = () => tokenParam && verifyEmail({ token: tokenParam });

  const testimonials = [
    { name: "Sarah L.", title: "In-house Counsel", testimonial: "Cuts contract review time by more than half. Risk and compliance scores are spot-on.", avatar: "👩" },
    { name: "James K.", title: "Legal Operations", testimonial: "We use it for every NDA and vendor agreement. Highlights surface issues we used to miss.", avatar: "👨" },
    { name: "Elena M.", title: "Compliance Officer", testimonial: "Clear grading and key points make it easy to brief stakeholders. A real time-saver.", avatar: "👩" },
  ];

  return (
    <div className="min-h-screen flex font-nunito relative overflow-hidden bg-gradient-to-br from-[#11161f] via-primary-green to-[#11161f]">
      {/* Left Section - Branding */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-[#11161fd9] backdrop-blur-3xl">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-8 left-8 z-20 bg-white text-[#0a0a0a] px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-gray-100 transition-colors"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          <span>Back to the webpage</span>
        </motion.button>

        <div className="relative z-10 flex flex-col justify-center items-center px-12 py-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12 text-center"
          >
            <h1 className="text-6xl md:text-7xl font-black text-white mb-4">
              Verify Your <span className="text-primary-green">Email</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative mb-12 flex items-center justify-center"
          >
            <svg width="280" height="380" viewBox="0 0 280 380" className="relative z-10">
              <circle cx="140" cy="190" r="120" fill="#11161f" stroke="#062a16" strokeWidth="3" />
              <path
                d="M 90 190 L 130 230 L 190 130"
                stroke="#47e18c"
                strokeWidth="12"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                strokeDasharray="200"
                strokeDashoffset="200"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="200;0"
                  dur="1.5s"
                  fill="freeze"
                />
              </path>
              <circle cx="140" cy="80" r="35" fill="#47e18c" opacity="0.2">
                <animate
                  attributeName="opacity"
                  values="0.1;0.3;0.1"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="140" cy="80" r="25" fill="#47e18c" opacity="0.4">
                <animate
                  attributeName="opacity"
                  values="0.3;0.5;0.3"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="100" cy="300" r="8" fill="#47e18c" opacity="0.8">
                <animate
                  attributeName="opacity"
                  values="0.4;1;0.4"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="140" cy="300" r="8" fill="#47e18c" opacity="0.8">
                <animate
                  attributeName="opacity"
                  values="0.4;1;0.4"
                  dur="1.5s"
                  begin="0.3s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="180" cy="300" r="8" fill="#47e18c" opacity="0.8">
                <animate
                  attributeName="opacity"
                  values="0.4;1;0.4"
                  dur="1.5s"
                  begin="0.6s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute -left-8 top-32 bg-[#11161f] border border-[#062a16] rounded-xl p-4 shadow-lg"
            >
              <div className="text-white">
                <div className="text-2xl font-bold">✓ Verified</div>
                <div className="text-sm text-gray-400">Email confirmed</div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="absolute -right-8 top-48 bg-[#11161f] border border-[#062a16] rounded-xl p-4 shadow-lg"
            >
              <div className="text-white">
                <div className="text-2xl font-bold">🎉</div>
                <div className="text-sm text-gray-400">All set!</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex gap-4 mt-8"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.9 + i * 0.1 }}
                className="bg-primary-blue-dark border-2 border-[#062a16] rounded-2xl p-4 min-w-[180px] relative shadow-2xl shadow-[#082013]"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center text-2xl shrink-0">
                    {t.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-semibold text-sm">{t.name}</div>
                    <div className="text-gray-400 text-xs">{t.title}</div>
                  </div>
                </div>
                <div className="text-gray-400 text-xs font-medium mb-2">{t.testimonial}</div>
                <div className="absolute bottom-3 right-3 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center">
                  <IoIosArrowRoundUp size={15} className="text-primary-blue-dark rotate-45" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Right Section - Status */}
      <div
        style={{
          backgroundImage: "radial-gradient(circle, rgba(0, 0, 0, 0.2) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
        className="w-full lg:w-1/2 bg-white flex flex-col items-center justify-center p-6 md:p-12 relative overflow-hidden"
      >
        <div
          className="absolute -z-10 inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 10px, #000 10px, #000 4px),
                              repeating-linear-gradient(90deg, transparent, transparent 10px, #000 10px, #000 4px)`,
            backgroundSize: "100px 100px",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mb-8 w-full max-w-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8 flex justify-center"
          >
            {isPending && (
              <div className="w-24 h-24 rounded-full bg-primary-green/10 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary-green border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            {isSuccess && (
              <div className="w-24 h-24 rounded-full bg-primary-green/10 flex items-center justify-center">
                <MdCheckCircle size={48} className="text-primary-green" />
              </div>
            )}
            {isError && (
              <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center">
                <MdError size={48} className="text-red-500" />
              </div>
            )}
            {!tokenParam && !isPending && !isSuccess && !isError && (
              <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
                <MdError size={48} className="text-gray-400" />
              </div>
            )}
          </motion.div>

          <h1 className="text-4xl lg:text-5xl font-black mb-4 text-gradient leading-14 tracking-tight">
            {isPending && "Verifying Email..."}
            {isSuccess && "Email Verified!"}
            {isError && "Verification Failed"}
            {!tokenParam && !isPending && !isSuccess && !isError && "Invalid Link"}
          </h1>

          {isPending && (
            <p className="text-gray-600 font-medium text-lg mb-2">
              Please wait while we verify your email address...
            </p>
          )}
          {isSuccess && (
            <>
              <p className="text-gray-600 font-medium text-lg mb-2">
                Your email has been successfully verified!
              </p>
              <p className="text-gray-500 text-base mb-8">Redirecting you to the login page...</p>
            </>
          )}
          {isError && (
            <>
              <p className="text-gray-600 font-medium text-lg mb-2">
                {(error as AxiosError<{ message?: string }>)?.response?.data?.message ||
                  "Failed to verify your email address"}
              </p>
              <p className="text-gray-500 text-base mb-8">
                The verification link may have expired or is invalid. Please try again.
              </p>
            </>
          )}
          {!tokenParam && !isPending && !isSuccess && !isError && (
            <>
              <p className="text-gray-600 font-medium text-lg mb-2">No verification token found</p>
              <p className="text-gray-500 text-base mb-8">
                Please use the verification link sent to your email.
              </p>
            </>
          )}

          {isSuccess && (
            <SuccessFeedback message="Email verified successfully! Redirecting to login..." />
          )}
          {isError && (
            <ErrorFeedback
              message={
                (error as AxiosError<{ message?: string }>)?.response?.data?.message ||
                "Failed to verify email. Please try again."
              }
            />
          )}

          <div className="space-y-4 w-full mt-8">
            {isError && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="button"
                  variant="primary-green"
                  className="w-full rounded-full px-6 py-4 shadow-none"
                  onClick={handleRetry}
                  disabled={!tokenParam || isPending}
                >
                  <span className="font-semibold text-base pr-2">Try Again</span>
                </Button>
              </motion.div>
            )}

            {!tokenParam && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="button"
                  variant="primary-green"
                  className="w-full rounded-full px-6 py-4 shadow-none"
                  onClick={() => router.push("/auth/check-inbox")}
                >
                  <span className="font-semibold text-base pr-2">Check Your Email</span>
                </Button>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGoBack}
            >
              <Button
                type="button"
                className="w-full bg-primary-blue-dark border-none rounded-full px-4 py-4 hover:bg-gray-900 text-white"
              >
                <MdArrowBackIosNew size={15} className="text-white" />
                <span className="font-semibold text-base pl-2">Go back</span>
              </Button>
            </motion.div>

            <p className="text-gray-500 text-sm mt-6">
              Already verified?{" "}
              <Link className="text-primary-green font-semibold hover:underline" href="/auth/login">
                Login here
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
