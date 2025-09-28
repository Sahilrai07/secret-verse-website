"use client";
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  WandSparkles,
  Sword,
  Package,
  Leaf,
  Trees,
  Recycle,
  Globe,
} from "lucide-react";

import { artefacts } from "@/data/products";
import ProductCard from "@/components/custom/ProductCard";
import ArtefactJourney from "@/sections/ArtefactJourney";
import BecomeVendor from "@/sections/BecomeVendor";

type RealmType = "daily" | "rare" | "secret";

const Home = () => {

  const [showContent, setShowContent] = useState(false);
  const [selectedRealm, setSelectedRealm] = useState<RealmType>("daily");
  return (
    <div className="w-full">
      {/* Parallax Section 1 */}
      <div className="parallax relative w-full h-screen flex flex-col items-center justify-center text-center text-white">
        {/* Dark Gradient Overlay */}
        {/* <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 w-full z-0"></div> */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative z-10 px-6"
        >
          {/* Floating Logo */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src={"/logo.png"}
              alt="Logo"
              width={600}
              height={400}
              className="mx-auto mb-6 drop-shadow-xl"
              priority
            />
          </motion.div>
          {/* Subtitle */}
          <p className="mt-4 text-lg sm:text-xl max-w-2xl mx-auto font-body text-yellow-300 drop-shadow-md">
            Where a new world begins
          </p>
        </motion.div>
      </div>

      {/* Premium About Section (Veyrion Story) */}
      <div className="parallax2 relative h-auto min-h-screen flex flex-col lg:flex-row items-center justify-center overflow-hidden py-16 lg:py-0">
        {/* Decorative Orbs */}
        <div className="absolute top-10 left-1/4 w-32 h-32 bg-yellow-400/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-1/4 w-24 h-24 bg-yellow-500/20 rounded-full filter blur-2xl animate-pulse-slower"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 bg-black/50 backdrop-blur-lg rounded-3xl shadow-2xl p-6 sm:p-10 border border-yellow-400/30"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold mb-6 text-white drop-shadow-xl">
              The Story of Veyrion
            </h2>

            <p className="text-gray-200 text-sm sm:text-md md:text-md leading-relaxed mb-4">
              Artefacts lost in another world, now reappearing here to preserve
              Earth. Every artefact you claim fuels an eco-mission — trees
              planted, plastic recycled, carbon saved. Each artefact carries a
              legacy, a story waiting to be unveiled.
            </p>

            <p className="text-gray-300 text-sm sm:text-md md:text-md leading-relaxed mb-4">
              Join the explorers of The Secret Verse and immerse yourself in a
              magical journey. Experience stories, mysteries, and treasures
              beyond imagination.
            </p>

            <p className="text-gray-300 text-sm sm:text-md md:text-md leading-relaxed mb-4">
              Beyond discovery, every action you take contributes to a greater
              cause. By claiming artefacts, you are part of a living ecosystem
              where exploration meets sustainability. Trees grow, plastics
              vanish, and carbon footprints diminish — all powered by your
              journey through the Secret Verse.
            </p>
          </motion.div>

          {/* Right Image with Floating Animation */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 relative flex justify-center items-center mt-8 lg:mt-0"
          >
            {/* Floating Artefact Image with Glow */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 rounded-3xl shadow-lg border border-yellow-300 w-full max-w-[400px] sm:max-w-[500px]"
            >
              <Image
                src="/box.jpg"
                alt="Veyrion Artefact"
                width={500}
                height={500}
                className="rounded-3xl object-cover w-full h-auto shadow-[0_0_40px_20px_rgba(253,224,71,0.6)]"
                priority
              />

              {/* Yellow Glow Layer */}
              <div className="absolute inset-0 rounded-3xl blur-3xl bg-yellow-400/30 animate-pulse-slow z-[-1]"></div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="parallax3 relative w-full min-h-screen flex items-center justify-center py-16 overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold mb-12 text-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-white drop-shadow-xl text-center"
          >
            How It Works
          </motion.h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: (
                  <WandSparkles className="w-12 h-12 text-yellow-400 mb-4" />
                ),
                title: "Enter The Verse",
                desc: "Sign up to begin your journey into The Secret Verse.",
              },
              {
                icon: <Sword className="w-12 h-12 text-yellow-400 mb-4" />,
                title: "Discover Artefacts",
                desc: "Explore unique artefacts hidden in the Verse.",
              },
              {
                icon: <Package className="w-12 h-12 text-yellow-400 mb-4" />,
                title: "Unbox The Secret",
                desc: "Unlock mystery boxes and rare treasures.",
              },
              {
                icon: <Leaf className="w-12 h-12 text-yellow-400 mb-4" />,
                title: "Track Eco Impact",
                desc: "See your contribution to trees, carbon, and sustainability.",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: i * 0.3 }}
                viewport={{ once: true }}
                className="relative flex flex-col items-center p-6 bg-black/60 backdrop-blur-lg rounded-2xl shadow-2xl border border-yellow-400/30 hover:scale-105 transition-transform duration-300"
              >
                {/* Floating Glow Orbs for each card */}
                <div className="absolute w-32 h-32 bg-yellow-400/20 rounded-full blur-3xl -z-10 animate-pulse-slower top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

                {/* Icon */}
                {step.icon}

                <h3 className="text-lg sm:text-xl font-bold text-yellow-400 mb-2 font-display text-center">
                  {step.title}
                </h3>
                <p className="text-gray-200 text-center text-sm sm:text-base leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="parallax4 relative w-full py-24 bg-black/80 flex flex-col items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-display font-extrabold text-yellow-400 mb-4 drop-shadow-xl ">
            Artefacts Await You
          </h2>
          <p className="text-gray-200 max-w-3xl mx-auto text-lg sm:text-xl">
            Each product is an Artefact — glowing, mysterious, carrying the
            essence of another world.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {artefacts[selectedRealm as RealmType].map((artefact) => (
            <ProductCard
              artefact={{
                ...artefact,
                id: artefact.id.toString(),
                rarity: artefact.rarity as "Common" | "Rare" | "Legendary",
              }}
              key={artefact.id.toString()}
            />
          ))}
        </div>
      </div>

      <ArtefactJourney />

      <BecomeVendor/>

      {/* Eco Impact */}
      <div className="parallax5 relative h-screen flex items-center justify-center overflow-hidden px-6">
        {/* Decorative Glowing Orbs */}
        <div className="absolute top-10 left-1/4 w-40 h-40 bg-yellow-400/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-1/4 w-32 h-32 bg-yellow-500/20 rounded-full filter blur-2xl animate-pulse-slower"></div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-6xl w-full text-center"
        >
          {/* Heading */}
          <h2 className="text-5xl font-display font-extrabold text-yellow-400 mb-12 drop-shadow-xl">
            Your Eco Impact
          </h2>

          {/* Cards */}
          <div className="grid sm:grid-cols-3 gap-8">
            {/* Card 1: Trees Planted */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative bg-black/60 backdrop-blur-lg rounded-3xl p-8 flex flex-col items-center shadow-2xl border border-yellow-400/30 hover:scale-105 transition-transform duration-300 group"
            >
              {/* Glowing Circle */}
              <div className="absolute -inset-4 bg-yellow-400/20 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>

              <Trees className="w-14 h-14 text-green-400 mb-4 z-10 relative animate-bounce-slow" />
              <span className="text-3xl font-bold z-10 relative text-yellow-500">
                12,340
              </span>
              <span className="text-gray-200 z-10 relative mt-1">
                Trees Planted
              </span>
            </motion.div>

            {/* Card 2: Plastic Recycled */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative bg-black/60 backdrop-blur-lg rounded-3xl p-8 flex flex-col items-center shadow-2xl border border-yellow-400/30 hover:scale-105 transition-transform duration-300 group"
            >
              <div className="absolute -inset-4 bg-blue-400/20 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>

              <Recycle className="w-14 h-14 text-blue-400 mb-4 z-10 relative animate-bounce-slow" />
              <span className="text-3xl font-bold z-10 relative text-blue-400">
                4,500kg
              </span>
              <span className="text-gray-200 z-10 relative mt-1">
                Plastic Recycled
              </span>
            </motion.div>

            {/* Card 3: Carbon Saved */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="relative bg-black/60 backdrop-blur-lg rounded-3xl p-8 flex flex-col items-center shadow-2xl border border-yellow-400/30 hover:scale-105 transition-transform duration-300 group"
            >
              <div className="absolute -inset-4 bg-teal-400/20 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>

              <Globe className="w-14 h-14 text-teal-400 mb-4 z-10 relative animate-bounce-slow" />
              <span className="text-3xl font-bold z-10 relative text-teal-400">
                2,900kg
              </span>
              <span className="text-gray-200 z-10 relative mt-1">
                Carbon Saved
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>


    </div>
  );
};

export default Home;
