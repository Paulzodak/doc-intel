"use client";

import { QlaretyLogo } from "@/assets/svg/QlaretyLogo";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { IoCloseOutline } from "react-icons/io5";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetSession } from "@/data/auth";

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
  href: string;
  columns: DropdownColumn[];
}

export function LandingNav() {
  const router = useRouter();
  const { data: session } = useGetSession();
  const isAuthenticated = session?.user;
  const user = session?.user;
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleMobileItemClick = (item: NavItem) => {
    router.push(item.href);
    // if (openDropdown === label) {
    //   setOpenDropdown(null);
    // } else {
    //   setOpenDropdown(label);
    // }
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
      label: "Use Cases",
      href: "/use-cases",
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
      href: "/contact-us",
      label: "Contact Us",
      columns: [
        {
          heading: "SUPPORT",
          items: [
            {
              title: "Contact Us",
              description: "Get in touch with our team for any inquiries.",
              href: "/contact-us",
            },
            {
              title: "Help & FAQ",
              description: "Find answers to common questions about Qlarety.",
              href: "/contact-us",
            },
          ],
        },
      ],
    },
    // {
    //   label: "Pricing",
    //   columns: [
    //     {
    //       heading: "PLANS",
    //       items: [
    //         {
    //           title: "Basic Plan",
    //           description: "Perfect for individuals and small teams.",
    //           href: "/contact",
    //         },
    //         {
    //           title: "Pro Plan",
    //           description: "Advanced features for growing businesses.",
    //           href: "/contact",
    //         },
    //         {
    //           title: "Enterprise Plan",
    //           description: "Custom solutions for large organizations.",
    //           href: "/contact",
    //         },
    //       ],
    //     },
    //   ],
    // },
  ];
  return (
    <nav className="mb-6 flex w-full z-10 sticky top-0 items-center justify-between gap-2 text-xs text-gray-700 sm:mb-10 sm:gap-5 sm:text-sm lg:mb-10">
      <div className="flex min-w-0 items-center">
        <QlaretyLogo size={44} className="shrink-0 sm:h-[54px] sm:w-[54px]" />
        <h1 className=" truncate font-google-sans tracsking-tight text-base font-medium text-gray-800 sm:text-[16px]">
          larety
        </h1>
      </div>
      <div className="hidden font-brockmann text-gray-600 sm:flex items-center gap-3 font-medium sm:gap-7 text-[14px]">
        {navItems.map((item: NavItem) => (
          <Link
            key={item.label}
            href={item.href}
            className="hover:text-primary-green transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-3">
        {isAuthenticated ? (
          <>
            <button
              onClick={handleGoToDashboard}
              className="bg-primary-green text-black px-3.5 py-1.5 rounded-xl text-[13px] font-extrabold shadow-lg shadow-primary-green/30 hover:scale-105 transition-transform active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <span className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center text-xs font-black uppercase">
                {user?.username?.charAt(0) || user?.email?.charAt(0) || "U"}
              </span>
              <span className="hidden sm:inline">{"Dashboard"}</span>
            </button>
          </>
        ) : (
          <>
            <button className="hidden sm:block px-4 py-1.5 text-[13px] font-bold hover:bg-gray-100 rounded-xl transition-colors hover:text-primary-green cursor-pointer">
              Log In
            </button>
            <button className="bg-primary-green text-legal-navy px-5 py-2 rounded-xl text-[13px] font-extrabold shadow-lg shadow-primary-green/30 hover:scale-105 transition-transform active:scale-95 cursor-pointer">
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
              className="fixed inset-0 w-screen h-screen bg-black/20 z-10 md:hidden "
              onClick={toggleMobileMenu}
            />
            {/* Menu Popup */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed z-20 top-24 right-4 left-4 md:hidden bg-white dark:bg-[#192433] border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg max-h-[80vh] overflow-y-auto text-[#121714]"
            >
              <div className="p-4">
                {navItems.map((item) => (
                  <div key={item.label} className="mb-2 last:mb-0">
                    <button
                      onClick={() => handleMobileItemClick(item)}
                      className="w-full flex items-center justify-between py-3 px-4 hover:bg-gray-50 dark:hover:bg-white/10 rounded-lg transition-colors"
                    >
                      {/* <span className="font-medium ">{item.label}</span> */}
                      <span className="font-medium ">{item.label}</span>
                      {/* <motion.svg
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
                      </motion.svg> */}
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
}
