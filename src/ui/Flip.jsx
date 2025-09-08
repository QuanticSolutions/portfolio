"use client";

import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { twMerge } from "tailwind-merge";

export const FlipLogos = ({
  logos,
  duration = 3000,
  className,
  imgClassName,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextLogo = useCallback(() => {
    const nextIndex = (currentIndex + 1) % logos.length;
    setCurrentIndex(nextIndex);
    setIsAnimating(true);
  }, [currentIndex, logos.length]);

  useEffect(() => {
    if (!isAnimating) {
      const timer = setTimeout(() => {
        nextLogo();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isAnimating, duration, nextLogo]);

  return (
    <div className={twMerge("relative h-32 w-52", className)}>
      <AnimatePresence
        mode="wait"
        onExitComplete={() => {
          setIsAnimating(false);
        }}
      >
        <motion.img
          key={logos[currentIndex]}
          src={`/assets/images/${logos[currentIndex]}`}
          alt={`Logo ${currentIndex + 1}`}
          initial={{ opacity: 0, y: 20, scale: 0.8, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          // exit={{ opacity: 0, y: -20, scale: 0.8, filter: "blur(8px)" }}
          transition={{
            duration: 0.1,
            type: "spring",
            stiffness: 100,
            damping: 12,
          }}
          className={twMerge(
            "absolute h-full w-full object-contain",
            imgClassName
          )}
        />
      </AnimatePresence>
    </div>
  );
};
