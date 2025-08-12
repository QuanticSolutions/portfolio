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
            experiences...
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.4 }}
            className="flex items-start space-x-3 sm:space-x-4"
          >
            <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-teal-600/20 rounded-lg flex items-center justify-center border border-teal-500/30">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-teal-400" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-white mb-1 sm:mb-2">
                Secure Transactions
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl max-w-none sm:max-w-md md:max-w-lg lg:max-w-xl">
                Id leo tincidunt accusam sed enim diam...
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.6 }}
            className="flex items-start space-x-3 sm:space-x-4"
          >
            <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-teal-600/20 rounded-lg flex items-center justify-center border border-teal-500/30">
              <Globe className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-teal-400" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-white mb-1 sm:mb-2">
                Decentralized Network
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl max-w-none sm:max-w-md md:max-lg lg:max-w-xl">
                Vel orci mauris massa posuere amet vitae id...
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
