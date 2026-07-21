function Card({ project, widthClass }) {
  const hasName = Boolean(project.title && project.title.trim());
  const hasSubtext = Boolean(project.category || project.subcategory);

  return (
    <a
      href={project.link ?? "#"}
      target={project.link ? "_blank" : undefined}
      rel="noopener noreferrer"
      className={`group relative block rounded-2xl overflow-hidden
        border border-white/[0.06] bg-white/[0.03]
        hover:border-emerald-400/70
        transition-all duration-500
        hover:shadow-[0_0_0_1px_rgba(52,211,153,0.6),0_0_30px_rgba(52,211,153,0.15),0_0_60px_rgba(52,211,153,0.07)]
        ${widthClass}`}
    >
      <div className="relative w-full h-full min-h-[16rem] sm:min-h-[20rem]">
        <img
          src={project.image}
          alt={project.title || "Project image"}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-center
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