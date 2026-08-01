export default function AvisoPrivacidad() {
  return (
    <main className="min-h-screen bg-[#0A1A3A] text-white py-16 px-6">
      <div className="max-w-4xl mx-auto space-y-6 bg-[#0f234d] p-8 sm:p-12 rounded-3xl border border-[#C9A86A]/30 shadow-2xl">
        <h1 className="text-3xl font-extrabold text-[#C9A86A] mb-4">Aviso de Privacidad</h1>
        
        <p className="text-sm text-gray-300 leading-relaxed">
          En cumplimiento con la <strong>Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP)</strong> y su Reglamento, <strong>LTTalento</strong> (en lo sucesivo "la Empresa"), con domicilio en Chihuahua, México, es responsable del tratamiento legítimo, controlado e informado de sus datos personales.
        </p>

        <h2 className="text-xl font-bold text-[#C9A86A] pt-4">1. ¿Qué datos personales recabamos?</h2>
        <p className="text-sm text-gray-300 leading-relaxed">
          Para llevar a cabo las finalidades descritas en el presente aviso, recabamos datos de identificación, contacto, historial académico, laboral, así como competencias y pretensiones salariales contenidas en su currículum vitae (CV) o perfil de registro.
        </p>

        <h2 className="text-xl font-bold text-[#C9A86A] pt-4">2. Finalidades del tratamiento de datos</h2>
        <p className="text-sm text-gray-300 leading-relaxed">
          Sus datos personales serán utilizados para las siguientes finalidades principales y necesarias para la relación jurídica de reclutamiento:
        </p>
        <ul className="list-disc pl-5 text-sm text-gray-300 space-y-2">
          <li>Evaluar su perfil profesional para vacantes de empleo activas.</li>
          <li>Vincularlo con empresas reclutadoras aliadas a nuestra bolsa de trabajo.</li>
          <li>Contactarle a través de llamadas, correo electrónico o WhatsApp respecto al estatus de sus postulaciones.</li>
        </ul>

        <h2 className="text-xl font-bold text-[#C9A86A] pt-4">3. Derechos ARCO</h2>
        <p className="text-sm text-gray-300 leading-relaxed">
          Usted tiene derecho a <strong>Acceder, Rectificar, Cancelar u Oponerse</strong> (Derechos ARCO) al tratamiento de sus datos personales. Para ejercer estos derechos, puede enviar una solicitud formal al correo electrónico: <span className="text-[#C9A86A]">reclutamiento@lttalento.com</span>.
        </p>

        <h2 className="text-xl font-bold text-[#C9A86A] pt-4">4. Modificaciones al Aviso de Privacidad</h2>
        <p className="text-sm text-gray-300 leading-relaxed">
          El presente aviso de privacidad puede sufrir modificaciones, cambios o actualizaciones derivadas de nuevos requerimientos legales o de nuestras propias necesidades operativas. Cualquier modificación estará disponible en este mismo sitio web.
        </p>
        
        <div className="pt-6 border-t border-gray-700">
          <a href="/" className="inline-block px-6 py-3 bg-[#C9A86A] text-[#0A1A3A] font-bold rounded-xl hover:bg-[#d8b97a] transition text-sm">
            Volver al inicio
          </a>
        </div>
      </div>
    </main>
  );
}