"use client";
import React from "react";
import ClientLogos from "./ClientLogos";
import { InfiniteMovingLogos } from "@/ui/InfiniteSlider";

export function Clients() {
  const logoRows = [
    ["Edan.png", "Highnoon.png", "Genesyx.png", "AntennaNow.png", "AussieCrops.png", "BabyLooney.png"],
    ["OptimumFibre.png", "AliJafri.png", "CarsFinderPro.png", "Rockford.png", "RockfordMortgage.png", "Dardari.png"],
    ["MaaniTravel.png", "Dardari.png", "Speaki.png", "Livylush.png", "MTIS.png", "Tooba.png"],
    ["Bechlo.pk.png", "AntennaNow.png", "Petra.png", "Circle.png", "PopCharm.png", "Usampac.png"],
    ["Khambatis.png", "14StarLimo.png", "AntennaCare.png", "Baseus.png", "You&Min.png", "PizzaMilano.png"]
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
