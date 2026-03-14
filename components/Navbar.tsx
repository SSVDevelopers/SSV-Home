import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import logoimg from "../src/assets/ssvround.png";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);

    const observerOptions = {
      root: null,
      rootMargin: "-10% 0px -80% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    const sections = [
      "home",
      "about",
      "services",
      "growth",
      "projects",
      "contact",
    ];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const projectCategories = [
    { name: "All Projects", value: "All" },
    { name: "Residential", value: "Residential" },
    { name: "Commercial", value: "Commercial" },
    { name: "Industrial", value: "Industrial" },
    { name: "Infrastructure", value: "Infrastructure" },
  ];

  const handleLinkClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setIsOpen(false);

    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCategoryClick = (e: React.MouseEvent, category: string) => {
    e.preventDefault();
    setIsOpen(false);

    const event = new CustomEvent("project-category-change", {
      detail: category,
    });

    window.dispatchEvent(event);

    const element = document.getElementById("projects");

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: "Home", href: "home" },
    { name: "About", href: "about" },
    { name: "Services", href: "services" },
    { name: "Growth", href: "growth" },
    { name: "Projects", href: "projects", isDropdown: true },
    { name: "Contact", href: "contact" },
  ];

  return (
    <nav
      className={`fixed w-full z-[100] transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur shadow-md py-2"
          : "bg-transparent py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* NAVBAR ROW */}
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* LOGO */}
          <button
            onClick={(e) => handleLinkClick(e, "home")}
            className="flex items-center gap-2"
          >
            <div
              className={`flex items-center justify-center rounded-full shadow-md transition-all ${
                scrolled ? "bg-amber-500" : "bg-slate-900"
              } h-10 w-10 sm:h-12 sm:w-12`}
            >
              <img
                src={logoimg}
                alt="Logo"
                className="h-full w-full object-contain rounded-full"
              />
            </div>

            <span className="font-black text-lg sm:text-xl text-slate-900 tracking-tight">
              DEVELOPERS
            </span>
          </button>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                <button
                  onClick={(e) =>
                    link.isDropdown
                      ? handleCategoryClick(e, "All")
                      : handleLinkClick(e, link.href)
                  }
                  className={`flex items-center gap-1 px-4 py-2 rounded-full font-bold text-sm transition ${
                    activeSection === link.href
                      ? "text-amber-600 bg-amber-50"
                      : "text-slate-600 hover:text-amber-500"
                  }`}
                >
                  {link.name}

                  {link.isDropdown && (
                    <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition" />
                  )}
                </button>

                {/* DROPDOWN */}
                {link.isDropdown && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-48 pt-3 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition">
                    <div className="bg-white rounded-xl shadow-lg border py-2">
                      {projectCategories.map((cat) => (
                        <button
                          key={cat.name}
                          onClick={(e) => handleCategoryClick(e, cat.value)}
                          className="w-full text-left px-5 py-2 text-sm font-semibold hover:bg-amber-50 hover:text-amber-600"
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <button
              onClick={(e) => handleLinkClick(e, "contact")}
              className="ml-4 bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-amber-500 transition"
            >
              REQUEST QUOTE
            </button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg bg-slate-100"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`lg:hidden fixed inset-0 bg-white transition-transform duration-500 ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex flex-col h-full pt-24 px-6">
          {navLinks.map((link) => (
            <div key={link.name}>
              <button
                onClick={(e) => handleLinkClick(e, link.href)}
                className="w-full text-left py-4 text-lg font-bold text-slate-900 border-b"
              >
                {link.name}
              </button>

              {link.isDropdown && mobileProjectsOpen && (
                <div className="pl-4">
                  {projectCategories.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={(e) => handleCategoryClick(e, cat.value)}
                      className="block w-full text-left py-3 text-sm text-slate-600"
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="mt-auto pb-10">
            <button
              onClick={(e) => handleLinkClick(e, "contact")}
              className="w-full bg-amber-500 text-white py-4 rounded-xl font-bold text-lg"
            >
              GET FREE QUOTE
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
