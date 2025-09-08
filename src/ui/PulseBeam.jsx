import React from "react";
import { motion } from "framer-motion";
import {
  Code,
  Database,
  Server,
  Smartphone,
  Globe,
  Cpu,
  Cloud,
  Terminal,
  Layers,
  GitBranch,
  Settings,
  Monitor,
  Zap,
  Shield,
  Lock,
  Wifi,
  HardDrive,
  Activity,
  Box,
  Wrench,
  Binary,
  Braces,
  FileCode,
  Workflow,
  Network,
  Laptop,
  Tablet,
  Gauge,
  Bug,
  Folder,
} from "lucide-react";

const TechStackHeroSection = () => {
  const techStackIcons = [
    { Icon: Code, position: "top-8 left-12", type: "glow-emerald", size: "w-5 h-5", label: "React" },
    { Icon: Monitor, position: "top-12 left-32", type: "glow-teal", size: "w-6 h-6", label: "Frontend" },
    { Icon: Smartphone, position: "top-6 left-52", type: "outline", size: "w-4 h-4" },
    { Icon: Tablet, position: "top-16 right-48", type: "glow-green", size: "w-7 h-7", label: "Mobile" },
    { Icon: Globe, position: "top-8 right-28", type: "outline", size: "w-5 h-5" },
    { Icon: Layers, position: "top-4 right-12", type: "outline", size: "w-4 h-4" },

    { Icon: Server, position: "top-24 left-8", type: "glow-emerald", size: "w-8 h-8", label: "Node.js" },
    { Icon: Database, position: "top-36 left-16", type: "outline", size: "w-5 h-5" },
    { Icon: Cloud, position: "top-48 left-4", type: "outline", size: "w-6 h-6" },
    { Icon: HardDrive, position: "top-60 left-12", type: "glow-teal", size: "w-7 h-7", label: "Database" },
    { Icon: Terminal, position: "bottom-32 left-8", type: "outline", size: "w-5 h-5" },
    { Icon: Binary, position: "bottom-20 left-20", type: "outline", size: "w-4 h-4" },

    { Icon: GitBranch, position: "top-28 right-8", type: "glow-green", size: "w-8 h-8", label: "Git" },
    { Icon: Settings, position: "top-40 right-16", type: "outline", size: "w-5 h-5" },
    { Icon: Cpu, position: "top-52 right-4", type: "outline", size: "w-6 h-6" },
    { Icon: Activity, position: "top-64 right-12", type: "glow-teal", size: "w-7 h-7", label: "Analytics" },
    { Icon: Shield, position: "bottom-32 right-8", type: "outline", size: "w-5 h-5" },
    { Icon: Lock, position: "bottom-20 right-20", type: "outline", size: "w-4 h-4" },

    { Icon: FileCode, position: "bottom-12 left-24", type: "outline", size: "w-5 h-5" },
    { Icon: Workflow, position: "bottom-8 left-44", type: "outline", size: "w-4 h-4" },
    { Icon: Network, position: "bottom-16 left-64", type: "outline", size: "w-5 h-5" },
    { Icon: Wifi, position: "bottom-6 right-44", type: "outline", size: "w-4 h-4" },
    { Icon: Gauge, position: "bottom-12 right-32", type: "outline", size: "w-5 h-5" },
    { Icon: Wrench, position: "bottom-8 right-52", type: "outline", size: "w-4 h-4" },

    { Icon: Box, position: "top-20 left-64", type: "outline", size: "w-4 h-4" },
    { Icon: Braces, position: "top-32 left-44", type: "outline", size: "w-5 h-5" },
    { Icon: Zap, position: "top-44 right-32", type: "outline", size: "w-6 h-6" },
    { Icon: Bug, position: "top-56 left-28", type: "outline", size: "w-5 h-5" },
    { Icon: Folder, position: "bottom-28 left-52", type: "outline", size: "w-4 h-4" },
    { Icon: Laptop, position: "bottom-24 right-64", type: "outline", size: "w-5 h-5" },
  ];

  return (
    <div className="w-full relative bg-gradient-to-br from-black via-10% to-emerald-900">
      <div className="relative isolate overflow-hidden shadow-2xl px-6 pt-16 sm:px-16 md:pt-24 lg:px-24 lg:pt-0">
        {/* Background gradient overlay */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-teal-600 via-teal-800 to-transparent pointer-events-none z-20" />

        {/* Radial Glow */}
        <svg
          viewBox="0 0 1024 1024"
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -z-10 size-256 -translate-y-1/2 mask-[radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
        >
          <circle
            r={512}
            cx={512}
            cy={512}
            fill="url(#teal-radial)"
            fillOpacity="0.7"
          />
          <defs>
            <radialGradient id="teal-radial">
              <stop stopColor="#10B981" />
              <stop offset="1" stopColor="#134E4A" />
            </radialGradient>
          </defs>
        </svg>

        {/* Grid Layout */}
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center lg:text-left"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent animate-pulse sm:text-4xl">
              Build the Future with Advanced Web Apps
            </h2>
            <p className="mt-6 text-lg text-gray-300">
              From concept to scalable reality — fast, secure, and built to grow with your business.
            </p>
            <div className="mt-5 flex items-center justify-center lg:justify-start">
              <button
                className="group relative z-10 w-full max-w-xs sm:max-w-none sm:w-auto px-5 sm:px-6 md:px-8 lg:px-10 py-3 sm:py-4 md:py-5 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-500 hover:scale-105 sm:hover:scale-110 overflow-hidden text-sm sm:text-base"
                onClick={() => {
                  window.location.href = "/web";
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                  View Projects
                  <motion.div
                    className="w-2 h-2 bg-white rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
              </button>
            </div>
          </motion.div>

          {/* Right: Image with floating icons */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative flex justify-center mt-20"
          >
            <img
              alt="App screenshot"
              src="/assets/UI-Portfolio/Web/Custom/CarFinderpro.jpg"
              className="max-w-full h-auto rounded-md bg-white/5 ring-1 ring-white/10 shadow-xl"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TechStackHeroSection;
