import Hero from "./components/Hero";
import About from "./components/About";
import Process from "./components/Process";
import Vacancies from "./components/Vacancies";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function Page() {
  return (
    <>
      <Hero />
      <About />
      <Process />
      <Vacancies />   {/* ← SECCIÓN DE VACANTES */}
      <CTA />
      <Footer />
    </>
  );
}