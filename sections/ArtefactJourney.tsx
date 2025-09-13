"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const steps = [
  {
    step: "1",
    title: "Choose Your Realm",
    desc: "Select from Daily, Rare, or Secret artefacts",
    icon: "◊",
  },
  {
    step: "2",
    title: "Feel the Energy",
    desc: "Each artefact resonates with Veyrion's power",
    icon: "✨",
  },
  {
    step: "3",
    title: "Acquire & Impact",
    desc: "Your purchase creates real environmental change",
    icon: "🌱",
  },
  {
    step: "4",
    title: "Gain Verse Energy",
    desc: "Unlock mysteries and deeper connections",
    icon: "⚡",
  },
];

export default function ArtefactJourney() {
  return (
    <section
      id="artefacts"
      className="parallax4 min-h-screen relative bg-gradient-to-b from-card/20 to-background"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Section Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="font-playfair text-3xl text-primary mb-6 tracking-wide">
            The Artefact Journey
          </h3>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm">
            Unlock the mystical process of acquiring artefacts and channeling
            their energy into the Verse.
          </p>
        </motion.div>

        {/* Journey Cards */}
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((item, i) => (
            <motion.div
              key={i}
              className="group relative bg-black/40 backdrop-blur-sm p-6 rounded-2xl border border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-lg hover:shadow-primary/20"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              whileHover={{ scale: 1.05, rotate: Math.random() > 0.5 ? 1 : -1 }}
              viewport={{ once: true }}
            >
              {/* Icon Circle */}
              <motion.div
                className="w-16 h-16 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center border-2 border-primary/40"
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <span className="text-2xl">{item.icon}</span>
              </motion.div>

              {/* Content */}
              <h4 className="font-playfair text-lg text-primary mb-2">
                {item.title}
              </h4>
              <p className="text-sm text-muted-foreground">{item.desc}</p>

              {/* Step Number Badge */}
              <div className="absolute top-4 left-4 text-xs font-mono bg-primary/20 px-3 py-1 rounded-full text-primary">
                Step {item.step}
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-primary/40 group-hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] transition-all duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black px-12 py-4 text-lg font-semibold rounded-xl shadow-lg shadow-yellow-500/30 hover:shadow-yellow-600/40 transition-all duration-300"
            onClick={() => (window.location.href = "/impact")}
          >
            Explore All Realms
          </Button>
          <p className="mt-4 text-sm text-muted-foreground font-mono">
            ◊ Each Artefact Tells a Story ◊
          </p>
        </motion.div>
      </div>
    </section>
  );
}
