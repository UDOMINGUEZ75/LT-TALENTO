"use client";

export default function UploadCVButton() {
  function handleSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    console.log("Archivo seleccionado:", file?.name);
  }

  return (
    <div style={{ padding: 20 }}>
      <label
        style={{
          display: "inline-block",
          padding: "10px 20px",
          background: "#4f46e5",
          color: "white",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        Cargar currículum
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          style={{ display: "none" }}
          onChange={handleSelect}
        />
      </label>
    </div>
  );
}