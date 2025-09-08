import { motion } from "framer-motion";
import { useState } from "react";
import AnimatedBackground from "./AnimatedBackground"; // Custom animated SVG background

const slides = [
  {
    title: "OUR STORY",
    text: "Quantic Solutions was built to shape the future through digital transformation...",
  },
  {
    title: "WHY CHOOSE US",
    text: "We specialize in innovation, reliability, and human-centered design...",
  },
  {
    title: "OUR MISSION",
    text: "To empower businesses by merging technology with vision...",
  },
];

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <svg
        className="w-full h-full"
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="glow" r="75%" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.05" />
          </radialGradient>
        </defs>
        <circle cx="400" cy="300" r="300" fill="url(#glow)" filter="url(#blur)" />
        <filter id="blur">
          <feGaussianBlur stdDeviation="90" />
        </filter>
      </svg>
    </div>
  );
}

export default function AboutSlides() {
  const [index, setIndex] = useState(0);
  const current = slides[index];

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden text-white">
      <AnimatedBackground />

      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 z-10">
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {current.title}
        </motion.h1>

        <motion.p
          className="mt-6 max-w-2xl text-lg md:text-xl text-gray-200"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {current.text}
        </motion.p>
        <div className="mt-12 flex gap-4">
          <button
            onClick={() => setIndex((prev) => (prev - 1 + slides.length) % slides.length)}
            className="px-4 py-2 rounded-full border border-emerald-400 text-emerald-300 hover:bg-emerald-600/20 transition"
          >
            Prev
          </button>
          <button
            onClick={() => setIndex((prev) => (prev + 1) % slides.length)}
            className="px-4 py-2 rounded-full border border-emerald-400 text-emerald-300 hover:bg-emerald-600/20 transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
