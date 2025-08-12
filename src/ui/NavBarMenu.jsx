"use client";
import React from "react";
import { motion } from 'framer-motion';
import { ShootingStars } from "./ShootingStars";
import { StarsBackground } from "./StarsBackground";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children
}) => {
  const transition = { duration: 0.28, ease: "easeInOut" };
  const [hoverTimeout, setHoverTimeout] = React.useState(null);

  const handleMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setActive(item);
  };

  const handleMouseLeave = () => {
    // Add a small delay before closing
    const timeout = setTimeout(() => {
      setActive(null);
    }, 150);
    setHoverTimeout(timeout);
  };

  // Clean up timeout on unmount
  React.useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, [hoverTimeout]);

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-white hover:opacity-[0.9] dark:text-white">
        {item}
      </motion.p>

      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 8 }}
          transition={transition}
          // Reduced gap for smoother transition
          className="absolute left-1/2 top-[calc(100%_+_0.3rem)] -translate-x-1/2"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {active === item && (
            <div className="z-50 pointer-events-auto">
              {/* Invisible bridge to connect menu item and dropdown */}
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-full h-1 bg-transparent pointer-events-auto" />
              
              <div className="rounded-md bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 flex flex-col items-center justify-center relative w-full">
                <motion.div
                  transition={transition}
                  layoutId="active"
                  className="backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl pointer-events-auto"
                >
                  <motion.div layout className="w-max h-full p-4 pointer-events-auto">
                    {children}
                  </motion.div>
                </motion.div>

                <div className="pointer-events-none">
                  <ShootingStars />
                  <StarsBackground />
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children
}) => {
  return (
    <nav
      className="relative rounded-full border border-white/20 bg-white/5 backdrop-blur-md shadow-xl flex justify-center space-x-4 px-8 py-6 dark:bg-white/5 dark:border-white/10 w-100">
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src
}) => {
  return (
    <a href={href} className="flex space-x-2">
      <img
        src={src}
        width={140}
        height={70}
        alt={title}
        className="shrink-0 rounded-md shadow-2xl" />
      <div>
        <h4 className="text-xl font-bold mb-1 text-black dark:text-white">
          {title}
        </h4>
        <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
          {description}
        </p>
      </div>
    </a>
  );
};

export const HoveredLink = ({
  children,
  ...rest
}) => {
  return (
    <a
      {...rest}
      className="text-neutral-700 dark:text-neutral-200 hover:text-black">
      {children}
    </a>
  );
};

export const Link = ({
  children,
  ...rest
}) => {
  return (
    <a
      {...rest}
      className="text-white hover:text-emerald-600">
      {children}
    </a>
  );
};