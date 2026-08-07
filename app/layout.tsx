import "./globals.css";
import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import CookieConsent from "./components/CookieConsent";
import BottomNav from "./components/BottomNav";

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
        {/* Este contenedor absorbe el scroll horizontal sin alterar la barra fija en Safari */}
        <div className="w-full overflow-x-hidden min-h-screen flex flex-col pb-20 md:pb-0">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <CookieConsent />
          <BottomNav />
        </div>
      </body>
    </html>
  );
}