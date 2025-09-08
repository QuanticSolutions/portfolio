"use client";

import React, { useEffect, useState, useRef } from "react";
import { twMerge } from "tailwind-merge";

export const InfiniteMovingLogos = ({
  logos = [],
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className = "",
  imgClassName = "h-16 sm:h-20 md:h-24 w-auto", // bigger logos for mobile
}) => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  const addAnimation = () => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current.appendChild(duplicatedItem);
      });

      applyDirection();
      applySpeed();
      setStart(true);
    }
  };

  const applyDirection = () => {
    containerRef.current?.style.setProperty(
      "--animation-direction",
      direction === "left" ? "forwards" : "reverse"
    );
  };

  const applySpeed = () => {
    const duration =
      speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";
    containerRef.current?.style.setProperty("--animation-duration", duration);
  };

  return (
    <div
      ref={containerRef}
      className={twMerge(
        "scroller relative z-20 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={twMerge(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-8 py-6", // larger gap for bigger logos
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {logos.map((src, idx) => (
          <li key={idx} className="shrink-0 flex items-center justify-center">
            <img
              src={`/assets/images/${src}`}
              alt={`Logo ${idx + 1}`}
              className={twMerge("object-contain", imgClassName)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
