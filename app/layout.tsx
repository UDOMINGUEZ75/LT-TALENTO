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
      <body className="pb-20 md:pb-0">
        <Navbar />
        {children}
        <CookieConsent />
        <BottomNav />
      </body>
    </html>
  );
}