import React from "react";
import ProjectsCarousel from "@/components/projects/Projects";
import { Suspense } from "react";

function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffleWithSeed(array, seed = 1) {
  const random = mulberry32(seed);
  return array
    .map((item) => ({ item, sort: random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

function interleaveBySubcategory(projects, order) {
  const groups = projects.reduce((acc, project) => {
    if (!acc[project.subcategory]) acc[project.subcategory] = [];
    acc[project.subcategory].push(project);
    return acc;
  }, {});
  const result = [];
  let added = true;

  while (added) {
    added = false;
    for (const sub of order) {
      if (groups[sub] && groups[sub].length > 0) {
        result.push(groups[sub].shift());
        added = true;
      }
    }
  }

  return result;
}

export default function WebDevelopmentPage() {
  let projects = [
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
      image: "/assets/projects/app/1.webp",
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
      image: "/assets/projects/app/2.webp",
      isCenter: false,
    },
    {
      id: 3,
      title: "Alhosn UAE",
      subtitle: "Short tag",
      category: "App Development",
      subcategory: "Flutter",
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

  projects = interleaveBySubcategory(projects, webSubcategories);

  const handleProjectClick = (project) => {
    console.log("Project clicked:", project);
  };

  return (
    <Suspense>
      <ProjectsCarousel
        projects={projects}
        subcategories={webSubcategories}
        category="App Development"
        visiblePerPage={3}
        onProjectClick={handleProjectClick}
      />
    </Suspense>
  );
}
