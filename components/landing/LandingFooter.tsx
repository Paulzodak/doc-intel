import { QlaretyLogo } from "@/assets/svg/QlaretyLogo";

export function LandingFooter() {
  return (
    <footer className="border-t border-gray-100 bg-white px-4 py-2.5 dark:border-gray-800 dark:bg-background-dark sm:py-3 md:px-14 lg:px-24">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-3 md:flex-row md:gap-6">
        <div className="flex min-w-0 items-center borsder gap-1">
          <QlaretyLogo className="shrsink-0 sm:h-[40px] sm:w-[40px]" />
          <span className="truncate text-sm font-bold text-gray-700 sm:text-base">larety</span>
        </div>
        <p className="text-center text-[11px] text-gray-700 sm:text-xs">
          © 2024 Qlarety. All rights reserved.
        </p>
        <div className="flex gap-3 text-[11px] font-medium text-gray-700 sm:gap-5 sm:text-xs">
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
  );
}
