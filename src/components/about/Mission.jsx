'use client'
import React from 'react';

const SlidingTextSection = () => {
  return (
    <div className="relative overflow-hidden flex flex-col items-center justify-center w-full py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
      {/* Background elements */}
      <div className="absolute top-8 sm:top-12 md:top-16 lg:top-20 left-4 sm:left-6 md:left-8 lg:left-10 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 bg-gradient-to-br from-teal-500/20 to-transparent rounded-full blur-lg sm:blur-xl"></div>
      <div className="absolute top-1/4 sm:top-1/3 right-8 sm:right-12 md:right-16 lg:right-20 w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-48 lg:h-48 bg-gradient-to-bl from-teal-600/30 to-transparent rounded-full blur-xl sm:blur-2xl"></div>
      <div className="absolute bottom-1/3 sm:bottom-1/4 left-1/5 sm:left-1/4 w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 bg-gradient-to-tr from-green-400/15 to-transparent rounded-full blur-lg sm:blur-xl"></div>
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 right-4 sm:right-6 md:right-8 lg:right-10 w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-gradient-to-tl from-teal-500/25 to-transparent rounded-full blur-sm sm:blur-lg"></div>

      {/* Full-width sliding text */}
      <div className="relative w-screen overflow-hidden my-8 sm:my-12 md:my-16 lg:my-20">
        <div className="flex animate-slide whitespace-nowrap">
          <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-white tracking-wider mx-4 sm:mx-6 md:mx-8">
            • TOP BRANDING & WEB AGENCY • TOP BRANDING & WEB AGENCY • TOP BRANDING & WEB AGENCY • TOP BRANDING & WEB AGENCY • TOP BRANDING & WEB AGENCY • TOP BRANDING & WEB AGENCY
          </span>
        </div>
      </div>

      {/* Contact section */}
      <div className="mt-8 sm:mt-12 md:mt-16 flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-center w-full px-4 sm:px-6 md:px-8">
        <div className="text-center flex-1">
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-center font-bold uppercase bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent animate-pulse py-2 mb-2 sm:mb-3">
            Start a project
          </p>
          <a href="mailto:contact@quanticsols.com" className="text-white hover:text-green-400 transition-colors text-sm sm:text-base md:text-lg break-all sm:break-normal">
            contact@quanticsols.com
          </a>
        </div>
        <div className="text-center flex-1">
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-center font-bold uppercase bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent animate-pulse py-2 mb-2 sm:mb-3">
            Work with us
          </p>
          <a href="tel:+923332043902" className="text-white hover:text-green-400 transition-colors text-sm sm:text-base md:text-lg">
            +92 333 2043902
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-slide {
          animation: slide 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default SlidingTextSection;
