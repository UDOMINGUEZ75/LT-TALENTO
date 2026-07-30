export default function Footer() {
  return (
    <footer className="w-full py-12 bg-[#0A1A3A] text-center /40">
      <div className="max-w-4xl mx-auto px-6">

        {/* Texto principal */}
        <p className="text-lg text-[#C9A86A] font-semibold">
          © {new Date().getFullYear()} LTTalento — Todos los derechos reservados.
        </p>

        {/* Links */}
        <div className="mt-6 flex justify-center gap-10 text-lg font-medium">
          <a
            href="https://wa.me/5216140000000"
            target="_blank"
            className="text-[#C9A86A] hover:text-white transition"
          >
            WhatsApp
          </a>

          <a
            href="mailto:contacto@lttalento.com"
            className="text-[#C9A86A] hover:text-white transition"
          >
            Correo
          </a>

          <a
            href="#"
            className="text-[#C9A86A] hover:text-white transition"
          >
            Aviso de Privacidad
          </a>

          <a
            href="#"
            className="text-[#C9A86A] hover:text-white transition"
          >
            Términos
          </a>
        </div>

      </div>
    </footer>
  );
}
