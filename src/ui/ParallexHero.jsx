"use client";
import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { TypewriterEffect } from "./TypeWriter";
import { Boxes } from "./BackgroundWithBoxes";

export const HeroParallax = ({ products }) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  // const translateX = useSpring(
  //   useTransform(scrollYProgress, [0, 1], [0, window.innerWidth < 768 ? 300 : 1000]),
  //   springConfig
  // );
  // const translateXReverse = useSpring(
  //   useTransform(scrollYProgress, [0, 1], [0, window.innerWidth < 768 ? -300 : -1000]),
  //   springConfig
  // );
  // const rotateX = useSpring(
  //   useTransform(scrollYProgress, [0, 0.2], [15, 0]),
  //   springConfig
  // );
  // const opacity = useSpring(
  //   useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
  //   springConfig
  // );
  // const rotateZ = useSpring(
  //   useTransform(scrollYProgress, [0, 0.2], [20, 0]),
  //   springConfig
  // );
  // const translateY = useSpring(
  //   useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
  //   springConfig
  // );

  return (
    <div
      ref={ref}
      className="sm:h-[90vh] lg:h-[100vh] py-2 sm:py-12 lg:py-20 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      
      <Header />
      
      {/* Hide projects on mobile (< 640px), show on sm and above */}
      {/* <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="hidden sm:block"
      >
        <div className="max-w-7xl relative mx-auto py-4 sm:py-6 md:py-8 lg:py-10 px-4 w-full left-0 top-0">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl text-center font-bold uppercase bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent animate-pulse py-2">
            Projects That Made an Impact
          </h1>
        </div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-12 xl:space-x-20 mb-8 sm:mb-12 md:mb-16 lg:mb-20 px-4 sm:px-6 lg:px-8">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-8 sm:mb-12 md:mb-16 lg:mb-20 space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-12 xl:space-x-20 px-4 sm:px-6 lg:px-8">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-12 xl:space-x-20 px-4 sm:px-6 lg:px-8">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div> */}
    </div>
  );
};

export const Header = () => {
  const words = [
    {
      text: "Turn ",
    },
    {
      text: "raw ",
    },
    {
      text: "ideas",
    },
    {
      text: "into ",
    },
    {
      text: "redefined ",
    },
    {
      text: "digital",
    },
    {
      text: "solutions.",
      className:
        "bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent",
    },
  ];

  return (
    <div className="max-w-7xl relative mx-auto py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 lg:px-8 w-full left-0 top-20">
      {/* Main Title */}
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent animate-pulse py-2 text-center sm:text-left">
        QUANTIC SOLUTIONS
      </h1>

      {/* Typewriter Effect */}
      <div className="py-2 sm:py-3 text-center sm:text-left">
        <TypewriterEffect words={words} />
      </div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
        className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 py-4 sm:py-3 md:py-4 items-center sm:items-start justify-center sm:justify-start"
      >
        <button className="group relative z-10 w-full max-w-xs sm:max-w-none sm:w-auto px-5 sm:px-6 md:px-8 lg:px-10 py-3 sm:py-4 md:py-5 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-500 hover:scale-105 sm:hover:scale-110 overflow-hidden text-sm sm:text-base"
          onClick={()=>{window.location.href = "/services"}}
        >
          <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
            Our Services
            <motion.div
              className="w-2 h-2 bg-white rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
        </button>

        <button className="group relative z-10 w-full max-w-xs sm:max-w-none sm:w-auto px-5 sm:px-6 md:px-8 lg:px-10 py-3 sm:py-4 md:py-5 border-2 border-green-400 text-green-400 font-bold rounded-full hover:bg-green-400 hover:text-black transition-all duration-500 hover:scale-105 sm:hover:scale-110 backdrop-blur-sm overflow-hidden text-sm sm:text-base"
          onClick={()=>{window.location.href = "/contact"}}
        >
          <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
            Get a Quote
            <motion.div
              className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 border-2 border-current rounded-full flex items-center justify-center"
              transition={{ duration: 0.5 }}
            >
              <div className="w-1 sm:w-1.5 md:w-2 h-1 sm:h-1.5 md:h-2 bg-current rounded-full" />
            </motion.div>
          </span>
          <div className="absolute inset-0 bg-green-400/10 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
        </button>
      </motion.div>
    </div>
  );
};

export const ProductCard = ({ product, translate }) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      key={product.title}
      className="group/product h-40 w-40 sm:h-48 sm:w-48 md:h-56 md:w-56 lg:h-72 lg:w-72 xl:h-80 xl:w-80 2xl:h-96 2xl:w-[30rem] relative shrink-0 rounded-lg overflow-hidden"
    >
      <a href={product.link} className="block group-hover/product:shadow-2xl">
        <img
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-center sm:object-left-top absolute h-full w-full inset-0 transition-transform duration-500 group-hover/product:scale-110"
          alt={product.title}
        />
      </a>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none transition-opacity duration-300"></div>
      <h2 className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-2 sm:left-3 md:left-4 opacity-0 group-hover/product:opacity-100 text-white text-xs sm:text-sm md:text-base lg:text-lg font-medium transition-opacity duration-300 line-clamp-2">
        {product.title}
      </h2>
    </motion.div>
  );
};