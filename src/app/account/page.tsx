"use client";

import Navbar from "@/components/layout/Navbar";
import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { LogOut } from "lucide-react";
import Link from "next/link";

export default function Account() {
  const { data: session, status } = useSession();

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="container mx-auto px-6 md:px-12 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <h1 className="text-3xl font-sans font-medium mb-8">USER DIRECTORY</h1>

          {status === "loading" ? (
            <p className="font-mono text-sm">AUTHENTICATING...</p>
          ) : session ? (
            <div className="glass-panel p-8 rounded-3xl">
              <div className="flex items-center gap-6 mb-8 border-b border-glass-border pb-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-accent-purple to-accent-cyan p-[2px]">
                  <div className="w-full h-full bg-background rounded-full flex items-center justify-center font-mono text-2xl">
                    {session.user?.email?.[0].toUpperCase()}
                  </div>
                </div>
                <div>
                  <h2 className="font-sans text-xl font-medium">{session.user?.email}</h2>
                  <p className="font-mono text-xs text-accent-cyan mt-1">ROLE: {(session.user as any).role}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {(session.user as any).role === "ADMIN" && (
                  <Link href="/admin" className="block w-full text-center font-mono text-sm bg-white/5 hover:bg-white/10 p-4 rounded-xl transition-colors">
                    ACCESS ADMIN OVERSEER
                  </Link>
                )}
                
                <button 
                  onClick={() => signOut()} 
                  className="w-full flex items-center justify-center gap-2 font-mono text-sm text-red-400 hover:bg-red-400/10 p-4 rounded-xl transition-colors"
                >
                  <LogOut size={16} />
                  DISCONNECT
                </button>
              </div>
            </div>
          ) : (
            <div className="glass-panel p-8 rounded-3xl text-center">
              <p className="font-mono text-sm text-foreground-secondary mb-6">Unidentified entity. Please authenticate to access secure files.</p>
              <Link href="/login" className="inline-block bg-accent-purple/20 border border-accent-purple/50 px-8 py-3 rounded-xl font-mono text-sm hover:bg-accent-purple/40 transition-colors">
                LOGIN
              </Link>
            </div>
          )}
        </motion.div>
      </section>
    </main>
  );
}
