"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, User, Menu, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { signIn, signOut } from "next-auth/react"; // ✅ only client here
import type { Session } from "next-auth";
import { useRouter } from "next/navigation";

export default function NavbarClient({ session }: { session: Session | null }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoggedIn = !!session;
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full bg-black backdrop-blur-xl border-b border-yellow-500/20 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <motion.a
          href="/"
          className="flex items-center gap-2 text-2xl font-bold text-yellow-400 font-playfair"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Image
            src="/circle1.png"
            alt="Secret Verse Logo"
            width={52}
            height={52}
          />
          Secret Verse
        </motion.a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          {isLoggedIn ? (
            <>
              {["Products", "Mystery Box", "Orders", "About"].map((item) => (
                <motion.a
                  key={item}
                  href={`/${item.toLowerCase().replace(" ", "-")}`}
                  className="text-gray-200 hover:text-yellow-400 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.a>
              ))}
            </>
          ) : (
            ["Home", "Products", "Categories", "Deals", "Contact"].map((item) => (
              <motion.a
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-gray-200 hover:text-yellow-400 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
              </motion.a>
            ))
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
                onClick={() => signOut({ callbackUrl: "/" })}
                className="bg-red-500 text-white hover:bg-red-600 rounded-full px-6 py-2 font-semibold shadow-md shadow-red-500/30"
              >
                <LogOut className="w-4 h-4 mr-2" /> Logout
              </Button>
            </>
          ) : (
            <div className="hidden md:flex gap-3">
              <Button
                className="w-full bg-yellow-400 text-black hover:bg-yellow-500 rounded-full font-semibold cursor-pointer"
                onClick={() => router.push("/auth/login")} // ✅ client-safe navigation
              >
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
              {["Products", "Mystery Box", "Orders", "About"].map((item) => (
                <a
                  key={item}
                  href={`/${item.toLowerCase().replace(" ", "-")}`}
                  className="block text-gray-200 hover:text-yellow-400 text-lg"
                >
                  {item}
                </a>
              ))}
              <Button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full bg-red-500 text-white hover:bg-red-600 rounded-full font-semibold cursor-pointer"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              {["Home", "Products", "Categories", "Deals", "Contact"].map(
                (item) => (
                  <a
                    key={item}
                    href={`/${item.toLowerCase()}`}
                    className="block text-gray-200 hover:text-yellow-400 text-lg"
                  >
                    {item}
                  </a>
                )
              )}
              <Button
                className="w-full bg-yellow-400 text-black hover:bg-yellow-500 rounded-full font-semibold cursor-pointer"
                onClick={() => router.push("/auth/login")} // ✅ client-safe navigation
              >
                Login / Register
              </Button>
              <Button className="w-full bg-yellow-500 text-black hover:bg-yellow-600 rounded-full font-semibold cursor-pointer">
                Become a Vendor
              </Button>
            </>
          )}
        </motion.div>
      )}
    </header>
  );
}
