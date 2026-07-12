"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function PersonalDataPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zone, setZone] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const STATES = ["Chihuahua", "Sonora", "Coahuila", "Nuevo León", "Durango"];
  const CITIES = ["Chihuahua", "Ciudad Juárez", "Delicias", "Cuauhtémoc", "Parral"];
  const ZONES = ["Centro", "Campestre", "San Felipe", "Mirador", "Cumbres", "Riberas"];

  const [stateSuggestions, setStateSuggestions] = useState<string[]>([]);
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
  const [zoneSuggestions, setZoneSuggestions] = useState<string[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch(`/api/candidate/personal?userId=${userId}`);
        const data = await res.json();

        if (data.ok && data.personal) {
          setName(data.personal.name || "");
          setEmail(data.personal.email || "");
          setState(data.personal.state || "");
          setCity(data.personal.city || "");
          setZone(data.personal.zone || "");
          setAddress(data.personal.address || "");
          setPhone(data.personal.phone || "");
        }
      } catch (error) {
        console.error("Error cargando datos personales:", error);
      }
      setLoading(false);
    }

    if (userId) loadData();
  }, [userId]);

  function handleStateChange(value: string) {
    setState(value);
    setStateSuggestions(
      STATES.filter((s) => s.toLowerCase().includes(value.toLowerCase())).slice(0, 5)
    );
  }

  function handleCityChange(value: string) {
    setCity(value);
    setCitySuggestions(
      CITIES.filter((c) => c.toLowerCase().includes(value.toLowerCase())).slice(0, 5)
    );
  }

  function handleZoneChange(value: string) {
    setZone(value);
    setZoneSuggestions(
      ZONES.filter((z) => z.toLowerCase().includes(value.toLowerCase())).slice(0, 5)
    );
  }

  async function handleSave() {
    try {
      const res = await fetch("/api/candidate/personal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          name,
          email,
          state,
          city,
          zone,
          address,
          phone,
        }),
      });

      const data = await res.json();

      if (data.ok) {
        // SIGUIENTE SECCIÓN DEL MENÚ
        router.push(`/candidate/evaluation/experience?userId=${userId}`);
      }
    } catch (error) {
      console.error("Error guardando datos personales:", error);
    }
  }

  function salir() {
    router.push(`/candidate/evaluation/menu?userId=${userId}`);
  }

  if (loading) return <p className="p-6">Cargando datos...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold mb-4">Datos personales</h1>

      <div>
        <label className="block mb-1">Nombre completo</label>
        <input
          className="border p-2 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-1">Correo electrónico</label>
        <input
          className="border p-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-1">Estado</label>
        <input
          className="border p-2 w-full"
          value={state}
          onChange={(e) => handleStateChange(e.target.value)}
        />
        {stateSuggestions.length > 0 && (
          <ul className="border mt-1 bg-white">
            {stateSuggestions.map((s) => (
              <li
                key={s}
                className="px-2 py-1 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  setState(s);
                  setStateSuggestions([]);
                }}
              >
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <label className="block mb-1">Ciudad</label>
        <input
          className="border p-2 w-full"
          value={city}
          onChange={(e) => handleCityChange(e.target.value)}
        />
        {citySuggestions.length > 0 && (
          <ul className="border mt-1 bg-white">
            {citySuggestions.map((c) => (
              <li
                key={c}
                className="px-2 py-1 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  setCity(c);
                  setCitySuggestions([]);
                }}
              >
                {c}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <label className="block mb-1">Zona de la ciudad</label>
        <input
          className="border p-2 w-full"
          value={zone}
          onChange={(e) => handleZoneChange(e.target.value)}
        />
        {zoneSuggestions.length > 0 && (
          <ul className="border mt-1 bg-white">
            {zoneSuggestions.map((z) => (
              <li
                key={z}
                className="px-2 py-1 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  setZone(z);
                  setZoneSuggestions([]);
                }}
              >
                {z}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <label className="block mb-1">Dirección (opcional)</label>
        <input
          className="border p-2 w-full"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-1">Teléfono</label>
        <input
          className="border p-2 w-full"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={salir}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Salir
        </button>

        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Guardar y continuar
        </button>
      </div>
    </div>
  );
}
