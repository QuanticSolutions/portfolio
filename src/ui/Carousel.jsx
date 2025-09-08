"use client";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useState, useRef, useId, useEffect } from "react";

const Slide = ({ slide, index, current }) => {
  const slideRef = useRef(null);
  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef();

  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;
      slideRef.current.style.setProperty("--x", `${xRef.current}px`);
      slideRef.current.style.setProperty("--y", `${yRef.current}px`);
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  const handleMouseMove = (e) => {
    const el = slideRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    xRef.current = e.clientX - (r.left + r.width / 2);
    yRef.current = e.clientY - (r.top + r.height / 2);
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
  };

  const { text, title } = slide;

  return (
    <li
      ref={slideRef}
      className={`absolute top-0 left-0 w-screen h-screen transition-all duration-1000 ease-out flex items-center justify-center overflow-hidden ${
        current === index
          ? "opacity-100 z-10"
          : "opacity-0 z-0 pointer-events-none"
      }`}
    >
      {/* Animated Background with Cosmic Theme */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-teal-900 via-black-900 to-emerald-950 overflow-hidden"
        style={{
          transform:
            current === index
              ? "translate3d(calc(var(--x)/25), calc(var(--y)/25), 0) scale(1.05)"
              : "scale(1)",
        }}
      >

        {/* Glowing Orbs */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-20 animate-bounce"
              style={{
                left: `${Math.random() * 80 + 10}%`,
                top: `${Math.random() * 80 + 10}%`,
                width: `${Math.random() * 200 + 100}px`,
                height: `${Math.random() * 200 + 100}px`,
                background: `radial-gradient(circle, green 0%, transparent 70%)`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 8 + 6}s`,
              }}
            />
          ))}
        </div>

        {/* Cosmic Rays */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 300 + 200}px`,
                height: '2px',
                transform: `rotate(${Math.random() * 360}deg)`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${Math.random() * 4 + 3}s`,
              }}
            />
          ))}
        </div>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40" />
      </div>

      {/* Content */}
      <article 
        className="relative text-white text-left px-8 md:px-16 lg:px-24 max-w-6xl z-20"
        style={{
          transform:
            current === index
              ? "translate3d(calc(var(--x)/40), calc(var(--y)/40), 0)"
              : "none",
        }}
      >
        <div className="space-y-6">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-white via-emerald-200 to-teal-200 bg-clip-text text-transparent">
              {title}
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"></div>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed max-w-4xl">
            {text}
          </p>
          <div className="flex space-x-4 pt-4">
            <button className="px-8 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-full text-white font-semibold hover:from-teal-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25">
              Learn More
            </button>
            <button className="px-8 py-3 border border-white/30 rounded-full text-white font-semibold hover:bg-white/10 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
              Get Started
            </button>
          </div>
        </div>
      </article>

      {/* Timeline or Progress Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === current
                  ? 'bg-gradient-to-r from-emerald-400 to-teal-500 scale-125'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </li>
  );
};

const CarouselControl = ({ type, title, handleClick }) => (
  <button
    className={`w-14 h-14 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-full absolute top-1/2 transform -translate-y-1/2 z-30 border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-teal-500/25 ${
      type === "previous" ? "left-6" : "right-6"
    }`}
    title={title}
    onClick={handleClick}
  >
    <IconArrowNarrowRight
      className={`w-6 h-6 ${
        type === "previous" ? "rotate-180" : ""
      } text-white`}
    />
  </button>
);

export function Carousel({ slides = defaultSlides }) {
  const [current, setCurrent] = useState(0);

  const handlePreviousClick = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNextClick = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      <ul className="relative w-full h-full list-none m-0 p-0">
        {slides.map((slide, index) => (
          <Slide key={index} slide={slide} index={index} current={current} />
        ))}
      </ul>
      <CarouselControl
        type="previous"
        title="Previous"
        handleClick={handlePreviousClick}
      />
      <CarouselControl type="next" title="Next" handleClick={handleNextClick} />
    </div>
  );
}

// Default slides for demo
const defaultSlides = [
  {
    title: "Our Story",
    text: "Quantic Solutions is a forward-thinking digital company founded in 2021, focused on transforming ideas into innovative digital experiences. We help businesses grow through creative, tech-driven solutions tailored to their needs."
  },
  {
    title: "Innovation & Technology",
    text: "Our expert team thrives on solving complex challenges, building lasting client partnerships, and delivering impactful, future-ready results that push the boundaries of what's possible."
  },
  {
    title: "Future Vision",
    text: "We believe in creating digital experiences that not only meet today's needs but anticipate tomorrow's possibilities, ensuring our clients stay ahead in an ever-evolving digital landscape."
  }
];