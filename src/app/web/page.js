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
    { id: 1, title: "Antenna Now", subtitle: "Antenna & TV Wall Mounting Services Melbourne", category: "Web Development", subcategory: "WordPress", description: "Your Trusted Experts in Antenna and Home Entertainment Solutions", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-WordPress_01.png", isCenter: false, link: "https://antennanow.com.au/" },
    { id: 2, title: "You & Min", subtitle: "Your Trusted Mortgage Partner in New York", category: "Web Development", subcategory: "WordPress", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-WordPress_02.png", isCenter: false },
    { id: 4, title: "The Antenna", subtitle: "Professional Antenna & TV Wall Mounting Services", category: "Web Development", subcategory: "WordPress", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-WordPress_04.png", isCenter: false, link: "https://theantenna.com.au/" },
    { id: 3, title: "Rockford Mortgage Group", subtitle: "Your Premier Mortgage Partner in New York", category: "Web Development", subcategory: "WordPress", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-WordPress_03.png", isCenter: false, link: "https://rockfordmg.com/" },
    { id: 5, title: "Ali Jafri", subtitle: "Corporate Trainer, Leadership Consultant & Philanthropist", category: "Web Development", subcategory: "WordPress", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-WordPress_05.png", isCenter: false, link: "https://alijafry.com/" },
    { id: 6, title: "14 Star Limo", subtitle: "Australia's Leading Chauffeur Car Service", category: "Web Development", subcategory: "WordPress", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-WordPress_06.png", isCenter: false, link: "https://14starlimo.com.au/" },
    { id: 8, title: "Madinatul Ilm School", subtitle: "Empowering Minds, Enriching Souls", category: "Web Development", subcategory: "WordPress", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-WordPress_08.png", isCenter: false, link: "https://mtis.edu.pk/" },
    { id: 7, title: "The Aussie Crops", subtitle: "Your Finest Vegies & Fruit Served Next Door", category: "Web Development", subcategory: "WordPress", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-WordPress_07.png", isCenter: false, link: "https://theaussiecrops.com.au/" },
    { id: 9, title: "Owl Watch Services", subtitle: "Professional Guarding & Security Solutions", category: "Web Development", subcategory: "WordPress", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-WordPress_09.png", isCenter: false, link: "https://owlwatchservices.com/" },
    { id: 10, title: "Herbion US", subtitle: "Discover the Power of Nature", category: "Web Development", subcategory: "WordPress", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-WordPress_10.png", isCenter: false, link: "https://herbion.us/" },
    { id: 12, title: "TSB Education", subtitle: "The School of Business Education", category: "Web Development", subcategory: "WordPress", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-WordPress_12.png", isCenter: false, link: "https://tsbeducation.com/" },
    { id: 11, title: "GCI Consulting", subtitle: "Global Business & Technology Solutions", category: "Web Development", subcategory: "WordPress", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-WordPress_11.png", isCenter: false, link: "https://gciconsulting.com/" },
    { id: 13, title: "EDLAB Pakistan", subtitle: "Innovating Learning & Educational Solutions", category: "Web Development", subcategory: "WordPress", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-WordPress_13.png", isCenter: false, link: "https://online.edlabpakistan.com/" },
    { id: 14, title: "LOOB Inc", subtitle: "Be The Change - Empowering Communities", category: "Web Development", subcategory: "WordPress", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-WordPress_14.png", isCenter: false, link: "https://loobinc.com/" },
    { id: 16, title: "The Fin Tax", subtitle: "Strategic Tax Consulting & Accounting Solutions", category: "Web Development", subcategory: "WordPress", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-WordPress_16.png", isCenter: false, link: "https://thefintax.com/" },
    { id: 15, title: "Fin Talk", subtitle: "Professional Financial Advisory Services", category: "Web Development", subcategory: "WordPress", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-WordPress_15.png", isCenter: false, link: "https://fintalk.com.pk/wp/" },
    { id: 17, title: "NS Elizabeth", subtitle: "Bespoke Fashion & Apparel Design", category: "Web Development", subcategory: "WordPress", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-WordPress_17.png", isCenter: false, link: "https://nselizabeth.com/" },
    { id: 18, title: "Pixify Hub", subtitle: "Top Branding & Web Design Agency", category: "Web Development", subcategory: "WordPress", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-WordPress_18.png", isCenter: false, link: "https://pixifyhub.com/" },
    { id: 20, title: "SQLRG", subtitle: "Southern Queensland Land Rehabilitation Group", category: "Web Development", subcategory: "WordPress", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-WordPress_20.png", isCenter: false, link: "https://sqlrg.org/" },
    { id: 19, title: "Rockford Legal Group", subtitle: "Dedicated Legal Representation & Counsel", category: "Web Development", subcategory: "WordPress", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-WordPress_19.png", isCenter: false, link: "https://rockfordlg.com/" },
    // { id: 27, title: "Career Connector", subtitle: "", category: "Web Development", subcategory: "WordPress", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-Custom_07.png", isCenter: false },

    { id: 21, title: "Cars Finder Pro", subtitle: "Find Your Perfect Vehicle", category: "Web Development", subcategory: "Custom", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-Custom_01.png", isCenter: false },
    { id: 22, title: "USAMPAC", subtitle: "US Asian Marketing & Political Affairs Committee", category: "Web Development", subcategory: "Custom", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-Custom_02.png", isCenter: false, link: "#" },
    { id: 24, title: "O360 Cloud", subtitle: "Cloud Integration & Business Solutions", category: "Web Development", subcategory: "Custom", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-Custom_04.png", isCenter: false, link: "https://www.o360cloud.com/" },
    { id: 23, title: "Auto Cars", subtitle: "Premium Automotive Dealership Platform", category: "Web Development", subcategory: "Custom", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-Custom_03.png", isCenter: false },
    { id: 25, title: "O360 Cloud", subtitle: "Cloud Integration & Business Solutions", category: "Web Development", subcategory: "Custom", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-Custom_05.png", isCenter: false, link: "https://www.o360cloud.com/" },
    { id: 26, title: "DarkAnon Systems", subtitle: "Cybersecurity That's Always a Step Ahead", category: "Web Development", subcategory: "Custom", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-Custom_06.png", isCenter: false, link: "https://www.darkanonsys.com/" },
    
    // { id: 29, title: "Pop CHarm", subtitle: "", category: "Web Development", subcategory: "Shopify", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-Shopify_02.png", isCenter: false, link: "https://popcharmshop.com" },
    { id: 31, title: "Rentoza", subtitle: "Subscription-Based Electronics & Appliances", category: "Web Development", subcategory: "Shopify", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-Shopify_04.png", isCenter: false, link: "https://rentoza.co.za/" },
    { id: 30, title: "VaporDNA", subtitle: "Premier Online Vape & E-Cigarette Store", category: "Web Development", subcategory: "Shopify", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-Shopify_03.png", isCenter: false, link: "https://vapordna.com/" },
    { id: 33, title: "Aussie Crops", subtitle: "Fresh Quality Produce Delivered Direct", category: "Web Development", subcategory: "Shopify", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-Shopify_06.png", isCenter: false, link: "https://aussiecrops.au/" },
    { id: 32, title: "Pop Charm", subtitle: "Trendy Jewelry & Charm Accessories", category: "Web Development", subcategory: "Shopify", description: "Short description", bgGradient: "from-teal-900 via-black to-teal-900", textColor: "text-emerald-400", accentColor: "emerald-400", icon: null, svgPattern: "circuit", image: "/assets/projects/Web-Shopify_05.png", isCenter: false, link: "https://popcharmshop.com/" },
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
