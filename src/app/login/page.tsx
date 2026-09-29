"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";

export default function Login() {
  const [email, setEmail] = useState("admin@aetheria.com");
  const [password, setPassword] = useState("admin");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res?.ok) {
      router.push("/admin");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <Navbar />
      <div className="w-full max-w-md glass-panel p-8 rounded-2xl mt-20 relative z-10">
        <h1 className="text-2xl font-sans font-medium mb-6 text-center">SYSTEM ACCESS</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-mono text-xs text-foreground-secondary mb-2">EMAIL</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-glass-border rounded-xl p-3 text-sm focus:outline-none focus:border-accent-cyan transition-colors"
            />
          </div>
          <div>
            <label className="block font-mono text-xs text-foreground-secondary mb-2">PASSWORD</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-glass-border rounded-xl p-3 text-sm focus:outline-none focus:border-accent-cyan transition-colors"
            />
          </div>
          <button type="submit" className="w-full bg-accent-purple/20 hover:bg-accent-purple/40 border border-accent-purple/50 text-white p-3 rounded-xl font-mono text-sm tracking-widest mt-4 transition-colors">
            AUTHENTICATE
          </button>
        </form>
      </div>
    </div>
  );
}
