"use client";
import React, { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

function Card({ project, isLarge }) {
  const hasName = Boolean(project.title && project.title.trim());
  const hasSubtext = Boolean(project.category || project.subcategory);

  return (
    <a
      href={project.link ?? "#"}
      target={project.link ? "_blank" : undefined}
      rel="noopener noreferrer"
      /* 
         Removed flex-grow so orphan/last cards maintain their assigned width instead of stretching!
         - Mobile: w-full
         - Desktop Large: exactly 62% minus half the gap (12px)
         - Desktop Small: exactly 38% minus half the gap (12px)
      */
      className={`group relative block w-full rounded-2xl overflow-hidden
        border border-white/[0.06] bg-white/[0.03]
        hover:border-emerald-400/70
        transition-all duration-500
        hover:shadow-[0_0_0_1px_rgba(52,211,153,0.6),0_0_30px_rgba(52,211,153,0.15),0_0_60px_rgba(52,211,153,0.07)]
        ${
          isLarge
            ? "sm:w-[calc(62%-12px)]"
            : "sm:w-[calc(38%-12px)]"
        }`}
    >
      <div className="relative h-64 sm:h-96 w-full">
        <img
          src={project.image}
          alt={project.title || project.subcategory || "Project image"}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover
            transition-transform duration-700 ease-out
            group-hover:scale-[1.05]"
        />

        <div className="absolute inset-0 bg-gradient-to-t
          from-black/90 via-emerald-950/40 to-transparent
          opacity-0 group-hover:opacity-100
          transition-opacity duration-500" />

        <div className="absolute bottom-0 left-0 right-0 h-[1px]
          bg-gradient-to-r from-transparent via-emerald-400 to-transparent
          opacity-0 group-hover:opacity-100
          scale-x-0 group-hover:scale-x-100
          transition-all duration-700 ease-out origin-center" />

        <div className="absolute top-5 right-5 size-10 rounded-full
          bg-white/[0.06] border border-white/[0.08] text-white/60
          grid place-items-center
          opacity-0 group-hover:opacity-100
          group-hover:bg-emerald-400 group-hover:border-emerald-400 group-hover:text-black
          transition-all duration-500">
          →
        </div>

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

  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const sc = searchParams.get("sc");
    if (sc) setSelected(sc);
  }, [searchParams]);

  const filtered = useMemo(() => {
    if (!selected) return initialFiltered;
    return initialFiltered.filter(
      (p) => p.subcategory?.toLowerCase() === selected.toLowerCase()
    );
  }, [initialFiltered, selected]);

  const filters = ["All Work", ...subcategories];

  return (
    <section className="relative px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 pt-28 pb-24 min-h-screen bg-[#050505]">
      <div className="mx-auto max-w-7xl">

        {/* ── Header ── */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none">
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-green-400 bg-clip-text text-transparent">
                {category}
              </span>
            </h2>
          </div>

          {/* ── Filter tabs ── */}
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => {
              const isAll    = f === "All Work";
              const isActive = isAll ? selected === null : selected?.toLowerCase() === f.toLowerCase();
              return (
                <button
                  key={f}
                  onClick={() => {
                    if (isAll) {
                      setSelected(null);
                      router.push(pathname, { scroll: false });
                    } else {
                      setSelected(f);
                      router.push(`?sc=${encodeURIComponent(f)}`, { scroll: false });
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

        {/* ── Alternating Width Flex Grid (justify-start prevents odd spacing) ── */}
        <div className="flex flex-wrap gap-6 justify-start">
          {filtered.map((project, index) => {
            const patternIndex = index % 4;
            const isLarge = patternIndex === 0 || patternIndex === 3;

            return (
              <Card key={project.id} project={project} isLarge={isLarge} />
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