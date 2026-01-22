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
import { IoIosArrowRoundUp } from "react-icons/io";
import { ErrorFeedback, SuccessFeedback } from "@/components/atoms/form/feedback";

const signUpSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
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
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      acceptTerms: false,
    },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    console.log("Form submitted:", data);
    // TODO: Add API call here
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
              Your <span className="text-primary-green">AI</span> Assistant
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

            {/* Feature Card 1 - Battery Life */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute -left-8 top-32 bg-[#11161f] border border-[#062a16] rounded-xl p-4 shadow-lg"
            >
              <div className="text-white">
                <div className="text-2xl font-bold">+15 Hours</div>
                <div className="text-sm text-gray-400">Battery life</div>
              </div>
            </motion.div>

            {/* Feature Card 2 - Users */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="absolute -right-8 top-48 bg-[#11161f] border border-[#062a16] rounded-xl p-4 shadow-lg"
            >
              <div className="text-white">
                <div className="text-2xl font-bold">+ 2000</div>
                <div className="text-sm text-gray-400">Users every day</div>
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

      {/* Right Section - Sign Up Form */}
      <div
        style={{
          backgroundImage: "radial-gradient(circle, rgba(0, 0, 0, 0.2) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
        className="w-full lg:w-1/2 bg-white flex items-center justify-center p-6 md:p-12"
      >
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md  rounded-3xl p-8 md:p-12 borsder border-gray-200 sshadow-lg"
        >
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-4xl font-black text-[#0a0a0a] mb-8"
          >
            Start Your Journey.
          </motion.h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* First Name */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Omar"
                        className="bg-white border-gray-300 text-[#0a0a0a] placeholder:text-gray-400 rounded-xl h-12 focus:border-primary-green"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Last Name */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Last name"
                        className="bg-white border-gray-300 text-[#0a0a0a] placeholder:text-gray-400 rounded-xl h-12 focus:border-primary-green"
                        {...field}
                      />
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
                      <Input
                        type="email"
                        placeholder="E-mail"
                        className="bg-white border-gray-300 text-[#0a0a0a] placeholder:text-gray-400 rounded-xl h-12 focus:border-primary-green"
                        {...field}
                      />
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
                      <Input
                        type="password"
                        placeholder="Password"
                        className="bg-white border-gray-300 text-[#0a0a0a] placeholder:text-gray-400 rounded-xl h-12 focus:border-primary-green"
                        {...field}
                      />
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
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              <ErrorFeedback message="This is an error message" />
              <SuccessFeedback message="This is a success message" />
              {/* Or Separator */}
              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex flex-col items-center">
                  <span className="bg-white px-4 text-gray-600 text-sm">Or</span>
                  <span className="bg-white px-4 text-gray-600 text-xs mt-1">Sign up with</span>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className="flex gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  className="w-12 h-12 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:border-primary-green transition-colors"
                >
                  <span className="text-[#0a0a0a] font-bold text-lg">G</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  className="w-12 h-12 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:border-primary-green transition-colors"
                >
                  <span className="text-[#0a0a0a] text-xl">🍎</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  className="w-12 h-12 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:border-primary-green transition-colors"
                >
                  <span className="text-[#0a0a0a] font-bold text-lg">f</span>
                </motion.button>
              </div>

              {/* Login Link */}
              <div className="text-center pt-2">
                <span className="text-gray-600 text-sm">
                  Already have an account?{" "}
                  <a
                    href="#"
                    className="text-[#0a0a0a] hover:text-primary-green transition-colors font-medium"
                  >
                    Login
                  </a>
                </span>
              </div>

              {/* Sign Up Button */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  variant="primary-green"
                  className="w-full rounded-full shadow-none"
                  // className="w-full bdg-[#0a0a0a] text-white rounded-xl h-12 font-bold text-base hover:bg-[#11161f] transition-colors"
                >
                  Sign <HiArrowLongRight size={"5rem"} />
                </Button>
              </motion.div>
            </form>
          </Form>
        </motion.div>
      </div>
    </div>
  );
}
