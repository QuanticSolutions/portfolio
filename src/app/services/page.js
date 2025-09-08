"use client";
import React, { useState } from "react";
import Image from "next/image";

const SoftwareServices = () => {
  const [hoveredService, setHoveredService] = useState(null);
  const [openServiceId, setOpenServiceId] = useState(1);

  const toggleService = (id) => {
    setOpenServiceId(openServiceId === id ? null : id);
  };

  const services = [
    {
      id: 1,
      number: "01",
      title: "Designing",
      description:
        "Creating bold, engaging designs that resonate with your audience and tell your brand's story.",
      projectSample: {
        title: "Brand Design",
        image: "/assets/service-images/Deisgn.jpg",
        tech: ["Figma", "Illustrator", "Photoshop"],
      },
    },
    {
      id: 2,
      number: "02",
      title: "UI/UX",
      description:
        "Bringing ideas to life with stunning 3D models and visuals that add depth, realism, and impact to your brand's presentation.",
      projectSample: {
        title: "3D UI Concepts",
        image: "/assets/service-images/UIUX.jpg",
        tech: ["Figma", "Blender", "Adobe XD"],
      },
    },
    {
      id: 3,
      number: "03",
      title: "2D/3D Animation",
      description:
        "Crafting engaging & professional videos that tell your story, capture attention, & connect with your audience across platforms.",
      projectSample: {
        title: "Animated Explainer Video",
        image: "/assets/service-images/2D3D.jpg",
        tech: ["After Effects", "Blender", "Premiere Pro"],
      },
    },
    {
      id: 4,
      number: "04",
      title: "Video Editing",
      description:
        "Crafting responsive and user-friendly websites that drive engagement and deliver results.",
      projectSample: {
        title: "Corporate Promo Video",
        image: "/assets/service-images/Video.jpg",
        tech: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
      },
    },
    {
      id: 5,
      number: "05",
      title: "Web Development",
      description:
        "Building intuitive mobile applications that enhance user experience and meet business objectives.",
      projectSample: {
        title: "Business Website",
        image: "/assets/service-images/WEB.jpg",
        tech: ["React", "Node.js", "MongoDB"],
      },
    },
    {
      id: 6,
      number: "06",
      title: "App Development",
      description:
        "Building intuitive mobile applications that enhance user experience and meet business objectives.",
      projectSample: {
        title: "E-commerce Mobile App",
        image: "/assets/service-images/App.jpg",
        tech: ["React Native", "Firebase", "Redux"],
      },
    },
    {
      id: 7,
      number: "07",
      title: "Software Development",
      description:
        "Crafting responsive and user-friendly websites that drive engagement and deliver results.",
      projectSample: {
        title: "Custom ERP System",
        image: "/assets/service-images/SoftwareDev.jpg",
        tech: ["Java", "Spring Boot", "PostgreSQL"],
      },
    },
    {
      id: 8,
      number: "08",
      title: "Digital Marketing",
      description:
        "Building intuitive mobile applications that enhance user experience and meet business objectives.",
      projectSample: {
        title: "Social Media Campaign",
        image: "/assets/service-images/Digital.jpg",
        tech: ["Facebook Ads", "Google Ads", "Canva"],
      },
    },
    {
      id: 9,
      number: "09",
      title: "SEO",
      description:
        "Building intuitive mobile applications that enhance user experience and meet business objectives.",
      projectSample: {
        title: "SEO Optimization",
        image: "/assets/service-images/SEO.jpg",
        tech: ["Ahrefs", "Google Analytics", "SEMRush"],
      },
    },
  ];

  const partners = [
    { name: "VanguardTech", logo: "VT" },
    { name: "Sales Engine", logo: "SE" },
    { name: "Quintalist", logo: "Q" },
    { name: "IntelSyn", logo: "IS" },
    { name: "SYNCORP", logo: "SC" },
    { name: "Synergist", logo: "SY" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-teal-900 to-black text-white">
      {/* Hero Section */}
      <section className="relative px-4 pt-30 pb-12 lg:px-8 lg:pt-28 lg:pb-16">
        <div className="max-w-7xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center text-center gap-2 bg-emerald-600/20 border border-emerald-500/30 rounded-full px-3 py-1.5 mb-6">
            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
            <span className="text-emerald-300 text-sm font-medium">
              75+ PROJECTS LAUNCHED
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6 text-center">
            All-in-One Software
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Services
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-400 text-base lg:text-lg max-w-3xl mb-12 text-center mx-auto">
            From initial roadmaps and UX-driven prototypes to full-stack
            development
            <br />
            and ongoing maintenance, we deliver solutions that grow with your
            business.
          </p>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-600/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-600/5 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative px-4 py-12 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12">
            {/* Services List */}
            <div className="space-y-1">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="border-b border-emerald-900 hover:border-emerald-600 transition-all duration-300"
                >
                  {/* Heading Row */}
                  <div
                    className="py-4 flex items-center justify-between cursor-pointer"
                    onClick={() => toggleService(service.id)}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-emerald-700 font-mono text-sm mt-1">
                        {service.number}
                      </span>
                      <h3
                        className={`text-lg lg:text-xl font-bold ${
                          openServiceId === service.id
                            ? "text-emerald-300"
                            : "text-white"
                        }`}
                      >
                        {service.title}
                      </h3>
                    </div>

                    {/* Arrow Icon */}
                    <span
                      className={`transform transition-transform duration-300 ${
                        openServiceId === service.id ? "rotate-180" : "rotate-0"
                      }`}
                    >
                      ▼
                    </span>
                  </div>

                  {/* Description */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openServiceId === service.id ? "max-h-32" : "max-h-0"
                    }`}
                  >
                    <p className="text-gray-400 text-sm leading-relaxed px-7 pb-3">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Project Sample Display */}
            <div className="sticky top-4 h-full mt-5">
              {openServiceId ? (
                <div className="relative w-full aspect-[4/3] h-full">
                  <Image
                    src={
                      services.find((s) => s.id === openServiceId).projectSample
                        .image
                    }
                    alt="service-image"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              ) : (
                <div className="bg-emerald-950/30 border border-emerald-900 rounded-2xl p-6 flex items-center justify-center min-h-[350px]">
                  <div className="text-center text-emerald-800">
                    <p className="text-sm text-emerald-300/70">
                      Click a service to see project samples
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SoftwareServices;