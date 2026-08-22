"use client";

import { AuthBrandingPanel } from "@/components/auth/AuthBrandingPanel";

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
import { ErrorFeedback, SuccessFeedback } from "@/components/atoms/form/feedback";
import { MdArrowBackIosNew, MdEmail } from "react-icons/md";
import Link from "next/link";
import { FaArrowRightLong, FaLock, FaUser } from "react-icons/fa6";
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
        {/* Background Pattern */}
        {/* <div
          className="absolute -z-10 inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 10px, #000 10px, #000 4px),
                              repeating-linear-gradient(90deg, transparent, transparent 10px, #000 10px, #000 4px)`,
            backgroundSize: "100px 100px",
          }}
        /> */}

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
                          Accept{" "}
                          <Link href="/terms" className="text-[#11161f] underline hover:text-primary-green">
                            Terms
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy" className="text-[#11161f] underline hover:text-primary-green">
                            Privacy Policy
                          </Link>
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
