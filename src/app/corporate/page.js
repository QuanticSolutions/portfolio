import React from "react";
import ProjectsGrid from "@/components/projects/Projects";
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

export default function GamingPage() {

  var projects = [
    { id: 1, image: "/assets/projects/GFx-Banner_01.png", title: "Banners 01", category: "Graphic Design", subcategory: "Banners", link: "#" },
    { id: 2, image: "/assets/projects/GFx-Banner_02.png", title: "Banners 02", category: "Graphic Design", subcategory: "Banners", link: "#" },
    { id: 4, image: "/assets/projects/GFx-Banner_04.png", title: "Banners 04", category: "Graphic Design", subcategory: "Banners", link: "#" },
    { id: 3, image: "/assets/projects/GFx-Banner_03.png", title: "Banners 03", category: "Graphic Design", subcategory: "Banners", link: "#" },
    // { id: 5, image: "/assets/projects/GFx-Banner_05.png", title: "Banners 05", category: "Graphic Design", subcategory: "Banners", link: "#" },
    { id: 6, image: "/assets/projects/GFx-Banner_06.png", title: "Banners 06", category: "Graphic Design", subcategory: "Banners", link: "#" },
    { id: 7, image: "/assets/projects/GFx-BookCover_01.png", title: "Book Covers 01", category: "Graphic Design", subcategory: "Book Covers", link: "#" },
    { id: 9, image: "/assets/projects/GFx-BookCover_03.png", title: "Book Covers 03", category: "Graphic Design", subcategory: "Book Covers", link: "#" },
    { id: 8, image: "/assets/projects/GFx-BookCover_02.png", title: "Book Covers 02", category: "Graphic Design", subcategory: "Book Covers", link: "#" },
    { id: 10, image: "/assets/projects/GFx-BookCover_04.png", title: "Book Covers 04", category: "Graphic Design", subcategory: "Book Covers", link: "#" },
    { id: 11, image: "/assets/projects/GFx-BookCover_05.png", title: "Book Covers 05", category: "Graphic Design", subcategory: "Book Covers", link: "#" },
    { id: 13, image: "/assets/projects/GFx-BookCover_07.png", title: "Book Covers 07", category: "Graphic Design", subcategory: "Book Covers", link: "#" },
    { id: 12, image: "/assets/projects/GFx-BookCover_06.png", title: "Book Covers 06", category: "Graphic Design", subcategory: "Book Covers", link: "#" },
    { id: 14, image: "/assets/projects/GFx-BookCover_08.png", title: "Book Covers 08", category: "Graphic Design", subcategory: "Book Covers", link: "#" },
    { id: 15, image: "/assets/projects/GFx-BookCover_09.png", title: "Book Covers 09", category: "Graphic Design", subcategory: "Book Covers", link: "#" },
    { id: 17, image: "/assets/projects/GFx-BusinessCard_01.png", title: "Business Cards 01", category: "Graphic Design", subcategory: "Business Cards", link: "#" },
    { id: 16, image: "/assets/projects/GFx-BookCover_10.png", title: "Book Covers 10", category: "Graphic Design", subcategory: "Book Covers", link: "#" },
    { id: 18, image: "/assets/projects/GFx-BusinessCard_02.png", title: "Business Cards 02", category: "Graphic Design", subcategory: "Business Cards", link: "#" },
    { id: 19, image: "/assets/projects/GFx-BusinessCard_03.png", title: "Business Cards 03", category: "Graphic Design", subcategory: "Business Cards", link: "#" },
    { id: 21, image: "/assets/projects/GFx-BusinessCard_05.png", title: "Business Cards 05", category: "Graphic Design", subcategory: "Business Cards", link: "#" },
    { id: 20, image: "/assets/projects/GFx-BusinessCard_04.png", title: "Business Cards 04", category: "Graphic Design", subcategory: "Business Cards", link: "#" },
    { id: 22, image: "/assets/projects/GFx-BusinessCard_06.png", title: "Business Cards 06", category: "Graphic Design", subcategory: "Business Cards", link: "#" },
    { id: 23, image: "/assets/projects/GFx-Flyer_01.png", title: "Flyers 01", category: "Graphic Design", subcategory: "Flyers", link: "#" },
    { id: 25, image: "/assets/projects/GFx-Flyer_03.png", title: "Flyers 03", category: "Graphic Design", subcategory: "Flyers", link: "#" },
    { id: 24, image: "/assets/projects/GFx-Flyer_02.png", title: "Flyers 02", category: "Graphic Design", subcategory: "Flyers", link: "#" },
    { id: 26, image: "/assets/projects/GFx-Flyer_04.png", title: "Flyers 04", category: "Graphic Design", subcategory: "Flyers", link: "#" },
    { id: 27, image: "/assets/projects/GFx-Flyer_05.png", title: "Flyers 05", category: "Graphic Design", subcategory: "Flyers", link: "#" },
    { id: 29, image: "/assets/projects/GFx-Flyer_07.png", title: "Flyers 07", category: "Graphic Design", subcategory: "Flyers", link: "#" },
    { id: 28, image: "/assets/projects/GFx-Flyer_06.png", title: "Flyers 06", category: "Graphic Design", subcategory: "Flyers", link: "#" },
    { id: 30, image: "/assets/projects/GFx-Flyer_08.png", title: "Flyers 08", category: "Graphic Design", subcategory: "Flyers", link: "#" },
    { id: 31, image: "/assets/projects/GFx-Flyer_09.png", title: "Flyers 09", category: "Graphic Design", subcategory: "Flyers", link: "#" },
    { id: 33, image: "/assets/projects/GFx-Interior_01.png", title: "Interior Designs 01", category: "Graphic Design", subcategory: "Interior Designs", link: "#" },
    { id: 32, image: "/assets/projects/GFx-Flyer_10.png", title: "Flyers 10", category: "Graphic Design", subcategory: "Flyers", link: "#" },
    { id: 34, image: "/assets/projects/GFx-Interior_02.png", title: "Interior Designs 02", category: "Graphic Design", subcategory: "Interior Designs", link: "#" },
    { id: 35, image: "/assets/projects/GFx-Interior_03.png", title: "Interior Designs 03", category: "Graphic Design", subcategory: "Interior Designs", link: "#" },
    { id: 37, image: "/assets/projects/GFx-Interior_05.png", title: "Interior Designs 05", category: "Graphic Design", subcategory: "Interior Designs", link: "#" },
    { id: 36, image: "/assets/projects/GFx-Interior_04.png", title: "Interior Designs 04", category: "Graphic Design", subcategory: "Interior Designs", link: "#" },
    { id: 38, image: "/assets/projects/GFx-Interior_06.png", title: "Interior Designs 06", category: "Graphic Design", subcategory: "Interior Designs", link: "#" },
    { id: 39, image: "/assets/projects/GFx-Interior_07.png", title: "Interior Designs 07", category: "Graphic Design", subcategory: "Interior Designs", link: "#" },
    { id: 41, image: "/assets/projects/GFx-Interior_09.png", title: "Interior Designs 09", category: "Graphic Design", subcategory: "Interior Designs", link: "#" },
    { id: 40, image: "/assets/projects/GFx-Interior_08.png", title: "Interior Designs 08", category: "Graphic Design", subcategory: "Interior Designs", link: "#" },
    { id: 42, image: "/assets/projects/GFx-Interior_10.png", title: "Interior Designs 10", category: "Graphic Design", subcategory: "Interior Designs", link: "#" },
    { id: 43, image: "/assets/projects/GFx-Interior_11.png", title: "Interior Designs 11", category: "Graphic Design", subcategory: "Interior Designs", link: "#" },
    { id: 45, image: "/assets/projects/GFx-Jersey_01.png", title: "Jersey Design 01", category: "Graphic Design", subcategory: "Jersey Design", link: "#" },
    { id: 44, image: "/assets/projects/GFx-Interior_12.png", title: "Interior Designs 12", category: "Graphic Design", subcategory: "Interior Designs", link: "#" },
    { id: 46, image: "/assets/projects/GFx-Jersey_02.png", title: "Jersey Design 02", category: "Graphic Design", subcategory: "Jersey Design", link: "#" },
    { id: 47, image: "/assets/projects/GFx-Jersey_03.png", title: "Jersey Design 03", category: "Graphic Design", subcategory: "Jersey Design", link: "#" },
    { id: 49, image: "/assets/projects/GFx-Jersey_05.png", title: "Jersey Design 05", category: "Graphic Design", subcategory: "Jersey Design", link: "#" },
    { id: 48, image: "/assets/projects/GFx-Jersey_04.png", title: "Jersey Design 04", category: "Graphic Design", subcategory: "Jersey Design", link: "#" },
    { id: 50, image: "/assets/projects/GFx-Jersey_06.png", title: "Jersey Design 06", category: "Graphic Design", subcategory: "Jersey Design", link: "#" },
    { id: 51, image: "/assets/projects/GFx-Jersey_07.png", title: "Jersey Design 07", category: "Graphic Design", subcategory: "Jersey Design", link: "#" },
    { id: 53, image: "/assets/projects/GFx-LOGO_01.png", title: "Logo 01", category: "Graphic Design", subcategory: "Logo", link: "#" },
    { id: 52, image: "/assets/projects/GFx-Jersey_08.png", title: "Jersey Design 08", category: "Graphic Design", subcategory: "Jersey Design", link: "#" },
    { id: 54, image: "/assets/projects/GFx-LOGO_02.png", title: "Logo 02", category: "Graphic Design", subcategory: "Logo", link: "#" },
    { id: 55, image: "/assets/projects/GFx-LOGO_03.png", title: "Logo 03", category: "Graphic Design", subcategory: "Logo", link: "#" },
    { id: 57, image: "/assets/projects/GFx-LOGO_05.png", title: "Logo 05", category: "Graphic Design", subcategory: "Logo", link: "#" },
    { id: 56, image: "/assets/projects/GFx-LOGO_04.png", title: "Logo 04", category: "Graphic Design", subcategory: "Logo", link: "#" },
    { id: 58, image: "/assets/projects/GFx-LOGO_06.png", title: "Logo 06", category: "Graphic Design", subcategory: "Logo", link: "#" },
    { id: 59, image: "/assets/projects/GFx-LOGO_07.png", title: "Logo 07", category: "Graphic Design", subcategory: "Logo", link: "#" },
    { id: 61, image: "/assets/projects/GFx-LOGO_09.png", title: "Logo 09", category: "Graphic Design", subcategory: "Logo", link: "#" },
    { id: 60, image: "/assets/projects/GFx-LOGO_08.png", title: "Logo 08", category: "Graphic Design", subcategory: "Logo", link: "#" },
    { id: 62, image: "/assets/projects/GFx-LOGO_10.png", title: "Logo 10", category: "Graphic Design", subcategory: "Logo", link: "#" },
    { id: 63, image: "/assets/projects/GFx-LOGO_11.png", title: "Logo 11", category: "Graphic Design", subcategory: "Logo", link: "#" },
    { id: 65, image: "/assets/projects/GFx-Menu_01.png", title: "Menu 01", category: "Graphic Design", subcategory: "Menu", link: "#" },
    { id: 64, image: "/assets/projects/GFx-LOGO_12.png", title: "Logo 12", category: "Graphic Design", subcategory: "Logo", link: "#" },
    { id: 66, image: "/assets/projects/GFx-Menu_02.png", title: "Menu 02", category: "Graphic Design", subcategory: "Menu", link: "#" },
    { id: 67, image: "/assets/projects/GFx-Menu_03.png", title: "Menu 03", category: "Graphic Design", subcategory: "Menu", link: "#" },
    { id: 69, image: "/assets/projects/GFx-Packaging_01.png", title: "Packaging 01", category: "Graphic Design", subcategory: "Packaging", link: "#" },
    { id: 68, image: "/assets/projects/GFx-Menu_04.png", title: "Menu 04", category: "Graphic Design", subcategory: "Menu", link: "#" },
    { id: 70, image: "/assets/projects/GFx-Packaging_02.png", title: "Packaging 02", category: "Graphic Design", subcategory: "Packaging", link: "#" },
    { id: 71, image: "/assets/projects/GFx-Packaging_03.png", title: "Packaging 03", category: "Graphic Design", subcategory: "Packaging", link: "#" },
    { id: 73, image: "/assets/projects/GFx-Packaging_05.png", title: "Packaging 05", category: "Graphic Design", subcategory: "Packaging", link: "#" },
    { id: 72, image: "/assets/projects/GFx-Packaging_04.png", title: "Packaging 04", category: "Graphic Design", subcategory: "Packaging", link: "#" },
    { id: 74, image: "/assets/projects/GFx-Packaging_06.png", title: "Packaging 06", category: "Graphic Design", subcategory: "Packaging", link: "#" },
    { id: 75, image: "/assets/projects/GFx-Posts_01.png", title: "Posts 01", category: "Graphic Design", subcategory: "Posts", link: "#" },
    { id: 77, image: "/assets/projects/GFx-Posts_03.png", title: "Posts 03", category: "Graphic Design", subcategory: "Posts", link: "#" },
    { id: 76, image: "/assets/projects/GFx-Posts_02.png", title: "Posts 02", category: "Graphic Design", subcategory: "Posts", link: "#" },
    { id: 78, image: "/assets/projects/GFx-Posts_04.png", title: "Posts 04", category: "Graphic Design", subcategory: "Posts", link: "#" },
    { id: 79, image: "/assets/projects/GFx-Posts_05.png", title: "Posts 05", category: "Graphic Design", subcategory: "Posts", link: "#" },
    { id: 81, image: "/assets/projects/GFx-Standeee_01.png", title: "Standees 01", category: "Graphic Design", subcategory: "Standees", link: "#" },
    { id: 80, image: "/assets/projects/GFx-Posts_06.png", title: "Posts 06", category: "Graphic Design", subcategory: "Posts", link: "#" },
    { id: 82, image: "/assets/projects/GFx-Standeee_02.png", title: "Standees 02", category: "Graphic Design", subcategory: "Standees", link: "#" },
    { id: 83, image: "/assets/projects/GFx-Standeee_03.png", title: "Standees 03", category: "Graphic Design", subcategory: "Standees", link: "#" },
    { id: 85, image: "/assets/projects/GFx-Standeee_05.png", title: "Standees 05", category: "Graphic Design", subcategory: "Standees", link: "#" },
    { id: 84, image: "/assets/projects/GFx-Standeee_04.png", title: "Standees 04", category: "Graphic Design", subcategory: "Standees", link: "#" },
    { id: 86, image: "/assets/projects/GFx-Standeee_06.png", title: "Standees 06", category: "Graphic Design", subcategory: "Standees", link: "#" },
    { id: 87, image: "/assets/projects/GFx-Thumbnail_01.png", title: "Thumbnails 01", category: "Graphic Design", subcategory: "Thumbnails", link: "#" },
    { id: 88, image: "/assets/projects/GFx-Thumbnail_02.png", title: "Thumbnails 02", category: "Graphic Design", subcategory: "Thumbnails", link: "#" },
  ]

  const webSubcategories = [
    "Logo",
    "Banners",
    "Book Covers",
    "Thumbnails",
    "Business Cards",
    "Flyers",
    "Posts",
    "Packaging",
    "Menu",
    "Jersey Design",
    "Standees",
    "Interior Designs",
  ];

  // projects = interleaveBySubcategory(projects, webSubcategories);

  const handleProjectClick = (project) => {
    console.log("Project clicked:", project);
  };

  return (
    <Suspense>
      <ProjectsGrid
        projects={projects}
        subcategories={webSubcategories}
        category="Graphic Design"
        visiblePerPage={3}
        showDetails={false}
      />
    </Suspense>
  );
}