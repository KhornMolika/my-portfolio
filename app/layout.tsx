import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Aurora from "../components/background/Aurora";
import Header from "../components/navbar/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Khorn-Molika",
  description: "khorn molika portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        {/* Aurora background */}
        <div className="fixed inset-0 -z-10">
          <Aurora
            colorStops={["#0F2E26", "#6F8F7A", "#C6A15B"]}
            blend={0.5}
            amplitude={1.0}
            speed={0.5}
          />
        </div>
        <Header />

        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
