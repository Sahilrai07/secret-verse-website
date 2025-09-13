// components/custom/LayoutWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/custom/Navbar";
import Footer from "@/components/custom/Footer";
import Preloader from "@/components/custom/Preloader";
import { useEffect, useState } from "react";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsFirstLoad(false), 1500); // Preloader 1.5s
    return () => clearTimeout(timer);
  }, []);

  const isLoginPage = pathname === "/login" || pathname === "/register";

  return (
    <>
      {isFirstLoad && <Preloader />}
      {!isLoginPage && <Navbar />}
      {children}
      {!isLoginPage && <Footer />}
    </>
  );
}
