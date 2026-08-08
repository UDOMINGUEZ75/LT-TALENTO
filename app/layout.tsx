import "./globals.css";
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
        {/* Contenedor principal de la aplicación */}
        <div className="w-full min-h-screen overflow-x-hidden flex flex-col pb-24 md:pb-0">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <CookieConsent />
          <BottomNav />
        </div>

        {/* Chatbot flotante posicionado de manera absoluta fuera del flujo para garantizar visibilidad */}
        <div className="fixed bottom-6 right-6 z-[99999]">
          <WhatsAppChatbotWidget />
        </div>
      </body>
    </html>
  );
}