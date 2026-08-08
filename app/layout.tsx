import "./globals.css";
import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import CookieConsent from "./components/CookieConsent";
import BottomNav from "./components/BottomNav";
import WhatsAppChatbotWidget from "./components/WhatsAppChatbotWidget"; // 👈 1. Importa el chatbot

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
      <body className="bg-[#0A1A3A] text-white antialiased">
        {/* Contenedor wrapper para absorber desbordamientos sin alterar el viewport fijo de Safari */}
        <div className="w-full min-h-screen overflow-x-hidden flex flex-col pb-24 md:pb-0">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <CookieConsent />
          <BottomNav />
          
          {/* 👈 2. Coloca el widget aquí para que flote en todas las páginas */}
          <WhatsAppChatbotWidget />
        </div>
      </body>
    </html>
  );
}