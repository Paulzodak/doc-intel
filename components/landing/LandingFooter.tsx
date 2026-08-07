import Link from "next/link";
import { QlaretyLogo } from "@/assets/svg/QlaretyLogo";
import { Button } from "@/components/ui/button";

const PRODUCT_LINKS = [
  { label: "Use Cases", href: "/use-cases" },
  { label: "Analyze a document", href: "/auth" },
  { label: "Contact", href: "/contact-us" },
] as const;

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
] as const;

export function LandingFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-10 overflow-hidden border-t border-[#1e2939]/10 bg-[#11161f] text-white dark:border-white/10">
      {/* <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(71,225,140,0.18) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      /> */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-primary-green/5 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 top-0 h-56 w-56 rounded-full bg-primary-green/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-[1200px] px-4 py-12 sm:px-8 sm:py-14 md:px-14 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-14">
          <div className="max-w-md">
            <Link href="/" className="inline-flex items-center gap-0">
              <QlaretyLogo className="h-11 w-11" width={44} height={44} shouldNavigate={false} />
              <span className="font-lora text-white/80 text-2xl font-semibold tracking-tight">
                larety
              </span>
            </Link>
            <p className="mt-4 font-brockmann text-sm font-light leading-relaxed text-white/55">
              AI-powered legal document analysis — risk grading, compliance checks, and clause
              clarity in seconds.
            </p>
            <Button variant="primary-green" size="default" className="mt-6">
              <Link href="/auth">
                Get started
                <span aria-hidden className="text-base leading-none">
                  →
                </span>
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-12">
            <div>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-green">
                Product
              </p>
              <ul className="space-y-2.5">
                {PRODUCT_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/65 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-green">
                Legal
              </p>
              <ul className="space-y-2.5">
                {LEGAL_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/65 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-green">
                Reach us
              </p>
              <a
                href="mailto:contact@qlarety.com"
                className="block text-sm text-white/65 transition-colors hover:text-primary-green"
              >
                contact@qlarety.com
              </a>
              <p className="mt-2 text-sm text-white/40">Lagos, Nigeria</p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-white/40">© {year} Qlarety. All rights reserved.</p>
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/35">
            Built for legal precision
          </p>
        </div>
      </div>
    </footer>
  );
}
