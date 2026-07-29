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
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <Vacancies />
      </section>

      {/* ABOUT */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <About />
      </section>

      {/* PROCESS */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <Process />
      </section>

      {/* SERVICES */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <Services />
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <CTA />
      </section>

      {/* FOOTER */}
      <Footer />

    </main>
  );
}
