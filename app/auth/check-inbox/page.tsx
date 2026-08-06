"use client";

import { AuthBrandingPanel } from "@/components/auth/AuthBrandingPanel";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MdArrowBackIosNew } from "react-icons/md";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MdEmail } from "react-icons/md";

export default function VerifyEmailPage() {
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/auth");
  };


  return (
    <div className="min-h-screen flex dbg-[#0a0a0a] font-nunito relative overflow-hidden bg-gradient-to-br  from-[#11161f] via-100% via-primary-green to-[#11161f]">
      <AuthBrandingPanel />
      {/* Right Section - Verification Message */}
      <div
        style={{
          backgroundImage: "radial-gradient(circle, rgba(0, 0, 0, 0.2) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
        className="w-full lg:w-1/2 bg-white flex flex-col items-center justify-center p-6 md:p-12 relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 10px, #000 10px, #000 4px),
                              repeating-linear-gradient(90deg, transparent, transparent 10px, #000 10px, #000 4px)`,
            backgroundSize: "100px 100px",
          }}
        />

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mb-8 col-span-full w-full max-w-[28rem]"
        >
          {/* Email Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8 flex justify-center"
          >
            <div className="w-24 h-24 rounded-full bg-primary-green/10 flex items-center justify-center">
              <MdEmail size={48} className="text-primary-green" />
            </div>
          </motion.div>

          {/* Heading */}
          <h1 className="text-4xl lg:text-5xl font-black mb-4 text-gradient leading-14 tracking-tight">
            Check Your Email
          </h1>

          {/* Description */}
          <p className="text-gray-600 font-medium text-lg mb-2">
            We&apos;ve sent a verification link to your email address
          </p>
          <p className="text-gray-500 text-base mb-8">
            Please check your inbox and click on the link to verify your account. The link will
            expire in 24 hours.
          </p>

          {/* Info Box */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8 text-left"
          >
            <div className="flex items-start gap-3">
              <div className="text-primary-green mt-1">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM9 15V13H11V15H9ZM9 9V5H11V9H9Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Didn&apos;t receive the email?</h3>
                <p className="text-sm text-gray-600">
                  Check your spam folder or{" "}
                  <Link
                    href="/auth/resend-verification"
                    className="text-primary-green font-semibold hover:underline"
                  >
                    resend verification email
                  </Link>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <div className="space-y-4 w-full">
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
                onClick={() => window.location.reload()}
              >
                <span className="font-semibold text-base pr-2">Check Again</span>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1"
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
