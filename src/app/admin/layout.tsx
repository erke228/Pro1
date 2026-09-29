"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Package, ShoppingCart, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useEffect } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== "loading" && (!session || (session.user as any).role !== "ADMIN")) {
      router.push("/login");
    }
  }, [session, status, router]);

  if (status === "loading") return <div className="min-h-screen flex items-center justify-center font-mono">ЗАГРУЗКА...</div>;
  
  if (!session || (session.user as any).role !== "ADMIN") {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 glass-panel border-r border-glass-border flex flex-col p-6 fixed h-full z-10">
        <div className="mb-10">
          <span className="font-sans text-xl tracking-[0.3em] font-light text-foreground block">AETHERIA</span>
          <span className="font-mono text-[10px] tracking-widest text-accent-cyan">ADMIN OVERSEER</span>
        </div>
        
        <nav className="flex-1 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 font-mono text-sm text-foreground-secondary hover:text-white p-3 rounded-lg hover:bg-white/5 transition-colors">
            <LayoutDashboard size={18} />
            DASHBOARD
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 font-mono text-sm text-foreground-secondary hover:text-white p-3 rounded-lg hover:bg-white/5 transition-colors">
            <Package size={18} />
            PRODUCTS
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 font-mono text-sm text-foreground-secondary hover:text-white p-3 rounded-lg hover:bg-white/5 transition-colors">
            <ShoppingCart size={18} />
            ORDERS
          </Link>
        </nav>

        <button onClick={() => signOut()} className="flex items-center gap-3 font-mono text-sm text-red-400 hover:text-red-300 p-3 rounded-lg hover:bg-white/5 transition-colors mt-auto">
          <LogOut size={18} />
          DISCONNECT
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-10 relative z-0">
        {children}
      </main>
    </div>
  );
}
