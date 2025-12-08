import clsx from "clsx";
import React from "react";

interface IProps {
  children: React.ReactNode;
  className?: string;
}

const ResponsiveWrapper = ({ children, className }: IProps) => {
  return <div className={clsx(className, "px-4 lg:px-0 max-w-[1440px] mx-auto")}>{children}</div>;
};

export default ResponsiveWrapper;
