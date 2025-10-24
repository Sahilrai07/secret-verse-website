"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description?: string;
  rarity?: string;
  treesPlanted?: number;
  plasticRecycled?: number;
  carbonSaved?: number;
}

const dummyCart: CartItem[] = [
  {
    id: "1",
    name: "Veyrion Artefact Box",
    price: 120,
    quantity: 1,
    image: "/box.jpg",
    description: "A mysterious artefact box with hidden treasures.",
    rarity: "Legendary",
    treesPlanted: 100,
    plasticRecycled: 50,
    carbonSaved: 30,
  },
  {
    id: "2",
    name: "Mystery Artefact",
    price: 85,
    quantity: 2,
    image: "/artefact.jpg",
    description: "Rare artefact from another world, glowing with magic.",
    rarity: "Rare",
    treesPlanted: 50,
    plasticRecycled: 20,
    carbonSaved: 15,
  },
];

const CheckoutPage = () => {
  const [cart] = useState<CartItem[]>(dummyCart);

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    window.location.href = '/place-order';
  }

  return (
    <div className="relative w-full min-h-screen bg-black/90 text-white py-16 px-6 overflow-hidden">
      {/* Floating Artefacts Background */}
      <motion.div
        animate={{ y: [0, -30, 0], x: [0, 20, -20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-1/4 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl filter animate-pulse-slow -z-10"
      />
      <motion.div
        animate={{ y: [0, 40, 0], x: [0, -20, 20, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 right-1/3 w-48 h-48 bg-blue-400/10 rounded-full blur-2xl filter animate-pulse-slower -z-10"
      />

      <h1 className="text-5xl font-display font-extrabold text-yellow-400 text-center mb-12 drop-shadow-xl">
        Checkout
      </h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          {cart.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="relative flex flex-col md:flex-row items-center bg-black/50 backdrop-blur-xl rounded-3xl p-6 shadow-[0_0_60px_15px_rgba(253,224,71,0.3)] border border-yellow-400/30 overflow-hidden"
            >
              <div className="absolute -inset-4 rounded-3xl bg-yellow-400/10 blur-3xl animate-pulse-slow -z-10"></div>

              <div className="relative w-40 h-40 md:w-48 md:h-48 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg border border-yellow-300">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
                {item.rarity && (
                  <span
                    className={`absolute top-2 left-2 px-2 py-1 text-xs font-bold rounded-full 
                    ${item.rarity === "Legendary" ? "bg-purple-500 text-white" :
                      item.rarity === "Rare" ? "bg-blue-500 text-white" :
                      "bg-gray-700 text-gray-200"}
                    animate-pulse`}
                  >
                    {item.rarity}
                  </span>
                )}
              </div>

              <div className="flex-1 md:ml-8 mt-6 md:mt-0 relative z-10">
                <h2 className="text-3xl font-bold text-yellow-400 mb-2 font-display drop-shadow-lg">
                  {item.name}
                </h2>
                <p className="text-gray-300 mb-2 text-sm">{item.description}</p>

                <div className="flex flex-wrap gap-2 mb-4 text-sm">
                  {item.treesPlanted && <span className="bg-green-400/20 text-green-400 px-2 py-1 rounded-full">🌱 {item.treesPlanted} Trees</span>}
                  {item.plasticRecycled && <span className="bg-blue-400/20 text-blue-400 px-2 py-1 rounded-full">♻️ {item.plasticRecycled}kg Plastic</span>}
                  {item.carbonSaved && <span className="bg-teal-400/20 text-teal-400 px-2 py-1 rounded-full">🌍 {item.carbonSaved}kg Carbon</span>}
                </div>

                <p className="text-gray-200 text-lg mb-4 font-semibold">
                  Price: ${item.price} × {item.quantity} = ${item.price * item.quantity}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sticky Order Summary */}
        <div className="lg:sticky lg:top-24 bg-black/60 backdrop-blur-xl p-8 rounded-3xl border border-yellow-400/30 shadow-2xl flex flex-col gap-6">
          <h2 className="text-3xl text-yellow-400 font-display font-bold mb-4">Order Summary</h2>
          <div className="flex justify-between text-gray-200 text-lg">
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-200 text-lg">
            <span>Shipping</span>
            <span>$10</span>
          </div>
          <div className="flex justify-between text-yellow-400 text-xl font-bold border-t border-yellow-400/30 pt-2">
            <span>Total</span>
            <span>${(totalPrice + 10).toFixed(2)}</span>
          </div>
          <Button
          onClick={handlePlaceOrder}
          className="bg-yellow-400 text-black px-8 py-3 font-bold rounded-full hover:scale-105 hover:shadow-lg transition-all duration-300 animate-pulse">
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
