"use client";

import Navbar from "@/components/layout/Navbar";
import { motion } from "framer-motion";

export default function Boutique() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="container mx-auto px-6 md:px-12 pt-32 pb-20 flex flex-col items-center justify-center min-h-[80vh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-full max-w-4xl h-96 glass-panel rounded-3xl overflow-hidden flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-accent-purple/20 to-accent-cyan/20 opacity-50 mix-blend-overlay" />
          
          <div className="relative z-10 text-center px-6">
            <h1 className="text-4xl md:text-6xl font-sans font-light tracking-widest mb-6">
              THE <span className="font-medium text-gradient">BOUTIQUE</span>
            </h1>
            <p className="font-mono text-sm text-foreground-secondary max-w-xl mx-auto leading-relaxed">
              Located in the heart of Neo-Tokyo, our flagship store is an architectural marvel.
              A space where digital consciousness meets physical reality.
            </p>
          </div>
          
          {/* Abstract background shapes */}
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/2 -left-1/2 w-full h-full border border-white/5 rounded-full"
          />
          <motion.div 
            animate={{ rotate: -360 }} 
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-1/2 -right-1/2 w-[120%] h-[120%] border border-accent-cyan/10 rounded-full"
          />
        </motion.div>
      </section>
    </main>
  );
}
