"use client";

import Navbar from "@/components/layout/Navbar";
import { motion } from "framer-motion";
import { HeartCrack } from "lucide-react";

export default function Wishlist() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="container mx-auto px-6 md:px-12 pt-32 pb-20 flex flex-col items-center justify-center min-h-[70vh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", damping: 15 }}
          className="glass-panel p-12 rounded-3xl flex flex-col items-center text-center max-w-md w-full"
        >
          <div className="w-16 h-16 rounded-full bg-white/5 border border-glass-border flex items-center justify-center mb-6 text-foreground-secondary">
            <HeartCrack size={24} />
          </div>
          <h2 className="text-2xl font-sans font-medium mb-4">WISHLIST EMPTY</h2>
          <p className="font-mono text-sm text-foreground-secondary mb-8">
            You haven't saved any items to your secure vault yet.
          </p>
          <a href="/collections" className="font-mono text-xs tracking-widest text-accent-cyan border border-accent-cyan/30 px-6 py-3 rounded-full hover:bg-accent-cyan/10 transition-colors">
            BROWSE CATALOG
          </a>
        </motion.div>
      </section>
    </main>
  );
}
