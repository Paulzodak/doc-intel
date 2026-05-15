"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { HiArrowLongRight } from "react-icons/hi2";
import { IoIosArrowRoundForward, IoIosArrowRoundUp } from "react-icons/io";
import { ErrorFeedback, SuccessFeedback } from "@/components/atoms/form/feedback";
import { MdArrowBackIosNew, MdEmail, MdPassword } from "react-icons/md";
import { TiUser } from "react-icons/ti";
import Link from "next/link";
import { FaArrowLeftLong, FaArrowRightLong, FaLock, FaUser } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useSignUp } from "@/data/auth";
import { QlaretyLogo } from "@/assets/svg/QlaretyLogo";

const signUpSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions.",
  }),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { mutateAsync: signUp, isPending, isSuccess, isError, error, data } = useSignUp();
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      acceptTerms: false,
    },
  });

  console.log(form.formState.errors);
  const onSubmit = async (data: SignUpFormValues) => {
    signUp(data).then((res) => {
      if (res.success) {
        router.push("/auth/check-inbox");
      }
    });
    // if (isSuccess) {
    //   router.push("/auth/login");
    // }
    // if (isError) {
    //   console.error(error);
    // }
  };

  const handleGoBack = () => {
    router.push("/auth");
  };

  const testimonials = [
    {
      name: "Sarah L.",
      title: "In-house Counsel",
      testimonial:
        "Cuts contract review time by more than half. Risk and compliance scores are spot-on.",
      avatar: "👩",
    },
    {
      name: "James K.",
      title: "Legal Operations",
      testimonial:
        "We use it for every NDA and vendor agreement. Highlights surface issues we used to miss.",
      avatar: "👨",
    },
    {
      name: "Elena M.",
      title: "Compliance Officer",
      testimonial:
        "Clear grading and key points make it easy to brief stakeholders. A real time-saver.",
      avatar: "👩",
    },
  ];
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
            <h1 className="text-5xl md:text-6xl font-black text-white mb-4 leading-tight">
              <span className="text-primary-green">AI</span> for Legal
              <br />
              Document Review
            </h1>
          </motion.div>

          {/* Robot Graphic Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative mb-12 flex items-center justify-center"
          >
            {/* Robot SVG - More detailed representation */}
            <svg width="280" height="380" viewBox="0 0 280 380" className="relative z-10">
              {/* Robot Head - Rounded */}
              <rect
                x="90"
                y="40"
                width="100"
                height="130"
                rx="25"
                fill="#11161f"
                stroke="#062a16"
                strokeWidth="2"
              />
              {/* Robot Eye - Glowing Green */}
              <circle cx="140" cy="95" r="18" fill="#47e18c" opacity="0.95">
                <animate
                  attributeName="opacity"
                  values="0.8;1;0.8"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="140" cy="95" r="12" fill="#6ae8a8" opacity="0.7" />
              {/* Robot Body - Suit-like */}
              <rect
                x="70"
                y="170"
                width="140"
                height="200"
                rx="30"
                fill="#11161f"
                stroke="#062a16"
                strokeWidth="2"
              />
              {/* Robot Chest Details */}
              <rect x="90" y="200" width="100" height="25" rx="6" fill="#2a2a2a" />
              <rect x="90" y="245" width="100" height="25" rx="6" fill="#2a2a2a" />
              {/* Glowing Green Accents */}
              <path d="M 110 300 L 170 300" stroke="#47e18c" strokeWidth="4" opacity="0.8">
                <animate
                  attributeName="opacity"
                  values="0.6;0.9;0.6"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </path>
              {/* Shoulder details */}
              <circle cx="100" cy="190" r="8" fill="#2a2a2a" />
              <circle cx="180" cy="190" r="8" fill="#2a2a2a" />
            </svg>

            {/* Feature Card 1 - Grading */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute -left-8 top-32 bg-[#11161f] border border-[#062a16] rounded-xl p-4 shadow-lg"
            >
              <div className="text-white">
                <div className="text-2xl font-bold">Risk · Compliance</div>
                <div className="text-sm text-gray-400">Grading & key points</div>
              </div>
            </motion.div>

            {/* Feature Card 2 - Formats */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="absolute -right-8 top-48 bg-[#11161f] border border-[#062a16] rounded-xl p-4 shadow-lg"
            >
              <div className="text-white">
                <div className="text-2xl font-bold">PDF, DOCX</div>
                <div className="text-sm text-gray-400">Upload or paste text</div>
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

      {/* Right Section - Sign Up Form */}
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
          <h1 className="text-4xl lg:text-5xl font-black  mb-2 text-gradient leading-14 tracking-tight">
            {/* Let's get you started */}
            {/* Build Full-Stack Web & Mobile Apps in minutes */}
            Analyze Legal Documents in minutes
          </h1>

          <p className="text-gray-600 font-medium">
            Already have an account?{" "}
            <Link className="underline font-semibold" href="/auth/login">
              Login
            </Link>
          </p>
        </motion.div>
        <div className="col-span-full w-full max-w-[25rem] ">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* First Name */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative text-primary-blue-dark">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2">
                          <FaUser size={15} className="text-green-900" />
                        </div>
                        <Input
                          placeholder="Username"
                          className="bg-white border-gray-200 text-[#0a0a0a] placeholder:text-gray-400 rounded-full h-12 focus:border-primary-green pl-10 "
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative text-primary-blue-dark">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2">
                          <MdEmail size={17} className="text-green-900" />
                        </div>
                        <Input
                          type="email"
                          placeholder="E-mail"
                          className="bg-white border-gray-200 text-[#0a0a0a] placeholder:text-gray-400 rounded-full h-12 focus:border-primary-green pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative text-primary-blue-dark">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2">
                          <FaLock size={15} className="text-green-900" />
                        </div>
                        <Input
                          type="password"
                          placeholder="Password"
                          className="bg-white border-gray-200 text-[#0a0a0a] placeholder:text-gray-400 rounded-full h-12 focus:border-primary-green pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Terms Checkbox */}
              <FormField
                control={form.control}
                name="acceptTerms"
                render={({ field }) => (
                  <FormItem className="">
                    <div className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="border-gray-300 data-[state=checked]:bg-primary-green data-[state=checked]:border-primary-green"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-gray-600 text-sm font-normal cursor-pointer">
                          Accept terms and conditions
                        </FormLabel>
                      </div>
                    </div>
                    <FormMessage className="col-span-full" />
                  </FormItem>
                )}
              />

              {isSuccess && <SuccessFeedback message={"Account created successfully"} />}
              {isError && (
                <ErrorFeedback
                  message={error?.response?.data?.message || "Failed to create account"}
                />
              )}

              {/* <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mb-4"
              > */}
              <Button
                isLoading={isPending}
                showSpinner
                type="submit"
                // onClick={onSubmit}
                variant="primary-green"
                className="w-full rounded-full px-6 py-4 shadow-none"
              >
                {!isPending && (
                  <>
                    <span className="text-base pr-2">Continue with Email</span>
                    <FaArrowRightLong size={15} className="text-white" />
                  </>
                )}
              </Button>
              {/* </motion.div> */}
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
                  // type="button"
                  className="w-full shadow-none bg-primary-blue-dark border-none rounded-full px-4 py-4 hover:bg-gray-900 text-white"
                >
                  {/* <FaArrowLeftLong size={15} className="text-white" /> */}
                  <MdArrowBackIosNew size={15} className="text-white" />
                  <span className="text-base pl-2">Go back</span>
                </Button>
              </motion.div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
