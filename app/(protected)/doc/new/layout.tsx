"use client";
import DashboardLayout from "@/components/templates/DashboardLayout";

export default function DocLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardLayout title="Create New Document">{children}</DashboardLayout>;
}
