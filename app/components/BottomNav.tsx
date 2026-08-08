"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { 
  Home, 
  Briefcase, 
  Menu, 
  X, 
  ChevronRight, 
  Users, 
  Cog, 
  CheckCircle2,
  User,
  PlusCircle,
  Bot,
  ArrowLeft,
  MessageCircle,
  Send,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  options?: { label: string; action: string }[];
}

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";

  const [isMounted, setIsMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);

  // Estado local del Chatbot integrado directamente en el componente móvil
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: "¡Hola! 👋 Qué gusto saludarte. Soy el asistente de **LT Talent Solutions**. ¿Cómo podemos apoyarte hoy?",
      options: [
        { label: "💼 Busco nuevas oportunidades laborales", action: "candidato" },
        { label: "🏢 Soy empresa y busco talento", action: "empresa" },
        { label: "💬 Prefiero chatear por WhatsApp", action: "whatsapp_directo" },
      ],
    },
  ]);

  const WHATSAPP_NUMBER = "5216143981235";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const isVacantesPage = pathname === "/vacantes";
  const isPostularPage = pathname.includes("/candidatos/postular");
  const isCandidateArea = pathname.startsWith("/candidatos");
  const isRecruiterArea = pathname.startsWith("/reclutador");

  const handleOptionClick = (action: string, label: string) => {
    const userMsg: Message = { id: Date.now().toString(), sender: "user", text: label };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);

      if (action === "candidato") {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "bot",
            text: "¡Excelente! Nuestra plataforma es 100% gratuita para profesionales. ¿Qué te gustaría hacer?",
            options: [
              { label: "📝 Registrar mi Perfil / CV", action: "ir_registro_candidato" },
              { label: "📋 Ver Vacantes Disponibles", action: "ver_vacantes" },
            ],
          },
        ]);
      } else if (action === "empresa") {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "bot",
            text: "Perfecto. Ayudamos a las organizaciones a conectar con el talento ideal. ¿Cómo prefieres avanzar?",
            options: [
              { label: "🚀 Registrar mi Empresa", action: "ir_registro_empresa" },
              { label: "📞 Contactar con un asesor", action: "whatsapp_directo" },
            ],
          },
        ]);
      } else if (action === "whatsapp_directo") {
        const textWp = encodeURIComponent("Hola LT Talent Solutions, me gustaría recibir más información.");
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${textWp}`, "_blank");
      } else if (action === "ver_vacantes") {
        router.push("/vacantes");
        setAiOpen(false);
      } else if (action === "ir_registro_candidato") {
        router.push("/candidatos/nuevo");
        setAiOpen(false);
      } else if (action === "ir_registro_empresa") {
        router.push("/reclutador/registro");
        setAiOpen(false);
      }
    }, 500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userText = inputVal.trim();
    const userMsg: Message = { id: Date.now().toString(), sender: "user", text: userText };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: "Muchas gracias por tu mensaje. Para darte una atención más ágil, te invitamos a explorar nuestras opciones:",
          options: [
            { label: "📋 Ver Vacantes", action: "ver_vacantes" },
            { label: "💬 Continuar en WhatsApp", action: "whatsapp_directo" },
          ],
        },
      ]);
    }, 600);
  };

  let bottomNavItems: Array<{
    name: string;
    href?: string;
    sectionId?: string;
    icon: any;
    type: "link" | "scroll" | "ai" | "action";
  }> = [];

  if (isPostularPage) {
    bottomNavItems = [
      { name: "Inicio", href: "/", icon: Home, type: "link" },
      { name: "Vacantes", href: "/vacantes", icon: Briefcase, type: "link" },
      { name: "IA", icon: Bot, type: "ai" },
      { name: "Volver", href: "/vacantes", icon: ArrowLeft, type: "link" },
    ];
  } else if (isVacantesPage) {
    bottomNavItems = [
      { name: "Inicio", href: "/", icon: Home, type: "link" },
      { name: "Vacantes", href: "/vacantes", icon: Briefcase, type: "link" },
      { name: "IA", icon: Bot, type: "ai" },
      { name: "Menú", icon: Menu, type: "action" },
    ];
  } else if (isCandidateArea && id) {
    bottomNavItems = [
      { name: "Inicio", href: `/candidatos/dashboard?id=${id}`, icon: Home, type: "link" },
      { name: "Vacantes", href: "/vacantes", icon: Briefcase, type: "link" },
      { name: "IA", icon: Bot, type: "ai" },
      { name: "Perfil", href: `/candidatos/actualizar/${id}`, icon: User, type: "link" },
    ];
  } else if (isRecruiterArea && id) {
    bottomNavItems = [
      { name: "Inicio", href: `/reclutador/dashboard?id=${id}`, icon: Home, type: "link" },
      { name: "Crear", href: `/reclutador/vacantes/nueva?id=${id}`, icon: PlusCircle, type: "link" },
      { name: "IA", icon: Bot, type: "ai" },
      { name: "Mis Vacantes", href: `/reclutador/mis-vacantes?id=${id}`, icon: Briefcase, type: "link" },
    ];
  } else {
    bottomNavItems = [
      { name: "Inicio", sectionId: "hero", href: "/", icon: Home, type: "scroll" },
      { name: "Vacantes", href: "/vacantes", icon: Briefcase, type: "link" },
      { name: "Asistente IA", icon: Bot, type: "ai" },
      { name: "Menú", icon: Menu, type: "action" },
    ];
  }

  const primaryNavItems = [
    { name: "Inicio", sectionId: "hero", href: "/", icon: Home },
    { name: "Quiénes Somos", sectionId: "nosotros", href: "/#nosotros", icon: Users },
    { name: "Servicios", sectionId: "servicios", href: "/#servicios", icon: Cog },
    { name: "Proceso", sectionId: "proceso", href: "/#proceso", icon: CheckCircle2 },
    { name: "Vacantes", href: "/vacantes", icon: Briefcase },
    { name: "Acceso Candidatos", href: "/candidatos/acceso-vacante", icon: User },
    { name: "Contacto", sectionId: "contacto", href: "/#contacto", icon: MessageCircle },
  ];

  const handleNavigation = (sectionId?: string, href?: string) => {
    setMenuOpen(false);
    setAiOpen(false);
    if (typeof window === "undefined") return;

    if (href && href.startsWith("/")) {
      router.push(href);
      return;
    }

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
      {/* VENTANA MODAL DE CHATBOT IA INTEGRADAS NATIVAMENTE */}
      <AnimatePresence>
        {aiOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setAiOpen(false)} 
              className="md:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-[10000]" 
            />
            <motion.div 
              initial={{ y: "100%" }} 
              animate={{ y: 0 }} 
              exit={{ y: "100%" }} 
              transition={{ type: "spring", damping: 25, stiffness: 220 }} 
              className="md:hidden fixed bottom-0 left-0 right-0 z-[10001] bg-white rounded-t-[32px] overflow-hidden flex flex-col h-[80vh] shadow-2xl"
            >
              <div className="bg-[#0A1A3A] text-white p-4 px-5 flex items-center justify-between border-b border-[#C9A86A]/30 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-[#C9A86A] font-bold">
                    LT
                  </div>
                  <div>
                    <h3 className="font-bold text-xs tracking-wide text-white">
                      Asistente IA LT Talent
                    </h3>
                    <p className="text-[10px] text-gray-300 font-light flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span> En línea
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setAiOpen(false)} 
                  className="w-8 h-8 rounded-full bg-white/10 text-gray-300 hover:text-white flex items-center justify-center"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#F8FAFC]">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                    <div className={`max-w-[85%] p-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${msg.sender === "user" ? "bg-[#0A1A3A] text-white rounded-br-xs" : "bg-white text-gray-700 rounded-bl-xs border border-gray-100 shadow-xs"}`}>
                      <p className="whitespace-pre-line">{msg.text}</p>
                    </div>
                    {msg.options && (
                      <div className="mt-2.5 flex flex-col gap-1.5 w-full">
                        {msg.options.map((opt, idx) => (
                          <button 
                            key={idx} 
                            onClick={() => handleOptionClick(opt.action, opt.label)} 
                            className="w-full text-left bg-white text-[#0A1A3A] border border-gray-200 text-xs font-medium py-2.5 px-3 rounded-xl flex items-center justify-between active:bg-[#FFF9EF]"
                          >
                            <span>{opt.label}</span>
                            <ArrowRight size={13} className="text-[#C9A86A]" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {isTyping && (
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs bg-white p-2.5 rounded-2xl w-fit border border-gray-100">
                    <Sparkles size={13} className="text-[#C9A86A] animate-pulse" />
                    <span>Escribiendo respuesta...</span>
                  </div>
                )}
              </div>

              <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-100 flex items-center gap-2 shrink-0 pb-8">
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#C9A86A]"
                />
                <button 
                  type="submit" 
                  className="w-9 h-9 rounded-xl bg-[#0A1A3A] text-[#C9A86A] flex items-center justify-center shrink-0"
                >
                  <Send size={14} />
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* MENÚ INSTITUCIONAL DESPLEGABLE */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setMenuOpen(false)} 
              className="md:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-[10000]" 
            />
            <motion.div 
              initial={{ y: "100%" }} 
              animate={{ y: 0 }} 
              exit={{ y: "100%" }} 
              transition={{ type: "spring", damping: 25, stiffness: 220 }} 
              className="md:hidden fixed bottom-0 left-0 right-0 z-[10001] bg-[#0A1A3A] border-t-2 border-[#C9A86A] rounded-t-[32px] px-5 pt-4 pb-20 text-white max-h-[85vh] overflow-y-auto"
            >
              <div className="w-12 h-1.5 bg-gray-500/40 rounded-full mx-auto mb-4" />
              <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C9A86A]">Menú Principal</span>
                <button onClick={() => setMenuOpen(false)} className="p-1.5 rounded-full bg-white/10 text-gray-300"><X size={18} /></button>
              </div>
              <div className="space-y-1 mb-6">
                {primaryNavItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button key={item.name} onClick={() => handleNavigation(item.sectionId, item.href)} className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl text-xs font-semibold text-gray-100 active:bg-white/10 text-left border border-white/5">
                      <div className="flex items-center gap-3">
                        <Icon size={18} className="text-[#C9A86A]" />
                        <span>{item.name}</span>
                      </div>
                      <ChevronRight size={16} className="text-gray-500" />
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* BARRA INFERIOR FIJA PEGADA AL BORDE DEL NAVEGADOR Y PANTALLA */}
      <nav 
        style={{ 
          paddingBottom: "max(12px, env(safe-area-inset-bottom))"
        }}
        className="md:hidden fixed bottom-0 left-0 right-0 z-[9999] bg-[#0A1A3A] border-t border-[#C9A86A]/40 px-3 pt-2 shadow-[0_-8px_25px_rgba(0,0,0,0.9)]"
      >
        <div className="flex items-center justify-around">
          {bottomNavItems.map((item, index) => {
            const Icon = item.icon;

            if (item.type === "link" && item.href) {
              const isActive = pathname === item.href.split("?")[0];
              return (
                <Link key={index} href={item.href} className={`flex flex-col items-center gap-1 p-1 transition-colors ${isActive ? "text-[#C9A86A] font-bold" : "text-gray-300 active:text-[#C9A86A]"}`}>
                  <Icon size={20} className={isActive ? "text-[#C9A86A]" : "text-gray-300"} />
                  <span className="text-[10px] font-medium">{item.name}</span>
                </Link>
              );
            }

            if (item.type === "scroll") {
              return (
                <button key={index} onClick={() => handleNavigation(item.sectionId, item.href)} className="flex flex-col items-center gap-1 p-1 text-gray-300 active:text-[#C9A86A]">
                  <Icon size={20} className="text-[#C9A86A]" />
                  <span className="text-[10px] font-medium">{item.name}</span>
                </button>
              );
            }

            if (item.type === "ai") {
              return (
                <button 
                  key={index} 
                  onClick={() => {
                    setMenuOpen(false);
                    setAiOpen(true);
                  }} 
                  type="button"
                  className="flex flex-col items-center gap-1 p-1 text-[#C9A86A] active:text-white"
                >
                  <div className="w-8 h-8 rounded-full bg-[#C9A86A] text-[#0A1A3A] flex items-center justify-center shadow-md">
                    <Icon size={16} />
                  </div>
                  <span className="text-[10px] font-bold">{item.name}</span>
                </button>
              );
            }

            if (item.type === "action") {
              return (
                <button key={index} onClick={() => { setAiOpen(false); setMenuOpen(!menuOpen); }} className="flex flex-col items-center gap-1 p-1 text-gray-300 active:text-[#C9A86A]">
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