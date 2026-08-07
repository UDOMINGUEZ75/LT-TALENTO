"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const primaryNavItems = [
    { name: "Inicio", sectionId: "hero", href: "/" },
    { name: "Quiénes Somos", sectionId: "nosotros", href: "/#nosotros" },
    { name: "Servicios", sectionId: "servicios", href: "/#servicios" },
    { name: "Proceso", sectionId: "proceso", href: "/#proceso" },
    { name: "Vacantes", sectionId: "vacantes", href: "/#vacantes" },
    { name: "Contacto", sectionId: "contacto", href: "/#contacto" },
  ];

  // Observador de secciones activas en Desktop
  useEffect(() => {
    if (!isMounted || typeof window === "undefined" || pathname !== "/") return;

    const observers: IntersectionObserver[] = [];

    const timeoutId = setTimeout(() => {
      primaryNavItems.forEach((item) => {
        const element = document.getElementById(item.sectionId);
        if (element && "IntersectionObserver" in window) {
          try {
            const observer = new IntersectionObserver(
              (entries) => {
                entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                    setActiveSection(item.sectionId);
                  }
                });
              },
              { threshold: 0.2 }
            );
            observer.observe(element);
            observers.push(observer);
          } catch (err) {
            console.warn("IntersectionObserver no disponible:", err);
          }
        }
      });
    }, 300);

    return () => {
      clearTimeout(timeoutId);
      observers.forEach((obs) => obs.disconnect());
    };
  }, [pathname, isMounted]);

  const handleNavigation = (sectionId?: string, href?: string) => {
    if (typeof window === "undefined") return;

    if (pathname === "/") {
      if (!sectionId || sectionId === "hero") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setActiveSection("hero");
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
    <header className="w-full fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#C9A86A]/40 shadow-sm">
      {/* BARRA PRINCIPAL */}
      <div className="w-full flex items-stretch justify-between h-14 sm:h-16 lg:h-18">
        
        {/* LOGO AREA */}
        <div className="flex items-center px-4 sm:px-8 py-2 bg-white shrink-0 z-10">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/LTTALENTO.png"
              alt="Logo LT Talent Solutions"
              width={160}
              height={50}
              className="w-auto h-8 sm:h-10 object-contain rounded-md cursor-pointer hover:opacity-95 transition-opacity"
              priority
            />
          </Link>
        </div>

        {/* NAVEGACIÓN DESKTOP (SOLO PANTALLAS GRANDES) */}
        <div className="hidden lg:flex items-stretch justify-end flex-1 pl-6 relative">
          <div 
            className="w-full bg-[#0A1A3A] flex items-stretch justify-end pr-6"
            style={{
              clipPath: "polygon(28px 0, 100% 0, 100% 100%, 0 100%)",
            }}
          >
            <nav className="flex items-stretch gap-1 pl-10">
              {primaryNavItems.map((item) => {
                const isActive = pathname === "/" && activeSection === item.sectionId;

                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavigation(item.sectionId, item.href)}
                    className={`relative flex items-center px-5 xl:px-6 text-sm font-bold transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "text-[#C9A86A] bg-white/10 font-black border-b-2 border-[#C9A86A]"
                        : "text-white hover:text-[#C9A86A] hover:bg-white/5"
                    }`}
                  >
                    {item.name}
                  </button>
                );
              })}
            </nav>

            {/* BÚSQUEDA DESKTOP */}
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
      </div>

      {/* DESPLEGABLE BÚSQUEDA DESKTOP */}
      <AnimatePresence>
        {isMounted && searchOpen && (
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
    </header>
  );
}