"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Función para hacer scroll suave hacia la sección
  const scrollToSection = (sectionId: string) => {
    setOpen(false); // Cierra el menú móvil si está abierto
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="w-full py-3 px-8 bg-white fixed top-0 left-0 z-50 border-b border-[#C9A86A] transition-all duration-300 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link href="/">
            <Image
              src="/images/LTTALENTO.png"
              alt="Logo LTTalento"
              width={160}
              height={50}
              className="rounded-md cursor-pointer"
              priority
            />
          </Link>
        </div>

        {/* Menú desktop */}
        <div className="hidden md:flex gap-10 text-[#0A1A3A] font-semibold text-base tracking-wide items-center cursor-pointer">
          <span onClick={() => scrollToSection("proceso")} className="hover:text-[#C9A86A] transition">Proceso</span>
          <span onClick={() => scrollToSection("servicios")} className="hover:text-[#C9A86A] transition">Servicios</span>
          <span onClick={() => scrollToSection("contacto")} className="hover:text-[#C9A86A] transition">Contacto</span>
          <span onClick={() => scrollToSection("vacantes")} className="hover:text-[#C9A86A] transition">Vacantes</span>
          
          {/* Botón de Reclutadores */}
          <Link 
            href="/reclutador/login" 
            className="px-4 py-2 bg-[#0A1A3A] text-white rounded-xl hover:bg-[#162e5d] transition text-sm"
          >
            Empresas / Reclutadores
          </Link>
        </div>

        {/* Botón hamburguesa para móvil */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 focus:outline-none"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
        >
          <span className={`h-0.5 w-7 bg-[#0A1A3A] transition-transform duration-300 ${open ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`h-0.5 w-7 bg-[#0A1A3A] transition-opacity duration-300 ${open ? "opacity-0" : ""}`}></span>
          <span className={`h-0.5 w-7 bg-[#0A1A3A] transition-transform duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>
      </div>

      {/* Menú móvil desplegable */}
      {open && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white py-6 px-8 flex flex-col gap-5 text-[#0A1A3A] font-semibold text-lg border-b border-gray-200 shadow-xl cursor-pointer">
          <span onClick={() => scrollToSection("proceso")} className="hover:text-[#C9A86A] transition">Proceso</span>
          <span onClick={() => scrollToSection("servicios")} className="hover:text-[#C9A86A] transition">Servicios</span>
          <span onClick={() => scrollToSection("contacto")} className="hover:text-[#C9A86A] transition">Contacto</span>
          <span onClick={() => scrollToSection("vacantes")} className="hover:text-[#C9A86A] transition">Vacantes</span>
          <Link 
            href="/reclutador/login" 
            onClick={() => setOpen(false)} 
            className="w-full py-3 bg-[#0A1A3A] text-white text-center rounded-xl transition text-base"
          >
            Empresas / Reclutadores
          </Link>
        </div>
      )}
    </nav>
  );
}