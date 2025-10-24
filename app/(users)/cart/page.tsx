"use client";

import React from "react";
import { motion } from "framer-motion";
import { Trash, Plus, Minus, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { artefacts } from "@/data/products"; // recommended artefacts

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
  rarity?: string;
  treesPlanted?: number;
  plasticRecycled?: number;
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
  },
  {
    id: "2",
    name: "Mystery Artefact",
    price: 85,
    quantity: 2,
    image: "/p1.jpg",
    description: "Rare artefact from another world, glowing with magic.",
    rarity: "Rare",
    treesPlanted: 50,
    plasticRecycled: 20,
  },
];
const CartPage = () => {
  const [cartItems, setCartItems] = React.useState<CartItem[]>(dummyCart);

  const increment = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrement = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );


  const handleCheckOut = () => {
    // Redirect to checkout page
    window.location.href = '/checkout';
  }
  return (
    <div className="w-full min-h-screen bg-black relative overflow-hidden">
      {/* Hero Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/90 -z-10"></div>
      {/* Floating magical orbs */}
      <div className="absolute top-10 left-1/4 w-60 h-60 bg-yellow-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-yellow-500/20 rounded-full blur-3xl animate-pulse-slower"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-7xl mx-auto py-16 px-6 relative z-10"
      >
        <h1 className="text-6xl font-display font-extrabold text-yellow-400 text-center mb-12 drop-shadow-xl flex items-center justify-center gap-4">
          <ShoppingCart className="w-12 h-12 animate-bounce-slow" />
          Secret Verse Cart
        </h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-300 text-center text-xl">
            Your cart is empty. Explore artefacts and add them to your cart!
          </p>
        ) : (
          <>
            {/* Cart Items */}
            <div className="grid gap-10">
              {cartItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  className="relative flex flex-col md:flex-row items-center bg-black/50 backdrop-blur-xl rounded-3xl p-6 shadow-[0_0_60px_15px_rgba(253,224,71,0.3)] border border-yellow-400/30 overflow-hidden"
                >
                  {/* Glowing floating background */}
                  <div className="absolute -inset-4 rounded-3xl bg-yellow-400/10 blur-3xl animate-pulse-slow -z-10"></div>

                  {/* Artefact Image */}
                  <div className="relative w-40 h-40 md:w-48 md:h-48 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg border border-yellow-300">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                    {/* Rarity Badge */}
                    <span
                      className={`absolute top-2 left-2 px-2 py-1 text-xs font-bold rounded-full 
      ${
        item.rarity === "Legendary"
          ? "bg-purple-500 text-white"
          : item.rarity === "Rare"
          ? "bg-blue-500 text-white"
          : "bg-gray-700 text-gray-200"
      }
      animate-pulse`}
                    >
                      {item.rarity}
                    </span>
                  </div>

                  {/* Card Details */}
                  <div className="flex-1 md:ml-8 mt-6 md:mt-0 relative z-10">
                    <h2 className="text-3xl font-bold text-yellow-400 mb-2 font-display drop-shadow-lg">
                      {item.name}
                    </h2>

                    <p className="text-gray-300 mb-2 text-sm">
                      {item.description}
                    </p>

                    {/* Eco Impact */}
                    <p className="text-green-400 text-sm mb-4">
                      🌱 Trees Planted: {item.treesPlanted} | ♻️ Plastic
                      Recycled: {item.plasticRecycled}kg
                    </p>

                    <p className="text-gray-200 text-lg mb-4 font-semibold">
                      Price: ${item.price}
                    </p>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-4 mb-4">
                      <Button
                        onClick={() => decrement(item.id)}
                        className="bg-yellow-400 text-black rounded-full w-10 h-10 p-0 flex items-center justify-center hover:scale-110 transition-transform duration-200"
                      >
                        <Minus className="w-5 h-5" />
                      </Button>
                      <span className="text-gray-200 font-bold text-lg animate-pulse">
                        {item.quantity}
                      </span>
                      <Button
                        onClick={() => increment(item.id)}
                        className="bg-yellow-400 text-black rounded-full w-10 h-10 p-0 flex items-center justify-center hover:scale-110 transition-transform duration-200"
                      >
                        <Plus className="w-5 h-5" />
                      </Button>

                      <Button
                        onClick={() => removeItem(item.id)}
                        className="bg-red-500 text-white rounded-full w-10 h-10 p-0 flex items-center justify-center hover:scale-110 transition-transform duration-200 ml-auto"
                      >
                        <Trash className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Total & Checkout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col md:flex-row justify-between items-center bg-black/60 backdrop-blur-xl p-10 rounded-3xl shadow-[0_0_60px_10px_rgba(253,224,71,0.3)] border border-yellow-400/30 mt-12"
            >
              <div className="mb-4 md:mb-0">
                <span className="text-4xl font-bold text-yellow-400 drop-shadow-lg">
                  Total:
                </span>
                <span className="text-4xl font-bold text-gray-200 ml-4">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>

              <Button
              onClick={handleCheckOut}
              className="w-full md:w-auto bg-yellow-400 text-black hover:bg-yellow-500 rounded-full font-semibold py-4 px-12 text-xl shadow-lg">
                Proceed to Checkout
              </Button>
            </motion.div>

            {/* Recommended Artefacts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="mt-20"
            >
              <h2 className="text-4xl font-display font-extrabold text-yellow-400 mb-8 text-center drop-shadow-xl">
                Recommended Artefacts
              </h2>

              <div className="grid md:grid-cols-3 gap-8">
                {artefacts.daily.slice(0, 3).map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.05 }}
                    className="relative bg-black/50 backdrop-blur-xl rounded-3xl p-4 shadow-[0_0_40px_10px_rgba(253,224,71,0.2)] border border-yellow-400/30 hover:shadow-[0_0_60px_20px_rgba(253,224,71,0.4)] transition-shadow duration-300"
                  >
                    <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-lg border border-yellow-300">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-xl text-yellow-400 font-bold mt-4 font-display">
                      {item.name}
                    </h3>
                    <p className="text-gray-200 mt-2">${item.price}</p>
                    <Button className="mt-4 w-full bg-yellow-400 text-black hover:bg-yellow-500 rounded-full font-semibold">
                      Add to Cart
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default CartPage;
