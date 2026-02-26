"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";
import { useShowNav } from "@/hooks/layout/useShowNav";
import { useRouter } from "next/navigation";
import { QllaretyLogo } from "@/assets/svg/QllaretyLogo";
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
  columns: DropdownColumn[];
}

const Navbar = () => {
  const { data: session, isLoading: isSessionLoading } = useGetSession();
  const isAuthenticated = session?.user;
  const user = session?.user;

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const isVisible = useShowNav();
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
              description: "Find answers to common questions about Qllarety.",
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

  const handleMouseEnter = (label: string) => {
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

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

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 z-50 w-full px-4 md:px-6 pt-4 bg-transparent text-[#121714] font-jakarta"
          >
            <div className="max-w-[1400px] mx-auto !p-0 !rounded-full bg-white/80">
              <div className="shadsow-sm bg-gradient-to-r from-blue-300/10 via-purple-300/10 bordser via-pink-300/10 via-orange-300/10 to-primary-green/10 backdrop-blur-[2px] border border-zinc-100 shasdow-sm px-6 md:px-20 py-2 flex items-center justify-between rounded-full">
                <div className="flex items-center gap-3">
                  <QllaretyLogo width={60} height={60} className="p-0" />
                  <h2 className="text-2xl font-[1000] font-jakarta tracking-tight hidden sm:block">
                    Qllarety
                  </h2>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-10 relative">
                  {navItems.map((item) => (
                    <div
                      key={item.label}
                      className="relative"
                      onMouseEnter={() => handleMouseEnter(item.label)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <button className="text-sm font-semibold hover:text-primary-green transition-colors flex items-center gap-1">
                        <span className=" text-[16px] text-gradient">{item.label}</span>
                        <motion.svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          animate={{ rotate: openDropdown === item.label ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="mt-0.5"
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

                      {/* Dropdown Menu */}
                      <AnimatePresence>
                        {openDropdown === item.label && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-2 bg-white dark:bg-[#192433] border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl min-w-[600px] max-w-[800px] p-8 z-50"
                            onMouseEnter={() => handleMouseEnter(item.label)}
                            onMouseLeave={handleMouseLeave}
                          >
                            <div className="grid grid-cols-3 gap-8">
                              {item.columns.map((column, colIndex) => (
                                <div key={colIndex} className="flex flex-col">
                                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
                                    {column.heading}
                                  </h3>
                                  <div className="space-y-4">
                                    {column.items.map((dropdownItem, itemIndex) => (
                                      <motion.div
                                        key={itemIndex}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: itemIndex * 0.05, duration: 0.2 }}
                                      >
                                        <a
                                          href={dropdownItem.href || "#"}
                                          className="block group hover:opacity-80 transition-opacity"
                                        >
                                          <h4 className="font-bold text-sm mb-1 group-hover:text-primary-green transition-colors">
                                            {dropdownItem.title}
                                          </h4>
                                          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                                            {dropdownItem.description}
                                          </p>
                                        </a>
                                      </motion.div>
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
                </nav>

                {/* Action Buttons */}
                <div className="flex items-center gap-4">
                  {isAuthenticated ? (
                    <>
                      <button
                        onClick={() => router.push("/doc/new")}
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
                        onClick={goToLogin}
                        className="hidden sm:block px-5 py-2 text-sm font-bold hover:bg-gray-100 rounded-xl transition-colors hover:text-primary-green cursor-pointer"
                      >
                        Log In
                      </button>
                      <button
                        onClick={goToSignUp}
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
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

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
    </>
  );
};

export default Navbar;
