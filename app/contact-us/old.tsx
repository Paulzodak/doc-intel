"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LandingFooter } from "@/components/landing/LandingFooter";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LandingNav } from "@/components/landing/LandingNav";
import { ContactUsImageColumn } from "@/components/landing/ContactUsImageColumn";
import { ToastLogger } from "@/utils/toastUtils";
import { MenuIcon3 } from "@/assets/svg/MenuIcon3";
import { UserIconFilled } from "@/assets/svg/UserIconFilled";
import { MailIconFilled } from "@/assets/svg/MailIconFilled";
import { MessageIconFilled } from "@/assets/svg/MessageIconFilled";
import { MailIcon } from "@/assets/svg/MailIcon";
import { PhoneIcon } from "@/assets/svg/PhoneIcon";
import { ArrowLeftIcon } from "@/assets/svg/ArrowLeftIcon";
import { QlaretyLogo } from "@/assets/svg/QlaretyLogo";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(1, { message: "Please select a subject." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const fieldClass =
  "h-12 rounded-2xl border-[#1e2939]/10 bg-[#f7f9f8] pl-11 text-[#0a0a0a] placeholder:text-gray-400 focus-visible:border-primary-green focus-visible:ring-primary-green/20 dark:border-white/10 dark:bg-[#11161f] dark:text-white";

export default function ContactUsPage() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = form.handleSubmit(() => {
    ToastLogger.success("documents", "Thanks — we'll get back to you soon.");
    form.reset();
  });

  const reachOutMethods = [
    {
      icon: PhoneIcon,
      title: "Call",
      detail: "+234 (816) 844-7706",
      href: "tel:+2348168447706",
    },
    {
      icon: MailIcon,
      title: "Email",
      detail: "contact@qlarety.com",
      href: "mailto:contact@qlarety.com",
    },
    {
      icon: MailIcon,
      title: "Visit",
      detail: "Lagos, Nigeria",
      href: "https://maps.app.goo.gl/1234567890",
    },
  ];

  return (
    <div className="font-nunito overflow-hidden">
      <div className="relative mx-auto max-w-[110rem] px-4 sm:px-8 lg:grid lg:grid-cols-2 lg:gap-10 lg:px-14">
        <div className="relative">
          <section className="relative overflow-hidden">
            <div
              aria-hidden
              className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-primary-green/15 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, rgba(30,41,57,0.12) 1px, transparent 0)",
                backgroundSize: "28px 28px",
              }}
            />

            <div className="relative flex flex-col items-center py-4 sm:py-10 lg:py-12">
              <LandingNav />

              <div className="mx-auto w-full max-w-lg px-1 sm:px-0">
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-8 text-center sm:mb-10"
                >
                  {/* <div className="mb-4 flex items-center justify-center gap-1">
                    <QlaretyLogo width={56} height={56} />
                    <span className="font-lora text-3xl font-semibold tracking-tight text-[#11161f] dark:text-white sm:text-4xl">
                      larety
                    </span>
                  </div> */}
                  <h1 className="font-google-sans my-4 text-4xl font-medium leading-[1.1] tracking-tight text-[#11161f] dark:text-white sm:text-5xl">
                    Talk with us
                  </h1>
                  <p className="mx-auto mt-6 max-w-md font-brockmann text-sm font-light leading-relaxed text-gray-600 dark:text-gray-400 sm:text-[15px]">
                    Questions about risk grading, demos, or partnerships — we usually reply within a
                    day.
                  </p>
                </motion.div>

                <div className="mb-8 block w-full lg:hidden">
                  <ContactUsImageColumn compact />
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Form {...form}>
                    <form onSubmit={onSubmit} className="space-y-5">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold text-[#11161f] dark:text-white">
                              Full name
                            </FormLabel>
                            <FormControl>
                              <div className="relative mt-2 text-gray-400">
                                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
                                  <UserIconFilled color="#0d542b" size={15} aria-hidden />
                                </div>
                                <Input placeholder="Jane Doe" className={fieldClass} {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold text-[#11161f] dark:text-white">
                              Email
                            </FormLabel>
                            <FormControl>
                              <div className="relative mt-2 text-gray-400">
                                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
                                  <MailIconFilled color="#0d542b" size={17} aria-hidden />
                                </div>
                                <Input
                                  type="email"
                                  placeholder="you@company.com"
                                  className={fieldClass}
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold text-[#11161f] dark:text-white">
                              Subject
                            </FormLabel>
                            <Select onValueChange={field.onChange} value={field.value || undefined}>
                              <FormControl>
                                <div className="relative mt-2 text-gray-400">
                                  <div className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2">
                                    <MenuIcon3 size={15} aria-hidden />
                                  </div>
                                  <SelectTrigger
                                    className={`${fieldClass} text-gray-500 dark:text-gray-300`}
                                  >
                                    <SelectValue placeholder="Select a subject" />
                                  </SelectTrigger>
                                </div>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="demo">Request a demo</SelectItem>
                                <SelectItem value="pricing">Pricing</SelectItem>
                                <SelectItem value="support">Technical support</SelectItem>
                                <SelectItem value="partnership">Partnership</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-semibold text-[#11161f] dark:text-white">
                              Message
                            </FormLabel>
                            <FormControl>
                              <div className="relative mt-2 text-gray-400">
                                <div className="pointer-events-none absolute left-4 top-3.5">
                                  <MessageIconFilled color="#0d542b" size={18} aria-hidden />
                                </div>
                                <Textarea
                                  rows={5}
                                  placeholder="How can we help?"
                                  className="min-h-[130px] resize-none rounded-2xl border-[#1e2939]/10 bg-[#f7f9f8] pl-11 pt-3.5 text-[#0a0a0a] placeholder:text-gray-400 focus-visible:border-primary-green focus-visible:ring-primary-green/20 dark:border-white/10 dark:bg-[#11161f] dark:text-white"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                        <Button type="submit" variant="primary-green" size="lg" className="w-full">
                          Send message
                          <ArrowLeftIcon size={15} className="rotate-180" />
                        </Button>
                      </motion.div>
                    </form>
                  </Form>
                </motion.div>
              </div>
            </div>
          </section>
        </div>

        <div className="hidden w-full lg:flex">
          <ContactUsImageColumn />
        </div>
      </div>

      <section className="relative mx-auto mt-6 max-w-[95rem] px-6 pb-4 pt-10 md:px-20 lg:mt-10 lg:px-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1e2939]/15 to-transparent"
        />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-green">
              Direct lines
            </p>
            <h2 className="mt-3 font-lora text-3xl font-medium tracking-tight text-[#11161f] dark:text-white sm:text-4xl">
              Prefer to reach out yourself?
            </h2>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              Write us at{" "}
              <a
                href="mailto:contact@qlarety.com"
                className="font-semibold text-[#11161f] underline decoration-primary-green/50 underline-offset-4 transition-colors hover:text-primary-green dark:text-white"
              >
                contact@qlarety.com
              </a>
            </p>
          </div>

          <div className="grid flex-1 gap-6 sm:grid-cols-3 lg:max-w-2xl">
            {reachOutMethods.map((method) => {
              const Icon = method.icon;
              return (
                <a
                  key={method.title}
                  href={method.href}
                  className="group block border-[#1e2939]/10 pt-4 transition-colors hover:border-primary-green/50 dark:border-white/10"
                >
                  <div className="mb-3 text-primary-green transition-transform duration-300 group-hover:-translate-y-0.5">
                    <Icon color="#47e18c" />
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
                    {method.title}
                  </div>
                  <div className="mt-1 text-sm font-semibold text-[#11161f] dark:text-white">
                    {method.detail}
                  </div>
                </a>
              );
            })}
          </div>
        </motion.div>
      </section>

      <LandingFooter />
    </div>
  );
}
