"use client";
import React, { useEffect, useState } from "react";
import { TypewriterEffect } from "@/ui/TypeWriter";
import { motion } from "framer-motion";

const Cta = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth < 640);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  const words = [
    { text: "We" },
    { text: "Make" },
    { text: "Creative" },
    { text: "Solutions" },
    { text: "For" },
    {
      text: "Modern",
      className:
        "text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400",
    },
    {
      text: "Brands",
      className:
        "text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400",
    },
  ];

  // Icons as before...
  const ShopifyIcon = () => <svg className="w-8 h-8"><use href="/assets/service-icons/Shopify.svg" /></svg>;
  const WordPressIcon = () => <svg className="w-8 h-8"><use href="/assets/service-icons/Wordpress.svg" /></svg>;
  const ReactIcon = () => <svg className="w-8 h-8"><use href="/assets/service-icons/React.svg" /></svg>;
  const PhotoshopIcon = () => <svg className="w-8 h-8"><use href="/assets/service-icons/PS.svg" /></svg>;
  const IllustratorIcon = () => <svg className="w-8 h-8"><use href="/assets/service-icons/AI.svg" /></svg>;
  const FigmaIcon = () => <svg className="w-8 h-8"><use href="/assets/service-icons/Figma.svg" /></svg>;
  const FlutterIcon = () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
      <path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.37zm.159 11.871L11.91 14.456l-4.615-4.614L21.017 6.12l-7.37 7.37v4.905h7.37L13.97 24 8.893 18.923z" />
    </svg>
  );
  const ElementorIcon = () => <svg className="w-8 h-8"><use href="/assets/service-icons/Elementor.svg" /></svg>;

  const icons = [
    { component: ShopifyIcon },
    { component: WordPressIcon },
    { component: ReactIcon },
    { component: PhotoshopIcon },
    { component: IllustratorIcon },
    { component: FigmaIcon },
    { component: FlutterIcon },
    { component: ElementorIcon },
  ];

  const glowAnimation = {
    boxShadow: [
      "0 0 20px rgba(16, 185, 129, 0.3)",
      "0 0 40px rgba(16, 185, 129, 0.6)",
      "0 0 20px rgba(16, 185, 129, 0.3)",
    ],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  };

  const positionsMobile = [
    { top: "5%", left: "10%" },
    { top: "15%", right: "10%" },
    { top: "25%", left: "8%" },
    { bottom: "35%", right: "12%" },
    { bottom: "25%", left: "15%" },
    { top: "10%", left: "55%" },
    { bottom: "15%", right: "25%" },
    { top: "35%", right: "8%" },
  ];

  const positionsDesktop = [
    { top: "10%", left: "15%" },
    { top: "20%", right: "20%" },
    { top: "30%", left: "10%" },
    { bottom: "40%", right: "15%" },
    { bottom: "30%", left: "20%" },
    { top: "15%", left: "60%" },
    { bottom: "20%", right: "30%" },
    { top: "40%", right: "10%" },
  ];

  return (
    <div className="w-full bg-gradient-to-br from-emerald-400/20 via-black to-teal-700 relative overflow-hidden animate-bg">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
      <div className="absolute inset-0">
        {icons.map((icon, index) => {
          const IconComponent = icon.component;
          const pos = isMobile ? positionsMobile[index] : positionsDesktop[index];

          return (
            <motion.div
              key={index}
              className="absolute"
              style={pos}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
            >
              <motion.div
                className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 p-2 sm:p-4 rounded-2xl border border-emerald-500/20 backdrop-blur-sm text-teal-900"
                animate={glowAnimation}
              >
                <IconComponent />
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* CTA Text */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="text-center max-w-4xl mx-auto">
          <div className="max-w-7xl relative mx-auto py-4 sm:py-10 px-4 text-center">
            <TypewriterEffect words={words} />
          </div>
          <button className="group relative z-10 px-6 py-3 sm:px-10 sm:py-5 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-500 hover:scale-110 overflow-hidden"
            onClick={()=>{window.location.href = "/contact"}}
          >
            <span className="relative z-10 flex items-center gap-3">
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
        </div>
      </div>

      {/* Background blobs */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-teal-500/10 rounded-full blur-2xl" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-green-500/10 rounded-full blur-2xl" />
    </div>
  );
};

export default Cta;
