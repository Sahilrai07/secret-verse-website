"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function BecomeVendor() {
  return (
    <section
      id="vendor"
      className="parallax5 min-h-screen flex items-center justify-center relative bg-gradient-to-b from-background to-card/10"
    >
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      </div>

      {/* Main Vendor Box */}
      <motion.div
        className="relative z-10 bg-black/50 backdrop-blur-md border border-yellow-500/30 rounded-2xl max-w-3xl mx-auto p-10 shadow-xl shadow-yellow-500/20"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Title */}
        <motion.h2
          className="font-playfair text-3xl md:text-4xl text-yellow-400 mb-6 text-center"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Become a Vendor
        </motion.h2>

        {/* Content */}
        <motion.p
          className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Share your artefacts with the world, inspire seekers across realms, and
          grow your influence. List your unique creations, connect with a global
          audience, and leave behind a lasting legacy in Veyrion.
        </motion.p>

        {/* Journey Steps (inline icons) */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {[
            { icon: "📝", label: "Sign Up" },
            { icon: "📦", label: "List Artefacts" },
            { icon: "🌍", label: "Reach Realms" },
            { icon: "💰", label: "Grow & Earn" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center text-yellow-400"
            >
              <span className="text-3xl mb-2">{item.icon}</span>
              <span className="text-sm text-muted-foreground">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black px-12 py-4 text-lg font-semibold rounded-xl shadow-lg shadow-yellow-500/30 hover:shadow-yellow-600/40 transition-all duration-300"
            onClick={() => (window.location.href = "/vendor/register")}
          >
            Start Selling
          </Button>
          <p className="mt-4 text-sm text-muted-foreground font-mono">
            ◊ Your Artefacts, Your Legacy ◊
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
