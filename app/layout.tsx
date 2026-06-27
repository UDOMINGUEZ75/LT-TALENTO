import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "LTTalento",
  description: "Reclutamiento Ejecutivo con Conciencia, Claridad y Rigor",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-white text-gray-900">
        <Navbar />
        <div className="pt-24">
          {children}
        </div>
      </body>
    </html>
  );
}
