// components/custom/LayoutClient.tsx (client)
"use client";

import { usePathname } from "next/navigation";
import Preloader from "@/components/custom/Preloader";
import { useEffect, useState } from "react";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsFirstLoad(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const isLoginPage = pathname === "/login" || pathname === "/register";

  return (
    <>
      {isFirstLoad && <Preloader />}
      {!isLoginPage && children}
    </>
  );
}
