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

export default function AppDevelopmentPage() {
  let projects = [
    { id: 1, title: "Mobile App 01", subtitle: "Short tag", category: "App Development", subcategory: "Mobile App", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/App_01.png", isCenter: false },
    { id: 2, title: "Mobile App 02", subtitle: "Short tag", category: "App Development", subcategory: "Mobile App", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/App_02.png", isCenter: false },
    { id: 3, title: "Mobile App 03", subtitle: "Short tag", category: "App Development", subcategory: "Mobile App", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/App_03.png", isCenter: false },
    { id: 4, title: "Mobile App 04", subtitle: "Short tag", category: "App Development", subcategory: "Mobile App", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/App_04.png", isCenter: false },
    { id: 6, title: "Mobile App 06", subtitle: "Short tag", category: "App Development", subcategory: "Mobile App", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/App_06.png", isCenter: false },
    { id: 5, title: "Mobile App 05", subtitle: "Short tag", category: "App Development", subcategory: "Mobile App", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/App_05.png", isCenter: false },
    { id: 7, title: "Mobile App 07", subtitle: "Short tag", category: "App Development", subcategory: "Mobile App", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/App_07.png", isCenter: false },
    { id: 8, title: "Mobile App 08", subtitle: "Short tag", category: "App Development", subcategory: "Mobile App", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/App_08.png", isCenter: false },
    { id: 10, title: "Mobile App 10", subtitle: "Short tag", category: "App Development", subcategory: "Mobile App", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/App_10.png", isCenter: false },
    { id: 9, title: "Mobile App 09", subtitle: "Short tag", category: "App Development", subcategory: "Mobile App", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/App_09.png", isCenter: false },
    // { id: 11, title: "UI/UX 01", subtitle: "Short tag", category: "App Development", subcategory: "UI/UX", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/UI_01.png", isCenter: false },
    // { id: 12, title: "UI/UX 02", subtitle: "Short tag", category: "App Development", subcategory: "UI/UX", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/app/UI_02.png", isCenter: false },
    // { id: 13, title: "UI/UX 03", subtitle: "Short tag", category: "App Development", subcategory: "UI/UX", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/app/UI_03.png", isCenter: false },
    // { id: 14, title: "UI/UX 04", subtitle: "Short tag", category: "App Development", subcategory: "UI/UX", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/app/UI_04.png", isCenter: false },
    // { id: 15, title: "UI/UX 05", subtitle: "Short tag", category: "App Development", subcategory: "UI/UX", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/app/UI_05.png", isCenter: false },
    // { id: 16, title: "UI/UX 06", subtitle: "Short tag", category: "App Development", subcategory: "UI/UX", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/app/UI_06.png", isCenter: false },
    // { id: 17, title: "UI/UX 07", subtitle: "Short tag", category: "App Development", subcategory: "UI/UX", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/app/UI_07.png", isCenter: false },
    // { id: 18, title: "UI/UX 08", subtitle: "Short tag", category: "App Development", subcategory: "UI/UX", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/app/UI_08.png", isCenter: false },
    // { id: 19, title: "UI/UX 09", subtitle: "Short tag", category: "App Development", subcategory: "UI/UX", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/app/UI_09.png", isCenter: false },
    // { id: 20, title: "UI/UX 10", subtitle: "Short tag", category: "App Development", subcategory: "UI/UX", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/app/UI_10.png", isCenter: false },
    // { id: 21, title: "UI/UX 11", subtitle: "Short tag", category: "App Development", subcategory: "UI/UX", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/app/UI_11.png", isCenter: false },
    // { id: 22, title: "UI/UX 12", subtitle: "Short tag", category: "App Development", subcategory: "UI/UX", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/app/UI_12.png", isCenter: false },
    // { id: 23, title: "UI/UX 13", subtitle: "Short tag", category: "App Development", subcategory: "UI/UX", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/app/UI_13.png", isCenter: false },
    // { id: 24, title: "UI/UX 14", subtitle: "Short tag", category: "App Development", subcategory: "UI/UX", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/app/UI_14.png", isCenter: false },
    // { id: 25, title: "UI/UX 15", subtitle: "Short tag", category: "App Development", subcategory: "UI/UX", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/app/UI_15.png", isCenter: false },
    // { id: 26, title: "UI/UX 16", subtitle: "Short tag", category: "App Development", subcategory: "UI/UX", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/app/UI_16.png", isCenter: false },
    // { id: 27, title: "UI/UX 17", subtitle: "Short tag", category: "App Development", subcategory: "UI/UX", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/app/UI_17.png", isCenter: false },
    // { id: 28, title: "UI/UX 18", subtitle: "Short tag", category: "App Development", subcategory: "UI/UX", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/app/UI_18.png", isCenter: false },
    // { id: 29, title: "UI/UX 19", subtitle: "Short tag", category: "App Development", subcategory: "UI/UX", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/app/UI_19.png", isCenter: false },
    // { id: 30, title: "UI/UX 20", subtitle: "Short tag", category: "App Development", subcategory: "UI/UX", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/app/UI_20.png", isCenter: false },
    // { id: 31, title: "UI/UX 21", subtitle: "Short tag", category: "App Development", subcategory: "UI/UX", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/app/UI_21.png", isCenter: false },
    // { id: 32, title: "UI/UX 22", subtitle: "Short tag", category: "App Development", subcategory: "UI/UX", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/app/UI_22.png", isCenter: false },
    // { id: 33, title: "UI/UX 23", subtitle: "Short tag", category: "App Development", subcategory: "UI/UX", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/app/UI_23.png", isCenter: false },
    // { id: 34, title: "UI/UX 24", subtitle: "Short tag", category: "App Development", subcategory: "UI/UX", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/app/UI_24.png", isCenter: false },
  ];

  const webSubcategories = [];

  // projects = interleaveBySubcategory(projects, webSubcategories);

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
      />
    </Suspense>
  );
}
