import DashboardLayout from "@/components/templates/DashboardLayout";
import { DashboardProvider } from "@/components/providers/DashboardProvider";
import { getServerUser } from "@/lib/server/user";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
