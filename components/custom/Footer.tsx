"use client";

import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black backdrop-blur-xl text-gray-300 border-t border-yellow-500/20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">
        {/* Brand Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2">
            <Image
              src="/circle1.png" // replace with your actual logo path
              alt="Secret Verser Logo"
            //   className="w-10 h-10 rounded-full"
                width={40}
                height={40}
            />
            <h2 className="text-2xl font-bold text-yellow-400 font-playfair">
              Secret Verser
            </h2>
          </div>
          <p className="text-sm text-gray-400">
            Unlock the mysteries of shopping. Discover artefacts, rare finds,
            and exclusive deals.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold text-yellow-400 mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2">
            {["Shop", "Categories", "Deals", "About", "Contact","Admin"].map(
              (item, i) => (
                <li key={i}>
                  <a
                    href={`/${item.toLowerCase()}`}
                    className="hover:text-yellow-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </motion.div>

        {/* Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold text-yellow-400 mb-4">
            Support
          </h3>
          <ul className="space-y-2">
            {["Orders", "Returns", "FAQ", "Help Center"].map((item, i) => (
              <li key={i}>
                <a
                  href={`/${item.toLowerCase().replace(" ", "-")}`}
                  className="hover:text-yellow-400 transition-colors"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Newsletter & Socials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h3 className="text-lg font-semibold text-yellow-400 mb-4">
            Stay Connected
          </h3>
          <form className="flex items-center bg-white/10 rounded-full overflow-hidden shadow-inner">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 w-full bg-transparent text-sm outline-none placeholder-gray-400"
            />
            <button
              type="submit"
              className="bg-yellow-400 text-black px-4 py-2 font-semibold hover:bg-yellow-500 transition-colors"
            >
              <Mail className="w-5 h-5" />
            </button>
          </form>
          <div className="flex space-x-4 mt-4">
            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="p-2 rounded-full bg-white/10 hover:bg-yellow-400 hover:text-black transition-all"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-yellow-500/10 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Secret Verser. All rights reserved.
      </div>
    </footer>
  );
}
