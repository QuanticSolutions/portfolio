import fs from "fs";
import path from "path";
import ProjectsGrid from "@/components/projects/Projects";
import { Suspense } from "react";

/* ─────────────────────────────────────────────
   Map raw folder names → display labels.
   Add an entry here any time a folder name
   shouldn't just be auto Title-Cased.
───────────────────────────────────────────── */
const SUBCATEGORY_LABELS = {
  banners: "Banners",
  books: "Book Covers",
  business: "Business Cards",
  flyers: "Flyers",
  interior: "Interior Designs",
  logos: "Logo",
  menu: "Menu",
  packaging: "Packaging",
  posts: "Posts",
  standees: "Standees",
  stickers: "Stickers",
  thumbs: "Thumbnails",
  "3d": "3D",
};

const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif", ".gif"]);

function toTitleCase(str) {
  return str.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
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

/* ─────────────────────────────────────────────
   Reads every subfolder inside /public/assets/projects/corporate
   and every image inside each — fully automatic, no manual entries.
───────────────────────────────────────────── */
function getCorporateProjects() {
  const baseDir = path.join(process.cwd(), "public", "assets", "projects", "corporate");

  let folders = [];
  try {
    folders = fs
      .readdirSync(baseDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);
  } catch (err) {
    console.error("Could not read corporate projects directory:", err);
    return { projects: [], subcategories: [] };
  }

  let id = 1;
  const projects = [];
  const subcategories = [];

  for (const folder of folders) {
    const label = SUBCATEGORY_LABELS[folder.toLowerCase()] ?? toTitleCase(folder);
    subcategories.push(label);

    const folderPath = path.join(baseDir, folder);
    const files = fs
      .readdirSync(folderPath)
      .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

    for (const file of files) {
      projects.push({
        id: id++,
        title: "",
        category: "Corporate",
        subcategory: label,
        image: `/assets/projects/corporate/${folder}/${file}`,
      });
    }
  }

  return { projects, subcategories };
}

export default function GamingPage() {
  const { projects: rawProjects, subcategories } = getCorporateProjects();
  const projects = interleaveBySubcategory(rawProjects, subcategories);

  return (
    <Suspense>
      <ProjectsGrid
        projects={projects}
        subcategories={subcategories}
        category="Corporate"
      />
    </Suspense>
  );
}