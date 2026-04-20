import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { LiquidLoader } from "./LiquidLoader";
import { SpinnerLoader } from "./SpinnerLoader";

const buttonVariants = cva(
  "relative cursor-pointer text-md inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-200 ease-out hover:scale-95 active:scale-90 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-none bg-green-600 shadow-lg shadow-green-800/30  text-[14px] w-full  text-white font-bold rounded-full py-3 border-0 hover:opacity-90  border-[1.3px] border-primary",
        secondary: "bg-[#3767ea23] text-black hover:bg-[#3767ea33] border-none",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadsow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        "primary-green":
          "bg-green-600 hover:bg-green-600 shadsow-lg shsadow-primary-green/30 text-white font-medium transition-colors",
      },
      size: {
        default: "h-12 px-6 rounded-[20px]  py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-16 rounded-md px-10  rounded-[12px] has-[>svg]:px-4",
        analyze: "px-8 py-3 rounded-[20px] text-sm",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface ButtonProps extends React.ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  loadingType?: "spinner" | "liquid" | "both";
  loadingPercentage?: number;
  loadingText?: string;
  showSpinner?: boolean;
  showLiquid?: boolean;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  isLoading = false,
  loadingPercentage = 0,
  loadingText,
  children,
  disabled,
  showLiquid,
  showSpinner,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  const isDisabled = disabled || isLoading;

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      // disabled={isDisabled}
      {...props}
    >
      {/* Liquid Loader */}
      {isLoading && showLiquid && (
        <LiquidLoader
          percentage={loadingPercentage}
          color={
            variant === "secondary"
              ? "bg-[#3767ea]"
              : variant === "destructive"
                ? "bg-white"
                : "bg-white"
          }
        />
      )}

      {/* Content wrapper with relative positioning for z-index */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {/* Spinner Loader */}
        {isLoading && showSpinner && (
          <SpinnerLoader
            size={size === "sm" ? "sm" : size === "lg" ? "lg" : "md"}
            color={
              variant === "secondary" ||
              variant === "outline" ||
              variant === "ghost" ||
              variant === "primary-green"
                ? "text-black"
                : "text-white"
            }
          />
        )}

        {/* Button content */}
        {isLoading && loadingText ? <span>{loadingText}</span> : children}
      </span>
    </Comp>
  );
}

export { Button, buttonVariants };
