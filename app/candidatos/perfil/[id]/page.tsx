"use client";

import { useState, useEffect } from "react";
import CVUpload from "@/app/candidatos/completar/CVUpload";

type Candidate = {
  id: string;
  name: string;
  email: string;
  // agrega aquí los demás campos que devuelve tu API
};

export default function PerfilCandidato({ params }: { params: { id: string } }) {
  const { id } = params;

  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [form, setForm] = useState({
    state: "",
    city: "",
    zone: "",
    address: "",
    phone: "",
    company: "",
    position: "",
    years: "",
    description: "",
    school: "",
    degree: "",
    graduationYear: "",
    schedule: "",
    travel: false,
    relocate: false,
    area: "",
    salary: "",
    modality: "",
  });

  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/get-candidate?id=${id}`);
      const data = await res.json();

      if (!data.candidate) {
        alert("Candidato no encontrado");
        return;
      }

      const c = data.candidate;
      setCandidate(c);

      const p = c.personal || {};
      const e = c.experience || {};
      const ed = c.education || {};
      const a = c.availability || {};
      const pr = c.preferences || {};

      setForm({
        state: p.state || "",
        city: p.city || "",
        zone: p.zone || "",
        address: p.address || "",
        phone: p.phone || "",

        company: e.company || "",
        position: e.position || "",
        years: e.years?.toString() || "",
        description: e.description || "",

        school: ed.school || "",
        degree: ed.degree || "",
        graduationYear: ed.graduationYear?.toString() || "",

        schedule: a.schedule || "",
        travel: a.travel || false,
        relocate: a.relocate || false,

        area: pr.area || "",
        salary: pr.salary?.toString() || "",
        modality: pr.modality || "",
      });

      setLoading(false);
    }

    load();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;
    const { name, value, type } = target;

    const newValue =
      type === "checkbox" && target instanceof HTMLInputElement
        ? target.checked
        : value;

    setForm({ ...form, [name]: newValue });
  };

  const handleSave = async () => {
    const res = await fetch(`/api/candidate/update/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      alert("Error al guardar");
      return;
    }

    setSaved(true);
  };

  if (loading) return <p className="text-white p-10">Cargando...</p>;

  return (
    <section className="min-h-screen bg-[#0A1A3A] text-white pt-20 pb-24 px-6">
      <div className="max-w-4xl mx-auto bg-white text-[#0A1A3A] p-10 rounded-xl shadow-xl">

        <h1 className="text-3xl font-bold text-center text-[#C9A86A] mb-10">
          Perfil de {candidate?.name}
        </h1>

        {!saved && (
          <>
            <CVUpload candidateId={id} />

            <div className="flex flex-col gap-10 mt-10">

              <div>
                <h2 className="text-xl font-bold mb-4">Información Personal</h2>
                <div className="grid grid-cols-2 gap-4">
                  <input name="state" value={form.state} onChange={handleChange} className="border p-3 rounded" placeholder="Estado" />
                  <input name="city" value={form.city} onChange={handleChange} className="border p-3 rounded" placeholder="Ciudad" />
                  <input name="zone" value={form.zone} onChange={handleChange} className="border p-3 rounded" placeholder="Zona" />
                  <input name="address" value={form.address} onChange={handleChange} className="border p-3 rounded" placeholder="Dirección" />
                  <input name="phone" value={form.phone} onChange={handleChange} className="border p-3 rounded" placeholder="Teléfono" />
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-4">Experiencia Laboral</h2>
                <div className="grid grid-cols-2 gap-4">
                  <input name="company" value={form.company} onChange={handleChange} className="border p-3 rounded" placeholder="Empresa" />
                  <input name="position" value={form.position} onChange={handleChange} className="border p-3 rounded" placeholder="Puesto" />
                  <input name="years" value={form.years} onChange={handleChange} className="border p-3 rounded" placeholder="Años" />
                  <textarea name="description" value={form.description} onChange={handleChange} className="border p-3 rounded col-span-2" rows={4} placeholder="Descripción" />
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-4">Educación</h2>
                <div className="grid grid-cols-2 gap-4">
                  <input name="school" value={form.school} onChange={handleChange} className="border p-3 rounded" placeholder="Escuela" />
                  <input name="degree" value={form.degree} onChange={handleChange} className="border p-3 rounded" placeholder="Grado" />
                  <input name="graduationYear" value={form.graduationYear} onChange={handleChange} className="border p-3 rounded" placeholder="Año de graduación" />
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-4">Disponibilidad</h2>
                <div className="grid grid-cols-2 gap-4">
                  <input name="schedule" value={form.schedule} onChange={handleChange} className="border p-3 rounded" placeholder="Horario" />
                  <label className="flex items-center gap-2">
                    <input type="checkbox" name="travel" checked={form.travel} onChange={handleChange} />
                    Disponibilidad para viajar
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" name="relocate" checked={form.relocate} onChange={handleChange} />
                    Disponibilidad para reubicarse
                  </label>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-4">Preferencias</h2>
                <div className="grid grid-cols-2 gap-4">
                  <input name="area" value={form.area} onChange={handleChange} className="border p-3 rounded" placeholder="Área deseada" />
                  <input name="salary" value={form.salary} onChange={handleChange} className="border p-3 rounded" placeholder="Salario deseado" />
                  <input name="modality" value={form.modality} onChange={handleChange} className="border p-3 rounded" placeholder="Modalidad" />
                </div>
              </div>

              <button
                onClick={handleSave}
                className="w-full py-3 bg-[#C9A86A] text-[#0A1A3A] font-bold rounded-md hover:bg-[#d8b97a]"
              >
                Guardar cambios
              </button>
            </div>
          </>
        )}

        {saved && (
          <div className="mt-10 p-6 bg-[#FFF9EF] border border-[#C9A86A] rounded-lg text-[#0A1A3A]">
            <h3 className="text-xl font-bold mb-4">Tu perfil ha sido actualizado</h3>
            <p className="mb-4">Puedes volver cuando quieras a modificar tu información.</p>

            <div className="flex gap-4">
              <a href="/vacantes" className="px-6 py-3 bg-[#0A1A3A] text-white rounded-md font-semibold hover:bg-[#142850]">
                Buscar vacantes
              </a>
              <a href="/" className="px-6 py-3 bg-[#C9A86A] text-[#0A1A3A] rounded-md font-semibold hover:bg-[#d8b97a]">
                Salir
              </a>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
