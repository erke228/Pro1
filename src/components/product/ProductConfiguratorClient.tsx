"use client";

import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import AddToCartButton from "@/components/ui/AddToCartButton";
import Product3DViewer from "@/components/canvas/Product3DViewer";

interface ProductConfiguratorClientProps {
  product: {
    id: string;
    title: string;
    price: number;
    slug: string;
    description: string;
  };
  specs: Record<string, string>;
  images: string[];
}

const COLORS = [
  { name: "КИБЕР-ЧЕРНЫЙ", hex: "#111111" },
  { name: "УЛЬТРАФИОЛЕТ", hex: "#8B5CF6" },
  { name: "БИРЮЗОВЫЙ", hex: "#06B6D4" },
  { name: "ХРОМ", hex: "#9CA3AF" },
];

export default function ProductConfiguratorClient({ product, specs, images }: ProductConfiguratorClientProps) {
  const [selectedColor, setSelectedColor] = useState(COLORS[0].hex);
  const [activeThumb, setActiveThumb] = useState(0);

  return (
    <div className="flex-1 container mx-auto px-6 md:px-12 pt-32 pb-20 flex flex-col lg:flex-row gap-12">
      {/* Left: Image / 3D Viewer */}
      <div className="w-full lg:w-1/2 flex gap-4 h-[600px]">
        {/* Thumbnails */}
        <div className="flex flex-col gap-3 w-16">
          {[1, 2, 3, 4].map((_, i) => (
            <div 
              key={i} 
              onClick={() => setActiveThumb(i)}
              className={`w-16 h-16 rounded-xl border ${i === activeThumb ? 'border-accent-purple bg-white/10' : 'border-glass-border bg-white/5'} overflow-hidden cursor-pointer transition-colors`}
            >
              <img src={images[0]} alt="thumb" className="w-full h-full object-cover opacity-80" />
            </div>
          ))}
        </div>
        
        {/* Main 3D / Image */}
        <div className="flex-1 glass-panel rounded-2xl relative flex items-center justify-center overflow-hidden">
          <Product3DViewer slug={product.slug} color={selectedColor} />
          
          <button className="absolute top-4 right-4 text-foreground-secondary hover:text-white transition-colors bg-white/5 p-2 rounded-full z-10">
            <Search size={18} />
          </button>
          
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 font-sans text-[10px] text-foreground-secondary z-10 bg-black/40 px-3 py-1 rounded-full backdrop-blur-md">
            Кликните и вращайте 3D модель
          </p>
        </div>
      </div>

      {/* Right: Details & Configurator */}
      <div className="w-full lg:w-1/2 flex flex-col">
        <div className="mb-6">
          <p className="font-sans text-xs text-foreground-secondary tracking-wide mb-1">Название товара</p>
          <h1 className="text-3xl lg:text-4xl font-sans font-medium uppercase mb-4">{product.title}</h1>
          <p className="font-sans text-xs text-foreground-secondary tracking-wide mb-1">Описание товара</p>
          <p className="text-foreground-secondary text-sm leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Technical Specs Accordion */}
        <div className="mb-8 glass-panel rounded-xl overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-glass-border bg-white/5 cursor-pointer">
            <span className="font-sans text-sm font-medium">ТЕХНИЧЕСКИЕ ХАРАКТЕРИСТИКИ</span>
            <ChevronDown size={16} className="text-foreground-secondary" />
          </div>
          <div className="p-2 space-y-1">
            {Object.entries(specs).map(([key, value]) => (
              <div key={key} className="glass-pill p-4 rounded-lg flex justify-between items-center group cursor-pointer hover:bg-white/5">
                <div>
                  <p className="font-sans text-sm font-medium uppercase mb-1">{key}</p>
                  <p className="font-sans text-[10px] text-foreground-secondary">{String(value)}</p>
                </div>
                <ChevronDown size={16} className="text-foreground-secondary group-hover:text-white transition-colors" />
              </div>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div className="mb-10 flex gap-6 overflow-x-auto pb-4 custom-scrollbar">
          {COLORS.map((c) => (
             <div key={c.name} className="flex flex-col items-center gap-2 cursor-pointer group" onClick={() => setSelectedColor(c.hex)}>
                <div 
                  style={{ backgroundColor: c.hex }}
                  className={`w-10 h-10 rounded-full border-2 transition-all shadow-[inset_0_-2px_10px_rgba(255,255,255,0.2)] ${
                    selectedColor === c.hex ? "border-white scale-110 glow-cyan-hover" : "border-transparent opacity-80 group-hover:opacity-100"
                  }`} 
                />
                <span className={`font-sans text-[9px] uppercase transition-colors ${selectedColor === c.hex ? "text-white" : "text-foreground-secondary group-hover:text-white"}`}>
                  {c.name}
                </span>
             </div>
          ))}
        </div>

        {/* Add to Bag Button */}
        <div className="mt-auto">
          <AddToCartButton product={{ id: product.id, title: product.title, price: product.price }} />
          <p className="text-center mt-3 font-sans text-[10px] text-accent-cyan uppercase tracking-widest">
            В НАЛИЧИИ • БЫСТРАЯ ДОСТАВКА
          </p>
        </div>
      </div>
    </div>
  );
}
