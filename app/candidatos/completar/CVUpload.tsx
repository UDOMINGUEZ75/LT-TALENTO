"use client";

import { useState } from "react";

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

    // 🔥 RUTA CORRECTA
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
      cache: "no-store",
    });

    const data = await res.json();

    setUploading(false);

    if (!res.ok) {
      setMessage("Error al subir el CV.");
      return;
    }

    setMessage("CV subido correctamente.");

    // Tu API devuelve: { ok, extracted, translated }
    if (data.extracted && onAutoFill) {
      onAutoFill(data.extracted);
    }
  };

  return (
    <div className="bg-[#F8F4E8] p-6 rounded-lg border border-[#C9A86A]">
      <h3 className="text-xl font-bold mb-4 text-[#0A1A3A]">Subir CV</h3>

      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        className="mb-4"
      />

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="px-6 py-3 bg-[#C9A86A] text-[#0A1A3A] rounded-md font-semibold hover:bg-[#d8b97a]"
      >
        {uploading ? "Subiendo..." : "Subir CV"}
      </button>

      {message && (
        <p className="mt-4 text-[#0A1A3A] font-medium">{message}</p>
      )}
    </div>
  );
}
