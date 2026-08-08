"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { 
  Home, 
  Briefcase, 
  MessageCircle, 
  Menu, 
  X, 
  ChevronRight, 
  Users, 
  Cog, 
  CheckCircle2,
  FileText,
  User,
  PlusCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";

  const [isMounted, setIsMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const isCandidateArea = pathname.startsWith("/candidatos");
  const isRecruiterArea = pathname.startsWith("/reclutador");

  let bottomNavItems = [];

  if (isCandidateArea && id) {
    bottomNavItems = [
      { name: "Inicio", href: `/candidatos/dashboard?id=${id}`, icon: Home, type: "link" },
      { name: "Vacantes", href: "/vacantes", icon: Briefcase, type: "link" },
      { name: "Postulaciones", href: `/candidatos/postulaciones?id=${id}`, icon: FileText, type: "link" },
      { name: "Perfil", href: `/candidatos/actualizar/${id}`, icon: User, type: "link" },
    ];
  } else if (isRecruiterArea && id) {
    bottomNavItems = [
      { name: "Inicio", href: `/reclutador/dashboard?id=${id}`, icon: Home, type: "link" },
      { name: "Crear", href: `/reclutador/vacantes/nueva?id=${id}`, icon: PlusCircle, type: "link" },
      { name: "Candidatos", href: `/reclutador/candidatos?id=${id}`, icon: Users, type: "link" },
      { name: "Mis Vacantes", href: `/reclutador/mis-vacantes?id=${id}`, icon: Briefcase, type: "link" },
    ];
  } else {
    bottomNavItems = [
      { name: "Inicio", sectionId: "hero", href: "/", icon: Home, type: "scroll" },
      { name: "Vacantes", sectionId: "vacantes", href: "/vacantes", icon: Briefcase, type: "scroll" },
      { name: "WhatsApp", href: "https://wa.me/5216143981235", icon: MessageCircle, type: "external" },
      { name: "Menú", action: "toggleMenu", icon: Menu, type: "action" },
    ];
  }

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
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="md:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0A1A3A] border-t-2 border-[#C9A86A] rounded-t-[32px] px-5 pt-4 pb-32 text-white shadow-[0_-10px_30px_rgba(0,0,0,0.6)] max-h-[85vh] overflow-y-auto"
            >
              <div className="w-12 h-1.5 bg-gray-500/40 rounded-full mx-auto mb-4" />

              <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C9A86A]">
                  Menú Principal
                </span>
                <button onClick={() => setMenuOpen(false)} className="p-1.5 rounded-full bg-white/10 text-gray-300">
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-1 mb-6">
                {primaryNavItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.name}
                      onClick={() => handleNavigation(item.sectionId, item.href)}
                      className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl text-xs font-semibold text-gray-100 hover:bg-white/10 transition-colors text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={18} className="text-[#C9A86A]" />
                        <span>{item.name}</span>
                      </div>
                      <ChevronRight size={16} className="text-gray-500" />
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                <div className="flex flex-col gap-2">
                  <Link 
                    href="/candidatos/nuevo" 
                    onClick={() => setMenuOpen(false)}
                    className="py-3 px-2 bg-[#C9A86A] text-[#0A1A3A] font-black rounded-xl text-[9px] uppercase text-center shadow-md leading-tight flex items-center justify-center min-h-[44px]"
                  >
                    Registrar Perfil Profesional
                  </Link>
                  <Link 
                    href="/candidate/login" 
                    onClick={() => setMenuOpen(false)}
                    className="py-3 px-2 bg-white text-[#0A1A3A] font-black rounded-xl text-[9px] uppercase text-center shadow-md leading-tight flex items-center justify-center min-h-[44px]"
                  >
                    Acceso a Mi Cuenta
                  </Link>
                </div>

                <div className="flex flex-col gap-2">
                  <Link 
                    href="/reclutador/registro" 
                    onClick={() => setMenuOpen(false)}
                    className="py-3 px-2 bg-[#C9A86A] text-[#0A1A3A] font-black rounded-xl text-[9px] uppercase text-center shadow-md leading-tight flex items-center justify-center min-h-[44px]"
                  >
                    Registrar Empresa / Cuenta
                  </Link>
                  <Link 
                    href="/reclutador/login" 
                    onClick={() => setMenuOpen(false)}
                    className="py-3 px-2 bg-white text-[#0A1A3A] font-black rounded-xl text-[9px] uppercase text-center shadow-md leading-tight flex items-center justify-center min-h-[44px]"
                  >
                    Portal Corporativo
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <nav 
        style={{ WebkitTransform: "translate3d(0,0,0)" }}
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 transform-gpu will-change-transform bg-[#0A1A3A] border-t border-[#C9A86A]/40 px-3 pt-2.5 pb-3 shadow-[0_-8px_25px_rgba(0,0,0,0.6)]"
      >
        <div className="flex items-center justify-around">
          {bottomNavItems.map((item, index) => {
            const Icon = item.icon;

            if (item.type === "link") {
              const isActive = pathname === item.href.split("?")[0];
              return (
                <Link
                  key={index}
                  href={item.href}
                  className={`flex flex-col items-center gap-1 p-1 transition-colors ${
                    isActive ? "text-[#C9A86A] font-bold" : "text-gray-300 hover:text-[#C9A86A]"
                  }`}
                >
                  <Icon size={20} className={isActive ? "text-[#C9A86A]" : "text-gray-300"} />
                  <span className="text-[10px] font-medium">{item.name}</span>
                </Link>
              );
            }

            if (item.type === "scroll") {
              return (
                <button
                  key={index}
                  onClick={() => handleNavigation(item.sectionId, item.href)}
                  className="flex flex-col items-center gap-1 p-1 text-gray-300 hover:text-[#C9A86A] transition-colors cursor-pointer"
                >
                  <Icon size={20} className="text-[#C9A86A]" />
                  <span className="text-[10px] font-medium">{item.name}</span>
                </button>
              );
            }

            if (item.type === "external") {
              return (
                <a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1 p-1 text-gray-300 hover:text-[#C9A86A] transition-colors"
                >
                  <Icon size={20} className="text-[#C9A86A]" />
                  <span className="text-[10px] font-medium">{item.name}</span>
                </a>
              );
            }

            if (item.type === "action") {
              return (
                <button
                  key={index}
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex flex-col items-center gap-1 p-1 text-gray-300 hover:text-[#C9A86A] transition-colors cursor-pointer"
                >
                  <Icon size={20} className="text-[#C9A86A]" />
                  <span className="text-[10px] font-medium">{item.name}</span>
                </button>
              );
            }

            return null;
          })}
        </div>
      </nav>
    </>
  );
}