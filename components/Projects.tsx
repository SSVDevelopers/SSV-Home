import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useSwipeable } from "react-swipeable";

type Project = {
  id: string;
  title: string;
  category: string;
  location: string;
  imageUrl: string;
  completionDate: string;
};

const projects: Project[] = [
  {
    id: "1",
    title: "Residential Villa",
    category: "Residential",
    location: "Srinivasa Colony, Madurai",
    imageUrl:
      "https://live.staticflickr.com/65535/55046095245_cc2e8f351a_c.jpg",
    completionDate: "2026-02-15",
  },
  {
    id: "2",
    title: "Independent Plot",
    category: "Residential",
    location: "Srinivas Colony, Madurai",
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

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);

  const goNext = () => {
    if (currentIndex === null) return;
    setCurrentIndex((currentIndex + 1) % projects.length);
  };

  const goPrev = () => {
    if (currentIndex === null) return;
    setCurrentIndex((currentIndex - 1 + projects.length) % projects.length);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: goNext,
    onSwipedRight: goPrev,
    trackMouse: true,
  });

  const handleClick = (i: number, e: any) => {
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();

    const scrollTop =
      window.pageYOffset + rect.top - window.innerHeight / 2 + rect.height / 2;

    window.scrollTo({
      top: scrollTop,
      behavior: "smooth",
    });

    setTimeout(() => {
      setCurrentIndex(i);
    }, 350);
  };

  return (
    <>
      {/* GRID */}
      <section className="py-14 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <div
              key={p.id}
              onClick={(e) => handleClick(i, e)}
              className="cursor-pointer overflow-hidden rounded-xl"
            >
              <img
                src={p.imageUrl}
                className="w-full h-60 sm:h-64 object-cover hover:scale-110 transition duration-500"
                alt={p.title}
              />
            </div>
          ))}
        </div>
      </section>

      {/* IMAGE VIEWER */}
      {currentIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 px-2"
          {...swipeHandlers}
        >
          {/* CLOSE */}
          <button
            onClick={() => setCurrentIndex(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-black/70 p-3 rounded-full text-white z-50"
          >
            <X size={26} />
          </button>

          {/* COUNTER */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 text-white text-xs sm:text-sm">
            {currentIndex + 1} / {projects.length}
          </div>

          {/* PREVIOUS */}
          <button
            onClick={goPrev}
            className="hidden sm:flex absolute left-6 z-50 w-14 h-14 items-center justify-center rounded-full bg-black/60 hover:bg-amber-500 text-white"
          >
            <ChevronLeft size={32} />
          </button>

          {/* NEXT */}
          <button
            onClick={goNext}
            className="hidden sm:flex absolute right-6 z-50 w-14 h-14 items-center justify-center rounded-full bg-black/60 hover:bg-amber-500 text-white"
          >
            <ChevronRight size={32} />
          </button>

          {/* IMAGE */}
          <TransformWrapper
            minScale={1}
            maxScale={4}
            centerOnInit
            centerZoomedOut
            wheel={{ step: 0.2 }}
            onZoom={(ref) => {
              if (ref.state.scale > 1) setZoomed(true);
              else setZoomed(false);
            }}
          >
            <TransformComponent>
              <img
                src={projects[currentIndex].imageUrl}
                className="max-h-[80vh] sm:max-h-[85vh] max-w-[95vw] sm:max-w-[90vw] object-contain"
                alt=""
              />
            </TransformComponent>
          </TransformWrapper>

          {/* DESCRIPTION */}
          {!zoomed && (
            <div className="absolute bottom-6 sm:bottom-20 bg-black/50 backdrop-blur-md px-5 sm:px-8 py-3 sm:py-4 rounded-xl text-white text-center max-w-[90%]">
              <h3 className="text-base sm:text-lg font-bold">
                {projects[currentIndex].title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300">
                {projects[currentIndex].location}
              </p>
              <p className="text-[11px] sm:text-xs text-gray-400">
                Completed{" "}
                {new Date(projects[currentIndex].completionDate).getFullYear()}
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
