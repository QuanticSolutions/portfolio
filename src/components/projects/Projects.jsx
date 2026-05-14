"use client";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

/* ─────────────────────────────────────────────
   Staggered scroll-triggered animation variants
───────────────────────────────────────────── */
const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.52,
      delay: i * 0.055,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
  exit: {
    opacity: 0,
    scale: 0.96,
    y: -8,
    transition: { duration: 0.28, ease: "easeIn" },
  },
};

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
   Sleeker size → Tailwind grid-span classes
───────────────────────────────────────────── */
const SIZE_CLASSES = {
  wide:   "col-span-12 md:col-span-8 row-span-2",
  tall:   "col-span-12 md:col-span-4 row-span-2",
  medium: "col-span-12 sm:col-span-6 md:col-span-5 row-span-1",
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
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: true, amount: 0.12 }}
      whileHover={{ scale: 1.012, transition: { duration: 0.22, ease: "easeOut" } }}
      className={`relative group overflow-hidden cursor-pointer ${SIZE_CLASSES[size]}
        bg-black/50 backdrop-blur-md border border-white/[0.07]
        hover:border-emerald-400/30 rounded-lg`}
      style={{ transition: "border-color 0.3s ease, box-shadow 0.3s ease" }}
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
          className="absolute inset-0 w-full h-full object-cover opacity-100 group-hover:opacity-25 group-hover:scale-105 transition-all duration-700"
        />
      )}

      {/* No image: gradient */}
      {!project.image && (
        <div className={`absolute inset-0 bg-gradient-to-br ${project.bgGradient ?? "from-teal-900/50 via-black to-black"}`} />
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

      {/* SVG pattern */}
      <div className="absolute inset-0 opacity-[0.08] group-hover:opacity-[0.16] group-hover:scale-105 transition-all duration-700 pointer-events-none">
        <ProjectSVGPattern id={project.id} />
      </div>

      {/* Teal radial glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: "radial-gradient(circle at 50% 90%, rgba(16,185,129,0.10) 0%, transparent 65%)" }}
      />

      {/* External link badge */}
      {project.link && (
        <div className="absolute top-2.5 right-2.5 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-black/70 backdrop-blur-sm rounded-full p-1.5 border border-emerald-400/25">
            <ExternalLink size={11} className="text-emerald-400" />
          </div>
        </div>
      )}

      {/* Ghost index number */}
      <span className="absolute top-1 left-3 font-black text-5xl md:text-7xl leading-none select-none pointer-events-none text-white/[0.04] group-hover:text-white/[0.065] transition-colors duration-500">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full p-3.5 sm:p-4">
        {/* Category pill */}
        <div className="flex items-center gap-1.5 mb-1.5">
          <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-[0.18em]">
            {project.category}
            {project.subcategory ? ` / ${project.subcategory}` : ""}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-black text-sm sm:text-base md:text-lg uppercase leading-tight mb-1
          bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent
          group-hover:from-white group-hover:via-emerald-100 group-hover:to-white transition-all duration-500">
          {project.title}
        </h3>

        {/* Subtitle — slides in on hover */}
        {project.subtitle && (
          <div className="overflow-hidden">
            <p className="text-[10px] font-mono text-gray-400 leading-relaxed max-h-0 opacity-0 group-hover:max-h-12 group-hover:opacity-100 transition-all duration-400 mb-2">
              {project.subtitle}
            </p>
          </div>
        )}

        {/* Bottom divider + arrow */}
        <div className="flex items-center justify-between mt-1.5">
          <div className="w-6 h-px bg-gradient-to-r from-emerald-400 to-transparent" />
          <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center
            text-gray-500 group-hover:border-emerald-400/60 group-hover:text-emerald-400 transition-all duration-300">
            <ArrowUpRight size={11} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Main component — same props as ProjectsCarousel
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
    <div className="relative min-h-screen w-full bg-gradient-to-br from-black via-teal-900/25 to-black
      pt-28 pb-14 px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32">
      <div className="max-w-6xl mx-auto">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="bg-black/40 backdrop-blur-md rounded-lg border border-white/[0.12] p-4 sm:p-5 mb-6"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div>
              <div className="font-mono text-emerald-400 text-[9px] tracking-[0.22em] mb-2.5 uppercase border-l-2 border-emerald-400 pl-2.5">
                // Selected Work
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase
                bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Our Projects
              </h1>
            </div>
            <p className="font-mono text-[10px] text-gray-500 uppercase tracking-tight md:text-right">
              Showing{" "}
              <span className="text-emerald-400">
                {String(filteredProjects.length).padStart(2, "0")}
              </span>{" "}
              Projects
            </p>
          </div>
        </motion.div>

        {/* ── Filter bar ── */}
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="flex flex-wrap items-center gap-2 mb-6"
        >
          <button
            onClick={() => {
              setSelectedSubcategory(null);
              router.push(pathname, { scroll: false });
            }}
            className={`px-3.5 py-1 font-mono text-[10px] uppercase tracking-wider rounded transition-all duration-300 ${
              selectedSubcategory === null
                ? "bg-emerald-400/15 text-emerald-300 border border-emerald-400/45 shadow-[0_0_10px_rgba(52,211,153,0.18)]"
                : "border border-white/[0.08] text-gray-500 hover:border-emerald-400/35 hover:text-emerald-400"
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
              className={`px-3.5 py-1 font-mono text-[10px] uppercase tracking-wider rounded transition-all duration-300 ${
                selectedSubcategory === sc
                  ? "bg-emerald-400/15 text-emerald-300 border border-emerald-400/45 shadow-[0_0_10px_rgba(52,211,153,0.18)]"
                  : "border border-white/[0.08] text-gray-500 hover:border-emerald-400/35 hover:text-emerald-400"
              }`}
            >
              {sc}
            </button>
          ))}
        </motion.nav>

        {/* ── Bento Grid — tighter row height ── */}
        <motion.div
          layout
          className="grid grid-cols-12 auto-rows-[160px] sm:auto-rows-[178px] gap-2.5"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))}
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-12 flex flex-col items-center justify-center py-20 gap-3"
            >
              <div className="w-12 h-12 rounded-full border border-emerald-400/20 flex items-center justify-center">
                <span className="text-lg text-emerald-400/30">∅</span>
              </div>
              <p className="font-mono text-[10px] text-gray-600 uppercase tracking-widest">
                No projects in this category
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
