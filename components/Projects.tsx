import React, { useState, useMemo, useEffect } from "react";
import { Project } from "../types";
import { SlidersHorizontal } from "lucide-react";

const projects: Project[] = [
  {
    id: "1",
    title: "Residential Villa",
    category: "Residential",
    location: "Srinivasa Colony, Madurai",
    imageUrl:
      "https://live.staticflickr.com/65535/55046095245_cc2e8f351a_c.jpg",
    completionDate: "2026-2-15",
  },
  {
    id: "2",
    title: "Independent Plot",
    category: "Residential",
    location: "Srinivas colony, Madurai",
    imageUrl:
      "https://live.staticflickr.com/65535/55044873892_7216608a33_c.jpg",
    completionDate: "2024-02-10",
  },
  {
    id: "3",
    title: "3BHK Plot",
    category: "Residential",
    location: "Anna Park",
    imageUrl:
      "https://live.staticflickr.com/65535/55044877052_3fd5577757_c.jpg",
    completionDate: "2023-08-20",
  },
  {
    id: "4",
    title: "Luxury Plot",
    category: "Residential",
    location: "North Street",
    imageUrl:
      "https://live.staticflickr.com/65535/55046113450_74ed984d73_c.jpg",
    completionDate: "2022-12-05",
  },
  {
    id: "5",
    title: "Single Plot",
    category: "Residential",
    location: "Suburban Street",
    imageUrl:
      "https://live.staticflickr.com/65535/55045952748_39aa65787b_c.jpg",
    completionDate: "2024-01-30",
  },
  {
    id: "6",
    title: "Luxury Villa",
    category: "Residential",
    location: "City Center",
    imageUrl:
      "https://live.staticflickr.com/65535/55046040509_95768cac96_c.jpg",
    completionDate: "2023-05-12",
  },
];

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    const handleCategoryChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        setActiveCategory(customEvent.detail);
      }
    };

    window.addEventListener("project-category-change", handleCategoryChange);

    return () => {
      window.removeEventListener(
        "project-category-change",
        handleCategoryChange,
      );
    };
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const categories = [
    "All",
    ...Array.from(new Set(projects.map((p) => p.category))),
  ];

  const filteredAndSortedProjects = useMemo(() => {
    let result = [...projects];

    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.completionDate).getTime() -
            new Date(a.completionDate).getTime()
          );
        case "oldest":
          return (
            new Date(a.completionDate).getTime() -
            new Date(b.completionDate).getTime()
          );
        case "az":
          return a.title.localeCompare(b.title);
        case "za":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    return result;
  }, [activeCategory, sortBy]);

  return (
    <section
      id="projects"
      className="py-14 sm:py-16 lg:py-20 bg-slate-50 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              Featured Projects
            </h2>

            <p className="text-slate-600 text-sm sm:text-base">
              Explore our portfolio of landmarks. Each project represents our
              dedication to structural integrity and aesthetic beauty.
            </p>
          </div>

          <button
            onClick={scrollToContact}
            className="px-5 py-3 rounded-lg border-2 border-amber-500 text-amber-600 font-bold text-xs sm:text-sm uppercase tracking-widest hover:bg-amber-500 hover:text-white transition-all flex items-center gap-2 justify-center md:justify-start"
          >
            Start a Project →
          </button>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-5 mb-8">
          {/* Category Buttons */}
          <div className="flex overflow-x-auto gap-2 w-full lg:w-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm whitespace-nowrap transition ${
                  activeCategory === category
                    ? "bg-amber-500 text-white"
                    : "bg-white border border-slate-200 text-slate-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2 w-full lg:w-auto">
            <span className="text-slate-500 text-sm flex items-center gap-1">
              <SlidersHorizontal className="w-4 h-4" />
              Sort
            </span>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-md border border-slate-200 text-sm w-full lg:w-auto"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="az">A-Z</option>
              <option value="za">Z-A</option>
            </select>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-xl overflow-hidden shadow-md bg-white"
            >
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-56 sm:h-60 lg:h-64 object-cover group-hover:scale-105 transition"
              />

              <div className="p-4">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-amber-500 font-bold uppercase">
                    {project.category}
                  </span>

                  <span className="text-slate-400">
                    {new Date(project.completionDate).getFullYear()}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900">
                  {project.title}
                </h3>

                <p className="text-sm text-slate-500">{project.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
