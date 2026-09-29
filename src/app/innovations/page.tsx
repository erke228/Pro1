"use client";

import Navbar from "@/components/layout/Navbar";
import { motion } from "framer-motion";

export default function Innovations() {
  const innovations = [
    { year: "2026", title: "Quantum Neural Interfaces", desc: "First generation of direct brain-to-metaverse linking." },
    { year: "2027", title: "Holographic Haptics", desc: "Touch the digital world with photon-based force feedback." },
    { year: "2029", title: "Synthetic Bionics", desc: "Wearables that merge seamlessly with human biology." }
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="container mx-auto px-6 md:px-12 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-sans font-medium tracking-tight mb-4">
            FUTURE <span className="text-gradient">INNOVATIONS</span>
          </h1>
          <p className="text-foreground-secondary font-mono text-sm max-w-2xl mx-auto">
            Our roadmap to redefining human potential.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-glass-border before:to-transparent">
          {innovations.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-accent-cyan bg-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <div className="w-2 h-2 rounded-full bg-accent-cyan shadow-[0_0_10px_#06B6D4]" />
              </div>
              
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-panel p-6 rounded-2xl hover:border-accent-cyan/50 transition-colors">
                <span className="font-mono text-accent-pink text-xs tracking-widest">{item.year}</span>
                <h3 className="font-sans text-xl font-medium mt-2 mb-2 text-foreground">{item.title}</h3>
                <p className="text-sm text-foreground-secondary">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
