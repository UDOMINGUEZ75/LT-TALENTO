"use client";

import { useState, useRef } from "react";

export default function CVUpload({
  candidateId,
  onAutoFill,
}: {
  candidateId: string;
  onAutoFill?: (data: any) => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Selecciona un archivo primero.");
      return;
    }

    setUploading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("candidateId", candidateId);

    try {
      // Llamada al endpoint correcto de análisis con Azure OpenAI y rompedor de caché
      const res = await fetch(`/api/cv/analyze?t=${Date.now()}`, {
        method: "POST",
        body: formData,
        cache: "no-store",
      });

      const data = await res.json();
      setUploading(false);

      if (!res.ok) {
        setMessage(data.error || "Error al subir el CV.");
        return;
      }

      setMessage("CV subido y analizado correctamente.");

      console.log("📥 CVUpload - Respuesta recibida del servidor:", data);

      // Enviar datos extraídos al componente principal
      if (onAutoFill) {
        onAutoFill(data);
      }

      // Limpiar input
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

    } catch (error) {
      console.error("Error en la subida del CV:", error);
      setUploading(false);
      setMessage("Ocurrió un error al procesar el archivo.");
    }
  };

  return (
    <div className="bg-[#F8F4E8] p-6 rounded-lg border border-[#C9A86A]">
      <h3 className="text-xl font-bold mb-4 text-[#0A1A3A]">Subir CV</h3>

      <input
        type="file"
        ref={fileInputRef}
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        className="mb-4 block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#0A1A3A] file:text-white hover:file:bg-[#142850]"
      />

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="px-6 py-3 bg-[#C9A86A] text-[#0A1A3A] rounded-md font-semibold hover:bg-[#d8b97a] transition disabled:opacity-50"
      >
        {uploading ? "Analizando CV con IA..." : "Subir y Analizar CV"}
      </button>

      {message && (
        <p className="mt-4 text-[#0A1A3A] font-medium">{message}</p>
      )}
    </div>
  );
}