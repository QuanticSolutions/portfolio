"use client";
import { twMerge } from "tailwind-merge";
import React, { useEffect, useState } from "react";

export const InfiniteImageSlider = ({
  images,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}) => {
  const containerRef = React.useRef(null);
  const scrollerRef = React.useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current.appendChild(duplicatedItem);
      });
      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  const handleImageClick = (e, link) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (link) {
      // Ensure the URL has a protocol
      const url = link.startsWith('http://') || link.startsWith('https://') 
        ? link 
        : `https://${link}`;
      
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      ref={containerRef}
      className={twMerge(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={twMerge(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-8",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {images.map((image, idx) => (
            <a href={`${image.link}`}
            target="blank"
              key={`${image.src}-${idx}`} // Better key for duplicated items
              className={twMerge(
                "relative shrink-0 rounded-xl overflow-hidden shadow-lg transition-transform duration-500 hover:scale-105 group",
                image.link && "cursor-pointer"
              )}
              style={{
                width: "280px",
                height: "400px",
              }}
            >
              <img
                src={image.src}
                alt={image.name || `slide-${idx}`}
                className="h-full w-full object-cover rounded-xl"
                draggable={false} // Prevent image dragging
              />
              {/* Overlay for project name */}
              <div className="absolute inset-0 bg-black/40 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-xl">
                <h3 className="text-white text-lg font-semibold text-center px-4">
                  {image.name || `Project ${idx + 1}`}
                </h3>
              </div>
          </a>
        ))}
      </ul>
    </div>
  );
};