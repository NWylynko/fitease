import type { Metadata } from "next";
import { Inter } from "next/font/google"
import "./globals.css";

import { Facebook, Twitter, Instagram } from 'lucide-react'
import Link from 'next/link'

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  variable: "--inter",
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "FitEase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        <div className="min-h-screen flex flex-col bg-background text-foreground">
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
            <div className="flex h-14 items-center">
              <div className="mr-4 flex">
                <Link className="mr-6 flex items-center space-x-2" href="/">
                  <span className="font-bold">FitEase</span>
                </Link>
              </div>
            </div>
          </header>
          {children}
          <footer className="border-t bg-muted">
            <div className="flex flex-col gap-4 py-10 md:h-24 md:flex-row md:items-center md:py-0 px-4">
              <div className="flex flex-1 items-center justify-center gap-4 md:justify-start">
                <nav className="flex gap-4 sm:gap-6">
                  <Link className="text-xs hover:underline underline-offset-4" href="#">
                    Terms of Service
                  </Link>
                  <Link className="text-xs hover:underline underline-offset-4" href="#">
                    Privacy
                  </Link>
                </nav>
              </div>
              <div className="flex flex-1 items-center justify-center gap-4 md:justify-end">
                <Link className="rounded-full" href="#">
                  <Facebook className="h-4 w-4" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link className="rounded-full" href="#">
                  <Twitter className="h-4 w-4" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link className="rounded-full" href="#">
                  <Instagram className="h-4 w-4" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </div>
            </div>
          </footer>
        </div >
      </body>
    </html>
  );
}
