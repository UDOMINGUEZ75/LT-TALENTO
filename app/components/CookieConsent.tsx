"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const consent = localStorage.getItem("lttalento_cookie_consent");
        if (!consent) {
          setShowBanner(true);
        }
      }
    } catch (err) {
      console.warn("localStorage no disponible:", err);
    }
  }, []);

  const acceptCookies = () => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("lttalento_cookie_consent", "true");
      }
    } catch (err) {
      console.warn("No se pudo guardar consentimiento en localStorage:", err);
    }
    setShowBanner(false);
  };

  if (!isMounted || !showBanner) return null;

  return (
    <div className="fixed bottom-14 md:bottom-0 left-0 right-0 z-50 bg-[#08142c]/95 backdrop-blur-md border-t border-[#C9A86A]/40 p-3.5 sm:p-5 shadow-2xl text-white">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <Cookie size={20} className="text-[#C9A86A] shrink-0 hidden sm:block" />
          <p className="text-[11px] sm:text-xs text-gray-300 leading-relaxed">
            Utilizamos cookies esenciales para el funcionamiento de la plataforma y autenticación. Al navegar, aceptas nuestra política conforme a la legislación mexicana.{" "}
            <Link href="/aviso-privacidad" className="text-[#C9A86A] underline hover:text-white transition font-medium">
              Aviso de Privacidad
            </Link>
          </p>
        </div>
        <button
          onClick={acceptCookies}
          className="w-full sm:w-auto px-5 py-2 bg-[#C9A86A] text-[#0A1A3A] font-extrabold rounded-xl hover:bg-[#d8b97a] transition text-xs shrink-0 shadow-md cursor-pointer"
        >
          Aceptar y continuar
        </button>
      </div>
    </div>
  );
}