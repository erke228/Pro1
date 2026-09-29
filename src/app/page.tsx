import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/home/HeroSection";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    take: 3
  });

  return (
    <main className="min-h-screen relative overflow-hidden bg-background">
      <Navbar />

      <HeroSection />
      
      <section className="relative z-10 container mx-auto px-6 md:px-12 py-32 border-t border-glass-border">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-sans font-medium tracking-wide text-foreground mb-2">
              LATEST RELEASES
            </h2>
            <p className="text-foreground-secondary font-mono text-xs tracking-widest uppercase">
              Curated for the visionary
            </p>
          </div>
          <Link href="/collections" className="text-xs font-mono tracking-widest text-accent-cyan hover:text-accent-pink transition-colors mt-4 md:mt-0 flex items-center gap-2">
            VIEW ALL <ArrowRight size={14} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link key={product.id} href={`/product/${product.slug}`}>
              <div className="glass-panel rounded-2xl p-4 flex flex-col group cursor-pointer hover:border-white/20 transition-all h-full">
                <div className="h-48 rounded-xl bg-white/5 flex items-center justify-center mb-4 relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity z-10"/>
                   <img 
                     src={JSON.parse(product.images)[0]} 
                     alt={product.title}
                     className="w-full h-full object-cover z-0 opacity-70 group-hover:opacity-100 transition-opacity"
                   />
                </div>
                <h3 className="font-sans text-sm font-medium mb-1 group-hover:text-accent-cyan transition-colors">
                  {product.title}
                </h3>
                <p className="text-xs text-foreground-secondary font-sans line-clamp-2 mb-4 flex-1">
                  {product.description}
                </p>
                <div className="flex justify-between items-center mt-auto border-t border-glass-border pt-4">
                  <span className="font-mono text-xs text-foreground">${product.price.toFixed(2)}</span>
                  <button className="text-[10px] font-mono border border-glass-border rounded-full px-3 py-1 hover:bg-white/10 transition-colors">
                    EXPLORE
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
