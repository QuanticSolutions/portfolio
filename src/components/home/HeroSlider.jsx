"use client";
import React from "react";
import { InfiniteImageSlider } from "@/ui/InfiniteHeroSlider";

export function InfiniteMovingCardsDemo() {
  return (
   <InfiniteImageSlider images={testImages} direction="right" speed="slow" />
  );
}

// Replace testimonials with test images
const testImages = [
  {
    src: "wordpress/Fintalk.jpg",
    alt: "Test Image 1",
    name: "Fintalk",
    link: "#"
  },
  {
    src: "/assets/projects/web/Shopify/1.jpg",
    alt: "Test Image 2",
    name: "Pop Charm",
    link: "https://popcharmshop.com/"
  },
  {
    src: "/assets/projects/web/Custom/3.jpg",
    alt: "Test Image 3",
    name: "Cars Finder Pro",
    link: "https://carsfinderpro.com/"
  },
  {
    src: "/assets/projects/web/Wordpress/7.jpg",
    alt: "Test Image 4",
    name: "Aussie Crops",
    link: "https://theaussiecrops.com.au/"
  },
  {
    src: "/assets/projects/web/Wordpress/17.jpg",
    alt: "Test Image 5",
    name: "NGO Loob",
    link: "https://loobinc.com/"
  },
];
