"use client";
import { Parallax } from "react-scroll-parallax";
import { ParallaxProvider } from "react-scroll-parallax";

export default function ParallaxWrapper({ children }) {
  return (
  <ParallaxProvider>
    {children}
  </ParallaxProvider>);
}
