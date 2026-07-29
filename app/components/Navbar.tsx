"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full py-2 px-8 bg-white fixed top-0 left-0 z-50 border-b border-[#C9A86A] transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <Image
            src="/images/LTTALENTO.png"
            alt="Logo LTTalento"
            width={180}
            height={60}
            className="rounded-md"
            priority
          />
        </div>

        {/* Menú desktop */}
        <div className="hidden md:flex gap-12 text-[#0A1A3A] font-semibold text-lg tracking-wide">
          <Link href="#proceso" className="hover:text-[#C9A86A] transition">Proceso</Link>
          <Link href="#servicios" className="hover:text-[#C9A86A] transition">Servicios</Link>
          <Link href="#contacto" className="hover:text-[#C9A86A] transition">Contacto</Link>
          <Link href="#vacantes" className="hover:text-[#C9A86A] transition">Vacantes</Link>
        </div>

        {/* Botón hamburguesa */}
        <button
          className="md:hidden flex flex-col gap-1"
          onClick={() => setOpen(!open)}
        >
          <span className={`h-0.5 w-7 bg-[#0A1A3A] transition ${open ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`h-0.5 w-7 bg-[#0A1A3A] transition ${open ? "opacity-0" : ""}`}></span>
          <span className={`h-0.5 w-7 bg-[#0A1A3A] transition ${open ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>
      </div>

      {/* Menú móvil */}
      {open && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white py-6 px-6 flex flex-col gap-6 text-[#0A1A3A] font-semibold text-xl tracking-wide">
          <Link href="#proceso" onClick={() => setOpen(false)} className="hover:text-[#C9A86A] transition">Proceso</Link>
          <Link href="#servicios" onClick={() => setOpen(false)} className="hover:text-[#C9A86A] transition">Servicios</Link>
          <Link href="#contacto" onClick={() => setOpen(false)} className="hover:text-[#C9A86A] transition">Contacto</Link>
          <Link href="#vacantes" onClick={() => setOpen(false)} className="hover:text-[#C9A86A] transition">Vacantes</Link>
        </div>
      )}
    </nav>
  );
}