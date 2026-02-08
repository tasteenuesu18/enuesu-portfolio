import type { Metadata } from "next";
import { Geist, Geist_Mono, Silkscreen, Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Loading } from "@/components/layout/Loading";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const silkscreen = Silkscreen({
  weight: "400",
  variable: "--font-dot",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "enuesu | Immersive Portfolio",
  description: "Engineer / Lazy Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${silkscreen.variable} ${inter.variable} antialiased bg-navy-900 text-foreground selection:bg-accent selection:text-white`}
        suppressHydrationWarning
      >
        <Loading />
        <Sidebar />
        <div className="flex flex-col w-full min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
