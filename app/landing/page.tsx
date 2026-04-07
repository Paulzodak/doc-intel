"use client";

import { QlaretyLogo } from "@/assets/svg/QlaretyLogo";
import DocumentInput from "@/components/documentInput";
import { LandingHeroVisualColumn } from "@/components/landing/LandingHeroVisualColumn";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LockIconFilled } from "@/assets/svg/LockIconFilled";
import { AnimatePresence, motion } from "framer-motion";
import { IoCloseOutline } from "react-icons/io5";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useState } from "react";
import { selectUser } from "@/redux/slices/user/user.slice";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useGetSession } from "@/data/auth";

export default function Home() {
  return (
    <div className="font-nunito">
      <div className="relative mx-auto max-w-[140rem] gap-12 px-3 font-nunito sm:gap-20 sm:px-8 lg:grid lg:grid-cols-2 lg:px-20">
        <div className="md:py-0">
          <div className="bg-background-light font-display text-[#121714] dark:bg-background-dark dark:text-white">
            <section className="relative overflow-hidden herso-gradient dark:hero-gradient">
              <div className="relative flex flex-col items-center py-6 sm:py-16 lg:py-20">
                <Nav />
                <div className="mb-5 inline-flex max-w-[95%] items-center gap-1.5 rounded-full border border-primary/20 bg-gradient-to-r from-blue-500/5 via-purple-500/5 via-pink-500/5 via-orange-500/5 to-primary-green/5 px-2.5 py-1 text-center text-[10px] font-bold uppercase tracking-wider text-primary backdrop-blur-[2px] sm:mb-8 sm:gap-2 sm:px-3 sm:text-xs sm:tracking-widest">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                  </span>
                  Next-Gen Document Intelligence
                </div>
                <h1 className="mb-5 max-w-4xl text-center text-3xl font-black leading-[1.12] tracking-tight text-gradient dark:text-white sm:mb-7 sm:text-4xl lg:mb-8 lg:text-6xl">
                  Analyze legal documents instantly with AI-powered insights
                </h1>
                <p className="mb-8 max-w-2xl px-1 text-center text-sm leading-relaxed text-gray-600 dark:text-gray-400 sm:mb-10 sm:text-base md:mb-12 md:text-lg font-brockmann font-light">
                  Scale your legal expertise with precision-engineered AI that identifies risks,
                  ensures compliance, and streamlines contract review in seconds.
                </p>

                <div className="block w-full lg:hidden">
                  <LandingHeroVisualColumn />
                </div>

                <DocumentInput />
              </div>
            </section>
          </div>
        </div>
        <div className="hidden w-full lg:flex">
          <LandingHeroVisualColumn />
        </div>
      </div>
      <footer className="bordser-t border-gray-100 bg-white px-4 py-3 dark:border-gray-800 dark:bg-background-dark sm:py-4 md:px-20 lg:px-40">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 md:flex-row md:gap-8">
          <div className="flex min-w-0 items-center gap-1">
            <QlaretyLogo className="shrink-0 sm:h-[40px] sm:w-[40px]" />
            <h1 className="truncate text-md font-bold text-gray-500 sm:text-lg">larety</h1>
          </div>
          <p className="text-center text-xs text-gray-400 sm:text-sm">
            © 2024 Qlarety. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs font-medium text-gray-400 sm:gap-6 sm:text-sm">
            <a className="transition-colors hover:text-primary" href="#">
              Privacy
            </a>
            <a className="transition-colors hover:text-primary" href="#">
              Terms
            </a>
            <a className="transition-colors hover:text-primary" href="#">
              Security
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface DropdownColumn {
  heading: string;
  items: {
    title: string;
    description: string;
    href?: string;
  }[];
}

interface NavItem {
  label: string;
  columns: DropdownColumn[];
}

const Nav = () => {
  const router = useRouter();
  // const user= useSelector(selectUser);
  const { data: session, isLoading: isSessionLoading } = useGetSession();
  const isAuthenticated = session?.user;
  const user = session?.user;
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleMobileItemClick = (label: string) => {
    if (openDropdown === label) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(label);
    }
  };
  const goToLogin = () => {
    router.push("/auth");
  };
  const goToSignUp = () => {
    router.push("/auth");
  };

  const handleGoToDashboard = () => {
    toggleMobileMenu();
    router.push("/doc/new");
  };

  const navItems: NavItem[] = [
    {
      label: "Product",
      columns: [
        {
          heading: "CAPABILITIES",
          items: [
            {
              title: "Document Analysis",
              description: "AI-powered analysis for contracts and legal documents.",
              href: "/doc/new",
            },
            {
              title: "Risk Assessment",
              description: "Identify potential risks and compliance issues automatically.",
              href: "/doc/new",
            },
            {
              title: "Compliance Checking",
              description: "Ensure documents meet regulatory requirements.",
              href: "/doc/new",
            },
          ],
        },
      ],
    },
    {
      label: "Resources",
      columns: [
        {
          heading: "SUPPORT",
          items: [
            {
              title: "Contact Us",
              description: "Get in touch with our team for any inquiries.",
              href: "/contact",
            },
            {
              title: "Help & FAQ",
              description: "Find answers to common questions about Qlarety.",
              href: "/contact",
            },
          ],
        },
      ],
    },
    {
      label: "Pricing",
      columns: [
        {
          heading: "PLANS",
          items: [
            {
              title: "Basic Plan",
              description: "Perfect for individuals and small teams.",
              href: "/contact",
            },
            {
              title: "Pro Plan",
              description: "Advanced features for growing businesses.",
              href: "/contact",
            },
            {
              title: "Enterprise Plan",
              description: "Custom solutions for large organizations.",
              href: "/contact",
            },
          ],
        },
      ],
    },
  ];
  return (
    <nav className="mb-8 flex w-full items-center justify-between gap-2 text-xs text-gray-700 sm:mb-14 sm:gap-6 sm:text-sm lg:mb-14">
      <div className="flex min-w-0 items-center">
        <QlaretyLogo size={48} className="shrink-0 sm:h-[60px] sm:w-[60px]" />
        <h1 className="truncate text-lg font-bold text-black sm:text-2xl">larety</h1>
      </div>
      <div className="hidden sm:flex items-center gap-3 text-xs font-semibold sm:gap-8 sm:text-[15px] md:text-[16px]">
        <Link href="/">Products</Link>
        <Link href="/">Solutions</Link>
        <Link href="/">Pricing</Link>
      </div>
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <button
              onClick={handleGoToDashboard}
              className="bg-primary-green text-legal-navy px-4 py-2 rounded-xl text-sm font-extrabold shadow-lg shadow-primary-green/30 hover:scale-105 transition-transform active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <span className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center text-xs font-black uppercase">
                {user?.username?.charAt(0) || user?.email?.charAt(0) || "U"}
              </span>
              <span className="hidden sm:inline">{"Dashboard"}</span>
            </button>
          </>
        ) : (
          <>
            <button
              // onClick={goToLogin}
              className="hidden sm:block px-5 py-2 text-sm font-bold hover:bg-gray-100 rounded-xl transition-colors hover:text-primary-green cursor-pointer"
            >
              Log In
            </button>
            <button
              // onClick={goToSignUp}
              className="bg-primary-green text-legal-navy px-6 py-2.5 rounded-xl text-sm font-extrabold shadow-lg shadow-primary-green/30 hover:scale-105 transition-transform active:scale-95 cursor-pointer"
            >
              Start Free Trial
            </button>
          </>
        )}

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          <motion.div
            animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isMobileMenuOpen ? (
              <IoCloseOutline className="w-6 h-6" />
            ) : (
              <HiOutlineMenuAlt3 className="w-6 h-6" />
            )}
          </motion.div>
        </button>
      </div>
      {/* <Button
                    showSpinner
                    type="submit"
                    variant="primary-green"
                    className="h-8 shrink-0 rounded-full px-3 py-2 text-xs shadow-none sm:h-9 sm:px-4 sm:py-3 sm:text-sm"
                  >
                    <span className="pr-1 sm:pr-2 sm:text-[16px]">Get Started</span>
                    <motion.span
                      className="inline-flex shrink-0"
                      animate={{
                        rotate: [0, -14, 14, -8, 8, 0],
                        scale: [1, 1.1, 1.2, 1.3, 1.4, 1],
                        opacity: [1, 0.5, 1, 0.5, 1, 1],
                      }}
                      transition={{
                        delay: 0.5,
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        times: [0, 0.08, 0.15, 0.22, 0.3, 1],
                      }}
                    >
                      <LockIconFilled color="#fff" size={16} />
                    </motion.span>
                  </Button> */}

      {/* Mobile Menu Popup - Always available even when navbar is hidden */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 w-screen h-screen bg-black/20 z-40 md:hidden "
              onClick={toggleMobileMenu}
            />
            {/* Menu Popup */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed top-24 right-4 left-4 md:hidden bg-white dark:bg-[#192433] border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg z-50 max-h-[80vh] overflow-y-auto text-[#121714]"
            >
              <div className="p-4">
                {navItems.map((item) => (
                  <div key={item.label} className="mb-2 last:mb-0">
                    <button
                      onClick={() => handleMobileItemClick(item.label)}
                      className="w-full flex items-center justify-between py-3 px-4 hover:bg-gray-50 dark:hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <span className="font-medium ">{item.label}</span>
                      <motion.svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        animate={{ rotate: openDropdown === item.label ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <path
                          d="M3 4.5L6 7.5L9 4.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </motion.svg>
                    </button>
                    <AnimatePresence>
                      {openDropdown === item.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 pr-2 py-2 space-y-4">
                            {item.columns.map((column, colIndex) => (
                              <div key={colIndex}>
                                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                                  {column.heading}
                                </h3>
                                <div className="space-y-3">
                                  {column.items.map((dropdownItem, itemIndex) => (
                                    <a
                                      key={itemIndex}
                                      href={dropdownItem.href || "#"}
                                      className="block px-2 py-2 hover:bg-gray-50 dark:hover:bg-white/10 rounded-lg transition-colors"
                                      onClick={toggleMobileMenu}
                                    >
                                      <h4 className="font-bold text-sm mb-1">
                                        {dropdownItem.title}
                                      </h4>
                                      <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                                        {dropdownItem.description}
                                      </p>
                                    </a>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
                <div className="pt-4 border-t border-gray-200 space-y-2 mt-4">
                  {isAuthenticated ? (
                    <button
                      className="w-full bg-primary-green text-legal-navy px-4 py-3 rounded-xl text-sm font-extrabold shadow-lg shadow-primary-green/20 hover:scale-105 transition-transform active:scale-95"
                      onClick={() => {
                        toggleMobileMenu();
                        router.push("/doc/new");
                      }}
                    >
                      Go to Dashboard
                    </button>
                  ) : (
                    <>
                      <button
                        className="w-full px-4 py-3 text-sm font-bold hover:bg-gray-100 rounded-xl transition-colors text-left"
                        onClick={() => {
                          toggleMobileMenu();
                          goToLogin();
                        }}
                      >
                        Log In
                      </button>
                      <button
                        className="w-full bg-primary-green text-legal-navy px-4 py-3 rounded-xl text-sm font-extrabold shadow-lg shadow-primary-green/20 hover:scale-105 transition-transform active:scale-95"
                        onClick={() => {
                          toggleMobileMenu();
                          goToSignUp();
                        }}
                      >
                        Start Free Trial
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};
