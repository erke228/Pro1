import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "AETHERIA LUXE | Dark Glassmorphism 3D E-Commerce",
  description: "Premium tech boutique for smart wearables, drones, and audio systems.",
};

import CartDrawer from "@/components/layout/CartDrawer";
import SessionProvider from "@/components/providers/SessionProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} ${jetbrains.variable} antialiased`}>
        <SessionProvider>
          {children}
          <CartDrawer />
        </SessionProvider>
      </body>
    </html>
  );
}
