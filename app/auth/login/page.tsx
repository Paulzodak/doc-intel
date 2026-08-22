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
import { ErrorFeedback, SuccessFeedback } from "@/components/atoms/form/feedback";
import { MdEmail } from "react-icons/md";
import Link from "next/link";
import { FaArrowRightLong, FaLink, FaLock } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useLogin } from "@/data/auth";
import { QlaretyLogo } from "@/assets/svg/QlaretyLogo";

const signUpSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { mutateAsync: signIn, isPending, isSuccess, isError, error, data } = useLogin();
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  console.log(form.formState.errors);
  const onSubmit = async (data: SignUpFormValues) => {
    signIn(data).then((res) => router.push("/doc/new"));
    // if (isSuccs) {
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
    <div className=" min-h-screen flex dbg-[#0a0a0a] font-nunito relative overflow-hidden bg-gradient-to-br  from-[#11161f] via-100% via-primary-green to-[#11161f]">
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
          className="absolute inset-0 opacity-[0.03]"
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
            Don&apos;t have an account?{" "}
            <Link className="underline font-semibold" href="/auth/register">
              Sign up
            </Link>
          </p>
        </motion.div>
        <div className="col-span-full w-full max-w-[25rem] ">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative text-gray-400">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2">
                          <MdEmail className="text-green-800" size={17} />
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
                      <div className="relative text-gray-400">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2">
                          <FaLock className="text-green-900" size={15} />
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

              {isSuccess && <SuccessFeedback message={"Sign in Successful "} />}
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
                className="w-full mb-8"
              >
                <Button
                  type="button"
                  onClick={() => router.push("/auth/magic-link")}
                  variant="primary-green"
                  className="w-full rounded-full px-6 py-4 shadow-none "
                >
                  <FaLink className="text-white" />
                  <span className="text-base">Use Magic Link</span>
                </Button>
              </motion.div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
