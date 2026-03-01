import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TRPCReactProvider } from "@/trpc/client";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";

import { ClerkProvider } from "@clerk/nextjs"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Quantro — AI Website Builder",
    template: "%s | Quantro",
  },
  description:
    "Build complete websites in seconds with AI. Describe your vision, get production-ready code instantly.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://quantro.vercel.app"
  ),
  openGraph: {
    title: "Quantro — AI Website Builder",
    description:
      "Build complete websites in seconds with AI. Describe your vision, get production-ready code instantly.",
    siteName: "Quantro",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quantro — AI Website Builder",
    description:
      "Build complete websites in seconds with AI. Describe your vision, get production-ready code instantly.",
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
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "purple"
        }
      }}
    >
      <TRPCReactProvider>
        <html lang="en" suppressHydrationWarning>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Toaster />
              {children}
            </ThemeProvider>
          </body>
        </html>
      </TRPCReactProvider>
    </ClerkProvider>
  );
}
