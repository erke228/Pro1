"use client";

import Navbar from "@/components/layout/Navbar";
import { motion } from "framer-motion";

export default function Insights() {
  const articles = [
    { title: "The Ethics of Neural Implants", tag: "OPINION", date: "SEP 29, 2026" },
    { title: "Quantum Cryptography in Everyday Devices", tag: "TECH", date: "SEP 15, 2026" },
    { title: "Why Stealth Drones are the New Personal Assistants", tag: "LIFESTYLE", date: "AUG 30, 2026" },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="container mx-auto px-6 md:px-12 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-sans font-medium tracking-tight mb-4">
            <span className="text-gradient">INSIGHTS</span>
          </h1>
          <p className="text-foreground-secondary font-mono text-sm max-w-2xl">
            Latest dispatches from the bleeding edge of technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-panel p-6 rounded-2xl group cursor-pointer hover:border-accent-pink/50 transition-colors"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="font-mono text-[10px] bg-white/10 px-2 py-1 rounded text-accent-cyan tracking-widest">{article.tag}</span>
                <span className="font-mono text-[10px] text-foreground-secondary">{article.date}</span>
              </div>
              <h3 className="font-sans text-xl font-medium mb-4 group-hover:text-accent-pink transition-colors">
                {article.title}
              </h3>
              <p className="font-mono text-xs text-foreground-secondary underline decoration-white/20 underline-offset-4 group-hover:decoration-accent-pink/50 transition-colors">
                READ REPORT
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
