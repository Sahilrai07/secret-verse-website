"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Preloader() {
  const [show, setShow] = useState(true);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    // Show logo after 5 seconds
    const logoTimer = setTimeout(() => setShowLogo(true), 5000);

    // Hide preloader after 10 seconds
    const hideTimer = setTimeout(() => setShow(false), 10000);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex justify-center items-center">
      <div className="relative w-full h-full flex justify-center items-center">
        {/* Step 1: Circle with runes */}
        {!showLogo && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px]">
            <Image
              src="/circle1.png"
              alt="Circle with Runes"
              width={220}
              height={220}
              className="animate-spin"
            />
          </div>
        )}

        {/* Step 2: Logo */}
        {showLogo && (
          <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 animate-fadeIn">
            <Image
              src="/logo.png"
              alt="Logo"
              width={280}
              height={80}
            />
          </div>
        )}
      </div>
    </div>
  );
}
