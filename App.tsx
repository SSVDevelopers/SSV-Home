import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import StatsChart from "./components/StatsChart";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { ArrowUp } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
function App() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    // Reveal Observer for Pro Entrance Animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const revealCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    };

    const observer = new IntersectionObserver(revealCallback, observerOptions);
    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((el) => observer.observe(el));

    // Back to top scroll listener
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 800);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-amber-200 selection:text-amber-900 overflow-x-hidden">
      <Navbar />
      <main>
        <div id="home" className="reveal active">
          <Hero />
        </div>
        <div id="about" className="reveal scroll-mt-20">
          <About />
        </div>
        <div id="services" className="reveal scroll-mt-20">
          <Services />
        </div>
        <div id="growth" className="reveal scroll-mt-20">
          <StatsChart />
        </div>
        <div id="projects" className="reveal scroll-mt-20">
          <Projects />
        </div>
        <div id="contact" className="reveal scroll-mt-20">
          <Contact />
        </div>
      </main>
      <Footer />

      <a
        href="https://wa.me/919150134954"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#25D366",
          color: "white",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          zIndex: 1000,
        }}
      >
        <FaWhatsapp size={30} />
      </a>

      {/* Professional Back to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed left-6 bottom-6 z-40 p-4 bg-white border border-slate-200 text-slate-900 rounded-full shadow-2xl transition-all duration-500 transform hover:bg-amber-500 hover:text-white hover:-translate-y-2 active:scale-90 ${showBackToTop ? "translate-y-0 opacity-100 scale-100" : "translate-y-20 opacity-0 scale-50 pointer-events-none"}`}
        aria-label="Back to Top"
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </div>
  );
}

export default App;
