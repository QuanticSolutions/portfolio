"use client";
import React from "react";
import ClientLogos from "./ClientLogos";
import { InfiniteMovingLogos } from "@/ui/InfiniteSlider";

export function Clients() {
  const logoRows = [
   ["logo-3/1.png", "logo-2/1.png", "logo-2/6.png", "logo-1/5.png", "logo-1/1.png", "logo-1/9.png"],
    ["logo-3/2.png", "logo-2/2.png", "logo-2/7.png", "logo-1/6.png", "logo-1/2.png", "logo-1/10.png"],
    ["logo-3/3.png", "logo-2/3.png", "logo-2/8.png", "logo-1/7.png", "logo-1/3.png", "logo-1/12.png"],
    ["logo-3/4.png", "logo-2/4.png", "logo-2/9.png", "logo-1/8.png", "logo-1/4.png" , "logo-1/14.png"],
    ["logo-3/5.png", "logo-2/5.png", "logo-2/10.png", "logo-1/13.png", "logo-1/11.png", "logo-1/15.png"]
  ];

  const allLogos = [...new Set(logoRows.flat())]; // remove duplicates

  return (
    <div className="w-full">
      {/* Desktop view - grid rows */}
      <div className="hidden lg:flex flex-row flex-wrap items-center justify-center gap-6">
        {logoRows.map((row, i) => (
          <ClientLogos key={i} logos={row} />
        ))}
      </div>

      {/* Mobile view - infinite scroll */}
      <div className="block md:hidden">
        <InfiniteMovingLogos logos={allLogos} />
      </div>
    </div>
  );
}
