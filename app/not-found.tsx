"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Wrench, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();
  const [stars, setStars] = useState<
    { top: string; left: string; size: number; delay: number }[]
  >([]);

  useEffect(() => {
    // Generate stars on client
    const newStars = Array.from({ length: 12 }, () => ({
      top: `${Math.random() * 80 + 10}%`,
      left: `${Math.random() * 80 + 10}%`,
      size: Math.random() * 0.4 + 0.2, // varied size
      delay: Math.random() * 3,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white flex flex-col items-center justify-center overflow-hidden px-6">
      {/* Background aura */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[35rem] h-[35rem] bg-yellow-400/20 blur-[140px] rounded-full -z-10"
      />

      {/* Orbiting soft light */}
      <motion.div
        className="absolute w-[15rem] h-[15rem] rounded-full bg-yellow-400/10 blur-3xl -z-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />

      {/* Animated wrench */}
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="mb-6 relative"
      >
        <Wrench className="w-20 h-20 text-yellow-400 drop-shadow-[0_0_20px_rgba(253,224,71,0.8)]" />
        <motion.span
          className="absolute -top-4 -right-4 w-3 h-3 rounded-full bg-yellow-300 shadow-[0_0_12px_rgba(253,224,71,0.9)]"
          animate={{
            opacity: [0.6, 1, 0.6],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-5xl md:text-6xl font-extrabold text-yellow-400 mb-3 tracking-wide drop-shadow-[0_0_10px_rgba(253,224,71,0.5)]"
      >
        Under Development
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-gray-300 max-w-md text-center mb-10 leading-relaxed"
      >
        This page is still being forged in the secret labs of{" "}
        <span className="text-yellow-400 font-semibold">
          The Secret Verse 🔮
        </span>
        <br />
        Check back soon for something truly magical!
      </motion.p>

      {/* Back Button */}
      <motion.div whileHover={{ scale: 1.05 }}>
        <Button
          onClick={() => router.push("/")}
          className="bg-yellow-400 text-black px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:shadow-[0_0_25px_rgba(253,224,71,0.6)] transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4" /> Go Back Home
        </Button>
      </motion.div>

      {/* Floating sparkles */}
      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute bg-yellow-400 rounded-full"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}rem`,
            height: `${star.size}rem`,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 0],
            y: [0, -20, 0],
            x: [0, 10, -10, 0],
          }}
          transition={{
            duration: 5 + star.delay,
            repeat: Infinity,
            delay: star.delay,
          }}
        />
      ))}
    </div>
  );
}
