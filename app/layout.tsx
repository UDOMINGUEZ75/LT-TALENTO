import "./globals.css";
import Navbar from "./components/Navbar";
import CookieConsent from "./components/CookieConsent";

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
        <Navbar />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}