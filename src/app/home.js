"use client";
import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import HeroSection from "@/ui/ParallexHero";
import { Clients } from "@/components/home/Clients";
import Cta from "@/components/home/Cta";
import FloatingStats from "@/components/home/FloatingStats";
import Testimonials from "@/components/home/Testimonials";

const SHAPES = ["cube", "sphere", "pyramid"];

const COLORS = [
  "from-green-400 to-teal-400",
  "from-teal-400 to-emerald-400",
  "from-emerald-400 to-green-400",
  "from-lime-400 to-emerald-500",
  "from-cyan-400 to-green-400",
];

const generateElements = (count = 10) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    delay: Math.random() * 5,
    left: Math.random() * 100,
    top: Math.random() * 100,
  }));
};

export const Float3DElements = () => {
  const elements = useMemo(() => generateElements(8), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className={`absolute w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${element.color} opacity-10 sm:opacity-20 blur-sm`}
          style={{
            left: `${element.left}%`,
            top: `${element.top}%`,
            borderRadius:
              element.shape === "sphere"
                ? "50%"
                : element.shape === "pyramid"
                ? "0 0 50% 50%"
                : "10px",
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, 50, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 12 + Math.random() * 8,
            repeat: Infinity,
            delay: element.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const SectionHeader = ({ children, className = "" }) => (
  <div
    className={`max-w-7xl relative mx-auto py-2 my-2 sm:py-3 md:py-4 md:my-4 lg:py-5 lg:my-5 px-3 sm:px-4 lg:px-6 w-full ${className}`}
  >
    <div className="bg-black/40 backdrop-blur-md rounded-lg border border-white/20 p-3 sm:p-4 md:p-5">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
        className="text-lg sm:text-xl md:text-3xl lg:text-5xl xl:text-6xl text-center font-bold uppercase bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent py-1"
      >
        {children}
      </motion.h1>
    </div>
  </div>
);


export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-black via-teal-900 to-black">
      <Float3DElements />
      <motion.div
        className="fixed top-0 left-0 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 pointer-events-none z-10"
        style={{
          background:
            "radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)",
          x: mousePosition.x - 128,
          y: mousePosition.y - 128,
        }}
      />
      <HeroSection products={products} />

      <section className="py-8 sm:py-10 md:py-12 lg:py-14 xl:py-16">
        <SectionHeader>Built with Our Clients, for Their Success</SectionHeader>
        <Clients />
      </section>

      <section className="py-8 sm:py-10 md:py-12 lg:py-14 xl:py-16 pb-12 sm:pb-14 md:pb-16 lg:pb-18">
        <Testimonials />
      </section>

      <section className="py-8 sm:py-10 md:py-12 lg:py-14 xl:py-16">
        <SectionHeader>By The Numbers</SectionHeader>
        <FloatingStats />
      </section>

      <section className="pt-8 sm:pt-10 md:pt-12 lg:pt-14 xl:pt-16">
        <Cta />
      </section>
    </section>
  );
}

export const products = [
  {
    title: "Smart Tender",
    link: "https://gomoonbeam.com",
    thumbnail: "/assets/custom/smarttender.jpg",
  },
  {
    title: "Booking Management",
    link: "https://cursor.so",
    thumbnail: "/assets/custom/Bookingmanagment.jpg",
  },
  {
    title: "Admin Panel Cars Finder Pro",
    link: "https://editorially.org",
    thumbnail: "/assets/custom/carsfinderproadmin.jpg",
  },
  {
    title: "TSB",
    link: "https://app.pixelperfect.quest",
    thumbnail: "/assets/wordpress/TSB.jpg",
  },
  {
    title: "Oware 360",
    link: "https://editorially.org",
    thumbnail: "/assets/custom/Oware360.jpg",
  },
  {
    title: "Duct Cleaning",
    link: "https://editorially.org",
    thumbnail: "/assets/custom/ductcleaning.jpg",
  },
  {
    title: "Custom Taxi Admin Panel",
    link: "https://editorially.org",
    thumbnail: "/assets/custom/customtaxiadminpanel.jpg",
  },
  {
    title: "Cars Finder Pro",
    link: "https://carsfinderpro.com",
    thumbnail: "/assets/custom/carsfinderpro.jpg",
  },
  {
    title: "Glitch X",
    link: "https://editorially.org",
    thumbnail: "/assets/wordpress/glicthx.jpg",
  },
  {
    title: "Owl Watch Services",
    link: "https://owlwatchservices.quanticsols.com/",
    thumbnail: "/assets/wordpress/Owl.jpg",
  },
];
