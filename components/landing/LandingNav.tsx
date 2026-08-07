"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { IoCloseOutline } from "react-icons/io5";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { useGetSession } from "@/data/auth";
import { QlaretyLogo } from "@/assets/svg/QlaretyLogo";
import { Button } from "@/components/ui/button";

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Use Cases", href: "/use-cases" },
  { label: "Contact Us", href: "/contact-us" },
];

const emptySubscribe = () => () => {};

function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

export function LandingNav() {
  const router = useRouter();
  const { data: session } = useGetSession();
  const isAuthenticated = Boolean(session?.user);
  const user = session?.user;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isClient = useIsClient();

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  const closeMenu = () => setIsMobileMenuOpen(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const goToLogin = () => {
    closeMenu();
    router.push("/auth");
  };
  const goToSignUp = () => {
    closeMenu();
    router.push("/auth");
  };
  const handleGoToDashboard = () => {
    closeMenu();
    router.push("/doc/new");
  };

  return (
    <>
      <nav
        className={`mb-6 flex w-full sticky top-0 items-center justify-between gap-2 text-xs text-gray-700 sm:mb-10 sm:gap-5 sm:text-sm lg:mb-10 ${
          isMobileMenuOpen ? "relative z-10" : "z-10"
        }`}
      >
        <div className="flex min-w-0 items-center">
          <QlaretyLogo size={44} className="shrink-0 sm:h-[54px] sm:w-[54px]" />
          <h1 className=" truncate font-google-sans tracsking-tight text-base font-medium text-gray-800 sm:text-[16px]">
            larety
          </h1>
        </div>
        <div className="hidden font-brockmann text-gray-600 sm:flex items-center gap-3 font-medium sm:gap-7 text-[14px]">
          {NAV_ITEMS.map((item) => (
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
            <Button
              type="button"
              variant="primary-green"
              size="sm"
              onClick={handleGoToDashboard}
              className="gap-2"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/30 text-xs font-black uppercase">
                {user?.username?.charAt(0) || user?.email?.charAt(0) || "U"}
              </span>
              <span className="hidden sm:inline">Dashboard</span>
            </Button>
          ) : (
            <>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={goToLogin}
                className="hidden sm:inline-flex"
              >
                Log In
              </Button>
              <Button type="button" variant="primary-green" size="sm" onClick={goToSignUp}>
                Start Free Trial
              </Button>
            </>
          )}

          {/* Mobile Menu Button — z-30 keeps it above the backdrop/popup so the X stays tappable */}
          <button
            onClick={toggleMobileMenu}
            className="relative z-30 rounded-full border border-gray-300 p-2 transition-colors hover:bg-gray-100 md:hidden"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <IoCloseOutline className="h-6 w-6" />
            ) : (
              <HiOutlineMenuAlt3 className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>
      {/* Portaled to body so overlay is not clipped by parent padding/overflow */}
      {isClient &&
        createPortal(
          <AnimatePresence>
            {isMobileMenuOpen && (
              <>
                <motion.div
                  key="backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="fixed inset-0 bg-black/20 backdrsop-blur z-20 md:hidden"
                  onClick={closeMenu}
                  aria-hidden
                />
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="fixed z-40 top-20 text-sm right-4 left-4 md:hidden font-google-sans bg-white bsorder border-gray-200 rounded-2xl shadow-lg max-h-[80vh] overflow-y-auto text-[#121714]"
                  role="dialog"
                  aria-modal="true"
                >
                  <div className="p-4">
                    {NAV_ITEMS.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={closeMenu}
                        className="w-full flex items-center justify-between py-3 px-4 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    ))}
                    <div className="mt-4 space-y-2 border-t border-gray-200 pt-4">
                      {isAuthenticated ? (
                        <Button
                          type="button"
                          variant="primary-green"
                          className="w-full"
                          onClick={handleGoToDashboard}
                        >
                          Go to Dashboard
                        </Button>
                      ) : (
                        <>
                          <Button
                            type="button"
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={goToLogin}
                          >
                            Log In
                          </Button>
                          <Button
                            type="button"
                            variant="primary-green"
                            className="w-full"
                            onClick={goToSignUp}
                          >
                            Start Free Trial
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
