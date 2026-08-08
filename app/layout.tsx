import "./globals.css";
import { Suspense } from "react";
import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import CookieConsent from "./components/CookieConsent";
import BottomNav from "./components/BottomNav";
import WhatsAppChatbotWidget from "./components/WhatsAppChatbotWidget";

export const metadata: Metadata = {
  title: "LT Talento",
  description: "Sistema de Reclutamiento",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-[#0A1A3A] text-white antialiased relative min-h-screen">
        <div className="w-full min-h-screen overflow-x-hidden flex flex-col pb-24 md:pb-0">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <CookieConsent />
          
          {/* Envuelto en Suspense para evitar errores de renderizado en Next.js */}
          <Suspense fallback={null}>
            <BottomNav />
          </Suspense>
        </div>

        <div className="fixed bottom-6 right-6 z-[999999]">
          <WhatsAppChatbotWidget />
        </div>
      </body>
    </html>
  );
}