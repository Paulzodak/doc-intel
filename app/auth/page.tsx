"use client";

import { AuthBrandingPanel } from "@/components/auth/AuthBrandingPanel";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ErrorFeedback } from "@/components/atoms/form/feedback";
import { MdEmail } from "react-icons/md";
import { useRouter, useSearchParams } from "next/navigation";
import { FaLink } from "react-icons/fa6";
import { isProduction } from "@/lib/utils";
import { API_BASE_URL } from "@/lib/axios";
import { QlaretyLogo } from "@/assets/svg/QlaretyLogo";

export default function LoginPage() {
  console.log(isProduction, "isProduction");
  console.log(process.env.NEXT_PUBLIC_ENV, "process.env.NEXT_PUBLIC_ENV");
  const router = useRouter();
  const params = useSearchParams();
  const status = params.get("status");
  const message = params.get("message");
  console.log(status, "status");
  console.log(message, "message");


  const handleContinueWithEmail = () => {
    router.push("/auth/register");
  };

  const handleContinueWithMagicLink = () => {
    router.push("/auth/magic-link");
  };

  return (
    <div className="min-h-screen flex dbg-[#0a0a0a] font-nunito relative overflow-hidden bg-gradient-to-br  from-[#11161f] via-100% via-primary-green to-[#11161f]">
      <AuthBrandingPanel />
      {/* Right Section - Sign Up Form */}
      <div
        // style={{
        //   backgroundImage: "radial-gradient(circle, rgba(0, 0, 0, 0.2) 1px, transparent 1px)",
        //   backgroundSize: "30px 30px",
        // }}
        className="w-full lg:w-1/2 bg-white flex flex-col items-center justify-center p-6 md:p-12 relative overflow-hidden"
      >
        {/* <DecorativeDots count={30} className="opacity-50" dropAnimate /> */}
        {/* Background Pattern */}
        {/* <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 10px, #000 10px, #000 4px),
                              repeating-linear-gradient(90deg, transparent, transparent 10px, #000 10px, #000 4px)`,
            backgroundSize: "100px 100px",
          }}
        /> */}

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mb-8 col-span-full"
        >
          <QlaretyLogo width={100} height={100} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mb-8 col-span-full"
        >
          <h1 className="text-4xl lg:text-5xl font-lora font-black text-[#0a0a0a] mb-2 text-gradient leading-14 tracking-tight">
            {/* Let's get you started */}
            {/* Build Full-Stack Web & Mobile Apps in minutes */}
            Analyze Legal Documents in minutes
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[25rem] relative z-10 flex flex-col items-center"
        >
          {/* Logo */}
          {/* <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 rounded-2xl flex items-center justify-center shadow-lg transform rotate-[-5deg] hover:rotate-0 transition-transform duration-300">
              <span className="material-symbols-outlined text-5xl text-gray-700 font-bold">
                gavel
              </span>
            </div>
          </motion.div> */}
          {status === "error" && message && <ErrorFeedback message={message} />}

          {/* Continue with Google Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mb-4"
          >
            <Button
              type="button"
              className="shadow-none border-none w-full bg-primary-blue-dark  rounded-[40px] px-6 py-4 hover:border-gray-300 shadow-sm"
              onClick={() => (window.location.href = `${API_BASE_URL}/api/auth/oauth/google`)}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-white font-semibold text-base">Continue with Google</span>
            </Button>
          </motion.div>

          {/* GitHub and Apple Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="w-full flex gap-3 mb-6"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
              <Button
                type="button"
                className="shadow-none border-none w-full bg-primary-blue-dark rounded-full px-4 py-4 hover:bg-gray-900 text-white"
                onClick={() => (window.location.href = `${API_BASE_URL}/api/auth/oauth/github`)}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
              <Button
                type="button"
                className="shadow-none border-none w-full bg-primary-blue-dark rounded-full px-4 py-4 hover:bg-gray-900 text-white"
                onClick={() => (window.location.href = `${API_BASE_URL}/api/auth/oauth/microsoft`)}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C1.79 15.25 4.6 8.87 9.5 8.87c1.67 0 2.88.6 3.9.6 1.01 0 2.7-.65 4.55-.6 1.78.05 3.27 1.04 4.12 2.47-3.63 2.07-3.04 6.2.64 7.58-.5 1.17-1.05 2.33-1.66 3.76zM12.03 7.16c-.15-2.23 1.66-4.07 3.74-4.25.2 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
              </Button>
            </motion.div>
          </motion.div>

          {/* OR Separator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="relative w-full py-4 mb-6"
          >
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-dashed border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-gray-600 text-sm font-medium">OR</span>
            </div>
          </motion.div>

          {/* Continue with Email Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mb-4"
          >
            <Button
              type="button"
              onClick={handleContinueWithEmail}
              variant="primary-green"
              className="w-full rounded-full px-6 py-4 shadow-none"
            >
              <MdEmail className="text-white" />
              <span className="text-base">Continue with Email</span>
            </Button>
          </motion.div>
          {/* Continue with Magic Link Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mb-8"
          >
            <Button
              type="button"
              onClick={handleContinueWithMagicLink}
              variant="primary-green"
              className="w-full rounded-full px-6 py-4 shadow-none"
            >
              <FaLink className="text-white" />
              <span className="text-base">Use Magic Link</span>
            </Button>
          </motion.div>

          {/* Legal Disclaimer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-xs text-gray-500 text-center leading-relaxed"
          >
            By continuing, you agree to our{" "}
            <a href="/terms" className="text-[#0a0a0a] hover:text-primary-green underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-[#0a0a0a] hover:text-primary-green underline">
              Privacy Policy
            </a>
            .
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
