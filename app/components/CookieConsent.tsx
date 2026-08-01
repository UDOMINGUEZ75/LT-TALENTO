"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("lttalento_cookie_consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("lttalento_cookie_consent", "true");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#08142c] border-t border-[#C9A86A]/40 p-4 sm:p-6 shadow-2xl text-white">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs sm:text-sm text-gray-300 text-center sm:text-left">
          Utilizamos cookies propias y de sesión para garantizar el funcionamiento correcto de la plataforma y autenticación de vacantes. Al continuar navegando, acepta nuestra política y el manejo bajo la legislación mexicana.{" "}
          <Link href="/aviso-privacidad" className="text-[#C9A86A] underline hover:text-white transition">
            Aviso de Privacidad
          </Link>
        </p>
        <button
          onClick={acceptCookies}
          className="px-6 py-2.5 bg-[#C9A86A] text-[#0A1A3A] font-bold rounded-xl hover:bg-[#d8b97a] transition text-xs sm:text-sm shrink-0 shadow-lg cursor-pointer"
        >
          Aceptar y continuar
        </button>
      </div>
    </div>
  );
}