"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, User, Menu, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";


export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // simulate login state

  const handleLoginRegister = () => {
    // Logic to navigate to login/register page
    window.location.href = "/auth/login"; // Adjust the path as necessary
  }

  return (
    <header
      className="sticky top-0 z-50 w-full 
       bg-black backdrop-blur-xl border-b border-yellow-500/20 shadow-lg"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        {/* Logo with image + name */}
        <motion.a
          href="/"
          className="flex items-center gap-2 text-2xl font-bold text-yellow-400 font-playfair"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Image
            src="/circle1.png" // replace with your actual logo path
            alt="Secret Verser Logo"
            // className="w-8 h-8 rounded-full"
            width={52}
            height={52}
          />
          Secret Verser
        </motion.a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          {isLoggedIn ? (
            <>
              <motion.a
                href="/products"
                className="text-gray-200 hover:text-yellow-400 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Products
              </motion.a>
              <motion.a
                href="/mystery-box"
                className="text-gray-200 hover:text-yellow-400 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Mystery Box
              </motion.a>
              <motion.a
                href="/orders"
                className="text-gray-200 hover:text-yellow-400 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Orders
              </motion.a>
              <motion.a
                href="/about"
                className="text-gray-200 hover:text-yellow-400 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                About
              </motion.a>
            </>
          ) : (
            ["Home", "Shop", "Categories", "Deals", "Contact"].map(
              (item, i) => (
                <motion.a
                  key={i}
                  href={`/${item.toLowerCase()}`}
                  className="text-gray-200 hover:text-yellow-400 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.a>
              )
            )
          )}
        </nav>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              {/* Cart */}
              <motion.a
                href="/cart"
                className="relative text-gray-200 hover:text-yellow-400"
                whileHover={{ scale: 1.1 }}
              >
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  3
                </span>
              </motion.a>

              {/* Profile */}
              <motion.a
                href="/profile"
                className="text-gray-200 hover:text-yellow-400"
                whileHover={{ scale: 1.1 }}
              >
                <User className="w-6 h-6" />
              </motion.a>

              {/* Logout */}
              <Button
                onClick={() => setIsLoggedIn(false)}
                className="bg-red-500 text-white hover:bg-red-600 rounded-full px-6 py-2 font-semibold shadow-md shadow-red-500/30"
              >
                <LogOut className="w-4 h-4 mr-2" /> Logout
              </Button>
            </>
          ) : (
            <div className="hidden md:flex gap-3">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-500 rounded-full px-6 py-2 font-semibold shadow-md shadow-yellow-500/20">
                Login / Register
              </Button>
              <Button className="bg-yellow-500 text-black hover:bg-yellow-600 rounded-full px-6 py-2 font-semibold shadow-md shadow-yellow-500/30">
                Become a Vendor
              </Button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gray-200"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="md:hidden bg-black/90 backdrop-blur-xl border-t border-yellow-500/20 p-6 space-y-4"
        >
          {isLoggedIn ? (
            <>
              <a
                href="/products"
                className="block text-gray-200 hover:text-yellow-400 text-lg"
              >
                Products
              </a>
              <a
                href="/mystery-box"
                className="block text-gray-200 hover:text-yellow-400 text-lg"
              >
                Mystery Box
              </a>
              <a
                href="/orders"
                className="block text-gray-200 hover:text-yellow-400 text-lg"
              >
                Orders
              </a>
              <a
                href="/about"
                className="block text-gray-200 hover:text-yellow-400 text-lg"
              >
                About
              </a>
              <Button
                onClick={() => setIsLoggedIn(false)}
                className="w-full bg-red-500 text-white hover:bg-red-600 rounded-full font-semibold"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              {["Home", "Shop", "Categories", "Deals", "Contact"].map(
                (item, i) => (
                  <a
                    key={i}
                    href={`/${item.toLowerCase()}`}
                    className="block text-gray-200 hover:text-yellow-400 text-lg"
                  >
                    {item}
                  </a>
                )
              )}
              <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-500 rounded-full font-semibold"
              onClick={handleLoginRegister}
              >
                Login / Register
              </Button>
              <Button className="w-full bg-yellow-500 text-black hover:bg-yellow-600 rounded-full font-semibold">
                Become a Vendor
              </Button>
            </>
          )}
        </motion.div>
      )}
    </header>
  );
}
