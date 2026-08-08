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
      text: "¡Hola! 🌟 Bienvenido a **LT Talent Solutions**. Soy tu asesor virtual inteligente. ¿En qué te puedo ayudar hoy?",
      options: [
        { label: "🏢 Soy Empresa (Busco talento)", action: "flujo_empresa" },
        { label: "👥 Busco Empleo / Vacantes", action: "flujo_candidato" },
        { label: "💼 Consultar Servicios", action: "flujo_servicios" },
      ],
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  // NUEVO ESTADO: Para saber si estamos en modo entrevista
  const [isInterviewMode, setIsInterviewMode] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const WHATSAPP_NUMBER = "5216143981235";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Modificamos esta función para aceptar un "hiddenPrompt" secreto para la IA
  const sendToGeminiAPI = async (displayPrompt: string, hiddenPrompt?: string) => {
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Si hay un prompt oculto, se lo mandamos a la API, si no, mandamos el texto normal
        body: JSON.stringify({ prompt: hiddenPrompt || displayPrompt }),
      });

      const data = await res.json();
      const botMsg: Message = {
        id: Date.now().toString(),
        sender: "bot",
        text: data.text || "Conversemos directamente por WhatsApp para brindarte una solución a la medida.",
        options: [
          { label: "📝 Crear mi Cuenta ahora", action: "ir_candidato" },
          { label: "📋 Ver todas las vacantes", action: "ver_vacantes" },
        ],
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: "bot",
          text: "Estamos teniendo un alto volumen de solicitudes. Por favor, regístrate en la plataforma para guardar tu perfil.",
          options: [{ label: "📝 Registrar CV", action: "ir_candidato" }],
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleOptionClick = (action: string, label: string) => {
    const userMsg: Message = { id: Date.now().toString(), sender: "user", text: label };
    setMessages((prev) => [...prev, userMsg]);

    if (action === "flujo_empresa") {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: "Excelente. Para brindarte la atención adecuada, ¿eres una empresa nueva o ya tienes cuenta?",
          options: [
            { label: "🆕 Soy Nueva Empresa", action: "ir_registro" },
            { label: "🔑 Ya tengo cuenta", action: "ir_login_empresa" },
          ],
        },
      ]);
    } 
    else if (action === "flujo_candidato") {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: "¡Qué gran decisión! 🚀 Nuestra plataforma es 100% gratuita para ti. ¿Qué prefieres hacer?",
          options: [
            { label: "🤖 Hacer Micro-Entrevista con IA", action: "micro_entrevista" },
            { label: "📋 Explorar Vacantes", action: "ver_vacantes" },
            { label: "🔑 Ya estoy registrado", action: "ir_login_candidato" },
          ],
        },
      ]);
    } 
    // NUEVO FLUJO: INICIAR ENTREVISTA
    else if (action === "micro_entrevista") {
      setIsInterviewMode(true);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: "¡Perfecto! 🎙️ Iniciamos. Escríbeme aquí abajo en un solo mensaje: **¿Qué puesto estás buscando y cuál consideras que es tu mayor logro o habilidad principal?** (Analizaré tu perfil al instante).",
        },
      ]);
    }
    else if (action === "flujo_servicios") {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: "Nuestro equipo está listo para diseñar una estrategia a tu medida. ¿Gustas contactar a un asesor humano?",
          options: [
            { label: "💬 Contactar Ventas por WhatsApp", action: "whatsapp_directo" },
          ],
        },
      ]);
    } 
    else if (action === "whatsapp_directo") {
      const textWp = encodeURIComponent("Hola LT Talent Solutions, me interesa conocer más sobre sus servicios.");
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${textWp}`, "_blank");
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: "¡Excelente! Te he conectado con nuestro canal directo de WhatsApp. 🚀",
        },
      ]);
    } 
    else if (action === "ver_vacantes") {
      window.location.href = "/#vacantes";
      setIsOpen(false);
    }
    else if (action === "ir_registro") {
      window.location.href = "/reclutador/registro";
    } 
    else if (action === "ir_login_empresa") {
      window.location.href = "/reclutador/login";
    } 
    else if (action === "ir_candidato") {
      window.location.href = "/candidatos/nuevo";
    } 
    else if (action === "ir_login_candidato") {
      window.location.href = "/candidate/login";
    } 
    else {
      setIsTyping(true);
      sendToGeminiAPI(label);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userText = inputVal.trim();
    const lowerText = userText.toLowerCase();
    
    const userMsg: Message = { id: Date.now().toString(), sender: "user", text: userText };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    
    setIsTyping(true);

    setTimeout(() => {
      // 1. SI ESTAMOS EN MODO ENTREVISTA
      if (isInterviewMode) {
        setIsInterviewMode(false); // Apagamos el modo entrevista para el siguiente mensaje
        // Creamos el prompt secreto para volver a Gemini un reclutador experto
        const hiddenInterviewPrompt = `Actúa como reclutador experto de la agencia LT Talent Solutions. El candidato está respondiendo a una micro-entrevista y dijo esto: "${userText}". Evalúa su perfil en 2 o 3 oraciones de forma muy entusiasta y profesional. Felicítalo por su perfil y luego invítalo efusivamente a crear su cuenta en la plataforma para poder postularlo a las vacantes que encajan con su experiencia.`;
        
        sendToGeminiAPI(userText, hiddenInterviewPrompt);
        return;
      }

      // 2. DETECCIÓN AUTOMÁTICA (Si el usuario escribe libremente sin tocar botones)
      if (/(trabajo|empleo|vacante|candidato|postular|cv|currículum|curriculum)/i.test(lowerText)) {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            sender: "bot",
            text: "Detecto que buscas oportunidades laborales. 🚀 ¿Te gustaría hacer una evaluación rápida o explorar vacantes?",
            options: [
              { label: "🤖 Iniciar Micro-Entrevista", action: "micro_entrevista" },
              { label: "📋 Explorar Vacantes", action: "ver_vacantes" },
            ],
          },
        ]);
      } 
      else if (/(empresa|contratar|reclutar|personal|servicio|costo|precio|cotización|cotizacion|paquete)/i.test(lowerText)) {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            sender: "bot",
            text: "Entendido. Si buscas integrar talento a tu equipo, por favor indícame tu situación actual:",
            options: [
              { label: "🆕 Soy Nueva Empresa", action: "ir_registro" },
              { label: "💬 Hablar con Ventas", action: "whatsapp_directo" },
            ],
          },
        ]);
      } 
      // 3. IA NORMAL
      else {
        sendToGeminiAPI(userText);
      }
    }, 600);
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
            <MessageCircle size={30} className="fill-current text-white" />
            <span className="absolute -top-1 -right-1 bg-[#C9A86A] text-[#0A1A3A] font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
              1
            </span>
            <span className="absolute right-full mr-3 bg-[#0A1A3A] text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Asesor Virtual • ¿En qué te ayudo? 💬
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 250, damping: 22 }}
            className="w-[90vw] sm:w-[400px] h-[560px] bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
          >
            <div className="bg-[#0A1A3A] text-white p-4 px-5 flex items-center justify-between border-b border-[#C9A86A]/40">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center overflow-hidden shadow-md">
                    <img src="/images/LTTALENTO.png" alt="LT Talento Logo" className="w-full h-full object-contain p-1" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#0A1A3A] rounded-full" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm tracking-tight flex items-center gap-1.5">
                    LT Asesor Virtual <Sparkles size={14} className="text-[#C9A86A]" />
                  </h3>
                  <p className="text-[11px] text-gray-300 font-light">
                    Construyendo el futuro • Ventas y Reclutamiento
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50/60">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                  <div className={`max-w-[88%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${msg.sender === "user" ? "bg-[#0A1A3A] text-white rounded-br-none font-medium" : "bg-white text-gray-800 rounded-bl-none border border-gray-100 font-normal"}`}>
                    <p className="whitespace-pre-line">{msg.text}</p>
                  </div>
                  {msg.options && (
                    <div className="mt-3 flex flex-col gap-2 w-full pl-1">
                      {msg.options.map((opt, idx) => (
                        <button key={idx} onClick={() => handleOptionClick(opt.action, opt.label)} className="w-full text-left bg-white hover:bg-[#FFF9EF] text-[#0A1A3A] border border-[#C9A86A]/40 hover:border-[#C9A86A] text-xs font-bold py-2.5 px-3.5 rounded-xl shadow-xs transition-all flex items-center justify-between group cursor-pointer">
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
                  <span>Analizando tu perfil...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-200 flex items-center gap-2">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Escribe aquí tu respuesta o duda..."
                className="flex-1 bg-gray-100 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-[#0A1A3A] placeholder-gray-400 focus:outline-none focus:border-[#C9A86A] transition-colors"
              />
              <button type="submit" className="w-10 h-10 rounded-xl bg-[#C9A86A] hover:bg-[#b89555] text-[#0A1A3A] flex items-center justify-center transition-colors cursor-pointer shadow-md shrink-0">
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}