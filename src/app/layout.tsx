// src/app/layout.tsx
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CGM Lab - National Taiwan University of Science and Technology",
  description: "Computer Graphics and Multimedia Laboratory",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex flex-col min-h-screen">
        <div className="max-w-[1000px] min-w-[1000px] mt-[10px] mb-[20px] mx-auto bg-white rounded-[25px] border-0 overflow-hidden shadow-[0px_0px_8px_0px_rgba(0,0,0,0.75)] border-gray-300">
          <Header />
          <main className="flex-grow px-4 py-2">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}