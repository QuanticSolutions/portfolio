"use client";
import React from "react";
import { motion } from "framer-motion";
import { FlipLogos } from "@/ui/Flip";

export default function ClientLogos({ logos }) {
  return (
    <motion.div
      className="flex justify-center items-center max-w-7xl px-4"
      initial={{ opacity: 0, y: 50 }} // start hidden & slightly down
      whileInView={{ opacity: 1, y: 0 }} // animate when scrolled into view
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }} // only animate once, when 30% in view
    >
      <div className="text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
        <FlipLogos logos={logos} />
      </div>
    </motion.div>
  );
}
