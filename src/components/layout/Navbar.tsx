"use client";

import Link from "next/link";
import { Search, ShoppingCart, User, Menu } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useCartStore } from "@/lib/store";

export default function Navbar() {
  const { items, setIsOpen } = useCartStore();

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="glass-pill rounded-full px-6 py-3 flex items-center justify-between w-full max-w-5xl pointer-events-auto"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-sans text-xl tracking-[0.2em] text-foreground">
            AETHERIA
          </span>
          <span className="font-sans text-sm tracking-widest text-foreground-secondary hidden sm:inline-block">
            LUXE
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 font-sans text-xs tracking-wider text-foreground-secondary ml-8">
          <Link href="/" className="hover:text-foreground transition-colors">
            ГЛАВНАЯ
          </Link>
          <Link href="/collections" className="hover:text-foreground transition-colors text-foreground">
            КАТАЛОГ
          </Link>
          <Link href="/innovations" className="hover:text-foreground transition-colors">
            ИННОВАЦИИ
          </Link>
          <Link href="/boutique" className="hover:text-foreground transition-colors">
            О НАС
          </Link>
          <Link href="/insights" className="hover:text-foreground transition-colors">
            БЛОГ
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-5 text-foreground-secondary ml-auto">
          <button className="hover:text-foreground transition-colors">
            <Search size={18} strokeWidth={1.5} />
          </button>
          <Link href="/account" className="hover:text-foreground transition-colors hidden md:block">
            <User size={18} strokeWidth={1.5} />
          </Link>
          <button 
            onClick={() => setIsOpen(true)}
            className="hover:text-foreground transition-colors relative text-accent-cyan"
          >
            <ShoppingCart size={18} strokeWidth={1.5} />
            {items.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-accent-purple text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {items.length}
              </span>
            )}
          </button>
          <button className="md:hidden hover:text-foreground">
            <Menu size={20} strokeWidth={1.5} />
          </button>
        </div>
      </motion.header>
    </div>
  );
}
