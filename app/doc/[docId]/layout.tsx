"use client";
import DashboardLayout from "@/components/templates/DashboardLayout";
import { isProduction } from "@/lib/utils";

export default function DocLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("isProduction", isProduction);
  return <DashboardLayout title="Document Analysis Dashboard">{children}</DashboardLayout>;
}
