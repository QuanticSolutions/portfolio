"use client";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

/* ─────────────────────────────────────────────
   Each project can carry a `span` and `ratio`
   field matching the reference's layout, OR
   fall back to auto-assigned values by index.

   span  → Tailwind col-span string
   ratio → Tailwind aspect-ratio class
─────────────────────────────────────────────── */
const SPAN_CYCLE = [
  "md:col-span-4 md:row-span-2",   // 0 — tall left card
  "md:col-span-5",                  // 1 — wide
  "md:col-span-3",                  // 2 — small
  "md:col-span-3",                  // 3
  "md:col-span-3",                  // 4
  "md:col-span-6",                  // 5 — wide
  "md:col-span-4",                  // 6
  "md:col-span-5",                  // 7
];

const RATIO_CYCLE = [
  "aspect-[4/5]",
  "aspect-[16/10]",
  "aspect-square",
  "aspect-[4/5]",
  "aspect-square",
  "aspect-[16/10]",
  "aspect-[4/5]",
  "aspect-[16/11]",
];

/* ─────────────────────────────────────────────
   Card — exact reference structure, site colors
───────────────────────────────────────────── */
function Card({ project, index }) {
  const span  = project.span  ?? SPAN_CYCLE[index  % SPAN_CYCLE.length];
  const ratio = project.ratio ?? RATIO_CYCLE[index % RATIO_CYCLE.length];
  const num   = String(index + 1).padStart(2, "0");
  const year  = project.year ?? "2024";

  return (
    <motion.a
      href={project.link ?? "#"}
      target={project.link ? "_blank" : undefined}
      rel="noopener noreferrer"
      layout
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      /* reference class: group relative overflow-hidden rounded-2xl glass + span */
      className={`group relative overflow-hidden rounded-2xl col-span-1 ${span}
        bg-white/[0.03] backdrop-blur-sm border border-white/[0.06]`}
    >
      {/* ── Image + overlays ── */}
      <div className={`relative ${ratio} overflow-hidden`}>

        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
        ) : (
          /* Fallback gradient when no image supplied */
          <div className={`h-full w-full bg-gradient-to-br ${project.bgGradient ?? "from-[#0d1f1a] via-[#080808] to-[#0a0f0d]"}`} />
        )}

        {/* Dark vignette — reference: from-background via-background/30 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

        {/* Neon border glow on hover — reference: ring-primary/60 + inset shadow */}
        <div className="absolute inset-0 rounded-2xl
          ring-1 ring-inset ring-white/[0.05]
          group-hover:ring-emerald-400/60
          group-hover:shadow-[inset_0_0_40px_rgba(52,211,153,0.07)]
          transition-all duration-500" />

        {/* Category pill — top-left */}
        <span className="absolute top-4 left-4
          rounded-full px-2.5 py-1 text-[10px] uppercase tracking-widest
          bg-white/[0.06] backdrop-blur-sm border border-emerald-400/20
          text-emerald-400">
          {project.subcategory
            ? `${project.category} / ${project.subcategory}`
            : (project.category ?? project.tag ?? "")}
        </span>

        {/* Number — top-right */}
        <span className="absolute top-4 right-4 text-[10px] uppercase tracking-widest text-white/30 font-mono">
          / {num}
        </span>
      </div>

      {/* ── Bottom info row ── */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 flex items-end justify-between">
        <div>
          <div className="font-bold text-base md:text-lg text-white leading-snug
            group-hover:text-emerald-300 transition-colors duration-300">
            {project.title}
          </div>
          <div className="text-[11px] text-white/35 mt-1 font-mono group-hover:text-white/50 transition-colors duration-300">
            {project.subtitle ?? `Case study · ${year}`}
          </div>
        </div>

        {/* Arrow button — reference: glass circle → bg-primary on hover */}
        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full
          bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] text-white/50
          group-hover:bg-emerald-400 group-hover:border-emerald-400 group-hover:text-black
          transition-all duration-300 text-sm">
          →
        </span>
      </div>
    </motion.a>
  );
}

/* ─────────────────────────────────────────────
   Main — same props as your existing usage
───────────────────────────────────────────── */
export default function ProjectsGrid({
  projects       = [],
  subcategories  = [],
  category       = null,
  onProjectClick = () => {},
  showDetails    = true,
}) {
  const router       = useRouter();
  const pathname     = usePathname();
  const searchParams = useSearchParams();

  const initialFiltered = useMemo(
    () => (category ? projects.filter((p) => p.category === category) : projects),
    [projects, category]
  );

  const [selected, setSelected] = useState(searchParams.get("sc") || null);

  const filtered = useMemo(
    () => initialFiltered.filter((p) => (selected ? p.subcategory === selected : true)),
    [initialFiltered, selected]
  );

  const filters = ["All Work", ...subcategories];

  return (
    <section className="relative px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 pt-28 pb-24 min-h-screen bg-[#050505]">
      <div className="mx-auto max-w-7xl">

        {/* ── Header — reference layout exactly ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-end justify-between gap-6 mb-12"
        >
          {/* Left: eyebrow + heading */}
          <div>
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-emerald-400/80 font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Selected Index — 2024 / {String(filtered.length).padStart(2, "0")}
            </div>
            <h2 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none">
              <span className="text-white">The </span>
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-green-400 bg-clip-text text-transparent">
                Archive
              </span>
            </h2>
          </div>

          {/* Right: pill filter tabs — reference style */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="flex flex-wrap gap-2"
          >
            {filters.map((f) => {
              const isAll    = f === "All Work";
              const isActive = isAll ? selected === null : selected === f;
              return (
                <button
                  key={f}
                  onClick={() => {
                    if (isAll) {
                      setSelected(null);
                      router.push(pathname, { scroll: false });
                    } else {
                      setSelected(f);
                      router.push(`?sc=${f}`, { scroll: false });
                    }
                  }}
                  className={`rounded-full px-4 py-1.5 text-[10px] uppercase tracking-wider font-mono
                    transition-all duration-300 ${
                    isActive
                      ? "bg-emerald-400 text-black font-bold shadow-[0_0_18px_rgba(52,211,153,0.5)]"
                      : "bg-white/[0.04] border border-white/[0.08] text-white/50 hover:text-white hover:border-white/20 backdrop-blur-sm"
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </motion.div>
        </motion.div>

        {/* ── Grid — reference: grid-cols-1 md:grid-cols-12 gap-5 ── */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 auto-rows-[minmax(0,auto)]"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, idx) => (
              <Card key={project.id ?? project.title} project={project} index={idx} />
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-1 md:col-span-12 flex flex-col items-center justify-center py-24 gap-3"
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
    </section>
  );
}
