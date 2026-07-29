import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
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
      <body>
        <Navbar />   {/* ← Aquí se carga SIEMPRE */}
        {children}
      </body>
    </html>
  );
}
