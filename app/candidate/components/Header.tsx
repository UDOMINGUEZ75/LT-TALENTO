"use client";

import { BellIcon, UserCircleIcon } from "@heroicons/react/24/outline";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div className="text-xl font-bold text-[#1A4A84] tracking-tight">
          LT Talento
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-6">
          <button className="relative">
            <BellIcon className="w-6 h-6 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <button className="flex items-center gap-2">
            <UserCircleIcon className="w-8 h-8 text-gray-700" />
          </button>
        </div>
      </div>
    </header>
  );
}
