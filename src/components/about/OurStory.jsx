"use client";
import { Shield, Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function OurStory() {
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="text-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20 flex items-center">
        <div className="items-center w-full space-y-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight mb-3 sm:mb-4 md:mb-6">
              <span className="bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
                Our Story
              </span>
            </h1>
          </motion.div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl leading-relaxed font-semibold max-w-none sm:max-w-4xl lg:max-w-5xl xl:max-w-6xl"
          >
            Quantic Solutions is a forward-thinking digital company founded in
            2021, focused on transforming ideas into innovative digital
            experiences, We specialize in building cutting-edge web applications, scalable cloud solutions, and intuitive mobile platforms that empower businesses to thrive in the digital era. With a blend of creativity, technology, and strategy, our team delivers solutions that are not only functional but also designed to create lasting impact.
          </motion.p>
        </div>
      </div>
    </div>
  );
}
