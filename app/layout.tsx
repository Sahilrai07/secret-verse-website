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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 🎉 Custom golden-black toast theme */}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#000", // black bg
              color: "#FFD700", // golden text
              border: "1px solid #FFD700",
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
