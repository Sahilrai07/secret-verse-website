"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CreditCard, Wallet, Smartphone } from "lucide-react";

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

const PlaceOrderPage = () => {
  const [cart] = useState<CartItem[]>(dummyCart);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi" | "wallet">("card");

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    alert("Your magical journey begins! Order placed successfully ✨");
    window.location.href = '/order-success';
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-black via-black/90 to-black/80 text-white py-16 px-6 overflow-hidden">
      {/* Floating magical orbs */}
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

      <h1 className="text-5xl font-display font-extrabold text-yellow-400 text-center mb-12 drop-shadow-xl">
        Place Your Order
      </h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Shipping Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-2 bg-black/50 backdrop-blur-xl rounded-3xl p-8 shadow-[0_0_60px_15px_rgba(253,224,71,0.3)] border border-yellow-400/30"
        >
          <h2 className="text-3xl text-yellow-400 font-display font-bold mb-6">Shipping Information</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              { name: "name", placeholder: "Full Name" },
              { name: "email", placeholder: "Email Address", type: "email" },
              { name: "phone", placeholder: "Phone Number" },
              { name: "city", placeholder: "City" },
              { name: "state", placeholder: "State" },
              { name: "zip", placeholder: "ZIP Code" },
              { name: "country", placeholder: "Country" },
            ].map((field) => (
              <input
                key={field.name}
                type={field.type || "text"}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name as keyof typeof formData]}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-black/40 border border-yellow-400/20 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-sm"
              />
            ))}
            <textarea
              name="address"
              placeholder="Full Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-black/40 border border-yellow-400/20 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 col-span-2 shadow-sm"
            />
          </div>

          {/* Payment Method */}
          <div className="mt-8">
            <h3 className="text-2xl text-yellow-400 font-bold mb-4">Payment Method</h3>
            <div className="flex gap-4">
              <Button
                variant={paymentMethod === "card" ? "default" : "ghost"}
                onClick={() => setPaymentMethod("card")}
                className="flex items-center gap-2"
              >
                <CreditCard /> Credit Card
              </Button>
              <Button
                variant={paymentMethod === "upi" ? "default" : "ghost"}
                onClick={() => setPaymentMethod("upi")}
                className="flex items-center gap-2"
              >
                <Smartphone /> UPI
              </Button>
              <Button
                variant={paymentMethod === "wallet" ? "default" : "ghost"}
                onClick={() => setPaymentMethod("wallet")}
                className="flex items-center gap-2"
              >
                <Wallet /> Wallet
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Sticky Order Summary */}
        <div className="lg:sticky lg:top-24 bg-black/60 backdrop-blur-xl p-8 rounded-3xl border border-yellow-400/30 shadow-2xl flex flex-col gap-6">
          <h2 className="text-3xl text-yellow-400 font-display font-bold mb-4">Order Summary</h2>
          {cart.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex gap-4 items-center bg-black/40 p-4 rounded-2xl border border-yellow-400/20 shadow-inner hover:scale-105 transition-transform duration-300"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={80}
                height={80}
                className="rounded-xl object-cover"
              />
              <div className="flex-1">
                <p className="text-yellow-400 font-bold">{item.name}</p>
                <p className="text-gray-200 text-sm">{item.description}</p>
                <div className="flex gap-2 mt-1 text-xs text-green-400">
                  {item.treesPlanted && <span>🌳 {item.treesPlanted}</span>}
                  {item.plasticRecycled && <span>♻️ {item.plasticRecycled}kg</span>}
                  {item.carbonSaved && <span>🌎 {item.carbonSaved}kg</span>}
                </div>
              </div>
              <span className="text-yellow-400 font-bold">${(item.price * item.quantity).toFixed(2)}</span>
            </motion.div>
          ))}
          <div className="flex justify-between text-gray-200 text-lg mt-2">
            <span>Shipping</span>
            <span>$10</span>
          </div>
          <div className="flex justify-between text-yellow-400 text-xl font-bold border-t border-yellow-400/30 pt-2">
            <span>Total</span>
            <span>${(totalPrice + 10).toFixed(2)}</span>
          </div>
          <Button
            className="bg-yellow-400 text-black px-8 py-3 font-bold rounded-full hover:scale-105 hover:shadow-lg transition-all duration-300 animate-pulse"
            onClick={handlePlaceOrder}
          >
            Place Order ✨
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderPage;
