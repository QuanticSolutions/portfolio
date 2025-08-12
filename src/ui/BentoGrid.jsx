import { twMerge } from "tailwind-merge";

export const BentoGrid = ({ className, children }) => {
  return (
    <div
      className={twMerge(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({ className, title, description }) => {
  return (
    <div
      className={twMerge(
        "group/bento h-[10rem] shadow-input row-span-1 flex flex-col justify-end space-y-4 rounded-xl border bg-black/40 backdrop-blur-md p-4 transition duration-200 hover:shadow-xl border-emerald-800",
        className
      )}
    >
      <div className="transition duration-200 group-hover/bento:translate-x-2 top-auto">
        <div className="mt-2 mb-2 font-sans font-bold text-white">{title}</div>
        <div className="font-sans text-xs font-normal text-white">
          {description}
        </div>
      </div>
    </div>
  );
};
