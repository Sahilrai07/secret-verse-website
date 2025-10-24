"use client";

import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  const sections = {
    "Quick Links": [
      "Shop",
      "Categories",
      "Deals",
      "About",
      "Contact",
      "Admin Login",
    ],
    Support: ["Orders", "Returns", "FAQ", "Help Center"],
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-black via-zinc-950 to-black text-gray-300 border-t border-yellow-500/30 backdrop-blur-2xl">
      {/* Subtle Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
        {/* Brand Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="flex items-center gap-2 relative"
          >
            <div className="relative">
              <Image
                src="/circle1.png"
                alt="Secret Verser Logo"
                width={45}
                height={45}
                className="rounded-full"
              />
              <div className="absolute inset-0 bg-yellow-400/30 blur-lg rounded-full -z-10" />
            </div>
            <h2 className="text-2xl font-bold text-yellow-400 font-playfair drop-shadow-[0_0_10px_rgba(234,179,8,0.3)]">
              Secret Verser
            </h2>
          </motion.div>

          <p className="text-sm text-gray-400 leading-relaxed">
            Unlock the mysteries of shopping — discover artefacts, rare finds,
            and exclusive deals from the world of luxury and curiosity.
          </p>
        </motion.div>

        {/* Dynamic Sections */}
        {Object.entries(sections).map(([title, links]) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-yellow-400 mb-4 tracking-wide">
              {title}
            </h3>
            <ul className="space-y-2">
              {links.map((item) => (
                <li key={item}>
                  <a
                    href={
                      item === "Admin Login"
                        ? "/auth/admin-login"
                        : `/${item.toLowerCase().replace(" ", "-")}`
                    }
                    className="text-gray-400 hover:text-yellow-400 hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-5"
        >
          <h3 className="text-lg font-semibold text-yellow-400 mb-2 tracking-wide">
            Stay Connected
          </h3>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubscribed(true);
              setTimeout(() => setSubscribed(false), 4000);
            }}
            className="flex items-center bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-yellow-500/20"
          >
            <input
              type="email"
              placeholder="Enter your email"
              aria-label="Email address"
              className="px-4 py-2 w-full bg-transparent text-sm outline-none placeholder-gray-400 text-gray-200"
              required
            />
            <button
              type="submit"
              className="bg-yellow-400 text-black px-4 py-2 font-semibold hover:bg-yellow-500 transition-colors"
            >
              <Mail className="w-5 h-5" />
            </button>
          </form>

          {subscribed && (
            <p className="text-sm text-green-400 animate-pulse">
              Thanks for subscribing!
            </p>
          )}

          <div className="flex space-x-4 mt-5">
            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                aria-label={Icon.name}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-white/10 border border-yellow-500/20 hover:bg-yellow-400 hover:text-black transition-all duration-300"
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-yellow-500/10 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()}{" "}
        <span className="text-yellow-400 font-medium">Secret Verser</span>. All
        rights reserved.
      </div>
    </footer>
  );
}
