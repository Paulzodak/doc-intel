import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { Providers } from "@/components/providers/Providers";
import { isProduction } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://qlarety.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Qlarety | AI-Powered Legal Document Analysis",
    template: "%s | Qlarety",
  },
  description:
    "Analyze legal documents instantly with AI. Qlarety delivers precision-engineered document intelligence for risk assessment, compliance checking, and contract review.",
  keywords: [
    "legal document analysis",
    "AI contract review",
    "compliance checking",
    "risk assessment",
    "legal tech",
    "document intelligence",
    "contract analysis",
  ],
  authors: [{ name: "Qlarety", url: siteUrl }],
  creator: "Qlarety",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Qlarety",
    title: "Qlarety | AI-Powered Legal Document Analysis",
    description:
      "Analyze legal documents instantly with AI. Risk assessment, compliance checking, and contract review in seconds.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Qlarety | AI-Powered Legal Document Analysis",
    description:
      "Analyze legal documents instantly with AI. Risk assessment, compliance checking, and contract review in seconds.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap"
          rel="stylesheet"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&amp;display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair:ital,opsz,wght@0,5..1200,300..900;1,5..1200,300..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased `}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
