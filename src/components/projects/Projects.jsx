"use client";
import React, { useState, useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

/* Split a project array into pairs, so each row
   gets exactly one "small" and one "large" card. */
function chunkPairs(items) {
  const pairs = [];
  for (let i = 0; i < items.length; i += 2) {
    pairs.push(items.slice(i, i + 2));
  }
  return pairs;
}

function Card({ project, widthClass }) {
  const hasName = Boolean(project.title && project.title.trim());
  const hasSubtext = Boolean(project.category || project.subcategory);

  return (
    <a
      href={project.link ?? "#"}
      target={project.link ? "_blank" : undefined}
      rel="noopener noreferrer"
      className={`group relative block overflow-hidden rounded-2xl
        border border-white/[0.06] bg-white/[0.03]
        hover:border-emerald-400/70
        transition-all duration-500
        hover:shadow-[0_0_0_1px_rgba(52,211,153,0.6),0_0_30px_rgba(52,211,153,0.15),0_0_60px_rgba(52,211,153,0.07)]
        ${widthClass}`}
    >
      <div className="relative">
        <img
          src={project.image}
          alt={project.title || "Project image"}
          loading="lazy"
          className="block w-full h-auto
            transition-transform duration-700 ease-out
            group-hover:scale-[1.05]"
        />

        {/* Black-to-transparent overlay, teal-tinted, fades in on hover */}
        <div className="absolute inset-0 bg-gradient-to-t
          from-black/90 via-emerald-950/40 to-transparent
          opacity-0 group-hover:opacity-100
          transition-opacity duration-500" />

        {/* Shimmer line at bottom on hover */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px]
          bg-gradient-to-r from-transparent via-emerald-400 to-transparent
          opacity-0 group-hover:opacity-100
          scale-x-0 group-hover:scale-x-100
          transition-all duration-700 ease-out origin-center" />

        {/* Arrow — top-right */}
        <div className="absolute top-5 right-5 size-10 rounded-full
          bg-white/[0.06] border border-white/[0.08] text-white/60
          grid place-items-center
          opacity-0 group-hover:opacity-100
          group-hover:bg-emerald-400 group-hover:border-emerald-400 group-hover:text-black
          transition-all duration-500">
          →
        </div>

        {/* Name / category — only rendered if there's something to show, fades and slides up on hover */}
        {(hasName || hasSubtext) && (
          <div className="absolute inset-x-0 bottom-0 p-5
            translate-y-4 opacity-0
            group-hover:translate-y-0 group-hover:opacity-100
            transition-all duration-500">
            {hasName && (
              <h3 className="font-bold text-lg text-emerald-300">{project.title}</h3>
            )}
            {hasSubtext && (
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-300/70 mt-1">
                {project.category}{project.subcategory ? ` / ${project.subcategory}` : ""}
              </p>
            )}
          </div>
        )}
      </div>
    </a>
  );
}

export default function ProjectsGrid({
  projects      = [],
  subcategories = [],
  category      = null,
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
  const pairs = useMemo(() => chunkPairs(filtered), [filtered]);

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

        {/* ── Alternating small/large pairs, same height, natural width ── */}
        <div className="flex flex-col gap-6">
          {pairs.map((pair, pairIdx) => {
            const firstIsLarge = pairIdx % 2 === 1;
            return (
              <div key={pairIdx} className="flex flex-col sm:flex-row gap-6 justify-center">
                {pair.map((project, posIdx) => {
                  const isFirst = posIdx === 0;
                  const isLarge = isFirst ? firstIsLarge : !firstIsLarge;
                  const widthClass = isLarge ? "sm:w-[58%]" : "sm:w-[38%]";
                  return (
                    <Card key={project.id} project={project} widthClass={widthClass} />
                  );
                })}
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="w-full flex flex-col items-center justify-center py-24 gap-3">
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