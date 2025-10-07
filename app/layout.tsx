// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Secret Verse",
  description: "Next.js App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" class="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        {/* 🎉 Custom golden-black toast theme */}
        <Toaster
          toastOptions={{
            style: {
              background: "#FFD700", // golden background
              color: "#000000", // black text
              border: "1px solid #000000",
              fontWeight: "600",
              borderRadius: "12px",
            },
            className: "shadow-lg",
          }}
        />

        {children}
      </body>
    </html>
  );
}
