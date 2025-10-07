"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ConfettiExplosion } from "react-confetti-explosion";

const rewards = [
  { name: "Golden Relic", rarity: "Legendary", price: "$500", image: "/reward1.png" },
  { name: "Mystic Orb", rarity: "Epic", price: "$250", image: "/reward2.png" },
  { name: "Ancient Scroll", rarity: "Rare", price: "$100", image: "/reward3.png" },
  { name: "Secret Token", rarity: "Common", price: "$50", image: "/reward4.png" },
];

export default function BoxOpeningPage() {
  const [pickedIndex, setPickedIndex] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [explode, setExplode] = useState(false);
  const router = useRouter();

  const shuffled = React.useMemo(() => [...rewards].sort(() => Math.random() - 0.5), []);

  const handlePick = (index: number) => {
    if (revealed) return;
    setPickedIndex(index);
    setTimeout(() => {
      setRevealed(true);
      setExplode(true); // trigger confetti
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white flex flex-col items-center justify-center relative overflow-hidden px-6 py-16">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl sm:text-5xl font-display text-yellow-400 mb-12 drop-shadow-[0_0_15px_rgba(255,200,0,0.8)]"
      >
        Pick One Card ✨
      </motion.h1>

      {/* Card Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 z-10 relative">
        {shuffled.map((reward, index) => {
          const isPicked = pickedIndex === index;
          const isRevealed = revealed;

          return (
            <motion.div
              key={index}
              className={`relative w-40 h-56 sm:w-48 sm:h-64 perspective cursor-pointer`}
              onClick={() => handlePick(index)}
              whileHover={{ scale: 1.05, rotateX: 5, rotateY: -5 }}
            >
              <motion.div
                animate={{
                  rotateY: isPicked || isRevealed ? 180 : 0,
                  scale: isPicked ? 1.1 : 1,
                  opacity: !isPicked && isRevealed ? 0.7 : 1,
                }}
                transition={{ duration: 0.8 }}
                className="relative w-full h-full preserve-3d"
              >
                {/* Front Side */}
                <div className="absolute inset-0 bg-gradient-to-b from-yellow-400/10 via-yellow-400/5 to-transparent border border-yellow-400/40 rounded-2xl flex flex-col items-center justify-center backface-hidden overflow-hidden shadow-[0_0_20px_rgba(255,200,0,0.2)]">
                  <Image
                    src="/logo.jpg"
                    alt="Mystery Card"
                    width={140}
                    height={140}
                    className="object-contain opacity-90 hover:scale-105 transition-transform duration-300"
                  />
                  <motion.p
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute text-4xl font-display font-bold text-yellow-300 drop-shadow-[0_0_10px_rgba(255,255,100,0.6)]"
                  >
                    ?
                  </motion.p>
                  <div className="absolute inset-0 rounded-2xl blur-2xl bg-yellow-400/10 pointer-events-none" />
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 bg-black border border-yellow-400/40 rounded-2xl flex flex-col items-center justify-center rotateY-180 backface-hidden p-3 shadow-lg">
                  <Image src={reward.image} alt={reward.name} width={100} height={100} className="mb-3 object-contain" />
                  <p className="text-yellow-300 font-bold text-center">{reward.name}</p>
                  <p className="text-sm text-gray-400 italic">{reward.rarity}</p>
                  <p
                    className={`mt-2 font-semibold transition-all duration-500 ${
                      isPicked ? "text-yellow-400 text-base" : "text-yellow-500 text-xl"
                    }`}
                  >
                    {reward.price}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Reveal Info */}
      {revealed && pickedIndex !== null && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12 z-10"
        >
          <p className="text-gray-300 text-lg mb-2">
            You picked:
            <span className="text-yellow-400 font-bold"> {shuffled[pickedIndex].name}</span>
          </p>
          <p className="text-yellow-400 text-2xl sm:text-3xl font-display mb-8 drop-shadow-[0_0_15px_rgba(255,200,0,0.7)]">
            Reward Value: {shuffled[pickedIndex].price}
          </p>

          <Button
            onClick={() => router.push("/products")}
            className="bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition-all px-6 py-3 rounded-xl shadow-lg"
          >
            Try Again 🔁
          </Button>
        </motion.div>
      )}

      {/* Glow & Confetti */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,215,0,0.05),_transparent_70%)] pointer-events-none" />
      {explode && <ConfettiExplosion force={0.7} duration={3000} particleCount={80} />}
    </div>
  );
}
