"use client";

import { AuthBrandingPanel } from "@/components/auth/AuthBrandingPanel";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MdArrowBackIosNew, MdCheckCircle, MdError } from "react-icons/md";import { useRouter, useSearchParams } from "next/navigation";
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


  return (
    <div className="min-h-screen flex font-nunito relative overflow-hidden bg-gradient-to-br from-[#11161f] via-primary-green to-[#11161f]">
      <AuthBrandingPanel />
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
