"use client";

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
    .map(({ item }, index) => ({ ...item, id: index + 1 }));
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
    { id: 1, title: "Antenna Now", subtitle: "Your Trusted Experts in Antenna and Home Entertainment Solutions", category: "Web Development", subcategory: "WordPress", description: "Your Trusted Experts in Antenna and Home Entertainment Solutions", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-WordPress_01.png", isCenter: false, link: "https://antennanow.com.au/" },
    { id: 2, title: "You & Min", subtitle: "Your Trusted Mortgage Partner in New York", category: "Web Development", subcategory: "WordPress", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-WordPress_02.png", isCenter: false },
    { id: 4, title: "The Antenna", subtitle: "Your Trusted Experts in Antenna and Home Entertainment Solutions", category: "Web Development", subcategory: "WordPress", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-WordPress_04.png", isCenter: false, link: "https://theantenna.com.au/" },
    { id: 3, title: "Rockford Mortage", subtitle: "Your Trusted Mortgage Partner in New York", category: "Web Development", subcategory: "WordPress", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-WordPress_03.png", isCenter: false, link: "https://rockfordmg.com/" },
    { id: 5, title: "Ali Jafri", subtitle: "Philanthropist & Leadership Trainer", category: "Web Development", subcategory: "WordPress", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-WordPress_05.png", isCenter: false, link: "https://alijafry.com/" },
    { id: 6, title: "14 Star Limo", subtitle: "Australia's leading Chauffeur Car Service.", category: "Web Development", subcategory: "WordPress", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-WordPress_06.png", isCenter: false, link: "https://14starlimo.com.au/" },
    { id: 8, title: "MTIS", subtitle: "Madinatul Ilm School", category: "Web Development", subcategory: "WordPress", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-WordPress_08.png", isCenter: false, link: "https://mtis.edu.pk/" },
    { id: 7, title: "Aussie Crops", subtitle: "Your Finest Vegies & Fruit Served Next Door!", category: "Web Development", subcategory: "WordPress", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-WordPress_07.png", isCenter: false, link: "https://theaussiecrops.com.au/" },
    { id: 9, title: "Owl Watch Services", subtitle: "Security Services", category: "Web Development", subcategory: "WordPress", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-WordPress_09.png", isCenter: false, link: "https://owlwatchservices.com/" },
    { id: 10, title: "Herbion", subtitle: "Discover the Power of Nature", category: "Web Development", subcategory: "WordPress", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-WordPress_10.png", isCenter: false, link: "https://herbion.us/" },
    { id: 12, title: "TSB", subtitle: "The School of Business Education", category: "Web Development", subcategory: "WordPress", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-WordPress_12.png", isCenter: false, link: "https://tsbeducation.com/" },
    { id: 11, title: "GCI", subtitle: "", category: "Web Development", subcategory: "WordPress", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-WordPress_11.png", isCenter: false, link: "https://gciconsulting.com/" },
    { id: 13, title: "ED LAB", subtitle: "", category: "Web Development", subcategory: "WordPress", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-WordPress_13.png", isCenter: false, link: "https://online.edlabpakistan.com/" },
    { id: 14, title: "NGO LOOB", subtitle: "Be The Change", category: "Web Development", subcategory: "WordPress", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-WordPress_14.png", isCenter: false, link: "https://loobinc.com/" },
    { id: 16, title: "Fin Tax", subtitle: "Strategic Tax Consulting! Effortless Tax & Accounting Solutions for Your Business", category: "Web Development", subcategory: "WordPress", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-WordPress_16.png", isCenter: false, link: "https://thefintax.com/" },
    { id: 15, title: "Fin Talk", subtitle: "Trust us to handle your financial matters with professionalism and care.", category: "Web Development", subcategory: "WordPress", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-WordPress_15.png", isCenter: false, link: "https://fintalk.com.pk/wp/" },
    { id: 17, title: "NS Elizabeth", subtitle: "", category: "Web Development", subcategory: "WordPress", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-WordPress_17.png", isCenter: false, link: "https://nselizabeth.com/" },
    { id: 18, title: "Pixify Hub", subtitle: "Top-Rated Logo & Web Design Services in USA TOP BRANDING & WEB DESIGN AGENCY", category: "Web Development", subcategory: "WordPress", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-WordPress_18.png", isCenter: false, link: "https://pixifyhub.com/" },
    { id: 20, title: "SQLRG", subtitle: "Southern Queensland Land Rehabilitation Group", category: "Web Development", subcategory: "WordPress", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-WordPress_20.png", isCenter: false, link: "https://sqlrg.org/" },
    { id: 19, title: "Rockford Law", subtitle: "We Fight For Your Justice As Like A Friend.", category: "Web Development", subcategory: "WordPress", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-WordPress_19.png", isCenter: false, link: "https://rockfordlg.com/" },

    { id: 21, title: "IRC Booking System", subtitle: "", category: "Web Development", subcategory: "Custom", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-Custom_01.png", isCenter: false },
    { id: 22, title: "Cars Finder Pro", subtitle: "Cars Finder Services", category: "Web Development", subcategory: "Custom", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-Custom_02.png", isCenter: false, link: "https://www.carsfinderpro.com/" },
    { id: 24, title: "O 360", subtitle: "", category: "Web Development", subcategory: "Custom", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-Custom_04.png", isCenter: false, link: "https://www.o360cloud.com/" },
    { id: 23, title: "Cars Finder Admin", subtitle: "", category: "Web Development", subcategory: "Custom", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-Custom_03.png", isCenter: false },
    { id: 25, title: "Baseus", subtitle: "", category: "Web Development", subcategory: "Custom", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-Custom_05.png", isCenter: false, link: "https://www.baseus.com/" },
    { id: 26, title: "Darkanon", subtitle: "Cybersecurity that's always a step ahead", category: "Web Development", subcategory: "Custom", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-Custom_06.png", isCenter: false, link: "https://www.darkanonsys.com/" },
    
    { id: 29, title: "Bechlo", subtitle: "", category: "Web Development", subcategory: "Shopify", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-Shopify_02.png", isCenter: false, link: "https://bechlo.pk/" },
    { id: 27, title: "Owl Watch Cloud Panel", subtitle: "", category: "Web Development", subcategory: "Custom", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-Custom_07.png", isCenter: false },
    { id: 30, title: "Ecommalis", subtitle: "Every Thing You Want Only On a Click", category: "Web Development", subcategory: "Shopify", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-Shopify_03.png", isCenter: false, link: "https://ecommalis.com/" },
    { id: 31, title: "Jayshrees", subtitle: "The Jayshrees/Rivaz Group is dedicated to be a world class Indian Ethnic supplier in the retail and wholesale markets in Africa.", category: "Web Development", subcategory: "Shopify", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-Shopify_04.png", isCenter: false, link: "https://jayshrees.co.za/" },
    { id: 33, title: "Rentoza", subtitle: "Every Thing You Want Only On a Click", category: "Web Development", subcategory: "Shopify", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-Shopify_06.png", isCenter: false, link: "https://rentoza.co.za/" },
    { id: 32, title: "VaporDNA", subtitle: "loud E-Liquid", category: "Web Development", subcategory: "Shopify", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-Shopify_05.png", isCenter: false, link: "https://vapordna.com/" },
    // { id: 28, title: "Pop Charm", subtitle: "", category: "Web Development", subcategory: "Shopify", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-Shopify_01.png", isCenter: false, link: "https://popcharmshop.com/" },
  ];

  const webSubcategories = ["WordPress", "Shopify", "Custom"];

  // projects = interleaveBySubcategory(projects, webSubcategories);

  const handleProjectClick = (project) => {
    console.log("Project clicked:", project);
  };

  return (
    <Suspense>
      <ProjectsCarousel
        projects={projects}
        subcategories={webSubcategories}
        category="Web Development"
        visiblePerPage={3}
      />
    </Suspense>
  );
}