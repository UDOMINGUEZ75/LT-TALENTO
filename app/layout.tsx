import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import { CandidateProvider } from "./context/CandidateContext";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "LTTalento",
  description: "Reclutamiento Ejecutivo con Conciencia, Claridad y Rigor",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-white text-gray-900">
        <CandidateProvider>
          <Navbar />
{children}

        </CandidateProvider>
      </body>
    </html>
  );
}