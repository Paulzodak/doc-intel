// "use client";
// import { useGetUser } from "@/data/user";
import DashboardLayout from "@/components/templates/DashboardLayout";
import { getServerUser } from "@/lib/server/user";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const { data: user } = useGetUser();
  // console.log(user, "user");
  // Fetch user before rendering - redirects to login if 401
  // await getServerUser();

  return <DashboardLayout title="Document Analysis Dashboard">{children}</DashboardLayout>;
}
