import Header from "./components/Header";
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
    <>
      <Navbar />
      <Hero />
      <Vacancies />
      <About />
      <Process />
      <Services />
      <CTA />
      <Footer />
    </>
  );
}