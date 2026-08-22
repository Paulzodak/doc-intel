"use client";

import { AuthBrandingPanel } from "@/components/auth/AuthBrandingPanel";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ErrorFeedback, SuccessFeedback } from "@/components/atoms/form/feedback";
import { MdArrowBackIosNew, MdEmail } from "react-icons/md";
import Link from "next/link";
import { FaArrowRightLong, FaLink } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useMagicLink } from "@/data/auth";
import { QlaretyLogo } from "@/assets/svg/QlaretyLogo";

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

  return (
    <div className="min-h-screen flex dbg-[#0a0a0a] font-nunito relative overflow-hidden bg-gradient-to-br  from-[#11161f] via-100% via-primary-green to-[#11161f]">
      <AuthBrandingPanel />
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mb-8 col-span-full"
        >
          <QlaretyLogo width={100} height={100} />
        </motion.div>
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
                          <MdEmail className="text-green-800" size={17} />
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
                    <FaLink className="text-white mr-2" />
                    <span className="font-medium text-base pr-2">Send Magic Link</span>
                    <FaArrowRightLong size={15} className="text-white" />
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
