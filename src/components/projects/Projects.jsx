"use client";
import React, { useState, useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

function Card({ project }) {
  const hasName = Boolean(project.title && project.title.trim());
  const hasSubtext = Boolean(project.category || project.subcategory);

  return (
    <a
      href={project.link ?? "#"}
      target={project.link ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="group block"
    >
      <div className="relative rounded-3xl overflow-hidden border border-white/[0.06] bg-white/[0.03]">
        <img
          src={project.image}
          alt={project.title || "Project image"}
          loading="lazy"
          className="block h-72 w-auto transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-emerald-950/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-5 right-5 size-10 rounded-full bg-white/15 backdrop-blur grid place-items-center text-emerald-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          →
        </div>
        {(hasName || hasSubtext) && (
          <div className="absolute inset-x-0 bottom-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            {hasName && (
              <h3 className="font-display text-xl font-bold text-emerald-300">{project.title}</h3>
            )}
            {hasSubtext && (
              <div className="flex items-end justify-between mt-1">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-300/80">
                  {project.category}{project.subcategory ? ` / ${project.subcategory}` : ""}
                </p>
                {project.link && (
                  <span className="text-emerald-300 font-bold text-sm group-hover:underline">View Case</span>
                )}
              </div>
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

        {/* ── Natural-size gallery, equal height, centered ── */}
        <div className="flex flex-wrap justify-center gap-3">
          {filtered.map((project) => (
            <Card key={project.id} project={project} />
          ))}

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