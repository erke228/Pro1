import Navbar from "@/components/layout/Navbar";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";

export default async function Collections() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" }
  });

  const categories = ["Всё", "Наушники", "Умные Кольца", "Аксессуары Дронов", "Носимые Устройства"];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="container mx-auto px-6 md:px-12 pt-32 pb-20">
        <div className="text-center mb-12">
          <p className="text-foreground-secondary font-mono text-[10px] tracking-widest uppercase mb-2">AETHERIA LUXE</p>
          <h1 className="text-3xl md:text-4xl font-sans font-medium tracking-wide mb-8 uppercase">
            КАТАЛОГ ТОВАРОВ
          </h1>
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat, i) => (
              <button 
                key={cat} 
                className={`glass-pill px-6 py-2 rounded-full font-sans text-xs transition-colors ${
                  i === 0 ? "bg-white/10 text-white" : "text-foreground-secondary hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product, i) => (
            <Link key={product.id} href={`/product/${product.slug}`}>
              <div 
                className={`glass-panel rounded-2xl p-4 flex flex-col group h-full transition-all duration-300 ${
                  i % 2 === 0 ? "glow-cyan-hover" : "glow-purple-hover"
                }`}
              >
                <div className="h-48 rounded-xl bg-white/5 flex items-center justify-center mb-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10"/>
                  <img 
                    src={JSON.parse(product.images)[0] || "/placeholder.jpg"} 
                    alt={product.title}
                    className="w-full h-full object-cover z-0 opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                
                <h3 className="font-sans text-xs tracking-wider text-foreground-secondary uppercase mb-1 line-clamp-1">
                  {product.title}
                </h3>
                
                <div className="flex justify-between items-end mt-auto pt-4">
                  <span className="font-mono text-sm text-foreground">${product.price.toFixed(0)}</span>
                  <button className="text-[10px] font-sans border border-glass-border rounded-md px-4 py-1.5 hover:bg-white/10 transition-colors">
                    В корзину
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
