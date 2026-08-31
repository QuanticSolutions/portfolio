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
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

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
      name: "Portfolio",
      children: [
        { name: "Designing", link: "/corporate" },
        { name: "UI/UX", link: "/ui" },
        { name: "Web Dev", link: "/web" },
        { name: "App Dev", link: "/app" },
      ],
    },
    {
      name: "Contact",
      link: "/contact",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full">
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <NavbarMenu />
          <div className="flex items-center">
            <a
              href="/contact"
              className="group relative px-5 py-2 border-2 border-green-400 text-green-400 font-bold rounded-full hover:bg-green-400 hover:text-black transition-all duration-500 hover:scale-110 backdrop-blur-sm overflow-hidden"
            >
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
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => {
              if (!item.children) {
                return (
                  <a
                    key={`mobile-link-${idx}`}
                    href={item.link}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="relative text-white"
                  >
                    <span className="block">{item.name}</span>
                  </a>
                );
              } else {
                return (
                  <div
                    key={item.name}
                    className="relative group"
                    onClick={() => setOpen(!open)}
                  >
                    <button className="flex items-center gap-1 text-white hover:text-green-400 transition">
                      {item.name}
                      <ChevronDown className="h-4 w-4" />
                    </button>

                    {open && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute left-0 mt-2 bg-gradient-to-br from-teal-900 via-black to-emerald-500 backdrop-blur-xl shadow-md shadow-emerald-400 rounded-md py-2 w-40 z-50"
                      >
                        {item.children.map((sub) => (
                          <a
                            key={sub.name}
                            href={sub.link}
                            className="block px-4 py-4 text-sm text-white dark:text-neutral-200 hover:bg-green-400/10"
                          >
                            {sub.name}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </div>
                );
              }
            })}
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
