"use client";

import HeroDeviceCanvas from "@/components/canvas/HeroDevice";
import MagneticButton from "@/components/ui/MagneticButton";
import { motion } from "framer-motion";
import { Battery, Cpu, Activity } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <HeroDeviceCanvas />
      
      {/* Background Smoke / Glow (simulated) */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-purple/10 via-background to-background" />

      {/* Floating Badges */}
      <div className="absolute inset-0 pointer-events-none z-10 hidden md:block">
        <motion.div 
          animate={{ y: [0, -10, 0] }} 
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-[15%] glass-pill px-4 py-3 rounded-xl flex items-center gap-3"
        >
          <div className="bg-white/10 p-2 rounded-lg text-foreground-secondary">
            <Cpu size={16} />
          </div>
          <div>
            <p className="font-sans text-sm font-medium">TITANIUM GRADE 5</p>
            <p className="font-mono text-[10px] text-foreground-secondary uppercase tracking-widest">CONSTRUCTION | DLC COATING</p>
          </div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/2 right-[15%] glass-pill px-4 py-3 rounded-xl flex items-center gap-3"
        >
          <div className="bg-white/10 p-2 rounded-lg text-foreground-secondary">
            <Activity size={16} />
          </div>
          <div>
            <p className="font-sans text-sm font-medium">AI INTEGRATION</p>
            <p className="font-mono text-[10px] text-foreground-secondary uppercase tracking-widest">VOICE COMMANDS | PREDICTIVE</p>
          </div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, -8, 0] }} 
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/3 left-[20%] glass-pill px-4 py-3 rounded-xl flex items-center gap-3"
        >
          <div className="bg-white/10 p-2 rounded-lg text-foreground-secondary">
            <Battery size={16} />
          </div>
          <div>
            <p className="font-sans text-sm font-medium">10-DAY BATTERY</p>
            <p className="font-mono text-[10px] text-foreground-secondary uppercase tracking-widest">FAST CHARGE | WIRELESS DOCK</p>
          </div>
        </motion.div>
      </div>
      
      {/* Bottom Explore Button */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 pointer-events-auto">
        <Link href="/collections">
          <MagneticButton className="glass-pill px-8 py-3 rounded-full hover:bg-white/5 transition-colors border-white/20 hover:border-white/40 group">
            <span className="font-mono text-sm tracking-widest text-foreground group-hover:text-white transition-colors">
              ИССЛЕДОВАТЬ БУДУЩЕЕ
            </span>
          </MagneticButton>
        </Link>
      </div>
    </section>
  );
}
