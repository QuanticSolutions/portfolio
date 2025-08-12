"use client";
import React, { useState } from "react";
import Image from "next/image";

const SoftwareServices = () => {
  const [hoveredService, setHoveredService] = useState(null);
   const [openServiceId, setOpenServiceId] = useState(null);

  const toggleService = (id) => {
    setOpenServiceId(openServiceId === id ? null : id);
  };


  const services = [
    {
      id: 1,
      number: "01",
      title: "Designing",
      description:
        "Creating bold, engaging designs that resonate with your audience and tell your brand’s story.",
      projectSample: {
        title: "Brand Design",
        image: "/assets/service-images/1.jpg",
        tech: ["Figma", "Illustrator", "Photoshop"],
      },
    },
    {
      id: 2,
      number: "02",
      title: "UI/UX",
      description:
        "Bringing ideas to life with stunning 3D models and visuals that add depth, realism, and impact to your brand’s presentation.",
      projectSample: {
        title: "3D UI Concepts",
        image: "/assets/UI-Portfolio/Web/Shopify/Bechlo.jpg",
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
        image: "/api/placeholder/300/200",
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
        image: "/api/placeholder/300/200",
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
        image: "/assets/custom/carsfinderpro.jpg",
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
        image: "/assets/service-images/Beseus.jpg",
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
        image: "/assets/custom/Bookingmanagment.jpg",
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
        image: "/api/placeholder/300/200",
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
        image: "/api/placeholder/300/200",
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
      <section className="relative px-6 py-20 lg:px-12 lg:py-32">
        <div className="max-w-7xl mx-auto text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-600/20 border border-emerald-500/30 rounded-full px-4 py-2 mb-8">
            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
            <span className="text-emerald-300 text-sm font-medium">
              75+ PROJECTS LAUNCHED
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-8">
            All-in-One Software
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Services
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-400 text-lg lg:text-xl max-w-3xl mb-16">
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
           <section className="relative px-6 py-20 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Services List */}
            <div className="space-y-1">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="border-b border-emerald-900 hover:border-emerald-600 transition-all duration-300"
                >
                  {/* Heading Row */}
                  <div
                    className="py-6 flex items-center justify-between cursor-pointer"
                    onClick={() => toggleService(service.id)}
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-emerald-700 font-mono text-sm mt-1">
                        {service.number}
                      </span>
                      <h3
                        className={`text-xl lg:text-2xl font-bold ${
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
                      openServiceId === service.id ? "max-h-40" : "max-h-0"
                    }`}
                  >
                    <p className="text-gray-400 leading-relaxed px-10 pb-4">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Project Sample Display */}
            <div className="sticky top-50 h-fit">
              {openServiceId ? (
                <div className="rounded-xl p-6 mb-6">
                  <div className="w-full h-[400px] rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                    <Image
                      src={
                        services.find((s) => s.id === openServiceId)
                          .projectSample.image
                      }
                      alt="service-image"
                      width={550}
                      height={400}
                      className="rounded-lg object-cover"
                    />
                  </div>
                </div>
              ) : (
                <div className="bg-emerald-950/30 border border-emerald-900 rounded-2xl p-8 flex items-center justify-center h-[400px]">
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
