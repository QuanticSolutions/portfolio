"use client";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

/* ─────────────────────────────────────────────
   Animation variants
───────────────────────────────────────────── */
const cardVariants = {
  hidden:  { opacity: 0, y: 20, scale: 0.98 },
  visible: (i) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] },
  }),
  exit: {
    opacity: 0, scale: 0.97, y: -6,
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

/* ─────────────────────────────────────────────
   Size → grid-span classes  (reference layout)
   wide  = large left card (like "Feeminy" tall card)
   tall  = right-side tall card
   small = standard half-width card
   mini  = small card
───────────────────────────────────────────── */
const SIZE_CLASSES = {
  wide:   "col-span-12 md:col-span-5 row-span-2",
  tall:   "col-span-12 md:col-span-4 row-span-2",
  medium: "col-span-12 sm:col-span-6 md:col-span-4 row-span-1",
  small:  "col-span-6 md:col-span-3 row-span-1",
  mini:   "col-span-6 md:col-span-3 row-span-1",
};

const SIZE_CYCLE = ["wide", "tall", "medium", "small", "mini", "medium", "small", "mini"];

/* ─────────────────────────────────────────────
   Single card  — matches reference exactly
───────────────────────────────────────────── */
function ProjectCard({ project, index }) {
  const size = project.size ?? SIZE_CYCLE[index % SIZE_CYCLE.length];
  const num  = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      layout
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: true, amount: 0.1 }}
      className={`relative group overflow-hidden cursor-pointer ${SIZE_CLASSES[size]}
        rounded-xl border border-white/[0.06] bg-[#0a0a0a]`}
      style={{
        boxShadow: "0 0 0 0 rgba(52,211,153,0)",
        transition: "box-shadow 0.4s ease, border-color 0.4s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 0 0 1.5px rgba(52,211,153,0.55), 0 0 28px rgba(52,211,153,0.12)";
        e.currentTarget.style.borderColor = "rgba(52,211,153,0.5)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 0 0 0 rgba(52,211,153,0)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
      }}
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
      {/* ── Background image ── */}
      {project.image ? (
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${project.bgGradient ?? "from-[#0d1f1a] via-[#0a0a0a] to-[#0a0f0d]"}`} />
      )}

      {/* ── Persistent dark gradient so text is always readable ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />

      {/* ── Green glow overlay on hover (matches reference) ── */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 110%, rgba(52,211,153,0.13) 0%, transparent 65%)" }}
      />

      {/* ── TOP ROW: category pill (left) + number (right) ── */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between">
        {/* Category pill — reference style: small dark bg, green text */}
        <span className="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-[0.18em]
          bg-black/60 backdrop-blur-sm border border-emerald-400/20 text-emerald-400">
          {project.subcategory
            ? `${project.category} / ${project.subcategory}`
            : project.category}
        </span>

        {/* Number badge — reference: gray, top-right */}
        <span className="font-mono text-[10px] text-white/30 tabular-nums">
          / {num}
        </span>
      </div>

      {/* ── BOTTOM ROW: title + subtitle + arrow ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-3.5 sm:p-4">
        {/* Title */}
        <h3 className="font-bold text-sm sm:text-base text-white leading-snug mb-0.5
          group-hover:text-emerald-300 transition-colors duration-300">
          {project.title}
        </h3>

        {/* Subtitle / date line — reference shows "Case study · 2024" */}
        <p className="font-mono text-[10px] text-white/35 group-hover:text-white/50 transition-colors duration-300">
          {project.subtitle ?? "Case study · 2024"}
        </p>

        {/* Arrow button — reference: round green button bottom-right */}
        <motion.div
          className="absolute bottom-3.5 right-3.5 w-7 h-7 rounded-full
            flex items-center justify-center
            bg-black/50 border border-white/10
            group-hover:bg-emerald-400 group-hover:border-emerald-400
            transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.93 }}
        >
          <ArrowUpRight
            size={13}
            className="text-white/50 group-hover:text-black transition-colors duration-300"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
export default function ProjectsGrid({
  projects      = [],
  subcategories = [],
  category      = null,
  onProjectClick = () => {},
  showDetails   = true,
}) {
  const router       = useRouter();
  const pathname     = usePathname();
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
    <div className="relative min-h-screen w-full bg-[#050505]
      pt-28 pb-16 px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32">
      <div className="max-w-6xl mx-auto">

        {/* ── Header row — matches reference "THE ARCHIVE" style ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8"
        >
          <div>
            {/* Eyebrow — "SELECTED INDEX — 2024 / 25" */}
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-emerald-400">
                Selected Index — 2024 / {String(filteredProjects.length).padStart(2, "0")}
              </span>
            </div>
            {/* Big heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-none">
              <span className="text-white">THE </span>
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-green-400 bg-clip-text text-transparent">
                ARCHIVE
              </span>
            </h1>
          </div>

          {/* ── Pill filter tabs — reference style ── */}
          <motion.nav
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="flex flex-wrap items-center gap-1.5"
          >
            {/* ALL WORK pill */}
            <button
              onClick={() => {
                setSelectedSubcategory(null);
                router.push(pathname, { scroll: false });
              }}
              className={`px-3.5 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-wider
                transition-all duration-300 ${
                selectedSubcategory === null
                  ? "bg-emerald-400 text-black font-bold shadow-[0_0_14px_rgba(52,211,153,0.45)]"
                  : "bg-white/[0.05] border border-white/[0.08] text-white/50 hover:text-white hover:border-white/20"
              }`}
            >
              All Work
            </button>

            {subcategories.map((sc) => (
              <button
                key={sc}
                onClick={() => {
                  setSelectedSubcategory(sc);
                  if (sc) router.push(`?sc=${sc}`, { scroll: false });
                }}
                className={`px-3.5 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-wider
                  transition-all duration-300 ${
                  selectedSubcategory === sc
                    ? "bg-emerald-400 text-black font-bold shadow-[0_0_14px_rgba(52,211,153,0.45)]"
                    : "bg-white/[0.05] border border-white/[0.08] text-white/50 hover:text-white hover:border-white/20"
                }`}
              >
                {sc}
              </button>
            ))}
          </motion.nav>
        </motion.div>

        {/* ── Bento Grid ── */}
        <motion.div
          layout
          className="grid grid-cols-12 auto-rows-[170px] sm:auto-rows-[190px] gap-2.5"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))}
          </AnimatePresence>

          {/* Empty state */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-12 flex flex-col items-center justify-center py-24 gap-3"
            >
              <div className="w-10 h-10 rounded-full border border-emerald-400/20 flex items-center justify-center">
                <span className="text-base text-emerald-400/30">∅</span>
              </div>
              <p className="font-mono text-[9px] text-white/20 uppercase tracking-widest">
                No projects in this category
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
