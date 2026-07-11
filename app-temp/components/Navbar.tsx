"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full py-4 px-6 bg-white shadow-md fixed top-0 left-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <Image
            src="/images/hero-abstract.png"
            alt="Logo LTTalento"
            width={40}
            height={40}
            className="rounded-md"
          />
          <span className="text-xl font-semibold text-[#1A4B84]">
            LTTalento
          </span>
        </div>

        {/* Menú desktop */}
        <div className="hidden md:flex gap-8 text-[#1A4B84] font-medium">
          <Link href="#proceso">Proceso</Link>
          <Link href="#servicios">Servicios</Link>
          <Link href="#contacto">Contacto</Link>
        </div>

        {/* Botón hamburguesa */}
        <button
          className="md:hidden flex flex-col gap-1"
          onClick={() => setOpen(!open)}
        >
          <span className={`h-0.5 w-6 bg-[#1A4B84] transition ${open ? "rotate-45 translate-y-1.5" : ""}`}></span>
          <span className={`h-0.5 w-6 bg-[#1A4B84] transition ${open ? "opacity-0" : ""}`}></span>
          <span className={`h-0.5 w-6 bg-[#1A4B84] transition ${open ? "-rotate-45 -translate-y-1.5" : ""}`}></span>
        </button>
      </div>

      {/* Menú móvil */}
      {open && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-6 px-6 flex flex-col gap-6 text-[#1A4B84] font-medium">
          <Link href="#proceso" onClick={() => setOpen(false)}>Proceso</Link>
          <Link href="#servicios" onClick={() => setOpen(false)}>Servicios</Link>
          <Link href="#contacto" onClick={() => setOpen(false)}>Contacto</Link>
        </div>
      )}
    </nav>
  );
}