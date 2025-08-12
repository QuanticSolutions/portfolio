"use client";
import React, { useState, useMemo, useEffect } from "react";
import { ChevronLeft, ChevronRight, Globe } from "lucide-react";

const useResponsiveSlides = () => {
  const [visiblePerPage, setVisiblePerPage] = useState(3);

  useEffect(() => {
    const updateSlides = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisiblePerPage(1); // Mobile
      } else if (width >= 640 && width < 1024) {
        setVisiblePerPage(2); // Tablet
      } else {
        setVisiblePerPage(3); // Desktop
      }
    };

    updateSlides(); // run on mount
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  return visiblePerPage;
};

export default function ProjectsCarousel({
  projects = [],
  subcategories = [], // externally provided list of subcategories to display
  category = null,
  onProjectClick = () => {},
  showDetails = true,
}) {
  // Pre-filter by category (if set)
  const initialFiltered = useMemo(
    () =>
      category ? projects.filter((p) => p.category === category) : projects,
    [projects, category]
  );

  const visiblePerPage = useResponsiveSlides();

  // selectedSubcategory is controlled here (clicking pills sets it)
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [filteredProjects, setFilteredProjects] = useState(initialFiltered);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // recompute filteredProjects whenever initialFiltered or selectedSubcategory changes
    const next = initialFiltered.filter((p) =>
      selectedSubcategory ? p.subcategory === selectedSubcategory : true
    );
    setFilteredProjects(next);
    setCurrentSlide(0);
  }, [initialFiltered, selectedSubcategory]);

  const maxSlide = Math.max(0, filteredProjects.length - visiblePerPage);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => {
      const next = prev + visiblePerPage;
      return next > maxSlide ? maxSlide : next;
    });
    setTimeout(() => setIsTransitioning(false), 700);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => {
      const next = prev - visiblePerPage;
      return next < 0 ? 0 : next;
    });
    setTimeout(() => setIsTransitioning(false), 700);
  };

  // wheel handler like your original
  useEffect(() => {
    const handleWheel = (e) => {
      if (isTransitioning) return;
      e.preventDefault();
      if (e.deltaY > 0) {
        if (currentSlide < maxSlide) nextSlide();
      } else {
        if (currentSlide > 0) prevSlide();
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      document.body.style.overflow = "auto";
    };
  }, [isTransitioning, currentSlide, maxSlide]);

  const getVisible = () => {
    const out = [];
    for (let i = 0; i < visiblePerPage; i++) {
      const idx = currentSlide + i;
      if (idx < filteredProjects.length) out.push(filteredProjects[idx]);
    }
    return out;
  };

  // tiny svg pattern stub (copy your previous SVGPattern if needed)
  const SVGPattern = ({ pattern, className = "", color = "emerald-400" }) => {
    const colorClass = `text-${color}`;
    if (!pattern) return null;
    return (
      <div className={`absolute inset-0 opacity-15 ${className}`}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 400 600"
          className={colorClass}
        >
          <path
            d="M0,150 Q100,100 200,150 T400,150"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            opacity="0.25"
          />
        </svg>
      </div>
    );
  };

  // Dynamic width class based on visible slides
  const getSlideWidth = () => {
    if (visiblePerPage === 1) return "w-full min-w-full";
    if (visiblePerPage === 2) return "w-1/2 min-w-1/2";
    return "w-1/3 min-w-1/3";
  };

  return (
    <div className="relative">
      <style jsx>{`
        .slide-left {
          animation: slideInLeft 0.9s ease-out both;
        }
        .slide-right {
          animation: slideInRight 0.9s ease-out both;
        }
        .slide-center {
          animation: slideInCenter 0.9s ease-out both;
        }
        @keyframes slideInLeft {
          0% {
            transform: translateX(-60px) scale(0.98);
            opacity: 0;
          }
          100% {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
        }
        @keyframes slideInRight {
          0% {
            transform: translateX(60px) scale(0.98);
            opacity: 0;
          }
          100% {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
        }
        @keyframes slideInCenter {
          0% {
            transform: translateY(18px) scale(0.98);
            opacity: 0;
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* main carousel area */}
      <div className="h-[100vh] w-full relative overflow-hidden">
        {/* arrows - responsive positioning */}
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0 || isTransitioning}
          className={`absolute left-2 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition ${
            currentSlide === 0
              ? "opacity-40 cursor-not-allowed"
              : "bg-black/40 hover:bg-emerald-400/10"
          }`}
          aria-label="Previous"
        >
          <ChevronLeft size={18} className="text-emerald-300 sm:w-5 sm:h-5" />
        </button>

        <button
          onClick={nextSlide}
          disabled={currentSlide >= maxSlide || isTransitioning}
          className={`absolute right-2 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition ${
            currentSlide >= maxSlide
              ? "opacity-40 cursor-not-allowed"
              : "bg-black/40 hover:bg-emerald-400/10"
          }`}
          aria-label="Next"
        >
          <ChevronRight size={18} className="text-emerald-300 sm:w-5 sm:h-5" />
        </button>

        <div className="flex h-full">
          {getVisible().map((project, i) => {
            const animationClass =
              i === 0
                ? "slide-left"
                : i === visiblePerPage - 1
                ? "slide-right"
                : "slide-center";

            return (
              <div
                key={project.id}
                className={`${getSlideWidth()} h-full relative bg-gradient-to-br ${
                  project.bgGradient ?? "from-teal-900 via-black to-teal-900"
                }
        flex flex-col justify-between p-3 sm:p-6 lg:p-8 overflow-hidden group cursor-pointer transition-all duration-700 ${animationClass}`}
                style={{
                  boxShadow: project.isCenter
                    ? "inset 0 0 100px rgba(0,0,0,0.3)"
                    : "none",
                }}
                onClick={() => onProjectClick(project)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") onProjectClick(project);
                }}
              >
                {/* ✅ Always show background image */}
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-500
            ${
              showDetails
                ? "opacity-100 scale-100 group-hover:opacity-0 group-hover:scale-105"
                : "opacity-100"
            }
          `}
                  />
                )}

                {/* ✅ Optional overlay when showDetails is false */}
                {!showDetails && (
                  <div className="absolute inset-0 bg-black/30" />
                )}

                {/* ✅ Mobile-optimized content layout */}
                {showDetails && (
                  <>
                    <SVGPattern
                      pattern={project.svgPattern}
                      color={project.accentColor ?? "emerald-400"}
                      className="pointer-events-none"
                    />

                    {/* Mobile: Always visible content, Desktop: hover to show */}
                    <div className={`relative z-20 flex-1 flex flex-col justify-center transition-all duration-500 ${
                      // On mobile (sm:), content is always visible. On larger screens, show on hover
                      visiblePerPage === 1 
                        ? "opacity-100 scale-100" 
                        : "opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100"
                    }`}>
                      
                      {/* Project counter - smaller on mobile */}
                      <div
                        className={`text-xs font-mono ${
                          project.textColor ?? "text-emerald-400"
                        } opacity-60 mb-1 sm:mb-3 tracking-wider`}
                      >
                        {String(project.id).padStart(3, "0")} /{" "}
                        {String(projects.length).padStart(3, "0")}
                      </div>

                      {/* Title - responsive sizing with better mobile scaling */}
                      <h2
                        className={`text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black ${
                          project.textColor ?? "text-emerald-400"
                        } leading-tight sm:leading-none mb-1 sm:mb-2 break-words`}
                      >
                        {project.title}
                      </h2>

                      {/* Subtitle - better mobile sizing */}
                      <div
                        className={`text-sm sm:text-base lg:text-lg ${
                          project.textColor ?? "text-emerald-300"
                        } opacity-70 mb-2 sm:mb-3 font-light leading-relaxed`}
                      >
                        {project.subtitle}
                      </div>

                      {/* Category - compact on mobile */}
                      <div
                        className={`text-xs font-mono ${
                          project.textColor ?? "text-emerald-300"
                        } opacity-50 uppercase tracking-widest sm:tracking-[3px] mb-3 sm:mb-6 break-words`}
                      >
                        {project.category}
                        {project.subcategory ? (
                          <>
                            <br className="sm:hidden" />
                            <span className="hidden sm:inline"> / </span>
                            <span className="sm:inline">{project.subcategory}</span>
                          </>
                        ) : ""}
                      </div>

                      {/* Accent line */}
                      <div
                        className={`w-8 sm:w-16 h-0.5 bg-gradient-to-r from-${
                          project.accentColor ?? "emerald-400"
                        } to-transparent`}
                      />
                    </div>

                    {/* Mobile: Bottom overlay with key info for quick scanning */}
                    {visiblePerPage === 1 && (
                      <div className="sm:hidden absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-3">
                        <div className={`text-sm font-semibold ${project.textColor ?? "text-emerald-400"} mb-1`}>
                          {project.title}
                        </div>
                        <div className={`text-xs ${project.textColor ?? "text-emerald-300"} opacity-70`}>
                          {project.category}{project.subcategory ? ` • ${project.subcategory}` : ""}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile: Swipe indicator */}
        {visiblePerPage === 1 && (
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex items-center gap-2 text-white/60 text-xs">
            <ChevronLeft size={14} />
            <span>Swipe or use arrows</span>
            <ChevronRight size={14} />
          </div>
        )}
      </div>

      {/* =======================
          Floating bottom dock with subcategory tabs - mobile responsive
          ======================= */}
      <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 max-w-[calc(100vw-2rem)]">
        <div className="flex items-center justify-center gap-1 sm:gap-3 bg-gray-900/70 backdrop-blur-md border border-emerald-400/20 rounded-full px-2 sm:px-4 py-2 shadow-2xl overflow-x-auto scrollbar-hide max-w-full">
          {/* 'All' tab */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedSubcategory(null);
            }}
            className={`px-2 sm:px-3 py-1 rounded-full text-xs transition-all whitespace-nowrap flex-shrink-0 ${
              selectedSubcategory === null
                ? "bg-emerald-400/20 text-emerald-200"
                : "text-gray-300 hover:bg-emerald-400/10"
            }`}
          >
            All
          </button>

          {/* provided subcategories */}
          {subcategories &&
            subcategories.map((sc) => (
              <button
                key={sc}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSubcategory(sc);
                }}
                className={`px-2 sm:px-3 py-1 rounded-full text-xs transition-all whitespace-nowrap flex-shrink-0 ${
                  selectedSubcategory === sc
                    ? "bg-emerald-400/20 text-emerald-200"
                    : "text-gray-300 hover:bg-emerald-400/10"
                }`}
              >
                {sc}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}