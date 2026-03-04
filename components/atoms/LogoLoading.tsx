"use client";
import { motion } from "framer-motion";
import { QlaretyLogo } from "@/assets/svg/QlaretyLogo";

export default function LogoLoading({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center px-4 font-jakarta ${className}`}
    >
      <div>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className=" animate-pulse"
        >
          <QlaretyLogo width={100} height={100} className="mx-auto" />
        </motion.div>
        {children}
      </div>
    </div>
  );
}
