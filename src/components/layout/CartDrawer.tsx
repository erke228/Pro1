"use client";

import { useCartStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2 } from "lucide-react";
import Image from "next/image";

export default function CartDrawer() {
  const { isOpen, setIsOpen, items, removeItem } = useCartStore();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-4 right-4 bottom-4 w-full max-w-sm glass-panel rounded-3xl p-6 z-50 flex flex-col"
          >
            {/* Header ... */}
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-glass-border">
              <h2 className="font-sans text-lg font-medium tracking-wide">
                ВАША КОРЗИНА ({items.length})
              </h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-foreground-secondary hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              {items.length === 0 ? (
                <p className="text-foreground-secondary text-sm font-sans text-center mt-10">Корзина пуста</p>
              ) : (
                items.map((item, i) => (
                  <div key={item.id} className="flex items-center gap-4 glass-pill p-3 rounded-2xl group">
                    <span className="font-mono text-xs text-foreground-secondary w-3">{i + 1}</span>
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-glass-border overflow-hidden shrink-0 flex items-center justify-center">
                       {/* Placeholder for item thumbnail */}
                       <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-accent-purple to-accent-cyan opacity-50" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-sans text-xs font-medium uppercase truncate">{item.title}</h3>
                      <p className="font-sans text-[10px] text-foreground-secondary">Количество: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-sm">${item.price}</p>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-foreground-secondary hover:text-red-400 mt-1 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-glass-border">
              <div className="flex justify-between items-center mb-6">
                <span className="font-sans text-sm font-medium">ИТОГО:</span>
                <span className="font-mono text-xl">${total.toFixed(2)}</span>
              </div>
              <button 
                onClick={() => {
                  if (items.length > 0) {
                    alert("Заказ успешно оформлен! Спасибо за покупку в Aetheria Luxe.");
                    useCartStore.setState({ items: [], isOpen: false });
                  } else {
                    alert("Корзина пуста!");
                  }
                }}
                className="w-full py-4 rounded-xl font-sans text-sm tracking-widest uppercase font-medium glow-button-purple hover:brightness-110 transition-all text-white"
              >
                ОФОРМИТЬ ЗАКАЗ
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
