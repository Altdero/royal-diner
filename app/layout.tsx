import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { QueryProvider } from "@/src/providers/query.provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Royal Diner",
  description: "Diner order management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="mx-auto flex h-full w-full max-w-7xl flex-col bg-slate-100">
        <QueryProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:rounded-lg focus:bg-violet-700 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:outline-none"
          >
            Skip to main content
          </a>
          <Nav />
          <main
            id="main-content"
            className="flex flex-1 flex-col overflow-hidden"
          >
            {children}
          </main>
          <Toaster richColors position="top-right" />
        </QueryProvider>
      </body>
    </html>
  );
}
