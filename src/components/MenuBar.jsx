"use client";
import React, { useState } from "react";
import { Menu, MenuItem, Link } from "@/ui/NavBarMenu";
import { twMerge } from "tailwind-merge";

export function NavbarMenu() {
  return (
    <div className="relative flex items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }) {
  const [active, setActive] = useState(null);
  const [nestedActive, setNestedActive] = useState(null);
  
  return (
    <div className={twMerge("inset-x-0 mx-auto z-50", className)}>
      <Menu setActive={setActive}>
        <Link href="/services">Services</Link>
        <Link href="/about">About</Link>
        <MenuItem active={active} setActive={setActive} item="Projects">
          <div className="flex flex-col bg-gray-900/80 backdrop-blur-md border border-emerald-400/20 rounded-lg shadow-lg p-4 w-56 space-y-3">
            
            {/* Designing with nested dropdown */}
            <div 
              onMouseEnter={() => setNestedActive("designing")}
              onMouseLeave={() => setNestedActive(null)}
            >
              <div className="block  text-gray-300 hover:bg-emerald-400/10 hover:text-emerald-400 rounded-md transition-all duration-200 cursor-pointer">
                Designing
                <span className="float-right">→</span>
              </div>
              
              {/* Nested dropdown for Designing */}
              {nestedActive === "designing" && (
                <div className="flex flex-col left-full top-0 ml-2 bg-gray-900/90 backdrop-blur-md border border-emerald-400/20 rounded-lg shadow-lg p-3 w-48 space-y-2">
                  <Link
                    href="/gaming"
                    className="block px-3 py-3 text-gray-300 hover:bg-emerald-400/10 hover:text-emerald-400 rounded-md transition-all duration-200"
                  >
                    Gaming
                  </Link>
                  <Link
                    href="/corporate"
                    className="block px-3 py-3 text-gray-300 hover:bg-emerald-400/10 hover:text-emerald-400 rounded-md transition-all duration-200"
                  >
                    Corporate
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/ui"
              className="block px-3 py-5 text-gray-300 hover:bg-emerald-400/10 hover:text-emerald-400 rounded-md transition-all duration-200"
            >
              UI/UX
            </Link>
            
            <Link
              href="/web"
              className="block px-3 py-5 text-gray-300 hover:bg-emerald-400/10 hover:text-emerald-400 rounded-md transition-all duration-200"
            >
              Web Dev
            </Link>
            
            <Link
              href="/app"
              className="block px-3 py-5 text-gray-300 hover:bg-emerald-400/10 hover:text-emerald-400 rounded-md transition-all duration-200"
            >
              App Dev
            </Link>
          </div>
        </MenuItem>
        <Link href="/pricing">Pricing</Link>
      </Menu>
    </div>
  );
}