// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'CGM Lab - National Taiwan University of Science and Technology',
  description: 'Computer Graphics and Multimedia Laboratory',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex flex-col min-h-screen">
        <div className="max-w-[1200px] mx-auto bg-white shadow border-x border-gray-300">
          <Header />
          <main className="flex-grow px-4 py-2">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}