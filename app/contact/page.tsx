"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Navbar from "@/components/nav/Navbar";
import MainLayout from "@/components/templates/MainLayout";
import Image from "next/image";
import background_grid from "@/assets/images/background_grid.png";
import { Button } from "@/components/ui/button";
import { QlaretyLogo } from "@/assets/svg/QlaretyLogo";
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

const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  company: z.string().optional(),
  subject: z.string().min(1, {
    message: "Please select a subject.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    console.log("Form submitted:", data);
    // TODO: Add API call here
    // You can add toast notification here
    alert("Thank you for your message! We&apos;ll get back to you soon.");
    form.reset();
  };

  return (
    <MainLayout showNavbar={false}>
      <div>
        <div className="psy-20 md:py-0">
          <div className="bg-background-light dark:bg-background-dark font-display text-[#121714] dark:text-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative herso-gradient dark:hero-gradient overflow-hidden">
              <div className="absolute inset-0 grid-overlay opacity-50"></div>
              <div className="relative max-w-[1200px] mx-auto px-6 md:px-20 lg:px-40 py-20 lg:py-32 flex flex-col items-center text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-8 bg-gradient-to-r from-blue-500/5 via-purple-500/5 via-pink-500/5 via-orange-500/5 to-primary-green/5 backdrop-blur-[2px]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  Get in Touch
                </div>
                <h1 className="text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight mb-8 max-w-4xl text-gradient dark:text-white">
                  Let&apos;s discuss how Qlarety can transform your workflow
                </h1>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mb-12 leading-relaxed">
                  Have questions? We&apos;re here to help. Reach out to our team and discover how
                  our AI-powered document intelligence can streamline your legal operations.
                </p>
              </div>
            </section>

            {/* Contact Form Section */}
            <section className="py-24 px-6 md:px-20 lg:px-40 bg-background-light dark:bg-background-dark">
              <div className="max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Left Side - Contact Information */}
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6 text-[#121714] dark:text-white">
                        Contact Information
                      </h2>
                      <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                        Choose the best way to reach us. Our team is ready to assist you with any
                        questions about Qlarety.
                      </p>
                    </div>

                    {/* Contact Cards */}
                    <div className="space-y-6">
                      {/* Email Card */}
                      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-2xl">
                              mail
                            </span>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-black text-gray-900 dark:text-white mb-1">
                              Email Us
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              Send us an email and we&apos;ll respond within 24 hours
                            </p>
                            <a
                              href="mailto:contact@legalai.com"
                              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                            >
                              contact@legalai.com
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Phone Card */}
                      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-2xl">
                              phone
                            </span>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-black text-gray-900 dark:text-white mb-1">
                              Call Us
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              Speak directly with our support team
                            </p>
                            <a
                              href="tel:+1234567890"
                              className="text-green-600 dark:text-green-400 font-semibold hover:underline"
                            >
                              +1 (234) 567-890
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Office Card */}
                      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="material-symbols-outlined text-purple-600 dark:text-purple-400 text-2xl">
                              location_on
                            </span>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-black text-gray-900 dark:text-white mb-1">
                              Visit Us
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              Our headquarters location
                            </p>
                            <p className="text-purple-600 dark:text-purple-400 font-semibold">
                              123 Legal Tech Avenue
                              <br />
                              San Francisco, CA 94105
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Social Links */}
                    <div className="pt-6">
                      <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                        Follow Us
                      </h3>
                      <div className="flex gap-4">
                        <a
                          href="#"
                          className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-green hover:text-white transition-colors"
                        >
                          <span className="material-symbols-outlined text-lg">link</span>
                        </a>
                        <a
                          href="#"
                          className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-green hover:text-white transition-colors"
                        >
                          <span className="material-symbols-outlined text-lg">alternate_email</span>
                        </a>
                        <a
                          href="#"
                          className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-green hover:text-white transition-colors"
                        >
                          <span className="material-symbols-outlined text-lg">share</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Contact Form */}
                  <div className="bg-white dark:bg-gray-800 rounded-4xl p-8 md:p-12 border border-gray-200 dark:border-gray-700 shadow-lg">
                    <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6">
                      Send us a Message
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                      Fill out the form below and we&apos;ll get back to you as soon as possible.
                    </p>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Name Field */}
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-bold text-gray-900 dark:text-white">
                                Full Name
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="John Doe"
                                  className="rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-primary-green"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Email Field */}
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-bold text-gray-900 dark:text-white">
                                Email Address
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="john@example.com"
                                  className="rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-primary-green"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Company Field */}
                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-bold text-gray-900 dark:text-white">
                                Company (Optional)
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Your Company"
                                  className="rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-primary-green"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Subject Field */}
                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-bold text-gray-900 dark:text-white">
                                Subject
                              </FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-primary-green">
                                    <SelectValue placeholder="Select a subject" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="demo">Request a Demo</SelectItem>
                                  <SelectItem value="pricing">Pricing Inquiry</SelectItem>
                                  <SelectItem value="support">Technical Support</SelectItem>
                                  <SelectItem value="partnership">
                                    Partnership Opportunity
                                  </SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Message Field */}
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-bold text-gray-900 dark:text-white">
                                Message
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  rows={6}
                                  placeholder="Tell us how we can help you..."
                                  className="rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-primary-green resize-none"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Submit Button */}
                        <Button
                          type="submit"
                          className="w-full bg-primary-green text-legal-navy px-8 py-4 rounded-xl font-extrabold text-lg hover:scale-105 transition-transform active:scale-95 shadow-lg shadow-primary-green/30"
                        >
                          Send Message
                        </Button>
                      </form>
                    </Form>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 px-6 md:px-20 lg:px-40 bg-gray-50 dark:bg-gray-900/50">
              <div className="max-w-[1400px] mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-[#121714] dark:text-white">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Find answers to common questions about Qlarety
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* FAQ Item 1 */}
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3">
                      How does Qlarety work?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      Qlarety uses advanced machine learning algorithms to analyze legal documents,
                      extract key information, identify risks, and provide actionable insights in
                      seconds.
                    </p>
                  </div>

                  {/* FAQ Item 2 */}
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3">
                      What file formats are supported?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      We support PDF, DOCX, and TXT files up to 50MB. Our OCR technology can also
                      process scanned documents and images.
                    </p>
                  </div>

                  {/* FAQ Item 3 */}
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3">
                      Is my data secure?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      Yes, we use end-to-end encryption and comply with industry-standard security
                      protocols. Your documents are processed securely and never shared with third
                      parties.
                    </p>
                  </div>

                  {/* FAQ Item 4 */}
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3">
                      Can I try Qlarety for free?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      Yes! We offer a free trial that allows you to analyze up to 5 documents. No
                      credit card required.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6 md:px-20 lg:px-40 bg-primary text-white text-center">
              <div className="max-w-[800px] mx-auto">
                <h2 className="text-4xl font-black mb-6">Ready to get started?</h2>
                <p className="text-gray-400 text-lg mb-10">
                  Join thousands of legal professionals who are transforming their workflow with
                  Qlarety.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button className="w-full sm:w-auto bg-primary-green text-primary px-10 py-4 rounded-xl font-extrabold text-lg hover:scale-105 transition-transform">
                    Start Your Free Trial
                  </button>
                  <button className="w-full sm:w-auto border border-white/20 hover:bg-white/5 px-10 py-4 rounded-xl font-extrabold text-lg transition-colors">
                    Schedule a Demo
                  </button>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 md:px-20 lg:px-40 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-background-dark">
              <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex items-center gap-3 grayscale opacity-60">
                  <QlaretyLogo size={24} className="shrink-0" />
                  <h2 className="text-lg font-extrabold tracking-tight">Qlarety</h2>
                </div>
                <p className="text-gray-400 text-sm">
                  © 2024 Qlarety. All rights reserved.
                </p>
                <div className="flex gap-6 text-sm font-medium text-gray-400">
                  <a className="hover:text-primary transition-colors" href="#">
                    Privacy
                  </a>
                  <a className="hover:text-primary transition-colors" href="#">
                    Terms
                  </a>
                  <a className="hover:text-primary transition-colors" href="#">
                    Security
                  </a>
                </div>
              </div>
            </footer>
          </div>
          <Image
            src={background_grid}
            alt="background_grid"
            className="absolute opacity-50 max-w-full scale-75"
          />
        </div>
      </div>
    </MainLayout>
  );
}
