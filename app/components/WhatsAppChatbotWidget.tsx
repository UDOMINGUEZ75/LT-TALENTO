"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles, ArrowRight, PhoneCall } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  options?: { label: string; action: string }[];
}

export default function WhatsAppChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: "¡Hola! 🌟 Bienvenido a **LT Talent Solutions**. Soy tu asesor virtual inteligente. ¿Cómo podemos transformar el futuro de tu equipo hoy?",
      options: [
        { label: "💼 Contratar Servicio de Reclutamiento", action: "contratar" },
        { label: "🚀 Consultar Paquetes y Cotización", action: "costos" },
        { label: "👥 Soy Candidato (Bolsa 100% Gratuita)", action: "candidato" },
      ],
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const WHATSAPP_NUMBER = "5216143981235"; // WhatsApp oficial de LT Talento

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const sendToGeminiAPI = async (userPrompt: string) => {
    setIsTyping(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userPrompt }),
      });

      const data = await res.json();
      const botMsg: Message = {
        id: Date.now().toString(),
        sender: "bot",
        text: data.text || "Conversemos directamente por WhatsApp para brindarte una solución a la medida.",
        options: [
          { label: "💬 Conectar con Ventas por WhatsApp", action: "whatsapp_directo" },
          { label: "📋 Registrar mi Vacante", action: "pregunta_registro" }, // Redirige a la nueva pregunta
        ],
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: "bot",
          text: "Estamos listos para atender tus requerimientos de talento. Hablemos de inmediato por WhatsApp.",
          options: [{ label: "💬 Abrir WhatsApp Corporativo", action: "whatsapp_directo" }],
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleOptionClick = (action: string, label: string) => {
    const userMsg: Message = { id: Date.now().toString(), sender: "user", text: label };
    setMessages((prev) => [...prev, userMsg]);

    if (action === "whatsapp_directo") {
      const textWp = encodeURIComponent("Hola LT Talent Solutions, me interesa contratar sus servicios profesionales de reclutamiento y selección de personal.");
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${textWp}`, "_blank");
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: "¡Excelente! Te he conectado con nuestro canal directo de WhatsApp. Un asesor te atenderá al instante. 🚀",
        },
      ]);
    } else if (action === "pregunta_registro") {
      // NUEVO FLUJO: Pregunta si es nuevo o ya tiene cuenta
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: "Para continuar, ¿ya cuentas con un perfil de empresa corporativo o eres nuevo en LT Talent Solutions?",
          options: [
            { label: "🆕 Soy Nueva Empresa (Crear Cuenta)", action: "ir_registro" },
            { label: "🔑 Ya estoy registrado (Iniciar Sesión)", action: "ir_login_empresa" },
          ],
        },
      ]);
    } else if (action === "ir_registro") {
      window.location.href = "/reclutador/registro";
    } else if (action === "ir_login_empresa") {
      window.location.href = "/reclutador/login";
    } else if (action === "candidato") {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: "¡Qué gran noticia! Registrar tu perfil en nuestra bolsa de trabajo es **100% gratuito**. Explora oportunidades y conéctate con las mejores empresas.",
          options: [
            { label: "📝 Registrar Perfil Profesional", action: "ir_candidato" },
            { label: "💬 Resolver dudas por WhatsApp", action: "whatsapp_directo" },
          ],
        },
      ]);
    } else if (action === "ir_candidato") {
      window.location.href = "/candidatos/nuevo";
    } else {
      sendToGeminiAPI(`Háblame de ${label} en LT Talent Solutions.`);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userText = inputVal;
    const userMsg: Message = { id: Date.now().toString(), sender: "user", text: userText };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");

    sendToGeminiAPI(userText);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999999] font-sans">
      {/* BOTÓN FLOTANTE */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setIsOpen(true)}
            className="relative bg-[#25D366] hover:bg-[#20ba5a] text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition-all cursor-pointer group"
            aria-label="Abrir Asistente Comercial"
          >
            <MessageCircle size={30} className="fill-current text-white" />
            <span className="absolute -top-1 -right-1 bg-[#C9A86A] text-[#0A1A3A] font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
              1
            </span>
            <span className="absolute right-full mr-3 bg-[#0A1A3A] text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Asesor Virtual • ¿Contratar Reclutamiento? 💬
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* VENTANA DE CHAT */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 250, damping: 22 }}
            className="w-[90vw] sm:w-[400px] h-[560px] bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
          >
            {/* ENCABEZADO */}
            <div className="bg-[#0A1A3A] text-white p-4 px-5 flex items-center justify-between border-b border-[#C9A86A]/40">
              <div className="flex items-center gap-3">
                <div className="relative">
                  {/* AQUÍ ESTÁ TU LOGO */}
                  <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center overflow-hidden shadow-md">
                    <img src="/logo.png" alt="LT Logo" className="w-full h-full object-contain p-1" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#0A1A3A] rounded-full" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm tracking-tight flex items-center gap-1.5">
                    LT Asesor Virtual <Sparkles size={14} className="text-[#C9A86A]" />
                  </h3>
                  <p className="text-[11px] text-gray-300 font-light">
                    Construyendo el futuro • Ventas de Reclutamiento
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Cerrar chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* CUERPO DE MENSAJES */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50/60">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[88%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                      msg.sender === "user"
                        ? "bg-[#0A1A3A] text-white rounded-br-none font-medium"
                        : "bg-white text-gray-800 rounded-bl-none border border-gray-100 font-normal"
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                  </div>

                  {msg.options && (
                    <div className="mt-3 flex flex-col gap-2 w-full pl-1">
                      {msg.options.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleOptionClick(opt.action, opt.label)}
                          className="w-full text-left bg-white hover:bg-[#FFF9EF] text-[#0A1A3A] border border-[#C9A86A]/40 hover:border-[#C9A86A] text-xs font-bold py-2.5 px-3.5 rounded-xl shadow-xs transition-all flex items-center justify-between group cursor-pointer"
                        >
                          <span>{opt.label}</span>
                          <ArrowRight size={14} className="text-[#C9A86A] group-hover:translate-x-1 transition-transform" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-gray-500 text-xs bg-white p-3 rounded-2xl w-fit border border-gray-100 shadow-xs">
                  <Sparkles size={14} className="text-[#C9A86A] animate-spin" />
                  <span>Analizando tu solicitud...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* ACCESO DIRECTO WHATSAPP EN PIE DE CHAT */}
            <div className="px-4 py-2 bg-[#FFF9EF] border-t border-[#C9A86A]/20 flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#8c6f33]">¿Atención comercial urgente?</span>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola, me interesa contratar reclutamiento con LT Talent Solutions.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-extrabold text-[#0A1A3A] hover:text-[#C9A86A] flex items-center gap-1 transition-colors"
              >
                <PhoneCall size={12} className="text-[#25D366]" /> Abrir WhatsApp Directo
              </a>
            </div>

            {/* INPUT DE MENSAJE */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-200 flex items-center gap-2">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Escribe tu duda sobre contratación o vacantes..."
                className="flex-1 bg-gray-100 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-[#0A1A3A] placeholder-gray-400 focus:outline-none focus:border-[#C9A86A] transition-colors"
              />
              <button
                type="submit"
                className="w-10 h-10 rounded-xl bg-[#C9A86A] hover:bg-[#b89555] text-[#0A1A3A] flex items-center justify-center transition-colors cursor-pointer shadow-md shrink-0"
                aria-label="Enviar"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}