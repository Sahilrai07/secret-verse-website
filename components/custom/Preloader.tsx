"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Preloader() {
  const [show, setShow] = useState(false);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    // Check if preloader has already been shown in this session
    const hasSeenPreloader = sessionStorage.getItem("hasSeenPreloader");

    if (!hasSeenPreloader) {
      setShow(true);

      // Step 1: Show circle first (2.5s), then logo
      const logoTimer = setTimeout(() => setShowLogo(true), 2500);

      // Step 2: Hide preloader completely at 5s
      const hideTimer = setTimeout(() => {
        setShow(false);
        sessionStorage.setItem("hasSeenPreloader", "true"); // mark as shown
      }, 5000);

      return () => {
        clearTimeout(logoTimer);
        clearTimeout(hideTimer);
      };
    }
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex justify-center items-center">
      <div className="relative w-full h-full flex justify-center items-center">
        {/* Circle first */}
        {!showLogo && (
          <div className="absolute w-[220px] h-[220px] animate-spin">
            <Image
              src="/circle1.png"
              alt="Circle with Runes"
              width={220}
              height={220}
            />
          </div>
        )}

        {/* Then Logo */}
        {showLogo && (
          <div className="absolute opacity-0 animate-fadeIn">
            <Image src="/logo.png" alt="Logo" width={280} height={80} />
          </div>
        )}
      </div>
    </div>
  );
}
