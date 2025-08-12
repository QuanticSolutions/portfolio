import React, { useState, useEffect } from "react";
import { StickyScroll } from "@/ui/StickyScroll";
import { motion } from "framer-motion";

const WebDevConceptArt = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  const iconPositions = [
    { x: "15%", y: "20%", delay: 0 },
    { x: "75%", y: "15%", delay: 0.2 },
    { x: "20%", y: "75%", delay: 0.4 },
    { x: "80%", y: "80%", delay: 0.6 },
    { x: "85%", y: "45%", delay: 0.8 },
    { x: "15%", y: "50%", delay: 1.0 },
  ];

  const FloatingIcon = ({ position, delay }) => (
    <motion.div
      className="absolute w-8 h-8 bg-gradient-to-br from-teal-400 to-emerald-400 rounded-md shadow-md shadow-teal-500/30 backdrop-blur-sm border border-teal-300/20 flex items-center justify-center"
      style={{ left: position.x, top: position.y }}
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate: 0,
        y: [0, -3, 0],
      }}
      transition={{
        duration: 0.8,
        delay,
        y: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      <div className="w-4 h-4 bg-white/20 rounded backdrop-blur-sm">
        <div className="w-full h-full flex items-center justify-center text-white font-bold text-xs">
          •
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="relative w-80 h-80 overflow-hidden bg-black/40 ld-900 rounded-xl border border-teal-500/30">
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${50 + mousePosition.x}% ${
            50 + mousePosition.y
          }%, rgba(20, 184, 166, 0.3) 0%, transparent 50%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
          linear-gradient(rgba(20, 184, 166, 0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(20, 184, 166, 0.3) 1px, transparent 1px)
        `,
          backgroundSize: "60px 60px",
        }}
      />
      {[1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 border border-teal-400/20 rounded-full"
          style={{
            width: `${i * 200}px`,
            height: `${i * 200}px`,
            marginLeft: `${-i * 100}px`,
            marginTop: `${-i * 100}px`,
          }}
          animate={{
            scale: [1, 1.02, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        />
      ))}
      <motion.div
        className="absolute top-1/2 left-1/2 w-1 bg-gradient-to-t from-transparent via-teal-400 to-transparent origin-bottom"
        style={{ height: "400px", marginLeft: "-2px", marginTop: "-400px" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-20 h-20 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-full shadow-xl shadow-teal-500/50 border-4 border-teal-300/30 flex items-center justify-center"
        style={{ marginLeft: "-40px", marginTop: "-40px" }}
        animate={{
          scale: [1, 1.05, 1],
          boxShadow: [
            "0 0 20px rgba(20, 184, 166, 0.5)",
            "0 0 40px rgba(20, 184, 166, 0.8)",
            "0 0 20px rgba(20, 184, 166, 0.5)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="text-white font-bold text-sm">WEB</div>
      </motion.div>
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-teal-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
      {iconPositions.map((position, index) => (
        <FloatingIcon key={index} position={position} delay={position.delay} />
      ))}
      <motion.div
        className="absolute top-4 left-4 w-16 h-16 border-2 border-teal-400/30 rounded-lg"
        animate={{ rotate: [0, 90, 180, 270, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="absolute top-4 right-4 w-12 h-12 bg-emerald-500/20 rounded-full"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-4 left-4 w-20 h-2 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"
        animate={{ scaleX: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-4 right-4 w-14 h-14 border border-emerald-400/40 rounded-full"
        animate={{
          scale: [1, 1.1, 1],
          borderColor: [
            "rgba(52, 211, 153, 0.4)",
            "rgba(20, 184, 166, 0.6)",
            "rgba(52, 211, 153, 0.4)",
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

const UIUXArt = () => {
  const designElements = [
    { x: "20%", y: "25%", type: "wireframe", delay: 0 },
    { x: "75%", y: "20%", type: "palette", delay: 0.2 },
    { x: "25%", y: "70%", type: "component", delay: 0.4 },
    { x: "80%", y: "75%", type: "prototype", delay: 0.6 },
    { x: "15%", y: "50%", type: "user", delay: 0.8 },
    { x: "85%", y: "45%", type: "mobile", delay: 1.0 },
  ];

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 10,
        y: (e.clientY / window.innerHeight - 0.5) * 10,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative w-80 h-80 overflow-hidden bg-black/40 rounded-xl border border-teal-500/30">
      <motion.div
        className="absolute inset-0 opacity-20 rounded-xl"
        style={{
          background: `radial-gradient(circle at ${
            50 + mousePosition.x * 0.3
          }% ${
            50 + mousePosition.y * 0.3
          }%, rgba(20, 184, 166, 0.4) 0%, transparent 60%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-10 rounded-xl"
        style={{
          backgroundImage: `
            linear-gradient(rgba(20, 184, 166, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20, 184, 166, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "25px 25px",
        }}
      />
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 border border-teal-400/20 rounded-lg"
          style={{
            width: `${i * 70}px`,
            height: `${i * 50}px`,
            marginLeft: `${-i * 35}px`,
            marginTop: `${-i * 25}px`,
          }}
          animate={{
            rotateZ: [0, 2, -2, 0],
            scale: [1, 1.01, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        />
      ))}
      <motion.div
        className="absolute top-1/2 left-1/2 w-14 h-10 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-lg shadow-lg shadow-teal-500/50 border-2 border-teal-300/30 flex items-center justify-center"
        style={{ marginLeft: "-28px", marginTop: "-20px" }}
        animate={{
          scale: [1, 1.05, 1],
          rotateY: [0, 5, -5, 0],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="text-white font-bold text-xs">UI/UX</div>
      </motion.div>
      {designElements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute w-8 h-8 bg-gradient-to-br from-teal-400 to-emerald-400 rounded-lg shadow-md backdrop-blur-sm border border-teal-300/20 flex items-center justify-center"
          style={{ left: element.x, top: element.y }}
          initial={{ opacity: 0, scale: 0, rotateZ: -90 }}
          animate={{
            opacity: 1,
            scale: 1,
            rotateZ: 0,
            y: [0, -4, 0],
          }}
          transition={{
            duration: 0.8,
            delay: element.delay,
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <div className="w-4 h-4 bg-white/30 rounded flex items-center justify-center">
            <div className="w-2 h-2 bg-white/60 rounded-sm"></div>
          </div>
        </motion.div>
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-4 bg-gradient-to-t from-teal-400 to-transparent rounded-full"
          style={{
            left: `${20 + i * 12}%`,
            top: `${85}%`,
          }}
          animate={{
            height: [16, 24, 16],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
      <motion.div
        className="absolute top-2 left-2 w-6 h-6 border border-teal-400/40 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="absolute top-2 right-2 w-8 h-2 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"
        animate={{ scaleX: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

const DigitalMarketingArt = () => {
  const marketingElements = [
    { x: "18%", y: "25%", type: "analytics", delay: 0 },
    { x: "78%", y: "18%", type: "social", delay: 0.2 },
    { x: "22%", y: "75%", type: "email", delay: 0.4 },
    { x: "82%", y: "78%", type: "seo", delay: 0.6 },
    { x: "12%", y: "48%", type: "ads", delay: 0.8 },
    { x: "88%", y: "42%", type: "content", delay: 1.0 },
  ];

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 10,
        y: (e.clientY / window.innerHeight - 0.5) * 10,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative w-80 h-80 overflow-hidden bg-black/40 rounded-xl border border-teal-500/30">
      <motion.div
        className="absolute inset-0 opacity-25 rounded-xl"
        style={{
          background: `conic-gradient(from ${
            mousePosition.x * 2
          }deg at 50% 50%, rgba(20, 184, 166, 0.4) 0deg, rgba(52, 211, 153, 0.4) 120deg, rgba(16, 185, 129, 0.4) 240deg, rgba(20, 184, 166, 0.4) 360deg)`,
        }}
      />
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 border-2 border-teal-400/20"
          style={{
            width: `${160 - i * 30}px`,
            height: `${40 + i * 15}px`,
            marginLeft: `${-(160 - i * 30) / 2}px`,
            marginTop: `${-20 - i * 7.5}px`,
            clipPath: "polygon(20% 0%, 80% 0%, 70% 100%, 30% 100%)",
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
        />
      ))}
      <motion.div
        className="absolute top-1/2 left-1/2 w-16 h-8 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-full shadow-lg shadow-teal-500/50 border-2 border-teal-300/30 flex items-center justify-center"
        style={{ marginLeft: "-32px", marginTop: "-16px" }}
        animate={{
          scale: [1, 1.08, 1],
          boxShadow: [
            "0 0 10px rgba(20, 184, 166, 0.5)",
            "0 0 25px rgba(52, 211, 153, 0.7)",
            "0 0 10px rgba(20, 184, 166, 0.5)",
          ],
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="text-white font-bold text-xs">MARK</div>
      </motion.div>
      {marketingElements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute w-8 h-8 bg-gradient-to-br from-teal-400 to-emerald-400 rounded-full shadow-md backdrop-blur-sm border border-teal-300/20 flex items-center justify-center"
          style={{ left: element.x, top: element.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: [0, 5, -5, 0],
            y: [0, -3, 0],
          }}
          transition={{
            duration: 0.8,
            delay: element.delay,
            rotate: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <div className="w-3 h-3 bg-white/40 rounded-full"></div>
        </motion.div>
      ))}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute bottom-4 bg-gradient-to-t from-teal-500 to-emerald-400 rounded-t"
          style={{
            left: `${20 + i * 12}%`,
            width: "8px",
            height: `${20 + i * 6}px`,
          }}
          initial={{ height: 0 }}
          animate={{ height: `${20 + i * 6}px` }}
          transition={{
            duration: 1.5,
            delay: i * 0.2,
            ease: "easeOut",
          }}
        />
      ))}
      <motion.div
        className="absolute top-1/2 left-1/2 w-32 h-px bg-gradient-to-r from-transparent via-teal-400 to-transparent"
        style={{ marginLeft: "-64px", marginTop: "-1px" }}
        animate={{ opacity: [0.3, 1, 0.3], scaleX: [0.8, 1.2, 0.8] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-px h-24 bg-gradient-to-b from-transparent via-emerald-400 to-transparent"
        style={{ marginLeft: "-1px", marginTop: "-48px" }}
        animate={{ opacity: [0.3, 1, 0.3], scaleY: [0.8, 1.2, 0.8] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
    </div>
  );
};

const AnimationArt = () => {
  const animationElements = [
    { x: "20%", y: "20%", type: "2d", delay: 0 },
    { x: "75%", y: "25%", type: "3d", delay: 0.2 },
    { x: "25%", y: "75%", type: "motion", delay: 0.4 },
    { x: "80%", y: "70%", type: "render", delay: 0.6 },
    { x: "15%", y: "50%", type: "character", delay: 0.8 },
    { x: "85%", y: "45%", type: "vfx", delay: 1.0 },
  ];

  return (
    <div className="relative w-80 h-80 overflow-hidden bg-black/40 rounded-xl border border-teal-500/30">
      <motion.div
        className="absolute inset-0 opacity-20 rounded-xl"
        animate={{
          background: [
            `radial-gradient(circle at 20% 20%, rgba(20, 184, 166, 0.4) 0%, transparent 50%)`,
            `radial-gradient(circle at 80% 80%, rgba(52, 211, 153, 0.4) 0%, transparent 50%)`,
            `radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.4) 0%, transparent 50%)`,
            `radial-gradient(circle at 80% 20%, rgba(20, 184, 166, 0.4) 0%, transparent 50%)`,
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        className="absolute inset-0 opacity-15 rounded-xl"
        style={{
          background: `
            linear-gradient(90deg, transparent 24%, rgba(20, 184, 166, 0.3) 25%, rgba(20, 184, 166, 0.3) 26%, transparent 27%, transparent 74%, rgba(20, 184, 166, 0.3) 75%, rgba(20, 184, 166, 0.3) 76%, transparent 77%),
            linear-gradient(transparent 24%, rgba(20, 184, 166, 0.3) 25%, rgba(20, 184, 166, 0.3) 26%, transparent 27%, transparent 74%, rgba(20, 184, 166, 0.3) 75%, rgba(20, 184, 166, 0.3) 76%, transparent 77%)
          `,
          backgroundSize: "30px 30px",
          transform: "perspective(200px) rotateX(20deg)",
        }}
      />
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute border border-teal-400/30"
          style={{
            left: `${30 + i * 25}%`,
            top: `${30 + i * 10}%`,
            width: `${20 + i * 5}px`,
            height: `${20 + i * 5}px`,
            transformStyle: "preserve-3d",
          }}
          animate={{
            rotateX: [0, 360],
            rotateY: [0, 360],
            rotateZ: [0, 180],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
      <motion.div
        className="absolute top-1/2 left-1/2 w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl shadow-lg shadow-teal-500/50 border-2 border-teal-300/30 flex items-center justify-center"
        style={{
          marginLeft: "-24px",
          marginTop: "-24px",
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateY: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotateY: { duration: 6, repeat: Infinity, ease: "linear" },
          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <div className="text-white font-bold text-xs">3D</div>
      </motion.div>
      {animationElements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute w-8 h-8 bg-gradient-to-br from-teal-400 to-emerald-400 rounded-lg shadow-md backdrop-blur-sm border border-teal-300/20 flex items-center justify-center"
          style={{
            left: element.x,
            top: element.y,
            transformStyle: "preserve-3d",
          }}
          initial={{ opacity: 0, scale: 0, rotateZ: -180 }}
          animate={{
            opacity: 1,
            scale: 1,
            rotateZ: 0,
            rotateY: [0, 180, 360],
            y: [0, -5, 0],
          }}
          transition={{
            duration: 0.8,
            delay: element.delay,
            rotateY: { duration: 4, repeat: Infinity, ease: "linear" },
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <motion.div
            className="w-4 h-4 bg-white/30 rounded"
            animate={{ rotateZ: [0, 90, 180, 270, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      ))}
      <motion.div
        className="absolute top-1/4 left-1/4 w-40 h-32 border-2 border-dashed border-teal-400/40 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      >
        <motion.div
          className="absolute w-2 h-2 bg-teal-400 rounded-full -top-1 left-1/2"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute bottom-6 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full h-1"
          style={{
            left: "10%",
            width: "80%",
            top: `${85 + i * 3}%`,
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: [0, 1, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const services = [
  {
    title: "Designing",
    text: "Creating bold, engaging designs that resonate with your audience and tell your brand's story.",
  },
  {
    title: "UI/UX",
    text: "Bringing ideas to life with stunning 3D models and visuals that add depth, realism, and impact to your brand's presentation.",
  },
  {
    title: "2D/3D Animation",
    text: "Crafting engaging & professional videos that tell your story, capture attention, & connect with your audience across platforms.",
  },
  {
    title: "Video Editing",
    text: "Crafting responsive and user-friendly websites that drive engagement and deliver results.",
  },
  {
    title: "Web Development",
    text: "Building intuitive mobile applications that enhance user experience and meet business objectives.",
  },
  {
    title: "App Development",
    text: "Building intuitive mobile applications that enhance user experience and meet business objectives.",
  },
  {
    title: "Software Development",
    text: "Crafting responsive and user-friendly websites that drive engagement and deliver results.",
  },
  {
    title: "Digital Marketing",
    text: "Building intuitive mobile applications that enhance user experience and meet business objectives.",
  },
  {
    title: "SEO",
    text: "Building intuitive mobile applications that enhance user experience and meet business objectives.",
  },
];

const content = [
  {
    title: "Web Development",
    description:
      "Creating bold, engaging designs that resonate with your audience and tell your brand's story.",
    content: <WebDevConceptArt />,
  },
  {
    title: "UI/UX",
    description:
      "Bringing ideas to life with stunning 3D models and visuals that add depth, realism, and impact to your brand's presentation.",
    content: <UIUXArt />,
  },
  {
    title: "2D/3D Animation",
    description:
      "Crafting engaging & professional videos that tell your story, capture attention, & connect with your audience across platforms.",
    content: <AnimationArt />,
  },
  {
    title: "Digital Marketing",
    description:
      "Building intuitive mobile applications that enhance user experience and meet business objectives.",
    content: <DigitalMarketingArt />,
  },
];

export default function Services() {
  return(
    <>
      <StickyScroll content={content} />
      <div className="w-full flex justify-center items-center py-5">
        <button className="group relative z-10 px-10 py-5 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-500 hover:scale-110 overflow-hidden">
          <span className="relative z-10 flex items-center gap-3">
            Learn More
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
    </>
  );
}
