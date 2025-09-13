"use client";

import Image from "next/image";
import { ReactNode } from "react";
import { StaticImageData } from "next/image";

interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  image?: string | StaticImageData;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Section - Background Image with Overlay */}
      <div className="relative hidden md:block">
        <Image
          src="/logo.jpg" // ✅ direct path, no import
          alt="Auth Background"
          fill
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* <div className="absolute inset-0 bg-black/60"></div> */}
        {/* <div className="relative z-10 flex flex-col items-center justify-center h-full px-10 text-center text-white">
          <h2 className="text-4xl font-playfair font-bold text-yellow-400">
            {title}
          </h2>
          <p className="mt-4 text-gray-200 max-w-md">{description}</p>
        </div> */}
      </div>

      {/* Right Section - Form */}
      <div className="flex items-center justify-center">
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
