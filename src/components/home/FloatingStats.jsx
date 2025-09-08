import React from "react";
import { motion } from "framer-motion";

export default function FloatingStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.3 }} // triggers when 30% of the section is in view
      className="transform flex flex-wrap justify-center items-center gap-10 sm:gap-20 lg:gap-40 text-center py-4"
    >
      {[
        { number: "150+", label: "Projects" },
        { number: "98%", label: "Success Rate" },
        { number: "24/7", label: "Support" },
      ].map((stat, index) => (
        <motion.div
          key={index}
          className="relative"
          animate={{ y: [0, -5, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.3,
          }}
        >
          <div
            className="
              font-bold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent
              text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl
            "
          >
            {stat.number}
          </div>
          <div className="text-base sm:text-lg md:text-xl lg:text-2xl text-white mt-1">
            {stat.label}
          </div>
          <div className="absolute -inset-2 bg-gradient-to-r from-green-500/10 to-teal-500/10 blur-lg rounded-lg" />
        </motion.div>
      ))}
    </motion.div>
  );
}
