"use client";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

/* ─────────────────────────────────────────────
   SVG background patterns (deterministic by id)
───────────────────────────────────────────── */
function ProjectSVGPattern({ id }) {
  const numId = typeof id === "number" ? id : parseInt(id) || 0;

  if (numId % 4 === 0)
    return (
      <svg className="w-full h-full text-emerald-400" viewBox="0 0 100 100">
        <defs>
          <pattern id={`grid-${id}`} width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.4" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill={`url(#grid-${id})`} />
        {[...Array(4)].map((_, i) => (
          <circle key={i} cx={50} cy={50} r={12 + i * 16} fill="none" stroke="currentColor" strokeWidth="0.25" opacity={0.5 - i * 0.1} />
        ))}
      </svg>
    );

  if (numId % 3 === 0)
    return (
      <svg className="w-full h-full text-teal-400" viewBox="0 0 100 100">
        {[...Array(8)].map((_, i) => (
          <line key={i} x1="0" y1={i * 14} x2="100" y2={i * 14 + (i % 2 === 0 ? 18 : -18)} stroke="currentColor" strokeWidth="0.25" />
        ))}
        <rect x="20" y="20" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="0.15" strokeDasharray="2,2" />
      </svg>
    );

  if (numId % 2 === 0)
    return (
      <svg className="w-full h-full text-green-400" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="0.15" />
        <path d="M 10 50 Q 50 10 90 50" fill="none" stroke="currentColor" strokeWidth="0.25" />
        <path d="M 10 50 Q 50 90 90 50" fill="none" stroke="currentColor" strokeWidth="0.25" />
        <rect x="47" y="5" width="6" height="90" fill="currentColor" opacity="0.06" />
      </svg>
    );

  return (
    <svg className="w-full h-full text-cyan-400" viewBox="0 0 100 100">
      <defs>
        <clipPath id={`clip-${id}`}>
          <rect x="10" y="10" width="80" height="80" rx="8" />
        </clipPath>
      </defs>
      <rect x="10" y="10" width="80" height="80" rx="8" fill="none" stroke="currentColor" strokeWidth="0.3" strokeDasharray="1,1" />
      <g clipPath={`url(#clip-${id})`}>
        <circle cx="20" cy="20" r="28" fill="currentColor" opacity="0.08" />
        <circle cx="80" cy="80" r="28" fill="currentColor" opacity="0.08" />
      </g>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Size → Tailwind grid-span classes
───────────────────────────────────────────── */
const SIZE_CLASSES = {
  wide:   "col-span-12 md:col-span-7 row-span-2",
  tall:   "col-span-12 md:col-span-5 row-span-2",
  medium: "col-span-12 md:col-span-7 lg:col-span-5 row-span-1",
  small:  "col-span-6 md:col-span-4 row-span-1",
  mini:   "col-span-6 md:col-span-3 row-span-1",
};

const SIZE_CYCLE = ["wide", "tall", "medium", "small", "mini", "medium", "small", "mini"];

/* ─────────────────────────────────────────────
   Single project card
───────────────────────────────────────────── */
function ProjectCard({ project, index }) {
  const size = project.size ?? SIZE_CYCLE[index % SIZE_CYCLE.length];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.94, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: "easeOut" }}
      className={`relative group overflow-hidden cursor-pointer ${SIZE_CLASSES[size]}
        bg-black/40 backdrop-blur-md border border-white/10
        hover:border-emerald-400/40 transition-all duration-500 rounded-xl`}
      onClick={() => {
        if (project.link) window.open(project.link, "_blank", "noopener,noreferrer");
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" && project.link)
          window.open(project.link, "_blank", "noopener,noreferrer");
      }}
    >
      {/* Background image */}
      {project.image && (
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover opacity-100 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700"
        />
      )}

      {/* No image: gradient bg */}
      {!project.image && (
        <div
          className={`absolute inset-0 bg-gradient-to-br ${
            project.bgGradient ?? "from-teal-900/60 via-black to-black"
          }`}
        />
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* SVG pattern */}
      <div className="absolute inset-0 opacity-10 group-hover:opacity-20 group-hover:scale-105 transition-all duration-700 pointer-events-none">
        <ProjectSVGPattern id={project.id} />
      </div>

      {/* Teal glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: "radial-gradient(circle at 50% 80%, rgba(16,185,129,0.12) 0%, transparent 70%)" }}
      />

      {/* External link badge */}
      {project.link && (
        <div className="absolute top-3 right-3 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-black/60 backdrop-blur-sm rounded-full p-2 border border-emerald-400/30">
            <ExternalLink size={13} className="text-emerald-400" />
          </div>
        </div>
      )}

      {/* Ghost index number */}
      <span className="absolute top-2 left-4 font-black text-6xl md:text-8xl leading-none select-none pointer-events-none text-white/5 group-hover:text-white/[0.07] transition-colors duration-500">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full p-4 sm:p-5 lg:p-6">
        {/* Category / subcategory */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-[0.2em]">
            {project.category}
            {project.subcategory ? ` / ${project.subcategory}` : ""}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-black text-lg sm:text-xl md:text-2xl uppercase leading-tight mb-1 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent group-hover:from-white group-hover:via-emerald-200 group-hover:to-white transition-all duration-500">
          {project.title}
        </h3>

        {/* Subtitle revealed on hover */}
        {project.subtitle && (
          <div className="overflow-hidden">
            <p className="text-[11px] font-mono text-gray-400 leading-relaxed max-h-0 opacity-0 group-hover:max-h-16 group-hover:opacity-100 transition-all duration-500 mb-3">
              {project.subtitle}
            </p>
          </div>
        )}

        {/* Bottom row */}
        <div className="flex items-center justify-between mt-2">
          <div className="w-8 h-[1px] bg-gradient-to-r from-emerald-400 to-transparent" />
          <div className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-gray-500 group-hover:border-emerald-400 group-hover:text-emerald-400 transition-all duration-300">
            <ArrowUpRight size={13} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Main exported component — props identical to
   your existing ProjectsCarousel (drop-in swap)
───────────────────────────────────────────── */
export default function ProjectsGrid({
  projects = [],
  subcategories = [],
  category = null,
  onProjectClick = () => {},
  showDetails = true,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialFiltered = useMemo(
    () => (category ? projects.filter((p) => p.category === category) : projects),
    [projects, category]
  );

  const [selectedSubcategory, setSelectedSubcategory] = useState(
    searchParams.get("sc") || null
  );

  const filteredProjects = useMemo(
    () =>
      initialFiltered.filter((p) =>
        selectedSubcategory ? p.subcategory === selectedSubcategory : true
      ),
    [initialFiltered, selectedSubcategory]
  );

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-black via-teal-900/30 to-black py-16 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="bg-black/40 backdrop-blur-md rounded-lg border border-white/20 p-4 sm:p-5 mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="font-mono text-emerald-400 text-[10px] tracking-[0.2em] mb-3 uppercase border-l-2 border-emerald-400 pl-3">
                // Selected Work
              </div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl sm:text-4xl md:text-5xl font-black uppercase bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent"
              >
                Our Projects
              </motion.h1>
            </div>
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="font-mono text-[11px] text-gray-500 leading-relaxed uppercase tracking-tight md:text-right max-w-xs"
            >
              Showing{" "}
              <span className="text-emerald-400">
                {String(filteredProjects.length).padStart(2, "0")}
              </span>{" "}
              Projects
            </motion.p>
          </div>
        </div>

        {/* Filter bar */}
        <nav className="flex flex-wrap items-center gap-2 mb-8">
          <button
            onClick={() => {
              setSelectedSubcategory(null);
              router.push(pathname, { scroll: false });
            }}
            className={`px-4 py-1.5 font-mono text-xs uppercase tracking-wider rounded transition-all duration-300 ${
              selectedSubcategory === null
                ? "bg-emerald-400/20 text-emerald-200 border border-emerald-400/50 shadow-[0_0_12px_rgba(52,211,153,0.25)]"
                : "border border-white/10 text-gray-400 hover:border-emerald-400/40 hover:text-emerald-400"
            }`}
          >
            All
          </button>
          {subcategories.map((sc) => (
            <button
              key={sc}
              onClick={() => {
                setSelectedSubcategory(sc);
                if (sc) router.push(`?sc=${sc}`, { scroll: false });
              }}
              className={`px-4 py-1.5 font-mono text-xs uppercase tracking-wider rounded transition-all duration-300 ${
                selectedSubcategory === sc
                  ? "bg-emerald-400/20 text-emerald-200 border border-emerald-400/50 shadow-[0_0_12px_rgba(52,211,153,0.25)]"
                  : "border border-white/10 text-gray-400 hover:border-emerald-400/40 hover:text-emerald-400"
              }`}
            >
              {sc}
            </button>
          ))}
        </nav>

        {/* Bento Grid */}
        <motion.div layout className="grid grid-cols-12 auto-rows-[220px] sm:auto-rows-[240px] gap-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))}
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-12 flex flex-col items-center justify-center py-24 gap-4"
            >
              <div className="w-16 h-16 rounded-full border border-emerald-400/20 flex items-center justify-center">
                <span className="text-2xl text-emerald-400/40">∅</span>
              </div>
              <p className="font-mono text-xs text-gray-500 uppercase tracking-widest">
                No projects in this category
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
