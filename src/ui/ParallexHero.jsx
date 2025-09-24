"use client";
import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { TypewriterEffect } from "./TypeWriter";
import { InfiniteMovingCardsDemo } from "@/components/home/HeroSlider";

export const HeroParallax = ({ products }) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  return (
    <div
      ref={ref}
      className="min-h-screen sm:h-[110vh] lg:h-[130vh] py-4 sm:py-8 lg:py-12 xl:py-20 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: "url('/assets/images/hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          y: useTransform(scrollYProgress, [0, 1], [0, -200]),
        }}
      />
      <Header />
      <div className="w-full flex items-center justify-center max-w-7xl relative mx-auto py-6 sm:py-8 md:py-10 lg:py-12 px-4 sm:px-6 lg:px-8">
        <InfiniteMovingCardsDemo />
      </div>
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
    <div  className="max-w-7xl relative mx-auto pt-24 pb-10 sm:pt-20 sm:pb-12 md:pt-24 md:pb-16 lg:pt-28 lg:pb-20 xl:pt-32 xl:pb-24 px-4 sm:px-6 lg:px-8 w-full left-0 text-center">
      <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent animate-pulse leading-tight">
          QUANTIC SOLUTIONS
        </h1>
      </div>
      <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-14 text-center">
        <TypewriterEffect words={words} className={"text-center"} />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
        className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 items-center justify-center max-w-2xl mx-auto"
      >
        <button
          className="group relative z-10 w-full sm:w-auto min-w-[200px] px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-4 md:py-5 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-500 hover:scale-105 overflow-hidden text-sm sm:text-base md:text-lg"
          onClick={() => {
            window.location.href = "/services";
          }}
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

        <button
          className="group relative z-10 w-full sm:w-auto min-w-[200px] px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-4 md:py-5 border-2 border-green-400 text-green-400 font-bold rounded-full hover:bg-green-400 hover:text-black transition-all duration-500 hover:scale-105 backdrop-blur-sm overflow-hidden text-sm sm:text-base md:text-lg"
          onClick={() => {
            window.location.href = "/contact";
          }}
        >
          <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
            Get a Quote
            <motion.div
              className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 border-2 border-current rounded-full flex items-center justify-center"
              transition={{ duration: 0.5 }}
            >
              <div className="w-1.5 sm:w-2 md:w-2.5 h-1.5 sm:h-2 md:h-2.5 bg-current rounded-full" />
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
      <h2 className="absolute bottom-3 sm:bottom-4 md:bottom-5 left-3 sm:left-4 md:left-5 opacity-0 group-hover/product:opacity-100 text-white text-xs sm:text-sm md:text-base lg:text-lg font-medium transition-opacity duration-300 line-clamp-2">
        {product.title}
      </h2>
    </motion.div>
  );
};
