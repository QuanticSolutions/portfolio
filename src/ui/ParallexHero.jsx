"use client";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { InfiniteMovingCardsDemo } from "@/components/home/HeroSlider";

/* ─────────────────────────────────────────────
   Grid background
───────────────────────────────────────────── */
function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg width="100%" height="100%" className="opacity-[0.032]">
        <defs>
          <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#10b981" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>
      <svg width="100%" height="100%" className="absolute inset-0 opacity-[0.022]">
        {[...Array(6)].map((_, i) => (
          <line
            key={i}
            x1={`${-10 + i * 25}%`} y1="0"
            x2={`${10 + i * 25}%`}  y2="100%"
            stroke="#34d399" strokeWidth="0.6"
          />
        ))}
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Floating orbs
───────────────────────────────────────────── */
function FloatingOrbs() {
  const orbs = useMemo(() => [
    { w: 460, h: 460, top: "-10%", left: "-8%",  color: "rgba(16,185,129,0.07)", dur: 14 },
    { w: 340, h: 340, top: "50%",  right: "-5%", color: "rgba(52,211,153,0.05)", dur: 18 },
    { w: 220, h: 220, top: "18%",  left: "58%",  color: "rgba(6,182,212,0.055)", dur: 11 },
    { w: 160, h: 160, top: "68%",  left: "22%",  color: "rgba(16,185,129,0.04)", dur: 16 },
  ], []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{ width: orb.w, height: orb.h, top: orb.top, left: orb.left, right: orb.right, background: orb.color }}
          animate={{ y: [0, -38, 0], x: [0, 18, 0], scale: [1, 1.07, 1] }}
          transition={{ duration: orb.dur, repeat: Infinity, ease: "easeInOut", delay: i * 2 }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Cursor glow
───────────────────────────────────────────── */
function CursorGlow() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 80, damping: 20 });
  const sy = useSpring(y, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const move = (e) => { x.set(e.clientX - 200); y.set(e.clientY - 200); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      className="fixed w-[400px] h-[400px] rounded-full pointer-events-none z-0"
      style={{ left: sx, top: sy, background: "radial-gradient(circle, rgba(16,185,129,0.09) 0%, transparent 70%)" }}
    />
  );
}

/* ─────────────────────────────────────────────
   Typewriter
───────────────────────────────────────────── */
const ROTATE_WORDS = ["Reality.", "Innovation.", "Excellence.", "Impact."];

function TypewriterWord() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = ROTATE_WORDS[wordIndex];
    let t;
    if (!deleting && displayed.length < target.length)
      t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 80);
    else if (!deleting && displayed.length === target.length)
      t = setTimeout(() => setDeleting(true), 1800);
    else if (deleting && displayed.length > 0)
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    else { setDeleting(false); setWordIndex((i) => (i + 1) % ROTATE_WORDS.length); }
    return () => clearTimeout(t);
  }, [displayed, deleting, wordIndex]);

  return (
    <span className="inline-block">
      <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-green-400 bg-clip-text text-transparent">
        {displayed}
      </span>
      <span className="animate-pulse text-emerald-400">|</span>
    </span>
  );
}

/* ─────────────────────────────────────────────
   Corner bracket
───────────────────────────────────────────── */
function Bracket({ className = "" }) {
  return (
    <div className={`absolute w-5 h-5 ${className}`}>
      <div className="absolute top-0 left-0 w-full h-[1.5px] bg-emerald-400/50" />
      <div className="absolute top-0 left-0 w-[1.5px] h-full bg-emerald-400/50" />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Stat counter
───────────────────────────────────────────── */
function StatCounter({ end, suffix = "", label }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const done = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        let n = 0;
        const step = end / 50;
        const t = setInterval(() => {
          n += step;
          if (n >= end) { setCount(end); clearInterval(t); }
          else setCount(Math.floor(n));
        }, 30);
      }
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-1">
      <span className="font-black text-xl sm:text-2xl bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
        {count}{suffix}
      </span>
      <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-gray-500 text-center">{label}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main HeroSection  — accepts same `products`
   prop as HeroParallax so it's a drop-in swap
───────────────────────────────────────────── */
export default function HeroSection({ products = [] }) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -160]);

  const container = { hidden: {}, visible: { transition: { staggerChildren: 0.09 } } };
  const item      = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } } };
  const lineIn    = { hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.25 } } };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-gradient-to-br from-black via-[#020f0a] to-black flex flex-col"
    >
      {/* ── Parallax background image (from original HeroParallax) ── */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: "url('/assets/images/hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          y: bgY,
        }}
      />
      {/* Dark overlay so text stays readable over the bg image */}
      <div className="absolute inset-0 bg-black/65 -z-10" />

      <CursorGlow />
      <FloatingOrbs />
      <GridBackground />

      {/* Bottom fade into page */}
      <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />

      {/* ────────────────────────────────────────
          ABOVE-FOLD TEXT BLOCK
      ──────────────────────────────────────── */}
      <div className="relative z-20 px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 pt-32 sm:pt-36 pb-8">
        <motion.div variants={container} initial="hidden" animate="visible">

          {/* Eyebrow */}
          <motion.div variants={item} className="flex flex-wrap items-center gap-3 mb-7">
            <div className="relative">
              <Bracket className="top-0 left-0" />
              <Bracket className="bottom-0 right-0 rotate-180" />
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-emerald-400 px-4 py-2 block">
                // Est. 2020 — Software Agency
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">Available for Projects</span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.div variants={item} className="mb-3">
            <h1 className="font-black uppercase leading-[0.88] tracking-tight">
              <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[7rem] text-white/90">
                Quantic
              </span>
              <div className="flex items-end gap-4 sm:gap-6">
                <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[7rem]
                  bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent
                  drop-shadow-[0_0_40px_rgba(16,185,129,0.3)]">
                  Solutions
                </span>
                <motion.div
                  className="hidden md:block w-[3px] rounded-full bg-gradient-to-b from-emerald-400 to-transparent mb-2 origin-top"
                  style={{ height: 64 }}
                  variants={lineIn}
                />
              </div>
            </h1>
          </motion.div>

          {/* Horizontal rule */}
          <motion.div
            variants={lineIn}
            className="h-px bg-gradient-to-r from-emerald-400/60 via-teal-400/20 to-transparent origin-left mb-7"
          />

          {/* Subheading + description */}
          <motion.div variants={item} className="mb-8">
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white/80 leading-snug max-w-2xl">
              Turn raw ideas into <TypewriterWord />
            </p>
            <p className="mt-3 font-mono text-xs sm:text-sm text-gray-500 max-w-lg leading-relaxed">
              We design, build &amp; scale custom software — from MVPs to enterprise platforms.
              Think, customize &amp; create the tech.
            </p>
          </motion.div>

          {/* CTA row */}
          <motion.div variants={item} className="flex flex-wrap items-center gap-4 mb-10">
            <Link href="/services">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="relative group overflow-hidden px-7 py-3.5 rounded-full
                  bg-gradient-to-r from-emerald-500 to-teal-500 text-black
                  font-bold text-sm uppercase tracking-widest
                  shadow-[0_0_28px_rgba(16,185,129,0.35)]
                  hover:shadow-[0_0_42px_rgba(16,185,129,0.55)] transition-shadow duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Our Services
                  <span className="w-1.5 h-1.5 rounded-full bg-black/60" />
                </span>
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700
                  bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
              </motion.button>
            </Link>

            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="relative px-7 py-3.5 rounded-full
                  border border-emerald-400/40 hover:border-emerald-400/80
                  text-white/80 hover:text-white font-bold text-sm uppercase tracking-widest
                  transition-all duration-300 backdrop-blur-sm
                  hover:bg-emerald-400/5 hover:shadow-[0_0_18px_rgba(16,185,129,0.15)]"
              >
                <span className="flex items-center gap-2.5">
                  Get a Quote
                  <span className="w-5 h-5 rounded-full border border-emerald-400/60 flex items-center justify-center text-emerald-400 text-xs">
                    ↗
                  </span>
                </span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats strip */}
          <motion.div variants={item}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-px bg-emerald-400/40" />
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-gray-600">By the numbers</span>
            </div>
            <div className="flex flex-wrap gap-7 sm:gap-12">
              <StatCounter end={50}  suffix="+" label="Projects Delivered" />
              <StatCounter end={30}  suffix="+" label="Happy Clients"       />
              <StatCounter end={5}   suffix="+" label="Years Experience"    />
              <StatCounter end={99}  suffix="%" label="Client Satisfaction" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ────────────────────────────────────────
          PRODUCT IMAGE SLIDER
          (from original InfiniteMovingCardsDemo)
      ──────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 pb-16"
      >
        {/* Subtle section label above slider */}
        <div className="flex items-center gap-3 mb-5 px-2">
          <div className="w-4 h-px bg-emerald-400/40" />
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-gray-600">
            Featured Work
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-emerald-400/10 to-transparent" />
        </div>

        {/* The original slider component — unchanged */}
        <InfiniteMovingCardsDemo />
      </motion.div>

      {/* ── Side scroll hint (desktop) ── */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-6 xl:right-16 top-1/3 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3 z-30"
      >
        <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-gray-600 [writing-mode:vertical-lr]">
          Scroll to explore
        </span>
        <motion.div
          className="w-px bg-gradient-to-b from-emerald-400/60 to-transparent"
          initial={{ height: 0 }}
          animate={{ height: 70 }}
          transition={{ duration: 1.2, delay: 1.3 }}
        />
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-1 h-1 rounded-full bg-emerald-400"
        />
      </motion.div>

      {/* ── Tech stack pills ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="absolute bottom-[4.5rem] left-6 sm:left-10 md:left-16 lg:left-24 xl:left-32 z-30
          flex items-center gap-2 flex-wrap"
      >
        {["Next.js", "React", "Node.js", "WordPress", "Flutter", "AWS"].map((tech, i) => (
          <motion.span
            key={tech}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 + i * 0.07, duration: 0.3 }}
            className="px-2.5 py-1 rounded font-mono text-[9px] uppercase tracking-wider
              border border-white/[0.07] text-gray-500 bg-black/30 backdrop-blur-sm
              hover:border-emerald-400/30 hover:text-emerald-400 transition-all duration-300 cursor-default"
          >
            {tech}
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
}
