"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  Home, 
  Briefcase, 
  MessageCircle, 
  Menu, 
  X, 
  ChevronRight, 
  UserCheck, 
  Users, 
  Cog, 
  CheckCircle2 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const primaryNavItems = [
    { name: "Inicio", sectionId: "hero", href: "/", icon: Home },
    { name: "Quiénes Somos", sectionId: "nosotros", href: "/#nosotros", icon: Users },
    { name: "Servicios", sectionId: "servicios", href: "/#servicios", icon: Cog },
    { name: "Proceso", sectionId: "proceso", href: "/#proceso", icon: CheckCircle2 },
    { name: "Vacantes", sectionId: "vacantes", href: "/#vacantes", icon: Briefcase },
    { name: "Contacto", sectionId: "contacto", href: "/#contacto", icon: MessageCircle },
  ];

  const handleNavigation = (sectionId?: string, href?: string) => {
    setMenuOpen(false);

    if (typeof window === "undefined") return;

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
      router.push(href || "/");
    }
  };

  return (
    <>
      {/* PANEL DESPLIZABLE DE MENÚ COMPLETO */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Fondo oscuro para cerrar al tocar afuera */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Tarjeta inferior tipo App */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0A1A3A] border-t-2 border-[#C9A86A] rounded-t-[32px] px-6 pt-5 pb-24 text-white shadow-[0_-10px_30px_rgba(0,0,0,0.5)]"
            >
              {/* Tirador visual */}
              <div className="w-12 h-1.5 bg-gray-500/40 rounded-full mx-auto mb-4" />

              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#C9A86A]">
                  Menú Principal
                </span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-1 rounded-full bg-white/10 text-gray-300 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              {/* LISTA DE SECCIONES */}
              <div className="space-y-1 mb-5">
                {primaryNavItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.name}
                      onClick={() => handleNavigation(item.sectionId, item.href)}
                      className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold text-gray-100 hover:bg-white/10 hover:text-[#C9A86A] transition-colors text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={18} className="text-[#C9A86A]" />
                        <span>{item.name}</span>
                      </div>
                      <ChevronRight size={16} className="text-gray-400" />
                    </button>
                  );
                })}
              </div>

              {/* ACCESOS RÁPIDOS */}
              <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-2">
                <Link
                  href="/candidatos/nuevo"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 p-2.5 bg-white/10 rounded-xl text-xs font-bold text-white border border-white/10"
                >
                  <UserCheck size={16} className="text-[#C9A86A]" />
                  <span>Soy Candidato</span>
                </Link>

                <Link
                  href="/reclutador/registro"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 p-2.5 bg-[#C9A86A] text-[#0A1A3A] rounded-xl text-xs font-extrabold"
                >
                  <Briefcase size={16} />
                  <span>Soy Empresa</span>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* BARRA INFERIOR FIJA */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A1A3A]/95 backdrop-blur-md border-t border-[#C9A86A]/40 px-3 py-2 shadow-[0_-5px_20px_rgba(0,0,0,0.4)]">
        <div className="flex items-center justify-around">
          
          {/* Inicio */}
          <button
            onClick={() => handleNavigation("hero", "/")}
            className="flex flex-col items-center gap-1 p-1 text-gray-300 hover:text-[#C9A86A] transition-colors cursor-pointer"
          >
            <Home size={20} className="text-[#C9A86A]" />
            <span className="text-[10px] font-medium">Inicio</span>
          </button>

          {/* Vacantes */}
          <button
            onClick={() => handleNavigation("vacantes", "/#vacantes")}
            className="flex flex-col items-center gap-1 p-1 text-gray-300 hover:text-[#C9A86A] transition-colors cursor-pointer"
          >
            <Briefcase size={20} className="text-[#C9A86A]" />
            <span className="text-[10px] font-medium">Vacantes</span>
          </button>

          {/* WhatsApp */}
          <a
            href="https://wa.me/5216143981235"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 p-1 text-gray-300 hover:text-[#C9A86A] transition-colors"
          >
            <MessageCircle size={20} className="text-[#C9A86A]" />
            <span className="text-[10px] font-medium">WhatsApp</span>
          </a>

          {/* Menú Desplegable */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`flex flex-col items-center gap-1 p-1 transition-colors cursor-pointer ${
              menuOpen ? "text-[#C9A86A]" : "text-gray-300 hover:text-white"
            }`}
          >
            <Menu size={20} className={menuOpen ? "text-[#C9A86A]" : "text-gray-300"} />
            <span className="text-[10px] font-medium">Menú</span>
          </button>

        </div>
      </nav>
    </>
  );
}