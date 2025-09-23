"use client";

import React, { useState } from "react";
import ProjectsCarousel from "@/components/projects/Projects";
import { X, Monitor } from "lucide-react";
import { Suspense } from "react";

const PDFPopupModal = ({ isOpen, onClose, project }) => {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="relative max-w-6xl w-full max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-60 bg-teal-500 hover:bg-teal-900 text-white rounded-full p-2 transition-colors duration-200 shadow-lg"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-t-2xl p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Monitor className="w-6 h-6 text-emerald-400" />
              <h2 className="text-xl font-bold text-white">{project.title}</h2>
            </div>
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
            </div>
          </div>

          <div className="bg-black p-6 rounded-lg shadow-inner">
            <div
              className="bg-white rounded overflow-hidden shadow-lg"
              style={{ aspectRatio: "16/9" }}
            >
              {project.pdfPath ? (
                <iframe
                  src={project.pdfPath}
                  className="w-full h-full"
                  title={`${project.title} PDF`}
                  style={{ minHeight: "500px" }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                  <div className="text-center">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="max-w-md max-h-80 object-contain mx-auto rounded-lg shadow-lg"
                    />
                    <p className="mt-4 text-slate-600">
                      No PDF available for this project
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <div className="w-32 h-8 bg-gradient-to-b from-slate-700 to-slate-800 rounded-b-2xl shadow-lg"></div>
          </div>
          <div className="flex justify-center mt-2">
            <div className="w-48 h-4 bg-gradient-to-b from-slate-600 to-slate-700 rounded-full shadow-lg"></div>
          </div>
        </div>
        <div className="bg-slate-900 rounded-b-2xl p-6 border-t border-slate-700">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">
                {project.title}
              </h3>
              <p className="text-emerald-400 text-sm mb-2">
                {project.category} • {project.subcategory}
              </p>
              <p className="text-slate-300 text-sm">{project.description}</p>
            </div>
            {project.pdfPath && (
              <a
                href={project.pdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
              >
                <Monitor className="w-4 h-4" />
                <span>Open PDF</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

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
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  let projects = [
    {
      id: 1,
      title: "Metro Realty",
      subtitle: "",
      category: "UI/UX",
      subcategory: "WordPress",
      description: "Short description",
      bgGradient: "from-teal-900 via-black to-teal-900",
      textColor: "text-emerald-400",
      accentColor: "emerald-400",
      icon: null,
      svgPattern: "circuit",
      image: "/assets/projects/uiux/wordpress/1.jpg",
      isCenter: false,
    },
    {
      id: 2,
      title: "NGO Loob",
      subtitle: "",
      category: "UI/UX",
      subcategory: "WordPress",
      description: "Short description",
      bgGradient: "from-teal-900 via-black to-teal-900",
      textColor: "text-emerald-400",
      accentColor: "emerald-400",
      icon: null,
      svgPattern: "circuit",
      image: "/assets/projects/uiux/wordpress/2.jpg",
      isCenter: false,
      pdfPath: "/assets/projects/uiux/2.pdf",
    },
    {
      id: 3,
      title: "PMC",
      subtitle: "",
      category: "UI/UX",
      subcategory: "WordPress",
      description: "Short description",
      bgGradient: "from-teal-900 via-black to-teal-900",
      textColor: "text-emerald-400",
      accentColor: "emerald-400",
      icon: null,
      svgPattern: "circuit",
      image: "/assets/projects/uiux/wordpress/3.jpg",
      isCenter: false,
    },
    {
      id: 4,
      title: "Rockford Mortage",
      subtitle: "",
      category: "UI/UX",
      subcategory: "WordPress",
      description: "Short description",
      bgGradient: "from-teal-900 via-black to-teal-900",
      textColor: "text-emerald-400",
      accentColor: "emerald-400",
      icon: null,
      svgPattern: "circuit",
      image: "/assets/projects/uiux/wordpress/4.jpg",
      isCenter: false,
      pdfPath: "/assets/projects/uiux/4.pdf",
    },
    {
      id: 5,
      title: "Speaki Web",
      subtitle: "",
      category: "UI/UX",
      subcategory: "WordPress",
      description: "Short description",
      bgGradient: "from-teal-900 via-black to-teal-900",
      textColor: "text-emerald-400",
      accentColor: "emerald-400",
      icon: null,
      svgPattern: "circuit",
      image: "/assets/projects/uiux/wordpress/5.jpg",
      isCenter: false,
    },
    {
      id: 6,
      title: "Taha Khan",
      subtitle: "",
      category: "UI/UX",
      subcategory: "WordPress",
      description: "Short description",
      bgGradient: "from-teal-900 via-black to-teal-900",
      textColor: "text-emerald-400",
      accentColor: "emerald-400",
      icon: null,
      svgPattern: "circuit",
      image: "/assets/projects/uiux/wordpress/6.jpg",
      isCenter: false,
    },
    {
      id: 7,
      title: "TSB",
      subtitle: "",
      category: "UI/UX",
      subcategory: "WordPress",
      description: "Short description",
      bgGradient: "from-teal-900 via-black to-teal-900",
      textColor: "text-emerald-400",
      accentColor: "emerald-400",
      icon: null,
      svgPattern: "circuit",
      image: "/assets/projects/uiux/wordpress/7.jpg",
      isCenter: false,
      pdfPath: "/assets/projects/uiux/7.pdf",
    },
    {
      id: 8,
      title: "Verve",
      subtitle: "",
      category: "UI/UX",
      subcategory: "WordPress",
      description: "Short description",
      bgGradient: "from-teal-900 via-black to-teal-900",
      textColor: "text-emerald-400",
      accentColor: "emerald-400",
      icon: null,
      svgPattern: "circuit",
      image: "/assets/projects/uiux/wordpress/8.jpg",
      isCenter: false,
    },
    {
      id: 9,
      title: "ZVCO",
      subtitle: "",
      category: "UI/UX",
      subcategory: "WordPress",
      description: "Short description",
      bgGradient: "from-teal-900 via-black to-teal-900",
      textColor: "text-emerald-400",
      accentColor: "emerald-400",
      icon: null,
      svgPattern: "circuit",
      image: "/assets/projects/uiux/wordpress/9.jpg",
      isCenter: false,
    },
    {
      id: 10,
      title: "14 Star Limo",
      subtitle: "",
      category: "UI/UX",
      subcategory: "WordPress",
      description: "Short description",
      bgGradient: "from-teal-900 via-black to-teal-900",
      textColor: "text-emerald-400",
      accentColor: "emerald-400",
      icon: null,
      svgPattern: "circuit",
      image: "/assets/projects/uiux/wordpress/10.jpg",
      isCenter: false,
      pdfPath: "/assets/projects/uiux/10.pdf",
    },
    {
      id: 11,
      title: "Ali Jafri",
      subtitle: "",
      category: "UI/UX",
      subcategory: "WordPress",
      description: "Short description",
      bgGradient: "from-teal-900 via-black to-teal-900",
      textColor: "text-emerald-400",
      accentColor: "emerald-400",
      icon: null,
      svgPattern: "circuit",
      image: "/assets/projects/uiux/wordpress/11.jpg",
      isCenter: false,
      pdfPath: "/assets/projects/uiux/11.pdf",
    },
    {
      id: 12,
      title: "Antenna Now",
      subtitle: "",
      category: "UI/UX",
      subcategory: "WordPress",
      description: "Short description",
      bgGradient: "from-teal-900 via-black to-teal-900",
      textColor: "text-emerald-400",
      accentColor: "emerald-400",
      icon: null,
      svgPattern: "circuit",
      image: "/assets/projects/uiux/wordpress/12.jpg",
      isCenter: false,
      pdfPath: "/assets/projects/uiux/12.pdf",
    },
    {
      id: 13,
      title: "The Antenna",
      subtitle: "",
      category: "UI/UX",
      subcategory: "WordPress",
      description: "Short description",
      bgGradient: "from-teal-900 via-black to-teal-900",
      textColor: "text-emerald-400",
      accentColor: "emerald-400",
      icon: null,
      svgPattern: "circuit",
      image: "/assets/projects/uiux/wordpress/13.jpg",
      isCenter: false,
      pdfPath: "/assets/projects/uiux/13.pdf",
    },
    {
      id: 14,
      title: "Aussie Crops",
      subtitle: "",
      category: "UI/UX",
      subcategory: "WordPress",
      description: "Short description",
      bgGradient: "from-teal-900 via-black to-teal-900",
      textColor: "text-emerald-400",
      accentColor: "emerald-400",
      icon: null,
      svgPattern: "circuit",
      image: "/assets/projects/uiux/wordpress/14.jpg",
      isCenter: false,
      pdfPath: "/assets/projects/uiux/14.pdf",
    },
    {
      id: 15,
      title: "Baseus",
      subtitle: "",
      category: "UI/UX",
      subcategory: "WordPress",
      description: "Short description",
      bgGradient: "from-teal-900 via-black to-teal-900",
      textColor: "text-emerald-400",
      accentColor: "emerald-400",
      icon: null,
      svgPattern: "circuit",
      image: "/assets/projects/uiux/wordpress/15.jpg",
      isCenter: false,
      pdfPath: "/assets/projects/uiux/15.pdf",
    },
    {
      id: 16,
      title: "Career Connector",
      subtitle: "",
      category: "UI/UX",
      subcategory: "WordPress",
      description: "Short description",
      bgGradient: "from-teal-900 via-black to-teal-900",
      textColor: "text-emerald-400",
      accentColor: "emerald-400",
      icon: null,
      svgPattern: "circuit",
      image: "/assets/projects/uiux/wordpress/16.jpg",
      isCenter: false,
    },
    {
      id: 17,
      title: "Daraz Oye",
      subtitle: "",
      category: "UI/UX",
      subcategory: "WordPress",
      description: "Short description",
      bgGradient: "from-teal-900 via-black to-teal-900",
      textColor: "text-emerald-400",
      accentColor: "emerald-400",
      icon: null,
      svgPattern: "circuit",
      image: "/assets/projects/uiux/wordpress/17.jpg",
      isCenter: false,
    },
    {
      id: 18,
      title: "Ed Lab",
      subtitle: "",
      category: "UI/UX",
      subcategory: "WordPress",
      description: "Short description",
      bgGradient: "from-teal-900 via-black to-teal-900",
      textColor: "text-emerald-400",
      accentColor: "emerald-400",
      icon: null,
      svgPattern: "circuit",
      image: "/assets/projects/uiux/wordpress/18.jpg",
      isCenter: false,
      pdfPath: "/assets/projects/uiux/18.pdf",
    },
    {
      id: 19,
      title: "Fintalk",
      subtitle: "",
      category: "UI/UX",
      subcategory: "WordPress",
      description: "Short description",
      bgGradient: "from-teal-900 via-black to-teal-900",
      textColor: "text-emerald-400",
      accentColor: "emerald-400",
      icon: null,
      svgPattern: "circuit",
      image: "/assets/projects/uiux/wordpress/19.jpg",
      isCenter: false,
      pdfPath: "/assets/projects/uiux/19.pdf",
    },
    {
      id: 20,
      title: "GCI",
      subtitle: "",
      category: "UI/UX",
      subcategory: "WordPress",
      description: "Short description",
      bgGradient: "from-teal-900 via-black to-teal-900",
      textColor: "text-emerald-400",
      accentColor: "emerald-400",
      icon: null,
      svgPattern: "circuit",
      image: "/assets/projects/uiux/wordpress/20.jpg",
      isCenter: false,
      pdfPath: "/assets/projects/uiux/20.pdf",
    },
    {
      id: 21,
      title: "Herbion",
      subtitle: "",
      category: "UI/UX",
      subcategory: "WordPress",
      description: "Short description",
      bgGradient: "from-teal-900 via-black to-teal-900",
      textColor: "text-emerald-400",
      accentColor: "emerald-400",
      icon: null,
      svgPattern: "circuit",
      image: "/assets/projects/uiux/wordpress/21.jpg",
      isCenter: false,
      pdfPath: "/assets/projects/uiux/21.pdf",
    },
    {
      id: 22,
      title: "My Income Guy",
      subtitle: "",
      category: "UI/UX",
      subcategory: "WordPress",
      description: "Short description",
      bgGradient: "from-teal-900 via-black to-teal-900",
      textColor: "text-emerald-400",
      accentColor: "emerald-400",
      icon: null,
      svgPattern: "circuit",
      image: "/assets/projects/uiux/wordpress/22.jpg",
      isCenter: false,
      pdfPath: "/assets/projects/uiux/22.pdf",
    },
    {
      id: 23,
      title: "Maria Jewllers",
      subtitle: "",
      category: "UI/UX",
      subcategory: "WordPress",
      description: "Short description",
      bgGradient: "from-teal-900 via-black to-teal-900",
      textColor: "text-emerald-400",
      accentColor: "emerald-400",
      icon: null,
      svgPattern: "circuit",
      image: "/assets/projects/uiux/wordpress/23.jpg",
      isCenter: false,
    },
    {
      id: 24,
      title: "Bechlo",
      subtitle: "",
      category: "UI/UX",
      subcategory: "Shopify",
      description: "Short description",
      bgGradient: "from-teal-900 via-black to-teal-900",
      textColor: "text-emerald-400",
      accentColor: "emerald-400",
      icon: null,
      svgPattern: "circuit",
      image: "/assets/projects/uiux/shopify/1.jpg",
      isCenter: false,
      pdfPath: "/assets/projects/uiux/24.pdf",
    },
    {
      id: 25,
      title: "Disposable",
      subtitle: "",
      category: "UI/UX",
      subcategory: "Shopify",
      description: "Short description",
      bgGradient: "from-teal-900 via-black to-teal-900",
      textColor: "text-emerald-400",
      accentColor: "emerald-400",
      icon: null,
      svgPattern: "circuit",
      image: "/assets/projects/uiux/shopify/2.jpg",
      isCenter: false,
    },
    {
      id: 26,
      title: "Jayshrees Rivaz",
      subtitle: "",
      category: "UI/UX",
      subcategory: "Shopify",
      description: "Short description",
      bgGradient: "from-teal-900 via-black to-teal-900",
      textColor: "text-emerald-400",
      accentColor: "emerald-400",
      icon: null,
      svgPattern: "circuit",
      image: "/assets/projects/uiux/shopify/3.jpg",
      isCenter: false,
    },
    {
      id: 27,
      title: "Pop Charm",
      subtitle: "",
      category: "UI/UX",
      subcategory: "Shopify",
      description: "Short description",
      bgGradient: "from-teal-900 via-black to-teal-900",
      textColor: "text-emerald-400",
      accentColor: "emerald-400",
      icon: null,
      svgPattern: "circuit",
      image: "/assets/projects/uiux/shopify/4.jpg",
      isCenter: false,
      pdfPath: "/assets/projects/uiux/27.pdf",
    },
    {
      id: 28,
      title: "Rentoza",
      subtitle: "",
      category: "UI/UX",
      subcategory: "Shopify",
      description: "Short description",
      bgGradient: "from-teal-900 via-black to-teal-900",
      textColor: "text-emerald-400",
      accentColor: "emerald-400",
      icon: null,
      svgPattern: "circuit",
      image: "/assets/projects/uiux/shopify/5.jpg",
      isCenter: false,
    },
    {
      id: 29,
      title: "VaporDNA",
      subtitle: "",
      category: "UI/UX",
      subcategory: "Shopify",
      description: "Short description",
      bgGradient: "from-teal-900 via-black to-teal-900",
      textColor: "text-emerald-400",
      accentColor: "emerald-400",
      icon: null,
      svgPattern: "circuit",
      image: "/assets/projects/uiux/shopify/6.jpg",
      isCenter: false,
    },
    {
      id: 30,
      title: "Baseus",
      subtitle: "",
      category: "UI/UX",
      subcategory: "Custom",
      description: "Short description",
      bgGradient: "from-teal-900 via-black to-teal-900",
      textColor: "text-emerald-400",
      accentColor: "emerald-400",
      icon: null,
      svgPattern: "circuit",
      image: "/assets/projects/uiux/custom/1.jpg",
      isCenter: false,
    },
    {
      id: 31,
      title: "IRC Booking System",
      subtitle: "",
      category: "UI/UX",
      subcategory: "Custom",
      description: "Short description",
      bgGradient: "from-teal-900 via-black to-teal-900",
      textColor: "text-emerald-400",
      accentColor: "emerald-400",
      icon: null,
      svgPattern: "circuit",
      image: "/assets/projects/uiux/custom/2.jpg",
      isCenter: false,
    },
    {
      id: 32,
      title: "Cars Finder Admin",
      subtitle: "",
      category: "UI/UX",
      subcategory: "Custom",
      description: "Short description",
      bgGradient: "from-teal-900 via-black to-teal-900",
      textColor: "text-emerald-400",
      accentColor: "emerald-400",
      icon: null,
      svgPattern: "circuit",
      image: "/assets/projects/uiux/custom/3.jpg",
      isCenter: false,
      pdfPath: "/assets/projects/uiux/32.pdf",
    },
    {
      id: 33,
      title: "Cars Finder Pro",
      subtitle: "",
      category: "UI/UX",
      subcategory: "Custom",
      description: "Short description",
      bgGradient: "from-teal-900 via-black to-teal-900",
      textColor: "text-emerald-400",
      accentColor: "emerald-400",
      icon: null,
      svgPattern: "circuit",
      image: "/assets/projects/uiux/custom/4.jpg",
      isCenter: false,
      pdfPath: "/assets/projects/uiux/33.pdf",
    },
    {
      id: 34,
      title: "Auto Cars",
      subtitle: "",
      category: "UI/UX",
      subcategory: "Custom",
      description: "Short description",
      bgGradient: "from-teal-900 via-black to-teal-900",
      textColor: "text-emerald-400",
      accentColor: "emerald-400",
      icon: null,
      svgPattern: "circuit",
      image: "/assets/projects/uiux/custom/5.jpg",
      isCenter: false,
    },
    {
      id: 35,
      title: "Darkanon",
      subtitle: "",
      category: "UI/UX",
      subcategory: "Custom",
      description: "Short description",
      bgGradient: "from-teal-900 via-black to-teal-900",
      textColor: "text-emerald-400",
      accentColor: "emerald-400",
      icon: null,
      svgPattern: "circuit",
      image: "/assets/projects/uiux/custom/6.jpg",
      isCenter: false,
    },
    {
      id: 36,
      title: "Clean UI",
      subtitle: "",
      category: "UI/UX",
      subcategory: "Custom",
      description: "Short description",
      bgGradient: "from-teal-900 via-black to-teal-900",
      textColor: "text-emerald-400",
      accentColor: "emerald-400",
      icon: null,
      svgPattern: "circuit",
      image: "/assets/projects/uiux/custom/7.jpg",
      isCenter: false,
    },
    {
      id: 37,
      title: "O360",
      subtitle: "",
      category: "UI/UX",
      subcategory: "Custom",
      description: "Short description",
      bgGradient: "from-teal-900 via-black to-teal-900",
      textColor: "text-emerald-400",
      accentColor: "emerald-400",
      icon: null,
      svgPattern: "circuit",
      image: "/assets/projects/uiux/custom/8.jpg",
      isCenter: false,
      pdfPath: "/assets/projects/uiux/37.pdf",
    },
    {
      id: 38,
      title: "Smart Tender",
      subtitle: "",
      category: "UI/UX",
      subcategory: "Custom",
      description: "Short description",
      bgGradient: "from-teal-900 via-black to-teal-900",
      textColor: "text-emerald-400",
      accentColor: "emerald-400",
      icon: null,
      svgPattern: "circuit",
      image: "/assets/projects/uiux/custom/9.jpg",
      isCenter: false,
      pdfPath: "/assets/projects/uiux/38.pdf",
    },
    {
      id: 39,
      title: "USAMPAC",
      subtitle: "",
      category: "UI/UX",
      subcategory: "Custom",
      description: "Short description",
      bgGradient: "from-teal-900 via-black to-teal-900",
      textColor: "text-emerald-400",
      accentColor: "emerald-400",
      icon: null,
      svgPattern: "circuit",
      image: "/assets/projects/uiux/custom/10.jpg",
      isCenter: false,
    },
    {
      id: 40,
      title: "Cars Finder Pro",
      subtitle: "",
      category: "UI/UX",
      subcategory: "App",
      description: "Short description",
      bgGradient: "from-teal-900 via-black to-teal-900",
      textColor: "text-emerald-400",
      accentColor: "emerald-400",
      icon: null,
      svgPattern: "circuit",
      image: "/assets/projects/uiux/app/1.jpg",
      isCenter: false,
      pdfPath: "/assets/projects/uiux/40.pdf",
    },
    {
      id: 41,
      title: "E-Learning",
      subtitle: "",
      category: "UI/UX",
      subcategory: "App",
      description: "Short description",
      bgGradient: "from-teal-900 via-black to-teal-900",
      textColor: "text-emerald-400",
      accentColor: "emerald-400",
      icon: null,
      svgPattern: "circuit",
      image: "/assets/projects/uiux/app/2.jpg",
      isCenter: false,
      pdfPath: "/assets/projects/uiux/41.pdf",
    },
    {
      id: 42,
      title: "Evna",
      subtitle: "",
      category: "UI/UX",
      subcategory: "App",
      description: "Short description",
      bgGradient: "from-teal-900 via-black to-teal-900",
      textColor: "text-emerald-400",
      accentColor: "emerald-400",
      icon: null,
      svgPattern: "circuit",
      image: "/assets/projects/uiux/app/3.jpg",
      isCenter: false,
    },
    {
      id: 43,
      title: "Society",
      subtitle: "",
      category: "UI/UX",
      subcategory: "App",
      description: "Short description",
      bgGradient: "from-teal-900 via-black to-teal-900",
      textColor: "text-emerald-400",
      accentColor: "emerald-400",
      icon: null,
      svgPattern: "circuit",
      image: "/assets/projects/uiux/app/4.jpg",
      isCenter: false,
      pdfPath: "/assets/projects/uiux/43.pdf",
    },
    {
      id: 44,
      title: "Saba",
      subtitle: "",
      category: "UI/UX",
      subcategory: "App",
      description: "Short description",
      bgGradient: "from-teal-900 via-black to-teal-900",
      textColor: "text-emerald-400",
      accentColor: "emerald-400",
      icon: null,
      svgPattern: "circuit",
      image: "/assets/projects/uiux/app/5.jpg",
      isCenter: false,
    },
    {
      id: 45,
      title: "Swan",
      subtitle: "",
      category: "UI/UX",
      subcategory: "App",
      description: "Short description",
      bgGradient: "from-teal-900 via-black to-teal-900",
      textColor: "text-emerald-400",
      accentColor: "emerald-400",
      icon: null,
      svgPattern: "circuit",
      image: "/assets/projects/uiux/app/6.jpg",
      isCenter: false,
    },
  ];

  const webSubcategories = ["WordPress", "Shopify", "Custom", "App"];

  projects = interleaveBySubcategory(projects, webSubcategories);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <Suspense>
      <ProjectsCarousel
        projects={projects}
        subcategories={webSubcategories}
        category="UI/UX"
        visiblePerPage={3}
        onProjectClick={handleProjectClick}
      />
    </Suspense>
  );
}
