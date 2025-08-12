"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";


export default function GlowingHero() {
  const rootRef = useRef(null);
  const [pointer, setPointer] = useState({ x: 0.5, y: 0.5 }); // normalized
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const handleMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width; // 0..1
      const y = (e.clientY - r.top) / r.height; // 0..1
      setPointer({ x, y });

      // small tilt for container
      const rx = (y - 0.5) * 6; // rotateX
      const ry = (x - 0.5) * -10; // rotateY
      setTilt({ rx, ry });
    };

    const handleLeave = () => {
      setPointer({ x: 0.5, y: 0.5 });
      setTilt({ rx: 0, ry: 0 });
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  // gradient background position based on pointer
  const bgPosX = `${20 + pointer.x * 60}%`;
  const bgPosY = `${20 + pointer.y * 60}%`;

  const headingWords = ["Build", "better", "with", "QS"];

  return (
    <header
      ref={rootRef}
      className="relative isolate overflow-hidden bg-black min-h-[56vh] sm:min-h-[65vh] md:min-h-[75vh] lg:min-h-screen xl:min-h-screen flex items-end sm:items-center md:items-center"
      style={{
        // subtle 3D transform based on tilt
        transform: `perspective(1200px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transition: "transform 250ms ease-out",
      }}
    >
      {/* Background gradient blobs */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(circle at ${bgPosX} ${bgPosY}, rgba(16,185,129,0.12), transparent 12%), radial-gradient(circle at 80% 75%, rgba(20,184,166,0.08), transparent 18%), linear-gradient(180deg,#000000 0%, #001118 60%)`,
          backgroundBlendMode: "screen, screen, normal",
        }}
      />

      {/* Subtle noise overlay (optional) */}
      <div className="absolute inset-0 -z-5 opacity-5 pointer-events-none bg-[url('/textures/noise.png')]"></div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-24">
        <div className="relative flex flex-col lg:flex-row items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {/* Left: text content */}
          <div className="w-full lg:w-7/12 text-center lg:text-left">
            <div className="inline-block rounded-full bg-emerald-800/40 border border-emerald-600/30 px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm text-emerald-200 mb-4 sm:mb-6">
              Let's Build The Next
            </div>

            {/* Interactive heading */}
            <h1 className="font-extrabold leading-tight text-white drop-shadow-[0_6px_30px_rgba(0,0,0,0.6)]">
              <span className="block text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[2.6rem] 2xl:text-[3.2rem] font-medium text-slate-300 mb-2 sm:mb-3">
                {/* small subtitle line */}
                Building the Digital Future, One Solution at a Time
              </span>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3">
                {headingWords.map((word, i) => {
                  // compute small parallax offset per word
                  const offsetX =
                    (pointer.x - 0.5) * (i - headingWords.length / 2) * 12;
                  const offsetY = (pointer.y - 0.5) * 10;
                  return (
                    <span
                      key={word + i}
                      className="relative cursor-default inline-block"
                      style={{
                        transform: `translate3d(${offsetX}px, ${offsetY}px, 0)`,
                        transition: "transform 220ms cubic-bezier(.2,.8,.2,1)",
                      }}
                    >
                      <InteractiveWord text={word} />
                    </span>
                  );
                })}
              </div>
            </h1>

            <p className="mt-4 sm:mt-6 md:mt-8 text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl text-slate-300 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              From custom web and mobile applications to enterprise-level
              systems, our team combines creativity, technical expertise, and
              future-driven thinking to deliver solutions that truly make an
              impact.
            </p>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <button className="group relative z-10 w-full sm:w-auto px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold text-sm sm:text-base rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-500 hover:scale-110 overflow-hidden"
                onClick={()=>{window.location.href = "/contact"}}
              >
                <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                  Get Started
                  <motion.div
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
              </button>

              <a
                href="/contact"
                className="text-emerald-300 hover:text-emerald-100 text-sm sm:text-base transition"
              >
                Learn more →
              </a>
            </div>
          </div>

          {/* Right: glowing arc & visual */}
          <div className="w-full lg:w-5/12 flex items-center justify-center lg:justify-end mt-6 lg:mt-0">
            <div className="relative w-[280px] h-[140px] sm:w-[320px] sm:h-[160px] md:w-[400px] md:h-[200px] lg:w-[480px] lg:h-[240px] xl:w-[520px] xl:h-[260px]">
              {/* blurred glow behind arc */}
              <div
                className="absolute inset-0 rounded-full filter blur-2xl sm:blur-3xl opacity-60 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 50% 70%, rgba(16,185,129,0.35), rgba(16,185,129,0.06) 40%, transparent 60%)",
                }}
              />

              {/* SVG semicircle with stroked glow */}
              <svg
                viewBox="0 0 800 400"
                preserveAspectRatio="xMidYMid meet"
                className="w-full h-full"
              >
                <defs>
                  <filter
                    id="glow1"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
                    <feGaussianBlur stdDeviation="18" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  <linearGradient
                    id="grad-teal"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.95" />
                    <stop offset="50%" stopColor="#10b981" stopOpacity="0.95" />
                    <stop
                      offset="100%"
                      stopColor="#34d399"
                      stopOpacity="0.95"
                    />
                  </linearGradient>
                </defs>

                {/* background faint arc (thicker blurred outer glow) */}
                <path
                  d="M50 360 C 200 60, 600 60, 750 360"
                  stroke="url(#grad-teal)"
                  strokeWidth="10"
                  fill="none"
                  opacity="0.12"
                  strokeLinecap="round"
                  filter="url(#glow1)"
                />

                {/* main arc stroke */}
                <path
                  d="M70 360 C 200 100, 600 100, 730 360"
                  stroke="url(#grad-teal)"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                />

                {/* small star particles above the arc (animated via CSS) */}
                <g className="opacity-80">
                  <circle
                    cx="200"
                    cy="200"
                    r="2"
                    fill="#34d399"
                    className="animate-pulse-slow"
                  />
                  <circle
                    cx="420"
                    cy="170"
                    r="1.6"
                    fill="#05b6c1"
                    className="animate-pulse-slower"
                  />
                  <circle
                    cx="520"
                    cy="190"
                    r="1.4"
                    fill="#14b8a6"
                    className="animate-pulse-slower"
                  />
                </g>

                {/* reflection / floor */}
                <ellipse
                  cx="400"
                  cy="375"
                  rx="220"
                  ry="24"
                  fill="rgba(8,14,12,0.45)"
                  opacity="0.35"
                />
              </svg>

              {/* small interactive glow center */}
              <div
                style={{
                  left: `${40 + pointer.x * 52}%`,
                  top: `${60 + pointer.y * 32}%`,
                }}
                className="absolute w-16 h-6 sm:w-20 sm:h-7 md:w-24 md:h-8 lg:w-32 lg:h-10 xl:w-36 xl:h-12 rounded-full pointer-events-none mix-blend-screen"
              >
                <div
                  className="w-full h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, rgba(16,185,129,0.24), rgba(6,182,212,0.18), rgba(52,211,153,0.14))`,
                    filter: "blur(18px)",
                    opacity: 0.95,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* small css animations */}
      <style jsx>{`
        @keyframes pulseSlow {
          0% {
            transform: scale(1);
            opacity: 0.9;
          }
          50% {
            transform: scale(1.35);
            opacity: 0.5;
          }
          100% {
            transform: scale(1);
            opacity: 0.9;
          }
        }
        .animate-pulse-slow {
          animation: pulseSlow 3.6s ease-in-out infinite;
          transform-origin: center;
        }
        .animate-pulse-slower {
          animation: pulseSlow 5s ease-in-out infinite;
          transform-origin: center;
        }

        /* interactive word hover */
        .interactive-word {
          display: inline-block;
          padding: 0.1rem 0.25rem;
          border-radius: 0.375rem;
          transition: transform 180ms ease, background 250ms ease,
            color 250ms ease;
        }
        
        @media (min-width: 640px) {
          .interactive-word {
            padding: 0.12rem 0.35rem;
          }
        }
        
        .interactive-word:hover {
          transform: translateY(-6px) scale(1.03);
          background: linear-gradient(
            90deg,
            rgba(16, 185, 129, 0.12),
            rgba(6, 182, 212, 0.08)
          );
          color: #ddfff3;
          box-shadow: 0 8px 30px rgba(16, 185, 129, 0.14);
        }
      `}</style>
    </header>
  );
}

/** InteractiveWord: gradient text with small hover & accessibility */
function InteractiveWord({ text }) {
  return (
    <span
      className="interactive-word"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          // small keyboard "press" effect
          e.currentTarget.animate(
            [
              { transform: "translateY(0px)" },
              { transform: "translateY(-6px)" },
              { transform: "translateY(0px)" },
            ],
            { duration: 220, easing: "ease-out" }
          );
        }
      }}
    >
      <span className="font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-teal-300 to-teal-100">
        {text}
      </span>
    </span>
  );
}