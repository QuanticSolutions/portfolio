"use client";
import React, { useState } from "react";
import { Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [activeCategory, setActiveCategory] = useState("Designing Plan");

  const categories = [
    "Designing Plan",
    "UI/UX Plan", 
    "Video Editing Plan",
    "Web Development Plan",
    "App Development Plan",
    "Digital Marketing Plan",
  ];

  const plans = {
    "Designing Plan": {
      start: {
        title: "Design Start",
        description:
          "Creating bold, engaging designs that resonate with your audience and tell your brand's story.",
        priceMonthly: 25,
        priceAnnual: Math.round(25 * 12 * 0.9),
        features: [
          "Brand Concepts",
          "2 Initial Mockups", 
          "Basic Revisions",
          "Email Support",
        ],
      },
      scale: {
        title: "Design Standard",
        description: "Comprehensive design packages for growing brands.",
        priceMonthly: 50,
        priceAnnual: Math.round(50 * 12 * 0.9),
        features: [
          "Full UI Kit",
          "3 Pages Design",
          "Multiple Revisions",
          "Priority Support",
        ],
      },
    },

    "UI/UX Plan": {
      start: {
        title: "UI/UX Basic",
        description:
          "Bringing ideas to life with stunning 3D models and visuals that add depth and realism.",
        priceMonthly: 25,
        priceAnnual: Math.round(25 * 12 * 0.9),
        features: [
          "Wireframes",
          "Basic Prototypes",
          "UX Audit",
          "Email Support",
        ],
      },
      scale: {
        title: "UI/UX Pro",
        description:
          "Advanced UX work and interactive prototypes for products.",
        priceMonthly: 50,
        priceAnnual: Math.round(50 * 12 * 0.9),
        features: [
          "Interactive Prototype",
          "User Testing",
          "Design System",
          "Priority Support",
        ],
      },
    },

    "Video Editing Plan": {
      start: {
        title: "Video Basic",
        description:
          "Crafting engaging & professional videos that tell your story and capture attention.",
        priceMonthly: 25,
        priceAnnual: Math.round(25 * 12 * 0.9),
        features: [
          "Short Edits",
          "Basic Color Correction",
          "1 Revision",
          "Email Support",
        ],
      },
      scale: {
        title: "Video Pro", 
        description:
          "End-to-end video production and post-production services.",
        priceMonthly: 50,
        priceAnnual: Math.round(50 * 12 * 0.9),
        features: [
          "Full Edit",
          "Motion Graphics",
          "Sound Design",
          "Priority Turnaround",
        ],
      },
    },

    "Web Development Plan": {
      start: {
        title: "Web Basic",
        description:
          "Crafting responsive and user-friendly websites that drive engagement and deliver results.",
        priceMonthly: 25,
        priceAnnual: Math.round(25 * 12 * 0.9),
        features: [
          "Landing Page",
          "Responsive Layout",
          "Basic SEO",
          "Email Support",
        ],
      },
      scale: {
        title: "Web Pro",
        description: "Full-featured web apps and e-commerce solutions.",
        priceMonthly: 50,
        priceAnnual: Math.round(50 * 12 * 0.9),
        features: [
          "Custom Backend",
          "E-commerce",
          "Performance Optimizations",
          "SLA Support",
        ],
      },
    },

    "App Development Plan": {
      start: {
        title: "App Basic",
        description:
          "Building intuitive mobile applications that enhance user experience and meet business objectives.",
        priceMonthly: 50,
        priceAnnual: Math.round(50 * 12 * 0.9),
        features: [
          "MVP App",
          "Basic UI",
          "Push Notifications",
          "Email Support",
        ],
      },
      scale: {
        title: "App Pro",
        description: "Production-ready native/hybrid apps with integrations.",
        priceMonthly: 500,
        priceAnnual: Math.round(500 * 12 * 0.9),
        features: [
          "iOS + Android",
          "Backend Integration",
          "Analytics",
          "Dedicated Support",
        ],
      },
    },

    "Digital Marketing Plan": {
      start: {
        title: "Marketing Basic",
        description: "Building campaigns that increase reach and engagement.",
        priceMonthly: 25,
        priceAnnual: Math.round(25 * 12 * 0.9),
        features: [
          "Social Posts",
          "Basic Ads Setup",
          "Monthly Report",
          "Email Support",
        ],
      },
      scale: {
        title: "Marketing Pro",
        description: "Full-funnel digital marketing and growth support.",
        priceMonthly: 50,
        priceAnnual: Math.round(50 * 12 * 0.9),
        features: [
          "Ads Management",
          "Content Strategy",
          "Conversion Optimization", 
          "Dedicated Manager",
        ],
      },
    },
  };

  const currentPlans = plans[activeCategory];

  // Animation variants
  const tabVariants = {
    inactive: {
      scale: 0.95,
      opacity: 0.7,
    },
    active: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    },
    hover: {
      scale: 1.05,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  };

  const headingVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    initial: { 
      opacity: 0, 
      y: 50, 
      scale: 0.9,
      rotateX: 10
    },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    exit: { 
      opacity: 0, 
      y: -30, 
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  const featureVariants = {
    initial: { opacity: 0, x: -20 },
    animate: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1 + (i * 0.1),
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const priceVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.2,
        duration: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-900 via-black to-teal-900 text-white relative overflow-hidden py-20">
      {/* Animated Starry Background */}
      <div className="absolute inset-0 opacity-10">
        {[
          "top-20 left-20",
          "top-40 right-32", 
          "top-60 left-1/4",
          "bottom-40 right-20",
          "bottom-60 left-16",
          "top-32 right-1/4",
          "bottom-80 right-1/3",
          "top-80 left-1/3",
        ].map((pos, i) => (
          <motion.div
            key={i}
            className={`absolute ${pos} w-1 h-1 bg-emerald-400 rounded-full`}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        {/* Animated Header */}
        <motion.div 
          className="text-center mb-10"
          variants={headingVariants}
          initial="initial"
          animate="animate"
        >
          <motion.p 
            className="text-emerald-400 text-sm mb-4 tracking-wide"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Pricing
          </motion.p>
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            The only platform
            <br />
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              that pays for itself
            </motion.span>
          </motion.h1>
          <motion.p 
            className="text-gray-400 text-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            No additional fees or hidden costs. Get started today
          </motion.p>
        </motion.div>

        {/* Animated Category Tabs */}
        <motion.div 
          className="flex justify-center mb-10 flex-wrap gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, staggerChildren: 0.1 }}
        >
          {categories.map((cat, index) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full font-medium transition-all border ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-green-500 to-teal-500 text-white border-transparent"
                  : "border-emerald-500/30 text-gray-300 hover:text-white"
              }`}
              variants={tabVariants}
              initial="inactive"
              animate={activeCategory === cat ? "active" : "inactive"}
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Animated Billing Toggle */}
        <motion.div 
          className="flex justify-center mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-full p-1 flex">
            <motion.button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                billingCycle === "monthly"
                  ? "bg-gradient-to-r from-green-500 to-teal-500 text-white"
                  : "text-gray-300 hover:text-white"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Monthly
            </motion.button>
            <motion.button
              onClick={() => setBillingCycle("annual")}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                billingCycle === "annual"
                  ? "bg-gradient-to-r from-green-500 to-teal-500 text-white"
                  : "text-gray-300 hover:text-white"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Annual <span className="text-emerald-400 text-xs">(Save)</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Animated Pricing Cards */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeCategory}
            className="grid md:grid-cols-2 gap-8 mb-16"
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* Start Plan */}
            <motion.div 
              className="bg-emerald-950/30 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.3)] rounded-lg p-8 relative hover:shadow-[0_0_35px_rgba(16,185,129,0.5)] transition-all duration-300"
              whileHover={{ 
                scale: 1.02, 
                y: -5,
                transition: { type: "spring", stiffness: 400, damping: 25 }
              }}
            >
              <motion.div 
                className="mb-8"
                variants={headingVariants}
                initial="initial"
                animate="animate"
              >
                <motion.h2 
                  className="text-2xl font-semibold mb-2 text-emerald-300"
                  layoutId={`start-title-${activeCategory}`}
                >
                  {currentPlans.start.title}
                </motion.h2>
                <motion.p 
                  className="text-gray-400 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {currentPlans.start.description}
                </motion.p>
              </motion.div>

              <motion.div 
                className="flex mb-8"
                variants={priceVariants}
                initial="initial"
                animate="animate"
              >
                <div className="flex items-baseline gap-2">
                  <motion.span 
                    className="text-5xl font-bold text-teal-400"
                    key={`start-${billingCycle}-${activeCategory}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    ${billingCycle === "monthly"
                      ? currentPlans.start.priceMonthly
                      : currentPlans.start.priceAnnual.toLocaleString()}
                  </motion.span>
                  <span className="text-gray-400">
                    {billingCycle === "monthly" ? "/month" : "/year"}
                  </span>
                </div>
              </motion.div>

              <div className="mb-8">
                <ul className="space-y-4">
                  {currentPlans.start.features.map((item, i) => (
                    <motion.li 
                      key={i}
                      className="flex items-center gap-3"
                      variants={featureVariants}
                      initial="initial"
                      animate="animate"
                      custom={i}
                    >
                      <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      <span className="text-gray-300">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Scale Plan */}
            <motion.div 
              className="bg-emerald-950/30 border border-teal-400/50 shadow-[0_0_25px_rgba(45,212,191,0.4)] rounded-lg p-8 relative hover:shadow-[0_0_40px_rgba(45,212,191,0.6)] transition-all duration-300"
              whileHover={{ 
                scale: 1.02, 
                y: -5,
                transition: { type: "spring", stiffness: 400, damping: 25 }
              }}
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 to-teal-400 rounded-l-lg"></div>
              <motion.div 
                className="mb-8"
                variants={headingVariants}
                initial="initial"
                animate="animate"
              >
                <motion.h2 
                  className="text-2xl font-semibold mb-2 text-teal-300"
                  layoutId={`scale-title-${activeCategory}`}
                >
                  {currentPlans.scale.title}
                </motion.h2>
                <motion.p 
                  className="text-gray-400 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {currentPlans.scale.description}
                </motion.p>
              </motion.div>
              
              <motion.div 
                className="mb-8"
                variants={priceVariants}
                initial="initial"
                animate="animate"
              >
                <div className="flex items-baseline gap-2">
                  <motion.span 
                    className="text-5xl font-bold text-teal-400"
                    key={`scale-${billingCycle}-${activeCategory}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    ${billingCycle === "monthly"
                      ? currentPlans.scale.priceMonthly
                      : currentPlans.scale.priceAnnual.toLocaleString()}
                  </motion.span>
                  <span className="text-gray-400">
                    {billingCycle === "monthly" ? "/month" : "/year"}
                  </span>
                </div>
              </motion.div>
              
              <div className="mb-8">
                <ul className="space-y-4">
                  {currentPlans.scale.features.map((item, i) => (
                    <motion.li 
                      key={i}
                      className="flex items-center gap-3"
                      variants={featureVariants}
                      initial="initial"
                      animate="animate"
                      custom={i}
                    >
                      <Check className="w-5 h-5 text-teal-400 flex-shrink-0" />
                      <span className="text-gray-300">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Animated Enterprise Section */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <motion.h2 
            className="text-3xl font-bold mb-4 text-emerald-300"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            Enterprise
          </motion.h2>
          <motion.p 
            className="text-gray-400 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
          >
            For large teams spending over $5m per year, contact sales
            <br />
            about our enterprise product.
          </motion.p>
          <motion.button 
            className="group relative z-10 w-full max-w-xs sm:max-w-none sm:w-auto px-5 sm:px-6 md:px-8 lg:px-10 py-3 sm:py-4 md:py-5 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-500 overflow-hidden text-sm sm:text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={()=>{window.location.href = "/contact"}}
          >
            <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
              Learn More
              <motion.div
                className="w-2 h-2 bg-white rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}