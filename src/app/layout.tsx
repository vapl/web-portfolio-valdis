import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import HeaderLogo from "@/components/HeaderLogo";
import "./globals.css";
import Navigation from "@/components/Navigation";
import LenisProvider from "@/components/LenisProvider";
import GoToTop from "@/components/GoToTop";

const geistSans = Geist({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Web Portfolio",
  description: "My personal developer portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} font-roboto antialiased bg-background`}
      >
        <HeaderLogo />
        <Navigation />
        <LenisProvider>{children}</LenisProvider>
        <GoToTop />
      </body>
    </html>
  );
}
