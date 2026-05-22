"use client";
import React, { useState, useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

/* ─────────────────────────────────────────────
   All cards equal size — 950×400 ≈ aspect-[19/8]
   3 columns on desktop, 2 on tablet, 1 on mobile
───────────────────────────────────────────── */

function Card({ project, index }) {
  const num  = String(index + 1).padStart(2, "0");
  const year = project.year ?? "2024";

  return (
    <a
      href={project.link ?? "#"}
      target={project.link ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="group relative overflow-hidden rounded-2xl
        bg-white/[0.03] border border-white/[0.06]
        hover:border-emerald-400/70
        transition-all duration-500
        hover:shadow-[0_0_0_1px_rgba(52,211,153,0.6),0_0_30px_rgba(52,211,153,0.15),0_0_60px_rgba(52,211,153,0.07)]"
    >
      {/* Fixed ratio matching 950×400 */}
      <div className="relative aspect-[19/8] overflow-hidden">

        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover
              transition-transform duration-700 ease-out
              group-hover:scale-[1.07]"
          />
        ) : (
          <div className={`h-full w-full bg-gradient-to-br
            ${project.bgGradient ?? "from-[#0d1f1a] via-[#080808] to-[#0a0f0d]"}`}
          />
        )}

        {/* Base dark vignette */}
        <div className="absolute inset-0 bg-gradient-to-t
          from-black/90 via-black/20 to-transparent
          opacity-90 group-hover:opacity-70
          transition-opacity duration-500" />

        {/* Green radial glow that sweeps in on hover */}
        <div className="absolute inset-0
          opacity-0 group-hover:opacity-100
          transition-opacity duration-500 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% 100%, rgba(52,211,153,0.18) 0%, transparent 65%)"
          }}
        />

        {/* Animated green shimmer line at bottom on hover */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px]
          bg-gradient-to-r from-transparent via-emerald-400 to-transparent
          opacity-0 group-hover:opacity-100
          scale-x-0 group-hover:scale-x-100
          transition-all duration-700 ease-out origin-center" />

        {/* Category pill — top-left */}
        {/* <span className="absolute top-3.5 left-3.5
          rounded-full px-2.5 py-1 text-[10px] uppercase tracking-widest
          bg-black/50 backdrop-blur-sm border border-emerald-400/25
          text-emerald-400
          group-hover:border-emerald-400/60 group-hover:bg-black/70
          transition-all duration-300">
          {project.subcategory
            ? `${project.category} / ${project.subcategory}`
            : (project.category ?? project.tag ?? "")}
        </span> */}

        {/* Number — top-right */}
        <span className="absolute top-3.5 right-3.5
          text-[10px] uppercase tracking-widest text-white/25 font-mono
          group-hover:text-emerald-400/60 transition-colors duration-300">
          / {num}
        </span>

        {/* Bottom info row */}
        <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
          <div>
            <div className="font-bold text-sm sm:text-base text-white leading-snug
              group-hover:text-emerald-300 transition-colors duration-300">
              {project.title}
            </div>
            {/* <div className="text-[10px] text-white/30 mt-0.5 font-mono
              group-hover:text-white/55 transition-colors duration-300">
              {project.subtitle ?? `Case study · ${year}`}
            </div> */}
          </div>

          {/* Arrow button — spins slightly + turns green on hover */}
          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full
            bg-white/[0.06] border border-white/[0.08] text-white/40 text-sm
            group-hover:bg-emerald-400 group-hover:border-emerald-400 group-hover:text-black
            group-hover:rotate-45
            transition-all duration-300">
            →
          </span>
        </div>
      </div>
    </a>
  );
}

/* ─────────────────────────────────────────────
   Main
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

        {/* ── Header ── */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
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

          {/* ── Filter tabs ── */}
          <div className="flex flex-wrap gap-2">
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
          </div>
        </div>

        {/* ── Equal grid — 3 cols desktop, 2 tablet, 1 mobile ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filtered.map((project, idx) => (
            <Card key={project.id ?? project.title} project={project} index={idx} />
          ))}

          {filtered.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-24 gap-3">
              <div className="w-10 h-10 rounded-full border border-emerald-400/20 flex items-center justify-center">
                <span className="text-base text-emerald-400/30">∅</span>
              </div>
              <p className="font-mono text-[9px] text-white/20 uppercase tracking-widest">
                No projects in this category
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}