"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/ui/ResizeableNavbar";
import { NavbarMenu } from "./MenuBar";
import { useState } from "react";
import { motion } from 'framer-motion';

export function Nav() {
  const navItems = [
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Services",
      link: "/services",
    },
    {
      name: "Pricing",
      link: "/pricing",
    },
    {
      name: "Contact",
      link: "/contact",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <NavbarMenu />
          <div className="flex items-center">
            <a href="/contact" className="group relative px-5 py-2 border-2 border-green-400 text-green-400 font-bold rounded-full hover:bg-green-400 hover:text-black transition-all duration-500 hover:scale-110 backdrop-blur-sm overflow-hidden">
              <span className="relative z-10 flex items-center gap-3">
                Contact Us
                <motion.div
                  className="w-6 h-6 border-2 border-current rounded-full flex items-center justify-center"
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-2 h-2 bg-current rounded-full" />
                </motion.div>
              </span>
              <div className="absolute inset-0 bg-green-400/10 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
            </a>
          </div>
        </NavBody>
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
          </MobileNavHeader>

          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300">
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full">
                Book a call
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
