import fs from "fs";
import path from "path";
import ProjectsGrid from "@/components/projects/Projects";
import { Suspense } from "react";

/* ─────────────────────────────────────────────
   Map raw folder names → display labels.
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

/**
 * Helper function to recursively retrieve all image files inside a folder.
 */
function getAllImageFilesRecursively(dir) {
  let results = [];
  try {
    const list = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of list) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        results = results.concat(getAllImageFilesRecursively(fullPath));
      } else if (entry.isFile() && IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
        results.push(fullPath);
      }
    }
  } catch (err) {
    console.error(`Error reading directory ${dir}:`, err);
  }
  return results;
}

/* ─────────────────────────────────────────────
   Reads every subfolder and deeply traverses 
   all sub-files automatically.
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
    
    // Get all image file absolute paths recursively
    const absoluteFiles = getAllImageFilesRecursively(folderPath).sort((a, b) =>
      path.basename(a).localeCompare(path.basename(b), undefined, { numeric: true })
    );

    for (const filePath of absoluteFiles) {
      // Calculate path relative to /public to serve static assets correctly in Next.js
      const relativePath = path.relative(path.join(process.cwd(), "public"), filePath).replace(/\\/g, "/");

      projects.push({
        id: id++,
        title: "",
        category: "Corporate",
        subcategory: label,
        image: `/${relativePath}`,
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