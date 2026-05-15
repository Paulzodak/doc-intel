"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { FaArrowRightLong, FaListUl, FaUser } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { HiOutlineChatBubbleLeftEllipsis } from "react-icons/hi2";
import { MailIcon } from "@/assets/svg/MailIcon";
import { MenuIcon } from "@/assets/svg/MenuIcon";
import { MenuIcon2 } from "@/assets/svg/MenuIcon2";
import { MenuIcon3 } from "@/assets/svg/MenuIcon3";
import { UserIconFilled } from "@/assets/svg/UserIconFilled";
import { MailIconFilled } from "@/assets/svg/MailIconFilled";
import { MessageIconFilled } from "@/assets/svg/MessageIconFilled";
import { PhoneIcon } from "@/assets/svg/PhoneIcon";
import { ArrowLeftIcon } from "@/assets/svg/ArrowLeftIcon";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(1, { message: "Please select a subject." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

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
      icon: <PhoneIcon color="oklch(62.7% 0.194 149.214)" />,
      title: "Call Us",
      description: "Speak directly with our support team",
      link: "tel:+1234567890",
      linkText: "+234 (816) 844-7706",
    },
    {
      icon: <MailIcon color="oklch(62.7% 0.194 149.214)" />,
      title: "Email Us",
      description: "Send us an email and we'll respond within 24 hours",
      link: "mailto:contact@qlarety.com",
      linkText: "contact@qlarety.com",
    },
    {
      icon: <MailIcon color="oklch(62.7% 0.194 149.214)" />,
      title: "Visit Us",
      description: "Our headquarters location",
      link: "https://maps.app.goo.gl/1234567890",
      linkText: "Lagos, Nigeria",
    },
  ];

  return (
    <div className="font-nunito">
      <div className="relative mx-auto max-w-[110rem] gap-8 px-4 font-nunito sm:gap-14 sm:px-8 lg:grid lg:grid-cols-2 lg:px-14">
        <div className="relative md:py-0">
          <div className="bg-background-light font-display text-[#121714] dark:bg-background-dark dark:text-white">
            <section className="relative overflow-hidden herso-gradient dark:hero-gradient">
              <div className="absolute inset-0 grid-overlay opacity-40" aria-hidden />
              <div className="relative flex flex-col items-center py-4 sm:py-12 lg:py-14">
                <LandingNav />

                <div className="mx-auto w-full max-w-lg px-1 sm:px-0">
                  <div className=" flex justify-center">
                    <div className="mb-5 mx-auto inline-flex max-w-[95%] items-center gap-1.5 rounded-full border border-primary/20 bg-gradient-to-r from-blue-500/5 via-purple-500/5 via-pink-500/5 via-orange-500/5 to-primary-green/5 px-2.5 py-1 text-center text-[9px] font-bold uppercase tracking-wider text-primary backdrop-blur-[2px] sm:mb-6 sm:gap-2 sm:px-3 sm:text-[10px] sm:tracking-widest">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                      </span>
                      Contact
                    </div>
                  </div>
                  <h1 className="mb-3 max-w-4xl text-center font-medium font-google-sans  text-gradient dark:text-white sm:mb-5 sm:text-[40px] lg:mb-6 lg:text-[60px] leading-[1.2] tracking-tight">
                    Let&apos;s Get In Touch
                  </h1>
                  <p className="mb-5 max-w-2xl px-1 text-center text-[12.5px] leading-relaxed text-gray-600 dark:text-gray-400 sm:mb-7 sm:text-[14px] md:mb-9 md:text-[15px] font-brockmann font-light">
                    Send a message and we’ll respond as soon as we can.
                  </p>

                  <div className="mb-8 block w-full lg:hidden">
                    <ContactUsImageColumn />
                  </div>

                  <div className="rounded-3xl bosrder border-gray-200/80 bg-white/80  py-6 shsadow-sm backdrop-blur-sm dark:border-gray-700/80 dark:bg-gray-900/40 sm:px-8 sm:py-8 sm:rounded-4xl">
                    <Form {...form}>
                      <form onSubmit={onSubmit} className="space-y-5">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-semibold text-gray-900 dark:text-white">
                                Full name
                              </FormLabel>
                              <FormControl>
                                <div className="relative mt-2 text-gray-400">
                                  <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
                                    <UserIconFilled
                                      className="text-green-900"
                                      color="#0d542b"
                                      size={15}
                                      aria-hidden
                                    />
                                  </div>
                                  <Input
                                    placeholder="Jane Doe"
                                    className="h-11 rounded-full border-gray-200 bg-white pl-10 text-[#0a0a0a] placeholder:text-gray-500 focus:border-primary-green dark:border-gray-600 dark:bg-gray-950"
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
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-semibold text-gray-900 dark:text-white">
                                Email
                              </FormLabel>
                              <FormControl>
                                <div className="relative mt-2 text-gray-400">
                                  <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
                                    <MailIconFilled
                                      color="#0d542b"
                                      className="text-green-800"
                                      size={17}
                                      aria-hidden
                                    />
                                  </div>
                                  <Input
                                    type="email"
                                    placeholder="you@company.com"
                                    className="h-11 rounded-full border-gray-200 bg-white pl-10 text-[#0a0a0a] placeholder:text-gray-500 focus:border-primary-green dark:border-gray-600 dark:bg-gray-950"
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
                              <FormLabel className="text-sm font-semibold text-gray-900 dark:text-white">
                                Subject
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value || undefined}
                              >
                                <FormControl>
                                  <div className="relative mt-2 text-gray-400">
                                    <div className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2">
                                      <MenuIcon3 className="text-green-900" size={15} aria-hidden />
                                    </div>
                                    <SelectTrigger className="text-gray-500 h-12 rounded-full border-gray-200 pl-10 focus:border-primary-green dark:border-gray-600">
                                      <SelectValue
                                        className="text-gray-500"
                                        placeholder="Select a subject"
                                      />
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
                              <FormLabel className="text-sm font-semibold text-gray-900 dark:text-white">
                                Message
                              </FormLabel>
                              <FormControl>
                                <div className="relative mt-2 text-gray-400">
                                  <div className="pointer-events-none absolute left-4 top-3">
                                    <MessageIconFilled color="#0d542b" size={18} aria-hidden />
                                  </div>
                                  <Textarea
                                    rows={5}
                                    placeholder="How can we help?"
                                    className="min-h-[120px] resize-none rounded-2xl border-gray-200 bg-white pl-10 pt-3 text-[#0a0a0a] placeholder:text-gray-500 focus:border-primary-green dark:border-gray-600 dark:bg-gray-950"
                                    {...field}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="submit"
                          // variant="primary-green"
                          // className="w-full rounded-full"
                          className="bg-primary-green text-black px-4 w-full py-2 rounded-full text-sm font-extrabold shadow-lg shadow-primary-green/30 hover:scale-105 transition-transform active:scale-95 cursor-pointer flex items-center gap-2"
                        >
                          Send message
                          <ArrowLeftIcon size={15} className="rotate-180" />
                        </Button>
                      </form>
                    </Form>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div className="hidden w-full lg:flex">
          <ContactUsImageColumn />
        </div>
      </div>
      <div className="py-10 mx-auto max-w-[95rem] px-6 md:px-20 lg:px-20">
        <h3 className="text-sm text-gray-700 font-bold ">Reach Out To Us</h3>
        <h1 className="text-4xl font-black mt-4 text-black font-jadkarta">
          We&apos;d Love To Hear From You
        </h1>
        <h3 className="text-sm text-gray-700 font-bold mt-4">
          Or Just reach out manually to{" "}
          <a href="mailto:contact@qlarety.com" className="text-primary-green hover:underline">
            contact@qlarety.com
          </a>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {reachOutMethods.map((method) => (
            <div key={method.title} className="bg-white rounded-2xl py-6  transition-all">
              <div className="flesx items-center gap-4">
                <div className="w-12 h-12 bg-green-100/50 rounded-full flex items-center justify-center flex-shrink-0">
                  {method.icon}
                </div>
                <div className="flex-1 mt-4">
                  <h3 className="text-lg font-black text-gray-900 dark:text-white mb-1">
                    {method.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {method.description}
                </p>
                <a
                  href={method.link}
                  className="text-green-600 dark:text-green-400 font-semibold hover:underline mt-2"
                >
                  {method.linkText}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <LandingFooter />
    </div>
  );
}
