"use client";

import React from "react";
import ProjectsCarousel from "@/components/projects/Projects";

export default function WebDevelopmentPage() {
  // ---- TODO: fill this array with your project objects ----
  // Example project object shape:
  // {
  //   id: 1,
  //   title: "Project Name",
  //   subtitle: "Short tag",
  //   category: "Web Development",
  //   subcategory: "WordPress", // or "Shopify" or "Custom"
  //   description: "Short description",
  //   bgGradient: "from-teal-900 via-black to-teal-900",
  //   textColor: "text-emerald-400",
  //   accentColor: "emerald-400",
  //   icon: null, // or an imported icon component
  //   svgPattern: "circuit",
  //   image: "/path/to/image.jpg",
  //   isCenter: false
  // }
  const projects = [
    {
      id: 1,
      title: "Cars Finder Pro",
      subtitle: "Short tag",
      category: "App Development",
      subcategory: "React",
      description: "Short description",
      bgGradient: "from-teal-900 via-black to-teal-900",
      textColor: "text-emerald-400",
      accentColor: "emerald-400",
      icon: null,
      svgPattern: "circuit",
      image: "/assets/projects/app/1.jpg",
      isCenter: false,
    },
    {
      id: 2,
      title: "Baseus",
      subtitle: "Short tag",
      category: "App Development",
      subcategory: "Flutter",
      description: "Short description",
      bgGradient: "from-teal-900 via-black to-teal-900",
      textColor: "text-emerald-400",
      accentColor: "emerald-400",
      icon: null,
      svgPattern: "circuit",
      image: "/assets/projects/app/2.jpg",
      isCenter: false,
    },
    {
      id: 3,
      title: "Alhosn UAE",
      subtitle: "Short tag",
      category: "App Development",
      subcategory: "React",
      description: "Short description",
      bgGradient: "from-teal-900 via-black to-teal-900",
      textColor: "text-emerald-400",
      accentColor: "emerald-400",
      icon: null,
      svgPattern: "circuit",
      image: "/assets/projects/app/3.jpg",
      isCenter: false,
    },
    {
      id: 4,
      title: "Magazine",
      subtitle: "Short tag",
      category: "App Development",
      subcategory: "React",
      description: "Short description",
      bgGradient: "from-teal-900 via-black to-teal-900",
      textColor: "text-emerald-400",
      accentColor: "emerald-400",
      icon: null,
      svgPattern: "circuit",
      image: "/assets/projects/app/4.jpg",
      isCenter: false,
    },
    {
      id: 5,
      title: "Kacheri",
      subtitle: "Short tag",
      category: "App Development",
      subcategory: "React",
      description: "Short description",
      bgGradient: "from-teal-900 via-black to-teal-900",
      textColor: "text-emerald-400",
      accentColor: "emerald-400",
      icon: null,
      svgPattern: "circuit",
      image: "/assets/projects/app/5.jpg",
      isCenter: false,
    },
    {
      id: 6,
      title: "Rentoza",
      subtitle: "Short tag",
      category: "App Development",
      subcategory: "React",
      description: "Short description",
      bgGradient: "from-teal-900 via-black to-teal-900",
      textColor: "text-emerald-400",
      accentColor: "emerald-400",
      icon: null,
      svgPattern: "circuit",
      image: "/assets/projects/app/6.jpg",
      isCenter: false,
    },
  ];

  const webSubcategories = ["Flutter", "React"];

  const handleProjectClick = (project) => {
    // replace with navigation to project detail or modal open
    console.log("Project clicked:", project);
  };

  return (
          <ProjectsCarousel
            projects={projects}
            subcategories={webSubcategories}
            category="App Development"
            visiblePerPage={3}
            onProjectClick={handleProjectClick}
          />

  );
}
