"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    {
      label: "Features",
      items: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
    },
    {
      label: "Use Cases",
      items: ["Use Case 1", "Use Case 2", "Use Case 3"],
    },
    {
      label: "Pricing",
      items: ["Basic Plan", "Pro Plan", "Enterprise Plan"],
    },
    {
      label: "Resources",
      items: ["Documentation", "Blog", "Support", "Community"],
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

  return (
    <div className="py-4 flex items-center justify-end gap-4 bg-transparent text-black relative">
      {/* Desktop Menu */}
      <nav className="hidden md:flex border border-gray-200 bg-white shadow-[0_0_5px_2px_rgba(156,163,175,0.1)] rounded-2xl text-md font-medium relative">
        {navItems.map((item) => (
          <div
            key={item.label}
            className="relative py-3 px-4"
            onMouseEnter={() => handleMouseEnter(item.label)}
            onMouseLeave={handleMouseLeave}
          >
            <button className="flex items-center gap-1 hover:text-gray-600 transition-colors">
              <span>{item.label}</span>
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
            <AnimatePresence>
              {openDropdown === item.label && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[180px] py-2 z-50"
                >
                  {item.items.map((dropdownItem, index) => (
                    <motion.div
                      key={dropdownItem}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.2 }}
                      className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm"
                    >
                      {dropdownItem}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden border border-gray-200 bg-white shadow-[0_0_5px_2px_rgba(156,163,175,0.1)] rounded-2xl p-3 flex items-center justify-center"
        aria-label="Toggle menu"
      >
        <motion.div animate={{ rotate: isMobileMenuOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          {isMobileMenuOpen ? (
            <IoCloseOutline className="w-6 h-6" />
          ) : (
            <HiOutlineMenuAlt3 className="w-6 h-6" />
          )}
        </motion.div>
      </button>

      {/* Mobile Menu Popup */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 z-40 md:hidden"
              onClick={toggleMobileMenu}
            />
            {/* Menu Popup */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed top-20 right-4 left-4 md:hidden bg-white border border-gray-200 rounded-2xl shadow-lg z-50 max-h-[80vh] overflow-y-auto"
            >
              <div className="p-4">
                {navItems.map((item) => (
                  <div key={item.label} className="mb-2 last:mb-0">
                    <button
                      onClick={() => handleMobileItemClick(item.label)}
                      className="w-full flex items-center justify-between py-3 px-4 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <span className="font-medium">{item.label}</span>
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
                          <div className="pl-4 pr-2 py-2 space-y-1">
                            {item.items.map((dropdownItem, subIndex) => (
                              <motion.div
                                key={dropdownItem}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: subIndex * 0.05, duration: 0.2 }}
                                className="px-4 py-2 hover:bg-gray-50 rounded-lg cursor-pointer text-sm"
                              >
                                {dropdownItem}
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
