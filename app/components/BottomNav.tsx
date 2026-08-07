"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Briefcase, UserPlus, MessageCircle } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const navItems = [
    { name: "Inicio", href: "/", icon: Home },
    { name: "Vacantes", href: "/#vacantes", icon: Briefcase },
    { name: "Registro", href: "/candidatos/nuevo", icon: UserPlus },
    { name: "Contacto", href: "https://wa.me/5216143981235", icon: MessageCircle, external: true },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0A1A3A]/95 backdrop-blur-lg border-t border-[#C9A86A]/40 px-3 py-2 shadow-[0_-5px_20px_rgba(0,0,0,0.3)]">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          if (item.external) {
            return (
              <a
                key={item.name}
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

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center gap-1 p-1 transition-colors ${
                isActive ? "text-[#C9A86A] font-bold" : "text-gray-300 hover:text-white"
              }`}
            >
              <Icon size={20} className={isActive ? "text-[#C9A86A]" : "text-gray-300"} />
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}