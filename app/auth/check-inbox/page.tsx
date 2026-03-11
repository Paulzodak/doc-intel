"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { IoIosArrowRoundUp } from "react-icons/io";
import { MdArrowBackIosNew } from "react-icons/md";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MdEmail } from "react-icons/md";

export default function VerifyEmailPage() {
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/auth");
  };

  const testimonials = [
    {
      name: "Sarah L.",
      title: "In-house Counsel",
      testimonial: "Cuts contract review time by more than half. Risk and compliance scores are spot-on.",
      avatar: "👩",
    },
    {
      name: "James K.",
      title: "Legal Operations",
      testimonial: "We use it for every NDA and vendor agreement. Highlights surface issues we used to miss.",
      avatar: "👨",
    },
    {
      name: "Elena M.",
      title: "Compliance Officer",
      testimonial: "Clear grading and key points make it easy to brief stakeholders. A real time-saver.",
      avatar: "👩",
    },
  ];

  return (
    <div className="min-h-screen flex dbg-[#0a0a0a] font-nunito relative overflow-hidden bg-gradient-to-br  from-[#11161f] via-100% via-primary-green to-[#11161f]">
      {/* Left Section - Branding */}
      <div className="hidden lg:flex w-1/2  relative overflow-hidden bg-[#11161fd9] backdrop-blur-3xl">
        <div
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
          className="absolute w-full h-full inset-0  "
        ></div>

        {/* Back Button */}
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
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12 text-center"
          >
            <h1 className="text-6xl md:text-7xl font-black text-white mb-4">
              Check Your <span className="text-primary-green">Inbox</span>
            </h1>
          </motion.div>

          {/* Email/Mailbox Graphic Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative mb-12 flex items-center justify-center"
          >
            {/* Email Envelope SVG */}
            <svg width="280" height="380" viewBox="0 0 280 380" className="relative z-10">
              {/* Envelope Base */}
              <rect
                x="50"
                y="120"
                width="180"
                height="200"
                rx="15"
                fill="#11161f"
                stroke="#062a16"
                strokeWidth="2"
              />
              {/* Envelope Flap */}
              <path
                d="M 50 120 L 140 200 L 230 120 Z"
                fill="#2a2a2a"
                stroke="#062a16"
                strokeWidth="2"
              />
              {/* Letter inside envelope */}
              <rect
                x="70"
                y="180"
                width="140"
                height="120"
                rx="8"
                fill="#11161f"
                stroke="#47e18c"
                strokeWidth="2"
                opacity="0.8"
              >
                <animate
                  attributeName="opacity"
                  values="0.6;0.9;0.6"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </rect>
              {/* Letter lines */}
              <line
                x1="90"
                y1="210"
                x2="190"
                y2="210"
                stroke="#47e18c"
                strokeWidth="2"
                opacity="0.6"
              />
              <line
                x1="90"
                y1="230"
                x2="180"
                y2="230"
                stroke="#47e18c"
                strokeWidth="2"
                opacity="0.6"
              />
              <line
                x1="90"
                y1="250"
                x2="170"
                y2="250"
                stroke="#47e18c"
                strokeWidth="2"
                opacity="0.6"
              />
              {/* Glowing Green Accent - Mail Icon */}
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
              {/* Mail icon in circle */}
              <rect x="120" y="70" width="40" height="30" rx="4" fill="#47e18c" opacity="0.9" />
              <path d="M 120 70 L 140 85 L 160 70" stroke="#11161f" strokeWidth="2" fill="none" />
              {/* Envelope seal */}
              <circle cx="140" cy="140" r="12" fill="#47e18c" opacity="0.8">
                <animate
                  attributeName="opacity"
                  values="0.6;1;0.6"
                  dur="2.5s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>

            {/* Feature Card 1 - Email Sent */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute -left-8 top-32 bg-[#11161f] border border-[#062a16] rounded-xl p-4 shadow-lg"
            >
              <div className="text-white">
                <div className="text-2xl font-bold">✓ Sent</div>
                <div className="text-sm text-gray-400">Verification email</div>
              </div>
            </motion.div>

            {/* Feature Card 2 - Check Inbox */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="absolute -right-8 top-48 bg-[#11161f] border border-[#062a16] rounded-xl p-4 shadow-lg"
            >
              <div className="text-white">
                <div className="text-2xl font-bold">📬</div>
                <div className="text-sm text-gray-400">Check inbox</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Testimonials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex gap-4 mt-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                className="bg-primary-blue-dark border-[2px] border-[#062a16] rounded-2xl p-4 min-w-[180px] relative shadow-2xl shadow-[#082013]"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center text-2xl shrink-0">
                    {testimonial.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-semibold text-sm">{testimonial.name}</div>
                    <div className="text-gray-400 text-xs">{testimonial.title}</div>
                  </div>
                </div>
                <div className="text-gray-400 text-xs font-medium mb-2">
                  {testimonial.testimonial}
                </div>
                <div className="absolute bottom-3 right-3 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center">
                  <IoIosArrowRoundUp size={15} className="text-primary-blue-dark rotate-45" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

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
