"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles, ArrowRight } from "lucide-react";
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
      text: "¡Hola! 👋 Qué gusto saludarte. Soy el asistente de **LT Talent Solutions**. ¿Cómo podemos apoyarte hoy?",
      options: [
        { label: "💼 Busco nuevas oportunidades laborales", action: "candidato" },
        { label: "🏢 Soy empresa y busco talento", action: "empresa" },
        { label: "💬 Prefiero chatear por WhatsApp", action: "whatsapp_directo" },
      ],
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const WHATSAPP_NUMBER = "5216143981235";

  // EXPONEMOS UNA FUNCIÓN GLOBAL NATIVA PARA ABRIR EL CHAT DESDE CUALQUIER PARTE
  useEffect(() => {
    (window as any).openAIChatbot = () => setIsOpen(true);
    
    const handleOpenEvent = () => setIsOpen(true);
    window.addEventListener("open-ai-chatbot", handleOpenEvent);
    
    return () => {
      delete (window as any).openAIChatbot;
      window.removeEventListener("open-ai-chatbot", handleOpenEvent);
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

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
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "bot",
            text: "Te he abierto nuestro canal directo en WhatsApp para atenderte de forma personalizada. 🚀",
          },
        ]);
      } else if (action === "ver_vacantes") {
        window.location.href = "/vacantes";
        setIsOpen(false);
      } else if (action === "ir_registro_candidato") {
        window.location.href = "/candidatos/nuevo";
      } else if (action === "ir_registro_empresa") {
        window.location.href = "/reclutador/registro";
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
          text: "Muchas gracias por compartirnos tu mensaje. Para darte una atención más ágil y cercana, te invitamos a explorar nuestras opciones:",
          options: [
            { label: "📋 Ver Vacantes", action: "ver_vacantes" },
            { label: "💬 Continuar en WhatsApp", action: "whatsapp_directo" },
          ],
        },
      ]);
    }, 700);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999999] font-sans">
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
          >
            <MessageCircle size={28} className="fill-current text-white" />
            <span className="absolute -top-1 -right-1 bg-[#C9A86A] text-[#0A1A3A] font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
              1
            </span>
            <span className="absolute right-full mr-3 bg-[#0A1A3A] text-white text-xs font-medium px-3 py-1.5 rounded-xl shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              ¿Conversamos? 💬
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-[90vw] sm:w-[380px] h-[500px] bg-white rounded-[28px] shadow-2xl border border-gray-100 flex flex-col overflow-hidden"
          >
            <div className="bg-[#0A1A3A] text-white p-4 px-5 flex items-center justify-between border-b border-[#C9A86A]/30">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-[#C9A86A] font-bold">
                  LT
                </div>
                <div>
                  <h3 className="font-bold text-xs tracking-wide text-white">
                    Asistente LT Talent Solutions
                  </h3>
                  <p className="text-[10px] text-gray-300 font-light flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span> En línea para ayudarte
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#F8FAFC]">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${msg.sender === "user" ? "bg-[#0A1A3A] text-white rounded-br-xs font-normal" : "bg-white text-gray-700 rounded-bl-xs border border-gray-100 font-normal"}`}>
                    <p className="whitespace-pre-line">{msg.text}</p>
                  </div>
                  {msg.options && (
                    <div className="mt-2.5 flex flex-col gap-1.5 w-full">
                      {msg.options.map((opt, idx) => (
                        <button 
                          key={idx} 
                          onClick={() => handleOptionClick(opt.action, opt.label)} 
                          className="w-full text-left bg-white hover:bg-[#FFF9EF] text-[#0A1A3A] border border-gray-200 hover:border-[#C9A86A] text-xs font-medium py-2 px-3 rounded-xl transition-all flex items-center justify-between group cursor-pointer shadow-xs"
                        >
                          <span>{opt.label}</span>
                          <ArrowRight size={13} className="text-[#C9A86A] group-hover:translate-x-0.5 transition-transform" />
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
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Escribe tu mensaje..."
                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#C9A86A] transition-colors"
              />
              <button 
                type="submit" 
                className="w-9 h-9 rounded-xl bg-[#0A1A3A] hover:bg-[#122b5c] text-[#C9A86A] flex items-center justify-center transition-colors cursor-pointer shadow-sm shrink-0"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}