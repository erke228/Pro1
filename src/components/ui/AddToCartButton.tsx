"use client";

import { useCartStore } from "@/lib/store";
import { ShoppingCart } from "lucide-react";
import confetti from "canvas-confetti";

interface ProductData {
  id: string;
  title: string;
  price: number;
}

export default function AddToCartButton({ product }: { product: ProductData }) {
  const { addItem, setIsOpen } = useCartStore();

  const handleAdd = () => {
    addItem({ ...product, quantity: 1 });
    
    // Confetti effect
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#06B6D4', '#8B5CF6']
    });

    setIsOpen(true);
  };

  return (
    <button 
      onClick={handleAdd}
      className="w-full relative bg-white/5 py-4 rounded-xl flex items-center justify-center gap-3 transition-colors glow-button-cyan hover:bg-accent-cyan/10"
    >
      <span className="font-sans text-sm tracking-widest text-foreground font-medium uppercase">
        В КОРЗИНУ
      </span>
    </button>
  );
}
