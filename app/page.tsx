// app/page.tsx

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Vacancies from "./components/Vacancies";
import About from "./components/About";
import Process from "./components/Process";
import Services from "./components/Services";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function Page() {
  return (
    <main className="min-h-screen text-slate-50 bg-[#0A1A3A]">

      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 pt-28 pb-16">
        <Hero />
      </section>

      {/* VACANTES */}
      <section id="vacantes" className="max-w-7xl mx-auto px-6 pb-16">
        <Vacancies />
      </section>

      {/* ABOUT */}
      <section id="nosotros" className="max-w-7xl mx-auto px-6 py-12">
        <About />
      </section>

      {/* PROCESS */}
      <section id="proceso" className="max-w-7xl mx-auto px-6 py-12">
        <Process />
      </section>

      {/* SERVICES */}
      <section id="servicios" className="max-w-7xl mx-auto px-6 py-12">
        <Services />
      </section>

      {/* CTA / CONTACTO */}
      <section id="contacto" className="max-w-7xl mx-auto px-6 py-12">
        <CTA />
      </section>

      {/* FOOTER */}
      <Footer />

    </main>
  );
}