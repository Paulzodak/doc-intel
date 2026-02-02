"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IoIosArrowRoundUp } from "react-icons/io";
import { ErrorFeedback, SuccessFeedback } from "@/components/atoms/form/feedback";
import { MdArrowBackIosNew, MdEmail } from "react-icons/md";
import Link from "next/link";
import { FaArrowRightLong, FaLink } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useMagicLink } from "@/data/auth";

const magicLinkSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

type MagicLinkFormValues = z.infer<typeof magicLinkSchema>;

export default function MagicLinkPage() {
  const router = useRouter();
  const { mutate: sendMagicLink, isPending, isSuccess, isError, error } = useMagicLink();

  const form = useForm<MagicLinkFormValues>({
    resolver: zodResolver(magicLinkSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: MagicLinkFormValues) => {
    sendMagicLink(data, {
      onSuccess: () => {
        // Redirect to check-inbox page after a short delay
        setTimeout(() => {
          router.push("/auth/check-inbox");
        }, 2000);
      },
    });
  };

  const handleGoBack = () => {
    router.push("/auth");
  };

  const testimonials = [
    {
      name: "David S.",
      title: "CEO & Co-founder",
      testimonial: "Best Ever.",
      avatar: "👨",
    },
    {
      name: "Mira K.",
      title: "Marketing manager",
      testimonial: "Revolutionary.",
      avatar: "👩",
    },
    {
      name: "Alex M.",
      title: "Marketing",
      testimonial: "Amazing.",
      avatar: "👨",
    },
  ];

  console.log(error);
  return (
    <div className="min-h-screen flex dbg-[#0a0a0a] font-nunito relative overflow-hidden bg-gradient-to-br  from-[#11161f] via-100% via-primary-green to-[#11161f]">
      {/* Left Section - Branding */}
      <div className="hidden lg:flex w-1/2  relative overflow-hidden bg-[#11161fd9] backdrop-blur-3xl">
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
              Magic <span className="text-primary-green">Link</span>
            </h1>
          </motion.div>

          {/* Magic Link Graphic Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative mb-12 flex items-center justify-center"
          >
            {/* Magic Link SVG */}
            <svg width="280" height="380" viewBox="0 0 280 380" className="relative z-10">
              {/* Link Chain Icon */}
              <g transform="translate(90, 120)">
                {/* Chain Link 1 */}
                <ellipse
                  cx="50"
                  cy="70"
                  rx="45"
                  ry="30"
                  fill="#11161f"
                  stroke="#47e18c"
                  strokeWidth="4"
                  opacity="0.9"
                />
                {/* Chain Link 2 */}
                <ellipse
                  cx="50"
                  cy="130"
                  rx="45"
                  ry="30"
                  fill="#11161f"
                  stroke="#47e18c"
                  strokeWidth="4"
                  opacity="0.9"
                />
                {/* Connecting Links */}
                <rect x="5" y="95" width="90" height="10" fill="#47e18c" opacity="0.8" />
                {/* Sparkle/Star effects */}
                <circle cx="20" cy="50" r="4" fill="#47e18c" opacity="0.8">
                  <animate
                    attributeName="opacity"
                    values="0.4;1;0.4"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="80" cy="50" r="4" fill="#47e18c" opacity="0.8">
                  <animate
                    attributeName="opacity"
                    values="0.4;1;0.4"
                    dur="2s"
                    begin="0.5s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="20" cy="150" r="4" fill="#47e18c" opacity="0.8">
                  <animate
                    attributeName="opacity"
                    values="0.4;1;0.4"
                    dur="2s"
                    begin="1s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="80" cy="150" r="4" fill="#47e18c" opacity="0.8">
                  <animate
                    attributeName="opacity"
                    values="0.4;1;0.4"
                    dur="2s"
                    begin="1.5s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
              {/* Glowing Green Accent - Magic Icon */}
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
              {/* Magic wand or link icon in circle */}
              <path d="M 120 70 L 160 70 L 160 100 L 120 100 Z" fill="#47e18c" opacity="0.9" />
              <path
                d="M 130 75 L 150 75 M 130 85 L 150 85 M 130 95 L 150 95"
                stroke="#11161f"
                strokeWidth="2"
              />
            </svg>

            {/* Feature Card 1 - Passwordless */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute -left-8 top-32 bg-[#11161f] border border-[#062a16] rounded-xl p-4 shadow-lg"
            >
              <div className="text-white">
                <div className="text-2xl font-bold">🔗</div>
                <div className="text-sm text-gray-400">Passwordless</div>
              </div>
            </motion.div>

            {/* Feature Card 2 - Secure */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="absolute -right-8 top-48 bg-[#11161f] border border-[#062a16] rounded-xl p-4 shadow-lg"
            >
              <div className="text-white">
                <div className="text-2xl font-bold">🔒</div>
                <div className="text-sm text-gray-400">Secure</div>
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
                className="bg-primary-blue-dark border-[2px]  border-[#062a16] bosrder-primary-blue-dark/10 rounded-2xl p-4 min-w-[180px] relative shadow-2xl shadow-[#082013]"
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

      {/* Right Section - Magic Link Form */}
      <div
        style={{
          backgroundImage: "radial-gradient(circle, rgba(0, 0, 0, 0.2) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
        className="w-full lg:w-1/2 bg-white flex flex-col items-center justify-center p-6 md:p-12 relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div
          className="absolute -z-10 inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 10px, #000 10px, #000 4px),
                              repeating-linear-gradient(90deg, transparent, transparent 10px, #000 10px, #000 4px)`,
            backgroundSize: "100px 100px",
          }}
        />

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mb-8 col-span-full"
        >
          <h1 className="text-4xl lg:text-5xl font-black mb-2 text-gradient leading-14 tracking-tight">
            Sign in with Magic Link
          </h1>

          <p className="text-gray-600 font-medium">
            We&apos;ll send you a secure link to sign in without a password
          </p>
        </motion.div>

        <div className="col-span-full w-full max-w-[25rem]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative text-primary-blue-dark">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2">
                          <MdEmail size={17} />
                        </div>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          className="bg-white border-gray-200 text-[#0a0a0a] placeholder:text-gray-400 rounded-full h-12 focus:border-primary-green pl-12"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Success/Error Feedback */}
              {isSuccess && <SuccessFeedback message="Magic link sent! Check your email inbox." />}
              {isError && (
                <ErrorFeedback
                  message={
                    error?.response?.data?.message || "Failed to send magic link. Please try again."
                  }
                />
              )}

              {/* Submit Button */}
              <Button
                isLoading={isPending}
                showSpinner
                type="submit"
                variant="primary-green"
                className="w-full rounded-full px-6 py-4 shadow-none"
              >
                {!isPending && (
                  <>
                    <FaLink className="text-black mr-2" />
                    <span className="font-semibold text-base pr-2">Send Magic Link</span>
                    <FaArrowRightLong size={15} className="text-black" />
                  </>
                )}
              </Button>

              {/* Go Back Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
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

              {/* Alternative Login Options */}
              <p className="text-gray-500 text-sm mt-6 text-center">
                Prefer to use password?{" "}
                <Link
                  className="text-primary-green font-semibold hover:underline"
                  href="/auth/login"
                >
                  Login here
                </Link>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
