import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function AdminProducts() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-sans font-medium">PRODUCTS MATRIX</h1>
        <Link 
          href="/admin/products/new" 
          className="flex items-center gap-2 glass-panel border border-accent-cyan/50 bg-accent-cyan/10 hover:bg-accent-cyan/20 px-4 py-2 rounded-lg font-mono text-sm transition-colors"
        >
          <Plus size={16} />
          ADD ENTITY
        </Link>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-glass-border">
              <th className="p-4 font-mono text-xs text-foreground-secondary font-normal tracking-widest">ID / NAME</th>
              <th className="p-4 font-mono text-xs text-foreground-secondary font-normal tracking-widest">CATEGORY</th>
              <th className="p-4 font-mono text-xs text-foreground-secondary font-normal tracking-widest">PRICE</th>
              <th className="p-4 font-mono text-xs text-foreground-secondary font-normal tracking-widest">STOCK</th>
              <th className="p-4 font-mono text-xs text-foreground-secondary font-normal tracking-widest text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className="border-b border-glass-border hover:bg-white/5 transition-colors">
                <td className="p-4">
                  <p className="font-sans font-medium">{product.title}</p>
                  <p className="font-mono text-[10px] text-foreground-secondary">{product.id}</p>
                </td>
                <td className="p-4 font-mono text-xs">{product.category}</td>
                <td className="p-4 font-mono text-sm text-accent-cyan">${product.price.toFixed(2)}</td>
                <td className="p-4 font-mono text-sm">{product.stock}</td>
                <td className="p-4 text-right">
                  <Link href={`/admin/products/${product.id}`} className="font-mono text-xs text-accent-purple hover:text-white transition-colors">
                    EDIT
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
