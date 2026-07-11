export default function Footer() {
  return (
    <footer className="w-full py-10 bg-gray-100 text-center text-gray-600">
      <div className="max-w-4xl mx-auto px-6">

        <p className="text-sm">
          © {new Date().getFullYear()} LTTalento — Todos los derechos reservados.
        </p>

        <div className="mt-4 flex justify-center gap-6 text-sm font-semibold">
          <a
            href="https://wa.me/5216140000000"
            target="_blank"
            className="text-[#1A4B84] hover:underline"
          >
            WhatsApp
          </a>

          <a
            href="mailto:contacto@lttalento.com"
            className="text-[#1A4B84] hover:underline"
          >
            Correo
          </a>

          <a
            href="#"
            className="text-[#1A4B84] hover:underline"
          >
            Aviso de Privacidad
          </a>

          <a
            href="#"
            className="text-[#1A4B84] hover:underline"
          >
            Términos
          </a>
        </div>

      </div>
    </footer>
  );
}