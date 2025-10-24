"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

const OrderSuccessPage = () => {
  const router = useRouter();

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-black via-black/90 to-black/80 text-white flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Floating Glowing Orbs */}
      <motion.div
        animate={{ y: [0, -40, 0], x: [0, 40, -40, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-1/4 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl filter animate-pulse-slow -z-10"
      />
      <motion.div
        animate={{ y: [0, 50, 0], x: [0, -30, 30, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 right-1/3 w-48 h-48 bg-blue-400/10 rounded-full blur-2xl filter animate-pulse-slower -z-10"
      />

      {/* Success Animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 12 }}
        className="flex flex-col items-center text-center bg-black/50 backdrop-blur-xl p-12 rounded-3xl border border-yellow-400/30 shadow-[0_0_80px_15px_rgba(253,224,71,0.4)]"
      >
        <CheckCircle2 className="w-20 h-20 text-green-400 mb-6 animate-bounce-slow" />
        <h1 className="text-5xl font-display font-extrabold text-yellow-400 mb-4 drop-shadow-xl">
          Order Placed!
        </h1>
        <p className="text-gray-200 text-lg mb-8 max-w-lg">
          Your artefacts are ready to embark on a magical journey. 🌟 Each
          artefact you claimed contributes to the Secret Verse ecosystem —
          planting trees, recycling plastic, and saving carbon.
        </p>

        {/* Artefact Floating Animation */}
        <motion.div
          className="relative w-80 h-80 mb-8"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/box.jpg"
            alt="Veyrion Artefact Box"
            width={320}
            height={320}
            className="rounded-2xl object-cover shadow-[0_0_60px_15px_rgba(253,224,71,0.5)]"
          />
          <div className="absolute inset-0 rounded-2xl blur-3xl bg-yellow-400/30 animate-pulse-slow -z-10"></div>
        </motion.div>

        {/* Buttons */}
        <div className="flex gap-4">
          <Button
            onClick={() => router.push("/")}
            className="bg-yellow-400 text-black px-8 py-3 rounded-full font-bold hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            Back to Home
          </Button>
          <Button
            onClick={() => router.push("/cart")}
            className="bg-black/60 border border-yellow-400/30 text-yellow-400 px-8 py-3 rounded-full font-bold hover:bg-yellow-400 hover:text-black transition-all duration-300"
          >
            View Order
          </Button>
        </div>
      </motion.div>

      {/* Decorative Stars */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 bg-yellow-400 rounded-full"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 0],
            y: [0, -30, 0],
            x: [0, 20, -20, 0],
          }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}
          style={{
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 80 + 10}%`,
          }}
        />
      ))}
    </div>
  );
};

export default OrderSuccessPage;
