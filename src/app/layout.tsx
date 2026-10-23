import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { Header } from "@/components/header";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Sariosiyo Dostavka",
    template: "%s · Sariosiyo Dostavka",
  },
  description:
    "Sariosiyo shahrida oziq-ovqat yetkazib berish — mahalliy restoranlardan uyga.",
  applicationName: "Sariosiyo Dostavka",
};

export const viewport: Viewport = {
  themeColor: "#C4521A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className={manrope.variable}>
      <body className="font-sans antialiased">
        <div className="mx-auto min-h-dvh max-w-lg bg-cream">
          <Header />
          <main className="pb-24">{children}</main>
        </div>
      </body>
    </html>
  );
}
