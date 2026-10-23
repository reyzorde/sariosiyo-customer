import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { Header } from "@/components/header";
import { BottomNav } from "@/components/bottom-nav";
import { CartBar } from "@/components/cart-bar";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Sarigo",
    template: "%s · Sarigo",
  },
  description:
    "Sariosiyoda oziq-ovqat yetkazib berish — mahalliy restoranlardan uyga.",
  applicationName: "Sarigo",
};

export const viewport: Viewport = {
  themeColor: "#C4521A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className={manrope.variable}>
      <body className="min-h-dvh bg-neutral-50 font-sans text-ink antialiased">
        <Header />
        <main className="pb-28 md:pb-16">{children}</main>
        <CartBar />
        <BottomNav />
      </body>
    </html>
  );
}
