"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, Menu, X, ChevronRight, Briefcase, UserCheck, PhoneCall } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const primaryNavItems = [
    { name: "Inicio", sectionId: "hero", href: "/" },
    { name: "Quiénes Somos", sectionId: "nosotros", href: "/#nosotros" },
    { name: "Servicios", sectionId: "servicios", href: "/#servicios" },
    { name: "Proceso", sectionId: "proceso", href: "/#proceso" },
    { name: "Vacantes", sectionId: "vacantes", href: "/#vacantes" },
    { name: "Contacto", sectionId: "contacto", href: "/#contacto" },
  ];

  const handleNavigation = (sectionId?: string, href?: string) => {
    setMobileMenuOpen(false);

    // Si estamos en la página principal ("/")
    if (pathname === "/") {
      if (!sectionId || sectionId === "hero") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Si estamos en otra página, redirigimos a la principal con su respectiva ancla
      router.push(href || "/");
    }
  };

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white border-b border-[#C9A86A] shadow-md">
      {/* BARRA PRINCIPAL */}
      <div className="w-full flex items-stretch justify-between min-h-[64px] lg:min-h-[72px]">
        
        {/* LOGO AREA */}
        <div className="flex items-center gap-3 px-4 sm:px-8 py-2 bg-white shrink-0 z-10">
          <Link href="/" className="flex items-center group">
            <Image
              src="/images/LTTALENTO.png"
              alt="Logo LT Talent Solutions"
              width={160}
              height={50}
              className="rounded-md cursor-pointer hover:opacity-95 transition-opacity"
              priority
            />
          </Link>
        </div>

        {/* NAVEGACIÓN PRINCIPAL (Barra azul inclinada) */}
        <div className="hidden lg:flex items-stretch justify-end flex-1 pl-6 relative">
          
          <div 
            className="w-full bg-[#0A1A3A] flex items-stretch justify-end pr-6"
            style={{
              clipPath: "polygon(28px 0, 100% 0, 100% 100%, 0 100%)",
            }}
          >
            <nav className="flex items-stretch gap-1 pl-10">
              {primaryNavItems.map((item) => {
                // Verificamos si esta pestaña está activa visualmente
                const isActive = pathname === "/" && item.sectionId === "hero"; // Puedes ajustar la lógica activa si lo deseas
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavigation(item.sectionId, item.href)}
                    className={`relative flex items-center px-6 text-sm font-bold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "text-[#0A1A3A] bg-white shadow-inner font-black"
                        : "text-white hover:text-[#C9A86A] hover:bg-white/10"
                    }`}
                    style={
                      isActive
                        ? {
                            clipPath: "polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)",
                          }
                        : undefined
                    }
                  >
                    {item.name}
                  </button>
                );
              })}
            </nav>

            {/* BOTÓN DE BÚSQUEDA */}
            <div className="flex items-center pl-4 border-l border-white/20 my-auto ml-4">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#C9A86A] hover:text-[#0A1A3A] text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Buscar"
              >
                <Search size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* BOTÓN MENÚ MÓVIL */}
        <div className="flex items-center lg:hidden px-4 bg-[#0A1A3A] text-white">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* DESPLEGABLE DE BÚSQUEDA */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="hidden lg:block bg-[#0A1A3A] border-b border-[#C9A86A]/40 py-4 px-8 text-white shadow-xl"
          >
            <div className="max-w-4xl mx-auto flex items-center gap-3">
              <Search className="text-[#C9A86A]" size={20} />
              <input
                type="text"
                placeholder="Buscar vacantes, servicios o información de la empresa..."
                className="w-full bg-transparent border-none text-white placeholder-gray-400 text-sm focus:outline-none"
                autoFocus
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="text-xs uppercase tracking-wider font-bold text-gray-400 hover:text-white cursor-pointer px-2"
              >
                Cerrar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MENÚ MÓVIL */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0A1A3A] border-t border-[#C9A86A]/30 text-white overflow-hidden shadow-2xl"
          >
            <div className="p-6 space-y-6">
              {/* Buscador móvil */}
              <div className="flex items-center gap-2 bg-white/10 px-4 py-3 rounded-xl border border-white/20">
                <Search className="text-[#C9A86A]" size={18} />
                <input
                  type="text"
                  placeholder="Buscar vacantes o servicios..."
                  className="bg-transparent border-none text-white text-sm placeholder-gray-400 w-full focus:outline-none"
                />
              </div>

              {/* Links Principales con Control de Ruta */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C9A86A]">
                  Navegación
                </span>
                {primaryNavItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavigation(item.sectionId, item.href)}
                    className="w-full flex items-center justify-between py-2.5 border-b border-white/10 text-base font-semibold text-white hover:text-[#C9A86A] text-left cursor-pointer"
                  >
                    <span>{item.name}</span>
                    <ChevronRight size={16} className="text-gray-400" />
                  </button>
                ))}
              </div>

              {/* Acceso Rápido */}
              <div className="space-y-2 pt-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C9A86A]">
                  Acceso Rápido
                </span>
                <div className="grid grid-cols-1 gap-2">
                  <Link
                    href="/candidatos/nuevo"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors text-sm font-semibold"
                  >
                    <UserCheck className="text-[#C9A86A]" size={18} />
                    <span>Bolsa de Trabajo / Candidatos</span>
                  </Link>

                  <Link
                    href="/reclutador/registro"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors text-sm font-semibold"
                  >
                    <Briefcase className="text-[#C9A86A]" size={18} />
                    <span>Registrar Vacante / Empresas</span>
                  </Link>

                  <a
                    href="https://wa.me/5216143981235"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-[#C9A86A] text-[#0A1A3A] rounded-xl font-bold text-sm"
                  >
                    <PhoneCall size={18} />
                    <span>Contacto WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}