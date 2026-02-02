import DecorativeDots from "@/components/DecorativeDots";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <DecorativeDots count={30} className="opacity-50" dropAnimate />
      {children}
    </div>
  );
}
